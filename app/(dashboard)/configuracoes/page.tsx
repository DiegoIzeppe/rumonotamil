"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  User, CreditCard, Shield, LogOut, RotateCcw,
  ChevronRight, Check, Camera, Lock, Trash2, Eye, EyeOff,
  Crown, Zap, AlertCircle, CheckCircle2, ShieldCheck, Copy, X,
} from "lucide-react";
import { useAppStore } from "@/store/app-store";
import { PRO_PLAN } from "@/lib/stripe";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";

const sections = [
  { id: "profile", label: "Perfil", icon: User },
  { id: "billing", label: "Assinatura", icon: CreditCard },
  { id: "security", label: "Segurança", icon: Shield },
];

// ─── Profile ──────────────────────────────────────────────────────────────────

function ProfileSection() {
  const { userInfo, setUserInfo } = useAppStore();
  const [name, setName] = useState(userInfo?.name ?? "");
  const [saving, setSaving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error("Arquivo muito grande. Máx 2MB."); return; }
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    if (!name.trim()) { toast.error("Nome não pode estar vazio"); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Erro ao salvar"); return; }
      setUserInfo({ name: data.name, email: userInfo?.email ?? "" });
      toast.success("Perfil atualizado!");
    } catch {
      toast.error("Erro de conexão.");
    } finally {
      setSaving(false);
    }
  };

  const initials = (name || userInfo?.name || "E")[0].toUpperCase();

  return (
    <div className="glass rounded-2xl border border-white/5 p-6 space-y-6">
      <h2 className="text-base font-semibold text-white">Informações do Perfil</h2>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative group">
          {avatarUrl ? (
            <img src={avatarUrl} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover" />
          ) : (
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl font-black text-white">
              {initials}
            </div>
          )}
          <button
            onClick={() => fileRef.current?.click()}
            className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
          >
            <Camera className="w-5 h-5 text-white" />
          </button>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handlePhotoChange} />
        </div>
        <div>
          <button onClick={() => fileRef.current?.click()} className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
            Alterar foto
          </button>
          <p className="text-xs text-white/30 mt-1">JPG, PNG, WebP. Máx 2MB.</p>
        </div>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-white/40 mb-1.5 font-medium">Nome completo</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Seu nome"
            className="w-full px-3 py-2.5 bg-[#080c14] border border-white/8 rounded-xl text-sm text-white outline-none focus:border-blue-500/40 transition-colors placeholder:text-white/20"
          />
        </div>
        <div>
          <label className="block text-xs text-white/40 mb-1.5 font-medium">Email</label>
          <input
            value={userInfo?.email ?? ""}
            disabled
            className="w-full px-3 py-2.5 bg-white/3 border border-white/5 rounded-xl text-sm text-white/40 outline-none cursor-not-allowed"
          />
          <p className="text-[10px] text-white/20 mt-1">Email não pode ser alterado aqui.</p>
        </div>
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:bg-white/10 disabled:text-white/30 text-white text-sm font-semibold transition-all flex items-center gap-2"
      >
        {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Check className="w-4 h-4" />}
        {saving ? "Salvando..." : "Salvar alterações"}
      </button>
    </div>
  );
}

// ─── Billing ──────────────────────────────────────────────────────────────────

function BillingSection() {
  const [loading, setLoading] = useState(false);

  const handleManage = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else toast.error(data.error ?? "Portal indisponível. Contate o suporte.");
    } catch {
      toast.error("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass rounded-2xl border border-blue-500/20 p-6 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-white">Assinatura</h2>
        <span className="flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-500/30 text-blue-300 uppercase">
          <Zap className="w-3 h-3" />
          PRO
        </span>
      </div>

      <div className="flex items-end gap-1">
        <span className="text-3xl font-black text-white">R$ 49</span>
        <span className="text-white/40 mb-1">/mês</span>
      </div>

      <div className="space-y-2">
        {([...PRO_PLAN.features]).map((f) => (
          <div key={f} className="flex items-center gap-2.5 text-sm text-white/70">
            <Check className="w-4 h-4 text-blue-400 flex-shrink-0" />
            <span>{f}</span>
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-white/5 space-y-2">
        <button
          onClick={handleManage}
          disabled={loading}
          className="flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors border border-blue-500/20 px-4 py-2 rounded-xl disabled:opacity-50"
        >
          {loading
            ? <div className="w-3.5 h-3.5 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin" />
            : <Crown className="w-3.5 h-3.5" />}
          Gerenciar assinatura no Stripe
        </button>
        <p className="text-[11px] text-white/25">Cancele, troque o plano ou atualize o pagamento pelo portal Stripe.</p>
      </div>
    </div>
  );
}

// ─── Security ─────────────────────────────────────────────────────────────────

// ─── 2FA ──────────────────────────────────────────────────────────────────────

type SetupData = { secret: string; qrDataUrl: string; backupCodes: string[] };

function TwoFactorBlock() {
  const [enabled, setEnabled] = useState<boolean | null>(null);
  const [setupOpen, setSetupOpen] = useState(false);
  const [setupData, setSetupData] = useState<SetupData | null>(null);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [disableOpen, setDisableOpen] = useState(false);
  const [disablePw, setDisablePw] = useState("");
  const [codesSaved, setCodesSaved] = useState(false);

  useEffect(() => {
    fetch("/api/auth/2fa/status")
      .then((r) => r.json())
      .then((d) => setEnabled(!!d.enabled))
      .catch(() => setEnabled(false));
  }, []);

  const startSetup = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/setup", { method: "POST" });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Erro ao iniciar configuração."); return; }
      setSetupData(data);
      setSetupOpen(true);
      setCodesSaved(false);
      setCode("");
    } catch {
      toast.error("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  const confirmSetup = async () => {
    if (code.length !== 6) { toast.error("Digite o código de 6 dígitos."); return; }
    if (!codesSaved) { toast.error("Confirme que salvou os códigos de backup."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Código inválido."); return; }
      toast.success("2FA ativado com sucesso!");
      setEnabled(true);
      setSetupOpen(false);
      setSetupData(null);
    } catch {
      toast.error("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  const handleDisable = async () => {
    if (!disablePw) { toast.error("Digite sua senha."); return; }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/2fa/disable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: disablePw }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Erro ao desativar."); return; }
      toast.success("2FA desativado.");
      setEnabled(false);
      setDisableOpen(false);
      setDisablePw("");
    } catch {
      toast.error("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  const copySecret = () => {
    if (!setupData) return;
    navigator.clipboard.writeText(setupData.secret);
    toast.success("Chave copiada!");
  };

  const copyBackupCodes = () => {
    if (!setupData) return;
    navigator.clipboard.writeText(setupData.backupCodes.join("\n"));
    toast.success("Códigos copiados!");
  };

  return (
    <div className="rounded-xl border border-white/5 overflow-hidden">
      <div className="flex items-center gap-3 p-4">
        <div className={cn(
          "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
          enabled ? "bg-green-500/15" : "bg-white/5"
        )}>
          {enabled ? <ShieldCheck className="w-4 h-4 text-green-400" /> : <Shield className="w-4 h-4 text-white/50" />}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-white/80">Autenticação em dois fatores</p>
          <p className="text-xs text-white/30 mt-0.5">
            {enabled === null ? "Carregando..." : enabled ? "Ativado — sua conta está protegida" : "Adicione uma camada extra de segurança"}
          </p>
        </div>
        {enabled === null ? null : enabled ? (
          <button
            onClick={() => setDisableOpen(true)}
            className="text-xs text-red-400/70 hover:text-red-400 border border-red-500/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            Desativar
          </button>
        ) : (
          <button
            onClick={startSetup}
            disabled={loading}
            className="text-xs text-blue-400 hover:text-blue-300 border border-blue-500/25 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Aguarde..." : "Ativar"}
          </button>
        )}
      </div>

      {/* Setup modal */}
      {setupOpen && setupData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass border border-white/10 rounded-2xl w-full max-w-md shadow-glass overflow-hidden max-h-[90vh] overflow-y-auto"
          >
            <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Configurar 2FA</h3>
              <button onClick={() => { setSetupOpen(false); setSetupData(null); }} className="text-white/30 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-5">
              <div>
                <p className="text-sm text-white/60 mb-3">
                  1. Escaneie o QR code com Google Authenticator, Authy ou similar.
                </p>
                <div className="bg-white rounded-xl p-3 flex items-center justify-center">
                  <img src={setupData.qrDataUrl} alt="QR code 2FA" className="w-48 h-48" />
                </div>
                <button
                  onClick={copySecret}
                  className="mt-2 w-full flex items-center justify-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  <Copy className="w-3 h-3" /> Ou digite manualmente: <span className="font-mono">{setupData.secret}</span>
                </button>
              </div>

              <div>
                <p className="text-sm text-white/60 mb-2">2. Guarde seus códigos de backup (use se perder o app):</p>
                <div className="grid grid-cols-2 gap-1.5 p-3 rounded-xl bg-[#080c14] border border-white/8">
                  {setupData.backupCodes.map((c) => (
                    <span key={c} className="text-xs font-mono text-white/60">{c}</span>
                  ))}
                </div>
                <button
                  onClick={copyBackupCodes}
                  className="mt-2 w-full flex items-center justify-center gap-1.5 text-xs text-blue-400/70 hover:text-blue-400 transition-colors"
                >
                  <Copy className="w-3 h-3" /> Copiar códigos
                </button>
                <label className="flex items-center gap-2 mt-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={codesSaved}
                    onChange={(e) => setCodesSaved(e.target.checked)}
                    className="w-4 h-4 rounded accent-blue-500"
                  />
                  <span className="text-xs text-white/50">Salvei meus códigos de backup em local seguro</span>
                </label>
              </div>

              <div>
                <p className="text-sm text-white/60 mb-2">3. Digite o código de 6 dígitos do app:</p>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="000000"
                  className="w-full px-3 py-3 bg-[#080c14] border border-white/8 rounded-xl text-center text-lg font-mono tracking-[0.3em] text-white outline-none focus:border-blue-500/40 transition-colors"
                  autoFocus
                />
              </div>
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={confirmSetup}
                disabled={loading || code.length !== 6 || !codesSaved}
                className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:bg-white/5 disabled:text-white/20 text-white text-sm font-semibold transition-all"
              >
                {loading ? "Ativando..." : "Confirmar e ativar"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Disable modal */}
      {disableOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="glass border border-white/10 rounded-2xl w-full max-w-sm shadow-glass overflow-hidden"
          >
            <div className="px-6 pt-6 pb-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Desativar 2FA</h3>
              <button onClick={() => { setDisableOpen(false); setDisablePw(""); }} className="text-white/30 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="px-6 py-5 space-y-3">
              <p className="text-sm text-white/50">Confirme sua senha para desativar a autenticação em dois fatores.</p>
              <input
                type="password"
                value={disablePw}
                onChange={(e) => setDisablePw(e.target.value)}
                placeholder="Sua senha"
                className="w-full px-3 py-2.5 bg-[#080c14] border border-white/8 rounded-xl text-sm text-white outline-none focus:border-blue-500/40 transition-colors"
                autoFocus
              />
            </div>
            <div className="px-6 pb-6">
              <button
                onClick={handleDisable}
                disabled={loading || !disablePw}
                className="w-full py-2.5 rounded-xl bg-red-500/90 hover:bg-red-500 disabled:bg-white/5 disabled:text-white/20 text-white text-sm font-semibold transition-all"
              >
                {loading ? "Desativando..." : "Desativar 2FA"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

function SecuritySection() {
  const [showChangePass, setShowChangePass] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const router = useRouter();

  const handleChangePassword = async () => {
    if (newPw !== confirmPw) { toast.error("Senhas não conferem."); return; }
    if (newPw.length < 8) { toast.error("Nova senha deve ter ao menos 8 caracteres."); return; }
    setSaving(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error ?? "Erro ao alterar senha."); return; }
      toast.success(data.message ?? "Senha alterada com sucesso!");
      setShowChangePass(false);
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } catch {
      toast.error("Erro de conexão.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETAR") { toast.error("Digite DELETAR para confirmar."); return; }
    setSaving(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/sign-in");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="glass rounded-2xl border border-white/5 p-6 space-y-4">
      <h2 className="text-base font-semibold text-white">Segurança</h2>

      {/* Change password */}
      <div className="rounded-xl border border-white/5 overflow-hidden">
        <button
          onClick={() => setShowChangePass(!showChangePass)}
          className="w-full flex items-center gap-3 p-4 hover:bg-white/3 transition-colors group"
        >
          <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
            <Lock className="w-4 h-4 text-white/50" />
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-white/80">Alterar senha</p>
            <p className="text-xs text-white/30 mt-0.5">Mantenha sua conta segura</p>
          </div>
          <ChevronRight className={cn("w-4 h-4 text-white/20 group-hover:text-white/50 transition-all", showChangePass && "rotate-90")} />
        </button>

        {showChangePass && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-4 pb-4 space-y-3 border-t border-white/5"
          >
            <div className="pt-3 space-y-3">
              {[
                { label: "Senha atual", value: currentPw, set: setCurrentPw, show: showCurrent, toggle: () => setShowCurrent(!showCurrent) },
                { label: "Nova senha", value: newPw, set: setNewPw, show: showNew, toggle: () => setShowNew(!showNew) },
                { label: "Confirmar nova senha", value: confirmPw, set: setConfirmPw, show: showNew, toggle: () => setShowNew(!showNew) },
              ].map((f) => (
                <div key={f.label}>
                  <label className="block text-xs text-white/40 mb-1.5">{f.label}</label>
                  <div className="relative">
                    <input
                      type={f.show ? "text" : "password"}
                      value={f.value}
                      onChange={(e) => f.set(e.target.value)}
                      className="w-full px-3 py-2.5 bg-[#080c14] border border-white/8 rounded-xl text-sm text-white outline-none focus:border-blue-500/40 transition-colors pr-10"
                    />
                    <button
                      type="button"
                      onClick={f.toggle}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50"
                    >
                      {f.show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {newPw && confirmPw && newPw !== confirmPw && (
              <p className="text-xs text-red-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> Senhas não conferem
              </p>
            )}
            {newPw && confirmPw && newPw === confirmPw && newPw.length >= 8 && (
              <p className="text-xs text-green-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Senhas conferem
              </p>
            )}
            <button
              onClick={handleChangePassword}
              disabled={saving || !currentPw || !newPw || newPw !== confirmPw}
              className="w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 disabled:bg-white/5 disabled:text-white/20 text-white text-sm font-semibold transition-all"
            >
              {saving ? "Alterando..." : "Alterar senha"}
            </button>
          </motion.div>
        )}
      </div>

      {/* 2FA */}
      <TwoFactorBlock />

      {/* Delete account */}
      <div className="pt-4 border-t border-white/5 space-y-3">
        <button
          onClick={() => setShowDelete(!showDelete)}
          className="text-sm text-red-400/70 hover:text-red-400 transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          Excluir conta permanentemente
        </button>

        {showDelete && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 space-y-3">
            <p className="text-sm text-red-300">
              Esta ação é <strong>irreversível</strong>. Todos os dados, redações e conquistas serão perdidos.
            </p>
            <div>
              <label className="block text-xs text-white/40 mb-1.5">Digite <strong className="text-red-400">DELETAR</strong> para confirmar</label>
              <input
                value={deleteConfirm}
                onChange={(e) => setDeleteConfirm(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#080c14] border border-red-500/20 rounded-xl text-sm text-white outline-none focus:border-red-500/40 transition-colors"
                placeholder="DELETAR"
              />
            </div>
            <button
              onClick={handleDeleteAccount}
              disabled={deleteConfirm !== "DELETAR" || saving}
              className="w-full py-2.5 rounded-xl bg-red-500 hover:bg-red-400 disabled:bg-white/5 disabled:text-white/20 text-white text-sm font-bold transition-all"
            >
              Excluir minha conta
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ConfiguracoesPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const { resetAllProgress } = useAppStore();
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
    toast.success("Progresso reiniciado.");
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
                onClick={signOut}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/5 transition-colors"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                Sair
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {activeSection === "profile"  && <ProfileSection />}
            {activeSection === "billing"  && <BillingSection />}
            {activeSection === "security" && <SecuritySection />}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
