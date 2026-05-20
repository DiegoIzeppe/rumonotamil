"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3, Users, FileText, Brain, Settings, Shield,
  ChevronRight, TrendingUp, Eye, Edit, Trash2, Plus,
  BookOpen, AlertCircle, CheckCircle2, Clock, Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const adminSections = [
  { id: "overview", label: "Visão Geral", icon: BarChart3 },
  { id: "users", label: "Usuários", icon: Users },
  { id: "lessons", label: "Aulas", icon: BookOpen },
{ id: "corrections", label: "Logs de IA", icon: Brain },
  { id: "prompts", label: "Prompts", icon: Settings },
];

const mockAdminStats = {
  totalUsers: 1247,
  activeToday: 89,
  totalCorrections: 4832,
  avgScore: 712,
  lessonViews: 9231,
  revenue: 48920,
};

const mockRecentUsers = [
  { id: "1", name: "Lucas Ferreira", email: "lucas@email.com", plan: "PRO", joinedAt: "2024-11-15", essays: 12 },
  { id: "2", name: "Maria Santos", email: "maria@email.com", plan: "ELITE", joinedAt: "2024-11-14", essays: 8 },
  { id: "3", name: "João Alves", email: "joao@email.com", plan: "BASICO", joinedAt: "2024-11-13", essays: 3 },
];

const mockPrompts = [
  { id: "p1", key: "essay_correction_v2", name: "Correção de Redação v2", version: "v2", active: true, updatedAt: "2024-11-10" },
  { id: "p2", key: "study_plan_generator", name: "Gerador de Plano de Estudos", version: "v1", active: true, updatedAt: "2024-11-05" },
  { id: "p3", key: "brainstorm_assistant", name: "Assistente de Brainstorm", version: "v1", active: false, updatedAt: "2024-10-20" },
];

export default function AdminPage() {
  const [section, setSection] = useState("overview");

  return (
    <div className="min-h-screen bg-[#080c14] bg-grid p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center">
              <Shield className="w-5 h-5 text-red-400" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-white/40">Rumo à Nota 1000 — Acesso restrito</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Sidebar nav */}
            <div className="md:col-span-1">
              <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                {adminSections.map((s) => {
                  const Icon = s.icon;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setSection(s.id)}
                      className={cn(
                        "w-full flex items-center gap-2.5 px-4 py-3 text-sm border-b border-white/5 last:border-0 transition-colors",
                        section === s.id
                          ? "text-blue-400 bg-blue-500/10"
                          : "text-white/50 hover:text-white hover:bg-white/3"
                      )}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span>{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main content */}
            <div className="md:col-span-4">
              {section === "overview" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {[
                      { label: "Total de usuários", value: mockAdminStats.totalUsers.toLocaleString("pt-BR"), icon: Users, color: "blue" },
                      { label: "Ativos hoje", value: mockAdminStats.activeToday, icon: TrendingUp, color: "green" },
                      { label: "Correções de IA", value: mockAdminStats.totalCorrections.toLocaleString("pt-BR"), icon: Brain, color: "purple" },
                      { label: "Nota média", value: mockAdminStats.avgScore, icon: BarChart3, color: "cyan" },
                      { label: "Visualizações", value: mockAdminStats.lessonViews.toLocaleString("pt-BR"), icon: Eye, color: "orange" },
                      { label: "Receita (R$)", value: `${(mockAdminStats.revenue / 100).toLocaleString("pt-BR")}`, icon: Zap, color: "yellow" },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label} className="glass rounded-xl p-4 border border-white/5">
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={cn("w-4 h-4",
                              stat.color === "blue" && "text-blue-400",
                              stat.color === "green" && "text-green-400",
                              stat.color === "purple" && "text-purple-400",
                              stat.color === "cyan" && "text-cyan-400",
                              stat.color === "orange" && "text-orange-400",
                              stat.color === "yellow" && "text-yellow-400",
                            )} />
                            <span className="text-xs text-white/40">{stat.label}</span>
                          </div>
                          <p className="text-2xl font-black text-white">{stat.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {section === "users" && (
                <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
                    <h2 className="text-sm font-semibold text-white">Usuários</h2>
                    <div className="flex items-center gap-2">
                      <input placeholder="Buscar..." className="px-3 py-1.5 text-xs glass border border-white/5 rounded-lg text-white placeholder:text-white/30 outline-none" />
                    </div>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/5">
                        {["Nome", "Email", "Plano", "Entrada", "Redações", ""].map((h) => (
                          <th key={h} className="text-left px-5 py-3 text-xs text-white/30 font-medium uppercase tracking-wider">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {mockRecentUsers.map((u) => (
                        <tr key={u.id} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                          <td className="px-5 py-3.5 text-white/80 font-medium">{u.name}</td>
                          <td className="px-5 py-3.5 text-white/50">{u.email}</td>
                          <td className="px-5 py-3.5">
                            <span className={cn("text-[11px] font-bold px-2 py-0.5 rounded",
                              u.plan === "ELITE" ? "text-yellow-400 bg-yellow-500/10" :
                              u.plan === "PRO" ? "text-blue-400 bg-blue-500/10" :
                              "text-white/40 bg-white/5"
                            )}>
                              {u.plan}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-white/40 text-xs">{u.joinedAt}</td>
                          <td className="px-5 py-3.5 text-white/60">{u.essays}</td>
                          <td className="px-5 py-3.5">
                            <button className="text-white/20 hover:text-white/60 transition-colors">
                              <Eye className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {section === "lessons" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-white">Gerenciar Aulas</h2>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/15 border border-blue-500/25 text-blue-300 text-xs font-semibold hover:bg-blue-500/25 transition-all">
                      <Plus className="w-3.5 h-3.5" />
                      Nova aula
                    </button>
                  </div>
                  <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-white/5">
                          {["Título", "Categoria", "Status", ""].map((h) => (
                            <th key={h} className="text-left px-5 py-3 text-xs text-white/30 font-medium uppercase tracking-wider">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { title: "Domínio da Norma Culta", cat: "C1", published: true },
                          { title: "Construindo repertório sociocultural", cat: "C2", published: true },
                          { title: "A arte da tese perfeita", cat: "Introdução", published: false },
                        ].map((lesson, i) => (
                          <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors">
                            <td className="px-5 py-3.5 text-white/80">{lesson.title}</td>
                            <td className="px-5 py-3.5">
                              <span className="text-xs text-blue-400 border border-blue-500/20 bg-blue-500/5 px-2 py-0.5 rounded">{lesson.cat}</span>
                            </td>
                            <td className="px-5 py-3.5">
                              {lesson.published
                                ? <span className="flex items-center gap-1 text-xs text-green-400"><CheckCircle2 className="w-3 h-3" />Publicado</span>
                                : <span className="flex items-center gap-1 text-xs text-yellow-400"><Clock className="w-3 h-3" />Rascunho</span>
                              }
                            </td>
                            <td className="px-5 py-3.5">
                              <div className="flex items-center gap-2">
                                <button className="text-white/20 hover:text-blue-400 transition-colors"><Edit className="w-4 h-4" /></button>
                                <button className="text-white/20 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}


              {section === "prompts" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-sm font-semibold text-white">Templates de Prompt</h2>
                    <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-500/15 border border-blue-500/25 text-blue-300 text-xs font-semibold hover:bg-blue-500/25 transition-all">
                      <Plus className="w-3.5 h-3.5" />
                      Novo prompt
                    </button>
                  </div>
                  <div className="space-y-3">
                    {mockPrompts.map((prompt) => (
                      <div key={prompt.id} className="glass rounded-xl border border-white/5 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-semibold text-white">{prompt.name}</p>
                              <span className="text-[10px] font-bold text-white/30 border border-white/10 rounded px-1.5 py-0.5">{prompt.version}</span>
                              {prompt.active
                                ? <span className="text-[10px] text-green-400 bg-green-500/10 border border-green-500/20 rounded px-1.5 py-0.5">Ativo</span>
                                : <span className="text-[10px] text-white/30 bg-white/5 border border-white/10 rounded px-1.5 py-0.5">Inativo</span>
                              }
                            </div>
                            <p className="text-xs text-white/30 font-mono">{prompt.key}</p>
                            <p className="text-xs text-white/30 mt-1">Atualizado em {prompt.updatedAt}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="text-white/20 hover:text-blue-400 transition-colors"><Edit className="w-4 h-4" /></button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {section === "corrections" && (
                <div className="glass rounded-2xl border border-white/5 p-6">
                  <h2 className="text-sm font-semibold text-white mb-4">Logs de Correção IA</h2>
                  <div className="space-y-2">
                    {[
                      { user: "Ana Beatriz", score: 800, model: "gpt-4o", tokens: 2847, time: "2.3s" },
                      { user: "Lucas M.", score: 720, model: "gpt-4o", tokens: 3102, time: "2.8s" },
                      { user: "Maria F.", score: 880, model: "gpt-4o", tokens: 2654, time: "2.1s" },
                    ].map((log, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/3 border border-white/5 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-white/70 flex-1">{log.user}</span>
                        <span className="text-blue-400 font-bold">{log.score} pts</span>
                        <span className="text-white/30">{log.model}</span>
                        <span className="text-white/30">{log.tokens} tok</span>
                        <span className="text-white/30">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
