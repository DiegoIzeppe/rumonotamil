import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, createSessionToken, AUTH_COOKIE, COOKIE_MAX_AGE } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { email, password } = parsed.data;
    const { user, error } = await validateCredentials(email, password);

    if (error || !user) {
      return NextResponse.json({ error: error ?? "Credenciais inválidas." }, { status: 401 });
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
