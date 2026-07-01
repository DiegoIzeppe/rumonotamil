import { NextRequest, NextResponse } from "next/server";
import { requireAuth, rateLimit, rateLimitResponse } from "@/lib/api-auth";
import {
  isDemoUser, getSupabaseAdmin, parseDemo2FAState, signDemo2FAState,
  DEMO_2FA_COOKIE, DEMO_2FA_COOKIE_OPTS,
} from "@/lib/auth";
import { verifyTotpCode } from "@/lib/totp";
import { z } from "zod";

const schema = z.object({ code: z.string().min(6).max(6) });

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;
  const { user } = auth;

  if (!rateLimit(`2fa-verify:${user.id}`, 10, 60_000)) return rateLimitResponse();

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Código deve ter 6 dígitos." }, { status: 400 });
    }
    const { code } = parsed.data;

    if (isDemoUser(user.id)) {
      const state = parseDemo2FAState(req.cookies.get(DEMO_2FA_COOKIE)?.value);
      if (!state) return NextResponse.json({ error: "Configure o 2FA primeiro." }, { status: 400 });
      if (!verifyTotpCode(state.secret, code)) {
        return NextResponse.json({ error: "Código inválido." }, { status: 400 });
      }
      const res = NextResponse.json({ success: true });
      res.cookies.set(DEMO_2FA_COOKIE, signDemo2FAState({ ...state, enabled: true }), DEMO_2FA_COOKIE_OPTS);
      return res;
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Supabase não configurado." }, { status: 503 });
    }
    const { data, error: getError } = await admin.auth.admin.getUserById(user.id);
    if (getError || !data.user) {
      return NextResponse.json({ error: "Usuário não encontrado." }, { status: 404 });
    }
    const secret = data.user.user_metadata?.totp_secret;
    if (!secret) {
      return NextResponse.json({ error: "Configure o 2FA primeiro." }, { status: 400 });
    }
    if (!verifyTotpCode(secret, code)) {
      return NextResponse.json({ error: "Código inválido." }, { status: 400 });
    }
    const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
      user_metadata: { ...data.user.user_metadata, totp_enabled: true },
    });
    if (updateError) {
      return NextResponse.json({ error: "Erro ao ativar 2FA." }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[2FA Verify]", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
