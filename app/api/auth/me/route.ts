import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, parseSessionToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  if (!token) return NextResponse.json({ user: null });
  const user = parseSessionToken(token);
  if (!user) return NextResponse.json({ user: null });
  return NextResponse.json({ user: { name: user.name ?? "Estudante", email: user.email } });
}
