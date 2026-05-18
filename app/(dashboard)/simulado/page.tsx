"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { getColetaneaForTheme } from "@/lib/coletanea-data";
import { ColetaneaView } from "@/components/ui/coletanea";
import {
  Timer, Play, Pause, RotateCcw, Send, AlertTriangle,
  CheckCircle2, Target, Clock, Hash, AlignLeft,
  ChevronRight, Shuffle, Maximize2, Minimize2,
} from "lucide-react";
import { cn, wordCount } from "@/lib/utils";

const THEMES = [
  { title: "O impacto das redes sociais na democracia brasileira", difficulty: "Médio" },
  { title: "Desafios para a valorização dos povos indígenas no Brasil", difficulty: "Difícil" },
  { title: "A invisibilidade do trabalho doméstico feminino na sociedade contemporânea", difficulty: "Médio" },
  { title: "Crise de saúde mental entre jovens na era digital", difficulty: "Fácil" },
  { title: "Racismo estrutural e suas manifestações no mercado de trabalho", difficulty: "Difícil" },
  { title: "Desafios para a implementação da educação ambiental no Brasil", difficulty: "Médio" },
  { title: "O papel do Estado no combate à desinformação", difficulty: "Médio" },
  { title: "Desigualdade de acesso à tecnologia no Brasil", difficulty: "Fácil" },
];

const DURATIONS = [
  { label: "30 min", seconds: 30 * 60 },
  { label: "60 min", seconds: 60 * 60 },
  { label: "90 min", seconds: 90 * 60 },
];

type Phase = "setup" | "writing" | "finished";

function formatTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
}

export default function SimuladoPage() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [duration, setDuration] = useState(DURATIONS[1]);
  const [timeLeft, setTimeLeft] = useState(duration.seconds);
  const [running, setRunning] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Comece a escrever sua redação..." }),
      CharacterCount,
    ],
    editorProps: { attributes: { class: "outline-none min-h-[400px] p-1 text-sm leading-[1.9] text-white/85" } },
    editable: phase === "writing",
  });

  const words = editor ? wordCount(editor.getText()) : 0;
  const paragraphs = editor ? editor.getText().split("\n\n").filter((p) => p.trim()).length : 0;
  const pct = Math.round((1 - timeLeft / duration.seconds) * 100);
  const isUrgent = timeLeft <= 300 && timeLeft > 0;

  useEffect(() => {
    if (running && phase === "writing") {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(intervalRef.current!);
            setRunning(false);
            setPhase("finished");
            return 0;
          }
          if (t === 300) setShowWarning(true);
          return t - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current!);
    }
    return () => clearInterval(intervalRef.current!);
  }, [running, phase]);

  const handleStart = () => {
    setTimeLeft(duration.seconds);
    setPhase("writing");
    setRunning(true);
    editor?.setEditable(true);
    editor?.commands.clearContent();
    editor?.commands.focus();
  };

  const handleFinish = () => {
    setRunning(false);
    setPhase("finished");
  };

  const handleReset = () => {
    setRunning(false);
    setPhase("setup");
    setTimeLeft(duration.seconds);
    setShowWarning(false);
    editor?.commands.clearContent();
    editor?.setEditable(false);
  };

  const randomTheme = () => setSelectedTheme(THEMES[Math.floor(Math.random() * THEMES.length)]);

  // ── SETUP ──
  if (phase === "setup") {
    return (
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Timer className="w-7 h-7 text-orange-400" />
              Simulado ENEM
            </h1>
            <p className="text-white/40 text-sm mt-1">
              Condições reais — sem assistente, sem dicas, sem distrações. Só você e o texto.
            </p>
          </div>

          {/* Rules */}
          <div className="glass rounded-2xl p-5 border border-orange-500/15 bg-orange-500/3">
            <p className="text-xs font-bold text-orange-400 uppercase tracking-wider mb-3">Regras do simulado</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Sem acesso ao assistente IA",
                "Sem dicas de competências",
                "Tempo real com countdown",
                "Redação enviada ao finalizar",
                "Cronômetro não pode ser pausado",
                "Aviso 5 min antes do fim",
              ].map((rule, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-white/65">
                  <CheckCircle2 className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Theme selection */}
          <div className="glass rounded-2xl border border-white/8 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/6">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-semibold text-white">Escolha o tema</p>
              </div>
              <button onClick={randomTheme} className="flex items-center gap-1.5 text-xs text-white/45 hover:text-white/80 transition-colors border border-white/8 rounded-lg px-2.5 py-1.5">
                <Shuffle className="w-3.5 h-3.5" />
                Aleatório
              </button>
            </div>
            <div className="p-4 space-y-2">
              {THEMES.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedTheme(t)}
                  className={cn(
                    "w-full text-left p-3.5 rounded-xl border transition-all",
                    selectedTheme === t
                      ? "border-blue-500/35 bg-blue-500/10"
                      : "border-white/5 hover:border-white/12 hover:bg-white/3"
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className={cn("text-sm font-medium leading-snug", selectedTheme === t ? "text-white" : "text-white/65")}>
                      {t.title}
                    </p>
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0",
                      t.difficulty === "Fácil" ? "text-green-400 border-green-500/25 bg-green-500/8" :
                      t.difficulty === "Médio" ? "text-blue-400 border-blue-500/25 bg-blue-500/8" :
                      "text-orange-400 border-orange-500/25 bg-orange-500/8"
                    )}>
                      {t.difficulty}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Duration */}
          <div className="glass rounded-2xl p-5 border border-white/8">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-blue-400" />
              <p className="text-sm font-semibold text-white">Tempo disponível</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {DURATIONS.map((d) => (
                <button
                  key={d.label}
                  onClick={() => setDuration(d)}
                  className={cn(
                    "py-3 rounded-xl border text-sm font-bold transition-all",
                    duration === d
                      ? "border-blue-500/35 bg-blue-500/15 text-blue-300"
                      : "border-white/8 text-white/50 hover:border-white/15 hover:text-white/80"
                  )}
                >
                  {d.label}
                </button>
              ))}
            </div>
          </div>

          {/* Coletânea — setup */}
          <ColetaneaView coletanea={getColetaneaForTheme(selectedTheme.title) ?? { theme: selectedTheme.title, texts: [] }} collapsed />

          {/* Start */}
          <button
            onClick={handleStart}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-400 hover:from-orange-400 hover:to-orange-300 text-white font-bold text-base transition-all hover:shadow-[0_0_25px_rgba(249,115,22,0.4)]"
          >
            <Play className="w-5 h-5" />
            Iniciar Simulado — {duration.label}
          </button>
        </motion.div>
      </div>
    );
  }

  // ── FINISHED ──
  if (phase === "finished") {
    const timeUsed = duration.seconds - timeLeft;
    const m = Math.floor(timeUsed / 60);
    const s = timeUsed % 60;
    return (
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="glass rounded-2xl p-8 border border-green-500/15 bg-green-500/3 text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Simulado concluído!</h1>
            <p className="text-white/50 text-sm">Sua redação foi salva. Pronto para correção por IA.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Palavras", value: words, icon: Hash },
              { label: "Parágrafos", value: paragraphs, icon: AlignLeft },
              { label: "Tempo usado", value: `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`, icon: Clock },
            ].map((s2) => {
              const Icon = s2.icon;
              return (
                <div key={s2.label} className="glass rounded-xl p-4 border border-white/8 text-center">
                  <Icon className="w-4 h-4 text-blue-400 mx-auto mb-2" />
                  <p className="text-2xl font-black text-white">{s2.value}</p>
                  <p className="text-xs text-white/35 mt-0.5">{s2.label}</p>
                </div>
              );
            })}
          </div>

          {/* Essay preview */}
          <div className="glass rounded-2xl p-5 border border-white/8">
            <p className="text-xs font-bold text-white/35 uppercase tracking-wider mb-3">Sua redação</p>
            <p className="text-sm text-white/60 leading-relaxed line-clamp-6">
              {editor?.getText() || "Nenhum conteúdo escrito."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleReset} className="flex items-center justify-center gap-2 py-3.5 rounded-xl glass border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all text-sm font-semibold">
              <RotateCcw className="w-4 h-4" />
              Novo simulado
            </button>
            <a href="/correcao-ia" className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold transition-all hover:shadow-glow">
              <Send className="w-4 h-4" />
              Corrigir com IA
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── WRITING ──
  return (
    <div className={cn("mx-auto", fullscreen ? "fixed inset-0 z-50 bg-[#070b12] overflow-auto p-6 max-w-none" : "max-w-4xl")}>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">

        {/* Top bar */}
        <div className={cn(
          "flex items-center gap-4 p-3 rounded-2xl border",
          isUrgent ? "glass border-red-500/30 bg-red-500/5" : "glass border-white/8"
        )}>
          {/* Timer */}
          <div className={cn("flex items-center gap-2 font-mono text-2xl font-black", isUrgent ? "text-red-400" : "text-white")}>
            {isUrgent && <AlertTriangle className="w-5 h-5 animate-pulse" />}
            {formatTime(timeLeft)}
          </div>

          {/* Progress bar */}
          <div className="flex-1 h-2 bg-white/6 rounded-full overflow-hidden">
            <div
              className={cn("h-full rounded-full transition-all duration-1000", isUrgent ? "bg-red-500" : "bg-blue-500")}
              style={{ width: `${pct}%` }}
            />
          </div>

          {/* Stats */}
          <div className="hidden sm:flex items-center gap-4 text-xs text-white/40">
            <span className={cn("font-semibold", words >= 250 && words <= 350 ? "text-green-400" : "")}>
              {words} palavras
            </span>
            <span>{paragraphs} parágrafos</span>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1.5">
            <button onClick={() => setFullscreen(!fullscreen)} className="p-2 rounded-lg hover:bg-white/6 text-white/35 hover:text-white transition-colors">
              {fullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              Entregar
            </button>
          </div>
        </div>

        {/* Theme */}
        <div className="flex items-start gap-3 p-4 glass rounded-xl border border-white/8">
          <Target className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-[11px] font-bold text-white/35 uppercase tracking-wider mb-0.5">Tema</p>
            <p className="text-sm font-semibold text-white leading-snug">{selectedTheme.title}</p>
          </div>
        </div>

        {/* Coletânea — writing */}
        <ColetaneaView coletanea={getColetaneaForTheme(selectedTheme.title) ?? { theme: selectedTheme.title, texts: [] }} collapsed />

        {/* Warning overlay */}
        <AnimatePresence>
          {showWarning && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl border border-red-500/30 bg-red-500/8"
            >
              <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-red-300">5 minutos restantes!</p>
                <p className="text-xs text-red-400/70">Finalize sua proposta de intervenção e revise.</p>
              </div>
              <button onClick={() => setShowWarning(false)} className="ml-auto text-red-400/50 hover:text-red-400 text-xs">
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor */}
        <div className="glass rounded-2xl border border-white/8 overflow-hidden">
          <div className="px-6 py-3 border-b border-white/6 flex items-center justify-between">
            <p className="text-xs text-white/30">Redação — escreva com atenção</p>
            <p className="text-xs text-white/20">Sem assistente ativo</p>
          </div>
          <div className="px-6 py-5 min-h-[500px]">
            <EditorContent editor={editor} />
          </div>
        </div>

      </motion.div>
    </div>
  );
}
