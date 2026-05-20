// Mock data for development & demonstration

export const mockUser = {
  id: "user_1",
  name: "Ana Beatriz Silva",
  email: "ana@email.com",
  avatarUrl: "https://avatars.githubusercontent.com/u/1?v=4",
  xp: 4280,
  level: 12,
  streakDays: 17,
  plan: "PRO",
};

export const mockCompetencyScores = {
  c1: 160,
  c2: 140,
  c3: 160,
  c4: 120,
  c5: 140,
  total: 720,
};

export const mockWeeklyProgress = [
  { day: "Seg", score: 680, essays: 1 },
  { day: "Ter", score: 700, essays: 0 },
  { day: "Qua", score: 720, essays: 1 },
  { day: "Qui", score: 700, essays: 0 },
  { day: "Sex", score: 740, essays: 2 },
  { day: "Sáb", score: 760, essays: 1 },
  { day: "Dom", score: 720, essays: 0 },
];

export const mockMonthlyProgress = [
  { month: "Ago", avgScore: 620 },
  { month: "Set", avgScore: 660 },
  { month: "Out", avgScore: 700 },
  { month: "Nov", avgScore: 720 },
  { month: "Dez", avgScore: 740 },
  { month: "Jan", avgScore: 760 },
];

export const mockEssays = [
  {
    id: "1",
    title: "IA e manipulação comportamental",
    score: 800,
    date: "2024-11-15",
    status: "COMPLETED",
    competencies: [160, 160, 160, 160, 160],
  },
  {
    id: "2",
    title: "Crise da saúde mental juvenil no Brasil",
    score: 720,
    date: "2024-11-10",
    status: "COMPLETED",
    competencies: [160, 140, 160, 120, 140],
  },
  {
    id: "3",
    title: "Invisibilidade social no ambiente digital",
    score: 680,
    date: "2024-11-05",
    status: "COMPLETED",
    competencies: [120, 120, 160, 120, 160],
  },
];

export type LessonDifficulty = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
import { lessonContent } from "./lesson-content";

export type LessonCategory = "C1" | "C2" | "C3" | "C4" | "C5" | "DICAS";

export interface Lesson {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: LessonCategory;
  competency: number | null;
  difficulty: LessonDifficulty;
  readingTime: number;
  progress: number; // 0-100
  practicalQuestion: string;
  content?: string;
}

export const mockLessons: Lesson[] = [
  // ── C1 ──
  {
    id: "c1-i",
    slug: "c1-iniciante",
    title: "C1 Iniciante — Fundamentos da Norma Culta",
    description: "Entenda o que é a Competência 1 e quais erros eliminam pontos imediatamente.",
    category: "C1",
    competency: 1,
    difficulty: "BEGINNER",
    readingTime: 10,
    progress: 100,
    practicalQuestion: "Reescreva a frase corrigindo os erros gramaticais: 'Os jovens brasileiros é cada vez mais expostos às redes sociais, o que comprometem seu desenvolvimento crítico.'",
    content: lessonContent["c1-iniciante"],
  },
  {
    id: "c1-m",
    slug: "c1-intermediario",
    title: "C1 Intermediário — Ortografia, Concordância e Regência",
    description: "Aprofunde-se nos desvios mais cobrados pelo ENEM e como evitá-los.",
    category: "C1",
    competency: 1,
    difficulty: "INTERMEDIATE",
    readingTime: 15,
    progress: 0,
    practicalQuestion: "Identifique e corrija todos os desvios da norma culta no trecho: 'Mediante a isso, o governo deveria de implementar políticas que visem combater a desinformação, visto que a mesma prejudica a democracia.'",
    content: lessonContent["c1-intermediario"],
  },
  {
    id: "c1-a",
    slug: "c1-avancado",
    title: "C1 Avançado — Pontuação e Registros Formais",
    description: "Domine vírgulas, ponto-e-vírgulas e o registro formal para garantir os 200 pontos.",
    category: "C1",
    competency: 1,
    difficulty: "ADVANCED",
    readingTime: 20,
    progress: 0,
    practicalQuestion: "Pontue corretamente o parágrafo a seguir, justificando cada escolha: 'Os dados do IBGE divulgados em 2022 revelam que a desigualdade social no Brasil permanece alta apesar das políticas públicas implementadas ao longo das últimas décadas o que exige uma revisão profunda das estratégias adotadas.'",
    content: lessonContent["c1-avancado"],
  },

  // ── C2 ──
  {
    id: "c2-i",
    slug: "c2-iniciante",
    title: "C2 Iniciante — Lendo e Entendendo a Proposta",
    description: "Aprenda a extrair o tema, o recorte e as perspectivas esperadas na redação.",
    category: "C2",
    competency: 2,
    difficulty: "BEGINNER",
    readingTime: 10,
    progress: 0,
    practicalQuestion: "Leia o tema: 'Desafios para a valorização dos povos indígenas no Brasil'. Escreva um parágrafo de introdução que demonstre compreensão plena da proposta sem fugir do tema.",
    content: lessonContent["c2-iniciante"],
  },
  {
    id: "c2-m",
    slug: "c2-intermediario",
    title: "C2 Intermediário — Repertório Sociocultural de Alto Impacto",
    description: "Como selecionar, adaptar e usar repertórios que elevam sua nota para 200.",
    category: "C2",
    competency: 2,
    difficulty: "INTERMEDIATE",
    readingTime: 18,
    progress: 0,
    practicalQuestion: "Para o tema 'Impactos da desinformação na democracia brasileira', apresente três repertórios socioculturais (filósofo, dado estatístico e obra cultural) e explique como cada um se relaciona com o tema.",
    content: lessonContent["c2-intermediario"],
  },
  {
    id: "c2-a",
    slug: "c2-avancado",
    title: "C2 Avançado — Repertório Autoral e Conexões Temáticas",
    description: "Crie conexões sofisticadas entre diferentes áreas do conhecimento para atingir 200 em C2.",
    category: "C2",
    competency: 2,
    difficulty: "ADVANCED",
    readingTime: 22,
    progress: 0,
    practicalQuestion: "Escreva um parágrafo de desenvolvimento que conecte pelo menos dois repertórios de áreas distintas (ex: filosofia + ciência) ao tema 'Crise climática e responsabilidade individual'.",
    content: lessonContent["c2-avancado"],
  },

  // ── C3 ──
  {
    id: "c3-i",
    slug: "c3-iniciante",
    title: "C3 Iniciante — O que é Argumentação no ENEM",
    description: "Compreenda a diferença entre opinião e argumento, e por que isso define sua nota em C3.",
    category: "C3",
    competency: 3,
    difficulty: "BEGINNER",
    readingTime: 12,
    progress: 0,
    practicalQuestion: "Escreva um argumento (não uma opinião) para defender a seguinte tese: 'O uso excessivo de redes sociais é prejudicial à saúde mental dos jovens'. Use dados ou exemplos concretos.",
    content: lessonContent["c3-iniciante"],
  },
  {
    id: "c3-m",
    slug: "c3-intermediario",
    title: "C3 Intermediário — Estruturas de Argumento",
    description: "Domine as estruturas: dado → análise → conclusão, concessão, e argumento por exemplificação.",
    category: "C3",
    competency: 3,
    difficulty: "INTERMEDIATE",
    readingTime: 18,
    progress: 0,
    practicalQuestion: "Desenvolva um parágrafo argumentativo completo usando a estrutura: contexto → argumento central → evidência concreta → análise crítica → conexão com a tese. Tema livre.",
    content: lessonContent["c3-intermediario"],
  },
  {
    id: "c3-a",
    slug: "c3-avancado",
    title: "C3 Avançado — Argumentação Sem Senso Comum",
    description: "Técnicas para construir argumentos originais, densos e com profundidade analítica.",
    category: "C3",
    competency: 3,
    difficulty: "ADVANCED",
    readingTime: 25,
    progress: 0,
    practicalQuestion: "Reescreva o argumento abaixo, transformando-o de senso comum em argumento analítico sofisticado: 'A violência aumentou porque as pessoas perderam os valores morais e a família está desestruturada.'",
    content: lessonContent["c3-avancado"],
  },

  // ── C4 ──
  {
    id: "c4-i",
    slug: "c4-iniciante",
    title: "C4 Iniciante — Coesão: o que é e por que importa",
    description: "Entenda como conectivos e pronomes criam o fio condutor do seu texto.",
    category: "C4",
    competency: 4,
    difficulty: "BEGINNER",
    readingTime: 10,
    progress: 0,
    practicalQuestion: "Conecte os dois parágrafos abaixo usando conectivos adequados, evitando repetir 'além disso': P1: 'A tecnologia transformou a comunicação humana.' P2: 'Muitas pessoas se sentem mais solitárias do que antes.'",
    content: lessonContent["c4-iniciante"],
  },
  {
    id: "c4-m",
    slug: "c4-intermediario",
    title: "C4 Intermediário — Conectivos e Operadores Argumentativos",
    description: "Catálogo completo de conectivos por função: adição, oposição, causa, consequência, conclusão.",
    category: "C4",
    competency: 4,
    difficulty: "INTERMEDIATE",
    readingTime: 16,
    progress: 0,
    practicalQuestion: "Reescreva o trecho substituindo TODOS os 'além disso' por conectivos variados e adequados ao contexto: 'O desmatamento destrói habitats. Além disso, causa mudanças climáticas. Além disso, afeta comunidades indígenas. Além disso, prejudica a economia local.'",
    content: lessonContent["c4-intermediario"],
  },
  {
    id: "c4-a",
    slug: "c4-avancado",
    title: "C4 Avançado — Progressão Temática e Coerência Global",
    description: "Garanta que cada parágrafo avança o raciocínio e o texto tem unidade perfeita.",
    category: "C4",
    competency: 4,
    difficulty: "ADVANCED",
    readingTime: 20,
    progress: 0,
    practicalQuestion: "Analise a coesão do texto abaixo e reescreva-o garantindo progressão temática clara entre os parágrafos: 'A educação é fundamental. Os professores ganham pouco. O Brasil tem problemas econômicos. A desigualdade é grande. As crianças precisam de atenção.'",
    content: lessonContent["c4-avancado"],
  },

  // ── C5 ──
  {
    id: "c5-i",
    slug: "c5-iniciante",
    title: "C5 Iniciante — O que o ENEM espera na Intervenção",
    description: "Entenda os 5 elementos obrigatórios da proposta de intervenção e por que cada um importa.",
    category: "C5",
    competency: 5,
    difficulty: "BEGINNER",
    readingTime: 12,
    progress: 0,
    practicalQuestion: "Escreva uma proposta de intervenção para o tema 'Combate à desinformação nas redes sociais'. Identifique explicitamente: agente, ação, modo/meio, finalidade e detalhamento.",
    content: lessonContent["c5-iniciante"],
  },
  {
    id: "c5-m",
    slug: "c5-intermediario",
    title: "C5 Intermediário — Proposta Detalhada e Direitos Humanos",
    description: "Como detalhar a proposta sem violar direitos humanos e garantir os 200 pontos.",
    category: "C5",
    competency: 5,
    difficulty: "INTERMEDIATE",
    readingTime: 18,
    progress: 0,
    practicalQuestion: "Compare as duas propostas abaixo e explique qual seria mais bem avaliada pelo ENEM e por quê: A) 'O governo deve combater a violência.' B) 'O Ministério da Justiça deve implementar programas de mediação de conflitos em periferias, em parceria com ONGs, por meio de centros comunitários, com o objetivo de reduzir índices de violência sem criminalizar a pobreza.'",
    content: lessonContent["c5-intermediario"],
  },
  {
    id: "c5-a",
    slug: "c5-avancado",
    title: "C5 Avançado — Intervenção Criativa e Articulada ao Texto",
    description: "Crie propostas originais que dialogam com os argumentos do texto e garantem nota máxima.",
    category: "C5",
    competency: 5,
    difficulty: "ADVANCED",
    readingTime: 22,
    progress: 0,
    practicalQuestion: "Para o tema 'Invisibilidade do trabalho doméstico feminino no Brasil', elabore uma proposta de intervenção completa (mínimo 5 linhas) que: seja viável, respeite direitos humanos, articule-se aos argumentos desenvolvidos no texto e apresente todos os elementos exigidos.",
    content: lessonContent["c5-avancado"],
  },

  // ── DICAS PRÁTICAS ──
  {
    id: "dp-1",
    slug: "dicas-introducao-perfeita",
    title: "Como escrever uma introdução nota 10",
    description: "3 modelos de abertura que impressionam os avaliadores: dado, citação e situação-problema.",
    category: "DICAS",
    competency: null,
    difficulty: "INTERMEDIATE",
    readingTime: 8,
    progress: 0,
    practicalQuestion: "Escreva 3 versões de introdução para o tema 'Saúde mental dos jovens brasileiros': uma usando dado estatístico, outra usando citação de autor, e outra usando situação-problema. Qual você acha mais eficaz?",
  },
  {
    id: "dp-2",
    slug: "dicas-conclusao-c5",
    title: "Conclusão e C5: como fechar com chave de ouro",
    description: "O último parágrafo precisa retomar a tese E apresentar proposta completa. Veja como.",
    category: "DICAS",
    competency: null,
    difficulty: "INTERMEDIATE",
    readingTime: 8,
    progress: 0,
    practicalQuestion: "Escreva um parágrafo de conclusão completo para uma redação sobre 'Desafios da inclusão digital no Brasil', retomando a tese e apresentando proposta de intervenção detalhada.",
  },
  {
    id: "dp-3",
    slug: "dicas-repertorios-impactantes",
    title: "50 repertórios que os avaliadores adoram",
    description: "Lista curada de filósofos, dados, obras e eventos históricos organizados por tema.",
    category: "DICAS",
    competency: null,
    difficulty: "BEGINNER",
    readingTime: 12,
    progress: 0,
    practicalQuestion: "Escolha 3 repertórios desta lista e escreva um parágrafo de desenvolvimento para o tema 'Crise democrática no século XXI', usando os três de forma integrada e natural.",
  },
];

export const mockAchievements = [
  { key: "first_essay", title: "Primeira Redação", description: "Enviou sua primeira redação para correção", rarity: "COMMON", unlocked: true },
  { key: "streak_7", title: "Semana Dedicada", description: "Manteve 7 dias de streak", rarity: "UNCOMMON", unlocked: true },
  { key: "score_800", title: "Alto Nível", description: "Atingiu 800 pontos em uma redação", rarity: "RARE", unlocked: true },
  { key: "streak_30", title: "Mês Perfeito", description: "Manteve 30 dias de streak", rarity: "EPIC", unlocked: false },
  { key: "score_960", title: "Quase Lá", description: "Atingiu 960 pontos em uma redação", rarity: "EPIC", unlocked: false },
  { key: "score_1000", title: "Nota Máxima", description: "Atingiu 1000 pontos na redação", rarity: "LEGENDARY", unlocked: false },
];

export const mockRanking = [
  { position: 1, name: "Lucas Mendonça", xp: 8420, avgScore: 880, streak: 45, avatar: null, plan: "ELITE" },
  { position: 2, name: "Maria Fernanda Costa", xp: 7890, avgScore: 860, streak: 38, avatar: null, plan: "ELITE" },
  { position: 3, name: "Ana Beatriz Silva", xp: 4280, avgScore: 760, streak: 17, avatar: null, plan: "PRO", isMe: true },
  { position: 4, name: "João Pedro Alves", xp: 3970, avgScore: 740, streak: 12, avatar: null, plan: "PRO" },
  { position: 5, name: "Isabela Santos", xp: 3650, avgScore: 720, streak: 8, avatar: null, plan: "PRO" },
  { position: 6, name: "Rafael Oliveira", xp: 3200, avgScore: 700, streak: 5, avatar: null, plan: "BASICO" },
  { position: 7, name: "Carolina Lima", xp: 2980, avgScore: 680, streak: 3, avatar: null, plan: "BASICO" },
  { position: 8, name: "Gabriel Nascimento", xp: 2450, avgScore: 660, streak: 2, avatar: null, plan: "BASICO" },
];

export const mockWeeklyTheme = {
  title: "Crise da Saúde Mental na Era Digital",
  description:
    "Discuta os desafios e consequências da saúde mental para jovens brasileiros no contexto do uso excessivo de redes sociais e tecnologias digitais, e proponha intervenções efetivas.",
  week: "2024-W47",
  tags: ["saúde mental", "tecnologia", "juventude", "redes sociais"],
  repertoires: [
    "OMS: 1 em cada 4 jovens sofre de transtorno mental",
    "IBGE: 70% dos jovens usam redes sociais mais de 4h/dia",
    "Byung-Chul Han — 'Sociedade do Cansaço'",
    "Jonathan Haidt — 'A Geração Ansiosa'",
  ],
};

export const mockDailyTheme = {
  title: "Racismo Algorítmico e Desigualdade Digital no Brasil",
  description:
    "Como os sistemas de inteligência artificial reproduzem e amplificam desigualdades raciais, excluindo minorias do acesso a serviços e oportunidades no ambiente digital.",
  date: "15 de novembro de 2024",
  tags: ["racismo", "IA", "tecnologia", "desigualdade"],
  difficulty: "Avançado",
  timeLimit: 60,
  repertoires: [
    "Safiya Noble — 'Algorithms of Oppression'",
    "IBGE: negros representam 56% da população e 75% dos mais pobres",
    "Joy Buolamwini — viés racial em reconhecimento facial",
  ],
};

export const mockRecommendedContents = [
  {
    id: "rc1",
    type: "lesson" as const,
    title: "Coesão textual: conectivos e progressão",
    subtitle: "Sua C4 mais fraca — foco aqui",
    href: "/aulas/coesao-textual",
    badge: "C4",
    badgeColor: "text-green-400 bg-green-500/10",
    meta: "18 min",
    priority: true,
  },
  {
    id: "rc3",
    type: "lesson" as const,
    title: "Proposta de intervenção nota 200",
    subtitle: "Consolide seu ponto mais forte",
    href: "/aulas/proposta-intervencao",
    badge: "C5",
    badgeColor: "text-orange-400 bg-orange-500/10",
    meta: "25 min",
    priority: false,
  },
  {
    id: "rc4",
    type: "lesson" as const,
    title: "Argumentação: como evitar o senso comum",
    subtitle: "C3 pode melhorar mais",
    href: "/aulas/argumentacao-avancada",
    badge: "C3",
    badgeColor: "text-cyan-400 bg-cyan-500/10",
    meta: "22 min",
    priority: false,
  },
];

export const mockStudyPlan = {
  title: "Plano Elite — ENEM 2025",
  description: "Plano personalizado gerado por IA para maximizar sua nota em 90 dias",
  progress: 34,
  daysLeft: 58,
  tasks: [
    { id: "t1", title: "Aula: Domínio da Norma Culta", type: "LESSON", completed: true, dueDate: "2024-11-10" },
    { id: "t2", title: "Redação: Tema da semana (Saúde Mental)", type: "ESSAY", completed: false, dueDate: "2024-11-17" },
    { id: "t3", title: "Aula: Construindo repertório sociocultural", type: "LESSON", completed: false, dueDate: "2024-11-18" },
    { id: "t4", title: "Revisão: Competência 4 — Coesão", type: "REVIEW", completed: false, dueDate: "2024-11-20" },
    { id: "t5", title: "Prática: Escrever 3 introduções", type: "PRACTICE", completed: false, dueDate: "2024-11-22" },
  ],
};

export const mockNotifications = [
  { id: "n1", title: "Redação corrigida!", message: "Sua redação sobre IA foi corrigida. Nota: 800/1000", type: "ESSAY_CORRECTED", read: false, createdAt: "2024-11-15" },
  { id: "n2", title: "Novo conquista!", message: "Você desbloqueou 'Alto Nível' — parabéns!", type: "ACHIEVEMENT", read: false, createdAt: "2024-11-15" },
  { id: "n3", title: "Novo tema da semana", message: "Tema desta semana: Crise da Saúde Mental na Era Digital", type: "INFO", read: true, createdAt: "2024-11-11" },
];

export const mockCompetencyRadar = [
  { subject: "C1 - Norma", value: 80, fullMark: 100 },
  { subject: "C2 - Tema", value: 70, fullMark: 100 },
  { subject: "C3 - Argum.", value: 80, fullMark: 100 },
  { subject: "C4 - Coesão", value: 60, fullMark: 100 },
  { subject: "C5 - Interv.", value: 70, fullMark: 100 },
];

export const mockAIInsights = [
  { type: "weakness", text: "Competência 4 é seu ponto fraco: falta de conectivos entre parágrafos" },
  { type: "strength", text: "Excelente uso de repertório nas últimas 3 redações" },
  { type: "tip", text: "Pratique escrever propostas de intervenção com agente + ação + finalidade + modo" },
  { type: "progress", text: "Crescimento de +140 pontos nos últimos 60 dias. Continue!" },
];
