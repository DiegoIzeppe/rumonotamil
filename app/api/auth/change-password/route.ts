import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, parseSessionToken } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8, "Nova senha deve ter ao menos 8 caracteres"),
});

export async function POST(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const user = token ? parseSessionToken(token) : null;
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const isRealSupabase = supabaseUrl && !supabaseUrl.includes("xxxx") && supabaseUrl.startsWith("https://");

  if (isRealSupabase) {
    try {
      const { createClient } = await import("@supabase/supabase-js");
      const supabase = createClient(supabaseUrl, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

      // Sign in with current password to verify
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: parsed.data.currentPassword,
      });
      if (signInError) return NextResponse.json({ error: "Senha atual incorreta" }, { status: 400 });

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({ password: parsed.data.newPassword });
      if (updateError) return NextResponse.json({ error: updateError.message }, { status: 400 });

      return NextResponse.json({ success: true });
    } catch (e) {
      console.error("[Change Password]", e);
      return NextResponse.json({ error: "Erro interno" }, { status: 500 });
    }
  }

  // Demo mode — verify against demo users
  const DEMO_USERS: Record<string, string> = {
    "admin@rumonotamil.com": "admin1234",
    "aluno@rumonotamil.com": "aluno1234",
  };

  const expected = DEMO_USERS[user.email];
  if (!expected || expected !== parsed.data.currentPassword) {
    return NextResponse.json({ error: "Senha atual incorreta" }, { status: 400 });
  }

  // In demo mode we can't actually persist, but confirm the flow works
  return NextResponse.json({
    success: true,
    message: "Senha alterada. Em modo demo a alteração não persiste — configure Supabase para persistir.",
  });
}
