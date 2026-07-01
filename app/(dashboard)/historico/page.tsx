"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  History, Search, ArrowUpDown, Brain, PenLine, Timer,
  TrendingUp, TrendingDown, Minus,
} from "lucide-react";
import { useAppStore, type EssayHistoryEntry } from "@/store/app-store";
import { cn, formatDate, getScoreColor, getScoreLabel } from "@/lib/utils";
import { EssayResult } from "@/components/essay/essay-result";

type SortKey = "recent" | "oldest" | "highest" | "lowest";

const safeNum = (n: unknown) => (typeof n === "number" && !isNaN(n) ? n : 0);

export default function HistoricoPage() {
  const { essayHistory } = useAppStore();
  const [mounted, setMounted] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortKey>("recent");
  const [selected, setSelected] = useState<EssayHistoryEntry | null>(null);

  useEffect(() => { setMounted(true); }, []);

  const localHistory = mounted ? essayHistory : [];

  const filtered = useMemo(() => {
    let list = localHistory.filter((e) =>
      e.theme.toLowerCase().includes(search.toLowerCase())
    );
    switch (sort) {
      case "recent":  list = [...list].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()); break;
      case "oldest":  list = [...list].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()); break;
      case "highest": list = [...list].sort((a, b) => safeNum(b.score) - safeNum(a.score)); break;
      case "lowest":  list = [...list].sort((a, b) => safeNum(a.score) - safeNum(b.score)); break;
    }
    return list;
  }, [localHistory, search, sort]);

  // Detail view — full correction result for a past essay
  if (selected) {
    return (
      <EssayResult
        feedback={selected.feedback}
        essayText={selected.essayText ?? ""}
        onReset={() => setSelected(null)}
        resetLabel="Voltar ao histórico"
        title={selected.theme}
      />
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <History className="w-7 h-7 text-blue-400" />
            Histórico de Redações
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Todas as suas correções — estude seus erros e acompanhe sua evolução.
          </p>
        </div>

        {localHistory.length === 0 ? (
          <div className="glass rounded-2xl p-12 border border-white/5 text-center">
            <Brain className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <h3 className="text-white/50 font-semibold mb-2">Nenhuma redação corrigida ainda</h3>
            <p className="text-sm text-white/30 max-w-sm mx-auto mb-6">
              Corrija sua primeira redação para começar a construir seu histórico de estudos.
            </p>
            <Link
              href="/correcao-ia"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm transition-all hover:shadow-glow"
            >
              <Brain className="w-4 h-4" />
              Corrigir redação agora
            </Link>
          </div>
        ) : (
          <>
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Buscar por tema..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#080c14] border border-white/8 rounded-xl text-sm text-white placeholder:text-white/25 outline-none focus:border-blue-500/40 transition-colors"
                />
              </div>
              <div className="flex items-center gap-1.5 bg-[#080c14] border border-white/8 rounded-xl p-1">
                {([
                  { key: "recent", label: "Recentes" },
                  { key: "oldest", label: "Antigas" },
                  { key: "highest", label: "Maior nota" },
                  { key: "lowest", label: "Menor nota" },
                ] as { key: SortKey; label: string }[]).map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSort(opt.key)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                      sort === opt.key ? "bg-blue-500/20 text-blue-300" : "text-white/40 hover:text-white/70"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="text-xs text-white/30">
              {filtered.length} redaç{filtered.length === 1 ? "ão" : "ões"} {search && `encontrada${filtered.length === 1 ? "" : "s"} para "${search}"`}
            </p>

            {/* List */}
            <div className="space-y-2.5">
              <AnimatePresence>
                {filtered.map((essay, i) => {
                  const score = safeNum(essay.score);
                  const prevIndex = localHistory.findIndex((e) => e.id === essay.id) + 1;
                  const prevEssay = localHistory[prevIndex];
                  const delta = prevEssay ? score - safeNum(prevEssay.score) : 0;

                  return (
                    <motion.button
                      key={essay.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: Math.min(i * 0.04, 0.4) }}
                      onClick={() => setSelected(essay)}
                      className="w-full glass rounded-2xl border border-white/5 hover:border-blue-500/20 p-4 flex items-center gap-4 text-left transition-all group"
                    >
                      <div className={cn(
                        "w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0 border",
                        score >= 800 ? "bg-green-500/10 border-green-500/20" :
                        score >= 600 ? "bg-blue-500/10 border-blue-500/20" :
                        "bg-orange-500/10 border-orange-500/20"
                      )}>
                        <span className={cn("text-lg font-black", getScoreColor(score))}>{score}</span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white/85 truncate group-hover:text-white transition-colors">
                          {essay.theme}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-xs text-white/35">{formatDate(essay.date)}</span>
                          <span className={cn("text-xs font-medium", getScoreColor(score))}>
                            {getScoreLabel(score)}
                          </span>
                          {essay.wasSimulado ? (
                            <span className="flex items-center gap-1 text-[10px] text-orange-400/80 bg-orange-500/10 border border-orange-500/20 px-1.5 py-0.5 rounded-full">
                              <Timer className="w-2.5 h-2.5" /> Simulado
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-[10px] text-blue-400/80 bg-blue-500/10 border border-blue-500/20 px-1.5 py-0.5 rounded-full">
                              <PenLine className="w-2.5 h-2.5" /> Treino
                            </span>
                          )}
                        </div>
                      </div>

                      {prevEssay && (
                        <div className={cn(
                          "hidden sm:flex items-center gap-1 text-xs font-semibold flex-shrink-0",
                          delta > 0 ? "text-green-400" : delta < 0 ? "text-red-400" : "text-white/30"
                        )}>
                          {delta > 0 ? <TrendingUp className="w-3.5 h-3.5" /> : delta < 0 ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                          {delta !== 0 && (delta > 0 ? `+${delta}` : delta)}
                        </div>
                      )}

                      <ArrowUpDown className="w-3.5 h-3.5 text-white/15 group-hover:text-white/40 transition-colors flex-shrink-0 rotate-90" />
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
}
