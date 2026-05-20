import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { EssayCorrectionOutput } from "@/lib/claude";

interface LastCorrectionResult {
  feedback: EssayCorrectionOutput;
  essayText?: string;
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

  // Lesson completion — persisted so navigation doesn't reset it
  completedLessonSlugs: string[];
  markLessonComplete: (slug: string) => void;
  isLessonComplete: (slug: string) => boolean;
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
    }),
    {
      name: "rumo-app-store",
      partialize: (s) => ({
        essayDraft: s.essayDraft,
        currentTheme: s.currentTheme,
        lastCorrectionResult: s.lastCorrectionResult,
        completedLessonSlugs: s.completedLessonSlugs,
      }),
    }
  )
);
