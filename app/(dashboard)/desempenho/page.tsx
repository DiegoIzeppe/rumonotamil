"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  BarChart, Bar, Cell,
} from "recharts";
import { TrendingUp, Target, Brain, Flame, BarChart3, Zap, ArrowUpRight, ArrowDownRight, Sparkles } from "lucide-react";
import { mockMonthlyProgress, mockCompetencyRadar, mockEssays, mockCompetencyScores } from "@/lib/mock-data";
import { cn, getCompetencyLabel, getScoreColor } from "@/lib/utils";

const heatmapData = Array.from({ length: 12 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => ({
    week, day,
    value: Math.random() > 0.4 ? Math.floor(Math.random() * 3) + 1 : 0,
  }))
);

const competencyHistory = [
  { month: "Set", c1: 120, c2: 100, c3: 120, c4: 80, c5: 100 },
  { month: "Out", c1: 140, c2: 120, c3: 140, c4: 100, c5: 120 },
  { month: "Nov", c1: 160, c2: 140, c3: 160, c4: 120, c5: 140 },
];

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

const statCards = [
  {
    label: "Média geral",
    value: "720",
    sub: "+80 este mês",
    icon: Target,
    trend: "up",
    color: "blue",
  },
  {
    label: "Melhor nota",
    value: "800",
    sub: "C5 = 200 pts",
    icon: TrendingUp,
    trend: "up",
    color: "green",
  },
  {
    label: "Redações",
    value: "12",
    sub: "últimos 60 dias",
    icon: Brain,
    trend: "up",
    color: "purple",
  },
  {
    label: "Streak máximo",
    value: "22 dias",
    sub: "Recorde pessoal",
    icon: Flame,
    trend: "neutral",
    color: "orange",
  },
];

export default function DesempenhoPage() {
  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Desempenho</h1>
          <p className="text-white/40 text-sm mt-1">Acompanhe sua evolução e identifique seus pontos de melhoria.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
                className="glass rounded-2xl p-4 border border-white/5"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={cn(
                    "w-4 h-4",
                    stat.color === "blue" && "text-blue-400",
                    stat.color === "green" && "text-green-400",
                    stat.color === "purple" && "text-purple-400",
                    stat.color === "orange" && "text-orange-400",
                  )} />
                  <span className="text-xs text-white/40">{stat.label}</span>
                </div>
                <p className="text-2xl font-black text-white">{stat.value}</p>
                <div className="flex items-center gap-1 mt-1">
                  {stat.trend === "up" && <ArrowUpRight className="w-3 h-3 text-green-400" />}
                  {stat.trend === "down" && <ArrowDownRight className="w-3 h-3 text-red-400" />}
                  <span className={cn(
                    "text-xs",
                    stat.trend === "up" ? "text-green-400" : stat.trend === "down" ? "text-red-400" : "text-white/30"
                  )}>
                    {stat.sub}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score evolution */}
          <div className="lg:col-span-2 glass rounded-2xl p-6 border border-white/5">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white">Evolução da Nota</h2>
              </div>
              <span className="text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">
                ↑ +140 pts em 3 meses
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={mockMonthlyProgress}>
                <defs>
                  <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[500, 1000]} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="avgScore" name="Nota" stroke="#3b82f6" strokeWidth={2.5} fill="url(#grad1)" dot={{ fill: "#3b82f6", r: 4 }} activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Radar */}
          <div className="glass rounded-2xl p-6 border border-white/5">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-semibold text-white">Radar de Competências</h2>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <RadarChart data={mockCompetencyRadar}>
                <PolarGrid stroke="rgba(255,255,255,0.06)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                <Radar name="Atual" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {[1,2,3,4,5].map((c) => {
                const score = mockCompetencyScores[`c${c}` as keyof typeof mockCompetencyScores] as number;
                return (
                  <div key={c} className="flex items-center justify-between text-xs">
                    <span className="text-white/40">C{c}</span>
                    <div className="flex-1 mx-3 h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(score / 200) * 100}%` }} />
                    </div>
                    <span className={cn("font-semibold w-8 text-right", getScoreColor(score * 5))}>{score}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Competency history */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-white">Evolução por Competência</h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={competencyHistory} barCategoryGap="30%">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 200]} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              {["c1", "c2", "c3", "c4", "c5"].map((key, i) => {
                const colors = ["#8b5cf6", "#3b82f6", "#06b6d4", "#22c55e", "#f59e0b"];
                return <Bar key={key} dataKey={key} name={`C${i+1}`} fill={colors[i]} radius={[3, 3, 0, 0]} />;
              })}
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity heatmap */}
        <div className="glass rounded-2xl p-6 border border-white/5">
          <div className="flex items-center gap-2 mb-6">
            <Zap className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-white">Frequência de Estudos</h2>
            <span className="ml-auto text-xs text-white/30">últimos 3 meses</span>
          </div>
          <div className="flex gap-1 overflow-x-auto pb-2">
            {heatmapData.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-1">
                {week.map((day) => (
                  <div
                    key={`${wi}-${day.day}`}
                    title={day.value > 0 ? `${day.value} redação${day.value > 1 ? "ões" : ""}` : "Sem atividade"}
                    className={cn(
                      "w-4 h-4 rounded-sm flex-shrink-0 transition-all hover:scale-125",
                      day.value === 0 ? "bg-white/5" :
                      day.value === 1 ? "bg-blue-500/40" :
                      day.value === 2 ? "bg-blue-500/70" :
                      "bg-blue-500"
                    )}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-3 text-xs text-white/30">
            <span>Menos</span>
            {[0, 1, 2, 3].map((v) => (
              <div key={v} className={cn("w-3 h-3 rounded-sm", v === 0 ? "bg-white/5" : v === 1 ? "bg-blue-500/40" : v === 2 ? "bg-blue-500/70" : "bg-blue-500")} />
            ))}
            <span>Mais</span>
          </div>
        </div>

        {/* AI insights */}
        <div className="glass rounded-2xl p-6 border border-blue-500/10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h2 className="text-sm font-semibold text-white">Predição de Desempenho</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-center">
              <p className="text-xs text-white/40 mb-2">Nota projetada (60 dias)</p>
              <p className="text-3xl font-black gradient-text">840</p>
              <p className="text-xs text-green-400 mt-1">+120 pts no ritmo atual</p>
            </div>
            <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-center">
              <p className="text-xs text-white/40 mb-2">Competência mais forte</p>
              <p className="text-xl font-black text-green-400">C1 & C3</p>
              <p className="text-xs text-white/40 mt-1">160 pontos em média</p>
            </div>
            <div className="p-4 rounded-xl bg-white/3 border border-white/5 text-center">
              <p className="text-xs text-white/40 mb-2">Prioridade de estudo</p>
              <p className="text-xl font-black text-orange-400">C4 — Coesão</p>
              <p className="text-xs text-white/40 mt-1">120 pts — maior potencial</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
