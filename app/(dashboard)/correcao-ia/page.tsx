"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
} from "recharts";
import {
  Brain, CheckCircle2, AlertCircle, TrendingUp, Download,
  ChevronDown, Sparkles, RotateCcw, FileText, Star, ArrowRight,
  PenLine, Target, Clock, Hash, AlignLeft, Lightbulb, Send,
} from "lucide-react";
import { cn, getScoreColor, getScoreLabel, getCompetencyLabel } from "@/lib/utils";

const MOCK_EXAMPLES = [
  {
    label: "Exemplo 1 — Desinformação",
    score: 800,
    competency1: { score: 160, feedback: "Bom domínio da norma culta. Identificamos 2 desvios de concordância verbal e 1 uso inadequado de vírgula. Com pequenos ajustes você atinge 200 pontos." },
    competency2: { score: 160, feedback: "Compreensão da proposta demonstrada. Repertório pertinente, mas a relação com o tema central poderia ser aprofundada para atingir 200 pontos." },
    competency3: { score: 160, feedback: "Argumentação consistente. O 2º parágrafo poderia ser reforçado com dados concretos de fontes reconhecidas." },
    competency4: { score: 120, feedback: "Coesão com problemas: 'além disso' aparece 4 vezes. Diversifique os conectivos — use 'ademais', 'outrossim', 'nesse contexto'." },
    competency5: { score: 200, feedback: "Proposta excelente! Agente, ação, modo e finalidade presentes. Direitos humanos respeitados. Ponto máximo!" },
    generalFeedback: "Redação sólida. O principal ponto a trabalhar é a C4 — variedade de conectivos. C5 nota máxima é um diferencial raro. Continue praticando.",
    strengths: ["C5 nota 200 — proposta de intervenção completa", "Vocabulário formal consistente", "Tese clara no primeiro parágrafo"],
    weaknesses: ["'Além disso' repetido 4x na redação", "Falta dado quantitativo no 2º argumento", "Vírgula ausente antes de 'mas' no P3"],
    suggestions: ["Use: 'ademais', 'nesse contexto', 'somado a isso', 'por conseguinte'", "Cite IBGE, OMS ou Reuters com ano específico", "Revise concordância verbal com sujeito composto"],
    paragraphNotes: [
      { paragraph: 1, note: "Tese clara com contextualização. Boa abertura.", type: "positive" },
      { paragraph: 2, note: "Argumento sólido, mas falta dado quantitativo.", type: "warning" },
      { paragraph: 3, note: "'Além disso' repetido. Vírgula ausente antes de 'mas'.", type: "error" },
      { paragraph: 4, note: "Proposta completa: agente, ação, finalidade, modo.", type: "positive" },
    ],
    essayText: `A proliferação das fake news nas redes sociais representa uma ameaça concreta à democracia brasileira. A desinformação sistemática compromete a capacidade crítica dos cidadãos, criando um ambiente propício à manipulação.

O filósofo Jürgen Habermas defende que a democracia depende de uma esfera pública saudável, onde o debate racional prevalece. No entanto, os algoritmos das redes sociais priorizam o engajamento emocional, criando "câmaras de eco" que distorcem a percepção da realidade.

Além disso, dados do Instituto Reuters (2023) revelam que 64% dos brasileiros já compartilharam conteúdo sem verificar. Além disso, o Brasil é um dos países mais afetados pela desinformação política, mas ainda falta regulamentação efetiva.

Diante desse cenário, é papel do Estado brasileiro, por meio do Ministério da Educação, implementar programas de letramento midiático nas escolas públicas de ensino médio, fornecendo ferramentas para que os jovens identifiquem e combatam a desinformação, garantindo o exercício pleno da cidadania democrática.`,
  },
  {
    label: "Exemplo 2 — Saúde Mental",
    score: 920,
    competency1: { score: 200, feedback: "Norma culta impecável. Nenhum desvio gramatical, ortográfico ou de pontuação identificado ao longo de todo o texto. Registro formal sustentado do início ao fim." },
    competency2: { score: 200, feedback: "Compreensão plena da proposta. Repertório sofisticado: Byung-Chul Han + dado da OMS + Jonathan Haidt. Três tipos distintos de repertório demonstram amplitude intelectual." },
    competency3: { score: 160, feedback: "Argumentação bem estruturada. O 2º desenvolvimento, apesar de pertinente, repetiu ideias já exploradas no 1º — faltou avançar para um novo ângulo analítico." },
    competency4: { score: 200, feedback: "Coesão exemplar. Conectivos variados: 'Nesse contexto', 'Outrossim', 'Diante disso'. Retomadas anafóricas precisas. Texto fluido e progressivo." },
    competency5: { score: 160, feedback: "Proposta presente, mas o agente poderia ser mais específico ('Ministério da Saúde' em vez de 'o poder público'). Os demais elementos estão completos." },
    generalFeedback: "Redação de alto nível — 920 pontos. C1, C2 e C4 perfeitos. Para 1000, aprofunde o 2º argumento com nova perspectiva analítica e especifique melhor o agente na proposta.",
    strengths: ["C1, C2 e C4 nota máxima", "Dois filósofos + dado empírico no mesmo texto", "Progressão temática impecável entre parágrafos"],
    weaknesses: ["2º desenvolvimento repetiu ideia do 1º", "Agente da proposta genérico ('poder público')"],
    suggestions: ["No 2º argumento: explore consequência diferente — ex: impacto no mercado de trabalho", "Troque 'poder público' por 'Ministério da Saúde' + parceria com CFM"],
    paragraphNotes: [
      { paragraph: 1, note: "Abertura analítica precisa. Tese bem posicionada.", type: "positive" },
      { paragraph: 2, note: "Han + OMS usados com maestria. Parágrafo exemplar.", type: "positive" },
      { paragraph: 3, note: "Repete ideia do P2. Falta novo ângulo analítico.", type: "warning" },
      { paragraph: 4, note: "Proposta quase completa — agente genérico.", type: "warning" },
    ],
    essayText: `A crise de saúde mental entre jovens brasileiros configura um problema estrutural amplificado pelo uso desregulado de tecnologias digitais. Nesse contexto, compreender os mecanismos que levam ao esgotamento e propor soluções eficazes torna-se urgente.

O filósofo Byung-Chul Han, em "Sociedade do Cansaço", argumenta que o imperativo do desempenho — intensificado pelas redes sociais — transforma o indivíduo em explorador de si mesmo. Dados da OMS (2022) confirmam: a depressão afeta 11,5 milhões de brasileiros, com os jovens representando o grupo mais vulnerável.

Outrossim, Jonathan Haidt demonstra que a chegada dos smartphones coincide com o início de uma epidemia de ansiedade entre adolescentes. A comparação social constante e a privação de sono causadas pelo uso noturno intensivo são fatores diretos no desenvolvimento de transtornos mentais nessa faixa etária.

Diante disso, cabe ao poder público, por meio de políticas de saúde, implementar programas de saúde mental nas escolas públicas, em parceria com o CFM, mediante a capacitação de professores para identificação precoce de transtornos, com o objetivo de garantir o bem-estar psicológico da juventude brasileira.`,
  },
  {
    label: "Exemplo 3 — Nota 1000",
    score: 1000,
    competency1: { score: 200, feedback: "Domínio absoluto da norma culta. Zero desvios em toda a extensão do texto. Uso preciso de travessão, ponto-e-vírgula e orações subordinadas complexas sem nenhum erro." },
    competency2: { score: 200, feedback: "Repertório de altíssimo nível: Simone de Beauvoir (com citação direta integrada) + dado do Fórum de Segurança Pública + Boaventura de Sousa Santos. Conexão com o tema precisa e profunda." },
    competency3: { score: 200, feedback: "Argumentação exemplar. Progressão lógica perfeita: causa histórica (Beauvoir) → perpetuação atual (Santos) → solução (proposta). Nenhum parágrafo desperdiça espaço." },
    competency4: { score: 200, feedback: "Coesão perfeita. 'Nesse contexto' → 'Ademais' → 'Portanto'. Retomadas anafóricas com sinônimos contextuais. Texto fluido sem repetição lexical." },
    competency5: { score: 200, feedback: "Proposta nota máxima. Agente específico, ação concreta, modo técnico, finalidade clara e detalhamento geográfico. Respeitou integralmente os direitos humanos." },
    generalFeedback: "NOTA 1000. Redação perfeita nas 5 competências. Serve como modelo de estudo. Observe especialmente a progressão argumentativa e a articulação entre desenvolvimento e proposta.",
    strengths: ["Nota 1000 — perfeito nas 5 competências", "Progressão argumentativa impecável", "Proposta articula com o problema identificado no texto"],
    weaknesses: [],
    suggestions: ["Use como modelo de estudo", "Analise a estrutura de cada parágrafo", "Copie o padrão de conectivos para sua próxima redação"],
    paragraphNotes: [
      { paragraph: 1, note: "Tese analítica de alto nível. Posiciona o problema como estrutural.", type: "positive" },
      { paragraph: 2, note: "Beauvoir + OMS = filosofia + dado empírico. Fórmula perfeita.", type: "positive" },
      { paragraph: 3, note: "Santos explica a perpetuação. Novo ângulo, não repetição.", type: "positive" },
      { paragraph: 4, note: "Proposta ataca exatamente o problema do P3. Coerência total.", type: "positive" },
    ],
    essayText: `A persistência da violência contra a mulher no Brasil reflete um problema estrutural que vai além de atos individuais, sendo fruto de uma sociedade patriarcal historicamente construída. Compreender suas causas e propor soluções eficazes torna-se imperativo para uma nação verdadeiramente democrática.

Simone de Beauvoir, em "O Segundo Sexo", afirma que "ninguém nasce mulher, torna-se mulher". Essa concepção evidencia que a subordinação feminina é resultado de uma construção cultural que naturaliza a violência. No Brasil, segundo o Fórum Brasileiro de Segurança Pública, registram-se 1.463 feminicídios por ano — um a cada 6 horas.

Ademais, Boaventura de Sousa Santos argumenta que grupos marginalizados sofrem "violência epistêmica", que silencia suas vozes e perpetua sua invisibilidade. Esse fenômeno explica por que muitas vítimas não denunciam: medo, dependência econômica e descrença no sistema judiciário.

Portanto, o Estado brasileiro, por intermédio das secretarias de Segurança Pública, deve promover a capacitação obrigatória de policiais em questões de gênero, de modo a garantir o acolhimento humanizado das vítimas, além de criar Delegacias da Mulher em municípios de pequeno porte, assegurando o direito à vida e à dignidade humana.`,
  },
];

// Compatibilidade com código existente
const MOCK_RESULT = MOCK_EXAMPLES[0];

function ScoreCard({ label, score, feedback, index }: { label: string; score: number; feedback: string; index: number }) {
  const [open, setOpen] = useState(false);
  const pct = score / 200;
  const color = score >= 160 ? "text-green-400" : score >= 120 ? "text-blue-400" : "text-orange-400";
  const barColor = score >= 160 ? "from-green-500 to-emerald-400" : score >= 120 ? "from-blue-500 to-cyan-400" : "from-orange-500 to-yellow-400";

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass rounded-xl border border-white/5 overflow-hidden"
    >
      <button onClick={() => setOpen(!open)} className="w-full flex items-center gap-4 p-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-black text-white/70">C{index + 1}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-white/80">{label}</span>
            <span className={cn("text-lg font-black", color)}>{score}/200</span>
          </div>
          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${pct * 100}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
              className={cn("h-full rounded-full bg-gradient-to-r", barColor)}
            />
          </div>
        </div>
        <ChevronDown className={cn("w-4 h-4 text-white/30 transition-transform flex-shrink-0", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-0">
              <p className="text-sm text-white/60 leading-relaxed border-t border-white/5 pt-3">{feedback}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

const CHECKLIST = [
  "Escrevi em modalidade escrita formal da Língua Portuguesa",
  "Minha redação tem introdução, 2 desenvolvimentos e conclusão",
  "Usei repertório sociocultural (filósofo, dado, obra)",
  "Conectivos variados entre parágrafos (não repeti 'além disso')",
  "Proposta de intervenção com agente, ação, meio e finalidade",
];

const WORD_IDEAL = { min: 250, max: 350 };

export default function CorrecaoIAPage() {
  const [mode, setMode] = useState<"upload" | "result">("result");
  const [text, setText] = useState("");
  const [theme, setTheme] = useState("");
  const [processing, setProcessing] = useState(false);
  const [checklist, setChecklist] = useState<boolean[]>(CHECKLIST.map(() => false));
  const [exampleIdx, setExampleIdx] = useState(0);
  const [exampleVisible, setExampleVisible] = useState(true);

  // Cicla exemplos a cada 30s com fade out/in
  useEffect(() => {
    if (mode !== "result") return;
    const timer = setInterval(() => {
      setExampleVisible(false);
      setTimeout(() => {
        setExampleIdx((i) => (i + 1) % MOCK_EXAMPLES.length);
        setExampleVisible(true);
      }, 500);
    }, 30000);
    return () => clearInterval(timer);
  }, [mode]);

  const activeExample = MOCK_EXAMPLES[exampleIdx];

  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim()).length;
  const chars = text.length;

  const wordStatus =
    words === 0 ? "empty" :
    words < 150 ? "short" :
    words < WORD_IDEAL.min ? "ok" :
    words <= WORD_IDEAL.max ? "ideal" :
    "long";

  const wordColor = {
    empty: "text-white/20",
    short: "text-red-400",
    ok: "text-yellow-400",
    ideal: "text-green-400",
    long: "text-orange-400",
  }[wordStatus];

  const wordLabel = {
    empty: "Nenhuma palavra",
    short: "Muito curta",
    ok: "Aumentar um pouco",
    ideal: "Extensão ideal",
    long: "Muito longa",
  }[wordStatus];

  const canSubmit = words >= 150 && theme.trim().length > 0;

  const handleCorrect = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2500));
    setProcessing(false);
    setMode("result");
  };

  const toggleCheck = (i: number) =>
    setChecklist((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  if (mode === "upload") {
    return (
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
                <Brain className="w-7 h-7 text-blue-400" />
                Correção por IA
              </h1>
              <p className="text-white/40 text-sm mt-1">
                Cole sua redação, informe o tema e receba análise completa por competência.
              </p>
            </div>
            {/* Ver último resultado */}
            <button
              onClick={() => setMode("result")}
              className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl glass border border-white/10 text-white/50 hover:text-white hover:border-white/20 transition-all text-sm flex-shrink-0"
            >
              <FileText className="w-4 h-4" />
              Último resultado
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* ── EDITOR PRINCIPAL ── */}
            <div className="lg:col-span-2 space-y-4">

              {/* Tema */}
              <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                <div className="flex items-center gap-3 px-5 py-3.5 border-b border-white/5">
                  <Target className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <input
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    placeholder="Qual é o tema da sua redação? (obrigatório)"
                    className="flex-1 bg-transparent text-sm font-medium text-white placeholder:text-white/25 outline-none"
                  />
                  {theme.trim() && (
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                  )}
                </div>
              </div>

              {/* Textarea */}
              <div className="glass rounded-2xl border border-white/5 overflow-hidden">
                <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
                  <PenLine className="w-4 h-4 text-white/30" />
                  <span className="text-xs font-medium text-white/40">Texto da redação</span>
                </div>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={`Cole ou escreva sua redação aqui.\n\nDica: use Enter duplo para separar parágrafos.`}
                  rows={18}
                  className="w-full bg-transparent px-5 py-4 text-sm text-white placeholder:text-white/15 outline-none resize-none leading-[1.85]"
                />

                {/* Stats bar */}
                <div className="flex items-center gap-4 px-5 py-3 border-t border-white/5 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Hash className="w-3 h-3 text-white/30" />
                    <span className={cn("text-xs font-semibold", wordColor)}>{words} palavras</span>
                    <span className="text-xs text-white/20">— {wordLabel}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <AlignLeft className="w-3 h-3 text-white/30" />
                    <span className={cn("text-xs font-semibold", paragraphs === 4 ? "text-green-400" : paragraphs > 0 ? "text-yellow-400" : "text-white/30")}>
                      {paragraphs} parágrafos
                    </span>
                    {paragraphs > 0 && paragraphs !== 4 && (
                      <span className="text-xs text-white/20">— ENEM espera 4</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 ml-auto">
                    <span className="text-xs text-white/20">{chars}/3000 caracteres</span>
                  </div>
                </div>

                {/* Word count bar */}
                {words > 0 && (
                  <div className="px-5 pb-4">
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          wordStatus === "ideal" ? "bg-green-500" :
                          wordStatus === "long" ? "bg-orange-500" :
                          wordStatus === "short" ? "bg-red-500" : "bg-blue-500"
                        )}
                        style={{ width: `${Math.min((words / WORD_IDEAL.max) * 100, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-white/20 mt-1">
                      <span>0</span>
                      <span className="text-white/30">250 ideal</span>
                      <span>350</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Submit button */}
              <button
                onClick={handleCorrect}
                disabled={!canSubmit || processing}
                className={cn(
                  "w-full flex items-center justify-center gap-2.5 py-4 rounded-2xl font-bold text-base transition-all",
                  canSubmit && !processing
                    ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-400 hover:to-cyan-400 hover:shadow-glow"
                    : "bg-white/5 border border-white/5 text-white/25 cursor-not-allowed"
                )}
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    IA analisando sua redação...
                  </>
                ) : !theme.trim() ? (
                  <>
                    <Target className="w-5 h-5" />
                    Informe o tema para continuar
                  </>
                ) : words < 150 ? (
                  <>
                    <Send className="w-5 h-5" />
                    Mínimo 150 palavras ({words}/150)
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    Corrigir com IA — {words} palavras
                  </>
                )}
              </button>
            </div>

            {/* ── SIDEBAR ── */}
            <div className="space-y-4">

              {/* Checklist pré-envio */}
              <div className="glass rounded-2xl border border-white/5 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <p className="text-sm font-semibold text-white">Checklist antes de enviar</p>
                </div>
                <div className="space-y-2.5">
                  {CHECKLIST.map((item, i) => (
                    <button
                      key={i}
                      onClick={() => toggleCheck(i)}
                      className="w-full flex items-start gap-2.5 text-left group"
                    >
                      <div className={cn(
                        "w-4 h-4 rounded border flex-shrink-0 mt-0.5 flex items-center justify-center transition-all",
                        checklist[i]
                          ? "bg-green-500 border-green-500"
                          : "border-white/20 group-hover:border-white/40"
                      )}>
                        {checklist[i] && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      <span className={cn(
                        "text-xs leading-relaxed transition-colors",
                        checklist[i] ? "text-white/40 line-through" : "text-white/65 group-hover:text-white/80"
                      )}>
                        {item}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="text-white/30">Progresso</span>
                    <span className={cn(checklist.filter(Boolean).length === CHECKLIST.length ? "text-green-400" : "text-white/40")}>
                      {checklist.filter(Boolean).length}/{CHECKLIST.length}
                    </span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all"
                      style={{ width: `${(checklist.filter(Boolean).length / CHECKLIST.length) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* O que a IA avalia */}
              <div className="glass rounded-2xl border border-blue-500/10 bg-blue-500/3 p-5">
                <div className="flex items-center gap-2 mb-4">
                  <Brain className="w-4 h-4 text-blue-400" />
                  <p className="text-sm font-semibold text-white">O que a IA avalia</p>
                </div>
                <div className="space-y-2.5">
                  {[
                    { label: "C1", desc: "Gramática, ortografia e norma culta", color: "text-purple-400" },
                    { label: "C2", desc: "Compreensão do tema e repertório", color: "text-blue-400" },
                    { label: "C3", desc: "Qualidade e progressão dos argumentos", color: "text-cyan-400" },
                    { label: "C4", desc: "Coesão e conectivos textuais", color: "text-green-400" },
                    { label: "C5", desc: "Proposta de intervenção detalhada", color: "text-orange-400" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-2.5">
                      <span className={cn("text-[11px] font-black mt-0.5 flex-shrink-0 w-5", item.color)}>
                        {item.label}
                      </span>
                      <span className="text-xs text-white/55 leading-snug">{item.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dica rápida */}
              <div className="glass rounded-2xl border border-yellow-500/10 bg-yellow-500/3 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-3.5 h-3.5 text-yellow-400" />
                  <p className="text-[11px] font-bold text-yellow-400 uppercase tracking-wider">Dica</p>
                </div>
                <p className="text-xs text-white/60 leading-relaxed">
                  A IA avalia com os mesmos critérios dos corretores humanos do ENEM. Quanto mais detalhada sua redação, mais preciso o feedback.
                </p>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  const radarData = [
    { subject: "C1", value: (activeExample.competency1.score / 200) * 100 },
    { subject: "C2", value: (activeExample.competency2.score / 200) * 100 },
    { subject: "C3", value: (activeExample.competency3.score / 200) * 100 },
    { subject: "C4", value: (activeExample.competency4.score / 200) * 100 },
    { subject: "C5", value: (activeExample.competency5.score / 200) * 100 },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <motion.div
        key={exampleIdx}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: exampleVisible ? 1 : 0, y: 20 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
              <Brain className="w-7 h-7 text-blue-400" />
              Resultado da Correção
            </h1>
            <p className="text-white/40 text-sm mt-1">IA Nota 1000 — Análise completa baseada nos critérios ENEM</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMode("upload")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border border-white/5 text-white/50 hover:text-white hover:border-white/10 transition-all text-sm"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Nova redação
            </button>
            <button className="flex items-center gap-2 px-3 py-2 rounded-xl border border-blue-500/20 text-blue-400 hover:bg-blue-500/10 transition-all text-sm">
              <Download className="w-3.5 h-3.5" />
              PDF
            </button>
          </div>
        </div>

        {/* Indicadores de exemplo */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-white/30">Exemplos de correção:</span>
          {MOCK_EXAMPLES.map((ex, i) => (
            <button
              key={i}
              onClick={() => { setExampleVisible(false); setTimeout(() => { setExampleIdx(i); setExampleVisible(true); }, 300); }}
              className={cn(
                "flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-all",
                i === exampleIdx
                  ? "border-blue-500/40 bg-blue-500/15 text-blue-300"
                  : "border-white/10 text-white/30 hover:text-white/60"
              )}
            >
              <span className={cn("w-1.5 h-1.5 rounded-full", i === exampleIdx ? "bg-blue-400" : "bg-white/20")} />
              {ex.score} pts
            </button>
          ))}
          <span className="text-[11px] text-white/20 ml-auto">Cicla a cada 30s</span>
        </div>

        {/* Score hero */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-2xl p-6 border border-blue-500/15 bg-gradient-to-br from-blue-500/5 to-transparent"
        >
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Score ring */}
            <div className="relative w-36 h-36 flex-shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                <motion.circle
                  cx="80" cy="80" r="70" fill="none"
                  stroke="url(#scoreGrad2)" strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 70}
                  strokeDashoffset={2 * Math.PI * 70 * (1 - activeExample.score / 1000)}
                  strokeLinecap="round"
                  initial={{ strokeDashoffset: 2 * Math.PI * 70 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 70 * (1 - activeExample.score / 1000) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="scoreGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-4xl font-black gradient-text"
                >
                  {activeExample.score}
                </motion.span>
                <span className="text-xs text-white/40">de 1000</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={cn("text-2xl font-black", getScoreColor(activeExample.score))}>
                  {getScoreLabel(activeExample.score)}
                </span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-4">{activeExample.generalFeedback}</p>
              <div className="grid grid-cols-5 gap-2">
                {[activeExample.competency1.score, activeExample.competency2.score, activeExample.competency3.score, activeExample.competency4.score, activeExample.competency5.score].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className={cn(
                      "text-lg font-black",
                      s === 200 ? "text-green-400" : s >= 160 ? "text-blue-400" : s >= 120 ? "text-yellow-400" : "text-red-400"
                    )}>
                      {s}
                    </div>
                    <div className="text-[10px] text-white/30">C{i + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Radar */}
            <div className="hidden md:block w-44 h-44 flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                  <Radar dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Competency scores */}
          <div className="lg:col-span-1 space-y-2">
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">Competências</h2>
            {[
              { label: getCompetencyLabel(1), ...activeExample.competency1 },
              { label: getCompetencyLabel(2), ...activeExample.competency2 },
              { label: getCompetencyLabel(3), ...activeExample.competency3 },
              { label: getCompetencyLabel(4), ...activeExample.competency4 },
              { label: getCompetencyLabel(5), ...activeExample.competency5 },
            ].map((c, i) => (
              <ScoreCard key={i} label={c.label} score={c.score} feedback={c.feedback} index={i} />
            ))}
          </div>

          {/* Annotated essay + strengths/weaknesses */}
          <div className="lg:col-span-2 space-y-4">
            {/* Essay with annotations */}
            <div className="glass rounded-2xl border border-white/5 overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3.5 border-b border-white/5">
                <FileText className="w-4 h-4 text-blue-400" />
                <h2 className="text-sm font-semibold text-white">Sua redação anotada</h2>
              </div>
              <div className="p-5 space-y-3">
                {activeExample.essayText.split("\n\n").map((para, i) => {
                  const note = activeExample.paragraphNotes.find((n) => n.paragraph === i + 1);
                  return (
                    <div key={i} className="group relative">
                      <div className={cn(
                        "p-3 rounded-xl border text-sm text-white/70 leading-relaxed transition-all",
                        note?.type === "positive" ? "border-green-500/10 bg-green-500/3 hover:border-green-500/25" :
                        note?.type === "warning" ? "border-yellow-500/10 bg-yellow-500/3 hover:border-yellow-500/25" :
                        note?.type === "error" ? "border-red-500/10 bg-red-500/3 hover:border-red-500/25" :
                        "border-white/5"
                      )}>
                        {para}
                      </div>
                      {note && (
                        <div className={cn(
                          "mt-1.5 flex items-start gap-2 px-3 py-2 rounded-lg text-xs",
                          note.type === "positive" ? "text-green-400 bg-green-500/5" :
                          note.type === "warning" ? "text-yellow-400 bg-yellow-500/5" :
                          "text-red-400 bg-red-500/5"
                        )}>
                          {note.type === "positive" ? <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> :
                           note.type === "warning" ? <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" /> :
                           <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />}
                          <span>{note.note}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Strengths & weaknesses */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass rounded-2xl border border-green-500/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <h3 className="text-sm font-semibold text-white">Pontos fortes</h3>
                </div>
                <ul className="space-y-2">
                  {activeExample.strengths.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-green-400 mt-1">+</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass rounded-2xl border border-red-500/10 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <h3 className="text-sm font-semibold text-white">A melhorar</h3>
                </div>
                <ul className="space-y-2">
                  {activeExample.weaknesses.map((w, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <span className="text-red-400 mt-1">−</span>
                      <span>{w}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggestions */}
            <div className="glass rounded-2xl border border-blue-500/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-semibold text-white">Sugestões da IA</h3>
              </div>
              <ul className="space-y-2">
                {activeExample.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-white/65 p-2.5 rounded-lg bg-white/8 border border-white/5">
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
