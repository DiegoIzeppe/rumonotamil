"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import Highlight from "@tiptap/extension-highlight";
import {
  PenLine, Clock, Maximize2, Minimize2, Lightbulb, Zap,
  CheckCircle2, ChevronRight, RotateCcw,
  Timer, Target, Brain, ArrowLeft, TrendingUp, Flame,
  Search, Sparkles, Send,
} from "lucide-react";
import { getColetaneaForTheme } from "@/lib/coletanea-data";
import { ColetaneaView } from "@/components/ui/coletanea";
import { cn, wordCount } from "@/lib/utils";
import { useAppStore } from "@/store/app-store";
import { TRENDING_THEMES, getWeeklyTheme, type Theme } from "@/lib/weekly-theme";
import toast from "react-hot-toast";

const CATEGORIES = ["Todos", "Saúde", "Política", "Tecnologia", "Educação", "Gênero", "Direitos", "Meio Ambiente"];

const diffColor: Record<string, string> = {
  "Fácil": "text-green-400 bg-green-500/10 border-green-500/20",
  "Médio": "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
  "Difícil": "text-red-400 bg-red-500/10 border-red-500/20",
};

const catColor: Record<string, string> = {
  "Saúde": "text-blue-400",
  "Política": "text-purple-400",
  "Tecnologia": "text-cyan-400",
  "Educação": "text-green-400",
  "Gênero": "text-pink-400",
  "Direitos": "text-orange-400",
  "Meio Ambiente": "text-emerald-400",
};

const competencyTips = [
  { label: "C4 — Coesão", tip: "Use conectivos como: 'no entanto', 'ademais', 'por conseguinte', 'nesse contexto'.", color: "text-green-400" },
  { label: "C3 — Argumento", tip: "Desenvolva cada argumento com: dado concreto → análise → relação com o tema.", color: "text-blue-400" },
  { label: "C5 — Intervenção", tip: "Estrutura: Agente + Ação + Modo/Meio + Finalidade + Detalhamento.", color: "text-orange-400" },
];

// ─── Theme Picker ─────────────────────────────────────────────────────────────

function ThemePicker({ onSelect }: { onSelect: (theme: string) => void }) {
  const [filter, setFilter] = useState("Todos");
  const [search, setSearch] = useState("");
  const [custom, setCustom] = useState("");

  const weeklyTheme = getWeeklyTheme();

  const filtered = TRENDING_THEMES.filter((t) => {
    const matchCat = filter === "Todos" || t.category === filter;
    const matchSearch = !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.tags.some((tag) => tag.includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const trending = filtered.filter((t) => t.trending && t.title !== weeklyTheme.title);
  const others = filtered.filter((t) => !t.trending && t.title !== weeklyTheme.title);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <PenLine className="w-7 h-7 text-blue-400" />
            Treinar Redação
          </h1>
          <p className="text-white/40 text-sm mt-1">
            Escolha um tema para praticar. A IA corrige sua redação ao final.
          </p>
        </div>

        {/* Tema da Semana */}
        {!search && filter === "Todos" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/8 to-cyan-500/5 p-5 cursor-pointer group"
            onClick={() => onSelect(weeklyTheme.title)}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-blue-300 bg-blue-500/15 border border-blue-500/25 px-2.5 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" />
                    Tema da Semana
                  </span>
                  <span className="text-[10px] text-white/30 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Renova toda segunda-feira
                  </span>
                  <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full border", diffColor[weeklyTheme.difficulty])}>
                    {weeklyTheme.difficulty}
                  </span>
                </div>
                <h2 className="text-lg font-bold text-white mb-1.5 group-hover:text-blue-200 transition-colors">
                  {weeklyTheme.title}
                </h2>
                <p className="text-sm text-white/50 leading-relaxed mb-3">{weeklyTheme.context}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {weeklyTheme.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-white/40 border border-white/10 rounded px-1.5 py-0.5">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-300 text-sm font-semibold group-hover:bg-blue-500/30 transition-colors">
                <PenLine className="w-4 h-4" />
                Escrever
              </div>
            </div>
          </motion.div>
        )}

        {/* Search + custom */}
        <div className="flex gap-3">
          <div className="flex-1 glass rounded-2xl border border-white/5 flex items-center gap-3 px-4">
            <Search className="w-4 h-4 text-white/30 flex-shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar tema..."
              className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none py-3"
            />
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all",
                filter === cat
                  ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                  : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/70"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Trending section */}
        {trending.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Flame className="w-4 h-4 text-orange-400" />
              <h2 className="text-sm font-bold text-white">Em alta</h2>
              <TrendingUp className="w-3.5 h-3.5 text-orange-400/60" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {trending.map((t, i) => (
                <ThemeCard key={i} theme={t} onSelect={onSelect} highlight />
              ))}
            </div>
          </div>
        )}

        {/* Others */}
        {others.length > 0 && (
          <div>
            {trending.length > 0 && (
              <h2 className="text-sm font-bold text-white/50 mb-3">Outros temas</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {others.map((t, i) => (
                <ThemeCard key={i} theme={t} onSelect={onSelect} />
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-white/30 text-sm">
            Nenhum tema encontrado. Tente um tema personalizado abaixo.
          </div>
        )}

        {/* Custom theme */}
        <div className="glass rounded-2xl border border-blue-500/10 bg-blue-500/3 p-5">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-semibold text-white">Tema personalizado</h3>
          </div>
          <p className="text-xs text-white/40 mb-3">Tem um tema específico em mente? Digite abaixo.</p>
          <div className="flex gap-3">
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && custom.trim() && onSelect(custom.trim())}
              placeholder="Ex: Desafios da mobilidade urbana no Brasil..."
              className="flex-1 bg-[#080c14] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 outline-none focus:border-blue-500/40 transition-colors"
            />
            <button
              onClick={() => custom.trim() && onSelect(custom.trim())}
              disabled={!custom.trim()}
              className={cn(
                "px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2",
                custom.trim()
                  ? "bg-blue-500 text-white hover:bg-blue-400"
                  : "bg-white/5 text-white/20 cursor-not-allowed"
              )}
            >
              <Send className="w-4 h-4" />
              Usar
            </button>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

function ThemeCard({ theme, onSelect, highlight }: { theme: Theme; onSelect: (t: string) => void; highlight?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onSelect(theme.title)}
      className={cn(
        "text-left w-full glass rounded-2xl p-5 border transition-all group",
        highlight
          ? "border-blue-500/15 hover:border-blue-500/30 bg-blue-500/3"
          : "border-white/5 hover:border-white/15"
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          {theme.trending && (
            <span className="flex items-center gap-1 text-[10px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-0.5 rounded-full">
              <Flame className="w-2.5 h-2.5" />
              Em alta
            </span>
          )}
          {theme.enemYear && (
            <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full">
              {theme.enemYear}
            </span>
          )}
        </div>
        <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0", diffColor[theme.difficulty])}>
          {theme.difficulty}
        </span>
      </div>

      <h3 className={cn(
        "text-sm font-bold leading-snug mb-1.5 transition-colors group-hover:text-white",
        highlight ? "text-white/90" : "text-white/80"
      )}>
        {theme.title}
      </h3>
      <p className="text-xs text-white/40 leading-relaxed mb-3 line-clamp-2">{theme.context}</p>

      <div className="flex items-center justify-between">
        <div className="flex gap-1 flex-wrap">
          {theme.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] text-white/30 border border-white/8 rounded px-1.5 py-0.5">{tag}</span>
          ))}
        </div>
        <span className={cn("text-[11px] font-semibold flex-shrink-0", catColor[theme.category] ?? "text-white/40")}>
          {theme.category}
        </span>
      </div>

      <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs text-blue-400/70 group-hover:text-blue-400 transition-colors">
        <PenLine className="w-3.5 h-3.5" />
        Escrever sobre este tema
        <ChevronRight className="w-3 h-3 ml-auto" />
      </div>
    </motion.button>
  );
}

// ─── Editor ───────────────────────────────────────────────────────────────────

function Editor({ selectedTheme, onBack }: { selectedTheme: string; onBack: () => void }) {
  const [fullscreen, setFullscreen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(60 * 60);
  const [sending, setSending] = useState(false);
  const [sidebarTab, setSidebarTab] = useState<"analysis" | "tips">("tips");
  const { setLastCorrectionResult, setCurrentTheme, setPendingEssayMeta } = useAppStore();
  const [usedAssistant, setUsedAssistant] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Comece sua redação aqui. Escreva com foco e clareza..." }),
      CharacterCount.configure({ limit: 3000 }),
      Highlight,
    ],
    editorProps: { attributes: { class: "tiptap-editor outline-none min-h-[500px] p-2" } },
    onUpdate: () => setSaved(false),
  });

  const words = editor ? wordCount(editor.getText()) : 0;
  const chars = editor?.storage.characterCount.characters() ?? 0;
  const paragraphs = editor ? editor.getText().split("\n\n").filter((p) => p.trim()).length : 0;

  useEffect(() => {
    const timer = setTimeout(() => { if (editor && !saved) setSaved(true); }, 2000);
    return () => clearTimeout(timer);
  }, [editor?.getText(), saved]);

  useEffect(() => {
    if (!timerActive) return;
    const interval = setInterval(() => {
      setTimerSeconds((s) => { if (s <= 0) { setTimerActive(false); return 0; } return s - 1; });
    }, 1000);
    return () => clearInterval(interval);
  }, [timerActive]);

  const formatTimer = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  const handleSendForCorrection = async () => {
    if (!editor || words < 100) return;
    setSending(true);
    try {
      const content = editor.getText();
      setCurrentTheme(selectedTheme);
      // Capture metadata for achievement tracking
      const themeObj = TRENDING_THEMES.find((t) => t.title === selectedTheme);
      setPendingEssayMeta({
        wasSimulado: timerActive || timerSeconds < 3600, // timer was started
        usedAssistant,
        themeDifficulty: themeObj?.difficulty ?? "Médio",
      });
      const res = await fetch("/api/ai/correct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, theme: selectedTheme }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Erro ao corrigir redação"); return; }
      setLastCorrectionResult({ feedback: data.feedback, essayText: content });
      window.location.href = "/correcao-ia";
    } catch {
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  const wordQuality = words < 150 ? "short" : words < 250 ? "ok" : words <= 350 ? "ideal" : "long";
  const qualityColors = { short: "text-red-400", ok: "text-yellow-400", ideal: "text-green-400", long: "text-orange-400" };
  const qualityLabels = { short: "Muito curta", ok: "Precisa mais", ideal: "Ideal ENEM", long: "Muito longa" };
  const themeObj = TRENDING_THEMES.find((t) => t.title === selectedTheme);

  return (
    <div className={cn("max-w-7xl mx-auto", fullscreen && "fixed inset-0 z-50 bg-[#080c14] overflow-auto p-6")}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3 min-w-0">
            {!fullscreen && (
              <button
                onClick={onBack}
                className="p-2 rounded-xl border border-white/5 text-white/40 hover:text-white hover:border-white/10 transition-all flex-shrink-0"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <div className="min-w-0">
              <h1 className="text-base md:text-lg font-bold text-white flex items-center gap-2 truncate">
                <PenLine className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span className="truncate">{selectedTheme}</span>
              </h1>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                {themeObj && (
                  <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full border", diffColor[themeObj.difficulty])}>
                    {themeObj.difficulty}
                  </span>
                )}
                {themeObj?.enemYear && (
                  <span className="text-[10px] text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded-full font-bold">
                    {themeObj.enemYear}
                  </span>
                )}
                <p className="text-white/30 text-xs">Escreva com foco. A IA corrige ao final.</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
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

        {/* Coletânea — só exibe se houver dados para o tema */}
        {getColetaneaForTheme(selectedTheme) && (
          <ColetaneaView coletanea={getColetaneaForTheme(selectedTheme)!} collapsed />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Editor */}
          <div className="lg:col-span-3 space-y-4">
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-3 border-b border-white/5">
                <Target className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
                <span className="text-sm font-medium text-white/70 truncate">{selectedTheme}</span>
              </div>
              <div className="p-5 md:p-8">
                <EditorContent editor={editor} />
              </div>
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
                <button
                  onClick={() => editor?.commands.clearContent()}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-white/20 hover:text-white/50 transition-colors"
                  title="Limpar"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

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

            {/* Tema info */}
            {themeObj && (
              <div className="glass rounded-2xl border border-white/5 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <p className="text-sm font-semibold text-white">Contexto do tema</p>
                </div>
                <p className="text-xs text-white/55 leading-relaxed mb-3">{themeObj.context}</p>
                <div className="flex flex-wrap gap-1">
                  {themeObj.tags.map((tag) => (
                    <span key={tag} className="text-[10px] text-white/30 border border-white/8 rounded px-1.5 py-0.5">{tag}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Modo simulado */}
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TreinarPage() {
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);

  return (
    <AnimatePresence mode="wait">
      {!selectedTheme ? (
        <motion.div key="picker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <ThemePicker onSelect={(t) => setSelectedTheme(t)} />
        </motion.div>
      ) : (
        <motion.div key="editor" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Editor selectedTheme={selectedTheme} onBack={() => setSelectedTheme(null)} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
