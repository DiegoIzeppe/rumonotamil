"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Star, Calendar, Tag, Bookmark, ChevronDown,
  ChevronRight, Brain, PenLine, CheckCircle2, AlertCircle,
  Lightbulb, TrendingUp, BookOpen, Sparkles,
} from "lucide-react";
import { mockModelEssays, type CompetencyAnalysis } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from "recharts";

type Tab = "redacao" | "analise" | "tecnicas";

const scoreColor = (s: number) =>
  s === 200 ? "text-green-400" : s >= 160 ? "text-blue-400" : s >= 120 ? "text-yellow-400" : "text-red-400";

const scoreBg = (s: number) =>
  s === 200 ? "bg-green-500/10 border-green-500/20" :
  s >= 160 ? "bg-blue-500/10 border-blue-500/20" :
  s >= 120 ? "bg-yellow-500/10 border-yellow-500/20" :
  "bg-red-500/10 border-red-500/20";

const scoreLabel = (s: number) =>
  s === 200 ? "Excelente" : s === 160 ? "Bom" : s === 120 ? "Médio" : s === 80 ? "Precário" : "Muito precário";

function CompetencyCard({ analysis, index }: { analysis: CompetencyAnalysis; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="glass rounded-2xl border border-white/5 overflow-hidden"
    >
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start gap-4 p-5 text-left hover:bg-white/2 transition-colors"
      >
        {/* Score circle */}
        <div className={cn("w-16 h-16 rounded-xl border flex flex-col items-center justify-center flex-shrink-0", scoreBg(analysis.score))}>
          <span className={cn("text-2xl font-black leading-none", scoreColor(analysis.score))}>
            {analysis.score}
          </span>
          <span className="text-[10px] text-white/30 mt-0.5">/ 200</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full border", scoreBg(analysis.score), scoreColor(analysis.score))}>
              {scoreLabel(analysis.score)}
            </span>
            {analysis.score === 200 && <Star className="w-3.5 h-3.5 text-yellow-400" />}
          </div>
          <p className="text-sm font-bold text-white">{analysis.label}</p>
          <p className="text-xs text-white/50 mt-1 leading-relaxed">{analysis.summary}</p>
        </div>
        <ChevronDown className={cn("w-5 h-5 text-white/30 flex-shrink-0 mt-1 transition-transform", open && "rotate-180")} />
      </button>

      {/* Expanded content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 pt-1 space-y-5 border-t border-white/5">

              {/* Detailed analysis */}
              <div>
                <p className="text-[11px] font-bold text-white/40 uppercase tracking-wider mb-2">Análise detalhada</p>
                <p className="text-sm text-white/70 leading-relaxed">{analysis.detailedAnalysis}</p>
              </div>

              {/* Text evidence */}
              <div className="p-4 rounded-xl bg-white/3 border-l-2 border-blue-500/50">
                <p className="text-[11px] font-bold text-blue-400/70 uppercase tracking-wider mb-2">Trecho analisado</p>
                <p className="text-sm text-white/65 leading-relaxed italic">{analysis.textEvidence}</p>
              </div>

              {/* What worked + to improve */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/15">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400 flex-shrink-0" />
                    <p className="text-[11px] font-bold text-green-400 uppercase tracking-wider">O que funcionou</p>
                  </div>
                  <ul className="space-y-2">
                    {analysis.whatWorked.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-white/65 leading-relaxed">
                        <span className="text-green-400 mt-0.5 flex-shrink-0 font-bold">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={cn(
                  "p-4 rounded-xl border",
                  analysis.score === 200
                    ? "bg-white/3 border-white/5"
                    : "bg-orange-500/5 border-orange-500/15"
                )}>
                  <div className="flex items-center gap-2 mb-3">
                    {analysis.score === 200
                      ? <><Sparkles className="w-3.5 h-3.5 text-white/30 flex-shrink-0" /><p className="text-[11px] font-bold text-white/30 uppercase tracking-wider">Para reflexão</p></>
                      : <><AlertCircle className="w-3.5 h-3.5 text-orange-400 flex-shrink-0" /><p className="text-[11px] font-bold text-orange-400 uppercase tracking-wider">Como melhorar</p></>
                    }
                  </div>
                  <ul className="space-y-2">
                    {analysis.toImprove.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-white/65 leading-relaxed">
                        <span className={cn("mt-0.5 flex-shrink-0 font-bold", analysis.score === 200 ? "text-white/30" : "text-orange-400")}>
                          {analysis.score === 200 ? "·" : "→"}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ModelEssayDetailPage({ params }: { params: { slug: string } }) {
  const essay = mockModelEssays.find((e) => e.slug === params.slug) ?? mockModelEssays[0];
  const [activeTab, setActiveTab] = useState<Tab>("redacao");
  const [bookmarked, setBookmarked] = useState(false);
  const [activeParaIndex, setActiveParaIndex] = useState<number | null>(null);

  const radarData = [
    { subject: "C1", value: (essay.competency1 / 200) * 100 },
    { subject: "C2", value: (essay.competency2 / 200) * 100 },
    { subject: "C3", value: (essay.competency3 / 200) * 100 },
    { subject: "C4", value: (essay.competency4 / 200) * 100 },
    { subject: "C5", value: (essay.competency5 / 200) * 100 },
  ];

  const totalScore = essay.competency1 + essay.competency2 + essay.competency3 + essay.competency4 + essay.competency5;
  const paragraphs = essay.content.split("\n\n").filter(Boolean);

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "redacao", label: "Redação Anotada", icon: BookOpen },
    { id: "analise", label: "Análise Completa", icon: Brain },
    { id: "tecnicas", label: "Técnicas & Vocabulário", icon: Lightbulb },
  ];

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

        <Link href="/redacoes-modelo" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Banco de Redações
        </Link>

        {/* ── HERO CARD ── */}
        <div className="glass rounded-2xl p-6 border border-white/5 mb-6">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {essay.score >= 1000 && (
                  <span className="flex items-center gap-1 text-xs font-black px-2.5 py-1 rounded-full bg-gradient-to-r from-yellow-500 to-orange-400 text-white">
                    <Star className="w-3 h-3" />
                    NOTA MÁXIMA
                  </span>
                )}
                <span className="text-xs font-bold text-blue-300 border border-blue-500/20 bg-blue-500/5 px-2.5 py-1 rounded-full">
                  {totalScore}/1000
                </span>
                {essay.enEmYear && (
                  <span className="text-xs text-white/40 flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    ENEM {essay.enEmYear}
                  </span>
                )}
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">{essay.title}</h1>
              <p className="text-sm text-white/50">
                <span className="text-blue-400/70">Tema: </span>{essay.theme}
              </p>
            </div>
            <button onClick={() => setBookmarked(!bookmarked)} className={cn("p-2 rounded-lg transition-all flex-shrink-0", bookmarked ? "text-blue-400 bg-blue-500/10" : "text-white/30 hover:text-white/70")}>
              <Bookmark className="w-5 h-5" />
            </button>
          </div>

          {/* Score grid */}
          <div className="grid grid-cols-5 gap-2 mb-5">
            {[essay.competency1, essay.competency2, essay.competency3, essay.competency4, essay.competency5].map((s, i) => (
              <div key={i} className={cn("text-center p-3 rounded-xl border", scoreBg(s))}>
                <p className={cn("text-xl font-black leading-none", scoreColor(s))}>{s}</p>
                <p className="text-[10px] text-white/30 mt-1">C{i + 1}</p>
                <p className={cn("text-[10px] font-semibold mt-0.5", scoreColor(s))}>{scoreLabel(s)}</p>
              </div>
            ))}
          </div>

          {/* Overall analysis teaser */}
          <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
            <div className="flex items-start gap-2.5">
              <Brain className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-white/65 leading-relaxed">{essay.overallAnalysis}</p>
            </div>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="flex gap-1 p-1 glass rounded-xl border border-white/5 mb-6">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all",
                  activeTab === tab.id
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/25"
                    : "text-white/40 hover:text-white/70"
                )}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden sm:block">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ── TAB: REDAÇÃO ANOTADA ── */}
        {activeTab === "redacao" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">

            {/* Legend */}
            {essay.paragraphAnnotations.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-white/30">Clique no parágrafo para ver a análise:</span>
                {essay.paragraphAnnotations.map((a) => (
                  <button
                    key={a.index}
                    onClick={() => setActiveParaIndex(activeParaIndex === a.index ? null : a.index)}
                    className={cn(
                      "text-xs px-2.5 py-1 rounded-full border transition-all",
                      a.labelColor,
                      activeParaIndex === a.index ? "ring-1 ring-white/20 opacity-100" : "opacity-70 hover:opacity-100"
                    )}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            )}

            {/* Paragraphs */}
            <div className="space-y-3">
              {paragraphs.map((para, i) => {
                const anno = essay.paragraphAnnotations.find((a) => a.index === i);
                const isSelected = activeParaIndex === i;
                const isDimmed = activeParaIndex !== null && !isSelected;

                return (
                  <div key={i}>
                    <div
                      onClick={() => anno && setActiveParaIndex(isSelected ? null : i)}
                      className={cn(
                        "relative p-5 rounded-2xl border transition-all",
                        anno ? cn("cursor-pointer", anno.borderColor, anno.bgColor) : "border-white/5 glass",
                        isDimmed && "opacity-30"
                      )}
                    >
                      {anno && (
                        <span className={cn("absolute -top-2.5 left-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full border bg-[#080c14]", anno.labelColor)}>
                          {anno.label}
                        </span>
                      )}
                      <p className="text-sm text-white/85 leading-[1.9]">{para}</p>
                    </div>

                    {/* Annotation panel */}
                    <AnimatePresence>
                      {anno && isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className={cn("mx-4 p-5 rounded-b-2xl border-x border-b space-y-4", anno.borderColor, anno.bgColor)}>
                            {/* Structure */}
                            <div>
                              <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1">Estrutura</p>
                              <p className="text-xs text-white/70 font-medium">{anno.structure}</p>
                            </div>
                            {/* Technique */}
                            <div>
                              <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1">Técnica utilizada</p>
                              <p className="text-xs text-white/70 font-medium">{anno.technique}</p>
                            </div>
                            {/* Explanation */}
                            <div>
                              <p className="text-[10px] font-bold text-white/30 uppercase tracking-wider mb-1">Análise</p>
                              <p className="text-sm text-white/65 leading-relaxed">{anno.explanation}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Repertoires */}
            <div className="glass rounded-2xl border border-white/5 p-5 mt-2">
              <div className="flex items-center gap-2 mb-3">
                <Tag className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Repertórios utilizados</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {essay.repertoires.map((r) => (
                  <span key={r} className="text-xs text-white/65 border border-white/10 rounded-xl px-3 py-2 bg-white/3 leading-snug">
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* ── TAB: ANÁLISE COMPLETA ── */}
        {activeTab === "analise" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">

            {/* Radar */}
            <div className="glass rounded-2xl p-5 border border-white/5">
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Mapa de Competências</p>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-48 h-48 flex-shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.06)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 12 }} />
                      <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex-1 space-y-2 w-full">
                  {[essay.competency1, essay.competency2, essay.competency3, essay.competency4, essay.competency5].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <span className="text-xs font-bold text-white/40 w-6">C{i + 1}</span>
                      <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${(s / 200) * 100}%` }}
                          transition={{ duration: 0.8, delay: i * 0.1 }}
                          className={cn("h-full rounded-full", s === 200 ? "bg-green-500" : s >= 160 ? "bg-blue-500" : s >= 120 ? "bg-yellow-500" : "bg-red-500")}
                        />
                      </div>
                      <span className={cn("text-sm font-black w-8 text-right", scoreColor(s))}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Competency cards — accordion */}
            <div className="space-y-3">
              {essay.competencyAnalysis.map((analysis, i) => (
                <CompetencyCard key={i} analysis={analysis} index={i} />
              ))}
            </div>

          </motion.div>
        )}

        {/* ── TAB: TÉCNICAS & VOCABULÁRIO ── */}
        {activeTab === "tecnicas" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">

            {/* Key techniques */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white">Técnicas Utilizadas</h2>
              </div>
              <div className="space-y-3">
                {essay.keyTechniques.map((t, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/3 border border-white/5">
                    <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-[11px] font-black flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <p className="text-sm text-white/70 leading-relaxed">{t}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vocabulary highlights */}
            <div className="glass rounded-2xl p-6 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-4 h-4 text-yellow-400" />
                <h2 className="text-sm font-semibold text-white">Vocabulário de Alto Impacto</h2>
                <span className="text-xs text-white/30 ml-auto">estude e incorpore</span>
              </div>
              <div className="space-y-3">
                {essay.vocabularyHighlights.map((v, i) => {
                  const [term, ...rest] = v.split(" — ");
                  return (
                    <div key={i} className="p-3 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                      <p className="text-sm font-bold text-yellow-300 mb-1">{term}</p>
                      <p className="text-xs text-white/55 leading-relaxed">{rest.join(" — ")}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Strategic lessons */}
            <div className="glass rounded-2xl p-6 border border-green-500/10 bg-green-500/3">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <h2 className="text-sm font-semibold text-white">Lições Estratégicas</h2>
                <span className="text-xs text-green-400/60 ml-auto">aplique na sua próxima redação</span>
              </div>
              <div className="space-y-3">
                {essay.strategicLessons.map((l, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="text-green-400 font-bold mt-0.5 flex-shrink-0">→</span>
                    <p className="text-sm text-white/70 leading-relaxed">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Link href="/treinar">
              <div className="glass rounded-2xl border border-blue-500/20 bg-blue-500/5 p-5 hover:border-blue-500/35 transition-all group cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-white mb-1">Praticar com este tema</p>
                    <p className="text-xs text-white/50 leading-snug max-w-xs">{essay.theme}</p>
                  </div>
                  <div className="flex items-center gap-2 text-blue-400 group-hover:text-blue-300 flex-shrink-0 transition-colors">
                    <PenLine className="w-4 h-4" />
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </Link>

          </motion.div>
        )}

      </motion.div>
    </div>
  );
}
