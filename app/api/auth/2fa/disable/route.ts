import { NextRequest, NextResponse } from "next/server";
import { requireAuth, rateLimit, rateLimitResponse } from "@/lib/api-auth";
import { isDemoUser, getSupabaseAdmin, validateCredentials, DEMO_2FA_COOKIE } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({ password: z.string().min(1), code: z.string().optional() });

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;
  const { user } = auth;

  if (!rateLimit(`2fa-disable:${user.id}`, 5, 60_000)) return rateLimitResponse();

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Senha obrigatória." }, { status: 400 });
    }
    const { password } = parsed.data;

    // Re-authenticate with password before disabling — prevents session-hijack disable
    const { error: authError } = await validateCredentials(user.email, password);
    if (authError) {
      return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
    }

    if (isDemoUser(user.id)) {
      const res = NextResponse.json({ success: true });
      res.cookies.delete(DEMO_2FA_COOKIE);
      return res;
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json({ error: "Supabase não configurado." }, { status: 503 });
    }
    const { data } = await admin.auth.admin.getUserById(user.id);
    const { error: updateError } = await admin.auth.admin.updateUserById(user.id, {
      user_metadata: { ...data?.user?.user_metadata, totp_enabled: false, totp_secret: null, totp_backup_codes: [] },
    });
    if (updateError) {
      return NextResponse.json({ error: "Erro ao desativar 2FA." }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[2FA Disable]", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
