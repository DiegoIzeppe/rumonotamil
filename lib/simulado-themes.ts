export interface SimuladoText {
  id: number;
  label: string; // "Texto I", "Texto II", etc.
  type: "texto" | "dado" | "charge" | "poema";
  source: string;
  content: string;
}

export interface SimuladoTheme {
  id: string;
  title: string; // Título oficial da proposta
  instrucao: string; // Instruções específicas
  difficulty: "Médio" | "Difícil";
  category: string;
  texts: SimuladoText[];
}

export const SIMULADO_THEMES: SimuladoTheme[] = [
  {
    id: "saude-mental-digital",
    title: "Desafios para a promoção da saúde mental de jovens na era digital",
    instrucao: "Com base na leitura dos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre os desafios para a promoção da saúde mental de jovens na era digital. Apresente proposta de intervenção que respeite os direitos humanos. Selecione, organize e relacione argumentos e fatos para defesa de seu ponto de vista.",
    difficulty: "Médio",
    category: "Saúde",
    texts: [
      {
        id: 1,
        label: "Texto I",
        type: "dado",
        source: "OMS — Organização Mundial da Saúde, Relatório de Saúde Mental, 2022",
        content: "A pandemia de COVID-19 causou um aumento de 25% nos transtornos de ansiedade e depressão globalmente. No Brasil, a depressão afeta 11,5 milhões de pessoas — a maior taxa da América Latina. Entre jovens de 15 a 24 anos, a prevalência de transtornos mentais saltou de 13% para 20% entre 2019 e 2021. O CFM registrou aumento de 40% nas internações psiquiátricas de adolescentes no mesmo período, e o número de jovens atendidos por tentativas de suicídio dobrou.",
      },
      {
        id: 2,
        label: "Texto II",
        type: "texto",
        source: "Byung-Chul Han — Sociedade do Cansaço (2010), adaptado",
        content: "A sociedade do desempenho produz o sujeito do esgotamento e da depressão. O excesso de positividade — a pressão incessante pelo rendimento e pelo sucesso — gera uma violência neuronal que paralisa o indivíduo. Ao contrário da sociedade disciplinar, que operava por proibição, a sociedade do desempenho opera por autoimposição: o sujeito é simultaneamente explorador e explorado de si mesmo. As redes sociais intensificam esse mecanismo ao criar métricas públicas de desempenho pessoal — curtidas, seguidores, visualizações — que transformam a identidade em produto a ser constantemente otimizado.",
      },
      {
        id: 3,
        label: "Texto III",
        type: "dado",
        source: "Jonathan Haidt e Jean Twenge — Pesquisa sobre adolescentes e smartphones, 2023",
        content: "A chegada dos smartphones nas mãos de adolescentes a partir de 2012 coincide com o início de uma epidemia de ansiedade e depressão entre jovens, especialmente meninas. Estudos longitudinais com 500 mil adolescentes nos EUA e Reino Unido mostram que o uso de redes sociais por mais de 3 horas diárias eleva em 66% o risco de depressão em meninas. No Brasil, pesquisa do DataSenado (2023) indica que 73% dos adolescentes entre 13 e 17 anos usam redes por mais de 4 horas diárias. 62% relatam ansiedade quando ficam sem celular por mais de 30 minutos.",
      },
      {
        id: 4,
        label: "Texto IV",
        type: "texto",
        source: "Senado dos Estados Unidos — Declaração do Diretor-Geral de Saúde Pública, 2023",
        content: "\"Temos evidências suficientes para afirmar que as redes sociais apresentam risco profundo à saúde mental e ao bem-estar de crianças e adolescentes. Assim como exigimos avisos de saúde em embalagens de cigarro, devemos exigir que as plataformas de mídia social exibam avisos que suas aplicações podem ser prejudiciais à saúde mental dos jovens.\" A declaração, assinada pelo Cirurgião-Geral americano, representa o mais alto nível de alerta governamental sobre saúde digital já emitido nos EUA, e gerou debate global sobre a responsabilidade das plataformas tecnológicas.",
      },
      {
        id: 5,
        label: "Texto V",
        type: "dado",
        source: "UNICEF Brasil — Relatório sobre Bem-Estar Digital, 2023",
        content: "O Brasil não possui legislação específica sobre uso de redes sociais por menores de 14 anos, ao contrário de países como Reino Unido e Austrália, que proibiram o acesso de menores de 16 anos. Apenas 8% das escolas públicas brasileiras têm psicólogo e 12% têm assistente social — proporção insuficiente diante da demanda de saúde mental. Programas de letramento digital com abordagem socioemocional, implementados em 200 escolas-piloto no Brasil, reduziram em 28% os casos de cyberbullying e melhoraram em 35% o bem-estar autodeclarado dos estudantes.",
      },
    ],
  },

  {
    id: "ia-mercado-trabalho",
    title: "Desafios para a proteção dos trabalhadores diante da automação e da inteligência artificial",
    instrucao: "Com base na leitura dos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre os desafios para a proteção dos trabalhadores diante da automação e da inteligência artificial. Apresente proposta de intervenção que respeite os direitos humanos.",
    difficulty: "Difícil",
    category: "Tecnologia",
    texts: [
      {
        id: 1,
        label: "Texto I",
        type: "dado",
        source: "World Economic Forum — Future of Jobs Report, 2023",
        content: "Até 2025, a automação e a inteligência artificial eliminarão 85 milhões de funções globalmente. Simultaneamente, criarão 97 milhões de novas ocupações — saldo teórico positivo, mas que exige requalificação massiva da força de trabalho. No Brasil, o IPEA estima que 54% das funções atuais têm alto risco de automação, sendo os trabalhadores sem ensino superior os mais vulneráveis. A transição não é automática: países sem políticas ativas de requalificação enfrentam desemprego estrutural crescente.",
      },
      {
        id: 2,
        label: "Texto II",
        type: "texto",
        source: "Ricardo Antunes — O Privilégio da Servidão (2018), adaptado",
        content: "A 'uberização' representa nova forma de servidão: trabalhadores assumem os riscos do capital — custeiam veículos, celulares e combustível — enquanto as plataformas ficam com a maior parcela do valor gerado. A ideologia do 'empreendedorismo' mascara a exploração: o entregador de aplicativo não é micro-empreendedor — é trabalhador assalariado sem os direitos do trabalho assalariado. O capitalismo de plataforma não criou trabalho novo — absorveu desempregados sem alternativa e institucionalizou a precariedade como modelo.",
      },
      {
        id: 3,
        label: "Texto III",
        type: "dado",
        source: "IBGE — PNAD Contínua, 2023",
        content: "O Brasil tem 1,5 milhão de motoristas de aplicativo e 800 mil entregadores de plataforma, sem carteira assinada, FGTS ou proteção previdenciária. A renda média do entregador é de R$ 1.200 mensais, abaixo do salário mínimo, com jornadas superiores a 10 horas diárias. 78% já sofreram acidentes sem qualquer cobertura de saúde. O mercado formal perdeu 14 milhões de postos entre 2015 e 2020, período em que o trabalho por aplicativo cresceu 300%.",
      },
      {
        id: 4,
        label: "Texto IV",
        type: "texto",
        source: "Yuval Noah Harari — 21 Lições para o Século 21 (2018), adaptado",
        content: "A próxima grande divisão social não será entre ricos e pobres, mas entre os economicamente relevantes e os irrelevantes. Algoritmos que aprendem são mais precisos que humanos em diagnósticos médicos, análise jurídica e previsão financeira. Pela primeira vez na história, não é claro que educação e esforço individual possam garantir inserção no mercado de trabalho — a questão é estrutural. Isso exige resposta coletiva: redes de proteção social robustas e redistribuição dos ganhos da automação.",
      },
    ],
  },

  {
    id: "desinformacao-democracia",
    title: "Caminhos para o combate à desinformação na sociedade democrática brasileira",
    instrucao: "Com base na leitura dos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre os caminhos para o combate à desinformação na sociedade democrática brasileira. Apresente proposta de intervenção que respeite os direitos humanos.",
    difficulty: "Médio",
    category: "Democracia",
    texts: [
      {
        id: 1,
        label: "Texto I",
        type: "dado",
        source: "Reuters Institute — Digital News Report, 2023",
        content: "O Brasil é o terceiro país do mundo com maior volume de desinformação circulando em aplicativos de mensagens. 64% dos brasileiros afirmam já ter compartilhado notícias falsas sem perceber. Pesquisa DataFolha (2022) revelou que 49% dos eleitores acreditaram em ao menos uma notícia falsa sobre as eleições presidenciais. O WhatsApp foi o veículo de 89% das fake news verificadas — plataforma de difícil monitoramento por operar em grupos fechados. Um estudo do MIT demonstrou que notícias falsas se propagam 6 vezes mais rapidamente que as verdadeiras.",
      },
      {
        id: 2,
        label: "Texto II",
        type: "texto",
        source: "Norberto Bobbio — O Futuro da Democracia (1986), adaptado",
        content: "A democracia pressupõe cidadãos capazes de tomar decisões racionais a partir de fatos verificáveis. Quando o espaço público é sistematicamente inundado por desinformação, a capacidade deliberativa é comprometida na origem: a escolha eleitoral deixa de ser resultado de avaliação racional e passa a ser produto de manipulação emocional. Bobbio alertava que a democracia pode morrer não pela força, mas pelo esvaziamento gradual de seu pressuposto mais elementar — a informação verdadeira.",
      },
      {
        id: 3,
        label: "Texto III",
        type: "dado",
        source: "TSE — Tribunal Superior Eleitoral, Relatório de Integridade Eleitoral, 2022",
        content: "O Brasil registrou 2.847 ações judiciais relacionadas à desinformação eleitoral nas eleições de 2022 — alta de 340% em relação a 2018. O TSE removeu mais de 25 mil conteúdos falsos sobre o processo eleitoral. A Agência Lupa, principal fact-checker brasileiro, verificou 1.243 afirmações políticas em 2022, das quais 34% foram classificadas como falsas ou exageradas. Países com legislação específica de responsabilização de plataformas, como a União Europeia, registraram redução de 40% na circulação de desinformação eleitoral.",
      },
      {
        id: 4,
        label: "Texto IV",
        type: "texto",
        source: "Eli Pariser — O Filtro Invisível (2011), adaptado",
        content: "Os algoritmos das plataformas digitais constroem realidades personalizadas que confirmam e amplificam as crenças do usuário, excluindo informações contraditórias. O resultado é uma democracia de monólogos paralelos — grupos distintos habitando realidades informacionais incompatíveis, tornando o diálogo democrático impossível. A solução não pode ser apenas individual: requer regulação das plataformas, obrigando transparência algorítmica e responsabilização pelo conteúdo que amplificam.",
      },
      {
        id: 5,
        label: "Texto V",
        type: "dado",
        source: "OCDE — Relatório sobre Educação Midiática, 2023",
        content: "Países com programas nacionais de educação midiática nas escolas — como Finlândia, Suécia e Estônia — apresentam taxas de crença em fake news 55% menores que países sem tais programas. No Brasil, a alfabetização midiática reduz em 40% a crença em desinformação, segundo pesquisa da USP. O Brasil incluiu competências digitais na BNCC, mas apenas 23% das escolas implementam o conteúdo de forma sistemática. A educação crítica para o consumo de informação é o principal antídoto estrutural contra a desinformação.",
      },
    ],
  },

  {
    id: "violencia-mulher",
    title: "Desafios para a erradicação da violência contra a mulher no Brasil",
    instrucao: "Com base na leitura dos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre os desafios para a erradicação da violência contra a mulher no Brasil. Apresente proposta de intervenção que respeite os direitos humanos.",
    difficulty: "Médio",
    category: "Gênero",
    texts: [
      {
        id: 1,
        label: "Texto I",
        type: "dado",
        source: "Fórum Brasileiro de Segurança Pública — Anuário 2023",
        content: "O Brasil registrou 1.463 feminicídios em 2022 — um assassinato de mulher a cada 6 horas em razão do gênero. Mulheres negras representam 61,8% das vítimas, revelando a intersecção estrutural entre patriarcado e racismo. A cada 7 minutos, uma mulher é agredida fisicamente no país. 52% dos crimes ocorrem dentro da residência da vítima, e 75% são perpetrados por parceiros ou ex-parceiros íntimos. Apenas 10% dos casos chegam à condenação.",
      },
      {
        id: 2,
        label: "Texto II",
        type: "texto",
        source: "Simone de Beauvoir — O Segundo Sexo (1949), adaptado",
        content: "Ninguém nasce mulher: torna-se mulher. A subordinação feminina não é produto da natureza — é construção cultural e histórica que naturaliza hierarquias de gênero. A violência doméstica opera como mecanismo de controle que garante a manutenção dessa hierarquia: ela não é aberração do sistema, mas sua expressão mais extrema. Combatê-la exige não apenas punição dos agressores, mas desconstrução das estruturas culturais que legitimam a dominação masculina como norma.",
      },
      {
        id: 3,
        label: "Texto III",
        type: "dado",
        source: "Instituto Avon / Ipsos — Pesquisa sobre Violência Doméstica, 2022",
        content: "A Lei Maria da Penha (11.340/2006), considerada pela ONU uma das três melhores legislações de proteção à mulher do mundo, reduziu em 10% a taxa de homicídios femininos no primeiro ano de vigência. Porém, 40% das mulheres que registraram boletim de ocorrência relataram que a agressão continuou após a denúncia. Das medidas protetivas concedidas, apenas 35% são efetivamente monitoradas. A lei existe — o desafio é sua implementação plena, que exige capacitação de agentes, recursos e integração entre políticas.",
      },
      {
        id: 4,
        label: "Texto IV",
        type: "texto",
        source: "bell hooks — O Feminismo é para Todo Mundo (2000), adaptado",
        content: "O patriarcado não é problema das mulheres — é problema de toda a sociedade, pois a dominação masculina desumaniza também os homens, aprisionando-os em modelos de masculinidade violenta. A erradicação da violência de gênero exige educação desde a infância que questione papéis sexuais rígidos, promova empatia e construa relações fundadas no respeito. Não se trata de punir homens — mas de transformar a cultura que produz agressores.",
      },
    ],
  },

  {
    id: "povos-indigenas",
    title: "Desafios para a garantia dos direitos territoriais e culturais dos povos indígenas no Brasil",
    instrucao: "Com base na leitura dos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre os desafios para a garantia dos direitos territoriais e culturais dos povos indígenas no Brasil. Apresente proposta de intervenção que respeite os direitos humanos.",
    difficulty: "Difícil",
    category: "Direitos",
    texts: [
      {
        id: 1,
        label: "Texto I",
        type: "dado",
        source: "FUNAI / ISA — Instituto Socioambiental, Relatório 2023",
        content: "O Brasil tem 773 terras indígenas identificadas, das quais apenas 487 estão homologadas — regularizadas definitivamente. 111 aguardam demarcação há mais de 20 anos. Invasões a territórios indígenas cresceram 135% entre 2019 e 2023. O garimpo ilegal afeta 28 terras homologadas. A comunidade Yanomami perdeu 570 indivíduos para doenças associadas ao garimpo em 2022, configurando, segundo a SESAI, situação de emergência de saúde pública de âmbito nacional.",
      },
      {
        id: 2,
        label: "Texto II",
        type: "texto",
        source: "Ailton Krenak — Ideias para Adiar o Fim do Mundo (2019), adaptado",
        content: "A terra não é recurso — é parente. Os povos indígenas não habitam o território: eles são o território, em relação de reciprocidade que levou milênios para se constituir. Destruir terras indígenas não é apenas crime contra uma minoria — é destruição de sistemas de conhecimento sobre biodiversidade que a humanidade ainda não catalogou. Cada língua indígena extinta leva consigo uma cosmologia, uma farmácia, uma filosofia. Proteger terras indígenas é, portanto, proteger o futuro da própria humanidade.",
      },
      {
        id: 3,
        label: "Texto III",
        type: "dado",
        source: "Inpe / MapBiomas — Monitoramento de Território Indígena, 2023",
        content: "Territórios indígenas demarcados apresentam taxas de desmatamento até 10 vezes menores que áreas vizinhas não protegidas. A Amazônia Legal tem 13,8% de seu território sob proteção indígena — áreas que conservam 80% da biodiversidade remanescente da região. Onde o garimpo avançou, o desmatamento aumentou em média 650% nos 5 anos seguintes. Cientistas estimam que a destruição de ecossistemas em territórios indígenas compromete o ciclo hídrico de regiões agrícolas que produzem 70% do PIB do agronegócio brasileiro.",
      },
      {
        id: 4,
        label: "Texto IV",
        type: "texto",
        source: "Boaventura de Sousa Santos — Epistemologias do Sul (2010), adaptado",
        content: "O epistemicídio — a destruição dos saberes dos povos subalternizados — é tão violento quanto a destruição física. Quando uma língua indígena morre, morre com ela um modo de compreender e habitar o mundo. A Constituição de 1988 reconheceu aos indígenas direitos originários sobre suas terras — não como concessão, mas como reconhecimento de que esses povos existem antes do Estado. Respeitar esses direitos é condição mínima de uma República que se pretende democrática e plural.",
      },
      {
        id: 5,
        label: "Texto V",
        type: "dado",
        source: "Convenção 169 da OIT — Organização Internacional do Trabalho, 1989",
        content: "O Brasil ratificou a Convenção 169 da OIT em 2002, comprometendo-se a garantir o direito de consulta livre, prévia e informada aos povos indígenas e tribais sobre decisões que afetem seus territórios e modos de vida. Este direito é sistematicamente desrespeitado em obras de hidrelétricas, mineração e expansão do agronegócio. Em 2023, o STF decidiu que o marco temporal — tese que limitaria direitos indígenas a terras ocupadas em 1988 — é inconstitucional, reafirmando os direitos originários garantidos pela Constituição.",
      },
    ],
  },

  {
    id: "racismo-estrutural",
    title: "Desafios para a superação do racismo estrutural e a promoção da igualdade racial no Brasil",
    instrucao: "Com base na leitura dos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre os desafios para a superação do racismo estrutural e a promoção da igualdade racial no Brasil. Apresente proposta de intervenção que respeite os direitos humanos.",
    difficulty: "Difícil",
    category: "Direitos",
    texts: [
      {
        id: 1,
        label: "Texto I",
        type: "dado",
        source: "IBGE — Desigualdades Sociais por Cor ou Raça, 2022",
        content: "Negros e pardos representam 56% da população brasileira, mas apenas 29% dos gestores, 18% dos diretores executivos e 4,7% dos parlamentares federais. A taxa de desemprego entre negros é de 11,2%, contra 6,9% entre brancos. Trabalhadores negros ganham, em média, 46% menos que brancos com a mesma escolaridade. A expectativa de vida de um homem negro é 4 anos menor que a de um homem branco. 75% dos moradores de favelas e 77% das vítimas de homicídio são negros.",
      },
      {
        id: 2,
        label: "Texto II",
        type: "texto",
        source: "Silvio Almeida — Racismo Estrutural (2018), adaptado",
        content: "O racismo estrutural não é conjunto de opiniões preconceituosas — é o modo pelo qual o racismo se manifesta nas estruturas sociais, econômicas e políticas que moldam a vida cotidiana. Ele não depende de intenção individual: manifesta-se em práticas institucionais, regras de mercado e políticas públicas que reproduzem hierarquias raciais mesmo quando nenhum ator tem intenção discriminatória explícita. Compreender o racismo como estrutural é condição para combatê-lo — pois exige mudanças sistêmicas, não apenas mudanças de atitudes.",
      },
      {
        id: 3,
        label: "Texto III",
        type: "dado",
        source: "IPEA — Atlas da Violência, 2023",
        content: "Jovens negros de 15 a 29 anos têm 2,9 vezes mais chances de ser assassinados que jovens brancos. A taxa de homicídios de negros cresceu 11,5% entre 2009 e 2019, enquanto a de brancos caiu 33,4% — demonstrando que a redução da violência não alcançou a população negra. 67% das pessoas mortas pela polícia são negras. No sistema prisional, 68% dos encarcerados são negros — proporção que expressa também as injustiças do sistema de justiça.",
      },
      {
        id: 4,
        label: "Texto IV",
        type: "texto",
        source: "Frantz Fanon — Os Condenados da Terra (1961), adaptado",
        content: "A colonização não terminou com a independência formal — ela se reproduz nas estruturas sociais que mantêm os descendentes dos colonizados em posição de subalternidade. No Brasil, a abolição da escravidão em 1888, realizada sem qualquer política de integração dos libertos, lançou 4 milhões de pessoas à margem da sociedade. As desigualdades raciais contemporâneas são, portanto, herança histórica de exclusão sistemática — não resultado de mérito ou capacidade individual.",
      },
      {
        id: 5,
        label: "Texto V",
        type: "dado",
        source: "ANDIFES — Associação Nacional dos Dirigentes das IFES, 2023",
        content: "Após dez anos da Lei de Cotas (12.711/2012), estudantes negros e pardos passaram de 9% para 36% nas universidades federais. O desempenho acadêmico dos cotistas é estatisticamente equivalente ao dos não-cotistas. A taxa de formatura de cotistas negros nas federais é de 71% — superior à média do ensino superior privado. A experiência brasileira demonstra que políticas de ação afirmativa são eficazes para corrigir desigualdades históricas sem comprometer a qualidade do ensino.",
      },
    ],
  },

  {
    id: "trabalho-cuidado",
    title: "Caminhos para o reconhecimento e a valorização do trabalho de cuidado realizado pela mulher no Brasil",
    instrucao: "Com base na leitura dos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre os caminhos para o reconhecimento e a valorização do trabalho de cuidado realizado pela mulher no Brasil. Apresente proposta de intervenção que respeite os direitos humanos.",
    difficulty: "Difícil",
    category: "Gênero",
    texts: [
      {
        id: 1,
        label: "Texto I",
        type: "dado",
        source: "IBGE — PNAD Contínua, 2022",
        content: "Mulheres dedicam em média 21,3 horas semanais a afazeres domésticos e cuidados, enquanto homens dedicam apenas 11 horas. Esse trabalho não remunerado representa, se contabilizado, 11,4% do PIB brasileiro — mais que o setor da construção civil. 92% das trabalhadoras domésticas remuneradas são mulheres, sendo 65% negras, com renda média de 1,1 salário mínimo. A sobrecarga do trabalho de cuidado é o principal fator de limitação da inserção feminina no mercado formal.",
      },
      {
        id: 2,
        label: "Texto II",
        type: "texto",
        source: "Nancy Fraser — Escalas de Justiça (2008), adaptado",
        content: "O trabalho de cuidado — cuidar de filhos, idosos e doentes, manter o lar — é a infraestrutura invisível sobre a qual toda a economia de mercado repousa. Sem esse trabalho, realizado majoritariamente por mulheres e de forma não remunerada, o capitalismo não funcionaria. Reconhecer e redistribuir essa carga é questão de justiça de gênero e de organização social: ou o Estado assume responsabilidade por serviços de cuidado de qualidade, ou as mulheres continuarão pagando com sua liberdade e oportunidades pela reprodução social.",
      },
      {
        id: 3,
        label: "Texto III",
        type: "dado",
        source: "ONU Mulheres — Relatório sobre Trabalho de Cuidado, 2023",
        content: "No mundo, as mulheres realizam 75% de todo o trabalho de cuidado não remunerado. A pandemia aprofundou essa disparidade: mulheres aumentaram 29% o tempo dedicado ao cuidado durante o isolamento, contra 5% dos homens. Países como Islândia, Suécia e Noruega que implementaram licença parental paritária — garantindo direito equivalente a pais e mães — reduziram em 40% a diferença de tempo dedicado ao cuidado doméstico. No Brasil, a licença-paternidade é de apenas 5 dias na iniciativa privada.",
      },
      {
        id: 4,
        label: "Texto IV",
        type: "texto",
        source: "Simone de Beauvoir — O Segundo Sexo (1949), adaptado",
        content: "A atribuição histórica do cuidado doméstico à mulher não é instinto natural — é construção social que serviu ao patriarcado. Ao confinar a mulher ao espaço privado, privou-se metade da humanidade de participar plenamente da vida pública. Reconhecer o valor econômico e social do cuidado é o primeiro passo — mas insuficiente. É necessário redistribuí-lo: entre homens e mulheres no interior das famílias, e entre famílias e Estado, por meio de políticas públicas de creches, cuidado de idosos e proteção a trabalhadoras domésticas.",
      },
    ],
  },

  {
    id: "crise-climatica",
    title: "Desafios para o Brasil no enfrentamento da crise climática e a promoção da justiça ambiental",
    instrucao: "Com base na leitura dos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre os desafios para o Brasil no enfrentamento da crise climática e a promoção da justiça ambiental. Apresente proposta de intervenção que respeite os direitos humanos.",
    difficulty: "Médio",
    category: "Meio Ambiente",
    texts: [
      {
        id: 1,
        label: "Texto I",
        type: "dado",
        source: "IPCC — Painel Intergovernamental sobre Mudanças Climáticas, Relatório AR6, 2022",
        content: "O aquecimento global já atingiu 1,1°C acima dos níveis pré-industriais — causado inequivocamente pela ação humana, segundo o IPCC. Sem ação urgente, ultrapassará 1,5°C até 2040. O Brasil é o 6º maior emissor de gases de efeito estufa, com 45% das emissões provenientes do desmatamento. Eventos climáticos extremos — enchentes, secas, ondas de calor — causaram R$ 38 bilhões em prejuízos ao Brasil em 2023, afetando desproporcionalmente populações periféricas e de baixa renda.",
      },
      {
        id: 2,
        label: "Texto II",
        type: "texto",
        source: "Ailton Krenak — A Vida Não É Útil (2020), adaptado",
        content: "A crise climática é a conseqüência de séculos de uma relação extrativista com a natureza — a ideia de que o planeta é recurso infinito a ser explorado para o lucro. Povos que jamais separaram humanidade e natureza — como os indígenas e quilombolas — sempre souberam que destruir o ambiente é destruir a si mesmo. A saída da crise não é tecnológica: é cultural. Exige repensar a relação com a terra, com o tempo e com o que chamamos de progresso.",
      },
      {
        id: 3,
        label: "Texto III",
        type: "dado",
        source: "INPE / SEEG — Sistema de Estimativas de Emissões, 2023",
        content: "O desmatamento da Amazônia emitiu 2,4 bilhões de toneladas de CO₂ entre 2019 e 2022. Em 2022, o Brasil desmatou 11.568 km² de floresta — área equivalente a 10 municípios de São Paulo. Cientistas estimam que a Amazônia pode atingir um 'ponto de não retorno' entre 20-25% de desmatamento, convertendo-se de sumidouro em emissora de carbono — processo irreversível. Hoje, 20% da floresta já foi destruída. As enchentes no RS em 2024, que causaram R$ 90 bilhões em prejuízos, foram amplificadas pelo aquecimento global.",
      },
      {
        id: 4,
        label: "Texto IV",
        type: "texto",
        source: "Conferência de Paris — Acordo de Paris, COP21, 2015",
        content: "O Acordo de Paris comprometeu 196 países a limitar o aquecimento global a 1,5°C e a alcançar neutralidade de carbono até 2050. O Brasil se comprometeu a desmatamento zero na Amazônia até 2030 e redução de 50% das emissões até 2035. O cumprimento dessas metas representa oportunidade econômica: investimentos em energia renovável geraram 11,5 milhões de empregos globalmente em 2022, e cada R$ 1 bilhão investido em renováveis no Brasil cria 3.200 empregos — o dobro dos setores fósseis.",
      },
      {
        id: 5,
        label: "Texto V",
        type: "dado",
        source: "Oxfam Brasil — Relatório sobre Justiça Climática, 2023",
        content: "Os 1% mais ricos do mundo emitem tanto carbono quanto os 66% mais pobres. No Brasil, comunidades periféricas, quilombolas e indígenas são as primeiras vítimas das mudanças climáticas — os menos responsáveis pelo problema e os mais afetados por ele. Enchentes, secas e deslizamentos atingem desproporcionalmente habitações em áreas de risco, onde moram populações de baixa renda. A justiça climática exige que as soluções não apenas reduzam emissões, mas protejam os mais vulneráveis dos impactos já inevitáveis.",
      },
    ],
  },

  {
    id: "fome-inseguranca-alimentar",
    title: "Desafios para a erradicação da fome e da insegurança alimentar no Brasil contemporâneo",
    instrucao: "Com base na leitura dos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre os desafios para a erradicação da fome e da insegurança alimentar no Brasil contemporâneo. Apresente proposta de intervenção que respeite os direitos humanos.",
    difficulty: "Médio",
    category: "Social",
    texts: [
      {
        id: 1,
        label: "Texto I",
        type: "dado",
        source: "PENSSAN — Pesquisa Nacional sobre Insegurança Alimentar, 2022",
        content: "33,1 milhões de brasileiros passam fome — retorno ao Mapa da Fome da ONU após sair em 2014. 125 milhões têm algum grau de insegurança alimentar. A pandemia reverteu 20 anos de progresso social: o Brasil, que em 2014 saiu do Mapa da Fome graças a programas de transferência de renda e desenvolvimento rural, voltou à situação crítica em 2022. Negros, indígenas e moradores do Nordeste representam 70% das pessoas em situação de fome severa.",
      },
      {
        id: 2,
        label: "Texto II",
        type: "texto",
        source: "Josué de Castro — Geografia da Fome (1946), adaptado",
        content: "A fome no Brasil não é fenômeno natural — é fenômeno político. Josué de Castro, médico e geógrafo pernambucano, demonstrou em 1946 que um país com terra fértil, água abundante e clima favorável mantinha populações famintas porque a produção de alimentos era organizada para a exportação e o lucro, não para a nutrição. Décadas depois, o Brasil produz alimentos para 1 bilhão de pessoas e ainda tem 33 milhões de famintos — confirmando que a fome é escolha política, não escassez absoluta.",
      },
      {
        id: 3,
        label: "Texto III",
        type: "dado",
        source: "FAO — Organização das Nações Unidas para Alimentação, 2023",
        content: "O Brasil exporta 100 milhões de toneladas de soja e milho por ano, mas tem 33 milhões de famintos. 19% das crianças brasileiras têm crescimento comprometido por desnutrição. O Bolsa Família, quando em pleno funcionamento, reduzia a fome em 35% e cada R$ 1 investido gerava R$ 1,78 em consumo local — demonstrando que transferência de renda é economicamente eficiente além de socialmente justa. O programa foi descontinuado em 2021 e substituído por benefício menor, coincidindo com a escalada da fome.",
      },
      {
        id: 4,
        label: "Texto IV",
        type: "texto",
        source: "Amartya Sen — Desenvolvimento como Liberdade (1999), adaptado",
        content: "Sen demonstrou que nenhuma fome em larga escala ocorreu em democracias funcionantes com imprensa livre — porque a visibilidade política do sofrimento gera pressão por resposta governamental. A fome é, portanto, problema de distribuição e de poder, não de produção. O 'direito à alimentação adequada' — reconhecido pelo Brasil como emenda constitucional desde 2010 — exige que o Estado atue ativamente para garantir acesso universal aos alimentos, não apenas que não os confisque.",
      },
    ],
  },

  {
    id: "exclusao-digital",
    title: "Desafios para a democratização do acesso à tecnologia digital e a redução da desigualdade no Brasil",
    instrucao: "Com base na leitura dos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre os desafios para a democratização do acesso à tecnologia digital e a redução da desigualdade no Brasil. Apresente proposta de intervenção que respeite os direitos humanos.",
    difficulty: "Médio",
    category: "Tecnologia",
    texts: [
      {
        id: 1,
        label: "Texto I",
        type: "dado",
        source: "CETIC.br — Pesquisa TIC Domicílios, 2023",
        content: "84% dos domicílios brasileiros têm acesso à internet, mas 72% dos moradores de baixa renda acessam exclusivamente via celular com dados limitados. Na zona rural, apenas 68% têm acesso. A velocidade média de internet nas periferias urbanas é 3 vezes menor que nas áreas nobres. Durante a pandemia, 5 milhões de estudantes não acessaram aulas remotas por falta de equipamento ou conectividade. A brecha digital reproduz e aprofunda a desigualdade econômica e educacional.",
      },
      {
        id: 2,
        label: "Texto II",
        type: "texto",
        source: "Amartya Sen — Desenvolvimento como Liberdade (1999), adaptado",
        content: "O acesso à informação e ao conhecimento é condição de expansão das capacidades humanas — o que Sen chama de 'funcionamentos' essenciais. Na sociedade digital, a exclusão tecnológica é forma de privação de liberdades: impede acesso ao mercado de trabalho, aos serviços públicos digitalizados e à participação política online. A exclusão digital não é apenas econômica — é epistêmica, cultural e política. Universalizar o acesso à tecnologia é, portanto, dimensão incontornável do desenvolvimento humano no século XXI.",
      },
      {
        id: 3,
        label: "Texto III",
        type: "dado",
        source: "Banco Mundial — Relatório sobre Economia Digital, 2022",
        content: "Países com maior desigualdade de renda apresentam maiores brechas digitais. No Brasil, o 1% mais rico tem acesso a internet de qualidade 15 vezes superior ao 50% mais pobre. A pandemia demonstrou que a digitalização dos serviços públicos — saúde, educação, benefícios sociais — sem garantir acesso universal aprofunda desigualdades: 13 milhões de brasileiros não conseguiram acessar o auxílio emergencial de forma digital durante o período mais crítico da crise sanitária.",
      },
      {
        id: 4,
        label: "Texto IV",
        type: "texto",
        source: "Marco Civil da Internet — Lei 12.965/2014 e LGPD — Lei 13.709/2018",
        content: "O Brasil avançou na regulação digital com o Marco Civil da Internet (2014), que estabelece princípios de neutralidade de rede e liberdade de expressão, e com a LGPD (2018), que regula o uso de dados pessoais. Porém, o acesso à tecnologia permanece desigual: a lei garante direitos formais a cidadãos que, na prática, não conseguem exercê-los por falta de conectividade ou letramento digital. Direitos formais sem condições materiais de exercício são insuficientes — o Estado precisa garantir tanto acesso quanto capacidade de uso crítico das tecnologias.",
      },
    ],
  },

  {
    id: "uberizacao-trabalho",
    title: "Desafios para a proteção social de trabalhadores em plataformas digitais e a regulação da economia de aplicativos",
    instrucao: "Com base na leitura dos textos motivadores e em seus conhecimentos, redija um texto dissertativo-argumentativo em modalidade escrita formal da língua portuguesa sobre os desafios para a proteção social de trabalhadores em plataformas digitais. Apresente proposta de intervenção que respeite os direitos humanos.",
    difficulty: "Difícil",
    category: "Trabalho",
    texts: [
      {
        id: 1,
        label: "Texto I",
        type: "dado",
        source: "IBGE — PNAD Contínua / MTE, 2023",
        content: "O Brasil tem 1,5 milhão de motoristas de aplicativo e 800 mil entregadores de plataforma, sem carteira assinada, FGTS, seguro-desemprego ou aposentadoria. A renda média do entregador é de R$ 1.200 mensais, abaixo do salário mínimo, com jornadas superiores a 10 horas diárias. 78% já sofreram acidentes de trabalho sem qualquer cobertura de saúde ou indenização. 73% desses trabalhadores migraram do desemprego — evidência de que a 'gig economy' não criou oportunidade nova, mas absorveu trabalhadores sem alternativa.",
      },
      {
        id: 2,
        label: "Texto II",
        type: "texto",
        source: "Ricardo Antunes — O Privilégio da Servidão (2018), adaptado",
        content: "A uberização representa nova forma de servidão: o trabalhador assume todos os riscos do capital — compra ou financia seu veículo, paga manutenção, combustível, celular e seguro — enquanto a plataforma fica com 20-30% do valor de cada serviço sem qualquer investimento produtivo. O discurso do 'seja seu próprio chefe' é ideologia que mascara a exploração: o entregador não tem autonomia sobre preços, rotas, horários ou clientes — os algoritmos decidem. É trabalho assalariado sem os direitos do trabalho assalariado.",
      },
      {
        id: 3,
        label: "Texto III",
        type: "dado",
        source: "Tribunal Superior do Trabalho / FGV, 2023",
        content: "O TST reconheceu vínculo empregatício de motoristas da Uber em decisões de primeira instância em 2023 — tendência que pode impactar centenas de milhares de trabalhadores. A União Europeia aprovou em 2023 diretiva que presume vínculo empregatício para trabalhadores de plataforma, exigindo que as empresas provem o contrário. No Brasil, projeto de lei do governo federal propõe regulação com seguro de acidentes, representação sindical e piso de R$ 32,10 por hora — ainda abaixo da CLT, mas acima da situação atual de desproteção total.",
      },
      {
        id: 4,
        label: "Texto IV",
        type: "texto",
        source: "Karl Polanyi — A Grande Transformação (1944), adaptado",
        content: "Polanyi demonstrou que mercados sem regulação social produzem destruição humana — daí a necessidade histórica da legislação trabalhista. O capitalismo de plataforma representa nova tentativa de tratar o trabalho humano como mercadoria pura, sujeita apenas à lei da oferta e demanda. A resposta histórica a essa tendência foi sempre a organização dos trabalhadores e a regulação estatal: não para destruir o mercado, mas para impedir que ele destrua as pessoas que o sustentam.",
      },
    ],
  },
];
