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

  // ── EM ALTA ──────────────────────────────────────────────────────────────

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

  // ── TEMAS ENEM OFICIAIS ───────────────────────────────────────────────────

  {
    title: "Desafios para o combate à invisibilidade do trabalho de cuidado realizado pela mulher no Brasil",
    context: "O trabalho doméstico e de cuidado realizado majoritariamente por mulheres é subvalorizado social e economicamente, perpetuando desigualdades de gênero.",
    tags: ["gênero", "trabalho", "desigualdade"],
    difficulty: "Difícil",
    category: "Gênero",
    enemYear: "ENEM 2023",
  },
  {
    title: "Desafios para a valorização de comunidades e povos tradicionais no Brasil",
    context: "Comunidades quilombolas, indígenas e ribeirinhas enfrentam ameaças territoriais, culturais e econômicas que comprometem sua sobrevivência.",
    tags: ["direitos", "cultura", "diversidade"],
    difficulty: "Difícil",
    category: "Direitos",
    enemYear: "ENEM 2022",
  },
  {
    title: "Invisibilidade e registro civil: ser invisível na sociedade brasileira",
    context: "Milhares de brasileiros não possuem certidão de nascimento, impedindo o acesso a direitos básicos como saúde, educação e previdência.",
    tags: ["direitos", "desigualdade", "cidadania"],
    difficulty: "Médio",
    category: "Direitos",
    enemYear: "ENEM 2021",
  },
  {
    title: "O estigma associado às doenças mentais na sociedade brasileira",
    context: "O preconceito em torno de transtornos mentais dificulta o diagnóstico, o tratamento e a reintegração social de quem sofre com essas condições.",
    tags: ["saúde", "preconceito", "sociedade"],
    difficulty: "Médio",
    category: "Saúde",
    enemYear: "ENEM 2019",
  },
  {
    title: "Manipulação do comportamento do usuário pelo controle de dados na internet",
    context: "Plataformas digitais coletam e exploram dados pessoais para influenciar decisões, comportamentos e até escolhas políticas dos usuários.",
    tags: ["tecnologia", "privacidade", "democracia"],
    difficulty: "Difícil",
    category: "Tecnologia",
    enemYear: "ENEM 2018",
  },
  {
    title: "Desafios para a formação educacional de surdos no Brasil",
    context: "A ausência de intérpretes de Libras e de materiais adaptados compromete o direito à educação de qualidade para a comunidade surda.",
    tags: ["educação", "inclusão", "acessibilidade"],
    difficulty: "Médio",
    category: "Educação",
    enemYear: "ENEM 2017",
  },
  {
    title: "Caminhos para combater a intolerância religiosa no Brasil",
    context: "A persistência de ataques a terreiros e outras práticas de intolerância religiosa revela contradições numa sociedade que se diz plural e democrática.",
    tags: ["direitos", "religião", "tolerância"],
    difficulty: "Médio",
    category: "Direitos",
    enemYear: "ENEM 2016",
  },
  {
    title: "A persistência da violência contra a mulher na sociedade brasileira",
    context: "Apesar da Lei Maria da Penha e do avanço legislativo, os índices de feminicídio e violência doméstica permanecem alarmantes no Brasil.",
    tags: ["gênero", "violência", "direitos"],
    difficulty: "Médio",
    category: "Gênero",
    enemYear: "ENEM 2015",
  },
  {
    title: "Publicidade infantil em questão no Brasil",
    context: "A exposição de crianças a publicidade agressiva influencia hábitos de consumo, alimentação e autoimagem desde a infância.",
    tags: ["consumo", "infância", "comunicação"],
    difficulty: "Fácil",
    category: "Cultura",
    enemYear: "ENEM 2014",
  },
  {
    title: "O efeito da implantação da Lei Seca no Brasil",
    context: "A proibição do consumo de álcool antes de dirigir reduziu mortes no trânsito, mas levanta questões sobre efetividade, fiscalização e liberdade individual.",
    tags: ["segurança", "saúde", "legislação"],
    difficulty: "Fácil",
    category: "Saúde",
    enemYear: "ENEM 2013",
  },
  {
    title: "O movimento imigratório para o Brasil no século XXI",
    context: "O Brasil recebe fluxos crescentes de haitianos, venezuelanos e africanos, gerando tensões sobre integração, xenofobia e políticas migratórias.",
    tags: ["imigração", "direitos", "diversidade"],
    difficulty: "Médio",
    category: "Direitos",
    enemYear: "ENEM 2012",
  },
  {
    title: "Viver em rede no século XXI: os limites entre o público e o privado",
    context: "As redes sociais borram as fronteiras entre vida pública e privada, com impactos para a privacidade, a identidade e as relações interpessoais.",
    tags: ["tecnologia", "privacidade", "identidade"],
    difficulty: "Médio",
    category: "Tecnologia",
    enemYear: "ENEM 2011",
  },
  {
    title: "O trabalho na construção da dignidade humana",
    context: "O acesso ao trabalho digno e bem remunerado é condição fundamental para o exercício pleno da cidadania e o desenvolvimento humano.",
    tags: ["trabalho", "dignidade", "direitos"],
    difficulty: "Fácil",
    category: "Trabalho",
    enemYear: "ENEM 2010",
  },

  // ── TECNOLOGIA E SOCIEDADE ────────────────────────────────────────────────

  {
    title: "O papel da inteligência artificial no mercado de trabalho",
    context: "A automação e os algoritmos de IA substituem funções humanas em diversas áreas, exigindo novas habilidades e políticas de requalificação profissional.",
    tags: ["tecnologia", "trabalho", "futuro"],
    difficulty: "Difícil",
    category: "Tecnologia",
    trending: true,
  },
  {
    title: "Deepfakes e a crise de confiança na informação visual",
    context: "A tecnologia de geração de vídeos falsos ameaça a autenticidade das evidências digitais e agrava a crise de desinformação nas democracias.",
    tags: ["tecnologia", "desinformação", "democracia"],
    difficulty: "Difícil",
    category: "Tecnologia",
    trending: true,
  },
  {
    title: "Desigualdade digital e exclusão social no Brasil",
    context: "O acesso desigual à internet e às tecnologias digitais aprofunda disparidades econômicas, educacionais e de oportunidades entre regiões e classes.",
    tags: ["tecnologia", "desigualdade", "educação"],
    difficulty: "Médio",
    category: "Tecnologia",
  },
  {
    title: "Impactos das redes sociais sobre a democracia",
    context: "Bolhas de filtro, câmaras de eco e desinformação nas plataformas digitais comprometem o debate plural necessário para a saúde democrática.",
    tags: ["tecnologia", "democracia", "política"],
    difficulty: "Difícil",
    category: "Tecnologia",
  },
  {
    title: "O uso de algoritmos na concessão de crédito e o racismo digital",
    context: "Sistemas automatizados de decisão reproduzem preconceitos históricos ao negar crédito, empregos e serviços a populações negras e periféricas.",
    tags: ["tecnologia", "racismo", "desigualdade"],
    difficulty: "Difícil",
    category: "Tecnologia",
  },

  // ── EDUCAÇÃO ─────────────────────────────────────────────────────────────

  {
    title: "Desafios para a universalização da educação básica no Brasil",
    context: "A evasão escolar, a desigualdade de infraestrutura e a precarização docente impedem que todos os brasileiros concluam a educação básica com qualidade.",
    tags: ["educação", "desigualdade", "políticas públicas"],
    difficulty: "Fácil",
    category: "Educação",
  },
  {
    title: "O papel das cotas raciais no ensino superior brasileiro",
    context: "As políticas de ação afirmativa ampliaram o acesso de negros e indígenas às universidades, mas ainda enfrentam resistências e debates sobre mérito e equidade.",
    tags: ["educação", "racismo", "ação afirmativa"],
    difficulty: "Difícil",
    category: "Educação",
  },
  {
    title: "Educação financeira como instrumento de cidadania",
    context: "A ausência de educação financeira nas escolas contribui para o endividamento precoce e limita a autonomia econômica dos cidadãos.",
    tags: ["educação", "economia", "cidadania"],
    difficulty: "Fácil",
    category: "Educação",
  },
  {
    title: "A crise da leitura no Brasil e seus impactos sociais",
    context: "O analfabetismo funcional afeta milhões de brasileiros, comprometendo sua participação política, econômica e cultural na sociedade.",
    tags: ["educação", "cultura", "leitura"],
    difficulty: "Fácil",
    category: "Educação",
  },

  // ── MEIO AMBIENTE ─────────────────────────────────────────────────────────

  {
    title: "Desafios para o combate às mudanças climáticas no Brasil",
    context: "O Brasil enfrenta tensões entre desenvolvimento econômico e preservação ambiental, especialmente na Amazônia, nos cerrados e nas zonas costeiras.",
    tags: ["meio ambiente", "política", "sustentabilidade"],
    difficulty: "Médio",
    category: "Meio Ambiente",
    trending: true,
  },
  {
    title: "A questão dos resíduos sólidos e o descarte inadequado de lixo no Brasil",
    context: "O país produz mais de 80 milhões de toneladas de resíduos por ano, mas menos de 5% são reciclados, sobrecarregando aterros e contaminando o meio ambiente.",
    tags: ["meio ambiente", "consumo", "saúde pública"],
    difficulty: "Fácil",
    category: "Meio Ambiente",
  },
  {
    title: "Segurança hídrica e crise da água no Brasil",
    context: "A destruição de nascentes, o desmatamento e a poluição ameaçam o abastecimento de água em diversas regiões brasileiras.",
    tags: ["meio ambiente", "direitos", "saúde"],
    difficulty: "Médio",
    category: "Meio Ambiente",
  },
  {
    title: "O papel do agronegócio no desmatamento e na crise ambiental",
    context: "A expansão da fronteira agrícola é principal vetor de desmatamento no Cerrado e na Amazônia, gerando conflito entre produção e preservação.",
    tags: ["meio ambiente", "economia", "política"],
    difficulty: "Difícil",
    category: "Meio Ambiente",
  },
  {
    title: "Energias renováveis como alternativa à crise climática",
    context: "A transição energética para fontes solar, eólica e de biomassa é urgente para reduzir emissões e garantir soberania energética ao Brasil.",
    tags: ["meio ambiente", "energia", "tecnologia"],
    difficulty: "Médio",
    category: "Meio Ambiente",
  },

  // ── SAÚDE PÚBLICA ─────────────────────────────────────────────────────────

  {
    title: "Desafios para o fortalecimento do SUS no Brasil",
    context: "O subfinanciamento, a superlotação e as desigualdades regionais comprometem a capacidade do Sistema Único de Saúde de garantir atendimento universal de qualidade.",
    tags: ["saúde", "políticas públicas", "direitos"],
    difficulty: "Médio",
    category: "Saúde",
  },
  {
    title: "A crise de saúde mental entre jovens brasileiros",
    context: "Ansiedade, depressão e ideação suicida aumentam entre adolescentes, associados à pressão acadêmica, à violência e ao uso intensivo de redes sociais.",
    tags: ["saúde", "juventude", "tecnologia"],
    difficulty: "Médio",
    category: "Saúde",
    trending: true,
  },
  {
    title: "O combate ao sedentarismo e à obesidade no Brasil",
    context: "O aumento de doenças crônicas associadas ao sedentarismo e à alimentação ultraprocessada representa desafio crescente para a saúde pública brasileira.",
    tags: ["saúde", "alimentação", "qualidade de vida"],
    difficulty: "Fácil",
    category: "Saúde",
  },
  {
    title: "O papel das fake news na resistência às vacinas",
    context: "A desinformação nas redes sociais alimenta movimentos antivacina, comprometendo a imunização coletiva e reacendendo doenças controladas.",
    tags: ["saúde", "desinformação", "tecnologia"],
    difficulty: "Médio",
    category: "Saúde",
  },

  // ── VIOLÊNCIA E SEGURANÇA ─────────────────────────────────────────────────

  {
    title: "A violência contra a população negra no Brasil",
    context: "Jovens negros são assassinados a uma taxa 2,9 vezes maior do que jovens brancos no Brasil, evidenciando o racismo como determinante da violência letal.",
    tags: ["racismo", "violência", "desigualdade"],
    difficulty: "Difícil",
    category: "Direitos",
    trending: true,
  },
  {
    title: "Desafios para a redução da violência nas escolas",
    context: "Bullying, cyberbullying, assédio e ataques violentos afetam o ambiente escolar, comprometendo o aprendizado e a saúde mental dos estudantes.",
    tags: ["educação", "violência", "juventude"],
    difficulty: "Fácil",
    category: "Educação",
  },
  {
    title: "O encarceramento em massa e o fracasso do sistema prisional",
    context: "O Brasil tem a terceira maior população carcerária do mundo. A superlotação e a ausência de ressocialização perpetuam a criminalidade.",
    tags: ["segurança", "direitos", "políticas públicas"],
    difficulty: "Difícil",
    category: "Direitos",
  },
  {
    title: "O impacto das drogas na sociedade e as políticas de combate",
    context: "A guerra às drogas no Brasil tem punido desproporcionalmente populações periféricas sem reduzir o consumo, questionando a efetividade das políticas atuais.",
    tags: ["segurança", "saúde", "direitos"],
    difficulty: "Difícil",
    category: "Segurança",
  },

  // ── DEMOCRACIA E POLÍTICA ─────────────────────────────────────────────────

  {
    title: "A desinformação como ameaça à democracia brasileira",
    context: "A proliferação de fake news nas eleições e na vida cotidiana compromete o debate público racional e a capacidade dos cidadãos de tomar decisões informadas.",
    tags: ["democracia", "tecnologia", "política"],
    difficulty: "Médio",
    category: "Política",
    trending: true,
  },
  {
    title: "Crise de representatividade e desconfiança nas instituições democráticas",
    context: "A baixa participação eleitoral entre jovens e o crescente descrédito nos partidos revelam uma crise de representação que ameaça a democracia.",
    tags: ["democracia", "política", "juventude"],
    difficulty: "Difícil",
    category: "Política",
  },
  {
    title: "A reforma tributária e a desigualdade no Brasil",
    context: "O sistema tributário brasileiro é altamente regressivo: os mais pobres pagam proporcionalmente mais impostos do que os mais ricos.",
    tags: ["economia", "desigualdade", "política"],
    difficulty: "Difícil",
    category: "Política",
  },
  {
    title: "O papel do jornalismo na defesa da democracia",
    context: "A imprensa livre é pilar democrático, mas enfrenta ameaças econômicas, desinformação e ataques à credibilidade que comprometem sua função social.",
    tags: ["democracia", "comunicação", "direitos"],
    difficulty: "Médio",
    category: "Política",
  },

  // ── DESIGUALDADE SOCIAL ───────────────────────────────────────────────────

  {
    title: "A pobreza extrema e a insegurança alimentar no Brasil",
    context: "Mais de 30 milhões de brasileiros passam fome. O retorno ao Mapa da Fome expõe a insuficiência das políticas de proteção social.",
    tags: ["desigualdade", "alimentação", "pobreza"],
    difficulty: "Fácil",
    category: "Social",
    trending: true,
  },
  {
    title: "Habitação e o déficit habitacional no Brasil",
    context: "Oito milhões de famílias brasileiras não têm moradia adequada. Favelas e ocupações irregulares crescem especialmente em áreas de risco.",
    tags: ["habitação", "desigualdade", "urbanização"],
    difficulty: "Médio",
    category: "Social",
  },
  {
    title: "A desigualdade regional no Brasil: Norte e Nordeste",
    context: "Indicadores de renda, educação e saúde revelam abismo entre regiões brasileiras, com Norte e Nordeste sistematicamente sub-representados nos investimentos públicos.",
    tags: ["desigualdade", "regional", "políticas públicas"],
    difficulty: "Médio",
    category: "Social",
  },
  {
    title: "O trabalho infantil e a exploração de crianças no Brasil",
    context: "Apesar dos avanços legislativos, 1,8 milhão de crianças ainda trabalham no Brasil, muitas em condições análogas à escravidão.",
    tags: ["infância", "trabalho", "direitos"],
    difficulty: "Fácil",
    category: "Social",
  },

  // ── GÊNERO E DIVERSIDADE ──────────────────────────────────────────────────

  {
    title: "A violência contra a população LGBTQIA+ no Brasil",
    context: "O Brasil lidera mundialmente em assassinatos de pessoas trans e LGBTQIA+. A ausência de legislação específica e a cultura homofóbica perpetuam essa violência.",
    tags: ["direitos", "violência", "diversidade"],
    difficulty: "Difícil",
    category: "Gênero",
    trending: true,
  },
  {
    title: "Desigualdade salarial entre homens e mulheres no Brasil",
    context: "Mulheres recebem em média 77,7% do salário dos homens para funções equivalentes. A disparidade é ainda maior para mulheres negras.",
    tags: ["gênero", "trabalho", "desigualdade"],
    difficulty: "Médio",
    category: "Gênero",
  },
  {
    title: "Representatividade feminina na política brasileira",
    context: "O Brasil tem uma das menores taxas de mulheres no parlamento do mundo. A sub-representação limita políticas de gênero e perpetua desigualdades.",
    tags: ["gênero", "política", "democracia"],
    difficulty: "Médio",
    category: "Gênero",
  },

  // ── RACISMO E DIVERSIDADE ─────────────────────────────────────────────────

  {
    title: "O racismo estrutural e suas consequências para a população negra",
    context: "O racismo não se limita a atos individuais — ele está institucionalizado em práticas que sistematicamente desfavorecem negros no acesso a oportunidades.",
    tags: ["racismo", "desigualdade", "direitos"],
    difficulty: "Difícil",
    category: "Direitos",
  },
  {
    title: "Desafios para a demarcação de terras indígenas no Brasil",
    context: "A morosidade na regularização fundiária expõe comunidades indígenas à invasão de garimpeiros, madeireiros e ruralistas.",
    tags: ["indígenas", "direitos", "meio ambiente"],
    difficulty: "Difícil",
    category: "Direitos",
  },
  {
    title: "O apagamento da cultura afro-brasileira e a resistência quilombola",
    context: "A herança africana no Brasil é frequentemente subalternizada. Comunidades quilombolas lutam pela preservação cultural e pela titulação de seus territórios.",
    tags: ["racismo", "cultura", "direitos"],
    difficulty: "Médio",
    category: "Cultura",
  },

  // ── TRABALHO E ECONOMIA ───────────────────────────────────────────────────

  {
    title: "Precarização do trabalho e a uberização da economia",
    context: "A expansão das plataformas de trabalho por aplicativo cria uma massa de trabalhadores sem direitos trabalhistas, proteção social ou renda estável.",
    tags: ["trabalho", "tecnologia", "direitos"],
    difficulty: "Médio",
    category: "Trabalho",
    trending: true,
  },
  {
    title: "O desemprego juvenil e a falta de perspectivas para os jovens",
    context: "Mais de 25% dos jovens brasileiros estão desempregados. A qualificação inadequada e a informalidade bloqueiam a inserção no mercado de trabalho.",
    tags: ["trabalho", "juventude", "educação"],
    difficulty: "Fácil",
    category: "Trabalho",
  },
  {
    title: "Reforma da previdência e o futuro do trabalho",
    context: "O envelhecimento populacional e as mudanças no mercado de trabalho exigem repensar os sistemas previdenciários para garantir proteção às futuras gerações.",
    tags: ["trabalho", "previdência", "economia"],
    difficulty: "Difícil",
    category: "Trabalho",
  },

  // ── CULTURA E ARTE ────────────────────────────────────────────────────────

  {
    title: "O papel transformador da arte na sociedade",
    context: "A arte tem o poder de questionar a realidade, promover empatia e mobilizar transformações sociais, mas enfrenta ameaças de censura e cortes de financiamento.",
    tags: ["arte", "cultura", "democracia"],
    difficulty: "Médio",
    category: "Cultura",
  },
  {
    title: "Acesso à cultura e o direito ao lazer nas periferias",
    context: "Populações de baixa renda têm acesso limitado a cinemas, teatros, museus e espaços culturais, aprofundando desigualdades simbólicas e educacionais.",
    tags: ["cultura", "desigualdade", "direitos"],
    difficulty: "Fácil",
    category: "Cultura",
  },
  {
    title: "O patrimônio histórico e cultural brasileiro em risco",
    context: "Incêndios em museus, abandono de sítios arqueológicos e destruição de centros históricos revelam negligência do Estado com a memória coletiva.",
    tags: ["cultura", "patrimônio", "política"],
    difficulty: "Médio",
    category: "Cultura",
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
