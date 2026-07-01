import { NextRequest, NextResponse } from "next/server";
import { requireAuth, rateLimit, rateLimitResponse } from "@/lib/api-auth";
import {
  isDemoUser, getSupabaseAdmin, signDemo2FAState, parseDemo2FAState,
  DEMO_2FA_COOKIE, DEMO_2FA_COOKIE_OPTS,
} from "@/lib/auth";
import { generateTotpSecret, buildOtpauthUrl, generateQrDataUrl, generateBackupCodes, hashBackupCode } from "@/lib/totp";

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;
  const { user } = auth;

  if (!rateLimit(`2fa-setup:${user.id}`, 5, 60_000)) return rateLimitResponse();

  try {
    if (isDemoUser(user.id)) {
      // Reuse the pending (unconfirmed) TOTP secret if one already exists — regenerating it on
      // every modal open would invalidate a QR code the user already scanned into their app.
      // Backup codes are independent of the secret, so those can always be freshly regenerated.
      const existing = parseDemo2FAState(req.cookies.get(DEMO_2FA_COOKIE)?.value);
      if (existing?.enabled) {
        return NextResponse.json(
          { error: "2FA já está ativado. Desative antes de reconfigurar." },
          { status: 409 }
        );
      }
      const secret = existing ? existing.secret : generateTotpSecret(user.email).secret;
      const backupCodes = generateBackupCodes(8);
      const hashedBackupCodes = backupCodes.map(hashBackupCode);

      const otpauthUrl = buildOtpauthUrl(secret, user.email);
      const qrDataUrl = await generateQrDataUrl(otpauthUrl);
      const res = NextResponse.json({ secret, qrDataUrl, backupCodes });
      const cookieValue = signDemo2FAState({ secret, enabled: false, backupCodes: hashedBackupCodes });
      res.cookies.set(DEMO_2FA_COOKIE, cookieValue, DEMO_2FA_COOKIE_OPTS);
      return res;
    }

    const admin = getSupabaseAdmin();
    if (!admin) {
      return NextResponse.json(
        { error: "Supabase não configurado. 2FA requer SUPABASE_SERVICE_ROLE_KEY válida." },
        { status: 503 }
      );
    }

    const { data: existingData } = await admin.auth.admin.getUserById(user.id);
    const existingSecret = existingData?.user?.user_metadata?.totp_secret;
    const existingEnabled = existingData?.user?.user_metadata?.totp_enabled === true;

    if (existingEnabled) {
      return NextResponse.json(
        { error: "2FA já está ativado. Desative antes de reconfigurar." },
        { status: 409 }
      );
    }

    const secret = existingSecret ? existingSecret : generateTotpSecret(user.email).secret;
    const backupCodes = generateBackupCodes(8);
    const hashedBackupCodes = backupCodes.map(hashBackupCode);

    const otpauthUrl = buildOtpauthUrl(secret, user.email);
    const qrDataUrl = await generateQrDataUrl(otpauthUrl);

    const { error } = await admin.auth.admin.updateUserById(user.id, {
      user_metadata: { totp_secret: secret, totp_enabled: false, totp_backup_codes: hashedBackupCodes },
    });
    if (error) {
      return NextResponse.json({ error: "Erro ao salvar configuração 2FA." }, { status: 500 });
    }

    return NextResponse.json({ secret, qrDataUrl, backupCodes });
  } catch (err) {
    console.error("[2FA Setup]", err);
    return NextResponse.json({ error: "Erro interno ao configurar 2FA." }, { status: 500 });
  }
}
