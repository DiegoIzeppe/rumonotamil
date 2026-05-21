import type { EssayHistoryEntry } from "@/store/app-store";

export type AchievementTier = "bronze" | "silver" | "gold" | "diamond" | "legendary" | "secret";
export type AchievementCategory =
  | "escrita"
  | "consistencia"
  | "competencias"
  | "desempenho"
  | "desafios"
  | "repertorio"
  | "qualidade"
  | "ranking"
  | "secreta";

export interface Achievement {
  key: string;
  title: string;
  description: string;
  tier: AchievementTier;
  category: AchievementCategory;
  secret?: boolean;
  emoji: string;
}

export const ACHIEVEMENTS: Achievement[] = [
  // ── Escrita ──────────────────────────────────────────────────────────────
  { key: "first_essay",      title: "Primeiras Palavras",        description: "Enviou a primeira redação para correção",          tier: "bronze",    category: "escrita",      emoji: "✍️" },
  { key: "essays_5",         title: "Caneta Ativa",              description: "Escreveu 5 redações",                             tier: "silver",    category: "escrita",      emoji: "🖊️" },
  { key: "essays_25",        title: "Máquina de Argumentos",     description: "Escreveu 25 redações",                            tier: "gold",      category: "escrita",      emoji: "⚙️" },
  { key: "essays_50",        title: "Autor Incansável",          description: "Escreveu 50 redações",                            tier: "diamond",   category: "escrita",      emoji: "📖" },
  { key: "essays_100",       title: "Maratona Literária",        description: "Escreveu 100 redações",                           tier: "legendary", category: "escrita",      emoji: "🏃" },

  // ── Consistência ─────────────────────────────────────────────────────────
  { key: "streak_5",         title: "5 Dias Seguidos",           description: "5 dias consecutivos de estudo",                   tier: "bronze",    category: "consistencia", emoji: "🔥" },
  { key: "streak_10",        title: "10 Dias Seguidos",          description: "10 dias consecutivos — primeira semana e meia",   tier: "bronze",    category: "consistencia", emoji: "🔥" },
  { key: "streak_20",        title: "20 Dias Seguidos",          description: "20 dias consecutivos — ritmo estabelecido",       tier: "silver",    category: "consistencia", emoji: "⚡" },
  { key: "streak_30",        title: "Semana Implacável",         description: "30 dias consecutivos de estudo",                  tier: "silver",    category: "consistencia", emoji: "🔥" },
  { key: "streak_40",        title: "Disciplina Real",           description: "40 dias consecutivos — foco total",               tier: "gold",      category: "consistencia", emoji: "💪" },
  { key: "streak_50",        title: "Disciplina de Ferro",       description: "50 dias consecutivos sem parar",                  tier: "gold",      category: "consistencia", emoji: "⚡" },
  { key: "streak_100",       title: "Modo ENEM Ativado",         description: "100 dias consecutivos — elite do estudo",         tier: "diamond",   category: "consistencia", emoji: "🏆" },
  { key: "streak_200",       title: "Rotina Nota 1000",          description: "200 dias — hábito transformado em identidade",    tier: "legendary", category: "consistencia", emoji: "👑" },
  { key: "simulado",         title: "Modo ENEM",                 description: "Completou um simulado cronometrado",              tier: "silver",    category: "consistencia", emoji: "⏱️" },

  // ── Competências C1 ──────────────────────────────────────────────────────
  { key: "c1_120",           title: "Gramática Sob Controle",   description: "C1 ≥ 120 em alguma redação",                      tier: "bronze",    category: "competencias", emoji: "📝" },
  { key: "c1_160",           title: "Português Afiado",         description: "C1 ≥ 160 em alguma redação",                      tier: "silver",    category: "competencias", emoji: "✒️" },
  { key: "c1_200",           title: "Erro Zero",                description: "C1 = 200 — domínio total da norma culta",         tier: "gold",      category: "competencias", emoji: "🎯" },

  // ── Competências C2 ──────────────────────────────────────────────────────
  { key: "c2_120",           title: "Repertório Vivo",          description: "C2 ≥ 120 em alguma redação",                      tier: "bronze",    category: "competencias", emoji: "📚" },
  { key: "c2_160",           title: "Referência Inteligente",   description: "C2 ≥ 160 em alguma redação",                      tier: "silver",    category: "competencias", emoji: "🧩" },
  { key: "c2_200",           title: "Argumentador Cultural",    description: "C2 = 200 — repertório impecável",                 tier: "gold",      category: "competencias", emoji: "🎭" },

  // ── Competências C3 ──────────────────────────────────────────────────────
  { key: "c3_120",           title: "Mestre da Argumentação",   description: "C3 ≥ 120 em alguma redação",                      tier: "bronze",    category: "competencias", emoji: "💡" },
  { key: "c3_160",           title: "Tese Impecável",           description: "C3 ≥ 160 em alguma redação",                      tier: "silver",    category: "competencias", emoji: "🧠" },
  { key: "c3_200",           title: "Construção Perfeita",      description: "C3 = 200 — argumentação perfeita",                tier: "gold",      category: "competencias", emoji: "🏛️" },

  // ── Competências C4 ──────────────────────────────────────────────────────
  { key: "c4_120",           title: "Conectando Ideias",        description: "C4 ≥ 120 em alguma redação",                      tier: "bronze",    category: "competencias", emoji: "🔗" },
  { key: "c4_160",           title: "Coesão Avançada",          description: "C4 ≥ 160 em alguma redação",                      tier: "silver",    category: "competencias", emoji: "🌊" },
  { key: "c4_200",           title: "Fluxo Perfeito",           description: "C4 = 200 — coesão exemplar",                      tier: "gold",      category: "competencias", emoji: "🎵" },

  // ── Competências C5 ──────────────────────────────────────────────────────
  { key: "c5_120",           title: "Agente da Solução",        description: "C5 ≥ 120 em alguma redação",                      tier: "bronze",    category: "competencias", emoji: "🛠️" },
  { key: "c5_160",           title: "Intervenção Completa",     description: "C5 ≥ 160 em alguma redação",                      tier: "silver",    category: "competencias", emoji: "📋" },
  { key: "c5_200",           title: "Proposta Nota Mil",        description: "C5 = 200 — proposta perfeita",                    tier: "gold",      category: "competencias", emoji: "⭐" },

  // ── Desempenho ───────────────────────────────────────────────────────────
  { key: "score_700",        title: "700+",                     description: "Atingiu 700 pontos em uma redação",               tier: "bronze",    category: "desempenho",   emoji: "🥉" },
  { key: "score_800",        title: "800+",                     description: "Atingiu 800 pontos em uma redação",               tier: "silver",    category: "desempenho",   emoji: "🥈" },
  { key: "score_900",        title: "900+",                     description: "Atingiu 900 pontos em uma redação",               tier: "gold",      category: "desempenho",   emoji: "🥇" },
  { key: "score_960",        title: "Quase Lá",                 description: "Atingiu 960 pontos — muito perto do topo",        tier: "diamond",   category: "desempenho",   emoji: "💎" },
  { key: "score_1000",       title: "Nota Mil",                 description: "1000 pontos — nota máxima no ENEM",               tier: "legendary", category: "desempenho",   emoji: "👑" },
  { key: "all_200",          title: "Perfeito Total",           description: "200 pontos em todas as 5 competências",           tier: "legendary", category: "desempenho",   emoji: "🌟" },

  // ── Desafios ─────────────────────────────────────────────────────────────
  { key: "hard_theme",       title: "Tema Difícil",             description: "Escreveu uma redação marcada como Difícil",        tier: "silver",    category: "desafios",     emoji: "💀" },
  { key: "timed",            title: "Contra o Relógio",         description: "Terminou redação no simulado cronometrado",       tier: "gold",      category: "desafios",     emoji: "⏰" },
  { key: "improve_200",      title: "Virada Histórica",         description: "Melhorou 200+ pontos em relação à redação anterior", tier: "gold",  category: "desafios",     emoji: "📈" },
  { key: "improve_any",      title: "Superação",                description: "Melhorou a nota em relação à redação anterior",   tier: "bronze",    category: "desafios",     emoji: "💪" },
  { key: "essays_3_week",    title: "Reescritor",               description: "Enviou 3 redações na mesma semana",               tier: "silver",    category: "desafios",     emoji: "🔄" },
  { key: "no_assistant",     title: "Sem Ajuda",                description: "Escreveu redação sem consultar o assistente",     tier: "gold",      category: "desafios",     emoji: "🦅" },

  // ── Qualidade ────────────────────────────────────────────────────────────
  { key: "all_c_120",        title: "Introdução Perfeita",      description: "Todas as 5 competências ≥ 120 em uma redação",    tier: "silver",    category: "qualidade",    emoji: "🎯" },
  { key: "all_c_160",        title: "Boa Progressão",           description: "Todas as 5 competências ≥ 160 em uma redação",    tier: "gold",      category: "qualidade",    emoji: "📊" },
  { key: "c4_c3_200",        title: "Excelente Coesão",         description: "C3 e C4 = 200 na mesma redação",                  tier: "gold",      category: "qualidade",    emoji: "🌊" },
  { key: "no_fuga",          title: "Sem Fuga ao Tema",         description: "C2 = 200 em alguma redação",                      tier: "silver",    category: "qualidade",    emoji: "🎯" },
  { key: "c3_c5_perfect",    title: "Argumento Original",       description: "C3 e C5 = 200 na mesma redação",                  tier: "diamond",   category: "qualidade",    emoji: "💡" },

  // ── Ranking/Social ───────────────────────────────────────────────────────
  { key: "top_100",          title: "Top 100",                  description: "Entrou no top 100 do ranking global",             tier: "silver",    category: "ranking",      emoji: "🏅" },
  { key: "lenda",            title: "Lenda do Ranking",         description: "Manteve top 10 por 30 dias",                      tier: "legendary", category: "ranking",      emoji: "🦁" },
  { key: "subindo",          title: "Subindo Rápido",           description: "Subiu 50 posições no ranking em uma semana",      tier: "gold",      category: "ranking",      emoji: "🚀" },
  { key: "elite",            title: "Elite Nota 1000",          description: "Média de redações acima de 900",                  tier: "diamond",   category: "ranking",      emoji: "💎" },

  // ── Secretas ─────────────────────────────────────────────────────────────
  { key: "madrugador",       title: "Madrugador",               description: "Escreveu uma redação entre 4h e 6h da manhã",     tier: "secret",    category: "secreta",      emoji: "🌅", secret: true },
  { key: "noturno",          title: "Noturno",                  description: "Escreveu uma redação após meia-noite",            tier: "secret",    category: "secreta",      emoji: "🌙", secret: true },
  { key: "persistente",      title: "Persistente",              description: "Continuou estudando após uma nota abaixo de 500", tier: "secret",    category: "secreta",      emoji: "🔥", secret: true },
  { key: "revanche",         title: "Revanche",                 description: "Melhorou após uma nota abaixo de 600",            tier: "secret",    category: "secreta",      emoji: "⚔️", secret: true },
  { key: "perfeccionista",   title: "Perfeccionista",           description: "Enviou 5 redações sobre o mesmo tema",            tier: "secret",    category: "secreta",      emoji: "🔬", secret: true },
  { key: "maratona_dia",     title: "Ultra Escritor",           description: "Enviou 3 redações no mesmo dia",                  tier: "secret",    category: "secreta",      emoji: "⚡", secret: true },
];

export interface AchievementStats {
  essays: EssayHistoryEntry[];
  completedLessons: number;
  currentStreak: number;
  maxStreak: number;
}

export function computeUnlocked(stats: AchievementStats): Set<string> {
  const { essays, completedLessons, currentStreak, maxStreak } = stats;
  const unlocked = new Set<string>();
  const streak = Math.max(currentStreak, maxStreak);

  const total = essays.length;
  const scores = essays.map((e) => e.score);
  const bestScore = scores.length > 0 ? Math.max(...scores) : 0;
  const avgScore = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;

  const c1scores = essays.map((e) => e.feedback.competency1?.score ?? 0);
  const c2scores = essays.map((e) => e.feedback.competency2?.score ?? 0);
  const c3scores = essays.map((e) => e.feedback.competency3?.score ?? 0);
  const c4scores = essays.map((e) => e.feedback.competency4?.score ?? 0);
  const c5scores = essays.map((e) => e.feedback.competency5?.score ?? 0);

  // Escrita
  if (total >= 1)   unlocked.add("first_essay");
  if (total >= 5)   unlocked.add("essays_5");
  if (total >= 25)  unlocked.add("essays_25");
  if (total >= 50)  unlocked.add("essays_50");
  if (total >= 100) unlocked.add("essays_100");

  // Consistência
  if (streak >= 5)   unlocked.add("streak_5");
  if (streak >= 10)  unlocked.add("streak_10");
  if (streak >= 20)  unlocked.add("streak_20");
  if (streak >= 30)  unlocked.add("streak_30");
  if (streak >= 40)  unlocked.add("streak_40");
  if (streak >= 50)  unlocked.add("streak_50");
  if (streak >= 100) unlocked.add("streak_100");
  if (streak >= 200) unlocked.add("streak_200");
  if (essays.some((e) => e.wasSimulado)) unlocked.add("simulado");

  // C1
  if (c1scores.some((s) => s >= 120)) unlocked.add("c1_120");
  if (c1scores.some((s) => s >= 160)) unlocked.add("c1_160");
  if (c1scores.some((s) => s >= 200)) unlocked.add("c1_200");

  // C2
  if (c2scores.some((s) => s >= 120)) unlocked.add("c2_120");
  if (c2scores.some((s) => s >= 160)) unlocked.add("c2_160");
  if (c2scores.some((s) => s >= 200)) unlocked.add("c2_200");

  // C3
  if (c3scores.some((s) => s >= 120)) unlocked.add("c3_120");
  if (c3scores.some((s) => s >= 160)) unlocked.add("c3_160");
  if (c3scores.some((s) => s >= 200)) unlocked.add("c3_200");

  // C4
  if (c4scores.some((s) => s >= 120)) unlocked.add("c4_120");
  if (c4scores.some((s) => s >= 160)) unlocked.add("c4_160");
  if (c4scores.some((s) => s >= 200)) unlocked.add("c4_200");

  // C5
  if (c5scores.some((s) => s >= 120)) unlocked.add("c5_120");
  if (c5scores.some((s) => s >= 160)) unlocked.add("c5_160");
  if (c5scores.some((s) => s >= 200)) unlocked.add("c5_200");

  // Desempenho
  if (bestScore >= 700)  unlocked.add("score_700");
  if (bestScore >= 800)  unlocked.add("score_800");
  if (bestScore >= 900)  unlocked.add("score_900");
  if (bestScore >= 960)  unlocked.add("score_960");
  if (bestScore >= 1000) unlocked.add("score_1000");
  if (essays.some((e) =>
    (e.feedback.competency1?.score ?? 0) === 200 &&
    (e.feedback.competency2?.score ?? 0) === 200 &&
    (e.feedback.competency3?.score ?? 0) === 200 &&
    (e.feedback.competency4?.score ?? 0) === 200 &&
    (e.feedback.competency5?.score ?? 0) === 200
  )) unlocked.add("all_200");

  // Desafios
  if (essays.some((e) => e.wasSimulado)) { unlocked.add("timed"); unlocked.add("simulado"); }
  if (essays.some((e) => (e.previousScore !== undefined) && e.score - e.previousScore >= 50)) unlocked.add("improve_any");
  if (essays.some((e) => (e.previousScore !== undefined) && e.score - e.previousScore >= 200)) unlocked.add("improve_200");
  if (essays.some((e) => e.usedAssistant === false)) unlocked.add("no_assistant");
  if (essays.some((e) => e.themeDifficulty === "Difícil")) unlocked.add("hard_theme");

  // 3 essays in same week
  const weekBuckets: Record<string, number> = {};
  for (const e of essays) {
    const d = new Date(e.date);
    const y = d.getFullYear();
    const dayOfYear = Math.floor((d.getTime() - new Date(y, 0, 0).getTime()) / 86400000);
    const week = Math.floor(dayOfYear / 7);
    const key = `${y}-${week}`;
    weekBuckets[key] = (weekBuckets[key] ?? 0) + 1;
  }
  if (Object.values(weekBuckets).some((c) => c >= 3)) unlocked.add("essays_3_week");

  // 3 essays same theme (perfeccionista)
  const themeBuckets: Record<string, number> = {};
  for (const e of essays) {
    themeBuckets[e.theme] = (themeBuckets[e.theme] ?? 0) + 1;
  }
  if (Object.values(themeBuckets).some((c) => c >= 5)) unlocked.add("perfeccionista");

  // 3 essays same day
  const dayBuckets: Record<string, number> = {};
  for (const e of essays) {
    const day = e.date.slice(0, 10);
    dayBuckets[day] = (dayBuckets[day] ?? 0) + 1;
  }
  if (Object.values(dayBuckets).some((c) => c >= 3)) unlocked.add("maratona_dia");

  // Qualidade
  if (essays.some((e) =>
    [e.feedback.competency1, e.feedback.competency2, e.feedback.competency3, e.feedback.competency4, e.feedback.competency5]
      .every((c) => (c?.score ?? 0) >= 120)
  )) unlocked.add("all_c_120");
  if (essays.some((e) =>
    [e.feedback.competency1, e.feedback.competency2, e.feedback.competency3, e.feedback.competency4, e.feedback.competency5]
      .every((c) => (c?.score ?? 0) >= 160)
  )) unlocked.add("all_c_160");
  if (essays.some((e) =>
    (e.feedback.competency3?.score ?? 0) === 200 && (e.feedback.competency4?.score ?? 0) === 200
  )) unlocked.add("c4_c3_200");
  if (essays.some((e) =>
    (e.feedback.competency3?.score ?? 0) === 200 && (e.feedback.competency5?.score ?? 0) === 200
  )) unlocked.add("c3_c5_perfect");
  if (c2scores.some((s) => s === 200)) unlocked.add("no_fuga");

  // Ranking (can only unlock via future backend data)
  if (avgScore >= 900 && total >= 5) unlocked.add("elite");

  // Secretas
  if (essays.some((e) => e.hour >= 4 && e.hour < 6)) unlocked.add("madrugador");
  if (essays.some((e) => e.hour === 0 || e.hour === 1)) unlocked.add("noturno");
  if (essays.some((e) => e.score < 500) && total > 1) unlocked.add("persistente");
  if (essays.some((e) => (e.previousScore !== undefined) && e.previousScore < 600 && e.score > e.previousScore)) unlocked.add("revanche");

  return unlocked;
}

export const TIER_CONFIG: Record<AchievementTier, { label: string; color: string; border: string; glow: string; bg: string }> = {
  bronze:    { label: "Bronze",    color: "text-orange-700",  border: "border-orange-700/30", glow: "",                                        bg: "bg-orange-900/20" },
  silver:    { label: "Prata",     color: "text-gray-300",    border: "border-gray-400/30",   glow: "shadow-[0_0_8px_rgba(156,163,175,0.3)]",  bg: "bg-gray-700/20"  },
  gold:      { label: "Ouro",      color: "text-yellow-400",  border: "border-yellow-400/30", glow: "shadow-[0_0_12px_rgba(251,191,36,0.3)]",  bg: "bg-yellow-900/20" },
  diamond:   { label: "Diamante",  color: "text-cyan-300",    border: "border-cyan-400/30",   glow: "shadow-[0_0_16px_rgba(103,232,249,0.3)]", bg: "bg-cyan-900/20"  },
  legendary: { label: "Lendário",  color: "text-purple-400",  border: "border-purple-500/30", glow: "shadow-[0_0_20px_rgba(168,85,247,0.4)]",  bg: "bg-purple-900/20" },
  secret:    { label: "Secreta",   color: "text-pink-400",    border: "border-pink-500/30",   glow: "shadow-[0_0_14px_rgba(236,72,153,0.3)]",  bg: "bg-pink-900/20"  },
};

export const CATEGORY_LABELS: Record<AchievementCategory, string> = {
  escrita:       "✍️ Escrita",
  consistencia:  "🔥 Consistência",
  competencias:  "🧠 Competências",
  desempenho:    "🏆 Desempenho",
  desafios:      "⚔️ Desafios",
  repertorio:    "📚 Repertório",
  qualidade:     "🎯 Qualidade",
  ranking:       "👑 Ranking",
  secreta:       "🔐 Secretas",
};
