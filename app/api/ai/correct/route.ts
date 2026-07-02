import { NextRequest, NextResponse } from "next/server";
import { correctEssayWithClaude } from "@/lib/claude";
import { requireAuth, rateLimit, rateLimitResponse } from "@/lib/api-auth";
import { z } from "zod";

const schema = z.object({
  content: z.string().min(100, "Mínimo 100 caracteres").max(15000),
  theme: z.string().max(300).optional(),
  wasSimulado: z.boolean().optional(),
});

// Best-effort persistence — a DB write failure must never block returning the
// correction to the student. Silently no-ops when DATABASE_URL isn't configured.
async function persistEssay(input: {
  email: string;
  content: string;
  theme?: string;
  wasSimulado: boolean;
  feedback: Awaited<ReturnType<typeof correctEssayWithClaude>>;
}) {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("xxxx")) return;
  try {
    const { prisma } = await import("@/lib/prisma");
    const dbUser = await prisma.user.findUnique({ where: { email: input.email } });
    if (!dbUser) return; // user not provisioned in DB yet (e.g. demo mode)

    const wordCount = input.content.trim().split(/\s+/).filter(Boolean).length;
    const fb = input.feedback;

    await prisma.essaySubmission.create({
      data: {
        userId: dbUser.id,
        content: input.content,
        theme: input.theme,
        wordCount,
        status: "COMPLETED",
        isSimMode: input.wasSimulado,
        aiFeedback: {
          create: {
            score: fb.score,
            competency1Score: fb.competency1.score,
            competency2Score: fb.competency2.score,
            competency3Score: fb.competency3.score,
            competency4Score: fb.competency4.score,
            competency5Score: fb.competency5.score,
            c1Feedback: fb.competency1.comentarioFinal,
            c2Feedback: fb.competency2.comentarioFinal,
            c3Feedback: fb.competency3.comentarioFinal,
            c4Feedback: fb.competency4.comentarioFinal,
            c5Feedback: fb.competency5.comentarioFinal,
            generalFeedback: fb.generalFeedback,
            strengths: fb.strengths,
            weaknesses: fb.weaknesses,
            suggestions: fb.suggestions,
            paragraphNotes: fb.paragraphNotes as object,
            modelUsed: "llama-3.3-70b-versatile",
          },
        },
      },
    });

    // XP: +50 for training essays, +score for simulado essays (mirrors client-side logic)
    const xpGain = input.wasSimulado ? fb.score : 50;
    await prisma.user.update({
      where: { id: dbUser.id },
      data: { xp: { increment: xpGain } },
    });
  } catch (err) {
    console.error("[AI Correct] persist failed (non-fatal)", err);
  }
}

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

    const { content, theme, wasSimulado } = parsed.data;
    const result = await correctEssayWithClaude({ content, theme });

    // Fire-and-forget: don't make the student wait on the DB write.
    void persistEssay({ email: auth.user.email, content, theme, wasSimulado: wasSimulado ?? false, feedback: result });

    return NextResponse.json({ feedback: result });
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[AI Correct]", msg);
    return NextResponse.json({ error: "Erro interno ao corrigir redação", detail: msg }, { status: 500 });
  }
}
