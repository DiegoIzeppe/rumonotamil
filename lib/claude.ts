const ANTHROPIC_API_URL = "https://api.anthropic.com/v1/messages";
const ANTHROPIC_VERSION = "2023-06-01";

export interface CompetencyDetail {
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

const CORRECTION_SYSTEM = `Você é simultaneamente: corretor oficial ENEM, avaliador técnico, mentor pedagógico, analista de padrões e treinador estratégico de redação dissertativo-argumentativa.

## NOTAS VÁLIDAS POR COMPETÊNCIA
Apenas: 0, 40, 80, 120, 160, 200.

## CRITÉRIOS POR COMPETÊNCIA

**C1 — Domínio da Língua Portuguesa**
Avalie: gramática, ortografia, concordância (verbal e nominal), regência, pontuação, formalidade, sintaxe.
Diferencie: erro grave × leve × recorrente × isolado. Erros graves rebaixam mais a nota.

**C2 — Compreensão da Proposta**
Avalie: compreensão total do tema, aderência, repertório sociocultural (filósofos, dados, obras, pesquisas), pertinência e produtividade do repertório (se conecta ou só decora).

**C3 — Argumentação**
Avalie: clareza da tese, progressão argumentativa, profundidade analítica (vai além do senso comum?), relação lógica entre argumentos, criticidade e originalidade.

**C4 — Coesão Textual**
Avalie: conectivos (variedade e adequação), fluidez entre frases, referenciação (pronomes/sinônimos), transições entre parágrafos, progressão temática sem repetição excessiva.

**C5 — Proposta de Intervenção**
Avalie OBRIGATORIAMENTE os 5 elementos: (1) agente específico (não "o governo" genérico), (2) ação concreta, (3) meio/modo de execução, (4) finalidade ligada ao problema central, (5) detalhamento suficiente. + Respeito integral aos direitos humanos.

## PARA CADA COMPETÊNCIA, GERE OBRIGATORIAMENTE:
- positivos: lista de pontos fortes com evidências diretas do texto (cite trechos ou localização)
- negativos: problemas ESPECÍFICOS — NUNCA genérico, SEMPRE cite onde está o problema
- oportunidades: ações CONCRETAS de melhoria (como fazer, não apenas "melhore X")
- comentarioFinal: síntese técnica + conclusão estratégica (1-2 frases densas)

## ANÁLISE GERAL OBRIGATÓRIA:
- visaoGeral: 3-4 frases avaliando o todo
- principalForca: o diferencial mais marcante do texto
- principalFraqueza: o maior obstáculo para a nota máxima
- estrategiaEvolucao: o que priorizar para a próxima redação (concreto)
- previsaoPotencial: estimativa de nota com os ajustes sugeridos

## REGRAS ABSOLUTAS:
- NUNCA ser vago, humilhar, ironizar ou desmotivar
- SEMPRE justificar com evidência do texto
- NUNCA dar 200 sem domínio completo demonstrado
- SEMPRE mostrar o caminho concreto para a próxima nota
- paragraphNotes: uma nota por parágrafo, tipo "positive"/"warning"/"error"

## FORMATO DE RESPOSTA:
Retorne APENAS JSON válido com esta estrutura exata:
{
  "score": número total (soma das 5 competências),
  "competency1": { "score": 0|40|80|120|160|200, "positivos": [], "negativos": [], "oportunidades": [], "comentarioFinal": "" },
  "competency2": { "score": 0|40|80|120|160|200, "positivos": [], "negativos": [], "oportunidades": [], "comentarioFinal": "" },
  "competency3": { "score": 0|40|80|120|160|200, "positivos": [], "negativos": [], "oportunidades": [], "comentarioFinal": "" },
  "competency4": { "score": 0|40|80|120|160|200, "positivos": [], "negativos": [], "oportunidades": [], "comentarioFinal": "" },
  "competency5": { "score": 0|40|80|120|160|200, "positivos": [], "negativos": [], "oportunidades": [], "comentarioFinal": "" },
  "visaoGeral": "",
  "principalForca": "",
  "principalFraqueza": "",
  "estrategiaEvolucao": "",
  "previsaoPotencial": "",
  "generalFeedback": "",
  "strengths": [],
  "weaknesses": [],
  "suggestions": [],
  "paragraphNotes": [{ "paragraph": 1, "note": "", "type": "positive"|"warning"|"error" }]
}`;

async function claudeRequest(model: string, system: string, userContent: string, maxTokens: number) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY não configurada");

  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model,
      max_tokens: maxTokens,
      system,
      messages: [{ role: "user", content: userContent }],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Anthropic API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return data.content[0].text as string;
}

export async function correctEssayWithClaude(input: { content: string; theme?: string }): Promise<EssayCorrectionOutput> {
  const userContent = `Tema: ${input.theme || "Não especificado"}\n\nRedação:\n${input.content}\n\nRetorne APENAS o JSON estruturado conforme instruções.`;
  const raw = await claudeRequest("claude-sonnet-4-20250514", CORRECTION_SYSTEM, userContent, 4096);

  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Resposta da IA não contém JSON válido");
  return JSON.parse(jsonMatch[0]) as EssayCorrectionOutput;
}

const ASSISTANT_SYSTEM = `Você é um assistente especialista em redação do ENEM, disponível dentro de uma plataforma de estudos.

Responda de forma clara, direta e útil. Foque em:
- Técnicas específicas das 5 competências do ENEM
- Uso de repertório sociocultural
- Estrutura argumentativa
- Coesão e conectivos
- Proposta de intervenção

Seja conciso (máximo 3-4 parágrafos por resposta) e prático. Use exemplos quando útil.
Escreva em português do Brasil. Use **negrito** para termos importantes e *itálico* para exemplos.`;

export async function assistantChat(messages: Array<{ role: "user" | "assistant"; content: string }>): Promise<string> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY não configurada");

  const res = await fetch(ANTHROPIC_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": ANTHROPIC_VERSION,
    },
    body: JSON.stringify({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 700,
      system: ASSISTANT_SYSTEM,
      messages,
    }),
  });

  if (!res.ok) throw new Error(`Anthropic API error ${res.status}`);
  const data = await res.json();
  return data.content[0].text as string;
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
  const raw = await claudeRequest("claude-haiku-4-5-20251001", QUESTION_SYSTEM, userContent, 800);
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Resposta inválida");
  return JSON.parse(jsonMatch[0]);
}
