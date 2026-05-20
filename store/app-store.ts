import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EssayCorrectionOutput } from "@/lib/claude";

interface LastCorrectionResult {
  feedback: EssayCorrectionOutput;
  essayText?: string;
}

export interface EssayHistoryEntry {
  id: string;
  theme: string;
  score: number;
  date: string;
  feedback: EssayCorrectionOutput;
}

interface AppState {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;

  currentTheme: string;
  setCurrentTheme: (theme: string) => void;

  essayDraft: string;
  setEssayDraft: (draft: string) => void;
  clearEssayDraft: () => void;

  lastCorrectionResult: LastCorrectionResult | null;
  setLastCorrectionResult: (result: LastCorrectionResult | null) => void;

  // Lesson completion — persisted
  completedLessonSlugs: string[];
  markLessonComplete: (slug: string) => void;
  isLessonComplete: (slug: string) => boolean;

  // Derived XP: 50 per lesson completed
  getXP: () => number;
  getLevel: () => number;

  // Essay history — real corrections done by the user
  essayHistory: EssayHistoryEntry[];
  addEssayToHistory: (entry: Omit<EssayHistoryEntry, "id" | "date">) => void;

  // Auth user info (cached from /api/auth/me)
  userInfo: { name: string; email: string } | null;
  setUserInfo: (info: { name: string; email: string } | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      sidebarOpen: true,
      setSidebarOpen: (v) => set({ sidebarOpen: v }),

      currentTheme: "",
      setCurrentTheme: (theme) => set({ currentTheme: theme }),

      essayDraft: "",
      setEssayDraft: (draft) => set({ essayDraft: draft }),
      clearEssayDraft: () => set({ essayDraft: "" }),

      lastCorrectionResult: null,
      setLastCorrectionResult: (result) => set({ lastCorrectionResult: result }),

      completedLessonSlugs: [],
      markLessonComplete: (slug) =>
        set((s) =>
          s.completedLessonSlugs.includes(slug)
            ? s
            : { completedLessonSlugs: [...s.completedLessonSlugs, slug] }
        ),
      isLessonComplete: (slug) => get().completedLessonSlugs.includes(slug),

      getXP: () => get().completedLessonSlugs.length * 50,
      getLevel: () => {
        const xp = get().completedLessonSlugs.length * 50;
        if (xp >= 1500) return 5;
        if (xp >= 800) return 4;
        if (xp >= 400) return 3;
        if (xp >= 150) return 2;
        return 1;
      },

      essayHistory: [],
      addEssayToHistory: (entry) =>
        set((s) => ({
          essayHistory: [
            {
              ...entry,
              id: `essay-${Date.now()}`,
              date: new Date().toISOString(),
            },
            ...s.essayHistory,
          ].slice(0, 50), // cap at 50
        })),

      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),
    }),
    {
      name: "rumo-app-store",
      partialize: (s) => ({
        essayDraft: s.essayDraft,
        currentTheme: s.currentTheme,
        lastCorrectionResult: s.lastCorrectionResult,
        completedLessonSlugs: s.completedLessonSlugs,
        essayHistory: s.essayHistory,
        userInfo: s.userInfo,
      }),
    }
  )
);
