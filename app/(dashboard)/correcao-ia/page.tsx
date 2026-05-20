"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts";
import {
  Brain, CheckCircle2, AlertCircle, TrendingUp, Download,
  ChevronDown, Sparkles, RotateCcw, FileText, ArrowRight,
  PenLine, Target, Hash, AlignLeft, Lightbulb, Send, Zap,
} from "lucide-react";
import { cn, getScoreColor, getScoreLabel, getCompetencyLabel } from "@/lib/utils";
import { useEssayCorrection, type EssayCorrectionOutput } from "@/hooks/use-essay-correction";
import { useAppStore } from "@/store/app-store";

const CHECKLIST = [
  "Escrevi em modalidade escrita formal da Língua Portuguesa",
  "Minha redação tem introdução, 2 desenvolvimentos e conclusão",
  "Usei repertório sociocultural (filósofo, dado, obra)",
  "Conectivos variados entre parágrafos (não repeti 'além disso')",
  "Proposta de intervenção com agente, ação, meio e finalidade",
];

const WORD_IDEAL = { min: 250, max: 350 };

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

function UploadMode({
  onResult,
}: {
  onResult: (feedback: EssayCorrectionOutput, essayText: string) => void;
}) {
  const [text, setText] = useState("");
  const [theme, setTheme] = useState("");
  const [checklist, setChecklist] = useState<boolean[]>(CHECKLIST.map(() => false));
  const { correct, loading } = useEssayCorrection();
  const { currentTheme, addEssayToHistory } = useAppStore();

  useEffect(() => {
    if (currentTheme && !theme) setTheme(currentTheme);
  }, [currentTheme]);

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
  const chars = text.length;

  const wordStatus =
    words === 0 ? "empty" :
    words < 150 ? "short" :
    words < WORD_IDEAL.min ? "ok" :
    words <= WORD_IDEAL.max ? "ideal" : "long";

  const wordColor = { empty: "text-white/20", short: "text-red-400", ok: "text-yellow-400", ideal: "text-green-400", long: "text-orange-400" }[wordStatus];
  const wordLabel = { empty: "Nenhuma palavra", short: "Muito curta", ok: "Aumentar um pouco", ideal: "Extensão ideal", long: "Muito longa" }[wordStatus];

  const canSubmit = words >= 150 && theme.trim().length > 0;

  const handleCorrect = async () => {
    const result = await correct(text, theme);
    if (result?.feedback) {
      addEssayToHistory({ theme: theme || "Sem tema", score: result.feedback.score, feedback: result.feedback });
      onResult(result.feedback, text);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <Brain className="w-7 h-7 text-blue-400" />
            Correção por IA
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Cole sua redação, informe o tema e receba análise completa por competência.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {/* Tema */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5">
                <Target className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <input
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Qual é o tema da sua redação? (obrigatório)"
                  className="flex-1 bg-transparent text-sm font-medium text-white placeholder:text-white/25 outline-none"
                />
                {theme.trim() && <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />}
              </div>
            </div>

            {/* Textarea */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                <PenLine className="w-4 h-4 text-white/30" />
                <span className="text-xs font-medium text-white/40">Texto da redação</span>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Cole ou escreva sua redação aqui.\n\nDica: use Enter duplo para separar parágrafos.`}
                rows={18}
                className="w-full bg-transparent px-5 py-4 text-sm text-white placeholder:text-white/15 outline-none resize-none leading-[1.85]"
              />
              <div className="flex items-center gap-4 px-5 py-3 border-t border-white/5 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Hash className="w-3 h-3 text-white/30" />
                  <span className={cn("text-xs font-semibold", wordColor)}>{words} palavras</span>
                  <span className="text-xs text-white/20">— {wordLabel}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <AlignLeft className="w-3 h-3 text-white/30" />
                  <span className={cn("text-xs font-semibold", paragraphs === 4 ? "text-green-400" : paragraphs > 0 ? "text-yellow-400" : "text-white/30")}>
                    {paragraphs} parágrafos
                  </span>
                  {paragraphs > 0 && paragraphs !== 4 && (
                    <span className="text-xs text-white/20">— ENEM espera 4</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 ml-auto">
                  <span className="text-xs text-white/20">{chars}/3000 caracteres</span>
                </div>
              </div>
              {words > 0 && (
                <div className="px-5 pb-4">
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-300",
                        wordStatus === "ideal" ? "bg-green-500" :
                        wordStatus === "long" ? "bg-orange-500" :
                        wordStatus === "short" ? "bg-red-500" : "bg-blue-500"
                      )}
                      style={{ width: `${Math.min((words / WORD_IDEAL.max) * 100, 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/20 mt-1">
                    <span>0</span>
                    <span className="text-white/30">250 ideal</span>
                    <span>350</span>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleCorrect}
              disabled={!canSubmit || loading}
              className={cn(
                "w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base transition-all",
                canSubmit && !loading
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 hover:shadow-glow"
                  : "bg-white/5 border border-white/5 text-white/25 cursor-not-allowed"
              )}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  IA analisando sua redação...
                </>
              ) : !theme.trim() ? (
                <>
                  <Target className="w-5 h-5" />
                  Informe o tema para continuar
                </>
              ) : words < 150 ? (
                <>
                  <Send className="w-5 h-5" />
                  Mínimo 150 palavras ({words}/150)
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Corrigir com IA — {words} palavras
                </>
              )}
            </button>
          </div>

          <div className="space-y-4">
            {/* Checklist */}
            <div className="glass rounded-2xl border border-white/5 p-5">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-semibold text-white">Checklist antes de enviar</p>
              </div>
              <div className="space-y-2.5">
                {CHECKLIST.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => setChecklist((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}
                    className="w-full flex items-start gap-2.5 text-left group"
                  >
                    <div className={cn(
                      "w-4 h-4 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all",
                      checklist[i] ? "bg-green-500 border-green-500" : "border-white/20 group-hover:border-white/40"
                    )}>
                      {checklist[i] && <CheckCircle2 className="w-3 h-3 text-white" />}
                    </div>
                    <span className={cn(
                      "text-xs leading-relaxed transition-colors",
                      checklist[i] ? "text-white/40 line-through" : "text-white/65 group-hover:text-white/80"
                    )}>
                      {item}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-white/5">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="text-white/30">Progresso</span>
                  <span className={cn(checklist.filter(Boolean).length === CHECKLIST.length ? "text-green-400" : "text-white/40")}>
                    {checklist.filter(Boolean).length}/{CHECKLIST.length}
                  </span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all"
                    style={{ width: `${(checklist.filter(Boolean).length / CHECKLIST.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* O que a IA avalia */}
            <div className="glass rounded-2xl border border-blue-500/10 bg-blue-500/3 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Brain className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-semibold text-white">O que a IA avalia</p>
              </div>
              <div className="space-y-2.5">
                {[
                  { label: "C1", desc: "Gramática, ortografia e norma culta", color: "text-purple-400" },
                  { label: "C2", desc: "Compreensão do tema e repertório", color: "text-blue-400" },
                  { label: "C3", desc: "Qualidade e progressão dos argumentos", color: "text-cyan-400" },
                  { label: "C4", desc: "Coesão e conectivos textuais", color: "text-green-400" },
                  { label: "C5", desc: "Proposta de intervenção detalhada", color: "text-orange-400" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-2.5">
                    <span className={cn("text-[11px] font-black mt-0.5 flex-shrink-0 w-5", item.color)}>{item.label}</span>
                    <span className="text-xs text-white/55 leading-snug">{item.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl border border-yellow-500/10 bg-yellow-500/3 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
                <p className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider">Dica</p>
              </div>
              <p className="text-xs text-white/60 leading-relaxed">
                A IA usa os mesmos critérios dos corretores humanos do ENEM. Quanto mais detalhada sua redação, mais preciso o feedback.
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ResultMode({
  feedback,
  essayText,
  onReset,
}: {
  feedback: EssayCorrectionOutput;
  essayText: string;
  onReset: () => void;
}) {
  const radarData = [
    { subject: "C1", value: (feedback.competency1.score / 200) * 100 },
    { subject: "C2", value: (feedback.competency2.score / 200) * 100 },
    { subject: "C3", value: (feedback.competency3.score / 200) * 100 },
    { subject: "C4", value: (feedback.competency4.score / 200) * 100 },
    { subject: "C5", value: (feedback.competency5.score / 200) * 100 },
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
              Resultado da Correção
            </h1>
            <p className="text-white/40 text-sm mt-1">IA Claude — Análise completa baseada nos critérios ENEM</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onReset}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/5 text-white/50 hover:text-white hover:border-white/10 transition-all text-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Nova redação
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

export default function CorrecaoIAPage() {
  const [feedback, setFeedback] = useState<EssayCorrectionOutput | null>(null);
  const [essayText, setEssayText] = useState("");
  const { lastCorrectionResult, setLastCorrectionResult } = useAppStore();

  useEffect(() => {
    if (lastCorrectionResult && !feedback) {
      setFeedback(lastCorrectionResult.feedback);
      setEssayText(lastCorrectionResult.essayText ?? "");
      setLastCorrectionResult(null);
    }
  }, []);

  const handleResult = (fb: EssayCorrectionOutput, text: string) => {
    setFeedback(fb);
    setEssayText(text);
  };

  const handleReset = () => {
    setFeedback(null);
    setEssayText("");
  };

  if (feedback) {
    return <ResultMode feedback={feedback} essayText={essayText} onReset={handleReset} />;
  }

  return <UploadMode onResult={handleResult} />;
}
