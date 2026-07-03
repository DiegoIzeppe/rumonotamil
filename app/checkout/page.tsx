"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  CheckCircle2, Lock, ArrowRight, Loader2,
  AlertCircle, Star, Shield, CreditCard,
} from "lucide-react";
import { PRO_PLAN, type BillingCycle } from "@/lib/stripe";
import { cn } from "@/lib/utils";

const CYCLES: { id: BillingCycle; label: string; save: string | null }[] = [
  { id: "monthly",   label: "Mensal",    save: null },
  { id: "semestral", label: "Semestral", save: "–20%" },
  { id: "annual",    label: "Anual",     save: "–41%" },
];

function CheckoutForm() {
  const searchParams = useSearchParams();
  const canceled = searchParams.get("canceled") === "true";
  const cycleParam = searchParams.get("cycle") ?? "monthly";
  // Guard against malformed ?cycle= values that would break PRO_PLAN.cycles lookup
  const initialCycle: BillingCycle =
    cycleParam === "semestral" || cycleParam === "annual" ? cycleParam : "monthly";

  const [cycle, setCycle]               = useState<BillingCycle>(initialCycle);
  const [email, setEmail]               = useState("");
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState(canceled ? "Pagamento cancelado. Tente novamente." : "");

  const cycleMeta  = PRO_PLAN.cycles[cycle];

  // Computed totals — each cycle is a single upfront charge (or monthly recurring for the "monthly" cycle)
  const monthlyAmt = cycleMeta.monthlyPrice;
  const months     = cycleMeta.months;
  const totalAmt   = monthlyAmt * months;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cycle, email }),
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
              onClick={() => setCycle(c.id)}
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

        {/* Price display */}
        <div className="glass rounded-2xl border border-blue-500/20 p-5 bg-blue-500/3">
          <div className="flex items-end gap-2 mb-1">
            <span className="text-white/50 text-base font-semibold">R$</span>
            <span className="text-4xl font-black text-white">
              {cycle === "monthly" ? monthlyAmt : totalAmt}
            </span>
            <span className="text-white/40 text-sm mb-1.5">
              {cycle === "monthly" ? "/mês" : months === 6 ? "a cada 6 meses" : "por ano"}
            </span>
          </div>
          {cycle !== "monthly" && (
            <p className="text-xs text-green-400 font-medium mb-2">
              Equivale a R${monthlyAmt}/mês · economize {cycleMeta.save} · cobrado uma vez
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
                  {cycle !== "monthly" ? " à vista" : ""}
                </span>
                <span className="text-white font-semibold">
                  R${cycle === "monthly" ? monthlyAmt : totalAmt}
                  {cycle === "monthly" ? "/mês" : ""}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-green-400">
                <span>Garantia de 7 dias</span>
                <span>Reembolso total</span>
              </div>
              <div className="border-t border-white/8 pt-2 flex items-center justify-between text-sm font-bold">
                <span className="text-white/70">Total hoje</span>
                <span className="text-white">
                  R${cycle === "monthly" ? monthlyAmt : totalAmt}
                  {cycle === "monthly" ? "/mês" : ""}
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
