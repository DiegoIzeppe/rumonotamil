import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  question: z.string().min(10),
  answer: z.string().min(20, "Resposta muito curta"),
  lessonTitle: z.string(),
  competency: z.number().nullable(),
});

const QUESTION_PROMPT = `Você é um professor especialista em redação ENEM, corrigindo a resposta de um aluno a uma questão prática de uma aula.

Avalie a resposta considerando:
- Se o aluno compreendeu o conceito da aula
- Qualidade da escrita e aplicação prática
- Pontos positivos e o que pode melhorar

Retorne um JSON com:
{
  "score": número de 0 a 10,
  "feedback": "parágrafo de feedback geral (3-4 frases)",
  "strengths": ["ponto positivo 1", "ponto positivo 2"],
  "improvements": ["melhoria 1", "melhoria 2"],
  "correctedVersion": "versão corrigida ou ideal da resposta (se aplicável)"
}`;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
    }

    const { question, answer, lessonTitle, competency } = parsed.data;

    // Se OpenAI não configurada, retorna mock inteligente
    if (!process.env.OPENAI_API_KEY) {
      const mockScore = Math.min(10, Math.max(5, Math.floor(answer.length / 30)));
      return NextResponse.json({
        score: mockScore,
        feedback: `Boa tentativa! Sua resposta demonstra compreensão inicial do conceito. Para uma nota máxima em ${competency ? `C${competency}` : "esta competência"}, é importante detalhar mais os exemplos e usar terminologia técnica adequada.`,
        strengths: [
          "Demonstrou entendimento básico do conceito",
          "Estrutura clara na resposta",
        ],
        improvements: [
          "Aprofunde com exemplos mais concretos",
          "Use terminologia específica do ENEM",
        ],
        correctedVersion: null,
      });
    }

    const { default: OpenAI } = await import("openai");
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: QUESTION_PROMPT },
        {
          role: "user",
          content: `Aula: ${lessonTitle}\nQuestão: ${question}\n\nResposta do aluno:\n${answer}`,
        },
      ],
      response_format: { type: "json_object" },
      temperature: 0.4,
      max_tokens: 1000,
    });

    const result = JSON.parse(response.choices[0].message.content ?? "{}");
    return NextResponse.json(result);
  } catch (error) {
    console.error("[AI Question]", error);
    return NextResponse.json({ error: "Erro ao corrigir questão" }, { status: 500 });
  }
}
