"use client";

import { motion } from "framer-motion";
import { Trophy, Flame, Zap, Star, Shield, Crown, Medal, ChevronRight, Lock } from "lucide-react";
import { mockRanking, mockAchievements, mockUser } from "@/lib/mock-data";
import { cn, getRarityColor } from "@/lib/utils";

const rarityLabels: Record<string, string> = {
  COMMON: "Comum", UNCOMMON: "Incomum", RARE: "Raro", EPIC: "Épico", LEGENDARY: "Lendário",
};

const rarityGlows: Record<string, string> = {
  COMMON: "", UNCOMMON: "shadow-[0_0_10px_rgba(34,197,94,0.3)]",
  RARE: "shadow-[0_0_10px_rgba(59,130,246,0.3)]",
  EPIC: "shadow-[0_0_15px_rgba(168,85,247,0.3)]",
  LEGENDARY: "shadow-[0_0_20px_rgba(251,191,36,0.4)]",
};

function PodiumCard({ entry, pos }: { entry: typeof mockRanking[0]; pos: number }) {
  const heights = { 1: "h-32", 2: "h-24", 3: "h-20" };
  const colors = {
    1: "from-yellow-500/30 to-orange-500/20 border-yellow-500/30",
    2: "from-gray-400/20 to-gray-600/10 border-gray-400/20",
    3: "from-orange-700/20 to-orange-900/10 border-orange-700/20",
  };
  const icons = { 1: Crown, 2: Medal, 3: Medal };
  const Icon = icons[pos as keyof typeof icons];

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
        <span className="text-lg font-black text-white">{entry.name[0]}</span>
        <div className={cn(
          "absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center",
          pos === 1 ? "bg-yellow-500" : pos === 2 ? "bg-gray-400" : "bg-orange-700"
        )}>
          <Icon className="w-3 h-3 text-white" />
        </div>
      </div>
      <div className={cn("w-24 rounded-t-xl flex items-center justify-center bg-gradient-to-b border", heights[pos as keyof typeof heights], colors[pos as keyof typeof colors])}>
        <span className="text-xl font-black text-white">#{pos}</span>
      </div>
      <p className="text-xs font-semibold text-white/80 text-center max-w-[80px] truncate">{entry.name.split(" ")[0]}</p>
      <p className="text-xs text-blue-400">{entry.xp.toLocaleString("pt-BR")} XP</p>
    </div>
  );
}

export default function RankingPage() {
  const top3 = mockRanking.slice(0, 3);
  const rest = mockRanking.slice(3);

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
            <Trophy className="w-7 h-7 text-yellow-400" />
            Ranking
          </h1>
          <p className="text-white/40 text-sm mt-1">Competição saudável para te manter motivado.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leaderboard */}
          <div className="lg:col-span-2 space-y-4">
            {/* Podium */}
            <div className="glass rounded-2xl p-8 border border-white/5">
              <div className="flex items-end justify-center gap-4">
                <PodiumCard entry={top3[1]} pos={2} />
                <PodiumCard entry={top3[0]} pos={1} />
                <PodiumCard entry={top3[2]} pos={3} />
              </div>
            </div>

            {/* Full table */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="px-5 py-3 border-b border-white/5 flex items-center gap-3 text-xs text-white/30 font-medium uppercase tracking-wider">
                <span className="w-8">#</span>
                <span className="flex-1">Estudante</span>
                <span className="w-20 text-right hidden sm:block">Nota Avg</span>
                <span className="w-16 text-right hidden md:block">Streak</span>
                <span className="w-20 text-right">XP</span>
              </div>
              {mockRanking.map((entry, i) => (
                <motion.div
                  key={entry.position}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={cn(
                    "px-5 py-3.5 flex items-center gap-3 border-b border-white/5 last:border-0 transition-colors",
                    entry.isMe
                      ? "bg-blue-500/5 border-y border-blue-500/10"
                      : "hover:bg-white/2"
                  )}
                >
                  <span className={cn(
                    "w-8 text-sm font-bold flex-shrink-0",
                    entry.position === 1 ? "text-yellow-400" :
                    entry.position === 2 ? "text-gray-400" :
                    entry.position === 3 ? "text-orange-700" : "text-white/30"
                  )}>
                    {entry.position <= 3 ? ["🥇","🥈","🥉"][entry.position - 1] : `#${entry.position}`}
                  </span>
                  <div className="flex items-center gap-2.5 flex-1 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">
                      {entry.name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className={cn("text-sm font-medium truncate", entry.isMe ? "text-blue-300" : "text-white/80")}>
                        {entry.name} {entry.isMe && <span className="text-[11px] text-blue-400/60">(você)</span>}
                      </p>
                      <span className={cn("text-[10px] font-bold uppercase px-1.5 py-0.5 rounded",
                        entry.plan === "ELITE" ? "text-yellow-400 bg-yellow-500/10" :
                        entry.plan === "PRO" ? "text-blue-400 bg-blue-500/10" :
                        "text-white/30 bg-white/5"
                      )}>
                        {entry.plan}
                      </span>
                    </div>
                  </div>
                  <span className="w-20 text-right text-sm font-bold text-blue-400 hidden sm:block">
                    {entry.avgScore}
                  </span>
                  <div className="w-16 text-right hidden md:flex items-center justify-end gap-1">
                    <Flame className="w-3 h-3 text-orange-400" />
                    <span className="text-sm text-orange-300">{entry.streak}</span>
                  </div>
                  <div className="w-20 text-right flex items-center justify-end gap-1">
                    <Zap className="w-3 h-3 text-blue-400" />
                    <span className="text-sm font-bold text-white/70">{entry.xp.toLocaleString("pt-BR")}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Achievements + XP */}
          <div className="space-y-4">
            {/* Your XP card */}
            <div className="glass rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Seu Progresso</h3>
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <span className="text-xl font-black text-white">{mockUser.level}</span>
                </div>
                <div>
                  <p className="text-lg font-black text-white">{mockUser.xp.toLocaleString("pt-BR")} XP</p>
                  <p className="text-xs text-white/40">Nível {mockUser.level} — Posição #3</p>
                </div>
              </div>
              <div className="space-y-1.5 mb-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white/40">Para o Nível {mockUser.level + 1}</span>
                  <span className="text-white/60">4.280 / 5.000 XP</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "85.6%" }}
                    transition={{ duration: 1.2 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                  />
                </div>
              </div>
              <p className="text-xs text-white/30">720 XP para o próximo nível</p>
            </div>

            {/* Weekly challenge */}
            <div className="glass rounded-2xl p-5 border border-yellow-500/15 bg-yellow-500/3">
              <div className="flex items-center gap-2 mb-3">
                <Star className="w-4 h-4 text-yellow-400" />
                <h3 className="text-sm font-semibold text-white">Desafio da Semana</h3>
              </div>
              <p className="text-sm text-white/70 mb-3">Escreva 3 redações sobre o tema da semana e ganhe <strong className="text-yellow-300">+500 XP</strong>.</p>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className={cn("flex-1 h-1.5 rounded-full", n === 1 ? "bg-yellow-400" : "bg-white/10")} />
                ))}
              </div>
              <p className="text-[11px] text-white/30">1/3 redações concluídas • 6 dias restantes</p>
            </div>

            {/* Achievements */}
            <div className="glass rounded-2xl p-5 border border-white/5">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Conquistas</h3>
                <span className="ml-auto text-xs text-white/30">
                  {mockAchievements.filter((a) => a.unlocked).length}/{mockAchievements.length}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {mockAchievements.map((ach) => (
                  <div
                    key={ach.key}
                    title={ach.title + " — " + ach.description}
                    className={cn(
                      "aspect-square rounded-xl border p-2 flex flex-col items-center justify-center gap-1 transition-all",
                      ach.unlocked
                        ? cn("bg-white/5", getRarityColor(ach.rarity), rarityGlows[ach.rarity])
                        : "bg-white/2 border-white/5 opacity-40"
                    )}
                  >
                    {ach.unlocked
                      ? <Trophy className={cn("w-5 h-5", ach.rarity === "LEGENDARY" ? "text-yellow-400" : ach.rarity === "EPIC" ? "text-purple-400" : ach.rarity === "RARE" ? "text-blue-400" : "text-white/60")} />
                      : <Lock className="w-4 h-4 text-white/20" />
                    }
                    <p className="text-[9px] text-center leading-tight text-white/50 line-clamp-2">{ach.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
