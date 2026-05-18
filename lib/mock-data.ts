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
    progress: 60,
    practicalQuestion: "Identifique e corrija todos os desvios da norma culta no trecho: 'Mediante a isso, o governo deveria de implementar políticas que visem combater a desinformação, visto que a mesma prejudica a democracia.'",
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
    progress: 100,
    practicalQuestion: "Leia o tema: 'Desafios para a valorização dos povos indígenas no Brasil'. Escreva um parágrafo de introdução que demonstre compreensão plena da proposta sem fugir do tema.",
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
    progress: 100,
    practicalQuestion: "Escreva um argumento (não uma opinião) para defender a seguinte tese: 'O uso excessivo de redes sociais é prejudicial à saúde mental dos jovens'. Use dados ou exemplos concretos.",
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
    progress: 30,
    practicalQuestion: "Conecte os dois parágrafos abaixo usando conectivos adequados, evitando repetir 'além disso': P1: 'A tecnologia transformou a comunicação humana.' P2: 'Muitas pessoas se sentem mais solitárias do que antes.'",
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

export interface CompetencyAnalysis {
  score: number;
  label: string;
  summary: string;
  detailedAnalysis: string;
  textEvidence: string;
  whatWorked: string[];
  toImprove: string[];
}

export interface ParagraphAnnotation {
  index: number;
  label: string;
  labelColor: string;
  borderColor: string;
  bgColor: string;
  structure: string;
  technique: string;
  explanation: string;
}

export interface ModelEssay {
  id: string;
  title: string;
  theme: string;
  enEmYear: number | null;
  score: number;
  competency1: number;
  competency2: number;
  competency3: number;
  competency4: number;
  competency5: number;
  repertoires: string[];
  tags: string[];
  slug: string;
  content: string;
  competencyAnalysis: CompetencyAnalysis[];
  paragraphAnnotations: ParagraphAnnotation[];
  keyTechniques: string[];
  vocabularyHighlights: string[];
  overallAnalysis: string;
  strategicLessons: string[];
}

export const mockModelEssays: ModelEssay[] = [
  {
    id: "me1",
    title: "A persistência da violência contra a mulher no Brasil",
    theme: "Combate à violência contra a mulher",
    enEmYear: 2015,
    score: 1000,
    competency1: 200,
    competency2: 200,
    competency3: 200,
    competency4: 200,
    competency5: 200,
    repertoires: ["Simone de Beauvoir — O Segundo Sexo", "Organização Mundial da Saúde (OMS)", "Boaventura de Sousa Santos", "Lei Maria da Penha (Lei 11.340/2006)"],
    tags: ["gênero", "violência", "direitos humanos", "feminismo"],
    slug: "violencia-mulher-1000",

    content: `A persistência da violência contra a mulher no Brasil reflete um problema estrutural que vai além de atos individuais, sendo fruto de uma sociedade patriarcal historicamente construída. Nesse contexto, compreender as causas e propor soluções eficazes torna-se imperativo para a construção de uma nação verdadeiramente democrática.

Sob a perspectiva sociológica, Simone de Beauvoir, em sua obra "O Segundo Sexo", afirma que "ninguém nasce mulher, torna-se mulher". Essa concepção evidencia que a subordinação feminina é resultado de uma construção cultural que naturaliza a violência e a desigualdade de gênero. No Brasil, essa realidade se manifesta de forma alarmante: segundo a Organização Mundial da Saúde, o país ocupa a quinta posição no ranking mundial de feminicídios, com cerca de 4.500 casos por ano.

Ademais, o pensador Boaventura de Sousa Santos, ao analisar as "epistemologias do Sul", argumenta que grupos historicamente marginalizados — como as mulheres — sofrem com uma "violência epistêmica", que silencia suas vozes e perpetua sua invisibilidade social. Esse fenômeno contribui para que muitas vítimas não denunciem seus agressores, seja por medo, dependência econômica ou descrença no sistema judiciário.

Portanto, para combater a violência de gênero, é fundamental que o Estado brasileiro, por intermédio das secretarias de Segurança Pública e do Ministério da Mulher, promova a capacitação obrigatória de policiais e agentes judiciários em questões de gênero, de modo a garantir o acolhimento humanizado das vítimas, além de fortalecer a aplicação da Lei Maria da Penha com a criação de mais Delegacias da Mulher em municípios de pequeno e médio porte, assegurando, assim, o direito fundamental à vida e à dignidade humana.`,

    overallAnalysis: "Esta redação exemplifica o padrão máximo do ENEM em todos os aspectos avaliados. O candidato demonstrou capacidade rara de articular repertório filosófico sofisticado, dados empíricos e argumentação densa dentro dos limites de 30 linhas. A progressão lógica entre os parágrafos é impecável: a tese apresenta o problema de forma estrutural (não superficial), o primeiro desenvolvimento usa Beauvoir para fundamentar a origem cultural da violência, o segundo aprofunda com Santos para explicar a invisibilidade das vítimas, e a conclusão propõe uma intervenção que ataca exatamente esses dois problemas identificados. Isso demonstra coerência global raramente vista nas redações do ENEM.",

    competencyAnalysis: [
      {
        score: 200,
        label: "C1 — Domínio da Norma Culta",
        summary: "Zero desvios gramaticais. Registro formal impecável do início ao fim.",
        detailedAnalysis: "A redação apresenta domínio absoluto da norma culta da língua portuguesa. Não há nenhum desvio de concordância verbal ou nominal, nem erros de regência, ortografia ou acentuação. O candidato demonstrou segurança no uso de estruturas sintáticas complexas — como o período composto por subordinação no último parágrafo — sem cometer erros. O uso de travessão para inserir aposto explicativo ('— como as mulheres —') revela conhecimento preciso das normas de pontuação. A pontuação ao longo de todo o texto é utilizada com intencionalidade: as vírgulas organizam corretamente os adjuntos adverbiais deslocados e as orações subordinadas.",
        textEvidence: "\"Esse fenômeno contribui para que muitas vítimas não denunciem seus agressores, seja por medo, dependência econômica ou descrença no sistema judiciário.\" — Período com oração subordinada substantiva objetiva direta + enumeração com pontuação perfeita.",
        whatWorked: [
          "Zero erros gramaticais em toda a extensão do texto",
          "Uso correto e preciso de travessão para aposto",
          "Estruturas sintáticas complexas sem nenhum desvio",
          "Pontuação funcional que auxilia a clareza, não confunde",
          "Registro formal sustentado do início ao fim sem rupturas",
        ],
        toImprove: [
          "Nota máxima — nenhum ponto de melhoria identificado nesta competência",
        ],
      },
      {
        score: 200,
        label: "C2 — Compreensão da Proposta",
        summary: "Abordagem temática precisa, sem tangenciar. Repertório sociocultural de alto nível.",
        detailedAnalysis: "O candidato demonstrou compreensão plena do tema proposto — 'Combate à violência contra a mulher' — e foi além da superficialidade que compromete muitas redações. Em vez de simplesmente descrever o problema, a redação trata a violência como fenômeno estrutural e cultural, o que demonstra leitura crítica e maturidade intelectual. O repertório sociocultural selecionado é extraordinariamente pertinente: Simone de Beauvoir não apenas é uma referência reconhecida, mas sua teoria de que o feminino é uma construção social se conecta diretamente à raiz do problema. A citação direta da filósofa ('ninguém nasce mulher, torna-se mulher') foi inserida de forma contextualizada, sem parecer forçada. O dado da OMS reforça o argumento com evidência empírica concreta. Boaventura de Sousa Santos, no segundo desenvolvimento, amplia a perspectiva para o silenciamento estrutural das vítimas — uma conexão sofisticada que vai além do óbvio.",
        textEvidence: "\"Simone de Beauvoir, em sua obra 'O Segundo Sexo', afirma que 'ninguém nasce mulher, torna-se mulher'\" — Citação direta com indicação de obra e autor, inserida de forma integrada ao argumento.",
        whatWorked: [
          "Tema abordado em sua dimensão estrutural, não apenas superficial",
          "Dois filósofos de alto nível (Beauvoir + Santos) usados de forma pertinente e integrada",
          "Dado estatístico concreto da OMS para embasar empiricamente o argumento",
          "Citação direta integrada ao argumento, não apenas decorativa",
          "Variedade de repertório: filosofia + dados + pensamento social contemporâneo",
        ],
        toImprove: [
          "Nota máxima — nenhum ponto de melhoria identificado nesta competência",
        ],
      },
      {
        score: 200,
        label: "C3 — Seleção e Organização de Argumentos",
        summary: "Argumentação densa, estruturada e progressiva. Nenhum parágrafo desperdiça espaço.",
        detailedAnalysis: "A estrutura argumentativa desta redação segue uma lógica sofisticada: o primeiro parágrafo de desenvolvimento usa Beauvoir para explicar a origem cultural da violência (causa histórica), enquanto o segundo usa Santos para explicar por que as vítimas não conseguem escapar do ciclo (manutenção do problema). Essa progressão — causa → perpetuação → solução — é exatamente o tipo de raciocínio que os avaliadores do ENEM buscam. Cada argumento é completo: apresenta a referência, desenvolve a ideia, aplica ao contexto brasileiro e conecta ao tema. O candidato não cometeu o erro comum de simplesmente citar um autor sem desenvolver o raciocínio. A redação não tem 'parágrafos de preenchimento' — cada linha carrega informação relevante.",
        textEvidence: "\"Esse fenômeno contribui para que muitas vítimas não denunciem seus agressores, seja por medo, dependência econômica ou descrença no sistema judiciário.\" — Análise causal que aprofunda o argumento de Santos, aplicando-o à realidade brasileira.",
        whatWorked: [
          "Argumentação em progressão lógica: causa histórica → perpetuação atual → solução",
          "Cada parágrafo é completo: referência + desenvolvimento + aplicação ao Brasil",
          "Ausência de parágrafos de preenchimento ou repetição de ideias",
          "Os dois argumentos se complementam e se reforçam mutuamente",
          "Raciocínio causal explícito: explica o 'porquê', não apenas descreve o 'o quê'",
        ],
        toImprove: [
          "Nota máxima — nenhum ponto de melhoria identificado nesta competência",
        ],
      },
      {
        score: 200,
        label: "C4 — Coesão Textual",
        summary: "Conectivos variados e funcionais. Progressão temática perfeita entre os parágrafos.",
        detailedAnalysis: "A coesão desta redação é um modelo a ser estudado. O candidato utilizou cinco estratégias de coesão diferentes: conectivos de adição ('Ademais'), conectivos de conclusão ('Portanto'), retomada por pronome ('Esse fenômeno'), retomada por sinônimo contextual ('a subordinação feminina' retoma 'mulher' do parágrafo anterior) e progressão temática por encadeamento de ideias. Nenhum conectivo é repetido, o que demonstra domínio vocabular. A transição entre o primeiro e o segundo parágrafo de desenvolvimento é especialmente elegante: 'Ademais, o pensador Boaventura...' adiciona uma nova camada ao argumento sem quebrar a fluidez. O texto pode ser lido de uma só vez, sem que o leitor perca o fio condutor.",
        textEvidence: "Conectivos usados: 'Nesse contexto' (intro→dev1), 'Ademais' (dev1→dev2), 'Portanto' (dev2→conclusão) — três conectivos diferentes, cada um com função distinta e precisa.",
        whatWorked: [
          "Três conectivos diferentes para ligar os quatro parágrafos — sem repetição",
          "Retomada anafórica precisa: 'Esse fenômeno' retoma 'violência epistêmica' do período anterior",
          "Progressão temática clara: cada parágrafo avança o raciocínio",
          "Uso de sinônimos contextuais evita repetição lexical",
          "Fluidez total na leitura — o texto 'flui' naturalmente do início ao fim",
        ],
        toImprove: [
          "Nota máxima — nenhum ponto de melhoria identificado nesta competência",
        ],
      },
      {
        score: 200,
        label: "C5 — Proposta de Intervenção",
        summary: "Proposta completa com todos os 5 elementos exigidos. Específica e respeitosa aos direitos humanos.",
        detailedAnalysis: "A proposta de intervenção é, possivelmente, o elemento mais difícil de dominar na redação ENEM, e este candidato a executou com maestria. Todos os cinco elementos exigidos estão presentes de forma articulada: (1) Agente — 'o Estado brasileiro, por intermédio das secretarias de Segurança Pública e do Ministério da Mulher'; (2) Ação — 'promova a capacitação obrigatória de policiais e agentes judiciários'; (3) Modo/Meio — 'em questões de gênero'; (4) Finalidade — 'garantir o acolhimento humanizado das vítimas'; (5) Detalhamento — 'criação de mais Delegacias da Mulher em municípios de pequeno e médio porte'. A proposta ainda respeita integralmente os direitos humanos, não sugerindo nenhuma ação que criminalize ou estigmatize vítimas. Além disso, ela se articula diretamente com os problemas identificados nos parágrafos de desenvolvimento — a incapacidade de denúncia por descrença no sistema judiciário é atacada pela capacitação dos agentes.",
        textEvidence: "\"o Estado brasileiro, por intermédio das secretarias de Segurança Pública e do Ministério da Mulher, promova a capacitação obrigatória de policiais e agentes judiciários em questões de gênero, de modo a garantir o acolhimento humanizado das vítimas\" — Agente + Ação + Meio + Finalidade em uma única sentença articulada.",
        whatWorked: [
          "Todos os 5 elementos presentes: agente, ação, modo, finalidade e detalhamento",
          "Proposta articulada com o problema identificado no texto (descrença no judiciário)",
          "Agente específico: não apenas 'o governo', mas secretarias e ministério determinados",
          "Respeito total aos direitos humanos — sem criminalizações ou ações coercitivas",
          "Proposta viável, concreta e mensurável (criação de delegacias em municípios específicos)",
        ],
        toImprove: [
          "Nota máxima — nenhum ponto de melhoria identificado nesta competência",
        ],
      },
    ],

    paragraphAnnotations: [
      {
        index: 0,
        label: "Introdução — Tese",
        labelColor: "text-blue-400",
        borderColor: "border-blue-500/30",
        bgColor: "bg-blue-500/5",
        structure: "Contextualização + Tese + Justificativa",
        technique: "Abertura por definição estrutural do problema",
        explanation: "O candidato abre com uma afirmação de alto impacto ('problema estrutural que vai além de atos individuais'), posicionando imediatamente a tese em nível analítico superior. Evita o erro comum de começar com 'Desde os primórdios...' ou com definição de dicionário. A tese é clara ('sociedade patriarcal historicamente construída') e já indica o viés sociológico da argumentação. A justificativa ('imperativo para a construção de uma nação verdadeiramente democrática') conecta o tema a um valor universal, ampliando a relevância.",
      },
      {
        index: 1,
        label: "Desenvolvimento 1 — Causa Histórica",
        labelColor: "text-purple-400",
        borderColor: "border-purple-500/30",
        bgColor: "bg-purple-500/5",
        structure: "Referência filosófica + Citação direta + Desenvolvimento da ideia + Dado empírico",
        technique: "Argumento por autoridade + evidência estatística",
        explanation: "Modelo exemplar de parágrafo argumentativo. Segue a estrutura: (1) apresenta a referência com obra ('em sua obra...'), (2) cita diretamente, (3) desenvolve a implicação da citação para o tema, (4) ancora com dado da OMS. A citação de Beauvoir não é decorativa — ela é a prova da afirmação feita na tese sobre 'construção cultural'. O dado da OMS (5ª posição em feminicídios) transforma o argumento filosófico em urgência concreta. Esta combinação filosofia+estatística é a fórmula mais eficaz para C2.",
      },
      {
        index: 2,
        label: "Desenvolvimento 2 — Perpetuação",
        labelColor: "text-cyan-400",
        borderColor: "border-cyan-500/30",
        bgColor: "bg-cyan-500/5",
        structure: "Conectivo de adição + Nova referência + Conceito específico + Aplicação ao Brasil",
        technique: "Argumento por aprofundamento — explica o 'porquê' do ciclo de violência",
        explanation: "Este parágrafo é mais sofisticado que o anterior porque explica o mecanismo de perpetuação, não apenas descreve o problema. Boaventura de Sousa Santos é usado para introduzir o conceito de 'violência epistêmica' — um termo técnico que eleva o nível intelectual do texto. A aplicação ao Brasil é direta e específica: o fenômeno explica por que as vítimas não denunciam. O candidato lista três causas concretas (medo, dependência econômica, descrença no judiciário) — essa enumeração é precisa e evita a vagueza.",
      },
      {
        index: 3,
        label: "Conclusão — Proposta de Intervenção",
        labelColor: "text-green-400",
        borderColor: "border-green-500/30",
        bgColor: "bg-green-500/5",
        structure: "Conectivo conclusivo + Agente + Ação + Modo + Finalidade + Detalhamento + Fechamento com valor",
        technique: "Proposta articulada com o problema identificado no texto",
        explanation: "A conclusão mais bem estruturada possível. Começa com 'Portanto' que sinaliza ao avaliador a chegada à solução. A proposta ataca diretamente o problema identificado no parágrafo anterior (descrença no judiciário → capacitação dos agentes). O candidato especificou os agentes ('secretarias de Segurança Pública e Ministério da Mulher'), não apenas 'o governo'. O detalhamento geográfico ('municípios de pequeno e médio porte') demonstra consciência da desigualdade de acesso às instituições. Fecha com referência aos direitos fundamentais, garantindo que a proposta respeita os direitos humanos.",
      },
    ],

    keyTechniques: [
      "Abertura estrutural: tese que identifica a causa profunda do problema, não apenas descreve o fenômeno",
      "Combinação de repertório filosófico + dado estatístico no mesmo parágrafo para máxima persuasão",
      "Uso de citação direta integrada ao argumento, não apenas como enfeite",
      "Progressão argumentativa: causa (Beauvoir) → perpetuação (Santos) → solução (proposta)",
      "Proposta de intervenção que responde diretamente aos problemas identificados no texto",
      "Conectivos variados e funcionais: 'Nesse contexto', 'Ademais', 'Portanto'",
    ],

    vocabularyHighlights: [
      "\"problema estrutural\" — indica análise de sistema, não de indivíduos",
      "\"sociedade patriarcal historicamente construída\" — vocabulário sociológico preciso",
      "\"violência epistêmica\" — termo técnico de alto impacto intelectual",
      "\"invisibilidade social\" — conceito pertinente à discussão de grupos marginalizados",
      "\"imperativo\" — escolha lexical formal que substitui 'necessário'",
      "\"por intermédio de\" — regência nominal formal correta",
    ],

    strategicLessons: [
      "Nunca comece a tese descrevendo o óbvio. Posicione-a em nível analítico desde a primeira linha.",
      "Um dado estatístico de fonte reconhecida (OMS, IBGE, ONU) no primeiro desenvolvimento vale mais que dois argumentos vazios.",
      "A proposta de intervenção deve atacar o problema que você identificou no texto, não um problema genérico.",
      "Conectivos variados não são opcionais — são parte da avaliação formal em C4.",
      "Citar um autor com obra ('em sua obra X, Y afirma...') vale mais que citar sem referência.",
    ],
  },

  {
    id: "me2",
    title: "Democracia em xeque: desinformação e cidadania",
    theme: "Manipulação do comportamento do usuário pelo controle de dados",
    enEmYear: 2017,
    score: 960,
    competency1: 200,
    competency2: 200,
    competency3: 160,
    competency4: 200,
    competency5: 200,
    repertoires: ["Hannah Arendt — A Condição Humana", "Zygmunt Bauman — Modernidade Líquida", "Umberto Eco — Apocalípticos e Integrados", "Reuters Institute Digital News Report 2023"],
    tags: ["democracia", "tecnologia", "desinformação", "política"],
    slug: "democracia-desinformacao-960",

    content: `A consolidação da democracia depende, fundamentalmente, de cidadãos capazes de discernir informações verdadeiras de falsas. No entanto, a manipulação algorítmica de dados nas redes sociais tem comprometido essa capacidade, ao criar realidades paralelas que distorcem a percepção pública — fenômeno que ameaça as bases do regime democrático contemporâneo.

Hannah Arendt, em "A Condição Humana", afirma que a vida pública depende do compartilhamento de um mundo comum de fatos. Quando esse mundo é fragmentado por câmaras de eco digitais — nas quais algoritmos apresentam apenas conteúdos que reforçam crenças preexistentes —, a capacidade de deliberação coletiva é progressivamente erodida. Dados do Reuters Institute (2023) confirmam que 64% dos brasileiros já foram expostos a notícias falsas que influenciaram sua percepção sobre eventos políticos.

Outrossim, Zygmunt Bauman, ao analisar a "modernidade líquida", argumenta que as identidades na era digital tornam-se maleáveis e facilmente manipuláveis por plataformas que monetizam o engajamento emocional. Esse mecanismo foi evidenciado no escândalo Cambridge Analytica (2018), no qual dados de 87 milhões de usuários foram usados para microssegmentar conteúdo político, influenciando eleições em múltiplos países.

Diante disso, cabe ao Congresso Nacional, em colaboração com o Tribunal Superior Eleitoral, regulamentar o uso de dados pessoais em campanhas políticas, mediante a criação de legislação específica que obrigue plataformas digitais a auditorias algorítmicas independentes, com o objetivo de garantir a transparência dos mecanismos de distribuição de conteúdo e preservar a integridade do processo democrático.`,

    overallAnalysis: "Esta redação alcançou 960 pontos — nota altíssima — com destaque para C1, C2, C4 e C5 perfeitos. O único ponto de desconto foi em C3 (160 em vez de 200), onde o segundo parágrafo de desenvolvimento apresentou o caso Cambridge Analytica de forma descritiva, sem desenvolver suficientemente a análise crítica. A redação demonstra domínio de repertório contemporâneo e sofisticado, com o diferencial de usar um dado jornalístico recente (Reuters 2023) combinado com um caso histórico concreto (Cambridge Analytica). A proposta de intervenção é técnica e precisa, demonstrando conhecimento institucional.",

    competencyAnalysis: [
      {
        score: 200,
        label: "C1 — Domínio da Norma Culta",
        summary: "Escrita formal perfeita. Zero desvios. Vocabulário técnico preciso.",
        detailedAnalysis: "O texto mantém registro formal elevado do início ao fim, com uso correto de todas as regras gramaticais. Destaque para o uso preciso de travessão para inserção de explicação ('— nas quais algoritmos apresentam apenas conteúdos que reforçam crenças preexistentes —') e o emprego correto de 'mediante a criação de', que exige preposição. O vocabulário técnico — 'deliberação coletiva', 'câmaras de eco', 'microssegmentar', 'auditorias algorítmicas' — é usado com precisão, demonstrando que o candidato não apenas conhece os termos, mas compreende seu significado e sabe empregá-los em contexto.",
        textEvidence: "\"progressivamente erodida\" — uso de advérbio de modo para qualificar o processo, demonstrando sensibilidade à nuance semântica.",
        whatWorked: [
          "Zero desvios gramaticais em toda a extensão",
          "Uso correto de travessão para aposto explicativo complexo",
          "Vocabulário técnico do campo da tecnologia e política usado com precisão",
          "Construções sintáticas complexas sem erros",
          "Registro formal mantido inclusive nos termos técnicos ('microssegmentar', 'algorítmicas')",
        ],
        toImprove: [
          "Nota máxima — nenhum ponto de melhoria identificado",
        ],
      },
      {
        score: 200,
        label: "C2 — Compreensão da Proposta",
        summary: "Leitura crítica precisa da proposta. Repertório atualizado e altamente pertinente.",
        detailedAnalysis: "O candidato demonstrou leitura sofisticada do tema, identificando que 'manipulação de dados' vai além da privacidade e atinge a democracia. Essa conexão — dados → democracia — é o nível de análise que distingue redações boas de excelentes. O repertório escolhido é primoroso: Hannah Arendt fornece base filosófica para o conceito de esfera pública; Bauman fornece análise sociológica da identidade líquida; o dado do Reuters Institute (2023) traz contemporaneidade; e Cambridge Analytica oferece evidência histórica concreta. São quatro tipos de repertório diferentes — filosófico, sociológico, estatístico e histórico — o que demonstra amplitude intelectual.",
        textEvidence: "\"câmaras de eco digitais — nas quais algoritmos apresentam apenas conteúdos que reforçam crenças preexistentes\" — Explicação técnica do mecanismo, demonstrando compreensão profunda do fenômeno proposto.",
        whatWorked: [
          "Conexão tema → democracia feita de forma analítica e fundamentada",
          "Quatro tipos distintos de repertório: filosófico + sociológico + estatístico + histórico",
          "Dado do Reuters Institute atualizado (2023) demonstra pesquisa e atualidade",
          "Cambridge Analytica como caso concreto e verificável",
          "Conceito de 'câmara de eco' explicado tecnicamente, não apenas citado",
        ],
        toImprove: [
          "Nota máxima — nenhum ponto de melhoria identificado",
        ],
      },
      {
        score: 160,
        label: "C3 — Seleção e Organização de Argumentos",
        summary: "Argumentação sólida, mas o 2º desenvolvimento ficou mais descritivo do que analítico.",
        detailedAnalysis: "A C3 recebeu 160 em vez de 200 por uma razão específica: o segundo parágrafo de desenvolvimento, apesar de citar Bauman e Cambridge Analytica, priorizou a descrição do caso em vez de desenvolver a análise crítica. O avaliador identificou que o candidato apresentou 'dados de 87 milhões de usuários' e 'influenciou eleições em múltiplos países' sem analisar por que isso é estruturalmente possível dentro do modelo de negócio das plataformas. Em contraste, o primeiro desenvolvimento com Arendt apresentou análise completa: referência → conceito → aplicação → consequência. O segundo parágrafo parou na evidência sem fazer a análise causal que levaria à nota máxima.",
        textEvidence: "\"no qual dados de 87 milhões de usuários foram usados para microssegmentar conteúdo político, influenciando eleições em múltiplos países\" — Descrição correta do fato, mas sem análise do mecanismo que o tornou possível e das implicações estruturais.",
        whatWorked: [
          "Primeiro desenvolvimento com Arendt é modelo de argumentação completa",
          "Uso de caso histórico concreto (Cambridge Analytica) como evidência",
          "Bauman é pertinente e bem apresentado",
          "A estrutura geral da argumentação é coerente",
        ],
        toImprove: [
          "O segundo desenvolvimento deveria ir além da descrição: analisar por que o modelo de negócio das plataformas incentiva a manipulação",
          "Faltou conectar o caso Cambridge Analytica à análise de Bauman de forma explícita",
          "Para atingir 200 em C3, cada parágrafo precisa ter: referência → análise → implicação → conexão com tese",
          "A análise causal (por que isso acontece?) estava presente no P1 mas ausente no P2",
        ],
      },
      {
        score: 200,
        label: "C4 — Coesão Textual",
        summary: "Progressão temática impecável. Conectivos variados e funcionais.",
        detailedAnalysis: "A coesão é um dos pontos mais fortes desta redação. O candidato usou quatro conectivos diferentes com funções distintas: 'No entanto' (oposição entre ideal democrático e realidade digital), 'Outrossim' (adição de argumento, mais formal que 'além disso'), 'Diante disso' (conclusão que retoma o diagnóstico). A retomada anafórica é precisa: 'Esse mecanismo' retoma com clareza o processo de monetização do engajamento descrito na frase anterior. O texto tem fluidez total — cada parágrafo começa onde o anterior terminou, sem saltos lógicos.",
        textEvidence: "Sequência: 'No entanto' → 'Outrossim' → 'Diante disso' — três conectivos de funções distintas (oposição, adição, conclusão) que guiam o leitor pela estrutura do texto.",
        whatWorked: [
          "'Outrossim' como alternativa elevada a 'além disso' — demonstra domínio vocabular",
          "'No entanto' posicionado após a tese cria tensão argumentativa eficaz",
          "Retomada anafórica precisa com 'Esse mecanismo'",
          "Progressão lógica clara: problema → causa 1 → causa 2 → solução",
          "Nenhum conectivo repetido em toda a extensão do texto",
        ],
        toImprove: [
          "Nota máxima — nenhum ponto de melhoria identificado",
        ],
      },
      {
        score: 200,
        label: "C5 — Proposta de Intervenção",
        summary: "Proposta técnica e institucional, com todos os elementos presentes e articulados.",
        detailedAnalysis: "A proposta de intervenção recebeu nota máxima por sua especificidade institucional e articulação com o problema identificado. O candidato nomeou os agentes corretamente: 'Congresso Nacional' (legislar) e 'Tribunal Superior Eleitoral' (fiscalizar eleições) — demonstrando conhecimento do papel de cada instituição. A ação proposta ('regulamentar o uso de dados pessoais em campanhas políticas') ataca exatamente o mecanismo descrito no texto (Cambridge Analytica). O modo de execução ('auditorias algorítmicas independentes') é tecnicamente específico. A finalidade ('preservar a integridade do processo democrático') conecta-se diretamente à tese. Esta proposta seria considerada viável no mundo real.",
        textEvidence: "\"Congresso Nacional, em colaboração com o Tribunal Superior Eleitoral, regulamentar o uso de dados pessoais em campanhas políticas\" — Dois agentes com papéis complementares e ação específica.",
        whatWorked: [
          "Dois agentes institucionais específicos com papéis complementares",
          "Ação diretamente relacionada ao problema identificado no texto",
          "Modo técnico e específico: 'auditorias algorítmicas independentes'",
          "Proposta viável e não viola direitos humanos",
          "Finalidade conectada à tese inicial (democracia)",
        ],
        toImprove: [
          "Nota máxima — nenhum ponto de melhoria identificado",
        ],
      },
    ],

    paragraphAnnotations: [
      {
        index: 0,
        label: "Introdução — Tese",
        labelColor: "text-blue-400",
        borderColor: "border-blue-500/30",
        bgColor: "bg-blue-500/5",
        structure: "Premissa universal → Contraponto (No entanto) → Tese com conceito central",
        technique: "Abertura por tensão: o ideal versus a realidade",
        explanation: "Técnica sofisticada de introdução: apresenta uma verdade universal aceita ('democracia depende de cidadãos capazes de discernir') e imediatamente confronta com a realidade atual ('No entanto, a manipulação algorítmica...'). Essa tensão prende o leitor e posiciona o problema de forma crítica. A tese contém o conceito-chave ('realidades paralelas') que será desenvolvido nos parágrafos seguintes.",
      },
      {
        index: 1,
        label: "Desenvolvimento 1 — Base Filosófica",
        labelColor: "text-purple-400",
        borderColor: "border-purple-500/30",
        bgColor: "bg-purple-500/5",
        structure: "Arendt (obra + conceito) → Aplicação ao digital → Dado estatístico",
        technique: "Argumento completo: filosofia + contemporaneidade + evidência",
        explanation: "Parágrafo exemplar. Arendt é usada para fundamentar por que a fragmentação informacional é problema democrático (não apenas individual). O conceito de 'câmara de eco' é explicado tecnicamente entre travessões. O dado do Reuters Institute (2023) traz credibilidade empírica. Esta é a estrutura perfeita de C3: filosofia → aplicação → evidência → impacto.",
      },
      {
        index: 2,
        label: "Desenvolvimento 2 — Evidência Histórica",
        labelColor: "text-cyan-400",
        borderColor: "border-cyan-500/30",
        bgColor: "bg-cyan-500/5",
        structure: "Bauman (conceito) → Caso histórico (Cambridge Analytica)",
        technique: "Argumento por exemplo histórico concreto",
        explanation: "Ponto de melhoria: O parágrafo apresenta Bauman e Cambridge Analytica, mas a conexão entre eles poderia ser mais explícita. Bauman explica que identidades são maleáveis, mas o texto não articula claramente como isso permite a manipulação algorítmica. O caso Cambridge Analytica é descrito corretamente, mas a análise do 'por quê foi possível' está ausente. Para 200 em C3, precisaria de: Bauman → como seu conceito explica Cambridge Analytica → implicação estrutural para a democracia.",
      },
      {
        index: 3,
        label: "Conclusão — Proposta de Intervenção",
        labelColor: "text-green-400",
        borderColor: "border-green-500/30",
        bgColor: "bg-green-500/5",
        structure: "Conectivo conclusivo + Dois agentes + Ação + Modo técnico + Finalidade democrática",
        technique: "Proposta institucional com dois agentes complementares",
        explanation: "Proposta de alto nível institucional. O candidato demonstrou conhecimento do sistema político ao escolher o Congresso (para legislar) e o TSE (para fiscalizar eleições especificamente). O modo — 'auditorias algorítmicas independentes' — é o ponto mais técnico e específico da proposta, o que garante a nota máxima em C5.",
      },
    ],

    keyTechniques: [
      "Abertura por tensão (ideal vs realidade) — prende o leitor e posiciona o problema de forma crítica",
      "Quatro tipos de repertório no mesmo texto: filosófico, sociológico, estatístico e histórico",
      "Dado estatístico recente (2023) demonstra atualização e pesquisa",
      "Caso histórico concreto (Cambridge Analytica) como evidência verificável",
      "'Outrossim' como alternativa elegante a 'além disso'",
      "Dois agentes institucionais complementares na proposta de intervenção",
    ],

    vocabularyHighlights: [
      "\"deliberação coletiva\" — termo da teoria democrática, substitui 'discussão pública'",
      "\"progressivamente erodida\" — escolha precisa que indica processo gradual",
      "\"câmaras de eco digitais\" — conceito técnico da sociologia digital",
      "\"microssegmentar\" — verbo técnico do campo do marketing político",
      "\"auditorias algorítmicas independentes\" — terminologia específica da regulação de plataformas",
      "\"Outrossim\" — conectivo formal de adição, mais elegante que 'além disso'",
    ],

    strategicLessons: [
      "Para C3 máximo, cada argumento deve seguir: referência → análise → implicação → conexão com tese. Evidência sem análise vale menos.",
      "Dados recentes (último ano) têm mais impacto que dados desatualizados — pesquise antes de escrever.",
      "Ao citar casos históricos, vá além da descrição: analise por que o caso ocorreu e o que ele revela estruturalmente.",
      "Dois agentes institucionais na proposta demonstram conhecimento e valem mais que um agente genérico.",
      "A abertura por tensão (premissa + 'No entanto') é uma das técnicas mais eficazes para introduções no ENEM.",
    ],
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
    id: "rc2",
    type: "essay" as const,
    title: "Democracia em xeque: desinformação e cidadania",
    subtitle: "Redação nota 960 — estude a C4",
    href: "/redacoes-modelo/democracia-desinformacao-960",
    badge: "960 pts",
    badgeColor: "text-blue-400 bg-blue-500/10",
    meta: "ENEM 2017",
    priority: false,
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
