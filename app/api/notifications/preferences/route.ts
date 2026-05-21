import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, parseSessionToken } from "@/lib/auth";

export interface NotifPrefs {
  essayCorrected: boolean;
  weeklyTheme: boolean;
  achievements: boolean;
  streak: boolean;
  newsletter: boolean;
}

// Simple in-memory store when DB not configured (resets on server restart)
const memStore = new Map<string, NotifPrefs>();

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const user = token ? parseSessionToken(token) : null;
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const defaults: NotifPrefs = { essayCorrected: true, weeklyTheme: true, achievements: true, streak: false, newsletter: false };

  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("xxxx")) {
    // Could read from DB Notification settings — skipped for now, return defaults
  }

  return NextResponse.json({ prefs: memStore.get(user.email) ?? defaults });
}

export async function PUT(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const user = token ? parseSessionToken(token) : null;
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const body = await req.json().catch(() => ({}));
  memStore.set(user.email, body as NotifPrefs);

  return NextResponse.json({ success: true });
}

// POST /api/notifications/preferences/test — send test email
export async function POST(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const user = token ? parseSessionToken(token) : null;
  if (!user) return NextResponse.json({ error: "Não autenticado" }, { status: 401 });

  const email = user.email;

  // Use Resend if configured, otherwise just acknowledge
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey || resendKey.includes("xxxx")) {
    return NextResponse.json({
      success: false,
      message: `Email de teste seria enviado para ${email}. Configure RESEND_API_KEY no .env para ativar envios reais.`,
    });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${resendKey}` },
      body: JSON.stringify({
        from: "Rumo à Nota 1000 <noreply@rumonotamil.com>",
        to: [email],
        subject: "Notificações ativadas — Rumo à Nota 1000",
        html: `<p>Olá, ${user.name ?? "Estudante"}!</p><p>Suas notificações foram configuradas com sucesso.</p>`,
      }),
    });
    if (!res.ok) throw new Error(await res.text());
    return NextResponse.json({ success: true, message: `Email enviado para ${email}` });
  } catch (e: any) {
    return NextResponse.json({ success: false, message: `Erro ao enviar: ${e.message}` }, { status: 500 });
  }
}
