import { NextResponse } from "next/server";
import { AUTH_COOKIE, PENDING_2FA_COOKIE } from "@/lib/auth";

export async function POST() {
  const res = NextResponse.json({ success: true });
  res.cookies.set(AUTH_COOKIE, "", { maxAge: 0, path: "/" });
  res.cookies.set(PENDING_2FA_COOKIE, "", { maxAge: 0, path: "/" });
  return res;
}
