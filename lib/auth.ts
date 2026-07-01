import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

// Supabase client (nullable when keys not configured)
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Service-role client — required to read/write other users' metadata (2FA secrets)
export function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !isRealSupabaseUrl(url)) return null;
  return createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
}

export const AUTH_COOKIE = "rn1000_session";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

const DEMO_USERS = [
  { email: "admin@rumonotamil.com", password: "admin1234", name: "Administrador" },
  { email: "aluno@rumonotamil.com", password: "aluno1234", name: "Ana Beatriz Silva" },
];

function isRealSupabaseUrl(url: string) {
  return url && !url.includes("xxxx") && url.startsWith("https://") && url.includes(".supabase.co");
}

// ── Validate credentials ─────────────────────────────────────────────────────
export async function validateCredentials(
  email: string,
  password: string
): Promise<{ user: AuthUser | null; error: string | null }> {

  // Real auth via Supabase (only when properly configured)
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  if (isRealSupabaseUrl(url)) {
    const supabase = getSupabase();
    if (supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && data.user) {
          return {
            user: {
              id: data.user.id,
              email: data.user.email!,
              name: data.user.user_metadata?.name,
            },
            error: null,
          };
        }
      } catch {
        // Supabase unreachable — fall through to demo mode
      }
    }
  }

  // Demo mode
  const found = DEMO_USERS.find(
    (u) => u.email === email.toLowerCase() && u.password === password
  );

  if (!found) return { user: null, error: "Email ou senha incorretos." };
  return { user: { id: "demo-" + found.email, email: found.email, name: found.name }, error: null };
}

// ── Session token — HMAC-SHA256 signed, tamper-proof ─────────────────────────
// SECURITY: never ship a hardcoded fallback secret to production. A public
// fallback would let anyone forge session tokens for any account. In prod we
// fail closed (throw) unless a strong SESSION_SECRET is provided. The dev
// fallback only applies when NODE_ENV !== "production".
const DEV_SESSION_SECRET = "rumo-nota-1000-dev-fallback-secret-change-in-prod!";
function getSessionSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (s && s.length >= 32 && s !== DEV_SESSION_SECRET) return s;
  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "SESSION_SECRET ausente ou fraco. Defina uma string aleatória de 32+ caracteres em produção."
    );
  }
  return DEV_SESSION_SECRET;
}

export function createSessionToken(user: AuthUser): string {
  const payload = Buffer.from(
    JSON.stringify({ id: user.id, email: user.email, name: user.name, exp: Date.now() + COOKIE_MAX_AGE * 1000 })
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function parseSessionToken(token: string): AuthUser | null {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return null;
    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expected = crypto.createHmac("sha256", getSessionSecret()).update(payload).digest("base64url");
    // Timing-safe comparison prevents timing attacks
    if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (data.exp < Date.now()) return null;
    return { id: data.id, email: data.email, name: data.name };
  } catch {
    return null;
  }
}

// ── Pending-2FA token — short-lived, issued after password check, before TOTP verified ──
export const PENDING_2FA_COOKIE = "rn1000_pending_2fa";
const PENDING_2FA_MAX_AGE = 60 * 5; // 5 minutes to enter the code

export function createPending2FAToken(user: AuthUser): string {
  const payload = Buffer.from(
    JSON.stringify({ id: user.id, email: user.email, name: user.name, exp: Date.now() + PENDING_2FA_MAX_AGE * 1000 })
  ).toString("base64url");
  const sig = crypto.createHmac("sha256", getSessionSecret()).update("pending2fa:" + payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function parsePending2FAToken(token: string): AuthUser | null {
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return null;
    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expected = crypto.createHmac("sha256", getSessionSecret()).update("pending2fa:" + payload).digest("base64url");
    if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (data.exp < Date.now()) return null;
    return { id: data.id, email: data.email, name: data.name };
  } catch {
    return null;
  }
}

export function isDemoUser(userId: string): boolean {
  return userId.startsWith("demo-");
}

// ── Demo-mode 2FA — no real DB available, so state is persisted in a signed,
// httpOnly cookie scoped to the browser instead of server memory (which doesn't
// survive Next.js dev-mode module reloads or serverless cold starts). ──────────
export const DEMO_2FA_COOKIE = "rn1000_demo_2fa";
const DEMO_2FA_MAX_AGE = 60 * 60 * 24 * 365; // 1 year — represents account configuration, not a session

export interface Demo2FAState {
  secret: string;
  enabled: boolean;
  backupCodes: string[]; // hashed
}

export function signDemo2FAState(state: Demo2FAState): string {
  const payload = Buffer.from(JSON.stringify(state)).toString("base64url");
  const sig = crypto.createHmac("sha256", getSessionSecret()).update("demo2fa:" + payload).digest("base64url");
  return `${payload}.${sig}`;
}

export function parseDemo2FAState(token: string | undefined): Demo2FAState | null {
  if (!token) return null;
  try {
    const dot = token.lastIndexOf(".");
    if (dot === -1) return null;
    const payload = token.slice(0, dot);
    const sig = token.slice(dot + 1);
    const expected = crypto.createHmac("sha256", getSessionSecret()).update("demo2fa:" + payload).digest("base64url");
    if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return null;
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

export const DEMO_2FA_COOKIE_OPTS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: DEMO_2FA_MAX_AGE,
  path: "/",
};

// ── 2FA status check (used by login route) ───────────────────────────────────
export async function is2FAEnabled(user: AuthUser, demoState?: Demo2FAState | null): Promise<boolean> {
  if (isDemoUser(user.id)) {
    return demoState?.enabled ?? false;
  }
  const admin = getSupabaseAdmin();
  if (!admin) return false;
  try {
    const { data, error } = await admin.auth.admin.getUserById(user.id);
    if (error || !data.user) return false;
    return data.user.user_metadata?.totp_enabled === true;
  } catch {
    return false;
  }
}
