import { createClient } from "@supabase/supabase-js";

// Supabase client (nullable when keys not configured)
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
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

// ── Session token (simple signed string for demo; JWT in production) ─────────
export function createSessionToken(user: AuthUser): string {
  const payload = Buffer.from(JSON.stringify({ ...user, exp: Date.now() + COOKIE_MAX_AGE * 1000 })).toString("base64");
  return payload;
}

export function parseSessionToken(token: string): AuthUser | null {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString("utf8"));
    if (payload.exp < Date.now()) return null;
    return { id: payload.id, email: payload.email, name: payload.name };
  } catch {
    return null;
  }
}
