import * as OTPAuth from "otpauth";
import QRCode from "qrcode";
import crypto from "crypto";

const ISSUER = "Rumo à Nota 1000";

export function generateTotpSecret(email: string): { secret: string; otpauthUrl: string } {
  const totp = new OTPAuth.TOTP({
    issuer: ISSUER,
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: new OTPAuth.Secret({ size: 20 }),
  });
  return { secret: totp.secret.base32, otpauthUrl: totp.toString() };
}

/** Rebuild the otpauth:// URL for an existing secret — used to re-show the same QR on modal reopen. */
export function buildOtpauthUrl(secret: string, email: string): string {
  const totp = new OTPAuth.TOTP({
    issuer: ISSUER,
    label: email,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  });
  return totp.toString();
}

export async function generateQrDataUrl(otpauthUrl: string): Promise<string> {
  return QRCode.toDataURL(otpauthUrl, { width: 240, margin: 1 });
}

export function verifyTotpCode(secret: string, code: string): boolean {
  const totp = new OTPAuth.TOTP({
    issuer: ISSUER,
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: OTPAuth.Secret.fromBase32(secret),
  });
  // window: 2 = accept codes from up to 60s before/after server time (phone clock drift tolerance)
  const delta = totp.validate({ token: code.trim(), window: 2 });
  return delta !== null;
}

export function generateBackupCodes(count = 8): string[] {
  return Array.from({ length: count }, () =>
    crypto.randomBytes(5).toString("hex").toUpperCase().match(/.{1,5}/g)!.join("-")
  );
}

export function hashBackupCode(code: string): string {
  return crypto.createHash("sha256").update(code.toUpperCase().trim()).digest("hex");
}

export function verifyBackupCode(code: string, hashedCodes: string[]): boolean {
  const hash = hashBackupCode(code);
  return hashedCodes.includes(hash);
}
