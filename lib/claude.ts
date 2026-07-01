import fs from "fs";
import path from "path";
import { jsonrepair } from "jsonrepair";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

function loadPrompt(filename: string, fallback: string): string {
  try {
    return fs.readFileSync(path.join(process.cwd(), filename), "utf-8");
  } catch {
    return fallback;
  }
}

const loadCorrectionPrompt = () =>
  loadPrompt(
    "correcao-prompt.md",
    "Você é um especialista em correção de redações do ENEM. Avalie as 5 competências (C1-C5) com notas 0,40,80,120,160,200 e retorne JSON estruturado."
  );

const loadAssistantPrompt = () =>
  loadPrompt(
    "assistente-prompt.md",
    "Você é um assistente especialista em redação do ENEM. Oriente o aluno de forma didática e motivadora. Nunca escreva a redação por ele."
  );

export interface CompetencyDetail {
  analise?: string; // chain-of-thought: observações antes da nota (não exibido na UI)
  score: number;
  positivos: string[];
  negativos: string[];
  oportunidades: string[];
  comentarioFinal: string;
}

export interface EssayCorrectionOutput {
  score: number;
  competency1: CompetencyDetail;
  competency2: CompetencyDetail;
  competency3: CompetencyDetail;
  competency4: CompetencyDetail;
  competency5: CompetencyDetail;
  visaoGeral: string;
  principalForca: string;
  principalFraqueza: string;
  estrategiaEvolucao: string;
  previsaoPotencial: string;
  generalFeedback: string;
  strengths: string[];
  weaknesses: string[];
  suggestions: string[];
  paragraphNotes: Array<{ paragraph: number; note: string; type: "positive" | "warning" | "error" }>;
}

async function groqRequest(model: string, system: string, userContent: string, maxTokens: number, temperature = 0.3) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY não configurada");

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      temperature,
      messages: [
        { role: "system", content: system },
        { role: "user", content: userContent },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("Resposta vazia da IA");
  return content;
}

export async function correctEssayWithClaude(input: { content: string; theme?: string }): Promise<EssayCorrectionOutput> {
  const systemPrompt = loadCorrectionPrompt();
  const userContent = `Tema: ${input.theme || "Não especificado"}\n\nRedação:\n${input.content}\n\nRetorne APENAS o JSON estruturado conforme as instruções do system prompt. Nenhum texto fora do JSON.`;
  // temperature 0 → grading is deterministic and consistent run-to-run
  const raw = await groqRequest("llama-3.3-70b-versatile", systemPrompt, userContent, 6000, 0);

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`Resposta da IA não contém JSON válido. Raw: ${raw.slice(0, 300)}`);
  let result: EssayCorrectionOutput;
  try {
    const repaired = jsonrepair(jsonMatch[0]);
    result = JSON.parse(repaired) as EssayCorrectionOutput;
  } catch (e) {
    throw new Error(`JSON inválido da IA: ${(e as Error).message}. Raw início: ${raw.slice(0, 300)}`);
  }
  // Ensure all competency fields exist with defaults
  const emptyComp = (): typeof result.competency1 => ({
    score: 0, positivos: [], negativos: [], oportunidades: [], comentarioFinal: "",
  });
  result.competency1 = result.competency1 ?? emptyComp();
  result.competency2 = result.competency2 ?? emptyComp();
  result.competency3 = result.competency3 ?? emptyComp();
  result.competency4 = result.competency4 ?? emptyComp();
  result.competency5 = result.competency5 ?? emptyComp();
  result.strengths    = result.strengths    ?? [];
  result.weaknesses   = result.weaknesses   ?? [];
  result.suggestions  = result.suggestions  ?? [];
  result.paragraphNotes = result.paragraphNotes ?? [];

  // Force root score = exact sum of 5 competencies (model often anchors this wrong)
  result.score =
    result.competency1.score +
    result.competency2.score +
    result.competency3.score +
    result.competency4.score +
    result.competency5.score;
  return result;
}

export async function assistantChat(messages: Array<{ role: "user" | "assistant"; content: string }>): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY não configurada");

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      max_tokens: 700,
      messages: [
        { role: "system", content: loadAssistantPrompt() },
        ...messages,
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Groq API error ${res.status}: ${err.slice(0, 200)}`);
  }
  const data = await res.json();
  const content = data?.choices?.[0]?.message?.content;
  if (typeof content !== "string") throw new Error("Resposta vazia do assistente");
  return content;
}

const QUESTION_SYSTEM = `Você é um professor especialista em redação ENEM, corrigindo a resposta de um aluno a uma questão prática de uma aula.

Avalie a resposta considerando:
- Se o aluno compreendeu o conceito da aula
- Qualidade da escrita e aplicação prática
- Pontos positivos e o que pode melhorar

Retorne APENAS JSON com:
{
  "score": número de 0 a 10,
  "feedback": "parágrafo de feedback geral (3-4 frases)",
  "strengths": ["ponto positivo 1", "ponto positivo 2"],
  "improvements": ["melhoria 1", "melhoria 2"],
  "correctedVersion": "versão corrigida ou ideal da resposta (se aplicável, senão null)"
}`;

export async function evaluateQuestion(input: {
  question: string;
  answer: string;
  lessonTitle: string;
  competency: number | null;
}): Promise<{ score: number; feedback: string; strengths: string[]; improvements: string[]; correctedVersion: string | null }> {
  const userContent = `Aula: ${input.lessonTitle}\nQuestão: ${input.question}\n\nResposta do aluno:\n${input.answer}`;
  const raw = await groqRequest("llama-3.1-8b-instant", QUESTION_SYSTEM, userContent, 800, 0.3);
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error(`Resposta da IA não contém JSON. Raw: ${raw.slice(0, 200)}`);
  let parsed: Partial<{ score: number; feedback: string; strengths: string[]; improvements: string[]; correctedVersion: string | null }>;
  try {
    parsed = JSON.parse(jsonrepair(jsonMatch[0]));
  } catch (e) {
    throw new Error(`JSON inválido da IA: ${(e as Error).message}`);
  }
  const rawScore = typeof parsed.score === "number" && !isNaN(parsed.score) ? parsed.score : 5;
  return {
    score: Math.min(10, Math.max(0, Math.round(rawScore))),
    feedback: parsed.feedback ?? "Resposta avaliada.",
    strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
    correctedVersion: parsed.correctedVersion ?? null,
  };
}
