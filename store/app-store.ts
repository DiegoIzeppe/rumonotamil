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
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      setSidebarOpen: (v) => set({ sidebarOpen: v }),

      currentTheme: "",
      setCurrentTheme: (theme) => set({ currentTheme: theme }),

      essayDraft: "",
      setEssayDraft: (draft) => set({ essayDraft: draft }),
      clearEssayDraft: () => set({ essayDraft: "" }),

      lastCorrectionResult: null,
      setLastCorrectionResult: (result) => set({ lastCorrectionResult: result }),
    }),
    {
      name: "rumo-app-store",
      partialize: (s) => ({
        essayDraft: s.essayDraft,
        currentTheme: s.currentTheme,
        lastCorrectionResult: s.lastCorrectionResult,
      }),
    }
  )
);
