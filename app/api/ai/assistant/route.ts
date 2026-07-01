import { NextRequest, NextResponse } from "next/server";
import { assistantChat } from "@/lib/claude";
import { requireAuth, rateLimit, rateLimitResponse } from "@/lib/api-auth";
import { z } from "zod";

const schema = z.object({
  messages: z.array(
    z.object({ role: z.enum(["user", "assistant"]), content: z.string().max(4000) })
  ).min(1).max(20),
});

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  // 20 mensagens por minuto por usuário
  if (!rateLimit(`assistant:${auth.user.id}`, 20, 60_000)) return rateLimitResponse();

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({
        response: "Configure GROQ_API_KEY no arquivo .env para ativar o assistente.",
      });
    }

    const text = await assistantChat(parsed.data.messages);
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("[Assistant]", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
