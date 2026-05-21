"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Zap, Star, Users, Lock, ChevronDown } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import {
  ACHIEVEMENTS,
  TIER_CONFIG,
  CATEGORY_LABELS,
  computeUnlocked,
  type AchievementCategory,
} from "@/lib/achievements";
import { cn } from "@/lib/utils";

const CATEGORIES: AchievementCategory[] = [
  "escrita", "consistencia", "competencias", "desempenho", "desafios", "qualidade", "ranking", "secreta",
];

function AchievementCard({
  ach,
  unlocked,
}: {
  ach: (typeof ACHIEVEMENTS)[0];
  unlocked: boolean;
}) {
  const tier = TIER_CONFIG[ach.tier];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative rounded-2xl border p-4 flex flex-col items-center gap-2 text-center transition-all",
        unlocked ? cn(tier.bg, tier.border, tier.glow) : "bg-white/2 border-white/5 opacity-40 grayscale"
      )}
    >
      {!unlocked && ach.secret && (
        <Lock className="w-6 h-6 text-white/15" />
      )}
      {(!ach.secret || unlocked) && (
        <span className="text-3xl leading-none">{ach.emoji}</span>
      )}
      <div>
        <p className={cn("text-xs font-bold leading-snug", unlocked ? tier.color : "text-white/20")}>
          {ach.secret && !unlocked ? "???" : ach.title}
        </p>
        {unlocked && (
          <p className="text-[10px] text-white/40 leading-tight mt-0.5 line-clamp-2">
            {ach.description}
          </p>
        )}
      </div>
      {unlocked && (
        <span className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border", tier.color, tier.border)}>
          {tier.label}
        </span>
      )}
    </motion.div>
  );
}

function CategorySection({
  category,
  unlockedKeys,
}: {
  category: AchievementCategory;
  unlockedKeys: Set<string>;
}) {
  const [open, setOpen] = useState(true);
  const items = ACHIEVEMENTS.filter((a) => a.category === category);
  const done = items.filter((a) => unlockedKeys.has(a.key)).length;

  return (
    <div className="glass rounded-2xl border border-white/5 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-white/3 transition-colors"
      >
        <span className="text-sm font-bold text-white flex-1 text-left">{CATEGORY_LABELS[category]}</span>
        <span className="text-xs text-white/40">{done}/{items.length}</span>
        <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all"
            style={{ width: `${items.length > 0 ? (done / items.length) * 100 : 0}%` }}
          />
        </div>
        <ChevronDown className={cn("w-4 h-4 text-white/30 transition-transform flex-shrink-0", !open && "-rotate-90")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {items.map((ach) => (
                <AchievementCard key={ach.key} ach={ach} unlocked={unlockedKeys.has(ach.key)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function RankingPage() {
  const { getXP, getLevel, essayHistory, completedLessonSlugs, currentStreak, maxStreak } = useAppStore();
  const xp = getXP();
  const level = getLevel();

  const unlockedKeys = computeUnlocked({
    essays: essayHistory,
    completedLessons: completedLessonSlugs.length,
    currentStreak,
    maxStreak,
  });

  const totalAchs = ACHIEVEMENTS.length;
  const unlockedCount = unlockedKeys.size;

  const nextLevelXp = level < 5 ? [150, 400, 800, 1500, 9999][level - 1] : 9999;
  const progressPct = Math.min((xp / nextLevelXp) * 100, 100);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Trophy className="w-7 h-7 text-yellow-400" />
            Conquistas
          </h1>
          <p className="text-white/40 text-sm mt-1">Desbloqueie conquistas completando redações, aulas e desafios.</p>
        </div>

        {/* Progress bar global */}
        <div className="glass rounded-2xl border border-white/5 p-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-black text-white">{level}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <p className="text-base font-bold text-white">{xp.toLocaleString("pt-BR")} XP — Nível {level}</p>
                <p className="text-xs text-white/40">{unlockedCount}/{totalAchs} conquistas</p>
              </div>
              <div className="h-2 bg-white/5 rounded-full overflow-hidden mb-1">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPct}%` }}
                  transition={{ duration: 1.2 }}
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                />
              </div>
              <p className="text-xs text-white/30">
                {level < 5 ? `${nextLevelXp - xp} XP para nível ${level + 1}` : "Nível máximo!"}
              </p>
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Redações", value: essayHistory.length, icon: "✍️" },
              { label: "Streak atual", value: `${currentStreak}d`, icon: "🔥" },
              { label: "Streak máx.", value: `${maxStreak}d`, icon: "⚡" },
            ].map((s) => (
              <div key={s.label} className="text-center p-3 rounded-xl bg-white/3 border border-white/5">
                <p className="text-lg">{s.icon}</p>
                <p className="text-lg font-black text-white">{s.value}</p>
                <p className="text-[10px] text-white/30">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Desafio da semana */}
        <div className="glass rounded-2xl p-5 border border-yellow-500/15 bg-yellow-500/3">
          <div className="flex items-center gap-2 mb-3">
            <Star className="w-4 h-4 text-yellow-400" />
            <h3 className="text-sm font-semibold text-white">Desafio da Semana</h3>
            <span className="ml-auto text-xs text-yellow-400 font-bold">+500 XP</span>
          </div>
          <p className="text-sm text-white/70 mb-3">Escreva 3 redações esta semana.</p>
          <div className="flex gap-2 mb-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className={cn("flex-1 h-2 rounded-full", essayHistory.length >= n ? "bg-yellow-400" : "bg-white/10")} />
            ))}
          </div>
          <p className="text-[11px] text-white/30">{Math.min(essayHistory.length, 3)}/3 concluídas esta semana</p>
        </div>

        {/* Ranking placeholder */}
        <div className="glass rounded-2xl p-8 border border-white/5 flex flex-col items-center justify-center text-center gap-3">
          <Users className="w-10 h-10 text-white/10" />
          <div>
            <p className="text-white/50 font-semibold mb-1">Ranking global em breve</p>
            <p className="text-sm text-white/30 max-w-xs">Continue acumulando XP e conquistas para garantir uma boa posição quando o ranking abrir.</p>
          </div>
        </div>

        {/* Achievement categories */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold text-white/60 uppercase tracking-wider">Todas as Conquistas</h2>
          {CATEGORIES.map((cat) => (
            <CategorySection key={cat} category={cat} unlockedKeys={unlockedKeys} />
          ))}
        </div>

      </motion.div>
    </div>
  );
}
