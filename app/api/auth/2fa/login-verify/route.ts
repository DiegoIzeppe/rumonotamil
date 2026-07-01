import { NextRequest, NextResponse } from "next/server";
import {
  PENDING_2FA_COOKIE, parsePending2FAToken, createSessionToken, AUTH_COOKIE, COOKIE_MAX_AGE,
  isDemoUser, getSupabaseAdmin, parseDemo2FAState, signDemo2FAState,
  DEMO_2FA_COOKIE, DEMO_2FA_COOKIE_OPTS,
} from "@/lib/auth";
import { verifyTotpCode, hashBackupCode } from "@/lib/totp";
import { rateLimit, rateLimitResponse } from "@/lib/api-auth";
import { z } from "zod";

const schema = z.object({ code: z.string().min(6).max(11) }); // 6-digit TOTP or XXXXX-XXXXX backup code

export async function POST(req: NextRequest) {
  try {
    const pendingToken = req.cookies.get(PENDING_2FA_COOKIE)?.value;
    if (!pendingToken) {
      return NextResponse.json({ error: "Sessão de login expirada. Faça login novamente." }, { status: 401 });
    }
    const user = parsePending2FAToken(pendingToken);
    if (!user) {
      return NextResponse.json({ error: "Sessão de login expirada. Faça login novamente." }, { status: 401 });
    }

    if (!rateLimit(`2fa-login:${user.id}`, 8, 60_000)) return rateLimitResponse();

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Código inválido." }, { status: 400 });
    }
    const { code } = parsed.data;
    const codeHash = hashBackupCode(code);

    let valid = false;
    let usedBackupCode = false;
    // Demo backup-code consumption is persisted to the cookie on the response below.
    let demoStateAfter: ReturnType<typeof parseDemo2FAState> = null;

    if (isDemoUser(user.id)) {
      const state = parseDemo2FAState(req.cookies.get(DEMO_2FA_COOKIE)?.value);
      if (state?.enabled) {
        if (verifyTotpCode(state.secret, code)) {
          valid = true;
        } else if (state.backupCodes.includes(codeHash)) {
          valid = true;
          usedBackupCode = true;
          demoStateAfter = { ...state, backupCodes: state.backupCodes.filter((h) => h !== codeHash) };
        }
      }
    } else {
      const admin = getSupabaseAdmin();
      if (admin) {
        const { data } = await admin.auth.admin.getUserById(user.id);
        const meta = data?.user?.user_metadata ?? {};
        const secret = meta.totp_secret;
        const backupCodes: string[] = meta.totp_backup_codes ?? [];
        if (secret) {
          if (verifyTotpCode(secret, code)) {
            valid = true;
          } else if (backupCodes.includes(codeHash)) {
            valid = true;
            usedBackupCode = true;
            // Persist consumption so the backup code can't be reused.
            await admin.auth.admin.updateUserById(user.id, {
              user_metadata: { ...meta, totp_backup_codes: backupCodes.filter((h) => h !== codeHash) },
            });
          }
        }
      }
    }

    if (!valid) {
      return NextResponse.json({ error: "Código incorreto." }, { status: 401 });
    }

    const token = createSessionToken(user);
    const res = NextResponse.json({ success: true, user, usedBackupCode });
    res.cookies.set(AUTH_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: COOKIE_MAX_AGE,
      path: "/",
    });
    // Single-use backup code: rewrite demo cookie with the used code removed.
    if (usedBackupCode && demoStateAfter) {
      res.cookies.set(DEMO_2FA_COOKIE, signDemo2FAState(demoStateAfter), DEMO_2FA_COOKIE_OPTS);
    }
    res.cookies.delete(PENDING_2FA_COOKIE);
    return res;
  } catch (err) {
    console.error("[2FA Login Verify]", err);
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}
