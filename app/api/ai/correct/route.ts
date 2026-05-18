import { NextRequest, NextResponse } from "next/server";
import { correctEssay } from "@/lib/openai";
import { z } from "zod";

const schema = z.object({
  content: z.string().min(100, "Mínimo 100 caracteres").max(15000),
  theme: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { content, theme } = parsed.data;

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OPENAI_API_KEY não configurada. Configure no arquivo .env" },
        { status: 503 }
      );
    }

    const result = await correctEssay({ content, theme });
    return NextResponse.json({ feedback: result });
  } catch (error) {
    console.error("[AI Correct]", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
