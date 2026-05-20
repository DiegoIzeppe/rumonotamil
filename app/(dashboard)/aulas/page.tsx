"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2, Clock, ChevronRight, Lightbulb, Lock,
} from "lucide-react";
import { mockLessons, type LessonDifficulty, type LessonCategory } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const competencies = [
  { id: "C1" as LessonCategory, label: "Competência 1", sub: "Domínio da Norma Culta", color: "from-purple-500/20 to-purple-500/5", border: "border-purple-500/20", badge: "bg-purple-500/15 text-purple-300", dot: "bg-purple-400" },
  { id: "C2" as LessonCategory, label: "Competência 2", sub: "Compreensão da Proposta", color: "from-blue-500/20 to-blue-500/5", border: "border-blue-500/20", badge: "bg-blue-500/15 text-blue-300", dot: "bg-blue-400" },
  { id: "C3" as LessonCategory, label: "Competência 3", sub: "Argumentação", color: "from-cyan-500/20 to-cyan-500/5", border: "border-cyan-500/20", badge: "bg-cyan-500/15 text-cyan-300", dot: "bg-cyan-400" },
  { id: "C4" as LessonCategory, label: "Competência 4", sub: "Coesão Textual", color: "from-green-500/20 to-green-500/5", border: "border-green-500/20", badge: "bg-green-500/15 text-green-300", dot: "bg-green-400" },
  { id: "C5" as LessonCategory, label: "Competência 5", sub: "Proposta de Intervenção", color: "from-orange-500/20 to-orange-500/5", border: "border-orange-500/20", badge: "bg-orange-500/15 text-orange-300", dot: "bg-orange-400" },
];

const diffConfig: Record<LessonDifficulty, { label: string; icon: string; order: number }> = {
  BEGINNER: { label: "Iniciante", icon: "◆", order: 0 },
  INTERMEDIATE: { label: "Intermediário", icon: "◆◆", order: 1 },
  ADVANCED: { label: "Avançado", icon: "◆◆◆", order: 2 },
};

const diffCardColor: Record<LessonDifficulty, string> = {
  BEGINNER: "border-white/5 hover:border-green-500/25",
  INTERMEDIATE: "border-white/5 hover:border-blue-500/25",
  ADVANCED: "border-white/5 hover:border-orange-500/25",
};

const diffBadge: Record<LessonDifficulty, string> = {
  BEGINNER: "text-green-400 bg-green-500/10 border-green-500/20",
  INTERMEDIATE: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  ADVANCED: "text-orange-400 bg-orange-500/10 border-orange-500/20",
};

// getProgress is computed inside the component using real data

export default function AulasPage() {
  const [completedSlugs, setCompletedSlugs] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetch("/api/lessons/progress")
      .then((r) => r.json())
      .then((d) => { if (d.completedSlugs) setCompletedSlugs(new Set(d.completedSlugs)); })
      .catch(() => {});
  }, []);

  const isCompleted = (slug: string) => completedSlugs.has(slug) || mockLessons.find((l) => l.slug === slug)?.progress === 100;

  const dicasLessons = mockLessons
    .filter((l) => l.category === "DICAS")
    .sort((a, b) => diffConfig[a.difficulty].order - diffConfig[b.difficulty].order);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-10">

        {/* Header */}
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Método</h1>
          <p className="text-white/40 text-sm mt-1">
            3 aulas por competência — Iniciante, Intermediário e Avançado. Cada aula termina com uma questão prática corrigida por IA.
          </p>
        </div>

        {/* Competencies */}
        {competencies.map((comp, ci) => {
          const lessons = mockLessons
            .filter((l) => l.category === comp.id)
            .sort((a, b) => diffConfig[a.difficulty].order - diffConfig[b.difficulty].order);
          const doneLessons = lessons.filter((l) => isCompleted(l.slug)).length;
          const progress = { done: doneLessons, total: lessons.length, pct: lessons.length > 0 ? Math.round((doneLessons / lessons.length) * 100) : 0 };

          return (
            <motion.section
              key={comp.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.08 }}
            >
              {/* Section header */}
              <div className={cn("flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r mb-4 border", comp.color, comp.border)}>
                <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", comp.dot)} />
                  <div>
                    <p className="text-xs font-bold text-white/50 uppercase tracking-wider">{comp.label}</p>
                    <p className="text-base font-bold text-white">{comp.sub}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-xs text-white/40">{progress.done}/{progress.total} concluídas</p>
                    <div className="w-24 h-1.5 bg-white/10 rounded-full mt-1">
                      <div
                        className="h-full rounded-full bg-white/40 transition-all"
                        style={{ width: `${progress.pct}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 3 lesson cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {lessons.map((lesson, li) => {
                  const diff = diffConfig[lesson.difficulty];
                  const isLocked = li > 0 && !isCompleted(lessons[li - 1].slug);

                  return (
                    <Link
                      key={lesson.id}
                      href={isLocked ? "#" : `/aulas/${lesson.slug}`}
                      onClick={isLocked ? (e) => e.preventDefault() : undefined}
                    >
                      <div className={cn(
                        "glass rounded-2xl p-5 border transition-all h-full flex flex-col group",
                        isLocked
                          ? "opacity-50 cursor-not-allowed border-white/5"
                          : diffCardColor[lesson.difficulty]
                      )}>
                        {/* Top */}
                        <div className="flex items-start justify-between gap-2 mb-3">
                          <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded-full border", diffBadge[lesson.difficulty])}>
                            {diff.label}
                          </span>
                          {isLocked
                            ? <Lock className="w-4 h-4 text-white/20 flex-shrink-0" />
                            : isCompleted(lesson.slug)
                              ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                              : null
                          }
                        </div>

                        {/* Difficulty dots */}
                        <p className={cn("text-xs font-bold mb-2",
                          lesson.difficulty === "BEGINNER" ? "text-green-400/60" :
                            lesson.difficulty === "INTERMEDIATE" ? "text-blue-400/60" :
                              "text-orange-400/60"
                        )}>
                          {diff.icon}
                        </p>

                        {/* Title + description */}
                        <p className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-snug mb-1.5 flex-1">
                          {lesson.title}
                        </p>
                        <p className="text-xs text-white/40 leading-relaxed mb-4 line-clamp-2">
                          {lesson.description}
                        </p>

                        {/* Progress bar */}
                        {lesson.progress > 0 && lesson.progress < 100 && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between text-[11px] text-white/30 mb-1">
                              <span>Em andamento</span>
                              <span>{lesson.progress}%</span>
                            </div>
                            <div className="h-1 bg-white/5 rounded-full">
                              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${lesson.progress}%` }} />
                            </div>
                          </div>
                        )}

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/5">
                          <div className="flex items-center gap-1.5 text-xs text-white/30">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.readingTime} min</span>
                          </div>
                          {!isLocked && (
                            <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors" />
                          )}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </motion.section>
          );
        })}

        {/* Dicas Práticas */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-yellow-500/15 to-yellow-500/5 border border-yellow-500/20 mb-4">
            <div className="w-2 h-2 rounded-full bg-yellow-400" />
            <div>
              <p className="text-xs font-bold text-white/50 uppercase tracking-wider">Bônus</p>
              <p className="text-base font-bold text-white">Dicas Práticas</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {dicasLessons.map((lesson) => (
              <Link key={lesson.id} href={`/aulas/${lesson.slug}`}>
                <div className="glass rounded-2xl p-5 border border-yellow-500/10 hover:border-yellow-500/25 transition-all group h-full flex flex-col">
                  <div className="w-8 h-8 rounded-lg bg-yellow-500/15 flex items-center justify-center mb-3 flex-shrink-0">
                    <Lightbulb className="w-4 h-4 text-yellow-400" />
                  </div>
                  <p className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors leading-snug mb-1.5 flex-1">
                    {lesson.title}
                  </p>
                  <p className="text-xs text-white/40 leading-relaxed mb-4 line-clamp-2">
                    {lesson.description}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-1.5 text-xs text-white/30">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.readingTime} min</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-yellow-400 transition-colors" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </motion.section>

      </motion.div>
    </div>
  );
}
