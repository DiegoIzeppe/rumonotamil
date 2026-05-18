"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  CalendarDays, CheckCircle2, Circle, ChevronRight, Sparkles,
  Target, Clock, BookOpen, PenLine, RotateCcw, Zap, Plus, ArrowRight,
} from "lucide-react";
import { mockStudyPlan } from "@/lib/mock-data";
import { cn, formatDate } from "@/lib/utils";

const taskTypeIcons: Record<string, React.ElementType> = {
  LESSON: BookOpen,
  ESSAY: PenLine,
  REVIEW: RotateCcw,
  PRACTICE: Target,
};

const taskTypeColors: Record<string, string> = {
  LESSON: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  ESSAY: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  REVIEW: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  PRACTICE: "text-green-400 bg-green-500/10 border-green-500/20",
};

const weekDays = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
const months = ["Nov 2024"];

export default function PlanoDeEstudosPage() {
  const [tasks, setTasks] = useState(mockStudyPlan.tasks);
  const [generating, setGenerating] = useState(false);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const handleGeneratePlan = async () => {
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 2000));
    setGenerating(false);
  };

  const completed = tasks.filter((t) => t.completed).length;
  const totalTasks = tasks.length;

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Plano de Estudos</h1>
            <p className="text-white/40 text-sm mt-1">Seu roadmap personalizado para o ENEM.</p>
          </div>
          <button
            onClick={handleGeneratePlan}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500/15 border border-blue-500/25 text-blue-300 text-sm font-semibold hover:bg-blue-500/25 transition-all"
          >
            {generating ? (
              <><div className="w-4 h-4 border-2 border-blue-300/30 border-t-blue-300 rounded-full animate-spin" />Gerando...</>
            ) : (
              <><Sparkles className="w-4 h-4" />Gerar com IA</>
            )}
          </button>
        </div>

        {/* Plan overview */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-base font-bold text-white">{mockStudyPlan.title}</h2>
                <span className="text-xs text-blue-400 border border-blue-500/20 rounded-full px-2 py-0.5 bg-blue-500/5">IA</span>
              </div>
              <p className="text-sm text-white/50">{mockStudyPlan.description}</p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <div className="text-center">
                <p className="text-2xl font-black gradient-text">{mockStudyPlan.progress}%</p>
                <p className="text-xs text-white/30">concluído</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-black text-orange-300">{mockStudyPlan.daysLeft}</p>
                <p className="text-xs text-white/30">dias restantes</p>
              </div>
            </div>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${mockStudyPlan.progress}%` }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400"
            />
          </div>
          <p className="text-xs text-white/30 mt-2">{completed}/{totalTasks} tarefas concluídas</p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tasks */}
          <div className="lg:col-span-2 space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold text-white">Tarefas da Semana</h2>
              <button className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                <Plus className="w-3.5 h-3.5" />
                Adicionar
              </button>
            </div>
            {tasks.map((task, i) => {
              const Icon = taskTypeIcons[task.type] || Target;
              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className={cn(
                    "glass rounded-xl p-4 border transition-all",
                    task.completed ? "border-green-500/10 opacity-60" : "border-white/5 hover:border-white/10"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleTask(task.id)}
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
                          <span className="text-xs text-white/30">Até {formatDate(task.dueDate)}</span>
                        </div>
                      )}
                    </div>
                    <span className={cn("text-[11px] font-semibold px-2 py-1 rounded-md border flex-shrink-0", taskTypeColors[task.type])}>
                      {task.type === "LESSON" ? "Aula" : task.type === "ESSAY" ? "Redação" : task.type === "REVIEW" ? "Revisão" : "Prática"}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Sidebar: mini calendar + daily goal */}
          <div className="space-y-4">
            {/* Daily goal */}
            <div className="glass rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Meta Diária</h3>
              </div>
              <div className="space-y-3">
                {[
                  { label: "Ler 1 aula", done: true },
                  { label: "Escrever 1 redação", done: false },
                  { label: "Revisar C4", done: false },
                ].map((g, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    {g.done
                      ? <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                      : <Circle className="w-4 h-4 text-white/20 flex-shrink-0" />
                    }
                    <span className={cn("text-sm", g.done ? "line-through text-white/30" : "text-white/70")}>{g.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-white/5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-white/40">Progresso hoje</span>
                  <span className="text-white/60">1/3</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full" style={{ width: "33%" }} />
                </div>
              </div>
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
                  const today = new Date().getDay();
                  const dayIndex = (i + 1) % 7;
                  const isToday = dayIndex === today;
                  const hasDone = [1, 3, 5].includes(i);
                  return (
                    <div
                      key={i}
                      className={cn(
                        "aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all",
                        isToday ? "bg-blue-500 text-white font-bold" :
                        hasDone ? "bg-green-500/15 text-green-400 border border-green-500/20" :
                        "bg-white/3 text-white/30"
                      )}
                    >
                      {11 + i}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI tip */}
            <div className="glass rounded-2xl p-5 border border-blue-500/10 bg-blue-500/3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <p className="text-sm font-semibold text-white">Sugestão da IA</p>
              </div>
              <p className="text-sm text-white/60 leading-relaxed">
                Baseado no seu desempenho, recomendamos focar em <strong className="text-blue-300">Coesão Textual (C4)</strong> esta semana. Pratique pelo menos 3 redações com foco em conectivos variados.
              </p>
              <button className="mt-3 flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Adicionar ao plano <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
