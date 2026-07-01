"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
} from "recharts";
import { TrendingUp, Target, Brain, Flame, BarChart3, Zap, PenLine } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { cn, getCompetencyLabel, roundScore } from "@/lib/utils";
import Link from "next/link";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass border border-white/10 rounded-lg px-3 py-2 min-w-[120px]">
      <p className="text-xs text-white/50 mb-1">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} className="text-sm font-semibold" style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  );
};

const safeNum = (n: unknown) => (typeof n === "number" && !isNaN(n) ? n : 0);

export default function DesempenhoPage() {
  const { essayHistory: storeHistory, completedLessonSlugs: storeLessons } = useAppStore();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const essayHistory = mounted ? storeHistory : [];
  const completedLessonSlugs = mounted ? storeLessons : [];

  const totalEssays = essayHistory.length;
  const avgScore = totalEssays > 0
    ? roundScore(essayHistory.reduce((s, e) => s + safeNum(e.score), 0) / totalEssays)
    : 0;
  const bestScore = totalEssays > 0 ? Math.max(...essayHistory.map((e) => safeNum(e.score))) : 0;

  const competencyAvgs = [1, 2, 3, 4, 5].map((c) => {
    const key = `competency${c}` as keyof typeof essayHistory[0]["feedback"];
    const scores = essayHistory
      .map((e) => safeNum((e.feedback?.[key] as any)?.score))
      .filter((s) => s > 0);
    return scores.length > 0 ? roundScore(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  });

  const chartData = essayHistory
    .slice()
    .reverse()
    .slice(-8)
    .map((e, i) => ({
      name: `#${i + 1}`,
      score: safeNum(e.score),
    }));

  const radarData = [1, 2, 3, 4, 5].map((c, i) => ({
    subject: `C${c}`,
    value: (competencyAvgs[i] / 200) * 100,
  }));

  if (totalEssays === 0) {
    return (
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              <BarChart3 className="w-7 h-7 text-blue-400" />
              Desempenho
            </h1>
            <p className="text-white/40 text-sm mt-1">Acompanhe sua evolução com dados reais.</p>
          </div>

          <div className="glass rounded-2xl p-12 border border-white/5 text-center">
            <BarChart3 className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <p className="text-white/50 font-semibold mb-2">Nenhuma redação corrigida ainda</p>
            <p className="text-sm text-white/30 max-w-sm mx-auto mb-6">
              Seus gráficos de evolução por competência, histórico de notas e métricas de desempenho aparecerão aqui após a primeira correção por IA.
            </p>
            <Link
              href="/correcao-ia"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm transition-all hover:shadow-glow"
            >
              <Brain className="w-4 h-4" />
              Corrigir primeira redação
            </Link>
          </div>

          <div className="glass rounded-2xl p-5 border border-white/5">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-blue-400" />
              <p className="text-sm font-semibold text-white">Aulas concluídas: {completedLessonSlugs.length}</p>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all"
                style={{ width: `${Math.min((completedLessonSlugs.length / 15) * 100, 100)}%` }}
              />
            </div>
            <p className="text-xs text-white/30 mt-1.5">{completedLessonSlugs.length}/15 aulas do método</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-blue-400" />
            Desempenho
          </h1>
          <p className="text-white/40 text-sm mt-1">Sua evolução real com base nas correções por IA.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Média geral", value: avgScore, sub: `${totalEssays} redações`, icon: Target, color: "blue" },
            { label: "Melhor nota", value: bestScore, sub: "Recorde pessoal", icon: TrendingUp, color: "green" },
            { label: "Redações", value: totalEssays, sub: "Corrigidas por IA", icon: Brain, color: "purple" },
            { label: "Aulas feitas", value: completedLessonSlugs.length, sub: "de 15 no método", icon: Zap, color: "yellow" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass rounded-2xl p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center",
                    stat.color === "blue" && "bg-blue-500/15 text-blue-400",
                    stat.color === "green" && "bg-green-500/15 text-green-400",
                    stat.color === "purple" && "bg-purple-500/15 text-purple-400",
                    stat.color === "yellow" && "bg-yellow-500/15 text-yellow-400",
                  )}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-white/40">{stat.label}</span>
                </div>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-white/30 mt-0.5">{stat.sub}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Score evolution */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-semibold text-white">Evolução das Notas</h2>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 1000]} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="score" name="Nota" stroke="#3b82f6" strokeWidth={2.5} fill="url(#scoreGrad)" dot={{ fill: "#3b82f6", r: 4 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Radar */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Target className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-semibold text-white">Radar por Competência</h2>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                <Radar name="Média" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Competency breakdown */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <h2 className="text-sm font-semibold text-white mb-4">Médias por Competência</h2>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((c, i) => {
              const avg = competencyAvgs[i];
              const pct = (avg / 200) * 100;
              const color = avg >= 160 ? "from-green-500 to-emerald-400" : avg >= 120 ? "from-blue-500 to-cyan-400" : avg > 0 ? "from-orange-500 to-yellow-400" : "from-white/10 to-white/5";
              return (
                <div key={c}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-white/60">C{c} — {getCompetencyLabel(c)}</span>
                    <span className={cn("text-xs font-bold", avg >= 160 ? "text-green-400" : avg >= 120 ? "text-blue-400" : avg > 0 ? "text-orange-400" : "text-white/20")}>
                      {avg > 0 ? `${avg}/200` : "—"}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                      className={cn("h-full rounded-full bg-gradient-to-r", color)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
