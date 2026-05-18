"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search, BookMarked, Filter, ChevronDown, Copy, CheckCircle2,
  Lightbulb, Quote, BarChart3, BookOpen, Globe, Microscope, Landmark, Palette,
} from "lucide-react";
import {
  repertoires, repertoireThemes, repertoireCategories,
  type RepertoireCategory, type RepertoireTheme,
} from "@/lib/repertorios-data";
import { cn } from "@/lib/utils";

const categoryIcons: Record<RepertoireCategory, React.ElementType> = {
  filosofia: BookOpen,
  dados: BarChart3,
  literatura: BookMarked,
  historia: Landmark,
  ciencia: Microscope,
  arte: Palette,
  legislacao: Globe,
};

const categoryColors: Record<RepertoireCategory, string> = {
  filosofia: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  dados: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  literatura: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
  historia: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  ciencia: "text-green-400 bg-green-500/10 border-green-500/20",
  arte: "text-pink-400 bg-pink-500/10 border-pink-500/20",
  legislacao: "text-yellow-400 bg-yellow-500/10 border-yellow-500/20",
};

function RepertoireCard({ r }: { r: typeof repertoires[0] }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const Icon = categoryIcons[r.category];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(r.example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl border border-white/8 overflow-hidden"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-white/3 transition-colors"
      >
        <div className={cn("w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0", categoryColors[r.category])}>
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-sm font-bold text-white leading-snug">{r.author}</p>
              {r.work && <p className="text-xs text-white/45 mt-0.5 truncate">{r.work}</p>}
            </div>
            <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 mt-0.5", categoryColors[r.category])}>
              {repertoireCategories[r.category]}
            </span>
          </div>
          {r.quote && (
            <p className="text-xs text-white/55 italic mt-2 leading-snug line-clamp-1">
              "{r.quote}"
            </p>
          )}
          {!open && (
            <p className="text-xs text-white/40 mt-2 leading-relaxed line-clamp-2">{r.summary}</p>
          )}
          {/* Themes */}
          <div className="flex flex-wrap gap-1 mt-2">
            {r.themes.slice(0, 3).map((t) => (
              <span key={t} className="text-[10px] text-white/35 border border-white/8 rounded px-1.5 py-0.5">
                {repertoireThemes[t]}
              </span>
            ))}
          </div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-white/30 flex-shrink-0 mt-1 transition-transform", open && "rotate-180")} />
      </button>

      {/* Expanded */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-white/6">

              {/* Summary */}
              <div className="pt-4">
                <p className="text-[11px] font-bold text-white/35 uppercase tracking-wider mb-1.5">Resumo</p>
                <p className="text-sm text-white/65 leading-relaxed">{r.summary}</p>
              </div>

              {/* How to use */}
              <div className="p-4 rounded-xl bg-blue-500/6 border border-blue-500/12">
                <div className="flex items-center gap-2 mb-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-blue-400" />
                  <p className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Como usar na redação</p>
                </div>
                <p className="text-sm text-white/65 leading-relaxed">{r.howToUse}</p>
              </div>

              {/* Example */}
              <div className="p-4 rounded-xl bg-white/4 border border-white/8 relative group">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Quote className="w-3.5 h-3.5 text-white/40" />
                    <p className="text-[11px] font-bold text-white/40 uppercase tracking-wider">Exemplo de uso</p>
                  </div>
                  <button
                    onClick={handleCopy}
                    className={cn(
                      "flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-lg border transition-all",
                      copied
                        ? "text-green-400 border-green-500/25 bg-green-500/8"
                        : "text-white/35 border-white/10 hover:text-white/70 hover:border-white/20"
                    )}
                  >
                    {copied ? <><CheckCircle2 className="w-3 h-3" />Copiado!</> : <><Copy className="w-3 h-3" />Copiar</>}
                  </button>
                </div>
                <p className="text-sm text-white/70 leading-relaxed italic">{r.example}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {r.tags.map((tag) => (
                  <span key={tag} className="text-[11px] text-white/40 border border-white/8 rounded-lg px-2.5 py-1">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function RepertoriosPage() {
  const [search, setSearch] = useState("");
  const [activeTheme, setActiveTheme] = useState<RepertoireTheme | "all">("all");
  const [activeCategory, setActiveCategory] = useState<RepertoireCategory | "all">("all");

  const filtered = repertoires.filter((r) => {
    const matchSearch =
      search.length < 2 ||
      r.author.toLowerCase().includes(search.toLowerCase()) ||
      r.work?.toLowerCase().includes(search.toLowerCase()) ||
      r.summary.toLowerCase().includes(search.toLowerCase()) ||
      r.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchTheme = activeTheme === "all" || r.themes.includes(activeTheme);
    const matchCat = activeCategory === "all" || r.category === activeCategory;
    return matchSearch && matchTheme && matchCat;
  });

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <BookMarked className="w-7 h-7 text-blue-400" />
            Biblioteca de Repertórios
          </h1>
          <p className="text-white/40 text-sm mt-1">
            {repertoires.length} repertórios com resumo, como usar e exemplo pronto para copiar.
          </p>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(Object.keys(repertoireCategories) as RepertoireCategory[]).slice(0, 4).map((cat) => {
            const Icon = categoryIcons[cat];
            const count = repertoires.filter((r) => r.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(activeCategory === cat ? "all" : cat)}
                className={cn(
                  "glass rounded-xl p-3 border text-left transition-all",
                  activeCategory === cat ? "border-blue-500/30 bg-blue-500/8" : "border-white/8 hover:border-white/15"
                )}
              >
                <div className={cn("w-7 h-7 rounded-lg border flex items-center justify-center mb-2", categoryColors[cat])}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <p className="text-lg font-black text-white">{count}</p>
                <p className="text-[11px] text-white/40">{repertoireCategories[cat]}</p>
              </button>
            );
          })}
        </div>

        {/* Filters */}
        <div className="space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por autor, obra, tema ou palavra-chave..."
              className="w-full pl-11 pr-4 py-3 glass border border-white/8 rounded-xl text-sm text-white placeholder:text-white/25 outline-none focus:border-blue-500/35 transition-colors"
            />
          </div>

          {/* Theme pills */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTheme("all")}
              className={cn("flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                activeTheme === "all" ? "bg-blue-500/20 border-blue-500/30 text-blue-300" : "border-white/8 text-white/40 hover:text-white/70"
              )}
            >
              Todos os temas
            </button>
            {(Object.entries(repertoireThemes) as [RepertoireTheme, string][]).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setActiveTheme(activeTheme === key ? "all" : key)}
                className={cn("flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all",
                  activeTheme === key ? "bg-blue-500/20 border-blue-500/30 text-blue-300" : "border-white/8 text-white/40 hover:text-white/70"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/30">
            {filtered.length} repertório{filtered.length !== 1 ? "s" : ""} encontrado{filtered.length !== 1 ? "s" : ""}
          </p>
          {(activeTheme !== "all" || activeCategory !== "all" || search) && (
            <button
              onClick={() => { setActiveTheme("all"); setActiveCategory("all"); setSearch(""); }}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Limpar filtros
            </button>
          )}
        </div>

        {/* Cards */}
        <div className="space-y-3">
          {filtered.map((r) => <RepertoireCard key={r.id} r={r} />)}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <BookMarked className="w-12 h-12 text-white/10 mx-auto mb-3" />
            <p className="text-white/40 font-medium">Nenhum repertório encontrado</p>
            <p className="text-white/20 text-sm mt-1">Tente outros filtros ou termos de busca</p>
          </div>
        )}

      </motion.div>
    </div>
  );
}
