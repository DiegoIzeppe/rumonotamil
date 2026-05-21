"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  CalendarDays, CheckCircle2, Circle, Sparkles,
  Target, Clock, BookOpen, PenLine, RotateCcw, Zap,
  ChevronRight, ArrowRight, Brain, RefreshCw, X,
} from "lucide-react";
import { useAppStore, type StudyProfile, type StudyTask } from "@/store/app-store";
import { cn, formatDate } from "@/lib/utils";

// ─── Constants ───────────────────────────────────────────────────────────────

const TASK_COLORS: Record<string, string> = {
  LESSON:   "text-blue-400 bg-blue-500/10 border-blue-500/20",
  ESSAY:    "text-purple-400 bg-purple-500/10 border-purple-500/20",
  REVIEW:   "text-orange-400 bg-orange-500/10 border-orange-500/20",
  PRACTICE: "text-green-400 bg-green-500/10 border-green-500/20",
};
const TASK_ICONS: Record<string, React.ElementType> = {
  LESSON: BookOpen, ESSAY: PenLine, REVIEW: RotateCcw, PRACTICE: Target,
};
const TASK_LABELS: Record<string, string> = {
  LESSON: "Aula", ESSAY: "Redação", REVIEW: "Revisão", PRACTICE: "Prática",
};

// slug → competency → lesson level mapping
const COMP_LESSONS: Record<number, { slug: string; title: string }[]> = {
  1: [
    { slug: "c1-iniciante",     title: "C1 Iniciante — Fundamentos da Norma Culta" },
    { slug: "c1-intermediario", title: "C1 Intermediário — Ortografia e Regência" },
    { slug: "c1-avancado",      title: "C1 Avançado — Pontuação e Registros" },
  ],
  2: [
    { slug: "c2-iniciante",     title: "C2 Iniciante — Lendo a Proposta" },
    { slug: "c2-intermediario", title: "C2 Intermediário — Repertório Sociocultural" },
    { slug: "c2-avancado",      title: "C2 Avançado — Repertório Autoral" },
  ],
  3: [
    { slug: "c3-iniciante",     title: "C3 Iniciante — O que é Argumentação" },
    { slug: "c3-intermediario", title: "C3 Intermediário — Estruturas de Argumento" },
    { slug: "c3-avancado",      title: "C3 Avançado — Argumentação Sem Senso Comum" },
  ],
  4: [
    { slug: "c4-iniciante",     title: "C4 Iniciante — Coesão: o que é e por que importa" },
    { slug: "c4-intermediario", title: "C4 Intermediário — Conectivos e Operadores" },
    { slug: "c4-avancado",      title: "C4 Avançado — Progressão Temática" },
  ],
  5: [
    { slug: "c5-iniciante",     title: "C5 Iniciante — O que o ENEM espera na Intervenção" },
    { slug: "c5-intermediario", title: "C5 Intermediário — Proposta Detalhada" },
    { slug: "c5-avancado",      title: "C5 Avançado — Intervenção Criativa" },
  ],
};

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

// ─── Plan generator ───────────────────────────────────────────────────────────

function generatePlan(
  profile: StudyProfile,
  completedSlugs: string[],
  essayHistory: { feedback: { competency1?: { score?: number }; competency2?: { score?: number }; competency3?: { score?: number }; competency4?: { score?: number }; competency5?: { score?: number } } }[]
): StudyTask[] {
  const tasks: StudyTask[] = [];
  const today = new Date();
  let dayOffset = 0;

  const addDays = (n: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() + n);
    return d.toISOString().slice(0, 10);
  };

  // Determine weakest competencies
  let weakOrder: number[];
  if (essayHistory.length > 0) {
    // Calculate avg per competency from real essays
    const avgs = [1, 2, 3, 4, 5].map((c) => {
      const key = `competency${c}` as keyof typeof essayHistory[0]["feedback"];
      const scores = essayHistory.map((e) => (e.feedback[key] as any)?.score ?? 0).filter((s) => s > 0);
      return { c, avg: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 100 };
    });
    weakOrder = avgs.sort((a, b) => a.avg - b.avg).map((x) => x.c);
  } else {
    // Use profile weak competencies, then fill with remainder
    const rest = [1, 2, 3, 4, 5].filter((c) => !profile.weakCompetencies.includes(c));
    weakOrder = [...profile.weakCompetencies, ...rest];
  }

  // Urgency → how many lessons to include
  const urgencyLessons = { "less1m": 3, "1-3m": 6, "3-6m": 9, "6m+": 12 }[profile.urgency];
  // Hours → essays per week
  const essaysPerWeek = profile.hoursPerDay >= 3 ? 3 : profile.hoursPerDay >= 2 ? 2 : 1;

  let lessonCount = 0;
  for (const comp of weakOrder) {
    if (lessonCount >= urgencyLessons) break;
    const lessons = COMP_LESSONS[comp].filter((l) => !completedSlugs.includes(l.slug));
    for (const lesson of lessons) {
      if (lessonCount >= urgencyLessons) break;
      tasks.push({
        id: `task-lesson-${lesson.slug}`,
        title: `Aula: ${lesson.title}`,
        type: "LESSON",
        completed: false,
        competency: comp,
        slug: lesson.slug,
        dueDate: addDays(dayOffset),
      });
      dayOffset += Math.max(1, Math.round(3 / profile.hoursPerDay));
      lessonCount++;
    }
    // Add a review after each competency block
    if (lessons.length > 0 && lessonCount < urgencyLessons) {
      tasks.push({
        id: `task-review-c${comp}-${dayOffset}`,
        title: `Revisão: Exercícios práticos de C${comp}`,
        type: "REVIEW",
        completed: false,
        competency: comp,
        dueDate: addDays(dayOffset),
      });
      dayOffset += 1;
    }
  }

  // Add essays distributed throughout
  const essayTitles = [
    "Redação: Tema da semana",
    "Redação: Foco em C5 — Proposta de intervenção",
    "Redação: Foco em coesão — Variar conectivos",
    "Redação: Simulado cronometrado",
  ];
  for (let i = 0; i < essaysPerWeek && i < essayTitles.length; i++) {
    tasks.push({
      id: `task-essay-${i + 1}`,
      title: essayTitles[i],
      type: i === 3 ? "PRACTICE" : "ESSAY",
      completed: false,
      dueDate: addDays(Math.round((i + 1) * (dayOffset / (essaysPerWeek + 1)))),
    });
  }

  // Sort by dueDate
  return tasks.sort((a, b) => (a.dueDate ?? "").localeCompare(b.dueDate ?? ""));
}

// ─── Questionnaire ────────────────────────────────────────────────────────────

interface QuestionnaireProps {
  onComplete: (profile: StudyProfile) => void;
  onClose: () => void;
}

type Step = 0 | 1 | 2 | 3 | 4;

function Questionnaire({ onComplete, onClose }: QuestionnaireProps) {
  const [step, setStep] = useState<Step>(0);
  const [urgency, setUrgency] = useState<StudyProfile["urgency"] | null>(null);
  const [hours, setHours] = useState<StudyProfile["hoursPerDay"] | null>(null);
  const [target, setTarget] = useState<StudyProfile["targetScore"] | null>(null);
  const [level, setLevel] = useState<StudyProfile["level"] | null>(null);
  const [weakComps, setWeakComps] = useState<number[]>([]);

  const steps = [
    {
      question: "Quando é seu próximo ENEM?",
      sub: "Vamos calibrar o ritmo do plano ao seu tempo disponível.",
      options: [
        { label: "Menos de 1 mês", value: "less1m", icon: "🔥" },
        { label: "1 a 3 meses",    value: "1-3m",   icon: "⚡" },
        { label: "3 a 6 meses",    value: "3-6m",   icon: "📅" },
        { label: "Mais de 6 meses",value: "6m+",    icon: "🎯" },
      ],
    },
    {
      question: "Quantas horas por dia você pode estudar?",
      sub: "Seja realista — consistência vale mais que intensidade.",
      options: [
        { label: "1 hora",   value: 1, icon: "🌱" },
        { label: "2 horas",  value: 2, icon: "📚" },
        { label: "3-4 horas",value: 3, icon: "💪" },
        { label: "5h ou mais",value: 5, icon: "🚀" },
      ],
    },
    {
      question: "Qual nota você quer atingir no ENEM?",
      sub: "Sua meta define a profundidade do plano.",
      options: [
        { label: "700 pontos",  value: 700,  icon: "🥉" },
        { label: "800 pontos",  value: 800,  icon: "🥈" },
        { label: "900 pontos",  value: 900,  icon: "🥇" },
        { label: "1000 pontos", value: 1000, icon: "👑" },
      ],
    },
    {
      question: "Como você se avalia na redação ENEM hoje?",
      sub: "Sua autoavaliação ajuda a calibrar o nível inicial.",
      options: [
        { label: "Iniciante",      value: "iniciante",     icon: "🌱", desc: "Ainda aprendo as regras básicas" },
        { label: "Intermediário",  value: "intermediario", icon: "📖", desc: "Sei o básico, quero evoluir" },
        { label: "Avançado",       value: "avancado",      icon: "🎓", desc: "Domino bem, quero afinar" },
      ],
    },
    {
      question: "Quais competências você sente mais dificuldade?",
      sub: "Selecione todas que se aplicam. Pularemos as que você já domina.",
      multi: true,
      options: [
        { label: "C1 — Norma culta e gramática",    value: 1, icon: "✍️" },
        { label: "C2 — Tema e repertório",           value: 2, icon: "📚" },
        { label: "C3 — Argumentação",               value: 3, icon: "🧠" },
        { label: "C4 — Coesão e conectivos",        value: 4, icon: "🔗" },
        { label: "C5 — Proposta de intervenção",    value: 5, icon: "🛠️" },
      ],
    },
  ];

  const current = steps[step];
  const progress = ((step) / steps.length) * 100;

  const isSelected = (v: any) => {
    if (step === 0) return urgency === v;
    if (step === 1) return hours === v;
    if (step === 2) return target === v;
    if (step === 3) return level === v;
    if (step === 4) return weakComps.includes(v);
    return false;
  };

  const handleSelect = (v: any) => {
    if (step === 0) setUrgency(v);
    else if (step === 1) setHours(v);
    else if (step === 2) setTarget(v);
    else if (step === 3) setLevel(v);
    else if (step === 4) {
      setWeakComps((p) => p.includes(v) ? p.filter((x) => x !== v) : [...p, v]);
      return; // don't auto-advance on multi-select
    }
    // Auto-advance for single-select steps
    if (step < 4) setTimeout(() => setStep((s) => (s + 1) as Step), 220);
  };

  const canFinish = urgency && hours && target && level;

  const handleFinish = () => {
    if (!canFinish) return;
    onComplete({
      urgency: urgency!,
      hoursPerDay: hours!,
      targetScore: target!,
      level: level!,
      weakCompetencies: weakComps.length > 0 ? weakComps : [1, 2, 3, 4, 5],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="glass border border-white/10 rounded-2xl w-full max-w-lg shadow-glass overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-white/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-400" />
              <span className="text-sm font-bold text-white">Montar meu plano</span>
            </div>
            <button onClick={onClose} className="text-white/30 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress + 20}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              transition={{ duration: 0.3 }}
            />
          </div>
          <p className="text-[11px] text-white/30 mt-1.5">Pergunta {step + 1} de {steps.length}</p>
        </div>

        {/* Question */}
        <div className="px-6 py-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              <h2 className="text-lg font-bold text-white mb-1">{current.question}</h2>
              <p className="text-sm text-white/40 mb-5">{current.sub}</p>
              <div className="space-y-2">
                {current.options.map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => handleSelect(opt.value)}
                    className={cn(
                      "w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all",
                      isSelected(opt.value)
                        ? "border-blue-500/40 bg-blue-500/15 text-white"
                        : "border-white/8 hover:border-white/20 hover:bg-white/3 text-white/70"
                    )}
                  >
                    <span className="text-lg flex-shrink-0">{opt.icon}</span>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{opt.label}</p>
                      {"desc" in opt && opt.desc && (
                        <p className="text-xs text-white/40 mt-0.5">{opt.desc}</p>
                      )}
                    </div>
                    {isSelected(opt.value) && <CheckCircle2 className="w-4 h-4 text-blue-400 ml-auto flex-shrink-0" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex items-center justify-between">
          {step > 0 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as Step)}
              className="text-sm text-white/40 hover:text-white transition-colors"
            >
              ← Voltar
            </button>
          ) : <span />}

          {step === 4 ? (
            <button
              onClick={handleFinish}
              disabled={!canFinish}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:bg-white/10 disabled:text-white/20 text-white text-sm font-bold transition-all"
            >
              <Sparkles className="w-4 h-4" />
              Gerar meu plano
            </button>
          ) : (
            <button
              onClick={() => setStep((s) => (s + 1) as Step)}
              disabled={
                (step === 0 && !urgency) ||
                (step === 1 && !hours) ||
                (step === 2 && !target) ||
                (step === 3 && !level)
              }
              className="text-sm text-blue-400 hover:text-blue-300 disabled:text-white/20 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
            >
              Próximo <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PlanoDeEstudosPage() {
  const {
    completedLessonSlugs, essayHistory,
    studyProfile, setStudyProfile,
    studyPlanTasks, setStudyPlanTasks, toggleStudyTask,
  } = useAppStore();

  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [generating, setGenerating] = useState(false);

  const hasEnoughData = essayHistory.length >= 2 || studyProfile !== null;

  const handleGenerateClick = () => {
    if (hasEnoughData) {
      runGeneration(studyProfile);
    } else {
      setShowQuestionnaire(true);
    }
  };

  const runGeneration = async (profile: StudyProfile | null) => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 800));
    const effectiveProfile: StudyProfile = profile ?? {
      urgency: "3-6m",
      hoursPerDay: 2,
      targetScore: 800,
      level: "intermediario",
      weakCompetencies: [1, 2, 3, 4, 5],
    };
    const tasks = generatePlan(effectiveProfile, completedLessonSlugs, essayHistory);
    setStudyPlanTasks(tasks);
    setGenerating(false);
  };

  const handleQuestionnaireComplete = (profile: StudyProfile) => {
    setStudyProfile(profile);
    setShowQuestionnaire(false);
    runGeneration(profile);
  };

  const tasks = studyPlanTasks;
  const completed = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;
  const progressPct = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

  // Compute AI insight from worst competency
  const worstComp = essayHistory.length > 0
    ? [1, 2, 3, 4, 5].map((c) => {
        const key = `competency${c}` as keyof typeof essayHistory[0]["feedback"];
        const scores = essayHistory.map((e) => (e.feedback[key] as any)?.score ?? 0).filter((s) => s > 0);
        return { c, avg: scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 200 };
      }).sort((a, b) => a.avg - b.avg)[0]?.c
    : studyProfile?.weakCompetencies[0] ?? 4;

  const compLabels: Record<number, string> = {
    1: "Norma Culta (C1)", 2: "Repertório (C2)", 3: "Argumentação (C3)",
    4: "Coesão Textual (C4)", 5: "Proposta de Intervenção (C5)",
  };
  const compSlug: Record<number, string> = {
    1: "c1-iniciante", 2: "c2-iniciante", 3: "c3-iniciante",
    4: "c4-iniciante", 5: "c5-iniciante",
  };

  // Today's tasks
  const todayStr = new Date().toISOString().slice(0, 10);
  const todayTasks = tasks.filter((t) => !t.completed && (t.dueDate ?? "") <= todayStr).slice(0, 3);

  return (
    <>
      <AnimatePresence>
        {showQuestionnaire && (
          <Questionnaire
            onComplete={handleQuestionnaireComplete}
            onClose={() => setShowQuestionnaire(false)}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Plano de Estudos</h1>
              <p className="text-white/40 text-sm mt-1">
                {hasEnoughData
                  ? "Gerado com base no seu desempenho real."
                  : "Responda algumas perguntas para gerar seu plano personalizado."}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {tasks.length > 0 && (
                <button
                  onClick={() => setShowQuestionnaire(true)}
                  className="p-2 rounded-xl border border-white/5 text-white/30 hover:text-white hover:border-white/10 transition-all"
                  title="Refazer perfil"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleGenerateClick}
                disabled={generating}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/15 border border-blue-500/25 text-blue-300 text-sm font-semibold hover:bg-blue-500/25 transition-all disabled:opacity-50"
              >
                {generating ? (
                  <><div className="w-4 h-4 border-2 border-blue-300/30 border-t-blue-300 rounded-full animate-spin" />Gerando...</>
                ) : (
                  <><Sparkles className="w-4 h-4" />{tasks.length > 0 ? "Regenerar" : "Gerar com IA"}</>
                )}
              </button>
            </div>
          </div>

          {/* Profile summary (if set) */}
          {studyProfile && (
            <div className="flex flex-wrap gap-2">
              {[
                { label: { "less1m": "< 1 mês", "1-3m": "1-3 meses", "3-6m": "3-6 meses", "6m+": "+6 meses" }[studyProfile.urgency], icon: "📅" },
                { label: `${studyProfile.hoursPerDay}h/dia`, icon: "⏱️" },
                { label: `Meta ${studyProfile.targetScore}pts`, icon: "🎯" },
                { label: { iniciante: "Iniciante", intermediario: "Intermediário", avancado: "Avançado" }[studyProfile.level], icon: "📊" },
              ].map((tag) => (
                <span key={tag.label} className="flex items-center gap-1.5 text-xs text-white/50 bg-white/5 border border-white/8 px-2.5 py-1 rounded-full">
                  {tag.icon} {tag.label}
                </span>
              ))}
              {essayHistory.length > 0 && (
                <span className="flex items-center gap-1.5 text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-full">
                  <Brain className="w-3 h-3" /> Baseado em {essayHistory.length} redações reais
                </span>
              )}
            </div>
          )}

          {/* Progress overview */}
          {tasks.length > 0 && (
            <div className="glass rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-white">Progresso do Plano</h2>
                <span className="text-2xl font-black gradient-text">{progressPct}%</span>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
                />
              </div>
              <p className="text-xs text-white/30">{completed}/{totalTasks} tarefas concluídas</p>
            </div>
          )}

          {/* Empty state */}
          {tasks.length === 0 && !generating && (
            <div className="glass rounded-2xl p-12 border border-white/5 text-center">
              <Brain className="w-12 h-12 text-white/10 mx-auto mb-4" />
              <h3 className="text-white/50 font-semibold mb-2">Nenhum plano gerado ainda</h3>
              <p className="text-sm text-white/30 max-w-sm mx-auto mb-6">
                {hasEnoughData
                  ? "Clique em 'Gerar com IA' para criar seu plano baseado no seu desempenho real."
                  : "Clique em 'Gerar com IA'. Faremos algumas perguntas rápidas para montar um plano personalizado para você."}
              </p>
              <button
                onClick={handleGenerateClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm transition-all hover:shadow-glow"
              >
                <Sparkles className="w-4 h-4" />
                {hasEnoughData ? "Gerar plano agora" : "Começar — Gerar meu plano"}
              </button>
            </div>
          )}

          {/* Main grid */}
          {tasks.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Tasks */}
              <div className="lg:col-span-2 space-y-3">
                <h2 className="text-sm font-semibold text-white">Todas as Tarefas</h2>
                {tasks.map((task, i) => {
                  const Icon = TASK_ICONS[task.type] ?? Target;
                  return (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className={cn(
                        "glass rounded-xl p-4 border transition-all",
                        task.completed ? "border-green-500/10 opacity-60" : "border-white/5 hover:border-white/10"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleStudyTask(task.id)}
                          className="flex-shrink-0 transition-transform active:scale-90"
                        >
                          {task.completed
                            ? <CheckCircle2 className="w-5 h-5 text-green-400" />
                            : <Circle className="w-5 h-5 text-white/20 hover:text-white/50 transition-colors" />
                          }
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-sm font-medium", task.completed ? "line-through text-white/40" : "text-white/90")}>
                            {task.title}
                          </p>
                          {task.dueDate && (
                            <div className="flex items-center gap-1.5 mt-1">
                              <Clock className="w-3 h-3 text-white/30" />
                              <span className={cn("text-xs", task.dueDate < todayStr && !task.completed ? "text-red-400" : "text-white/30")}>
                                Até {formatDate(task.dueDate)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {task.slug && !task.completed && (
                            <Link
                              href={`/aulas/${task.slug}`}
                              className="text-[10px] text-blue-400/70 hover:text-blue-400 border border-blue-500/15 px-1.5 py-0.5 rounded transition-colors"
                            >
                              Ir →
                            </Link>
                          )}
                          <span className={cn("text-[11px] font-semibold px-2 py-1 rounded-md border", TASK_COLORS[task.type])}>
                            {TASK_LABELS[task.type]}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Sidebar */}
              <div className="space-y-4">
                {/* Today's tasks */}
                <div className="glass rounded-2xl p-5 border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="w-4 h-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-white">Para Hoje</h3>
                  </div>
                  {todayTasks.length === 0 ? (
                    <div className="text-center py-4">
                      <CheckCircle2 className="w-6 h-6 text-green-400/40 mx-auto mb-1" />
                      <p className="text-xs text-white/30">Tudo em dia!</p>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {todayTasks.map((t) => {
                        const Icon = TASK_ICONS[t.type] ?? Target;
                        return (
                          <div key={t.id} className="flex items-start gap-2.5">
                            <Icon className="w-4 h-4 text-white/40 flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-white/70 leading-snug">{t.title}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Week calendar */}
                <div className="glass rounded-2xl p-5 border border-white/5">
                  <div className="flex items-center gap-2 mb-4">
                    <CalendarDays className="w-4 h-4 text-blue-400" />
                    <h3 className="text-sm font-semibold text-white">Esta Semana</h3>
                  </div>
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {weekDays.map((d) => (
                      <div key={d} className="text-center text-[10px] text-white/30 font-medium">{d}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 7 }, (_, i) => {
                      const day = new Date();
                      day.setDate(day.getDate() - day.getDay() + 1 + i);
                      const dayStr = day.toISOString().slice(0, 10);
                      const isToday = dayStr === todayStr;
                      const hasTasks = tasks.some((t) => t.dueDate === dayStr);
                      const allDone = hasTasks && tasks.filter((t) => t.dueDate === dayStr).every((t) => t.completed);
                      return (
                        <div
                          key={i}
                          className={cn(
                            "aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all",
                            isToday ? "bg-blue-500 text-white font-bold" :
                            allDone ? "bg-green-500/15 text-green-400 border border-green-500/20" :
                            hasTasks ? "bg-blue-500/10 text-blue-400 border border-blue-500/20" :
                            "bg-white/3 text-white/30"
                          )}
                        >
                          {day.getDate()}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* AI insight */}
                <div className="glass rounded-2xl p-5 border border-blue-500/10 bg-blue-500/3">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-4 h-4 text-blue-400" />
                    <p className="text-sm font-semibold text-white">
                      {essayHistory.length > 0 ? "Insight das suas redações" : "Foco recomendado"}
                    </p>
                  </div>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {essayHistory.length > 0
                      ? `Suas redações mostram que ${compLabels[worstComp]} é sua competência mais fraca. Priorize essas aulas no plano.`
                      : `Com base no seu perfil, comece por ${compLabels[worstComp]}. Fundamentos sólidos aceleram todas as outras competências.`}
                  </p>
                  <Link
                    href={`/aulas/${compSlug[worstComp]}`}
                    className="mt-3 flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Ir para essa aula <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
