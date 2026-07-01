"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Brain, CheckCircle2, PenLine, Target, Hash, AlignLeft, Lightbulb, Send, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEssayCorrection, type EssayCorrectionOutput } from "@/hooks/use-essay-correction";
import { useAppStore } from "@/store/app-store";
import { EssayResult } from "@/components/essay/essay-result";

const CHECKLIST = [
  "Escrevi em modalidade escrita formal da Língua Portuguesa",
  "Minha redação tem introdução, 2 desenvolvimentos e conclusão",
  "Usei repertório sociocultural (filósofo, dado, obra)",
  "Conectivos variados entre parágrafos (não repeti 'além disso')",
  "Proposta de intervenção com agente, ação, meio e finalidade",
];

const WORD_IDEAL = { min: 250, max: 350 };

function UploadMode({
  onResult,
}: {
  onResult: (feedback: EssayCorrectionOutput, essayText: string) => void;
}) {
  const [text, setText] = useState("");
  const [theme, setTheme] = useState("");
  const [checklist, setChecklist] = useState<boolean[]>(CHECKLIST.map(() => false));
  const { correct, loading } = useEssayCorrection();
  const { currentTheme, addEssayToHistory, pendingEssayMeta, setPendingEssayMeta } = useAppStore();

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
      addEssayToHistory({
        theme: theme || "Sem tema",
        score: result.feedback.score,
        feedback: result.feedback,
        wasSimulado: pendingEssayMeta?.wasSimulado ?? false,
        usedAssistant: pendingEssayMeta?.usedAssistant ?? false,
        essayText: text,
      });
      setPendingEssayMeta(null);
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

export default function CorrecaoIAPage() {
  const [feedback, setFeedback] = useState<EssayCorrectionOutput | null>(null);
  const [essayText, setEssayText] = useState("");
  const [mounted, setMounted] = useState(false);
  const {
    lastCorrectionResult, setLastCorrectionResult,
    addEssayToHistory, pendingEssayMeta, setPendingEssayMeta, currentTheme,
  } = useAppStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Guard against reading the Zustand persist store before it finishes
    // rehydrating from localStorage — happens after a full page reload
    // (window.location.href), which is how /simulado and /treinar hand off
    // the correction result to this page.
    if (!mounted) return;
    if (lastCorrectionResult && !feedback) {
      const fb = lastCorrectionResult.feedback;
      // Guard against stale persisted data missing competency fields
      if (fb && fb.competency1 && fb.competency2 && fb.competency3 && fb.competency4 && fb.competency5) {
        setFeedback(fb);
        setEssayText(lastCorrectionResult.essayText ?? "");
        // /treinar and /simulado hand off the correction here via a full page
        // reload instead of going through UploadMode.handleCorrect — record
        // it in essayHistory the same way, or it never shows up anywhere.
        addEssayToHistory({
          theme: currentTheme || "Sem tema",
          score: fb.score,
          feedback: fb,
          wasSimulado: pendingEssayMeta?.wasSimulado ?? false,
          usedAssistant: pendingEssayMeta?.usedAssistant ?? false,
          essayText: lastCorrectionResult.essayText ?? "",
        });
        setPendingEssayMeta(null);
      }
      setLastCorrectionResult(null);
    }
  }, [mounted, lastCorrectionResult, feedback, setLastCorrectionResult, addEssayToHistory, pendingEssayMeta, setPendingEssayMeta, currentTheme]);

  const handleResult = (fb: EssayCorrectionOutput, text: string) => {
    setFeedback(fb);
    setEssayText(text);
  };

  const handleReset = () => {
    setFeedback(null);
    setEssayText("");
  };

  if (feedback) {
    return <EssayResult feedback={feedback} essayText={essayText} onReset={handleReset} />;
  }

  return <UploadMode onResult={handleResult} />;
}
