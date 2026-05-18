export interface ColetaneaText {
  id: number;
  type: "texto" | "dado" | "charge" | "poema";
  source: string;
  content: string;
}

export interface Coletanea {
  theme: string;
  texts: ColetaneaText[];
}

export const coletaneas: Coletanea[] = [
  {
    theme: "Crise da Saúde Mental na Era Digital",
    texts: [
      {
        id: 1,
        type: "dado",
        source: "OMS — Organização Mundial da Saúde, 2022",
        content: "A pandemia de COVID-19 causou um aumento de 25% nos transtornos de ansiedade e depressão em todo o mundo. Entre jovens de 15 a 24 anos, a prevalência de transtornos mentais saltou de 13% para 20% entre 2019 e 2021. O Brasil possui a maior taxa de depressão da América Latina, afetando 11,5 milhões de pessoas — 5,8% da população.",
      },
      {
        id: 2,
        type: "texto",
        source: "Byung-Chul Han — Sociedade do Cansaço (2010), adaptado",
        content: "A sociedade do desempenho produz o sujeito do esgotamento e da depressão. O excesso de positividade — a pressão incessante pelo rendimento e pelo sucesso — gera uma violência neuronal que paralisa o indivíduo. Ao contrário da sociedade disciplinar de Foucault, que operava por proibição, a sociedade do desempenho opera por autoimposição: o sujeito é simultaneamente explorador e explorado de si mesmo.",
      },
      {
        id: 3,
        type: "dado",
        source: "Instituto de Pesquisa DataSenado, 2023",
        content: "73% dos adolescentes brasileiros entre 13 e 17 anos afirmam usar redes sociais por mais de 4 horas diárias. Destes, 62% relatam sentir ansiedade quando ficam sem acesso ao celular por mais de 30 minutos — fenômeno conhecido como FOMO (Fear of Missing Out). A nomofobia, medo irracional de ficar sem o celular, afeta 70% dos jovens brasileiros.",
      },
      {
        id: 4,
        type: "texto",
        source: "Jonathan Haidt — A Geração Ansiosa (2024), adaptado",
        content: "A chegada dos smartphones nas mãos de adolescentes a partir de 2012 coincide precisamente com o início de uma epidemia de ansiedade e depressão entre jovens, especialmente meninas. As redes sociais expõem adolescentes a comparação social constante, cyberbullying e privação de sono — três fatores diretamente ligados ao desenvolvimento de transtornos mentais. A solução não é tecnológica: é recuperar a infância baseada em experiências reais.",
      },
      {
        id: 5,
        type: "dado",
        source: "CFM — Conselho Federal de Medicina, 2023",
        content: "O Brasil registrou aumento de 40% nas internações psiquiátricas de adolescentes entre 2019 e 2022. O número de jovens entre 10 e 19 anos atendidos por tentativas de suicídio dobrou no mesmo período. O SUS registrou 1,2 milhão de atendimentos por transtornos mentais em crianças e adolescentes em 2022 — alta de 58% em relação a 2018.",
      },
    ],
  },
  {
    theme: "IA e Manipulação Comportamental nas Redes Sociais",
    texts: [
      {
        id: 1,
        type: "texto",
        source: "Shoshana Zuboff — A Era do Capitalismo de Vigilância (2019), adaptado",
        content: "O capitalismo de vigilância opera extraindo dados comportamentais dos usuários para prever e modificar seu comportamento futuro. As plataformas digitais não vendem produtos aos usuários — elas vendem os próprios usuários como produto para anunciantes. A modificação comportamental em escala, antes reservada aos governos totalitários, tornou-se o modelo de negócio de algumas das empresas mais valiosas do mundo.",
      },
      {
        id: 2,
        type: "dado",
        source: "Reuters Institute Digital News Report, 2023",
        content: "64% dos brasileiros afirmam já ter compartilhado notícias falsas sem perceber. O Brasil é o terceiro país do mundo com maior volume de desinformação circulando em aplicativos de mensagens. Um estudo do MIT (2018) demonstrou que notícias falsas se propagam 6 vezes mais rapidamente que notícias verdadeiras no Twitter, pois conteúdo emocional gera mais engajamento.",
      },
      {
        id: 3,
        type: "texto",
        source: "Hannah Arendt — A Condição Humana (1958), adaptado",
        content: "A vida política depende da existência de um mundo comum — um espaço público compartilhado onde os fatos são reconhecidos como fatos. Quando cada grupo habita sua própria realidade informacional, o diálogo democrático torna-se impossível: não há base factual comum sobre a qual construir o dissenso legítimo. A fragmentação da esfera pública é, portanto, uma ameaça existencial à democracia.",
      },
      {
        id: 4,
        type: "dado",
        source: "Cambridge Analytica — Relatório do Congresso Americano, 2019",
        content: "O escândalo Cambridge Analytica revelou que dados de 87 milhões de usuários do Facebook foram coletados sem consentimento e utilizados para criar perfis psicológicos detalhados. Esses perfis permitiram a microssegmentação de propaganda política personalizada, adaptada às vulnerabilidades emocionais específicas de cada eleitor. A empresa operou em campanhas eleitorais de pelo menos 44 países entre 2013 e 2018.",
      },
    ],
  },
  {
    theme: "Racismo Estrutural e Mercado de Trabalho",
    texts: [
      {
        id: 1,
        type: "dado",
        source: "IBGE — PNAD Contínua 2023",
        content: "Trabalhadores negros ganham, em média, 46% menos que trabalhadores brancos com a mesma escolaridade no Brasil. A taxa de desemprego entre negros é de 11,2%, contra 6,9% entre brancos. Negros representam 55% da população, mas apenas 29% dos cargos de gestão e 18% dos diretores executivos das 500 maiores empresas do país.",
      },
      {
        id: 2,
        type: "texto",
        source: "Silvio Almeida — Racismo Estrutural (2018), adaptado",
        content: "O racismo estrutural não se resume a atos individuais de preconceito. Ele é o resultado de uma ordem social que, historicamente, reservou os melhores postos de trabalho, as melhores escolas e os melhores territórios para a população branca. As instituições — empresas, escolas, sistema jurídico — reproduzem essa hierarquia racial mesmo quando nenhum de seus membros tem intenção explicitamente racista.",
      },
      {
        id: 3,
        type: "dado",
        source: "Fórum Brasileiro de Segurança Pública, 2023",
        content: "Negros representam 77% das vítimas de homicídio no Brasil. Um jovem negro tem 2,7 vezes mais chances de ser assassinado do que um jovem branco. No sistema prisional, 67% dos encarcerados são negros, apesar de representarem 55% da população — evidência de que o racismo estrutural permeia também o sistema de justiça criminal.",
      },
      {
        id: 4,
        type: "texto",
        source: "Djamila Ribeiro — O que é Lugar de Fala? (2017), adaptado",
        content: "Lugar de fala não significa que apenas pessoas de determinado grupo podem falar sobre sua realidade, mas que as estruturas sociais determinam quem tem autoridade reconhecida para enunciar certos discursos. No mercado de trabalho, isso se traduz em barreiras invisíveis que impedem a ascensão de trabalhadores negros independentemente de sua qualificação — um fenômeno que o economista Gary Becker chamou de 'discriminação por gosto'.",
      },
    ],
  },
  {
    theme: "Desinformação e Democracia no Brasil",
    texts: [
      {
        id: 1,
        type: "texto",
        source: "Umberto Eco — Apocalípticos e Integrados (1964), adaptado",
        content: "Os meios de comunicação de massa são, simultaneamente, instrumentos de democratização cultural e de homogeneização do pensamento. A internet radicalizou esse paradoxo: ao mesmo tempo em que permite o acesso à totalidade do conhecimento humano, cria condições para o florescimento de teorias conspiratórias e a circulação irrestrita de falsidades vestidas de informação.",
      },
      {
        id: 2,
        type: "dado",
        source: "TSE — Tribunal Superior Eleitoral, Relatório 2022",
        content: "O Brasil registrou 2.847 ações judiciais relacionadas à desinformação eleitoral nas eleições de 2022. O TSE removeu mais de 25 mil conteúdos falsos sobre o processo eleitoral. Pesquisa Datafolha revelou que 49% dos brasileiros acreditaram em pelo menos uma notícia falsa sobre as eleições de 2022 — número que sobe para 67% entre usuários intensivos de WhatsApp.",
      },
      {
        id: 3,
        type: "texto",
        source: "Norberto Bobbio — O Futuro da Democracia (1986), adaptado",
        content: "A democracia pressupõe cidadãos informados capazes de tomar decisões racionais. Quando o espaço público é inundado por desinformação sistemática, a capacidade deliberativa dos cidadãos é comprometida na origem: a decisão eleitoral deixa de ser o resultado de uma avaliação racional e passa a ser o produto da manipulação emocional. Sem informação verdadeira, não há democracia possível — apenas sua aparência.",
      },
      {
        id: 4,
        type: "dado",
        source: "Agência Lupa — Relatório Anual de Fact-Checking, 2023",
        content: "A Agência Lupa, principal fact-checker brasileiro, verificou 1.243 afirmações de políticos em 2022, das quais 34% foram classificadas como 'Falso' ou 'Exagerado'. O WhatsApp permanece como principal veículo de desinformação no Brasil: 89% das notícias falsas detectadas circularam primeiro em aplicativos de mensagem antes de chegarem às redes sociais abertas.",
      },
    ],
  },
];

export function getColetaneaForTheme(theme: string): Coletanea | null {
  return coletaneas.find((c) =>
    c.theme.toLowerCase() === theme.toLowerCase() ||
    theme.toLowerCase().includes(c.theme.toLowerCase().split(" ")[0].toLowerCase())
  ) ?? coletaneas[0];
}
