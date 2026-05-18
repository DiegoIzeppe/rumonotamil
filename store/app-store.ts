import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  sidebarOpen: boolean;
  setSidebarOpen: (v: boolean) => void;

  currentTheme: string;
  setCurrentTheme: (theme: string) => void;

  essayDraft: string;
  setEssayDraft: (draft: string) => void;
  clearEssayDraft: () => void;
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
    }),
    { name: "rumo-app-store", partialize: (s) => ({ essayDraft: s.essayDraft, currentTheme: s.currentTheme }) }
  )
);
