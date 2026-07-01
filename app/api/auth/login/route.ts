import { NextRequest, NextResponse } from "next/server";
import {
  validateCredentials, createSessionToken, AUTH_COOKIE, COOKIE_MAX_AGE,
  is2FAEnabled, createPending2FAToken, PENDING_2FA_COOKIE,
  DEMO_2FA_COOKIE, parseDemo2FAState,
} from "@/lib/auth";
import { rateLimit, rateLimitResponse, getClientIp } from "@/lib/api-auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export async function POST(req: NextRequest) {
  try {
    // Brute-force protection: cap login attempts per IP (10/min) — fails closed.
    const ip = getClientIp(req);
    if (!rateLimit(`login:${ip}`, 10, 60_000)) return rateLimitResponse();

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { email, password } = parsed.data;
    // Second bucket keyed by email so one target can't be hammered from a botnet
    // rotating IPs (still generous enough for legit retries).
    if (!rateLimit(`login-email:${email.toLowerCase()}`, 15, 60_000)) return rateLimitResponse();

    const { user, error } = await validateCredentials(email, password);

    if (error || !user) {
      return NextResponse.json({ error: error ?? "Credenciais inválidas." }, { status: 401 });
    }

    const demoState = parseDemo2FAState(req.cookies.get(DEMO_2FA_COOKIE)?.value);

    // 2FA enabled → issue short-lived pending token instead of full session
    if (await is2FAEnabled(user, demoState)) {
      const pendingToken = createPending2FAToken(user);
      const res = NextResponse.json({ success: true, requires2FA: true });
      res.cookies.set(PENDING_2FA_COOKIE, pendingToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 5,
        path: "/",
      });
      return res;
    }

    const token = createSessionToken(user);
    const res = NextResponse.json({ success: true, user });

    res.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("[Auth Login]", err);
    return NextResponse.json({ error: "Erro interno. Tente novamente." }, { status: 500 });
  }
}
