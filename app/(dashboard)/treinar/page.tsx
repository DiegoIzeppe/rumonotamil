"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import {
  PenLine, Clock, Save, Maximize2, Minimize2, Lightbulb, Zap,
  BarChart3, AlertCircle, CheckCircle2, ChevronRight, RotateCcw,
  Timer, Target, Brain, Shuffle, X, Send,
} from "lucide-react";
import { mockWeeklyTheme } from "@/lib/mock-data";
import { getColetaneaForTheme } from "@/lib/coletanea-data";
import { ColetaneaView } from "@/components/ui/coletanea";
import { cn, wordCount } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import toast from "react-hot-toast";

const themes = [
  { title: "Crise da Saúde Mental na Era Digital", tags: ["saúde", "tecnologia", "juventude"] },
  { title: "IA e Manipulação Comportamental nas Redes Sociais", tags: ["tecnologia", "ética", "política"] },
  { title: "Invisibilidade Social no Ambiente Digital", tags: ["desigualdade", "tecnologia"] },
  { title: "Desinformação e Democracia no Brasil", tags: ["política", "comunicação"] },
  { title: "Trabalho Invisível Feminino na Sociedade Contemporânea", tags: ["gênero", "trabalho"] },
  { title: "Racismo Estrutural e Mercado de Trabalho", tags: ["raça", "desigualdade"] },
];

const competencyTips = [
  { label: "C4 — Coesão", tip: "Use conectivos como: 'no entanto', 'ademais', 'por conseguinte', 'nesse contexto'.", color: "text-green-400" },
  { label: "C3 — Argumento", tip: "Desenvolva cada argumento com: dado concreto → análise → relação com o tema.", color: "text-blue-400" },
  { label: "C5 — Intervenção", tip: "Estrutura: Agente + Ação + Modo/Meio + Finalidade + Detalhamento.", color: "text-orange-400" },
];

export default function TreinarPage() {
  const [theme, setTheme] = useState(mockWeeklyTheme.title);
  const [fullscreen, setFullscreen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60 * 60); // 60 min
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showBrainstorm, setShowBrainstorm] = useState(false);
  const [sending, setSending] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"analysis" | "tips">("tips");
  const { setLastCorrectionResult, setCurrentTheme } = useAppStore();

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Comece sua redação aqui. Escreva com foco e clareza..." }),
      CharacterCount.configure({ limit: 3000 }),
      Highlight,
    ],
    editorProps: {
      attributes: {
        class: "tiptap-editor outline-none min-h-[500px] p-2",
      },
    },
    onUpdate: () => setSaved(false),
  });

  const words = editor ? wordCount(editor.getText()) : 0;
  const chars = editor?.storage.characterCount.characters() ?? 0;
  const paragraphs = editor ? editor.getText().split("\n\n").filter((p) => p.trim()).length : 0;

  // Autosave
  useEffect(() => {
    const timer = setTimeout(() => {
      if (editor && !saved) setSaved(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, [editor?.getText(), saved]);

  // Countdown timer
  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setTimerSeconds((s) => {
        if (s <= 0) { setTimerActive(false); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTimer = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleSendForCorrection = async () => {
    if (!editor || words < 100) return;
    setSending(true);
    try {
      const content = editor.getText();
      setCurrentTheme(theme);

      if (!process.env.NEXT_PUBLIC_APP_URL && typeof window !== "undefined") {
        // just navigate if no API key configured
      }

      const res = await fetch("/api/ai/correct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, theme }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? "Erro ao corrigir redação");
        return;
      }

      setLastCorrectionResult({ feedback: data.feedback, essayText: content });
      window.location.href = "/correcao-ia";
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const randomTheme = () => {
    const t = themes[Math.floor(Math.random() * themes.length)];
    setTheme(t.title);
  };

  const wordQuality = words < 150 ? "short" : words < 250 ? "ok" : words <= 350 ? "ideal" : "long";
  const qualityColors = { short: "text-red-400", ok: "text-yellow-400", ideal: "text-green-400", long: "text-orange-400" };
  const qualityLabels = { short: "Muito curta", ok: "Precisa mais", ideal: "Ideal ENEM", long: "Muito longa" };

  return (
    <div className={cn("max-w-7xl mx-auto", fullscreen && "fixed inset-0 z-50 bg-[#080c14] overflow-auto p-6")}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <PenLine className="w-6 h-6 text-blue-400" />
              Treinar Redação
            </h1>
            <p className="text-white/40 text-sm mt-1">Escreva com foco. A IA corrige ao final.</p>
          </div>
          <div className="flex items-center gap-2">
            {/* Timer */}
            <button
              onClick={() => setTimerActive(!timerActive)}
              className={cn(
                "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-mono font-bold border transition-all",
                timerActive
                  ? "border-orange-500/30 bg-orange-500/10 text-orange-300"
                  : "border-white/5 text-white/40 hover:border-white/10 hover:text-white/70"
              )}
            >
              <Timer className="w-4 h-4" />
              {formatTimer(timerSeconds)}
            </button>
            <button
              onClick={() => setFullscreen(!fullscreen)}
              className="p-2 rounded-xl border border-white/5 text-white/40 hover:text-white hover:border-white/10 transition-all"
            >
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Coletânea */}
        <ColetaneaView coletanea={getColetaneaForTheme(theme) ?? getColetaneaForTheme("Crise da Saúde Mental na Era Digital")!} collapsed />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Editor */}
          <div className="lg:col-span-3 space-y-4">
            {/* Theme selector */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
                <Target className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <input
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  placeholder="Digite ou selecione o tema..."
                  className="flex-1 bg-transparent text-sm font-medium text-white placeholder:text-white/30 outline-none"
                />
                <button onClick={randomTheme} title="Tema aleatório" className="p-1.5 rounded-lg hover:bg-white/5 text-white/30 hover:text-white/70 transition-colors">
                  <Shuffle className="w-4 h-4" />
                </button>
                <button onClick={() => setShowThemePicker(!showThemePicker)} className="text-xs text-blue-400 hover:text-blue-300 transition-colors border border-blue-500/20 rounded-lg px-2.5 py-1">
                  Temas
                </button>
              </div>

              {/* Theme picker */}
              <AnimatePresence>
                {showThemePicker && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {themes.map((t) => (
                        <button
                          key={t.title}
                          onClick={() => { setTheme(t.title); setShowThemePicker(false); }}
                          className={cn(
                            "text-left p-3 rounded-xl text-sm border transition-all",
                            theme === t.title
                              ? "border-blue-500/30 bg-blue-500/10 text-white"
                              : "border-white/5 text-white/60 hover:border-white/10 hover:bg-white/3"
                          )}
                        >
                          <p className="font-medium leading-snug mb-1">{t.title}</p>
                          <div className="flex gap-1 flex-wrap">
                            {t.tags.map((tag) => (
                              <span key={tag} className="text-[10px] text-white/30 border border-white/5 rounded px-1.5 py-0.5">{tag}</span>
                            ))}
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Editor area */}
              <div className="p-5 md:p-8">
                <EditorContent editor={editor} />
              </div>

              {/* Editor toolbar */}
              <div className="flex items-center justify-between px-5 py-3 border-t border-white/5">
                <div className="flex items-center gap-4 text-xs text-white/30">
                  <span className={cn("font-semibold", qualityColors[wordQuality])}>
                    {words} palavras — {qualityLabels[wordQuality]}
                  </span>
                  <span>{paragraphs} parágrafos</span>
                  <span>{chars}/3000 caracteres</span>
                  {saved && (
                    <span className="flex items-center gap-1 text-green-400/60">
                      <CheckCircle2 className="w-3 h-3" />
                      Salvo
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => editor?.commands.clearContent()}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-white/20 hover:text-white/50 transition-colors"
                    title="Limpar"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Send for correction */}
            <button
              onClick={handleSendForCorrection}
              disabled={words < 100 || sending}
              className={cn(
                "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all",
                words >= 100
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white hover:shadow-glow"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              )}
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Enviando para IA...
                </>
              ) : (
                <>
                  <Brain className="w-4 h-4" />
                  {words < 100 ? `Mínimo 100 palavras (${words}/100)` : "Enviar para Correção por IA"}
                </>
              )}
            </button>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-4">
            {/* Tab selector */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="flex border-b border-white/5">
                {(["tips", "analysis"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setSidebarTab(tab)}
                    className={cn(
                      "flex-1 py-2.5 text-xs font-medium transition-colors",
                      sidebarTab === tab ? "text-blue-400 border-b-2 border-blue-500" : "text-white/40 hover:text-white/70"
                    )}
                  >
                    {tab === "tips" ? "Dicas" : "Análise"}
                  </button>
                ))}
              </div>
              <div className="p-4">
                {sidebarTab === "tips" && (
                  <div className="space-y-3">
                    {competencyTips.map((tip, i) => (
                      <div key={i} className="p-3 rounded-xl bg-white/3 border border-white/5">
                        <p className={cn("text-[11px] font-bold mb-1.5 uppercase tracking-wider", tip.color)}>{tip.label}</p>
                        <p className="text-xs text-white/55 leading-relaxed">{tip.tip}</p>
                      </div>
                    ))}
                  </div>
                )}
                {sidebarTab === "analysis" && (
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                      <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">Palavras</p>
                      <div className="flex items-end justify-between">
                        <span className={cn("text-2xl font-black", qualityColors[wordQuality])}>{words}</span>
                        <span className="text-xs text-white/30">/ ~300 ideal</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full mt-2 overflow-hidden">
                        <div
                          className={cn("h-full rounded-full transition-all", words >= 250 && words <= 350 ? "bg-green-500" : "bg-blue-500")}
                          style={{ width: `${Math.min((words / 350) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-white/3 border border-white/5">
                      <p className="text-[11px] text-white/40 uppercase tracking-wider mb-2">Parágrafos</p>
                      <span className={cn("text-2xl font-black", paragraphs === 4 ? "text-green-400" : paragraphs < 4 ? "text-yellow-400" : "text-orange-400")}>
                        {paragraphs}
                      </span>
                      <p className="text-xs text-white/30 mt-1">ENEM espera 4 parágrafos</p>
                    </div>
                    {words > 50 && (
                      <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/15">
                        <div className="flex items-center gap-1.5 mb-1">
                          <Lightbulb className="w-3 h-3 text-blue-400" />
                          <p className="text-[11px] font-semibold text-blue-400">Dica automática</p>
                        </div>
                        <p className="text-xs text-white/55">
                          {words < 150
                            ? "Continue escrevendo. Sua redação precisa de mais desenvolvimento."
                            : "Lembre-se de incluir a proposta de intervenção no último parágrafo."}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Brainstorm */}
            <div className="glass rounded-2xl border border-white/5 p-4">
              <button
                onClick={() => setShowBrainstorm(!showBrainstorm)}
                className="w-full flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
              >
                <Zap className="w-4 h-4 text-blue-400" />
                Brainstorm com IA
                <ChevronRight className={cn("w-3.5 h-3.5 ml-auto transition-transform", showBrainstorm && "rotate-90")} />
              </button>
              <AnimatePresence>
                {showBrainstorm && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-white/40 font-medium">Repertórios para o tema atual:</p>
                      {mockWeeklyTheme.repertoires.map((r, i) => (
                        <div key={i} className="text-xs text-white/60 p-2 rounded-lg bg-white/3 border border-white/5 leading-snug">
                          <span className="text-blue-400 mr-1">›</span>{r}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sim mode */}
            <div className="glass rounded-2xl border border-orange-500/15 bg-orange-500/3 p-4">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="w-4 h-4 text-orange-400" />
                <p className="text-sm font-semibold text-white">Modo Simulado</p>
              </div>
              <p className="text-xs text-white/50 mb-3">Simule as condições reais do ENEM: 60 minutos, sem distrações.</p>
              <button
                onClick={() => { setTimerSeconds(60 * 60); setTimerActive(true); setFullscreen(true); }}
                className="w-full py-2 rounded-xl border border-orange-500/30 bg-orange-500/10 text-orange-300 text-xs font-semibold hover:bg-orange-500/20 transition-colors"
              >
                Iniciar simulado
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
