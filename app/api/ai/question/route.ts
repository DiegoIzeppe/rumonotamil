import { NextRequest, NextResponse } from "next/server";
import { evaluateQuestion } from "@/lib/claude";
import { requireAuth, rateLimit, rateLimitResponse } from "@/lib/api-auth";
import { z } from "zod";

const schema = z.object({
  question: z.string().min(10).max(1000),
  answer: z.string().min(20, "Resposta muito curta").max(5000),
  lessonTitle: z.string().max(200),
  competency: z.number().int().min(1).max(5).nullable(),
});

export async function POST(req: NextRequest) {
  const auth = requireAuth(req);
  if ("error" in auth) return auth.error;

  // 15 avaliações por minuto por usuário
  if (!rateLimit(`question:${auth.user.id}`, 15, 60_000)) return rateLimitResponse();

  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    if (!process.env.GROQ_API_KEY) {
      const { answer, competency } = parsed.data;
      const mockScore = Math.min(10, Math.max(5, Math.floor(answer.length / 30)));
      return NextResponse.json({
        score: mockScore,
        feedback: `Boa tentativa! Para nota máxima em ${competency ? `C${competency}` : "esta competência"}, detalhe mais os exemplos e use terminologia técnica adequada.`,
        strengths: ["Demonstrou entendimento básico do conceito", "Estrutura clara na resposta"],
        improvements: ["Aprofunde com exemplos mais concretos", "Use terminologia específica do ENEM"],
        correctedVersion: null,
      });
    }

    const result = await evaluateQuestion(parsed.data);
    return NextResponse.json(result);
  } catch (error) {
    console.error("[AI Question]", error);
    return NextResponse.json({ error: "Erro ao corrigir questão" }, { status: 500 });
  }
}
