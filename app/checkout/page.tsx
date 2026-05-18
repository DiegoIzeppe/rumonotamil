"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Lock, ArrowRight, Loader2,
  AlertCircle, Star, Shield, CreditCard, Calendar,
} from "lucide-react";
import { PRO_PLAN, type BillingCycle, type PaymentMode } from "@/lib/stripe";
import { cn } from "@/lib/utils";

const CYCLES: { id: BillingCycle; label: string; save: string | null }[] = [
  { id: "monthly",   label: "Mensal",    save: null },
  { id: "semestral", label: "Semestral", save: "–20%" },
  { id: "annual",    label: "Anual",     save: "–41%" },
];

function CheckoutForm() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled") === "true";
  const initialCycle = (searchParams.get("cycle") ?? "monthly") as BillingCycle;

  const [cycle, setCycle]               = useState<BillingCycle>(initialCycle);
  const [paymentMode, setPaymentMode]   = useState<PaymentMode>("monthly");
  const [email, setEmail]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState(canceled ? "Pagamento cancelado. Tente novamente." : "");

  const cycleMeta  = PRO_PLAN.cycles[cycle];
  const prices     = cycleMeta.prices as Record<PaymentMode, { label: string; priceId: string; totalLabel: string | null }>;
  const hasUpfront = cycle !== "monthly";
  const activePrice = prices[paymentMode] ?? prices.monthly;

  // Computed totals
  const monthlyAmt  = cycleMeta.monthlyPrice;
  const months      = cycleMeta.months;
  const upfrontAmt  = monthlyAmt * months;

  // When cycle changes to monthly, reset payment mode
  const handleCycleChange = (c: BillingCycle) => {
    setCycle(c);
    if (c === "monthly") setPaymentMode("monthly");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cycle, paymentMode, email }),
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        setError(data.error ?? "Erro ao processar. Tente novamente.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">

      {/* ── LEFT: plan ── */}
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/25 bg-blue-500/8 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Star className="w-3 h-3" />
            Plano Pro — Acesso completo
          </div>
          <h2 className="text-2xl font-black text-white leading-tight">
            Tudo para tirar<br />
            <span className="gradient-text">nota 1000 no ENEM</span>
          </h2>
          <p className="text-white/50 text-sm mt-2">Acesso imediato após o pagamento.</p>
        </div>

        {/* ── Cycle toggle ── */}
        <div className="glass rounded-2xl border border-white/8 p-1.5 flex gap-1">
          {CYCLES.map((c) => (
            <button
              key={c.id}
              onClick={() => handleCycleChange(c.id)}
              className={cn(
                "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5",
                cycle === c.id
                  ? "bg-blue-500 text-white"
                  : "text-white/45 hover:text-white/80"
              )}
            >
              {c.label}
              {c.save && (
                <span className={cn(
                  "text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                  cycle === c.id ? "bg-white/20 text-white" : "bg-green-500/20 text-green-400"
                )}>
                  {c.save}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Payment mode toggle (semestral/annual only) ── */}
        <AnimatePresence>
          {hasUpfront && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="space-y-2">
                <p className="text-xs font-semibold text-white/40 uppercase tracking-wider">
                  Como prefere pagar?
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {/* Mensal no ciclo */}
                  <button
                    onClick={() => setPaymentMode("monthly")}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all",
                      paymentMode === "monthly"
                        ? "border-blue-500/40 bg-blue-500/10"
                        : "border-white/8 hover:border-white/15"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <Calendar className="w-3.5 h-3.5 text-white/50" />
                      <span className="text-xs font-bold text-white/70">Mensal</span>
                    </div>
                    <p className="text-lg font-black text-white">R${monthlyAmt}<span className="text-sm font-normal text-white/40">/mês</span></p>
                    <p className="text-[11px] text-white/35 mt-1">Cobrado todo mês</p>
                  </button>

                  {/* À vista */}
                  <button
                    onClick={() => setPaymentMode("upfront")}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all relative",
                      paymentMode === "upfront"
                        ? "border-green-500/40 bg-green-500/8"
                        : "border-white/8 hover:border-white/15"
                    )}
                  >
                    <div className="absolute -top-2 right-3">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 border border-green-500/25">
                        Mais fácil
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-white/50" />
                      <span className="text-xs font-bold text-white/70">À vista</span>
                    </div>
                    <p className="text-lg font-black text-white">R${upfrontAmt}</p>
                    <p className="text-[11px] text-white/35 mt-1">
                      {months === 6 ? "Cobrado 1× a cada 6 meses" : "Cobrado 1× por ano"}
                    </p>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Price display */}
        <div className="glass rounded-2xl border border-blue-500/20 p-5 bg-blue-500/3">
          <div className="flex items-end gap-2 mb-1">
            <span className="text-white/50 text-base font-semibold">R$</span>
            <span className="text-4xl font-black text-white">
              {paymentMode === "upfront" && hasUpfront ? upfrontAmt : monthlyAmt}
            </span>
            <span className="text-white/40 text-sm mb-1.5">
              {paymentMode === "upfront" && hasUpfront
                ? months === 6 ? "a cada 6 meses" : "por ano"
                : "/mês"}
            </span>
          </div>
          {cycle !== "monthly" && (
            <p className="text-xs text-green-400 font-medium mb-2">
              {paymentMode === "monthly"
                ? `${months} × R$${monthlyAmt} = R$${upfrontAmt} no total`
                : `Equivale a R$${monthlyAmt}/mês · economize ${cycleMeta.save}`}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-white/40">
            <Shield className="w-3.5 h-3.5" />
            Cancele quando quiser
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2.5">
          {PRO_PLAN.features.map((f) => (
            <li key={f} className="flex items-center gap-2.5 text-sm text-white/70">
              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4 pt-2">
          {["SSL Seguro", "Stripe", "Cancele fácil"].map((b) => (
            <div key={b} className="flex items-center gap-1.5 text-xs text-white/30">
              <Lock className="w-3 h-3" />
              {b}
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── RIGHT: form ── */}
      <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
        <div
          className="rounded-2xl p-8 border"
          style={{ background: "rgba(13,19,33,0.92)", backdropFilter: "blur(20px)", borderColor: "rgba(255,255,255,0.09)" }}
        >
          <h3 className="text-lg font-bold text-white mb-1">Comece agora</h3>
          <p className="text-white/40 text-sm mb-6">Acesso imediato. Garantia de 7 dias sem perguntas.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
                Seu e-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                required
                style={{ background: "rgba(255,255,255,0.05)" }}
                className="w-full px-4 py-3.5 rounded-xl text-sm text-white placeholder:text-white/20 outline-none border border-white/10 focus:border-blue-500/50 transition-all"
                autoFocus
              />
              <p className="text-[11px] text-white/25 mt-1.5">Você receberá o acesso à plataforma neste e-mail.</p>
            </div>

            {/* Order summary */}
            <div className="p-4 rounded-xl border border-white/8 bg-white/3 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/60">
                  Plano Pro · {cycleMeta.label}
                  {hasUpfront && paymentMode === "upfront" ? " à vista" : ""}
                </span>
                <span className="text-white font-semibold">
                  R${paymentMode === "upfront" && hasUpfront ? upfrontAmt : monthlyAmt}
                  {paymentMode === "monthly" || !hasUpfront ? "/mês" : ""}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-green-400">
                <span>Garantia de 7 dias</span>
                <span>Reembolso total</span>
              </div>
              <div className="border-t border-white/8 pt-2 flex items-center justify-between text-sm font-bold">
                <span className="text-white/70">Total hoje</span>
                <span className="text-white">
                  R${paymentMode === "upfront" && hasUpfront ? upfrontAmt : monthlyAmt}
                  {paymentMode === "monthly" || !hasUpfront ? "/mês" : ""}
                </span>
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-xl border border-red-500/25"
                style={{ background: "rgba(239,68,68,0.08)" }}>
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                <p className="text-sm text-red-300">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={!email || loading}
              className={cn(
                "w-full flex items-center justify-center gap-2.5 py-4 rounded-xl font-bold text-base transition-all",
                email && !loading
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white hover:shadow-glow"
                  : "bg-white/5 border border-white/8 text-white/25 cursor-not-allowed"
              )}
            >
              {loading
                ? <><Loader2 className="w-5 h-5 animate-spin" />Redirecionando...</>
                : <><Lock className="w-4 h-4" />Assinar agora<ArrowRight className="w-4 h-4" /></>
              }
            </button>

            <p className="text-center text-[11px] text-white/25 leading-relaxed">
              Ao continuar você aceita os{" "}
              <a href="#" className="text-blue-400/60 hover:text-blue-400 transition-colors">Termos de Uso</a>
              {" "}e a{" "}
              <a href="#" className="text-blue-400/60 hover:text-blue-400 transition-colors">Política de Privacidade</a>.
              Pagamento via Stripe com segurança SSL.
            </p>
          </form>
        </div>

        {/* Trust badges */}
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { icon: Shield,     label: "Garantia",      sub: "7 dias reembolso" },
            { icon: Lock,       label: "SSL 256-bit",   sub: "Dados criptografados" },
            { icon: CreditCard, label: "Stripe Secure", sub: "Padrão PCI DSS" },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-white/6 bg-white/2 text-center">
              <Icon className="w-4 h-4 text-green-400" />
              <p className="text-[11px] font-bold text-white/70">{label}</p>
              <p className="text-[10px] text-white/30">{sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-3 flex items-center gap-3 p-4 rounded-xl border border-green-500/15 bg-green-500/3">
          <Shield className="w-8 h-8 text-green-400 flex-shrink-0" />
          <div>
            <p className="text-sm font-bold text-white">Garantia incondicional de 7 dias</p>
            <p className="text-xs text-white/45">Não ficou satisfeito por qualquer motivo? Devolvemos 100% do valor pago, sem perguntas.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-[#070b12] bg-grid">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-64 rounded-full bg-blue-500/8 blur-[120px] pointer-events-none" />
      <div
        className="border-b border-white/6 px-6 py-4 flex items-center justify-between relative z-10"
        style={{ background: "rgba(10,15,28,0.9)", backdropFilter: "blur(16px)" }}
      >
        <a href="/" className="font-bold text-white text-base">
          Redação <span className="gradient-text">Nota 1000</span>
        </a>
        <div className="flex items-center gap-2 text-xs text-white/30">
          <Lock className="w-3.5 h-3.5" />
          Checkout seguro
        </div>
      </div>
      <div className="px-4 py-12 relative z-10">
        <Suspense fallback={null}>
          <CheckoutForm />
        </Suspense>
      </div>
    </div>
  );
}
