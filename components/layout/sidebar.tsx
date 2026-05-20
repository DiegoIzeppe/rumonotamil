"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  PenLine,
  Brain,
  BarChart3,
  CalendarDays,
  Trophy,
  Settings,
  Zap,
  X,
  ChevronRight,
  Timer,
  BookMarked,
} from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/aulas", label: "Método", icon: BookOpen },
{ href: "/treinar", label: "Treinar Redação", icon: PenLine },
  { href: "/simulado", label: "Simulado ENEM", icon: Timer },
  { href: "/correcao-ia", label: "Correção IA", icon: Brain },
  { href: "/repertorios", label: "Repertórios", icon: BookMarked },
  { href: "/desempenho", label: "Desempenho", icon: BarChart3 },
  { href: "/plano-de-estudos", label: "Plano de Estudos", icon: CalendarDays },
  { href: "/ranking", label: "Ranking", icon: Trophy },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

interface SidebarProps {
  mobile?: boolean;
  onClose?: () => void;
}

export function Sidebar({ mobile = false, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        mobile
          ? "w-full"
          : "w-64 fixed left-0 top-0 bottom-0 z-40"
      )}
    >
      {/* Background */}
      <div className="absolute inset-0 border-r border-white/8" style={{ background: "rgba(10, 15, 28, 0.95)", backdropFilter: "blur(20px)" }} />

      {/* Content */}
      <div className="relative flex flex-col h-full p-4">
        {/* Logo */}
        <div className="flex items-center justify-between mb-8 px-2">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-500/30 flex items-center justify-center glow-blue-sm">
              <Zap className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-none">Rumo à</p>
              <p className="text-xs font-black gradient-text leading-none">Nota 1000</p>
            </div>
          </Link>
          {mobile && (
            <button onClick={onClose} className="p-1 rounded-lg hover:bg-white/5 text-white/50 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={mobile ? onClose : undefined}
                className={cn(
                  "group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative",
                  isActive
                    ? "text-white bg-blue-500/15 border border-blue-500/20"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-lg bg-blue-500/10 border border-blue-500/20" />
                )}
                <Icon
                  className={cn(
                    "w-4 h-4 relative z-10 flex-shrink-0 transition-colors",
                    isActive ? "text-blue-400" : "text-white/40 group-hover:text-white/70"
                  )}
                />
                <span className="relative z-10 truncate">{item.label}</span>
                {isActive && (
                  <ChevronRight className="w-3 h-3 relative z-10 ml-auto text-blue-400/60" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="mt-4 pt-4 border-t border-white/5">
          <div className="px-3 py-2.5 rounded-lg glass-blue">
            <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold mb-1">Tema da Semana</p>
            <p className="text-xs text-white/70 leading-snug line-clamp-2">
              Crise da Saúde Mental na Era Digital
            </p>
            <Link
              href="/treinar"
              className="mt-2 flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              Escrever agora <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
