"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle2, Mail, ArrowRight, Zap } from "lucide-react";

export default function CheckoutSuccessPage() {
  return (
    <div className="min-h-screen bg-[#070b12] bg-grid flex items-center justify-center p-4">
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full bg-green-500/8 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center relative z-10"
      >
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-400" />
        </div>

        <h1 className="text-2xl font-black text-white mb-2">
          Pagamento confirmado!
        </h1>
        <p className="text-white/50 text-sm mb-8 leading-relaxed">
          Sua assinatura Pro está ativa. Verifique sua caixa de entrada — enviamos um e-mail com o link de acesso à plataforma.
        </p>

        {/* Steps */}
        <div
          className="rounded-2xl p-6 border mb-6 text-left space-y-4"
          style={{ background: "rgba(13,19,33,0.92)", borderColor: "rgba(255,255,255,0.09)" }}
        >
          {[
            { icon: Mail, label: "Acesse seu e-mail", desc: "Enviamos suas credenciais de acesso." },
            { icon: Zap,  label: "Entre na plataforma", desc: "Use o link do e-mail para criar sua senha." },
            { icon: CheckCircle2, label: "Comece a estudar", desc: "Acesso completo ao Plano Pro imediato." },
          ].map(({ icon: Icon, label, desc }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/15 border border-blue-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{label}</p>
                <p className="text-xs text-white/40 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Link
          href="/sign-in"
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white font-bold text-sm transition-all hover:shadow-glow"
        >
          Acessar plataforma
          <ArrowRight className="w-4 h-4" />
        </Link>

        <p className="text-xs text-white/25 mt-4">
          Problemas? <a href="mailto:suporte@rumonotamil.com" className="text-blue-400/60 hover:text-blue-400 transition-colors">suporte@rumonotamil.com</a>
        </p>
      </motion.div>
    </div>
  );
}
