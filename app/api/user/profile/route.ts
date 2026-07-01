import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, COOKIE_MAX_AGE, parseSessionToken, createSessionToken } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Nome deve ter ao menos 2 caracteres").max(60),
});

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const user = token ? parseSessionToken(token) : null;
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

  // Update in DB if available
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("xxxx")) {
    try {
      const { prisma } = await import("@/lib/prisma");
      await prisma.user.updateMany({ where: { email: user.email }, data: { name: parsed.data.name } });
    } catch (e) {
      console.error("[Profile PUT]", e);
    }
  }

  // Return updated session token so client can refresh userInfo
  const newToken = createSessionToken({ ...user, name: parsed.data.name });
  const res = NextResponse.json({ success: true, name: parsed.data.name });
  res.cookies.set(AUTH_COOKIE, newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
