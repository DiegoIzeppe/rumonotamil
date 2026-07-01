import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { is2FAEnabled, parseDemo2FAState, DEMO_2FA_COOKIE } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;
  const demoState = parseDemo2FAState(req.cookies.get(DEMO_2FA_COOKIE)?.value);
  const enabled = await is2FAEnabled(auth.user, demoState);
  return NextResponse.json({ enabled });
}
