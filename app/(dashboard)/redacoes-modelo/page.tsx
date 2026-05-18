"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Search, Filter, Star, FileText, Tag, Calendar, Award, ChevronRight, Bookmark } from "lucide-react";
import { mockModelEssays } from "@/lib/mock-data";
import { cn, getScoreColor } from "@/lib/utils";

const themes = ["Todos", "Violência contra a mulher", "Manipulação de dados", "Trabalho feminino", "Saúde mental", "Educação"];
const years = ["Todos", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023"];
const scores = ["Todos", "1000", "960-999", "920-959", "880-919"];

function ScoreBadge({ score }: { score: number }) {
  const color = score === 1000 ? "from-yellow-500 to-orange-400 text-white shadow-[0_0_20px_rgba(251,191,36,0.3)]"
    : score >= 960 ? "from-green-500 to-emerald-400 text-white"
    : score >= 920 ? "from-blue-500 to-cyan-400 text-white"
    : "from-blue-600 to-blue-400 text-white";
  return (
    <span className={cn("inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-sm font-black bg-gradient-to-r", color)}>
      {score === 1000 && <Star className="w-3 h-3" />}
      {score}
    </span>
  );
}

function CompetencyMini({ scores }: { scores: number[] }) {
  return (
    <div className="flex gap-1">
      {scores.map((s, i) => (
        <div key={i} className="flex flex-col items-center gap-0.5">
          <div
            className={cn(
              "w-6 h-1.5 rounded-sm",
              s === 200 ? "bg-green-500" : s >= 160 ? "bg-blue-500" : s >= 120 ? "bg-yellow-500" : "bg-red-500"
            )}
          />
          <span className="text-[9px] text-white/30">C{i + 1}</span>
        </div>
      ))}
    </div>
  );
}

export default function RedacoesModeloPage() {
  const [search, setSearch] = useState("");
  const [activeTheme, setActiveTheme] = useState("Todos");
  const [activeYear, setActiveYear] = useState("Todos");
  const [activeScore, setActiveScore] = useState("Todos");
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set());

  const filtered = mockModelEssays.filter((e) => {
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase()) ||
      e.theme.toLowerCase().includes(search.toLowerCase()) ||
      e.repertoires.some((r) => r.toLowerCase().includes(search.toLowerCase()));
    return matchSearch;
  });

  const toggleBookmark = (id: string, ev: React.MouseEvent) => {
    ev.preventDefault();
    setBookmarks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Redações Nota 1000</h1>
          <p className="text-white/40 mt-1 text-sm">Aprenda com as melhores redações do ENEM. Anote técnicas, argmentos e repertórios.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Redações", value: mockModelEssays.length, icon: FileText },
            { label: "Nota máxima", value: mockModelEssays.filter((e) => e.score === 1000).length, icon: Star },
            { label: "Repertórios únicos", value: new Set(mockModelEssays.flatMap((e) => e.repertoires)).size, icon: Tag },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div key={s.label} className="glass rounded-xl p-4 border border-white/5 text-center">
                <Icon className="w-4 h-4 text-blue-400 mx-auto mb-2" />
                <p className="text-2xl font-black text-white">{s.value}</p>
                <p className="text-xs text-white/40">{s.label}</p>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por tema, repertório..."
              className="w-full pl-10 pr-4 py-2.5 glass border border-white/5 rounded-xl text-sm text-white placeholder:text-white/30 outline-none focus:border-blue-500/30 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {years.slice(0, 6).map((y) => (
              <button
                key={y}
                onClick={() => setActiveYear(y)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                  activeYear === y
                    ? "bg-blue-500/20 border-blue-500/30 text-blue-300"
                    : "border-white/5 text-white/40 hover:text-white/70"
                )}
              >
                {y !== "Todos" && <Calendar className="w-3 h-3" />}
                {y}
              </button>
            ))}
            <div className="h-7 w-px bg-white/5" />
            {scores.map((s) => (
              <button
                key={s}
                onClick={() => setActiveScore(s)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                  activeScore === s
                    ? "bg-yellow-500/20 border-yellow-500/30 text-yellow-300"
                    : "border-white/5 text-white/40 hover:text-white/70"
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Essays grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map((essay, i) => (
            <motion.div key={essay.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
              <Link href={`/redacoes-modelo/${essay.slug}`}>
                <div className="glass rounded-2xl p-5 border border-white/5 hover:border-blue-500/20 transition-all group h-full flex flex-col">
                  {/* Score + bookmark */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <ScoreBadge score={essay.score} />
                    <button
                      onClick={(e) => toggleBookmark(essay.id, e)}
                      className={cn(
                        "p-1.5 rounded-lg transition-all",
                        bookmarks.has(essay.id)
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-white/20 hover:text-white/50"
                      )}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-snug mb-2 flex-1">
                    {essay.title}
                  </h3>

                  {/* Theme */}
                  <p className="text-xs text-white/40 mb-3 line-clamp-1">
                    <span className="text-blue-400/70">Tema: </span>{essay.theme}
                  </p>

                  {/* Competency bars */}
                  <CompetencyMini scores={[essay.competency1, essay.competency2, essay.competency3, essay.competency4, essay.competency5]} />

                  {/* Repertoires */}
                  <div className="mt-3 flex flex-wrap gap-1">
                    {essay.repertoires.slice(0, 2).map((r) => (
                      <span key={r} className="text-[11px] text-white/30 border border-white/5 rounded-md px-1.5 py-0.5 truncate max-w-[140px]">
                        {r}
                      </span>
                    ))}
                    {essay.repertoires.length > 2 && (
                      <span className="text-[11px] text-white/20">+{essay.repertoires.length - 2}</span>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-white/30" />
                      <span className="text-xs text-white/30">ENEM {essay.enEmYear}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
