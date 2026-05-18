import { NextRequest, NextResponse } from "next/server";
import { createCheckoutSession, getPriceId, type BillingCycle, type PaymentMode } from "@/lib/stripe";
import { AUTH_COOKIE, parseSessionToken } from "@/lib/auth";

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";


// GET  — vindo do landing page: /api/stripe/checkout?plan=PRO&cycle=monthly
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const cycle = (searchParams.get("cycle") ?? "monthly") as BillingCycle;
  const checkoutUrl = `${BASE_URL}/checkout?cycle=${cycle}`;
  return NextResponse.redirect(checkoutUrl);
}

// POST — vindo da plataforma ou da página /checkout
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const cycle: BillingCycle = body.cycle ?? "monthly";
    const mode: PaymentMode = body.paymentMode ?? "monthly";
    const customerEmail: string | undefined = body.email;

    // Usuário autenticado (opcional)
    const token = req.cookies.get(AUTH_COOKIE)?.value;
    const user = token ? parseSessionToken(token) : null;

    const priceId = getPriceId(cycle, mode);
    if (!priceId) {
      return NextResponse.json(
        { error: "Configure STRIPE_PRICE_ID_PRO_* no .env" },
        { status: 503 }
      );
    }

    const session = await createCheckoutSession({
      priceId,
      userId: user?.id,
      customerEmail: customerEmail ?? user?.email,
      successUrl: `${BASE_URL}/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${BASE_URL}/checkout?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("[Checkout]", err);
    return NextResponse.json({ error: "Erro ao criar sessão de pagamento" }, { status: 500 });
  }
}
