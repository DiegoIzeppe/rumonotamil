export type RepertoireCategory = "filosofia" | "dados" | "literatura" | "historia" | "ciencia" | "arte" | "legislacao";

export type RepertoireTheme =
  | "tecnologia" | "desigualdade" | "educacao" | "saude" | "meio-ambiente"
  | "democracia" | "genero" | "racismo" | "violencia" | "trabalho" | "cultura";

export interface Repertoire {
  id: string;
  author: string;
  work?: string;
  quote?: string;
  summary: string;
  category: RepertoireCategory;
  themes: RepertoireTheme[];
  howToUse: string;
  example: string;
  tags: string[];
}

export const repertoires: Repertoire[] = [
  // ── FILOSOFIA ──
  {
    id: "r1",
    author: "Hannah Arendt",
    work: "A Condição Humana (1958)",
    quote: "A banalidade do mal",
    summary: "Arendt analisa como sistemas autoritários transformam pessoas comuns em perpetradoras de atrocidades por omissão do pensamento crítico. Também teoriza o espaço público como condição para a vida política plena.",
    category: "filosofia",
    themes: ["democracia", "violencia", "tecnologia"],
    howToUse: "Use para argumentar sobre manipulação política, fake news, alienação digital ou qualquer tema que envolva a deterioração do pensamento crítico e do espaço público.",
    example: "Conforme Hannah Arendt teoriza em 'A Condição Humana', a democracia pressupõe um espaço público de deliberação racional — espaço esse que os algoritmos das redes sociais fragmentam ao criar câmaras de eco que eliminam o dissenso.",
    tags: ["espaço público", "pensamento crítico", "totalitarismo", "política"],
  },
  {
    id: "r2",
    author: "Zygmunt Bauman",
    work: "Modernidade Líquida (2000)",
    summary: "Bauman descreve a contemporaneidade como 'líquida': relações, identidades e instituições perdem solidez e tornam-se fluidas, provisórias e instáveis. O consumismo e a individualização fragmentam os laços sociais.",
    category: "filosofia",
    themes: ["tecnologia", "cultura", "trabalho", "desigualdade"],
    howToUse: "Excelente para temas sobre identidade digital, vínculos afetivos fragilizados, consumismo, trabalho precário e qualquer contexto de instabilidade social contemporânea.",
    example: "O sociólogo Zygmunt Bauman, ao cunhar o conceito de 'modernidade líquida', antecipou que as identidades contemporâneas tornar-se-iam maleáveis e vulneráveis à manipulação — fenômeno agravado pelo uso de dados pessoais pelas plataformas digitais.",
    tags: ["modernidade líquida", "identidade", "consumismo", "vínculos sociais"],
  },
  {
    id: "r3",
    author: "Simone de Beauvoir",
    work: "O Segundo Sexo (1949)",
    quote: "Ninguém nasce mulher, torna-se mulher.",
    summary: "Beauvoir demonstra que o feminino é uma construção social e cultural, não uma essência natural. A opressão da mulher é resultado de um processo histórico de subordinação que naturaliza a desigualdade.",
    category: "filosofia",
    themes: ["genero", "violencia", "trabalho", "desigualdade"],
    howToUse: "Indispensável para temas sobre violência de gênero, desigualdade salarial, invisibilidade do trabalho feminino ou qualquer discussão sobre construção social de papéis.",
    example: "Conforme Simone de Beauvoir expõe em 'O Segundo Sexo', a subordinação feminina não é natural — ela é construída culturalmente, o que explica por que a violência contra a mulher persiste mesmo após décadas de legislação protetiva.",
    tags: ["feminismo", "gênero", "construção social", "patriarcado"],
  },
  {
    id: "r4",
    author: "Michel Foucault",
    work: "Vigiar e Punir (1975)",
    summary: "Foucault analisa como o poder disciplinar moderno opera por meio de vigilância, normalização e controle dos corpos, criando sujeitos dóceis e produtivos. O Panóptico é sua metáfora central.",
    category: "filosofia",
    themes: ["tecnologia", "democracia", "violencia", "saude"],
    howToUse: "Use para temas sobre vigilância digital, controle social, sistemas prisionais, medicalização ou qualquer contexto que envolva poder e controle sobre corpos e comportamentos.",
    example: "Michel Foucault, ao analisar o Panóptico em 'Vigiar e Punir', demonstrou que a vigilância constante transforma o vigiado em seu próprio controlador — princípio que os algoritmos de redes sociais reproduzem ao monitorar e moldar comportamentos digitais.",
    tags: ["vigilância", "poder", "panóptico", "controle social"],
  },
  {
    id: "r5",
    author: "Byung-Chul Han",
    work: "Sociedade do Cansaço (2010)",
    summary: "Han argumenta que a sociedade contemporânea substituiu a disciplina coercitiva pelo desempenho autoimposto, gerando esgotamento, depressão e burnout como doenças do século XXI.",
    category: "filosofia",
    themes: ["saude", "trabalho", "tecnologia", "cultura"],
    howToUse: "Perfeito para temas sobre saúde mental, burnout, produtividade excessiva, redes sociais e cultura do desempenho. Um dos repertórios mais atuais e reconhecidos pelos avaliadores.",
    example: "O filósofo Byung-Chul Han, em 'Sociedade do Cansaço', diagnostica que o imperativo do desempenho — amplificado pelas redes sociais — transforma o indivíduo em explorador de si mesmo, gerando uma epidemia silenciosa de esgotamento e ansiedade.",
    tags: ["burnout", "desempenho", "saúde mental", "produtividade"],
  },
  {
    id: "r6",
    author: "Boaventura de Sousa Santos",
    work: "Epistemologias do Sul (2010)",
    summary: "Santos propõe que o conhecimento ocidental suprimiu saberes de povos do Sul Global — fenômeno que chama de 'epistemicídio'. Defende a valorização de formas alternativas de saber.",
    category: "filosofia",
    themes: ["racismo", "educacao", "desigualdade", "cultura"],
    howToUse: "Use para temas sobre povos indígenas, quilombolas, desigualdade epistêmica, educação inclusiva ou qualquer contexto que envolva invisibilidade de grupos subalternizados.",
    example: "Boaventura de Sousa Santos, ao cunhar o conceito de 'epistemicídio', revela que a exclusão dos povos indígenas não se limita ao plano econômico — ela atinge também o silenciamento de seus saberes e cosmologias, perpetuando sua invisibilidade institucional.",
    tags: ["epistemicídio", "povos indígenas", "conhecimento", "colonialismo"],
  },
  {
    id: "r7",
    author: "Pierre Bourdieu",
    work: "A Reprodução (1970)",
    summary: "Bourdieu demonstra que o sistema educacional não neutraliza desigualdades sociais — ele as reproduz, ao privilegiar o capital cultural das classes dominantes e tratar como 'natural' o que é socialmente construído.",
    category: "filosofia",
    themes: ["educacao", "desigualdade", "racismo", "trabalho"],
    howToUse: "Essencial para temas sobre desigualdade educacional, evasão escolar, acesso ao ensino superior ou qualquer discussão sobre meritocracia e reprodução social.",
    example: "Pierre Bourdieu, em 'A Reprodução', demonstra que a escola não é um espaço neutro: ao valorizar o capital cultural das elites, ela legitima a desigualdade como mérito individual, perpetuando ciclos de exclusão que afetam desproporcionalmente negros e pobres.",
    tags: ["capital cultural", "reprodução social", "meritocracia", "escola"],
  },

  // ── DADOS E ESTATÍSTICAS ──
  {
    id: "r8",
    author: "IBGE",
    work: "Pesquisa Nacional por Amostra de Domicílios (PNAD) 2023",
    summary: "O IBGE é o principal órgão de estatística do Brasil. A PNAD mede indicadores como renda, emprego, educação e desigualdade. O coeficiente de Gini do Brasil é de 0,518 — um dos mais altos do mundo.",
    category: "dados",
    themes: ["desigualdade", "trabalho", "educacao", "saude", "racismo"],
    howToUse: "Cite o IBGE para dar credibilidade empírica a argumentos sobre desigualdade, pobreza, educação ou trabalho. Sempre especifique o indicador e o ano.",
    example: "Segundo dados do IBGE (PNAD 2023), o Brasil possui um coeficiente de Gini de 0,518, evidenciando que a concentração de renda permanece entre as mais elevadas do mundo — realidade que alimenta ciclos de exclusão social e limita a mobilidade econômica.",
    tags: ["desigualdade", "renda", "GINI", "pobreza"],
  },
  {
    id: "r9",
    author: "OMS — Organização Mundial da Saúde",
    work: "Relatório Mundial de Saúde Mental (2022)",
    summary: "A OMS estima que 1 bilhão de pessoas vivem com algum transtorno mental no mundo. No Brasil, a depressão afeta 11,5 milhões de pessoas (5,8% da população), a maior taxa da América Latina.",
    category: "dados",
    themes: ["saude", "tecnologia", "trabalho", "desigualdade"],
    howToUse: "Use para temas sobre saúde mental, burnout, redes sociais e bem-estar. A OMS é a fonte de maior autoridade internacional em saúde.",
    example: "Conforme dados da Organização Mundial da Saúde (2022), a depressão afeta 11,5 milhões de brasileiros — números que evidenciam uma crise de saúde pública amplificada pelo uso compulsivo de plataformas digitais e pela cultura do desempenho.",
    tags: ["depressão", "saúde mental", "transtorno", "bem-estar"],
  },
  {
    id: "r10",
    author: "Instituto Reuters",
    work: "Digital News Report 2023",
    summary: "Relatório anual sobre consumo de notícias. Aponta que 64% dos brasileiros já foram expostos a notícias falsas e que o Brasil é um dos países com maior desconfiança em relação à mídia tradicional.",
    category: "dados",
    themes: ["tecnologia", "democracia", "educacao"],
    howToUse: "Use para temas sobre desinformação, fake news, democracia digital ou qualquer discussão sobre o papel da mídia na sociedade.",
    example: "Segundo o Instituto Reuters (Digital News Report, 2023), 64% dos brasileiros já foram expostos a informações falsas que influenciaram sua percepção de eventos políticos, revelando a dimensão da crise de desinformação que corrói as bases da democracia representativa.",
    tags: ["fake news", "desinformação", "mídia", "democracia"],
  },
  {
    id: "r11",
    author: "Fórum Brasileiro de Segurança Pública",
    work: "Anuário de Segurança Pública 2023",
    summary: "O Brasil registrou 1.463 casos de feminicídio em 2022 — um a cada 6 horas. Mulheres negras representam 61,8% das vítimas, revelando a intersecção entre gênero e racismo.",
    category: "dados",
    themes: ["genero", "violencia", "racismo", "desigualdade"],
    howToUse: "Use para temas sobre violência de gênero, feminicídio ou interseccionalidade racial. Dado concreto e recente que tem alto impacto nos avaliadores.",
    example: "Dados do Fórum Brasileiro de Segurança Pública (2023) revelam que o Brasil registra um feminicídio a cada 6 horas, com mulheres negras representando 61,8% das vítimas — número que expõe a intersecção estrutural entre patriarcado e racismo.",
    tags: ["feminicídio", "violência de gênero", "racismo", "mulheres negras"],
  },
  {
    id: "r12",
    author: "UNESCO",
    work: "Relatório de Monitoramento Global da Educação 2023",
    summary: "A UNESCO estima que 244 milhões de crianças e jovens estão fora da escola no mundo. No Brasil, a evasão escolar atinge 1,7 milhão de jovens entre 15 e 17 anos.",
    category: "dados",
    themes: ["educacao", "desigualdade", "trabalho"],
    howToUse: "Use para temas sobre educação, evasão escolar ou qualquer argumento que demande autoridade internacional em educação.",
    example: "Segundo a UNESCO (2023), 1,7 milhão de jovens brasileiros entre 15 e 17 anos estão fora da escola — realidade que compromete não apenas o desenvolvimento individual, mas a capacidade produtiva e democrática do país.",
    tags: ["evasão escolar", "educação básica", "jovens", "exclusão"],
  },

  // ── LITERATURA E OBRAS ──
  {
    id: "r13",
    author: "George Orwell",
    work: "1984 (1949)",
    summary: "Distopia em que um Estado totalitário controla o pensamento por meio da vigilância permanente (Grande Irmão), da manipulação da linguagem (Novilíngua) e da reescrita da história.",
    category: "literatura",
    themes: ["tecnologia", "democracia", "violencia"],
    howToUse: "Use para temas sobre vigilância digital, autoritarismo, liberdade de expressão ou manipulação de informações. Um dos repertórios mais reconhecidos pelos avaliadores.",
    example: "George Orwell, em '1984', antecipou que a vigilância permanente não precisaria de força física para subjugar — bastaria a consciência de ser observado para que o indivíduo se autocensurasse, dinâmica que os algoritmos contemporâneos reproduzem com precisão.",
    tags: ["vigilância", "totalitarismo", "liberdade", "dystopia"],
  },
  {
    id: "r14",
    author: "Chimamanda Ngozi Adichie",
    work: "O Perigo de Uma Única História (TED, 2009)",
    quote: "A única história cria estereótipos, e o problema com estereótipos não é que sejam mentira, mas que são incompletos.",
    summary: "Adichie argumenta que quando conhecemos apenas uma narrativa sobre um povo ou lugar, criamos estereótipos que distorcem a realidade e perpetuam preconceitos.",
    category: "literatura",
    themes: ["racismo", "cultura", "educacao", "genero"],
    howToUse: "Excelente para temas sobre racismo, representatividade, mídia e estereótipos. A frase é marcante e memorável para os avaliadores.",
    example: "A escritora nigeriana Chimamanda Ngozi Adichie alerta que 'a única história cria estereótipos', fenômeno que explica como a sub-representação de negros nos meios de comunicação brasileiros perpetua preconceitos e limita o sentimento de pertencimento dessa população.",
    tags: ["estereótipos", "representatividade", "narrativa", "preconceito"],
  },
  {
    id: "r15",
    author: "Conceição Evaristo",
    work: "Becos da Memória (2006) / Escrevivência",
    summary: "Evaristo cunhou o conceito de 'escrevivência' — a escrita a partir da vivência de mulheres negras que foram historicamente silenciadas — tornando-se referência essencial em literatura afro-brasileira.",
    category: "literatura",
    themes: ["racismo", "genero", "cultura", "educacao"],
    howToUse: "Use para temas sobre racismo, feminismo negro, invisibilidade cultural ou literatura brasileira. Valorizada nos contextos em que o candidato demonstra conhecimento da cultura nacional.",
    example: "A escritora Conceição Evaristo, ao criar o conceito de 'escrevivência', evidencia que a literatura pode ser instrumento de resistência para grupos historicamente silenciados — resposta estética e política à invisibilidade imposta às mulheres negras na sociedade brasileira.",
    tags: ["escrevivência", "mulheres negras", "literatura afro-brasileira", "resistência"],
  },

  // ── HISTÓRIA E EVENTOS ──
  {
    id: "r16",
    author: "Cambridge Analytica",
    work: "Escândalo de dados (2018)",
    summary: "A empresa coletou dados de 87 milhões de usuários do Facebook sem consentimento e os usou para microssegmentar propaganda política, influenciando as eleições americanas de 2016 e o Brexit.",
    category: "historia",
    themes: ["tecnologia", "democracia"],
    howToUse: "Caso histórico concreto e verificável para temas sobre privacidade de dados, manipulação política digital ou regulação de plataformas.",
    example: "O escândalo Cambridge Analytica (2018), no qual dados de 87 milhões de usuários foram explorados para influenciar eleições em múltiplos países, demonstra como a ausência de regulação de dados pessoais pode comprometer a soberania democrática.",
    tags: ["dados pessoais", "eleições", "Facebook", "manipulação política"],
  },
  {
    id: "r17",
    author: "Lei Maria da Penha",
    work: "Lei 11.340/2006",
    summary: "Criada após a história de Maria da Penha Maia Fernandes, que sofreu tentativas de homicídio por seu marido, a lei estabelece mecanismos de proteção para mulheres vítimas de violência doméstica.",
    category: "legislacao",
    themes: ["genero", "violencia", "democracia"],
    howToUse: "Use como evidência de que o Brasil possui legislação protetiva, mas que sua aplicação ainda é insuficiente — criando tensão argumentativa entre lei e realidade.",
    example: "A Lei Maria da Penha (11.340/2006), considerada pela ONU uma das três melhores legislações de combate à violência doméstica no mundo, demonstra que o Brasil possui arcabouço legal adequado — o desafio reside em sua efetiva implementação e na capacitação dos agentes que a aplicam.",
    tags: ["violência doméstica", "proteção", "direitos humanos", "legislação"],
  },
  {
    id: "r18",
    author: "Movimento Quilombola",
    work: "Artigo 68 do ADCT — Constituição Federal de 1988",
    summary: "A Constituição de 1988 garantiu às comunidades quilombolas o direito à propriedade definitiva de suas terras. Porém, décadas depois, menos de 15% dos territórios foram titulados.",
    category: "historia",
    themes: ["racismo", "desigualdade", "democracia"],
    howToUse: "Use para temas sobre racismo estrutural, direitos constitucionais não efetivados ou desigualdade fundiária. Demonstra distância entre lei e realidade.",
    example: "Embora o Artigo 68 do ADCT da Constituição Federal (1988) reconheça o direito das comunidades quilombolas à titulação de suas terras, mais de três décadas depois, menos de 15% desses territórios foram efetivamente regularizados — evidência concreta do racismo estrutural que permeia as instituições brasileiras.",
    tags: ["quilombolas", "terra", "racismo estrutural", "Constituição"],
  },

  // ── CIÊNCIA ──
  {
    id: "r19",
    author: "IPCC — Painel Intergovernamental sobre Mudanças Climáticas",
    work: "Relatório AR6 (2022)",
    summary: "O IPCC confirma que as mudanças climáticas são inequivocamente causadas pela ação humana. O aquecimento já atingiu 1,1°C acima do nível pré-industrial, com risco de ultrapassar 1,5°C até 2040.",
    category: "ciencia",
    themes: ["meio-ambiente", "desigualdade", "democracia"],
    howToUse: "Autoridade científica máxima para temas ambientais. Use para argumentar sobre urgência climática, desastres naturais, justiça ambiental ou políticas de sustentabilidade.",
    example: "O Painel Intergovernamental sobre Mudanças Climáticas (IPCC, 2022) confirma que o aquecimento global já atingiu 1,1°C acima dos níveis pré-industriais, ameaçando desproporcionalmente populações vulneráveis — o que caracteriza a crise climática também como uma questão de justiça social.",
    tags: ["aquecimento global", "clima", "carbono", "sustentabilidade"],
  },
  {
    id: "r20",
    author: "INPE — Instituto Nacional de Pesquisas Espaciais",
    work: "Monitoramento do Desmatamento na Amazônia (2023)",
    summary: "O Brasil perdeu 11.568 km² de floresta amazônica em 2022 — área equivalente a 10 vezes o município de São Paulo. A Amazônia já perdeu 20% de sua cobertura original.",
    category: "ciencia",
    themes: ["meio-ambiente", "democracia"],
    howToUse: "Dado nacional concreto para temas ambientais. O INPE é a fonte oficial de dados sobre desmatamento, o que confere alta credibilidade ao argumento.",
    example: "Segundo dados do INPE (2023), o Brasil desmatou 11.568 km² da Amazônia em 2022 — área equivalente a dez municípios de São Paulo —, evidenciando que a destruição da maior floresta tropical do planeta avança em ritmo incompatível com os compromissos climáticos internacionais assumidos pelo governo brasileiro.",
    tags: ["desmatamento", "Amazônia", "floresta", "biodiversidade"],
  },
];

export const repertoireThemes: Record<RepertoireTheme, string> = {
  tecnologia: "Tecnologia e Sociedade",
  desigualdade: "Desigualdade Social",
  educacao: "Educação",
  saude: "Saúde",
  "meio-ambiente": "Meio Ambiente",
  democracia: "Democracia e Política",
  genero: "Gênero e Feminismo",
  racismo: "Racismo e Diversidade",
  violencia: "Violência",
  trabalho: "Trabalho e Economia",
  cultura: "Cultura e Arte",
};

export const repertoireCategories: Record<RepertoireCategory, string> = {
  filosofia: "Filosofia",
  dados: "Dados e Estatísticas",
  literatura: "Literatura e Obras",
  historia: "História e Eventos",
  ciencia: "Ciência",
  arte: "Arte e Cultura",
  legislacao: "Legislação",
};
