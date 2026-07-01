import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatScore(score: number): string {
  return score.toString().padStart(3, "0");
}

/** ENEM scores are always reported in multiples of 10 — round any computed average. */
export function roundScore(score: number): number {
  if (typeof score !== "number" || isNaN(score)) return 0;
  return Math.round(score / 10) * 10;
}

export function getScoreColor(score: number): string {
  if (score >= 900) return "text-yellow-400";
  if (score >= 800) return "text-green-400";
  if (score >= 700) return "text-blue-400";
  if (score >= 600) return "text-orange-400";
  return "text-red-400";
}

export function getScoreLabel(score: number): string {
  if (score >= 900) return "Excepcional";
  if (score >= 800) return "Muito Bom";
  if (score >= 700) return "Bom";
  if (score >= 600) return "Regular";
  if (score >= 400) return "Precário";
  return "Muito Precário";
}

export function getCompetencyLabel(c: number): string {
  const labels: Record<number, string> = {
    1: "Domínio Linguístico",
    2: "Compreensão do Tema",
    3: "Argumentação",
    4: "Coesão Textual",
    5: "Proposta de Intervenção",
  };
  return labels[c] || `C${c}`;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(date));
}

export function formatRelativeDate(date: string | Date): string {
  const now = new Date();
  const d = new Date(date);
  const diffMs = now.getTime() - d.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "Hoje";
  if (diffDays === 1) return "Ontem";
  if (diffDays < 7) return `${diffDays} dias atrás`;
  return formatDate(date);
}

export function getLevelFromXP(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

export function getXPForNextLevel(level: number): number {
  return Math.pow(level, 2) * 100;
}

export function getXPProgress(xp: number): number {
  const level = getLevelFromXP(xp);
  const xpForCurrentLevel = Math.pow(level - 1, 2) * 100;
  const xpForNextLevel = getXPForNextLevel(level);
  return ((xp - xpForCurrentLevel) / (xpForNextLevel - xpForCurrentLevel)) * 100;
}

export function getRarityColor(rarity: string): string {
  const colors: Record<string, string> = {
    COMMON: "text-gray-400 border-gray-400/30",
    UNCOMMON: "text-green-400 border-green-400/30",
    RARE: "text-blue-400 border-blue-400/30",
    EPIC: "text-purple-400 border-purple-400/30",
    LEGENDARY: "text-yellow-400 border-yellow-400/30",
  };
  return colors[rarity] || "text-gray-400 border-gray-400/30";
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function wordCount(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function paragraphCount(text: string): number {
  return text.split(/\n\n+/).filter((p) => p.trim().length > 0).length;
}
