"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, Star, Shield, Lock, Users } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { cn, getRarityColor } from "@/lib/utils";

const ACHIEVEMENTS = [
  { key: "first_essay", title: "Primeira Redação", description: "Enviou sua primeira redação para correção", rarity: "COMMON" },
  { key: "streak_7", title: "Semana Dedicada", description: "7 dias de streak consecutivos", rarity: "UNCOMMON" },
  { key: "score_800", title: "Alto Nível", description: "Atingiu 800 pontos em uma redação", rarity: "RARE" },
  { key: "lessons_5", title: "Aluno Aplicado", description: "Completou 5 aulas", rarity: "UNCOMMON" },
  { key: "score_1000", title: "Nota Máxima", description: "Atingiu 1000 pontos na redação", rarity: "LEGENDARY" },
  { key: "essays_10", title: "Escritor", description: "Corrigiu 10 redações com IA", rarity: "RARE" },
];

const rarityGlows: Record<string, string> = {
  COMMON: "",
  UNCOMMON: "shadow-[0_0_10px_rgba(34,197,94,0.3)]",
  RARE: "shadow-[0_0_10px_rgba(59,130,246,0.3)]",
  EPIC: "shadow-[0_0_15px_rgba(168,85,247,0.3)]",
  LEGENDARY: "shadow-[0_0_20px_rgba(251,191,36,0.4)]",
};

export default function RankingPage() {
  const { getXP, getLevel, essayHistory, completedLessonSlugs } = useAppStore();
  const xp = getXP();
  const level = getLevel();

  const unlockedKeys = new Set<string>();
  if (essayHistory.length >= 1) unlockedKeys.add("first_essay");
  if (essayHistory.length >= 10) unlockedKeys.add("essays_10");
  if (essayHistory.some((e) => e.score >= 800)) unlockedKeys.add("score_800");
  if (essayHistory.some((e) => e.score >= 1000)) unlockedKeys.add("score_1000");
  if (completedLessonSlugs.length >= 5) unlockedKeys.add("lessons_5");

  const nextLevelXp = level < 5 ? [150, 400, 800, 1500, 9999][level - 1] : 9999;
  const progressPct = Math.min((xp / nextLevelXp) * 100, 100);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Trophy className="w-7 h-7 text-yellow-400" />
            Ranking
          </h1>
          <p className="text-white/40 text-sm mt-1">Compete com outros estudantes. Em breve mais jogadores.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard — empty until backend has real users */}
          <div className="lg:col-span-2 space-y-4">
            <div className="glass rounded-2xl p-10 border border-white/5 flex flex-col items-center justify-center text-center gap-4">
              <Users className="w-10 h-10 text-white/10" />
              <div>
                <p className="text-white/50 font-semibold mb-1">Ranking em breve</p>
                <p className="text-sm text-white/30 max-w-xs">
                  O ranking global estará disponível quando mais estudantes se cadastrarem. Continue praticando para garantir uma boa posição!
                </p>
              </div>
            </div>

            {/* Weekly challenge */}
            <div className="glass rounded-2xl p-5 border border-yellow-500/15 bg-yellow-500/3">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-400" />
                <h3 className="text-sm font-semibold text-white">Desafio da Semana</h3>
              </div>
              <p className="text-sm text-white/70 mb-3">
                Escreva 3 redações esta semana e ganhe <strong className="text-yellow-300">+500 XP</strong>.
              </p>
              <div className="flex gap-2 mb-3">
                {[1, 2, 3].map((n) => (
                  <div key={n} className={cn("flex-1 h-1.5 rounded-full", essayHistory.length >= n ? "bg-yellow-400" : "bg-white/10")} />
                ))}
              </div>
              <p className="text-[11px] text-white/30">{Math.min(essayHistory.length, 3)}/3 redações concluídas esta semana</p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Your XP card */}
            <div className="glass rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Seu Progresso</h3>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-xl font-black text-white">{level}</span>
                </div>
                <div>
                  <p className="text-lg font-black text-white">{xp.toLocaleString("pt-BR")} XP</p>
                  <p className="text-xs text-white/40">Nível {level}</p>
                </div>
              </div>
              {level < 5 && (
                <>
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-white/40">Para o Nível {level + 1}</span>
                    <span className="text-white/60">{xp} / {nextLevelXp} XP</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPct}%` }}
                      transition={{ duration: 1.2 }}
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                    />
                  </div>
                  <p className="text-xs text-white/30 mt-1.5">{nextLevelXp - xp} XP para o próximo nível</p>
                </>
              )}
            </div>

            {/* Achievements */}
            <div className="glass rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Conquistas</h3>
                <span className="ml-auto text-xs text-white/30">{unlockedKeys.size}/{ACHIEVEMENTS.length}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {ACHIEVEMENTS.map((ach) => {
                  const unlocked = unlockedKeys.has(ach.key);
                  return (
                    <div
                      key={ach.key}
                      title={`${ach.title} — ${ach.description}`}
                      className={cn(
                        "aspect-square rounded-xl border p-2 flex flex-col items-center justify-center gap-1 transition-all",
                        unlocked
                          ? cn("bg-white/5", getRarityColor(ach.rarity), rarityGlows[ach.rarity])
                          : "bg-white/2 border-white/5 opacity-40"
                      )}
                    >
                      {unlocked
                        ? <Trophy className={cn("w-5 h-5", ach.rarity === "LEGENDARY" ? "text-yellow-400" : ach.rarity === "RARE" ? "text-blue-400" : "text-white/60")} />
                        : <Lock className="w-4 h-4 text-white/20" />
                      }
                      <p className="text-[9px] text-center leading-tight text-white/50 line-clamp-2">{ach.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
