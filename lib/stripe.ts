import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "placeholder", {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return _stripe;
}

// ── Plano único PRO ───────────────────────────────────────────────────────────
// 3 preços no Stripe: mensal (cobrança recorrente mensal), semestral e anual
// (cobrança única à vista, sem opção de parcelar mês a mês).

export const PRO_PLAN = {
  name: "Pro",
  features: [
    "Método completo — C1 a C5",
    "Banco de redações nota 1000 com análise",
    "Correção por IA ilimitada",
    "Assistente IA para dúvidas",
    "Simulado ENEM com cronômetro",
    "Biblioteca de repertórios",
    "Dashboard de evolução e ranking",
    "Plano de estudos personalizado",
  ],
  cycles: {
    monthly: {
      label: "Mensal",
      monthlyPrice: 49,
      save: null,
      months: 1,
      prices: {
        upfront: {
          label: "R$49/mês",
          priceId: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "",
          totalLabel: null,
        },
      },
    },
    semestral: {
      label: "Semestral",
      monthlyPrice: 39,
      save: "–20%",
      months: 6,
      prices: {
        upfront: {
          label: "R$234 à vista",
          priceId: process.env.STRIPE_PRICE_PRO_SEMESTRAL_UPFRONT ?? "",
          totalLabel: "Equivale a R$39/mês · cobrado uma vez a cada 6 meses",
        },
      },
    },
    annual: {
      label: "Anual",
      monthlyPrice: 29,
      save: "–41%",
      months: 12,
      prices: {
        upfront: {
          label: "R$348 à vista",
          priceId: process.env.STRIPE_PRICE_PRO_ANNUAL_UPFRONT ?? "",
          totalLabel: "Equivale a R$29/mês · cobrado uma vez ao ano",
        },
      },
    },
  },
} as const;

export type BillingCycle = keyof typeof PRO_PLAN.cycles;
export type PaymentMode = "upfront";

export function getPriceId(cycle: BillingCycle): string {
  return PRO_PLAN.cycles[cycle].prices.upfront.priceId;
}

// Legacy export — usado em configuracoes/page.tsx
export const PLANS = {
  PRO: {
    name: "Pro",
    price: 49 * 100,
    priceId: process.env.STRIPE_PRICE_PRO_MONTHLY ?? "",
    features: PRO_PLAN.features as unknown as string[],
    limit: { corrections: -1 },
  },
};

// ── Session helpers ───────────────────────────────────────────────────────────
export async function createCheckoutSession({
  priceId,
  userId,
  customerEmail,
  successUrl,
  cancelUrl,
}: {
  priceId: string;
  userId?: string;
  customerEmail?: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const stripe = getStripe();
  return stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: successUrl,
    cancel_url: cancelUrl,
    customer_email: customerEmail,
    allow_promotion_codes: true,
    metadata: { userId: userId ?? "" },
    subscription_data: { metadata: { userId: userId ?? "" } },
    locale: "pt-BR",
  });
}

export async function createBillingPortalSession(customerId: string, returnUrl: string) {
  const stripe = getStripe();
  return stripe.billingPortal.sessions.create({ customer: customerId, return_url: returnUrl });
}
