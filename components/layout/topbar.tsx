"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, Flame, Zap, Brain, Menu, X } from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { cn } from "@/lib/utils";

interface TopbarProps {
  onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { getXP, getLevel, userInfo, setUserInfo } = useAppStore();

  useEffect(() => {
    if (!userInfo) {
      fetch("/api/auth/me")
        .then((r) => r.json())
        .then((d) => { if (d.user) setUserInfo(d.user); })
        .catch(() => {});
    }
  }, []);

  const xp = getXP();
  const level = getLevel();
  const displayName = userInfo?.name ?? "Estudante";

  return (
    <header className="h-16 border-b border-white/8 flex items-center px-4 md:px-6 gap-4 sticky top-0 z-30" style={{ background: "rgba(10, 15, 28, 0.95)", backdropFilter: "blur(20px)" }}>
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="md:hidden p-2 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Search */}
      <div className="flex-1 max-w-md">
        <button
          onClick={() => setSearchOpen(true)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border border-white/5 bg-white/2 hover:bg-white/5 hover:border-blue-500/20 transition-all text-white/30 hover:text-white/60 text-sm"
        >
          <Search className="w-4 h-4 flex-shrink-0" />
          <span>Buscar aulas, redações...</span>
          <span className="ml-auto hidden md:block text-[11px] border border-white/10 rounded px-1.5 py-0.5 font-mono">⌘K</span>
        </button>
      </div>

      <div className="flex items-center gap-1 md:gap-2 ml-auto">
        {/* XP */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-500/5">
          <Zap className="w-4 h-4 text-blue-400" />
          <span className="text-sm font-semibold text-blue-300">{xp.toLocaleString("pt-BR")}</span>
          <span className="text-xs text-blue-400/60 hidden md:block">XP</span>
        </div>

        {/* AI Button */}
        <Link
          href="/correcao-ia"
          className="p-2 rounded-lg hover:bg-blue-500/10 text-white/40 hover:text-blue-400 transition-colors border border-transparent hover:border-blue-500/20"
          title="Correção IA"
        >
          <Brain className="w-5 h-5" />
        </Link>

        {/* Notifications — empty until backend sends real ones */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="relative p-2 rounded-lg hover:bg-white/5 text-white/40 hover:text-white transition-colors"
          >
            <Bell className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setNotifOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-72 glass border border-white/10 rounded-xl overflow-hidden z-50 shadow-glass"
                >
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm font-semibold text-white">Notificações</p>
                  </div>
                  <div className="px-4 py-8 text-center">
                    <Bell className="w-6 h-6 text-white/20 mx-auto mb-2" />
                    <p className="text-xs text-white/30">Nenhuma notificação</p>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <div className="flex items-center gap-2 pl-1">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            {displayName[0].toUpperCase()}
          </div>
          <div className="hidden md:block min-w-0">
            <p className="text-sm font-medium text-white truncate leading-none">{displayName.split(" ")[0]}</p>
            <p className="text-[11px] text-white/40 truncate leading-none mt-0.5">Nível {level}</p>
          </div>
        </div>
      </div>

      {/* Search modal */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
            onClick={() => setSearchOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xl glass border border-white/10 rounded-2xl overflow-hidden shadow-glass"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/5">
                <Search className="w-5 h-5 text-white/30" />
                <input
                  autoFocus
                  placeholder="Buscar aulas, redações, temas..."
                  className="flex-1 bg-transparent text-sm text-white placeholder:text-white/30 outline-none"
                />
                <button onClick={() => setSearchOpen(false)} className="text-white/30 hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-4">
                <p className="text-xs text-white/30 font-medium uppercase tracking-wider mb-3">Acesso rápido</p>
                <div className="space-y-1">
                  {[
                    { label: "Escrever redação", href: "/treinar" },
                    { label: "Correção por IA", href: "/correcao-ia" },
                    { label: "Meu desempenho", href: "/desempenho" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <div className="w-6 h-6 rounded bg-white/5 flex items-center justify-center">
                        <Search className="w-3 h-3 text-white/30" />
                      </div>
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">{item.label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
