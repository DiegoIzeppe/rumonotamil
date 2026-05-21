"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  User, Bell, CreditCard, Shield, Smartphone, LogOut, RotateCcw,
  ChevronRight, Check, ExternalLink, Star, Zap, Crown,
} from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { PLANS } from "@/lib/stripe";
import { cn } from "@/lib/utils";

const sections = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "notifications", label: "Notificações", icon: Bell },
  { id: "billing", label: "Assinatura", icon: CreditCard },
  { id: "security", label: "Segurança", icon: Shield },
];

export default function ConfiguracoesPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [notifications, setNotifications] = useState({
    essayCorrected: true,
    weeklyTheme: true,
    achievements: true,
    streak: false,
    newsletter: false,
  });
  const { userInfo, resetAllProgress } = useAppStore();
  const router = useRouter();
  const [confirmReset, setConfirmReset] = useState(false);

  const signOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/sign-in");
    router.refresh();
  };

  const handleReset = () => {
    if (!confirmReset) { setConfirmReset(true); return; }
    resetAllProgress();
    setConfirmReset(false);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white">Configurações</h1>
          <p className="text-white/40 text-sm mt-1">Gerencie sua conta e preferências.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Nav sidebar */}
          <div className="md:col-span-1">
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              {sections.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.id}
                    onClick={() => setActiveSection(s.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors border-b border-white/5 last:border-0",
                      activeSection === s.id
                        ? "text-blue-400 bg-blue-500/10"
                        : "text-white/50 hover:text-white hover:bg-white/3"
                    )}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    {s.label}
                  </button>
                );
              })}
              <button
                onClick={handleReset}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-orange-400/70 hover:text-orange-400 hover:bg-orange-500/5 transition-colors border-t border-white/5"
              >
                <RotateCcw className="w-4 h-4 flex-shrink-0" />
                {confirmReset ? "Confirmar reset?" : "Reiniciar progresso"}
              </button>
              <button
                onClick={() => signOut()}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-colors"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                Sair
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {activeSection === "profile" && (
              <div className="glass rounded-2xl border border-white/5 p-6 space-y-6">
                <h2 className="text-base font-semibold text-white">Informações do Perfil</h2>
                {/* Avatar */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-black text-white">
                    {(userInfo?.name ?? "E")[0].toUpperCase()}
                  </div>
                  <div>
                    <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Alterar foto</button>
                    <p className="text-xs text-white/30 mt-1">JPG, PNG. Máx 2MB.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Nome completo", value: userInfo?.name ?? "—" },
                    { label: "Email", value: userInfo?.email ?? "—" },
                  ].map((field) => (
                    <div key={field.label}>
                      <label className="block text-xs text-white/40 mb-1.5 font-medium">{field.label}</label>
                      <input
                        defaultValue={field.value}
                        className="w-full px-3 py-2.5 glass border border-white/5 rounded-xl text-sm text-white outline-none focus:border-blue-500/30 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <button className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all">
                  Salvar alterações
                </button>
              </div>
            )}

            {activeSection === "notifications" && (
              <div className="glass rounded-2xl border border-white/5 p-6 space-y-4">
                <h2 className="text-base font-semibold text-white">Notificações</h2>
                {[
                  { key: "essayCorrected", label: "Redação corrigida", desc: "Quando a IA terminar a correção" },
                  { key: "weeklyTheme", label: "Novo tema semanal", desc: "Toda segunda-feira" },
                  { key: "achievements", label: "Conquistas desbloqueadas", desc: "Quando ganhar um badge" },
                  { key: "streak", label: "Lembrete de streak", desc: "Aviso antes de perder o streak" },
                  { key: "newsletter", label: "Newsletter mensal", desc: "Dicas e conteúdos extras" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-white/3 border border-white/5">
                    <div>
                      <p className="text-sm font-medium text-white">{item.label}</p>
                      <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => setNotifications((prev) => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                      className={cn(
                        "w-10 h-6 rounded-full transition-all relative",
                        notifications[item.key as keyof typeof notifications] ? "bg-blue-500" : "bg-white/10"
                      )}
                    >
                      <span className={cn(
                        "absolute top-1 w-4 h-4 bg-white rounded-full transition-all",
                        notifications[item.key as keyof typeof notifications] ? "left-5" : "left-1"
                      )} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeSection === "billing" && (
              <div className="space-y-4">
                {/* Current plan */}
                <div className="glass rounded-2xl border border-blue-500/20 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-base font-semibold text-white">Plano Atual</h2>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-300 uppercase">
                      FREE
                    </span>
                  </div>
                  <div className="flex items-end gap-1 mb-4">
                    <span className="text-3xl font-black text-white">R$ 97,90</span>
                    <span className="text-white/40 mb-1">/mês</span>
                  </div>
                  <div className="space-y-2 mb-5">
                    {PLANS.PRO.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-white/60">
                        <Check className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors border border-blue-500/20 px-4 py-2 rounded-xl">
                    <ExternalLink className="w-4 h-4" />
                    Gerenciar no Stripe
                  </button>
                </div>

                {/* Upgrade to Elite */}
                <div className="glass rounded-2xl border border-yellow-500/20 bg-yellow-500/3 p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <h3 className="text-base font-bold text-white">Upgrade para Elite</h3>
                  </div>
                  <p className="text-sm text-white/60 mb-4">
                    Acesso a mentoria em grupo, garantia de nota 900+ e suporte prioritário.
                  </p>
                  <div className="space-y-1.5 mb-5">
                    {PLANS.PRO.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 text-sm text-white/60">
                        <Star className="w-3.5 h-3.5 text-yellow-400 flex-shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-400 text-white font-bold text-sm hover:shadow-[0_0_20px_rgba(251,191,36,0.3)] transition-all">
                    Fazer upgrade — R$ 197,90/mês
                  </button>
                </div>
              </div>
            )}

            {activeSection === "security" && (
              <div className="glass rounded-2xl border border-white/5 p-6 space-y-4">
                <h2 className="text-base font-semibold text-white">Segurança</h2>
                <div className="space-y-3">
                  {[
                    { label: "Alterar senha", desc: "Requer verificação por email", icon: Shield },
                    { label: "Autenticação em dois fatores", desc: "Adicione uma camada extra de segurança", icon: Smartphone },
                    { label: "Sessões ativas", desc: "Veja e revogue sessões abertas", icon: Smartphone },
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.label}
                        className="w-full flex items-center gap-3 p-4 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/3 transition-all group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-white/50" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-white/80">{item.label}</p>
                          <p className="text-xs text-white/30 mt-0.5">{item.desc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" />
                      </button>
                    );
                  })}
                </div>
                <div className="pt-4 border-t border-white/5">
                  <button className="text-sm text-red-400/70 hover:text-red-400 transition-colors">
                    Excluir conta permanentemente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
