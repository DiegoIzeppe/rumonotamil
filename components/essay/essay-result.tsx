"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts";
import {
  Brain, CheckCircle2, AlertCircle, TrendingUp,
  ChevronDown, Sparkles, RotateCcw, FileText, ArrowRight, Zap,
} from "lucide-react";
import { cn, getScoreColor, getScoreLabel, getCompetencyLabel } from "@/lib/utils";
import { type EssayCorrectionOutput } from "@/hooks/use-essay-correction";

type CompTab = "positivos" | "negativos" | "oportunidades";

function CompetencyCard({
  label, score, detail, index,
}: {
  label: string;
  score: number;
  detail: EssayCorrectionOutput["competency1"];
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<CompTab>("positivos");

  const color = score >= 160 ? "text-green-400" : score >= 120 ? "text-blue-400" : "text-orange-400";
  const barGrad = score >= 160 ? "from-green-500 to-emerald-400" : score >= 120 ? "from-blue-500 to-cyan-400" : "from-orange-500 to-yellow-400";

  const tabItems: Record<CompTab, { icon: React.ReactNode; items: string[]; emptyMsg: string }> = {
    positivos: {
      icon: <CheckCircle2 className="w-3 h-3 text-green-400" />,
      items: detail.positivos,
      emptyMsg: "Nenhum ponto positivo identificado.",
    },
    negativos: {
      icon: <AlertCircle className="w-3 h-3 text-red-400" />,
      items: detail.negativos,
      emptyMsg: "Nenhum problema identificado.",
    },
    oportunidades: {
      icon: <TrendingUp className="w-3 h-3 text-blue-400" />,
      items: detail.oportunidades,
      emptyMsg: "Nenhuma sugestão adicional.",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-xl border border-white/5 overflow-hidden"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-black text-white/70">C{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white/80">{label}</span>
            <span className={cn("text-lg font-black", color)}>{score}/200</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(score / 200) * 100}%` }}
              transition={{ duration: 1, delay: index * 0.08 + 0.4 }}
              className={cn("h-full rounded-full bg-gradient-to-r", barGrad)}
            />
          </div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-white/30 transition-transform flex-shrink-0", open && "rotate-180")} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/5">
              {/* Tabs */}
              <div className="flex border-b border-white/5">
                {(["positivos", "negativos", "oportunidades"] as CompTab[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTab(t)}
                    className={cn(
                      "flex-1 py-2 text-xs font-medium transition-colors capitalize",
                      tab === t
                        ? t === "positivos" ? "text-green-400 border-b-2 border-green-500"
                          : t === "negativos" ? "text-red-400 border-b-2 border-red-500"
                          : "text-blue-400 border-b-2 border-blue-500"
                        : "text-white/30 hover:text-white/60"
                    )}
                  >
                    {t === "positivos" ? "Pontos fortes" : t === "negativos" ? "Problemas" : "Melhorias"}
                  </button>
                ))}
              </div>

              <div className="p-4 space-y-2">
                {tabItems[tab].items.length > 0 ? (
                  tabItems[tab].items.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-white/65 leading-relaxed">
                      <span className="flex-shrink-0 mt-0.5">{tabItems[tab].icon}</span>
                      <span>{item}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-white/30 italic">{tabItems[tab].emptyMsg}</p>
                )}
              </div>

              {detail.comentarioFinal && (
                <div className="px-4 pb-4 pt-0">
                  <p className="text-xs text-white/50 italic border-t border-white/5 pt-3 leading-relaxed">
                    {detail.comentarioFinal}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function EssayResult({
  feedback,
  essayText,
  onReset,
  resetLabel = "Nova redação",
  title = "Resultado da Correção",
}: {
  feedback: EssayCorrectionOutput;
  essayText: string;
  onReset: () => void;
  resetLabel?: string;
  title?: string;
}) {
  const radarData = [
    { subject: "C1", value: ((feedback.competency1?.score ?? 0) / 200) * 100 },
    { subject: "C2", value: ((feedback.competency2?.score ?? 0) / 200) * 100 },
    { subject: "C3", value: ((feedback.competency3?.score ?? 0) / 200) * 100 },
    { subject: "C4", value: ((feedback.competency4?.score ?? 0) / 200) * 100 },
    { subject: "C5", value: ((feedback.competency5?.score ?? 0) / 200) * 100 },
  ];

  const competencies = [
    { label: getCompetencyLabel(1), detail: feedback.competency1 },
    { label: getCompetencyLabel(2), detail: feedback.competency2 },
    { label: getCompetencyLabel(3), detail: feedback.competency3 },
    { label: getCompetencyLabel(4), detail: feedback.competency4 },
    { label: getCompetencyLabel(5), detail: feedback.competency5 },
  ];

  const paragraphs = essayText.split(/\n\n+/).filter((p) => p.trim());

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Brain className="w-7 h-7 text-blue-400" />
              {title}
            </h1>
            <p className="text-white/40 text-sm mt-1">IA Claude — Análise completa baseada nos critérios ENEM</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/5 text-white/50 hover:text-white hover:border-white/10 transition-all text-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              {resetLabel}
            </button>
          </div>
        </div>

        {/* Score hero */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 border border-blue-500/15 bg-gradient-to-br from-blue-500/5 to-transparent"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Score ring */}
            <div className="relative w-36 h-36 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <motion.circle
                  cx="80" cy="80" r="70" fill="none"
                  stroke="url(#scoreGrad2)" strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 70}
                  initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - feedback.score / 1000) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="scoreGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl font-black gradient-text"
                >
                  {feedback.score}
                </motion.span>
                <span className="text-xs text-white/40">de 1000</span>
              </div>
            </div>

            <div className="flex-1">
              <span className={cn("text-2xl font-black", getScoreColor(feedback.score))}>
                {getScoreLabel(feedback.score)}
              </span>
              <p className="text-sm text-white/60 leading-relaxed mt-2 mb-4">{feedback.generalFeedback}</p>
              <div className="grid grid-cols-5 gap-2">
                {competencies.map((c, i) => (
                  <div key={i} className="text-center">
                    <div className={cn(
                      "text-lg font-black",
                      c.detail.score === 200 ? "text-green-400" : c.detail.score >= 160 ? "text-blue-400" : c.detail.score >= 120 ? "text-yellow-400" : "text-red-400"
                    )}>
                      {c.detail.score}
                    </div>
                    <div className="text-[10px] text-white/30">C{i + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="hidden md:block w-44 h-44 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                  <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Competency cards */}
          <div className="lg:col-span-1 space-y-2">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Competências</h2>
            {competencies.map((c, i) => (
              <CompetencyCard key={i} label={c.label} score={c.detail.score} detail={c.detail} index={i} />
            ))}
          </div>

          {/* Essay + analysis */}
          <div className="lg:col-span-2 space-y-4">
            {/* Annotated essay */}
            {!essayText && (
              <div className="glass rounded-2xl border border-white/5 p-5 flex items-center gap-3">
                <FileText className="w-4 h-4 text-white/25 flex-shrink-0" />
                <p className="text-xs text-white/35">
                  Texto original não disponível — esta redação foi corrigida antes do histórico salvar o texto completo.
                </p>
              </div>
            )}
            {essayText && (
              <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
                  <FileText className="w-4 h-4 text-blue-400" />
                  <h2 className="text-sm font-semibold text-white">Sua redação anotada</h2>
                </div>
                <div className="p-5 space-y-3">
                  {paragraphs.map((para, i) => {
                    const note = feedback.paragraphNotes.find((n) => n.paragraph === i + 1);
                    return (
                      <div key={i}>
                        <div className={cn(
                          "p-3 rounded-xl border text-sm text-white/70 leading-relaxed",
                          note?.type === "positive" ? "border-green-500/15 bg-green-500/3" :
                          note?.type === "warning" ? "border-yellow-500/15 bg-yellow-500/3" :
                          note?.type === "error" ? "border-red-500/15 bg-red-500/3" :
                          "border-white/5"
                        )}>
                          {para}
                        </div>
                        {note && (
                          <div className={cn(
                            "mt-1.5 flex items-start gap-2 px-3 py-2 rounded-lg text-xs",
                            note.type === "positive" ? "text-green-400 bg-green-500/5" :
                            note.type === "warning" ? "text-yellow-400 bg-yellow-500/5" :
                            "text-red-400 bg-red-500/5"
                          )}>
                            {note.type === "positive"
                              ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                              : <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            }
                            <span>{note.note}</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Analysis panel */}
            <div className="glass rounded-2xl border border-blue-500/10 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Análise estratégica</h3>
              </div>

              <div className="space-y-3">
                <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-1">Visão geral</p>
                  <p className="text-xs text-white/70 leading-relaxed">{feedback.visaoGeral}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                    <p className="text-[10px] font-bold text-green-400 uppercase tracking-wider mb-1">Principal força</p>
                    <p className="text-xs text-white/65 leading-relaxed">{feedback.principalForca}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-red-500/5 border border-red-500/10">
                    <p className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Principal fraqueza</p>
                    <p className="text-xs text-white/65 leading-relaxed">{feedback.principalFraqueza}</p>
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-orange-500/5 border border-orange-500/10">
                  <p className="text-[10px] font-bold text-orange-400 uppercase tracking-wider mb-1">Estratégia para próxima redação</p>
                  <p className="text-xs text-white/65 leading-relaxed">{feedback.estrategiaEvolucao}</p>
                </div>
                <div className="p-3 rounded-xl bg-purple-500/5 border border-purple-500/10">
                  <p className="text-[10px] font-bold text-purple-400 uppercase tracking-wider mb-1">Previsão com melhorias</p>
                  <p className="text-xs text-white/65 leading-relaxed">{feedback.previsaoPotencial}</p>
                </div>
              </div>
            </div>

            {/* Strengths & weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass rounded-2xl border border-green-500/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <h3 className="text-sm font-semibold text-white">Pontos fortes</h3>
                </div>
                <ul className="space-y-2">
                  {feedback.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-green-400 mt-1">+</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-2xl border border-red-500/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <h3 className="text-sm font-semibold text-white">A melhorar</h3>
                </div>
                <ul className="space-y-2">
                  {feedback.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-red-400 mt-1">−</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggestions */}
            {feedback.suggestions.length > 0 && (
              <div className="glass rounded-2xl border border-blue-500/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <h3 className="text-sm font-semibold text-white">Sugestões da IA</h3>
                </div>
                <ul className="space-y-2">
                  {feedback.suggestions.map((s, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-white/65 p-2.5 rounded-lg bg-white/3 border border-white/5">
                      <ArrowRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
