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
  hour: number; // 0-23, for Madrugador/Noturno achievements
  feedback: EssayCorrectionOutput;
  wasSimulado?: boolean;
  usedAssistant?: boolean;
  previousScore?: number; // for improvement tracking
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function updateStreak(state: { currentStreak: number; maxStreak: number; lastActivityDate: string }) {
  const today = todayStr();
  if (state.lastActivityDate === today) return {}; // same day, no change
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yStr = yesterday.toISOString().slice(0, 10);
  const newStreak = state.lastActivityDate === yStr ? state.currentStreak + 1 : 1;
  return {
    currentStreak: newStreak,
    maxStreak: Math.max(newStreak, state.maxStreak),
    lastActivityDate: today,
  };
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

  // XP: lessons give 50 XP each
  getXP: () => number;
  getLevel: () => number;

  // Streak tracking
  currentStreak: number;
  maxStreak: number;
  lastActivityDate: string; // YYYY-MM-DD

  // Essay history
  essayHistory: EssayHistoryEntry[];
  addEssayToHistory: (entry: Omit<EssayHistoryEntry, "id" | "date" | "hour">) => void;

  // Auth user info
  userInfo: { name: string; email: string } | null;
  setUserInfo: (info: { name: string; email: string } | null) => void;

  // Study profile — collected via onboarding questionnaire
  studyProfile: StudyProfile | null;
  setStudyProfile: (p: StudyProfile) => void;

  // Study plan tasks — persisted so they survive navigation
  studyPlanTasks: StudyTask[];
  setStudyPlanTasks: (tasks: StudyTask[]) => void;
  toggleStudyTask: (id: string) => void;

  // Reset all progress (aulas + essays + streak)
  resetAllProgress: () => void;
}

export interface StudyProfile {
  urgency: "less1m" | "1-3m" | "3-6m" | "6m+";
  hoursPerDay: 1 | 2 | 3 | 5;
  targetScore: 700 | 800 | 900 | 1000;
  level: "iniciante" | "intermediario" | "avancado";
  weakCompetencies: number[]; // 1-5, only used if no essay history
}

export interface StudyTask {
  id: string;
  title: string;
  type: "LESSON" | "ESSAY" | "REVIEW" | "PRACTICE";
  completed: boolean;
  dueDate?: string;
  competency?: number;
  slug?: string;
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
        set((s) => {
          if (s.completedLessonSlugs.includes(slug)) return s;
          return {
            completedLessonSlugs: [...s.completedLessonSlugs, slug],
            ...updateStreak(s),
          };
        }),
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

      currentStreak: 0,
      maxStreak: 0,
      lastActivityDate: "",

      essayHistory: [],
      addEssayToHistory: (entry) =>
        set((s) => {
          const prev = s.essayHistory[0]?.score;
          return {
            essayHistory: [
              {
                ...entry,
                id: `essay-${Date.now()}`,
                date: new Date().toISOString(),
                hour: new Date().getHours(),
                previousScore: prev,
              },
              ...s.essayHistory,
            ].slice(0, 100),
            ...updateStreak(s),
          };
        }),

      userInfo: null,
      setUserInfo: (info) => set({ userInfo: info }),

      studyProfile: null,
      setStudyProfile: (p) => set({ studyProfile: p }),

      studyPlanTasks: [],
      setStudyPlanTasks: (tasks) => set({ studyPlanTasks: tasks }),
      toggleStudyTask: (id) =>
        set((s) => ({
          studyPlanTasks: s.studyPlanTasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        })),

      resetAllProgress: () =>
        set({
          completedLessonSlugs: [],
          essayHistory: [],
          currentStreak: 0,
          maxStreak: 0,
          lastActivityDate: "",
          lastCorrectionResult: null,
          essayDraft: "",
          studyProfile: null,
          studyPlanTasks: [],
        }),
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
        currentStreak: s.currentStreak,
        maxStreak: s.maxStreak,
        lastActivityDate: s.lastActivityDate,
        studyProfile: s.studyProfile,
        studyPlanTasks: s.studyPlanTasks,
      }),
    }
  )
);
