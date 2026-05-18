import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() })).min(1),
});

const SYSTEM = `Você é um assistente especialista em redação do ENEM, disponível dentro de uma plataforma de estudos.

Responda de forma clara, direta e útil. Foque em:
- Técnicas específicas das 5 competências do ENEM
- Uso de repertório sociocultural
- Estrutura argumentativa
- Coesão e conectivos
- Proposta de intervenção

Seja conciso (máximo 3-4 parágrafos por resposta) e prático. Use exemplos quando útil.
Escreva em português do Brasil. Use **negrito** para termos importantes e *itálico* para exemplos.`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({
        response: "Configure OPENAI_API_KEY no arquivo .env para ativar o assistente com IA real. Por enquanto, use as perguntas rápidas disponíveis no chat.",
      });
    }

    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM },
        ...parsed.data.messages,
      ],
      temperature: 0.5,
      max_tokens: 600,
    });

    return NextResponse.json({ response: response.choices[0].message.content ?? "" });
  } catch (error) {
    console.error("[Assistant]", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
