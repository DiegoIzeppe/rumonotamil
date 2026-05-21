"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  XAxis, YAxis, CartesianGrid, Tooltip, Area, AreaChart,
} from "recharts";
import {
  Brain, TrendingUp, Flame, Zap, PenLine, ChevronRight, Target,
  Sparkles, AlertCircle, CheckCircle2, ArrowUpRight, Clock,
  CalendarDays, Layers,
} from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { getWeeklyTheme } from "@/lib/weekly-theme";
import { cn, formatDate, getScoreColor, getScoreLabel, getCompetencyLabel } from "@/lib/utils";

const MOTIVATIONAL_PHRASES = [
  "A nota que você quer começa com a redação que você vai escrever hoje.",
  "Cada aula é um ponto a mais na sua nota final.",
  "Banca do ENEM não corrige preguiça. Vai treinar.",
  "O corretor não vê esforço — vê resultado. Mostre resultado.",
  "Redação nota 1000 não cai do céu. Você constrói frase a frase.",
  "Hoje é um bom dia para tirar 200 em C5.",
  "Quem escreve todo dia chega lá. Simples assim.",
  "Sua próxima redação pode ser a melhor que você já escreveu.",
  "C4 fraco? Uma aula resolve. Você tem tempo agora.",
  "O ENEM cobra argumento. Treine argumento.",
  "Repertório não se decora — se entende. Vai estudar.",
  "Cada erro corrigido pela IA é um ponto ganho no ENEM de verdade.",
  "A diferença entre 600 e 900 é treino. Nada mais.",
  "Você não precisa ser perfeito hoje. Precisa ser melhor que ontem.",
  "Quem tem plano de estudos supera quem só tem vontade.",
  "Proposta de intervenção completa: agente, ação, meio, finalidade. Decora.",
  "Conectivos variados = C4 mais alto. Use 'ademais' hoje.",
  "O tempo que você passa aqui é o tempo investido na sua nota.",
  "Uma redação por dia afasta o 500 longe.",
  "Filosofia, dado e obra literária num mesmo texto? Isso vale 200 em C2.",
];

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


interface UserStats {
  user: { name: string; xp: number; level: number; streakDays: number; plan: string };
  stats: { totalEssays: number; avgScore: number; lessonsCompleted: number; competencyAvgs: number[] };
  weeklyProgress: Array<{ day: string; score: number }>;
  recentEssays: Array<{ id: string; theme: string; score: number; createdAt: string }>;
}

const EMPTY_WEEKLY = [
  { day: "Seg", score: 0, essays: 0 },
  { day: "Ter", score: 0, essays: 0 },
  { day: "Qua", score: 0, essays: 0 },
  { day: "Qui", score: 0, essays: 0 },
  { day: "Sex", score: 0, essays: 0 },
  { day: "Sáb", score: 0, essays: 0 },
  { day: "Dom", score: 0, essays: 0 },
];

export default function DashboardPage() {
  const { userInfo, getXP, getLevel, essayHistory, completedLessonSlugs } = useAppStore();
  const weeklyTheme = getWeeklyTheme();
  const [motivationalPhrase] = useState(
    () => MOTIVATIONAL_PHRASES[Math.floor(Math.random() * MOTIVATIONAL_PHRASES.length)]
  );

  const [dbData, setDbData] = useState<UserStats | null>(null);

  useEffect(() => {
    fetch("/api/user/stats")
      .then((r) => r.json())
      .then((d) => { if (d.data) setDbData(d.data); })
      .catch(() => {});
  }, []);

  const userName = dbData?.user.name ?? userInfo?.name ?? "Estudante";
  const streakDays = dbData?.user.streakDays ?? 0;
  const userXp = dbData?.user.xp ?? getXP();
  const userLevel = dbData?.user.level ?? getLevel();
  const totalEssays = dbData?.stats.totalEssays ?? essayHistory.length;
  const avgScore = dbData?.stats.avgScore ?? (essayHistory.length > 0
    ? Math.round(essayHistory.reduce((s, e) => s + e.score, 0) / essayHistory.length)
    : 0);
  const weeklyData = dbData?.weeklyProgress?.length
    ? dbData.weeklyProgress.map((d) => ({ ...d, essays: 0 }))
    : EMPTY_WEEKLY;
  const competencyAvgs = dbData?.stats.competencyAvgs ?? [0, 0, 0, 0, 0];
  const recentEssays = dbData?.recentEssays?.length
    ? dbData.recentEssays.map((e) => ({ id: e.id, title: e.theme, score: e.score, date: e.createdAt }))
    : essayHistory.slice(0, 5).map((e) => ({ id: e.id, title: e.theme, score: e.score, date: e.date }));

  const weeklyDelta = 0;

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div variants={stagger.container} initial="initial" animate="animate" className="space-y-6">

        {/* Header */}
        <motion.div variants={stagger.item} className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">
              Olá, {userName.split(" ")[0]} 👋
            </h1>
            <p className="text-white/60 mt-1 text-sm italic max-w-lg leading-relaxed">
              "{motivationalPhrase}"
            </p>
            {streakDays > 0 && (
              <p className="text-white/30 mt-1 text-xs">
                🔥 {streakDays} dias consecutivos de estudo
              </p>
            )}
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
            { label: "Nota atual", value: avgScore, sub: "Estimada ENEM", icon: Target, color: "blue" },
            { label: "Streak", value: `${streakDays} dias`, sub: "Consecutivos", icon: Flame, color: "orange" },
            { label: "XP Total", value: userXp.toLocaleString("pt-BR"), sub: `Nível ${userLevel}`, icon: Zap, color: "yellow" },
            { label: "Redações", value: totalEssays, sub: "Corrigidas", icon: Brain, color: "green" },
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
              <ScoreRing score={avgScore} />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((c) => (
                <CompetencyBar
                  key={c}
                  label={`C${c} — ${getCompetencyLabel(c)}`}
                  score={competencyAvgs[c - 1]}
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
              <AreaChart data={weeklyData}>
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
                { label: "Melhor nota", value: Math.max(...weeklyData.map(d => d.score)), color: "text-green-400" },
                { label: "Média", value: Math.round(weeklyData.reduce((s, d) => s + d.score, 0) / weeklyData.length), color: "text-blue-400" },
                { label: "Redações", value: totalEssays, color: "text-cyan-400" },
              ].map(s => (
                <div key={s.label} className="text-center p-2.5 rounded-xl bg-white/8">
                  <p className={cn("text-lg font-black", s.color)}>{s.value}</p>
                  <p className="text-[11px] text-white/30 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Radar — built from real competency averages */}
            <div className="mt-6 pt-6 border-t border-white/5">
              <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-4">Radar por Competência</p>
              {competencyAvgs.every((v) => v === 0) ? (
                <div className="flex items-center justify-center h-[120px] text-white/20 text-xs text-center">
                  Faça sua primeira redação para ver o radar
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={180}>
                  <RadarChart data={[1,2,3,4,5].map((c,i) => ({ subject: `C${c}`, value: (competencyAvgs[i] / 200) * 100 }))}>
                    <PolarGrid stroke="rgba(255,255,255,0.06)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 11 }} />
                    <Radar name="Você" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.15} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>
          </motion.div>
        </div>

        {/* Tips / first essay CTA */}
        {essayHistory.length === 0 && (
          <motion.div variants={stagger.item} className="glass rounded-2xl p-6 border border-blue-500/10 bg-blue-500/3">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <h2 className="text-sm font-semibold text-white">Comece agora</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { icon: <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />, text: "Escreva sua primeira redação e descubra sua nota estimada no ENEM.", cls: "border-green-500/10 bg-green-500/3" },
                { icon: <Sparkles className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />, text: "A IA analisa as 5 competências e mostra exatamente o que melhorar.", cls: "border-blue-500/10 bg-blue-500/3" },
                { icon: <TrendingUp className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />, text: "Complete aulas para ganhar XP e desbloquear novos níveis.", cls: "border-cyan-500/10 bg-cyan-500/3" },
                { icon: <AlertCircle className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />, text: "Seus gráficos de desempenho aparecerão após a primeira correção.", cls: "border-orange-500/10 bg-orange-500/3" },
              ].map((item, i) => (
                <div key={i} className={cn("flex items-start gap-2.5 p-3 rounded-xl border", item.cls)}>
                  {item.icon}
                  <p className="text-sm text-white/70 leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

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
                Nova <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
            {recentEssays.length === 0 ? (
              <div className="py-8 text-center">
                <Brain className="w-8 h-8 text-white/10 mx-auto mb-2" />
                <p className="text-xs text-white/30">Nenhuma redação corrigida ainda.</p>
                <Link href="/correcao-ia" className="text-xs text-blue-400 hover:text-blue-300 mt-2 inline-block">Corrigir agora →</Link>
              </div>
            ) : (
              <div className="space-y-2">
                {recentEssays.map((essay) => (
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
            )}
          </motion.div>

          {/* Tema da Semana */}
          <motion.div variants={stagger.item} className="glass rounded-2xl p-6 border border-blue-500/10 bg-blue-500/3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-[11px] text-blue-400 font-semibold uppercase tracking-wider">Tema da Semana</span>
              </div>
              <div className="flex items-center gap-1 text-[11px] text-white/30">
                <CalendarDays className="w-3 h-3" />
                <span>Renova na segunda</span>
              </div>
            </div>
            <h3 className="text-base font-bold text-white leading-snug mb-2">{weeklyTheme.title}</h3>
            <p className="text-sm text-white/50 leading-relaxed mb-4 line-clamp-3">{weeklyTheme.context}</p>
            <div className="flex gap-1.5 flex-wrap mb-4">
              {weeklyTheme.tags.map((tag) => (
                <span key={tag} className="text-[10px] text-white/30 border border-white/10 rounded px-1.5 py-0.5">{tag}</span>
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

          {/* Acesso rápido — links reais */}
          <motion.div variants={stagger.item} className="glass rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-blue-400" />
              <h2 className="text-sm font-semibold text-white">Acesso Rápido</h2>
            </div>
            <div className="space-y-2">
              {[
                { label: "Começar C1 — Norma Culta", sub: "Primeira aula do método", href: "/aulas/c1-iniciante", badge: "Iniciante", badgeColor: "text-green-400 bg-green-500/10" },
                { label: "Correção por IA", sub: "Cole sua redação e receba nota", href: "/correcao-ia", badge: "IA", badgeColor: "text-blue-400 bg-blue-500/10" },
                { label: "Treinar redação", sub: "Escolha um tema e escreva", href: "/treinar", badge: "Editor", badgeColor: "text-purple-400 bg-purple-500/10" },
                { label: "Ver todas as aulas", sub: "15 aulas C1 → C5", href: "/aulas", badge: "Método", badgeColor: "text-cyan-400 bg-cyan-500/10" },
              ].map((item, i) => (
                <Link key={i} href={item.href}>
                  <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group cursor-pointer border border-transparent hover:border-white/5">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-white/80 font-medium group-hover:text-white transition-colors">{item.label}</p>
                      <p className="text-[11px] text-white/35 mt-0.5">{item.sub}</p>
                    </div>
                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0", item.badgeColor)}>{item.badge}</span>
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
