import { NextRequest, NextResponse } from "next/server";
import { correctEssayWithClaude } from "@/lib/claude";
import { requireAuth, rateLimit, rateLimitResponse } from "@/lib/api-auth";
import { z } from "zod";

const schema = z.object({
  content: z.string().min(100, "Mínimo 100 caracteres").max(15000),
  theme: z.string().max(300).optional(),
});

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  // 5 correções por minuto por usuário
  if (!rateLimit(`correct:${auth.user.id}`, 5, 60_000)) return rateLimitResponse();

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY não configurada." },
        { status: 503 }
      );
    }

    const { content, theme } = parsed.data;
    const result = await correctEssayWithClaude({ content, theme });
    return NextResponse.json({ feedback: result });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[AI Correct]", msg);
    return NextResponse.json({ error: "Erro interno ao corrigir redação", detail: msg }, { status: 500 });
  }
}
