import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, parseSessionToken, AuthUser } from "./auth";

export function getAuthUser(req: NextRequest): AuthUser | null {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return parseSessionToken(token);
}

export function requireAuth(req: NextRequest): { user: AuthUser } | { error: NextResponse } {
  const user = getAuthUser(req);
  if (!user) return { error: NextResponse.json({ error: "Não autorizado" }, { status: 401 }) };
  return { user };
}

// Simple in-memory rate limiter — resets per serverless cold start
// For multi-instance production: replace with Upstash Redis
const rateLimitStore = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.reset) {
    rateLimitStore.set(key, { count: 1, reset: now + windowMs });
    return true;
  }
  if (entry.count >= max) return false;
  entry.count++;
  return true;
}

export function rateLimitResponse(): NextResponse {
  return NextResponse.json(
    { error: "Muitas requisições. Aguarde antes de tentar novamente." },
    { status: 429, headers: { "Retry-After": "60" } }
  );
}

// Best-effort client IP for rate-limiting unauthenticated endpoints (login).
export function getClientIp(req: NextRequest): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
