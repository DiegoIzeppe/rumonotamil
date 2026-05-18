"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, EyeOff, Zap, ArrowRight, Loader2, AlertCircle, Lock, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Erro ao fazer login.");
        setLoading(false);
        return;
      }

      router.push(from);
      router.refresh();
    } catch {
      setError("Erro de conexão. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email */}
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
          Email
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
            style={{ background: "rgba(255,255,255,0.05)" }}
            className={cn(
              "w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all border",
              error
                ? "border-red-500/40"
                : "border-white/10 focus:border-blue-500/50"
            )}
            autoComplete="email"
            autoFocus
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="block text-xs font-semibold text-white/50 uppercase tracking-wider mb-2">
          Senha
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
          <input
            type={showPass ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            style={{ background: "rgba(255,255,255,0.05)" }}
            className={cn(
              "w-full pl-11 pr-12 py-3.5 rounded-xl text-sm text-white placeholder:text-white/20 outline-none transition-all border",
              error
                ? "border-red-500/40"
                : "border-white/10 focus:border-blue-500/50"
            )}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/60 transition-colors"
          >
            {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div
          className="flex items-center gap-2.5 p-3.5 rounded-xl border border-red-500/25"
          style={{ background: "rgba(239,68,68,0.08)" }}
        >
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading || !email || !password}
        className={cn(
          "w-full flex items-center justify-center gap-2.5 py-3.5 rounded-xl font-bold text-sm transition-all mt-2",
          email && password && !loading
            ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white hover:shadow-glow"
            : "bg-white/5 border border-white/8 text-white/25 cursor-not-allowed"
        )}
      >
        {loading ? (
          <><Loader2 className="w-4 h-4 animate-spin" />Entrando...</>
        ) : (
          <>Entrar na plataforma <ArrowRight className="w-4 h-4" /></>
        )}
      </button>

      {/* No register notice */}
      <p className="text-center text-xs text-white/25 pt-1">
        Acesso restrito a alunos matriculados.
        <br />Problemas para entrar?{" "}
        <a href="mailto:suporte@rumonotamil.com" className="text-blue-400/70 hover:text-blue-400 transition-colors">
          suporte@rumonotamil.com
        </a>
      </p>
    </form>
  );
}

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#070b12] bg-grid flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient glows */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 rounded-full bg-blue-500/8 blur-[100px] pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-64 h-64 rounded-full bg-cyan-500/6 blur-[80px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/25 mb-4 glow-blue-sm">
            <Zap className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-2xl font-black text-white">
            Rumo à <span className="gradient-text">Nota 1000</span>
          </h1>
          <p className="text-white/35 text-sm mt-1">Plataforma exclusiva para alunos</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 border"
          style={{
            background: "rgba(13, 19, 33, 0.92)",
            backdropFilter: "blur(20px)",
            borderColor: "rgba(255,255,255,0.09)",
          }}
        >
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Bem-vindo de volta</h2>
            <p className="text-white/40 text-sm mt-0.5">Entre com seu email e senha de acesso.</p>
          </div>

          <Suspense fallback={null}>
            <SignInForm />
          </Suspense>
        </div>

        {/* Demo credentials hint — remove in production */}
        {!process.env.NEXT_PUBLIC_SUPABASE_URL && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-4 p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5 text-center"
          >
            <p className="text-[11px] font-bold text-yellow-400/70 uppercase tracking-wider mb-1.5">Modo Demo</p>
            <p className="text-xs text-white/40">
              Email: <span className="text-white/60 font-mono">aluno@rumonotamil.com</span><br />
              Senha: <span className="text-white/60 font-mono">aluno1234</span>
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
