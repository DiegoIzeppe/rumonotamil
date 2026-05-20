export interface Theme {
  title: string;
  context: string;
  tags: string[];
  difficulty: "Fácil" | "Médio" | "Difícil";
  category: string;
  trending?: boolean;
  enemYear?: string;
}

export const TRENDING_THEMES: Theme[] = [
  {
    title: "Crise da Saúde Mental na Era Digital",
    context: "O crescimento de transtornos psicológicos entre jovens associado ao uso excessivo de redes sociais.",
    tags: ["saúde", "tecnologia", "juventude"],
    difficulty: "Médio",
    category: "Saúde",
    trending: true,
  },
  {
    title: "Desinformação e Democracia no Brasil",
    context: "A disseminação de fake news e seus impactos na participação política e no processo democrático.",
    tags: ["política", "comunicação", "direitos"],
    difficulty: "Médio",
    category: "Política",
    trending: true,
  },
  {
    title: "Invisibilidade do Trabalho Doméstico Feminino",
    context: "O não reconhecimento social e econômico do trabalho realizado por mulheres no ambiente doméstico.",
    tags: ["gênero", "trabalho", "desigualdade"],
    difficulty: "Difícil",
    category: "Gênero",
    enemYear: "ENEM 2023",
  },
  {
    title: "Racismo Estrutural e Mercado de Trabalho",
    context: "As barreiras sistêmicas que dificultam a ascensão de pessoas negras no ambiente profissional.",
    tags: ["raça", "trabalho", "desigualdade"],
    difficulty: "Difícil",
    category: "Direitos",
    trending: true,
  },
  {
    title: "IA e Manipulação Comportamental nas Redes",
    context: "O uso de algoritmos e inteligência artificial para influenciar decisões e comportamentos humanos.",
    tags: ["tecnologia", "ética", "privacidade"],
    difficulty: "Difícil",
    category: "Tecnologia",
    trending: true,
  },
  {
    title: "Desafios da Educação Inclusiva no Brasil",
    context: "As dificuldades de integrar alunos com deficiência no sistema regular de ensino com qualidade.",
    tags: ["educação", "inclusão", "direitos"],
    difficulty: "Médio",
    category: "Educação",
    enemYear: "ENEM 2022",
  },
  {
    title: "Impactos Ambientais do Agronegócio Brasileiro",
    context: "A tensão entre crescimento econômico do setor agrícola e a preservação dos biomas nacionais.",
    tags: ["meio ambiente", "economia", "sustentabilidade"],
    difficulty: "Médio",
    category: "Meio Ambiente",
  },
  {
    title: "Populações Indígenas e Direito à Terra",
    context: "A luta dos povos originários pela demarcação de territórios e preservação de suas culturas.",
    tags: ["direitos", "cultura", "política"],
    difficulty: "Difícil",
    category: "Direitos",
    enemYear: "ENEM 2023",
  },
  {
    title: "Desigualdade Social e Acesso à Internet",
    context: "A exclusão digital como fator de aprofundamento das desigualdades socioeconômicas no Brasil.",
    tags: ["tecnologia", "desigualdade", "educação"],
    difficulty: "Fácil",
    category: "Tecnologia",
  },
  {
    title: "Saúde Pública e Desafios do SUS",
    context: "As limitações estruturais do sistema público de saúde diante das demandas crescentes da população.",
    tags: ["saúde", "política pública", "direitos"],
    difficulty: "Médio",
    category: "Saúde",
  },
  {
    title: "Violência contra a Mulher no Brasil",
    context: "A persistência de práticas violentas contra mulheres e as insuficiências do aparato legal de proteção.",
    tags: ["gênero", "violência", "direitos"],
    difficulty: "Médio",
    category: "Gênero",
    enemYear: "ENEM 2015",
  },
  {
    title: "Crise Climática e Responsabilidade Coletiva",
    context: "Os impactos das mudanças climáticas e o papel dos Estados, empresas e cidadãos no combate.",
    tags: ["meio ambiente", "política", "ciência"],
    difficulty: "Médio",
    category: "Meio Ambiente",
    trending: true,
  },
];

/** Returns the weekly theme based on ISO week number — rotates every Monday. */
export function getWeeklyTheme(): Theme {
  const now = new Date();
  const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNum = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  return TRENDING_THEMES[weekNum % TRENDING_THEMES.length];
}
