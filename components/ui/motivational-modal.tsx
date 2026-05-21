"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

interface MotivationalModalProps {
  phrase: string;
  onClose: () => void;
  variant?: "entry" | "simulado";
}

export function MotivationalModal({ phrase, onClose, variant = "entry" }: MotivationalModalProps) {
  const isSimulado = variant === "simulado";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(5, 8, 18, 0.85)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 16 }}
        transition={{ type: "spring", damping: 20, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md text-center"
      >
        {/* Icon */}
        <div className={`w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center ${
          isSimulado
            ? "bg-orange-500/20 border border-orange-500/30"
            : "bg-blue-500/20 border border-blue-500/30"
        }`}>
          {isSimulado
            ? <Zap className="w-8 h-8 text-orange-400" />
            : <Sparkles className="w-8 h-8 text-blue-400" />
          }
        </div>

        {/* Label */}
        <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${
          isSimulado ? "text-orange-400/70" : "text-blue-400/70"
        }`}>
          {isSimulado ? "Modo Simulado" : "Bom estudo"}
        </p>

        {/* Phrase */}
        <p className="text-xl md:text-2xl font-bold text-white leading-snug mb-8 px-2">
          "{phrase}"
        </p>

        {/* CTA button */}
        <button
          onClick={onClose}
          className={`px-8 py-3.5 rounded-2xl font-black text-base transition-all hover:scale-105 active:scale-95 ${
            isSimulado
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-[0_0_24px_rgba(249,115,22,0.4)]"
              : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-glow"
          }`}
        >
          {isSimulado ? "⏱️ Começar agora!" : "🚀 Vamos para cima!"}
        </button>

        <p className="text-xs text-white/20 mt-4">Clique em qualquer lugar para fechar</p>
      </motion.div>
    </motion.div>
  );
}
