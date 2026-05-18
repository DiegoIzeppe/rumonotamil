"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart,
} from "recharts";
import {
  Brain, TrendingUp, Flame, Zap, PenLine, ChevronRight, Target,
  Sparkles, AlertCircle, CheckCircle2, ArrowUpRight, Clock,
  CalendarDays, BookOpen, FileText, Layers,
} from "lucide-react";
import {
  mockUser, mockCompetencyScores, mockWeeklyProgress,
  mockEssays, mockDailyTheme, mockAIInsights, mockCompetencyRadar,
  mockRecommendedContents,
} from "@/lib/mock-data";
import { cn, formatDate, getScoreColor, getScoreLabel, getCompetencyLabel } from "@/lib/utils";

const stagger = {
  container: { animate: { transition: { staggerChildren: 0.07 } } },
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  },
};

function ScoreRing({ score }: { score: number }) {
  const pct = score / 1000;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - pct * circumference;

  return (
    <div className="relative w-44 h-44">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
        <circle
          cx="80" cy="80" r="70" fill="none"
          stroke="url(#scoreGrad)" strokeWidth="8"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.5s ease-out" }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-black gradient-text">{score}</span>
        <span className="text-xs text-white/40 font-medium">de 1000</span>
        <span className={cn("text-xs font-semibold mt-1", getScoreColor(score))}>
          {getScoreLabel(score)}
        </span>
      </div>
    </div>
  );
}

function CompetencyBar({ label, score, max = 200 }: { label: string; score: number; max?: number }) {
  const pct = (score / max) * 100;
  const color =
    score >= 160 ? "from-green-500 to-emerald-400" :
    score >= 120 ? "from-blue-500 to-cyan-400" :
    "from-orange-500 to-yellow-400";
  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs text-white/60">{label}</span>
        <span className={cn("text-xs font-bold",
          score >= 160 ? "text-green-400" : score >= 120 ? "text-blue-400" : "text-orange-400"
        )}>
          {score}
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className={cn("h-full rounded-full bg-gradient-to-r", color)}
        />
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="glass border border-white/10 rounded-lg px-3 py-2">
      <p className="text-xs text-white/50 mb-1">{label}</p>
      <p className="text-sm font-bold text-white">{payload[0].value} pts</p>
      {payload[1] && (
        <p className="text-xs text-blue-400">{payload[1].value} redação{payload[1].value !== 1 ? "ões" : ""}</p>
      )}
    </div>
  );
};

const contentTypeIcon = {
  lesson: <BookOpen className="w-3.5 h-3.5" />,
  essay: <FileText className="w-3.5 h-3.5" />,
};

const contentTypeLabel = {
  lesson: "Aula",
  essay: "Redação modelo",
};

export default function DashboardPage() {
  // Weekly delta: last score vs first score this week
  const weeklyDelta = mockWeeklyProgress[mockWeeklyProgress.length - 1].score - mockWeeklyProgress[0].score;

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div variants={stagger.container} initial="initial" animate="animate" className="space-y-6">

        {/* Header */}
        <motion.div variants={stagger.item} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Olá, {mockUser.name.split(" ")[0]} 👋
            </h1>
            <p className="text-white/40 mt-1 text-sm">
              {mockUser.streakDays} dias consecutivos de estudo. Continue assim!
            </p>
          </div>
          <Link
            href="/treinar"
            className="hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm transition-all hover:shadow-glow"
          >
            <PenLine className="w-4 h-4" />
            Escrever redação
          </Link>
        </motion.div>

        {/* Top stats */}
        <motion.div variants={stagger.item} className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "Nota atual", value: mockCompetencyScores.total, sub: "Estimada ENEM", icon: Target, color: "blue" },
            { label: "Streak", value: `${mockUser.streakDays} dias`, sub: "Consecutivos", icon: Flame, color: "orange" },
            { label: "XP Total", value: mockUser.xp.toLocaleString("pt-BR"), sub: `Nível ${mockUser.level}`, icon: Zap, color: "yellow" },
            { label: "Redações", value: mockEssays.length, sub: "Corrigidas", icon: Brain, color: "green" },
          ].map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="glass rounded-2xl p-4 border border-white/10 hover:border-blue-500/20 transition-all group">
                <div className="flex items-center gap-2 mb-2">
                  <div className={cn(
                    "w-7 h-7 rounded-lg flex items-center justify-center",
                    stat.color === "blue" && "bg-blue-500/15 text-blue-400",
                    stat.color === "orange" && "bg-orange-500/15 text-orange-400",
                    stat.color === "yellow" && "bg-yellow-500/15 text-yellow-400",
                    stat.color === "green" && "bg-green-500/15 text-green-400",
                  )}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs text-white/40">{stat.label}</span>
                </div>
                <p className="text-xl md:text-2xl font-black text-white">{stat.value}</p>
                <p className="text-xs text-white/30 mt-0.5">{stat.sub}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Score ring + competencies */}
          <motion.div variants={stagger.item} className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <Target className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-semibold text-white">Nota Estimada ENEM</h2>
            </div>
            <div className="flex justify-center mb-6">
              <ScoreRing score={mockCompetencyScores.total} />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((c) => (
                <CompetencyBar
                  key={c}
                  label={`C${c} — ${getCompetencyLabel(c)}`}
                  score={mockCompetencyScores[`c${c}` as keyof typeof mockCompetencyScores] as number}
                />
              ))}
            </div>
          </motion.div>

          {/* ── EVOLUÇÃO SEMANAL ── */}
          <motion.div variants={stagger.item} className="lg:col-span-2 glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white">Evolução Semanal</h2>
              </div>
              <span className={cn(
                "text-xs px-2 py-1 rounded-full font-medium border",
                weeklyDelta >= 0
                  ? "text-green-400 bg-green-500/10 border-green-500/20"
                  : "text-red-400 bg-red-500/10 border-red-500/20"
              )}>
                {weeklyDelta >= 0 ? "+" : ""}{weeklyDelta} pts esta semana
              </span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={mockWeeklyProgress}>
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[600, 900]} tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="score"
                  name="Nota"
                  stroke="#3b82f6"
                  strokeWidth={2.5}
                  fill="url(#areaGrad)"
                  dot={{ fill: "#3b82f6", r: 4 }}
                  activeDot={{ r: 6, fill: "#60a5fa" }}
                />
              </AreaChart>
            </ResponsiveContainer>

            {/* Mini stats da semana */}
            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-3 gap-3">
              {[
                { label: "Melhor nota", value: Math.max(...mockWeeklyProgress.map(d => d.score)), color: "text-green-400" },
                { label: "Média", value: Math.round(mockWeeklyProgress.reduce((s, d) => s + d.score, 0) / mockWeeklyProgress.length), color: "text-blue-400" },
                { label: "Redações", value: mockWeeklyProgress.reduce((s, d) => s + d.essays, 0), color: "text-cyan-400" },
              ].map(s => (
                <div key={s.label} className="text-center p-2.5 rounded-xl bg-white/8">
                  <p className={cn("text-lg font-black", s.color)}>{s.value}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Radar */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-4">Radar por Competência</p>
              <ResponsiveContainer width="100%" height={180}>
                <RadarChart data={mockCompetencyRadar}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                  <Radar name="Você" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* AI Insights */}
        <motion.div variants={stagger.item} className="glass rounded-2xl p-6 border border-blue-500/10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-blue-400" />
            </div>
            <h2 className="text-sm font-semibold text-white">Insights da IA</h2>
            <span className="ml-auto text-[11px] text-blue-400/60 border border-blue-500/15 rounded-full px-2 py-0.5">
              Atualizado hoje
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {mockAIInsights.map((insight, i) => {
              const icons = {
                weakness: <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />,
                strength: <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />,
                tip: <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />,
                progress: <TrendingUp className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />,
              };
              const borders = {
                weakness: "border-orange-500/10 bg-orange-500/3",
                strength: "border-green-500/10 bg-green-500/3",
                tip: "border-blue-500/10 bg-blue-500/3",
                progress: "border-cyan-500/10 bg-cyan-500/3",
              };
              return (
                <div key={i} className={cn("flex items-start gap-2.5 p-3 rounded-xl border", borders[insight.type as keyof typeof borders] ?? "border-white/10 bg-white/8")}>
                  {icons[insight.type as keyof typeof icons]}
                  <p className="text-sm text-white/70 leading-relaxed">{insight.text}</p>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Últimas Redações */}
          <motion.div variants={stagger.item} className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Brain className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white">Últimas Redações</h2>
              </div>
              <Link href="/correcao-ia" className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1">
                Ver todas <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-2">
              {mockEssays.map((essay) => (
                <div key={essay.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer">
                  <div className={cn(
                    "w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0",
                    essay.score >= 800 ? "bg-green-500/15 text-green-400" :
                    essay.score >= 700 ? "bg-blue-500/15 text-blue-400" : "bg-orange-500/15 text-orange-400"
                  )}>
                    {essay.score}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-white/80 truncate font-medium">{essay.title}</p>
                    <p className="text-xs text-white/30">{formatDate(essay.date)}</p>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-white/20 group-hover:text-white/50 flex-shrink-0 ml-auto transition-colors" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* ── TEMA DO DIA ── */}
          <motion.div variants={stagger.item} className="glass rounded-2xl p-6 border border-blue-500/10 bg-blue-500/3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">Tema do Dia</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-white/30">
                <CalendarDays className="w-3 h-3" />
                <span>{mockDailyTheme.date}</span>
              </div>
            </div>
            <h3 className="text-base font-bold text-white leading-snug mb-2">
              {mockDailyTheme.title}
            </h3>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[11px] text-orange-400 border border-orange-500/20 bg-orange-500/5 px-2 py-0.5 rounded-full">
                {mockDailyTheme.difficulty}
              </span>
              <span className="text-[11px] text-white/30 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {mockDailyTheme.timeLimit} min
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3">
              {mockDailyTheme.description}
            </p>
            <div className="space-y-1.5 mb-4">
              <p className="text-[11px] text-white/30 font-medium uppercase tracking-wider">Repertórios sugeridos</p>
              {mockDailyTheme.repertoires.map((r, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-white/50">
                  <span className="text-blue-500 mt-0.5 flex-shrink-0">›</span>
                  <span>{r}</span>
                </div>
              ))}
            </div>
            <Link
              href="/treinar"
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all hover:shadow-glow"
            >
              <PenLine className="w-4 h-4" />
              Escrever agora
            </Link>
          </motion.div>

          {/* ── CONTEÚDOS RECOMENDADOS ── */}
          <motion.div variants={stagger.item} className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white">Conteúdos Recomendados</h2>
              </div>
            </div>
            <p className="text-[11px] text-white/30 mb-4">Baseado nos seus pontos fracos</p>
            <div className="space-y-2">
              {mockRecommendedContents.map((content) => (
                <Link key={content.id} href={content.href}>
                  <div className={cn(
                    "flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border",
                    content.priority ? "border-blue-500/15 bg-blue-500/3" : "border-transparent"
                  )}>
                    {/* Type icon */}
                    <div className={cn(
                      "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5",
                      content.badgeColor
                    )}>
                      {contentTypeIcon[content.type]}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white/80 font-medium leading-snug line-clamp-1 group-hover:text-white transition-colors">
                        {content.title}
                      </p>
                      <p className="text-[11px] text-white/35 mt-0.5">{content.subtitle}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded", content.badgeColor)}>
                          {content.badge}
                        </span>
                        <span className="text-[11px] text-white/25 flex items-center gap-1">
                          {content.type === "lesson" && <Clock className="w-3 h-3" />}
                          {content.meta}
                        </span>
                        <span className="text-[10px] text-white/20 ml-auto">
                          {contentTypeLabel[content.type]}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
