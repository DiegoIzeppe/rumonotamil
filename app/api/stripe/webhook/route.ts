import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import type Stripe from "stripe";

function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const { createClient } = require("@supabase/supabase-js");
  return createClient(url, key);
}

async function upsertSubscription(data: {
  userId: string;
  stripeCustomerId: string;
  stripeSubscriptionId: string;
  stripePriceId: string;
  status: string;
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}) {
  const db = getSupabaseAdmin();
  if (!db) { console.warn("[Webhook] Supabase not configured"); return; }

  await db.from("subscriptions").upsert({
    user_id: data.userId,
    stripe_customer_id: data.stripeCustomerId,
    stripe_subscription_id: data.stripeSubscriptionId,
    stripe_price_id: data.stripePriceId,
    plan: "PRO",
    status: data.status,
    current_period_start: data.currentPeriodStart.toISOString(),
    current_period_end: data.currentPeriodEnd.toISOString(),
    cancel_at_period_end: data.cancelAtPeriodEnd,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 400 });
  }

  const stripe = getStripe();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {

      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const userId = session.metadata?.userId;
        if (!session.subscription) break;

        const sub = await stripe.subscriptions.retrieve(session.subscription as string);

        if (userId) {
          await upsertSubscription({
            userId,
            stripeCustomerId: session.customer as string,
            stripeSubscriptionId: sub.id,
            stripePriceId: sub.items.data[0].price.id,
            status: "ACTIVE",
            currentPeriodStart: new Date((sub as any).current_period_start * 1000),
            currentPeriodEnd: new Date((sub as any).current_period_end * 1000),
            cancelAtPeriodEnd: sub.cancel_at_period_end,
          });
        }

        // Se email disponível e Supabase configurado: criar conta automaticamente
        if (session.customer_details?.email) {
          const db = getSupabaseAdmin();
          if (db) {
            // Cria usuário no Supabase Auth e envia email de confirmação
            await db.auth.admin.createUser({
              email: session.customer_details.email,
              email_confirm: true,
              user_metadata: { name: session.customer_details.name ?? "" },
            });
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        const db = getSupabaseAdmin();
        if (!db) break;
        await db.from("subscriptions")
          .update({
            status: sub.status.toUpperCase(),
            cancel_at_period_end: sub.cancel_at_period_end,
            current_period_end: new Date((sub as any).current_period_end * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("stripe_subscription_id", sub.id);
        break;
      }

      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        const db = getSupabaseAdmin();
        if (!db) break;
        await db.from("subscriptions")
          .update({ status: "CANCELED", plan: "FREE", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", sub.id);
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;
        const db = getSupabaseAdmin();
        if (!db || !(invoice as any).subscription) break;
        await db.from("subscriptions")
          .update({ status: "PAST_DUE", updated_at: new Date().toISOString() })
          .eq("stripe_subscription_id", (invoice as any).subscription);
        break;
      }
    }
  } catch (err) {
    console.error("[Stripe Webhook]", event.type, err);
    return NextResponse.json({ error: "Webhook handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
