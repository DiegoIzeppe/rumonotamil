"use client";

import { useState, useEffect, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft, Clock, CheckCircle2, Bookmark, Sparkles,
  ChevronRight, StickyNote, Lightbulb, Brain,
  Send, RotateCcw, AlertCircle, TrendingUp, Star,
} from "lucide-react";
import { mockLessons } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface QuestionResult {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  correctedVersion: string | null;
}

const diffBadge: Record<string, string> = {
  BEGINNER:     "text-green-400 bg-green-500/10 border-green-500/20",
  INTERMEDIATE: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  ADVANCED:     "text-orange-400 bg-orange-500/10 border-orange-500/20",
};
const diffLabel: Record<string, string> = {
  BEGINNER: "Iniciante", INTERMEDIATE: "Intermediário", ADVANCED: "Avançado",
};
const catColor: Record<string, string> = {
  C1: "text-purple-400 border-purple-500/20 bg-purple-500/10",
  C2: "text-blue-400 border-blue-500/20 bg-blue-500/10",
  C3: "text-cyan-400 border-cyan-500/20 bg-cyan-500/10",
  C4: "text-green-400 border-green-500/20 bg-green-500/10",
  C5: "text-orange-400 border-orange-500/20 bg-orange-500/10",
  DICAS: "text-yellow-400 border-yellow-500/20 bg-yellow-500/10",
};

// Placeholder content — user will provide real content later
const PLACEHOLDER_CONTENT = (lesson: ReturnType<typeof mockLessons.find>) => {
  if (!lesson) return "";
  return `
## ${lesson.title}

> O conteúdo completo desta aula será adicionado em breve. Por enquanto, você já pode praticar com a questão ao final da página.

## O que você vai aprender

Esta aula aborda os conceitos fundamentais de **${lesson.title.split("—")[1]?.trim() ?? lesson.title}**, essenciais para dominar a ${lesson.competency ? `Competência ${lesson.competency}` : "redação ENEM"}.

## Conceitos principais

Nível **${diffLabel[lesson.difficulty]}** — ideal para quem ${
    lesson.difficulty === "BEGINNER" ? "está começando ou quer revisar os fundamentos." :
    lesson.difficulty === "INTERMEDIATE" ? "já conhece o básico e quer aprofundar." :
    "domina o intermediário e quer atingir excelência."
  }

## Conteúdo em construção

Os módulos desta plataforma estão sendo elaborados com cuidado por especialistas em redação ENEM. Em breve você terá acesso ao conteúdo completo desta aula.

**Enquanto isso:** vá direto para a questão prática abaixo e teste seu conhecimento atual sobre o tema!
  `;
};

function applyInlineMarkdown(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white/90 font-semibold">$1</strong>');
}

function renderContent(raw: string) {
  const lines = raw.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i].trimEnd();

    if (!line.trim()) { i++; continue; }

    // H1
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={i} className="text-base font-black text-white mt-8 mb-2 uppercase tracking-wide">
          {line.slice(2)}
        </h1>
      );
      i++; continue;
    }

    // H2
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="text-sm font-bold text-blue-400 mt-5 mb-2">
          {line.slice(3)}
        </h2>
      );
      i++; continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={i} className="border-l-2 border-blue-500 pl-4 py-2 my-3 text-white/60 italic text-sm bg-blue-500/5 rounded-r-xl pr-4">
          {line.slice(2)}
        </blockquote>
      );
      i++; continue;
    }

    // Horizontal rule
    if (line.trim() === "---") {
      elements.push(<hr key={i} className="border-white/8 my-5" />);
      i++; continue;
    }

    // Table — collect rows starting with |
    if (line.startsWith("| ")) {
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trimEnd().startsWith("| ")) {
        const row = lines[i];
        // Skip separator rows like |---|---|
        if (!row.match(/^\|\s*[-:]+\s*\|/)) {
          const cells = row.split("|").slice(1, -1).map((c) => c.trim());
          rows.push(cells);
        }
        i++;
      }
      if (rows.length > 0) {
        const isHeader = rows.length > 1;
        elements.push(
          <div key={`table-${i}`} className="my-4 overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <tbody>
                {rows.map((cells, ri) => (
                  <tr key={ri} className={ri === 0 && isHeader ? "border-b border-white/15" : ""}>
                    {cells.map((cell, ci) => (
                      <td
                        key={ci}
                        className={`px-3 py-2 text-left border border-white/8 ${
                          ri === 0 && isHeader ? "font-semibold text-white/80 bg-white/5" : "text-white/60"
                        }`}
                        dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(cell) }}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Bullet list — collect consecutive * lines
    if (line.startsWith("* ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trimEnd().startsWith("* ")) {
        items.push(lines[i].slice(2).trimEnd());
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-3 space-y-1.5 pl-4">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-sm text-white/65 leading-relaxed">
              <span className="text-blue-400 flex-shrink-0 mt-1.5 text-[8px]">●</span>
              <span dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(item) }} />
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Lines starting with ✅ — positive style
    if (line.trimStart().startsWith("✅")) {
      elements.push(
        <p key={i} className="flex items-start gap-2 text-sm text-green-300/90 leading-relaxed my-1.5">
          <span className="flex-shrink-0">✅</span>
          <span dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(line.trimStart().slice(2).trimStart()) }} />
        </p>
      );
      i++; continue;
    }

    // Lines starting with ❌ — negative style
    if (line.trimStart().startsWith("❌")) {
      elements.push(
        <p key={i} className="flex items-start gap-2 text-sm text-red-300/80 leading-relaxed my-1.5">
          <span className="flex-shrink-0">❌</span>
          <span dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(line.trimStart().slice(2).trimStart()) }} />
        </p>
      );
      i++; continue;
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-sm text-white/65 leading-[1.85] my-2"
        dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(line) }}
      />
    );
    i++;
  }
  return elements;
}

export default function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const lesson = mockLessons.find((l) => l.slug === slug);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [bookmarked, setBookmarked] = useState(false);
  const [completed, setCompleted] = useState(lesson?.progress === 100);
  const [answer, setAnswer] = useState("");
  const [correcting, setCorrecting] = useState(false);
  const [result, setResult] = useState<QuestionResult | null>(null);
  const [note, setNote] = useState("");
  const [markingDone, setMarkingDone] = useState(false);
  const [xpToast, setXpToast] = useState<number | null>(null);

  // Next lesson
  const currentIndex = mockLessons.findIndex((l) => l.slug === slug);
  const nextLesson = currentIndex >= 0 ? mockLessons[currentIndex + 1] : null;

  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCorrect = async () => {
    if (!lesson || answer.trim().length < 20) return;
    setCorrecting(true);
    setResult(null);
    try {
      const res = await fetch("/api/ai/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: lesson.practicalQuestion,
          answer: answer.trim(),
          lessonTitle: lesson.title,
          competency: lesson.competency,
        }),
      });
      const data = await res.json();
      setResult(data);
    } catch {
      setResult({
        score: 7,
        feedback: "Boa resposta! Continue praticando para aprimorar ainda mais.",
        strengths: ["Boa tentativa", "Demonstrou entendimento do tema"],
        improvements: ["Adicione mais detalhes", "Use exemplos concretos"],
        correctedVersion: null,
      });
    } finally {
      setCorrecting(false);
    }
  };

  if (!lesson) {
    return (
      <div className="max-w-4xl mx-auto text-center py-20">
        <p className="text-white/40">Aula não encontrada.</p>
        <Link href="/aulas" className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block">← Voltar</Link>
      </div>
    );
  }

  const content = lesson.content ?? PLACEHOLDER_CONTENT(lesson);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Sticky progress bar */}
      <div className="fixed top-16 left-0 right-0 z-20 h-0.5 bg-white/5">
        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100" style={{ width: `${scrollProgress}%` }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        {/* Back */}
        <Link href="/aulas" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" />
          Voltar para Método
        </Link>

        {/* Header card */}
        <div className="glass rounded-2xl p-6 border border-white/5 mb-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {lesson.competency && (
                  <span className={cn("text-xs font-bold px-2.5 py-1 rounded-lg border", catColor[lesson.category])}>
                    Competência {lesson.competency}
                  </span>
                )}
                {lesson.category === "DICAS" && (
                  <span className={cn("text-xs font-bold px-2.5 py-1 rounded-lg border", catColor["DICAS"])}>
                    Dica Prática
                  </span>
                )}
                <span className={cn("text-xs font-bold px-2.5 py-1 rounded-lg border", diffBadge[lesson.difficulty])}>
                  {diffLabel[lesson.difficulty]}
                </span>
                <span className="text-xs text-white/30 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {lesson.readingTime} min
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-white leading-tight mb-2">{lesson.title}</h1>
              <p className="text-sm text-white/50">{lesson.description}</p>
            </div>
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={cn("p-2 rounded-lg transition-all flex-shrink-0",
                bookmarked ? "text-blue-400 bg-blue-500/10" : "text-white/30 hover:text-white/70"
              )}
            >
              <Bookmark className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="glass rounded-2xl p-6 md:p-8 border border-white/5 mb-6">
          <div>{renderContent(content)}</div>
        </div>

        {/* Notes */}
        <div className="glass rounded-2xl p-5 border border-white/5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <StickyNote className="w-4 h-4 text-yellow-400" />
            <h3 className="text-sm font-semibold text-white">Minhas Anotações</h3>
          </div>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Anote o que aprendeu nesta aula..."
            className="w-full h-24 bg-white/3 border border-white/5 rounded-xl p-3 text-sm text-white placeholder:text-white/20 outline-none resize-none focus:border-blue-500/30 transition-colors"
          />
        </div>

        {/* ── QUESTÃO PRÁTICA ── */}
        <div className="glass rounded-2xl border border-blue-500/15 bg-blue-500/3 overflow-hidden mb-6">
          {/* Header */}
          <div className="flex items-center gap-3 px-6 py-4 border-b border-blue-500/10">
            <div className="w-9 h-9 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
              <Brain className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">Questão Prática</h2>
              <p className="text-xs text-white/40">Responda e receba correção personalizada por IA</p>
            </div>
          </div>

          <div className="p-6">
            {/* Question */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 mb-5">
              <div className="flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-white/85 leading-relaxed font-medium">{lesson.practicalQuestion}</p>
              </div>
            </div>

            {/* Answer area */}
            <div className="mb-4">
              <label className="block text-xs font-medium text-white/50 mb-2 uppercase tracking-wider">Sua resposta</label>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={!!result}
                placeholder="Escreva sua resposta aqui com clareza e precisão..."
                rows={6}
                className={cn(
                  "w-full bg-white/3 border rounded-xl p-4 text-sm text-white placeholder:text-white/20 outline-none resize-none transition-colors leading-relaxed",
                  result ? "border-white/5 opacity-70" : "border-white/10 focus:border-blue-500/40"
                )}
              />
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-xs text-white/25">{answer.length} caracteres</span>
                {result && (
                  <button
                    onClick={() => { setResult(null); setAnswer(""); }}
                    className="text-xs text-white/40 hover:text-white/70 flex items-center gap-1 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Tentar novamente
                  </button>
                )}
              </div>
            </div>

            {/* Submit button */}
            {!result && (
              <button
                onClick={handleCorrect}
                disabled={answer.trim().length < 20 || correcting}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all",
                  answer.trim().length >= 20
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 hover:shadow-glow"
                    : "bg-white/5 text-white/20 cursor-not-allowed"
                )}
              >
                {correcting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    IA corrigindo...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    {answer.trim().length < 20
                      ? `Mínimo 20 caracteres (${answer.trim().length}/20)`
                      : "Corrigir com IA"}
                  </>
                )}
              </button>
            )}

            {/* ── RESULT ── */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-5 space-y-4"
                >
                  {/* Score */}
                  <div className={cn(
                    "flex items-center gap-4 p-4 rounded-xl border",
                    result.score >= 8 ? "bg-green-500/8 border-green-500/20" :
                    result.score >= 6 ? "bg-blue-500/8 border-blue-500/20" :
                    "bg-orange-500/8 border-orange-500/20"
                  )}>
                    <div className={cn(
                      "w-14 h-14 rounded-xl flex flex-col items-center justify-center flex-shrink-0",
                      result.score >= 8 ? "bg-green-500/20" :
                      result.score >= 6 ? "bg-blue-500/20" : "bg-orange-500/20"
                    )}>
                      <span className={cn(
                        "text-2xl font-black",
                        result.score >= 8 ? "text-green-400" : result.score >= 6 ? "text-blue-400" : "text-orange-400"
                      )}>
                        {result.score}
                      </span>
                      <span className="text-[10px] text-white/30">/10</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        {result.score >= 8
                          ? <><Star className="w-4 h-4 text-yellow-400" /><span className="text-sm font-bold text-yellow-300">Excelente!</span></>
                          : result.score >= 6
                          ? <><CheckCircle2 className="w-4 h-4 text-blue-400" /><span className="text-sm font-bold text-blue-300">Bom trabalho!</span></>
                          : <><AlertCircle className="w-4 h-4 text-orange-400" /><span className="text-sm font-bold text-orange-300">Continue praticando</span></>
                        }
                      </div>
                      <p className="text-sm text-white/65 leading-relaxed">{result.feedback}</p>
                    </div>
                  </div>

                  {/* Strengths + Improvements */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-4 rounded-xl border border-green-500/15 bg-green-500/5">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                        <p className="text-xs font-bold text-green-400 uppercase tracking-wider">Pontos positivos</p>
                      </div>
                      <ul className="space-y-1">
                        {result.strengths.map((s, i) => (
                          <li key={i} className="text-xs text-white/65 flex items-start gap-1.5">
                            <span className="text-green-400 mt-0.5 flex-shrink-0">+</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl border border-orange-500/15 bg-orange-500/5">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-3.5 h-3.5 text-orange-400" />
                        <p className="text-xs font-bold text-orange-400 uppercase tracking-wider">A melhorar</p>
                      </div>
                      <ul className="space-y-1">
                        {result.improvements.map((s, i) => (
                          <li key={i} className="text-xs text-white/65 flex items-start gap-1.5">
                            <span className="text-orange-400 mt-0.5 flex-shrink-0">→</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Corrected version */}
                  {result.correctedVersion && (
                    <div className="p-4 rounded-xl border border-blue-500/15 bg-blue-500/5">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Versão ideal</p>
                      </div>
                      <p className="text-sm text-white/70 leading-relaxed italic">{result.correctedVersion}</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Complete + Next */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <button
            onClick={async () => {
              if (completed || markingDone) return;
              setMarkingDone(true);
              try {
                const res = await fetch("/api/lessons/progress", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ lessonSlug: slug, completed: true }),
                });
                const data = await res.json();
                setCompleted(true);
                if (data.xpAwarded > 0) {
                  setXpToast(data.xpAwarded);
                  setTimeout(() => setXpToast(null), 3000);
                }
              } catch {
                setCompleted(true);
              } finally {
                setMarkingDone(false);
              }
            }}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all border",
              completed
                ? "bg-green-500/15 border-green-500/25 text-green-300"
                : "bg-gradient-to-r from-blue-500 to-cyan-500 border-transparent text-white hover:shadow-glow"
            )}
          >
            {markingDone ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            {completed ? "Aula concluída ✓" : "Marcar como concluída"}
          </button>
          {xpToast !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="fixed bottom-6 right-6 z-50 glass border border-yellow-500/20 bg-yellow-500/10 text-yellow-300 px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              +{xpToast} XP conquistados!
            </motion.div>
          )}
          {nextLesson && (
            <Link href={`/aulas/${nextLesson.slug}`} className="flex-1">
              <button className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm glass border border-white/10 text-white/70 hover:text-white hover:border-white/20 transition-all">
                Próxima aula
                <ChevronRight className="w-4 h-4" />
              </button>
            </Link>
          )}
        </div>
      </motion.div>
    </div>
  );
}
