import OpenAI from "openai";

let _client: OpenAI | null = null;

function getClient(): OpenAI {
  if (!_client) {
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "placeholder" });
  }
  return _client;
}

export const CORRECTION_PROMPT = `Você é um avaliador especialista em redações do ENEM com mais de 20 anos de experiência.
Você conhece profundamente os critérios de avaliação das 5 competências do ENEM e aplica a grade de correção oficial.

## Competências ENEM:
- **C1**: Domínio da modalidade escrita formal da Língua Portuguesa (0-200)
- **C2**: Compreensão da proposta e desenvolvimento do tema usando repertório sociocultural (0-200)
- **C3**: Seleção, relação, organização e interpretação de informações, fatos, opiniões e argumentos (0-200)
- **C4**: Conhecimento dos mecanismos linguísticos para a argumentação (0-200)
- **C5**: Elaboração de proposta de intervenção que respeite os direitos humanos (0-200)

## Critérios de pontuação:
- 0: Fuga total ao tema / em branco / não atende ao tipo textual
- 40: Muito precário
- 80: Precário
- 120: Médio
- 160: Bom
- 200: Excelente

## Sua tarefa:
Analise a redação fornecida e retorne um JSON estruturado com a avaliação completa.`;

export interface EssayCorrectionInput {
  content: string;
  theme?: string;
}

export interface EssayCorrectionOutput {
  score: number;
  competency1: { score: number; feedback: string };
  competency2: { score: number; feedback: string };
  competency3: { score: number; feedback: string };
  competency4: { score: number; feedback: string };
  competency5: { score: number; feedback: string };
  generalFeedback: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  paragraphNotes: Array<{ paragraph: number; note: string; type: "positive" | "warning" | "error" }>;
  rewriteSuggestion?: string;
}

export async function correctEssay(input: EssayCorrectionInput): Promise<EssayCorrectionOutput> {
  const openai = getClient();

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: CORRECTION_PROMPT },
      {
        role: "user",
        content: `Tema da redação: ${input.theme || "Não especificado"}\n\nRedação:\n${input.content}\n\nRetorne APENAS um JSON válido com a estrutura de avaliação completa.`,
      },
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
    max_tokens: 4000,
  });

  const raw = response.choices[0].message.content;
  if (!raw) throw new Error("Empty AI response");
  return JSON.parse(raw) as EssayCorrectionOutput;
}
