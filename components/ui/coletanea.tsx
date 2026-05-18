"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, BarChart3, Smile, BookOpen, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Coletanea } from "@/lib/coletanea-data";

const typeConfig = {
  texto: { label: "Texto", icon: BookOpen, color: "text-blue-400 bg-blue-500/10 border-blue-500/20" },
  dado: { label: "Dado", icon: BarChart3, color: "text-green-400 bg-green-500/10 border-green-500/20" },
  charge: { label: "Charge", icon: Smile, color: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20" },
  poema: { label: "Poema", icon: FileText, color: "text-purple-400 bg-purple-500/10 border-purple-500/20" },
};

interface ColetaneaViewProps {
  coletanea: Coletanea;
  collapsed?: boolean;
}

export function ColetaneaView({ coletanea, collapsed = false }: ColetaneaViewProps) {
  const [open, setOpen] = useState(!collapsed);
  const [expandedText, setExpandedText] = useState<number | null>(null);

  return (
    <div className="glass rounded-2xl border border-white/8 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/3 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className={cn("h-4 rounded-sm", n <= coletanea.texts.length ? "w-3 bg-blue-500/60" : "w-3 bg-white/10")}
              />
            ))}
          </div>
          <div className="text-left">
            <p className="text-sm font-semibold text-white">Coletânea de Apoio</p>
            <p className="text-xs text-white/40">{coletanea.texts.length} textos de apoio · leia antes de escrever</p>
          </div>
        </div>
        {open
          ? <ChevronUp className="w-4 h-4 text-white/30 flex-shrink-0" />
          : <ChevronDown className="w-4 h-4 text-white/30 flex-shrink-0" />
        }
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 border-t border-white/6">
              {/* Warning */}
              <div className="flex items-center gap-2 py-3 mb-3">
                <div className="w-1 h-full bg-orange-500 rounded-full" />
                <p className="text-xs text-orange-400/80">
                  Use os textos como repertório — não os copie. O avaliador identifica cópia e zera a redação.
                </p>
              </div>

              <div className="space-y-3">
                {coletanea.texts.map((text, i) => {
                  const config = typeConfig[text.type];
                  const Icon = config.icon;
                  const isExpanded = expandedText === text.id;

                  return (
                    <div key={text.id} className="rounded-xl border border-white/6 bg-white/3 overflow-hidden">
                      {/* Text header */}
                      <button
                        onClick={() => setExpandedText(isExpanded ? null : text.id)}
                        className="w-full flex items-start gap-3 p-4 text-left hover:bg-white/3 transition-colors"
                      >
                        <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
                          <span className="text-xs font-black text-white/25 w-4">{i + 1}</span>
                          <div className={cn("flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-bold", config.color)}>
                            <Icon className="w-3 h-3" />
                            {config.label}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-white/40 leading-snug mb-1">{text.source}</p>
                          <p className={cn(
                            "text-sm text-white/70 leading-relaxed transition-all",
                            !isExpanded && "line-clamp-2"
                          )}>
                            {text.content}
                          </p>
                        </div>
                        <ChevronDown className={cn("w-3.5 h-3.5 text-white/20 flex-shrink-0 mt-1 transition-transform", isExpanded && "rotate-180")} />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
