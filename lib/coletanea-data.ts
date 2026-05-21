export interface ColetaneaText {
  id: number;
  type: "texto" | "dado" | "charge" | "poema";
  source: string;
  content: string;
}

export interface Coletanea {
  theme: string;
  keywords: string[];
  texts: ColetaneaText[];
}

export const coletaneas: Coletanea[] = [
  {
    theme: "Crise da Saúde Mental na Era Digital",
    keywords: ["saúde mental", "era digital", "ansiedade", "depressão", "redes sociais"],
    texts: [
      { id: 1, type: "dado", source: "OMS, 2022", content: "A pandemia aumentou em 25% os transtornos de ansiedade e depressão globalmente. No Brasil, 11,5 milhões sofrem de depressão — a maior taxa da América Latina. Entre jovens de 15 a 24 anos, a prevalência de transtornos mentais saltou de 13% para 20% entre 2019 e 2021." },
      { id: 2, type: "texto", source: "Byung-Chul Han — Sociedade do Cansaço (2010)", content: "A sociedade do desempenho produz o sujeito do esgotamento e da depressão. O excesso de positividade — pressão incessante pelo rendimento — gera violência neuronal que paralisa o indivíduo. O sujeito contemporâneo é simultaneamente explorador e explorado de si mesmo." },
      { id: 3, type: "dado", source: "CFM, 2023", content: "O Brasil registrou aumento de 40% nas internações psiquiátricas de adolescentes entre 2019 e 2022. O número de jovens atendidos por tentativas de suicídio dobrou no período. O SUS registrou 1,2 milhão de atendimentos por transtornos mentais em crianças e adolescentes em 2022." },
      { id: 4, type: "texto", source: "Jonathan Haidt — A Geração Ansiosa (2024)", content: "A chegada dos smartphones nas mãos de adolescentes a partir de 2012 coincide com o início de uma epidemia de ansiedade e depressão entre jovens. As redes sociais expõem adolescentes a comparação constante, cyberbullying e privação de sono — três fatores ligados ao desenvolvimento de transtornos mentais." },
    ],
  },
  {
    theme: "IA e Manipulação Comportamental nas Redes Sociais",
    keywords: ["inteligência artificial", "manipulação", "algoritmo", "comportamento", "vigilância"],
    texts: [
      { id: 1, type: "texto", source: "Shoshana Zuboff — A Era do Capitalismo de Vigilância (2019)", content: "O capitalismo de vigilância extrai dados comportamentais dos usuários para prever e modificar seu comportamento futuro. As plataformas não vendem produtos — elas vendem os próprios usuários para anunciantes. A modificação comportamental em escala tornou-se o modelo de negócio das maiores empresas do mundo." },
      { id: 2, type: "dado", source: "MIT Media Lab, 2018", content: "Notícias falsas se propagam 6 vezes mais rapidamente que notícias verdadeiras no Twitter, pois conteúdo emocional gera mais engajamento. Um estudo demonstrou que usuários com maior exposição a notícias falsas têm 20% mais chance de votar em candidatos populistas." },
      { id: 3, type: "dado", source: "Cambridge Analytica — Congresso Americano, 2019", content: "O escândalo revelou que dados de 87 milhões de usuários do Facebook foram coletados sem consentimento para criar perfis psicológicos e microssegmentar propaganda política personalizada. A empresa operou em campanhas eleitorais de pelo menos 44 países entre 2013 e 2018." },
    ],
  },
  {
    theme: "Racismo Estrutural e Mercado de Trabalho",
    keywords: ["racismo estrutural", "mercado de trabalho", "desigualdade racial", "discriminação"],
    texts: [
      { id: 1, type: "dado", source: "IBGE — PNAD 2023", content: "Trabalhadores negros ganham em média 46% menos que brancos com a mesma escolaridade. A taxa de desemprego entre negros é de 11,2%, contra 6,9% entre brancos. Negros são 55% da população, mas apenas 29% dos cargos de gestão e 18% dos diretores executivos das 500 maiores empresas." },
      { id: 2, type: "texto", source: "Silvio Almeida — Racismo Estrutural (2018)", content: "O racismo estrutural não se resume a atos individuais. Ele é o resultado de uma ordem social que historicamente reservou melhores postos de trabalho, escolas e territórios para a população branca. As instituições reproduzem essa hierarquia racial mesmo quando nenhum membro tem intenção explicitamente racista." },
      { id: 3, type: "dado", source: "IPEA — Atlas da Violência 2023", content: "Jovens negros têm 2,9 vezes mais chances de ser assassinados do que jovens brancos no Brasil. No sistema prisional, 67% dos encarcerados são negros, evidenciando que o racismo estrutural permeia também o sistema de justiça criminal." },
    ],
  },
  {
    theme: "Desinformação e Democracia no Brasil",
    keywords: ["desinformação", "fake news", "democracia", "notícias falsas"],
    texts: [
      { id: 1, type: "texto", source: "Norberto Bobbio — O Futuro da Democracia (1986)", content: "A democracia pressupõe cidadãos informados capazes de tomar decisões racionais. Quando o espaço público é inundado por desinformação sistemática, a capacidade deliberativa é comprometida na origem: a decisão eleitoral deixa de ser racional e passa a ser produto de manipulação emocional." },
      { id: 2, type: "dado", source: "TSE — Relatório 2022", content: "O Brasil registrou 2.847 ações judiciais relacionadas à desinformação eleitoral em 2022. O TSE removeu mais de 25 mil conteúdos falsos. Pesquisa Datafolha revelou que 49% dos brasileiros acreditaram em ao menos uma notícia falsa sobre as eleições." },
      { id: 3, type: "dado", source: "Reuters Institute — Digital News Report 2023", content: "64% dos brasileiros afirmam já ter compartilhado notícias falsas sem perceber. O Brasil é o terceiro país com maior volume de desinformação em aplicativos de mensagem. O WhatsApp é o principal veículo: 89% das fake news circularam primeiro em mensageiros antes de chegarem às redes abertas." },
    ],
  },
  {
    theme: "Desafios para o combate à invisibilidade do trabalho de cuidado realizado pela mulher no Brasil",
    keywords: ["trabalho de cuidado", "trabalho doméstico", "invisibilidade feminina", "cuidado"],
    texts: [
      { id: 1, type: "dado", source: "IBGE — PNAD 2022", content: "Mulheres dedicam em média 21,3 horas semanais a afazeres domésticos e cuidados, enquanto homens dedicam apenas 11 horas. Esse trabalho invisível, se remunerado, representaria 11,4% do PIB brasileiro — mais do que o setor da construção civil. 92% das trabalhadoras domésticas são mulheres, sendo 65% negras." },
      { id: 2, type: "texto", source: "Simone de Beauvoir — O Segundo Sexo (1949)", content: "A divisão sexual do trabalho não é natural — ela é construída socialmente. A atribuição histórica do cuidado doméstico à mulher é resultado de uma hierarquia cultural que define o espaço privado como feminino e o espaço público como masculino, perpetuando desigualdades que limitam a autonomia e a participação econômica das mulheres." },
      { id: 3, type: "dado", source: "ONU Mulheres — Relatório 2023", content: "No mundo, as mulheres realizam 75% de todo o trabalho de cuidado não remunerado. No Brasil, a pandemia aprofundou essa disparidade: mulheres aumentaram em 29% o tempo dedicado ao cuidado de filhos e idosos, enquanto homens aumentaram apenas 5%. A sobrecarga do cuidado é o principal fator de limitação da inserção feminina no mercado formal." },
    ],
  },
  {
    theme: "Desafios para a valorização de comunidades e povos tradicionais no Brasil",
    keywords: ["comunidades tradicionais", "povos tradicionais", "quilombolas", "indígenas", "territórios"],
    texts: [
      { id: 1, type: "dado", source: "IBGE — Censo 2022", content: "O Brasil reconhece oficialmente 26 categorias de povos e comunidades tradicionais, incluindo indígenas, quilombolas, ribeirinhos e pescadores artesanais. Menos de 15% dos territórios quilombolas foram titulados desde a Constituição de 1988. Comunidades indígenas ocupam 13,8% do território nacional, mas abrigam 80% da biodiversidade restante do país." },
      { id: 2, type: "texto", source: "Boaventura de Sousa Santos — Epistemologias do Sul (2010)", content: "O epistemicídio — a destruição de saberes dos povos subalternizados — é tão violento quanto a destruição física. Comunidades tradicionais possuem conhecimentos sobre biodiversidade, manejo de recursos naturais e medicina que levaram milênios para se desenvolver e que a ciência ocidental está apenas começando a reconhecer como válidos." },
      { id: 3, type: "dado", source: "FUNAI — Relatório 2023", content: "O número de invasões a territórios indígenas aumentou 135% entre 2019 e 2023. Garimpo ilegal afeta 28 terras indígenas homologadas. Comunidades quilombolas enfrentam mais de 3.000 conflitos fundiários ativos. A morosidade na demarcação expõe essas comunidades a violência, destruição ambiental e perda cultural irreversível." },
    ],
  },
  {
    theme: "Invisibilidade e registro civil: ser invisível na sociedade brasileira",
    keywords: ["registro civil", "invisibilidade", "certidão de nascimento", "cidadania"],
    texts: [
      { id: 1, type: "dado", source: "CNJ — Conselho Nacional de Justiça, 2021", content: "Cerca de 3 milhões de brasileiros não possuem certidão de nascimento. Sem esse documento, é impossível acessar saúde pelo SUS, educação pública, benefícios sociais, conta bancária, trabalho formal ou votar. A ausência de registro é mais prevalente em populações indígenas, quilombolas e em regiões ribeirinhas e rurais remotas." },
      { id: 2, type: "texto", source: "Hannah Arendt — As Origens do Totalitarismo (1951)", content: "O ser humano sem documentos é o ser humano sem direitos. Arendt cunhou o conceito de 'direito a ter direitos' — a ideia de que a cidadania formal é a condição de possibilidade de todos os outros direitos. Sem reconhecimento jurídico pelo Estado, o indivíduo existe socialmente como inexistente, excluído de toda proteção legal." },
      { id: 3, type: "dado", source: "UNICEF Brasil, 2022", content: "O Brasil eliminou o sub-registro de nascimento, que chegou a 20% nos anos 1990, mas ainda enfrenta o problema do sub-registro tardio e das populações sem documentação atualizada. Estima-se que 5% da população adulta carece de ao menos um documento essencial. A distância geográfica dos cartórios é o principal obstáculo em comunidades ribeirinhas e indígenas." },
    ],
  },
  {
    theme: "O estigma associado às doenças mentais na sociedade brasileira",
    keywords: ["estigma", "doença mental", "preconceito", "saúde mental", "transtorno"],
    texts: [
      { id: 1, type: "dado", source: "CFM — Conselho Federal de Medicina, 2022", content: "Apenas 3 em cada 10 brasileiros com transtornos mentais buscam tratamento. O principal motivo alegado é o medo do julgamento social. O Brasil tem menos de 3 psiquiatras por 100 mil habitantes, contra a média de 12 recomendada pela OMS. O estigma atrasa em média 10 anos o diagnóstico de transtornos como esquizofrenia e bipolaridade." },
      { id: 2, type: "texto", source: "Erving Goffman — Estigma (1963)", content: "O estigma é um atributo que reduz o portador de uma 'pessoa completa e usual' a uma 'pessoa estragada e diminuída'. Doenças mentais são estigmatizadas porque violam expectativas culturais de racionalidade e autocontrole — valores centrais na modernidade. O estigmatizado internaliza a visão negativa social, gerando autoestigma que dificulta ainda mais a busca por ajuda." },
      { id: 3, type: "dado", source: "IBGE — Pesquisa Nacional de Saúde, 2019", content: "23% dos brasileiros relatam ter experimentado algum transtorno mental ao longo da vida. Destes, 78% afirmam que já foram discriminados por causa disso — no trabalho, na família ou nas relações sociais. O Brasil perde R$ 4 bilhões por ano em produtividade devido a transtornos mentais não tratados." },
    ],
  },
  {
    theme: "Manipulação do comportamento do usuário pelo controle de dados na internet",
    keywords: ["dados pessoais", "privacidade", "internet", "comportamento", "LGPD"],
    texts: [
      { id: 1, type: "texto", source: "Zygmunt Bauman e David Lyon — Vigilância Líquida (2013)", content: "A vigilância contemporânea não é mais imposta de fora — ela é voluntariamente alimentada pelos próprios vigiados. Ao aceitar termos de uso que ninguém lê, o usuário cede sua identidade digital. Dados de geolocalização, padrões de consumo e preferências políticas formam um perfil comercializável que as empresas vendem a governos, seguradoras e anunciantes." },
      { id: 2, type: "dado", source: "ANPD — Autoridade Nacional de Proteção de Dados, 2023", content: "A LGPD, em vigor desde 2020, já resultou em 1.847 reclamações formais e 23 sanções aplicadas até 2023. Empresas brasileiras sofreram 9,7 bilhões de ataques cibernéticos em 2022. Pesquisa do Instituto Locomotiva revela que 71% dos brasileiros desconhecem seus direitos sob a LGPD, evidenciando o abismo entre proteção legal e consciência cidadã." },
      { id: 3, type: "dado", source: "MIT — Relatório sobre Privacidade Digital, 2022", content: "Algoritmos de recomendação aumentam em média 64% o tempo que usuários passam em plataformas digitais. Quanto mais tempo na plataforma, mais dados gerados — e mais precisas as previsões comportamentais. Empresas de tecnologia sabem quando um usuário está prestes a romper um relacionamento antes que ele próprio tome consciência disso, com base em padrões de comportamento digital." },
    ],
  },
  {
    theme: "Desafios para a formação educacional de surdos no Brasil",
    keywords: ["surdos", "libras", "educação inclusiva", "deficiência auditiva", "acessibilidade"],
    texts: [
      { id: 1, type: "dado", source: "IBGE — Censo Escolar 2022", content: "O Brasil tem 2,7 milhões de pessoas com deficiência auditiva severa. Apenas 14% das escolas públicas possuem intérpretes de Libras. Das 19 mil escolas com alunos surdos, menos de 30% têm professores bilíngues. 68% dos surdos adultos brasileiros não completaram o ensino fundamental." },
      { id: 2, type: "texto", source: "Lei Brasileira de Inclusão — Lei 13.146/2015", content: "A Lei Brasileira de Inclusão garante às pessoas com deficiência o direito à educação inclusiva em todos os níveis, sem discriminação e com igualdade de oportunidades. Para surdos, a lei determina a oferta de educação bilíngue — em Libras como primeira língua e português escrito como segunda — e o acesso a intérpretes em todo o percurso escolar." },
      { id: 3, type: "texto", source: "Claudia Fernandes — Educação de Surdos no Brasil (2019)", content: "A comunidade surda não se percebe como deficiente, mas como pertencente a uma minoria linguística com cultura e identidade próprias. O modelo de educação oral, que durante décadas proibiu o uso de sinais, causou gerações de surdos com baixo letramento. A educação bilíngue, que coloca Libras como primeira língua, tem demonstrado resultados superiores tanto na aprendizagem quanto no desenvolvimento cognitivo." },
    ],
  },
  {
    theme: "Caminhos para combater a intolerância religiosa no Brasil",
    keywords: ["intolerância religiosa", "religião", "candomblé", "umbanda", "diversidade religiosa"],
    texts: [
      { id: 1, type: "dado", source: "Secretaria de Direitos Humanos, 2023", content: "O Brasil registrou 1.187 casos de intolerância religiosa em 2022 — alta de 22% em relação ao ano anterior. 89% das vítimas praticam religiões de matriz africana (candomblé, umbanda). Apenas 4% dos casos resultam em condenação criminal. Pesquisa DataFolha aponta que 22% dos brasileiros afirmam ter preconceito contra adeptos de religiões afro-brasileiras." },
      { id: 2, type: "texto", source: "Constituição Federal de 1988 — Art. 5º", content: "A Constituição Federal garante a inviolabilidade da liberdade de consciência e de crença, assegurando o livre exercício dos cultos religiosos e protegendo os locais de culto e suas liturgias. A perseguição por motivo religioso é crime inafiançável e imprescritível, equiparado ao racismo pela Lei 7.716/1989." },
      { id: 3, type: "texto", source: "Ronilda Iyakemi Ribeiro — Alma Africana no Brasil (1996)", content: "As religiões de matriz africana no Brasil são o resultado de um processo extraordinário de resistência cultural. Escravizados que foram proibidos de praticar suas religiões criaram sincretismos criativos para preservar seus orixás e entidades. Atacar os terreiros é, portanto, atacar a memória viva da diáspora africana — uma violência que se inscreve na continuidade histórica do racismo." },
    ],
  },
  {
    theme: "A persistência da violência contra a mulher na sociedade brasileira",
    keywords: ["violência contra a mulher", "feminicídio", "Lei Maria da Penha", "violência doméstica"],
    texts: [
      { id: 1, type: "dado", source: "Fórum Brasileiro de Segurança Pública, 2023", content: "O Brasil registrou 1.463 feminicídios em 2022 — um a cada 6 horas. Mulheres negras representam 61,8% das vítimas. A cada 7 minutos, uma mulher é agredida fisicamente no país. 52% dos crimes ocorrem na residência da vítima, perpetrados por parceiros ou ex-parceiros." },
      { id: 2, type: "texto", source: "Simone de Beauvoir — O Segundo Sexo (1949)", content: "A violência contra a mulher não é um fenômeno individual ou patológico — é a expressão extrema de uma estrutura de poder que historicamente subordinou o feminino ao masculino. A violência doméstica opera como mecanismo de controle que garante a manutenção da hierarquia de gênero, mesmo em contextos em que a igualdade formal já foi conquista." },
      { id: 3, type: "dado", source: "Instituto Avon/Data Popular, 2022", content: "A Lei Maria da Penha (11.340/2006), considerada pela ONU uma das melhores legislações de proteção à mulher, reduziu em 10% a taxa de homicídios femininos no primeiro ano de vigência. Porém, 40% das mulheres que registraram boletim de ocorrência por violência doméstica relataram que a agressão continuou depois. A eficácia da lei depende da capacitação dos agentes que a aplicam." },
    ],
  },
  {
    theme: "Publicidade infantil em questão no Brasil",
    keywords: ["publicidade infantil", "criança", "consumo", "propaganda", "marketing"],
    texts: [
      { id: 1, type: "dado", source: "IBGE — Pesquisa Nacional de Saúde Escolar, 2019", content: "Crianças brasileiras assistem em média 4 horas de televisão por dia e são expostas a cerca de 20 mil propagandas por ano. 67% das crianças de 6 a 12 anos influenciam diretamente as compras da família. O Brasil investe R$ 7 bilhões por ano em publicidade dirigida ao público infantil — o terceiro maior mercado desse segmento no mundo." },
      { id: 2, type: "texto", source: "CONANDA — Resolução 163/2014", content: "A Resolução 163 do Conselho Nacional dos Direitos da Criança e do Adolescente classifica como abusiva qualquer prática de comunicação mercadológica destinada à criança. A publicidade infantil é considerada abusiva porque crianças até 12 anos não possuem desenvolvimento cognitivo suficiente para compreender a intenção persuasiva da publicidade, tornando-as vulneráveis à manipulação." },
      { id: 3, type: "texto", source: "Zygmunt Bauman — Vida para Consumo (2008)", content: "A sociedade de consumo não nasce com adultos — ela é cultivada desde a infância. Ao transformar crianças em consumidores antes de serem cidadãos, o sistema garante a reprodução de uma cultura consumista. Brinquedos que se tornam obsoletos em meses, personagens licenciados e coleções intermináveis constroem a identidade infantil em torno do ter, não do ser." },
    ],
  },
  {
    theme: "O efeito da implantação da Lei Seca no Brasil",
    keywords: ["Lei Seca", "álcool", "trânsito", "direção", "acidentes"],
    texts: [
      { id: 1, type: "dado", source: "Denatran — Departamento Nacional de Trânsito, 2022", content: "Desde a implementação da Lei Seca em 2008, o número de mortes no trânsito relacionadas ao álcool caiu 45% nas principais capitais brasileiras. Nas cidades onde a fiscalização é mais rigorosa, a queda chega a 60%. Em 2022, o Brasil ainda registrou 33 mil mortes no trânsito — das quais 37% envolvem consumo de álcool, evidenciando que a lei funciona onde é aplicada." },
      { id: 2, type: "texto", source: "Constituição Federal — Art. 5º / Princípio da Proporcionalidade", content: "A Lei Seca representa exemplo clássico de tensão entre liberdade individual e segurança coletiva. O direito de consumir bebidas alcoólicas é legítimo, mas encontra limite quando seu exercício coloca em risco a vida de terceiros. O Estado, ao restringir a direção após o consumo de álcool, exerce função constitucional de proteção da vida — valor que supera a liberdade de locomoção individual." },
      { id: 3, type: "dado", source: "ABDETRAN — Associação Brasileira de Departamentos de Trânsito, 2023", content: "A Lei Seca enfrenta desafio de fiscalização irregular. Municípios com blitze regulares apresentam queda de 52% nos acidentes com álcool. Onde não há fiscalização, a lei tem efeito limitado. Operações relâmpago, aplicativos de transporte e campanhas educativas são apontados como instrumentos complementares necessários para que a legislação atinja seu potencial máximo." },
    ],
  },
  {
    theme: "O movimento imigratório para o Brasil no século XXI",
    keywords: ["imigração", "imigrantes", "refugiados", "xenofobia", "migração"],
    texts: [
      { id: 1, type: "dado", source: "CONARE — Comitê Nacional para Refugiados, 2023", content: "O Brasil possui 562 mil refugiados e migrantes em situação vulnerável, sendo 460 mil venezuelanos. O país reconheceu o status de refugiado a 70 mil pessoas em 2022 — recorde histórico. São Paulo, Roraima e Amazonas concentram 60% da população imigrante. Haitianos e africanos somam outros 80 mil migrantes em situação irregular ou com visto humanitário." },
      { id: 2, type: "texto", source: "Declaração Universal dos Direitos Humanos — ONU, 1948", content: "O artigo 14 da DUDH reconhece o direito de toda pessoa a buscar asilo contra perseguição em outros países. O Brasil, signatário da Convenção de 1951 sobre o Estatuto dos Refugiados, tem obrigação internacional de proteger quem foge de perseguições por raça, religião, nacionalidade ou opinião política. A Lei de Migração brasileira (2017) representa avanço ao substituir o Estatuto do Estrangeiro, que tratava o imigrante como ameaça à segurança nacional." },
      { id: 3, type: "dado", source: "UNHCR / ACNUR Brasil, 2023", content: "A xenofobia contra imigrantes venezuelanos em Roraima resultou em queima de acampamentos e violência em 2018. Pesquisas mostram que imigrantes no mercado formal contribuem mais em impostos do que recebem em serviços públicos. Cidades que integraram imigrantes — como Curitiba e São Paulo — apresentaram ganhos econômicos mensuráveis em setores como construção e alimentação." },
    ],
  },
  {
    theme: "Viver em rede no século XXI: os limites entre o público e o privado",
    keywords: ["redes sociais", "público", "privado", "internet", "identidade digital"],
    texts: [
      { id: 1, type: "texto", source: "Zygmunt Bauman — Modernidade Líquida (2000)", content: "Na modernidade líquida, a fronteira entre o público e o privado tornou-se porosa e instável. As redes sociais transformaram a vida privada em performance pública — o espaço íntimo virou vitrine. Paradoxalmente, quanto mais compartilhamos, mais vulneráveis nos tornamos: dados pessoais alimentam sistemas de vigilância que usamos mas não controlamos." },
      { id: 2, type: "dado", source: "DataSenado — Pesquisa de Privacidade Digital, 2023", content: "83% dos brasileiros têm perfil ativo em ao menos uma rede social. 71% já sofreram alguma forma de invasão de privacidade digital — como compartilhamento indevido de fotos ou dados. 45% admitiram ter publicado informações pessoais que arrependeram posteriormente. O Brasil registra uma das maiores taxas de exposição voluntária de dados pessoais do mundo." },
      { id: 3, type: "texto", source: "Michel Foucault — Vigiar e Punir (1975)", content: "Foucault demonstrou que a vigilância constante produz sujeitos que se auto-disciplinam. Nas redes sociais, esse mecanismo opera de forma invertida: os usuários se expõem voluntariamente porque a visibilidade tornou-se sinônimo de existência social. Quem não é visível online corre o risco de ser socialmente irrelevante — o que cria uma pressão permanente pela exposição." },
    ],
  },
  {
    theme: "O trabalho na construção da dignidade humana",
    keywords: ["trabalho", "dignidade humana", "emprego", "direitos trabalhistas"],
    texts: [
      { id: 1, type: "texto", source: "Karl Marx — O Capital (1867)", content: "Para Marx, o trabalho é a atividade pela qual o ser humano transforma a natureza e a si mesmo, realizando sua essência como ser genérico. A alienação ocorre quando o trabalhador não se reconhece no produto de seu trabalho, que lhe é expropriado pelo capital. O trabalho digno — aquele em que o ser humano se realiza — é condição de humanização, não apenas de sobrevivência." },
      { id: 2, type: "dado", source: "OIT — Organização Internacional do Trabalho, 2023", content: "O Brasil tem 38 milhões de trabalhadores informais — 36% da força de trabalho. A informalidade implica ausência de carteira assinada, FGTS, licença maternidade e aposentadoria. Trabalhadores informais ganham em média 40% menos que formais. A OIT define trabalho decente como aquele que oferece renda justa, segurança no emprego e proteção social." },
      { id: 3, type: "texto", source: "Constituição Federal de 1988 — Art. 6º e 7º", content: "A Constituição brasileira eleva o trabalho à categoria de direito social fundamental, ao lado da educação, saúde e moradia. O artigo 7º garante 34 direitos ao trabalhador, incluindo salário mínimo, jornada de 44 horas, 13º salário e proteção contra demissão arbitrária. A dignidade do trabalho é, portanto, não apenas filosófica, mas constitucionalmente garantida." },
    ],
  },
  {
    theme: "O papel da inteligência artificial no mercado de trabalho",
    keywords: ["inteligência artificial", "automação", "emprego", "futuro do trabalho", "robótica"],
    texts: [
      { id: 1, type: "dado", source: "World Economic Forum — Future of Jobs Report 2023", content: "A automação e a IA eliminarão 85 milhões de empregos até 2025, mas criarão 97 milhões de novas funções — saldo teórico positivo, mas que exige requalificação massiva. No Brasil, 54% das funções atuais têm alto risco de automação, segundo o IPEA. Trabalhadores com baixa escolaridade são os mais vulneráveis: 70% das tarefas automatizáveis são executadas por pessoas sem ensino superior." },
      { id: 2, type: "texto", source: "Yuval Noah Harari — Homo Deus (2015)", content: "A próxima grande divisão social não será entre ricos e pobres, mas entre os relevantes e os irrelevantes economicamente. Algoritmos que aprendem são mais precisos que humanos em diagnósticos médicos, análise jurídica e previsão financeira. A questão não é se a IA substituirá trabalhadores — já está substituindo — mas como garantir que os benefícios dessa transformação sejam distribuídos equitativamente." },
      { id: 3, type: "dado", source: "IPEA — Instituto de Pesquisa Econômica Aplicada, 2023", content: "No Brasil, o setor de serviços — que emprega 70% dos trabalhadores — é o mais vulnerável à automação. Caixas de banco, operadores de telemarketing e digitadores já foram amplamente substituídos. O mercado de trabalho brasileiro perde 1,2 milhão de empregos por ano para automação, enquanto a formação em áreas tecnológicas cresce apenas 3% ao ano — insuficiente para a demanda projetada." },
    ],
  },
  {
    theme: "Deepfakes e a crise de confiança na informação visual",
    keywords: ["deepfake", "desinformação", "vídeo falso", "tecnologia", "confiança"],
    texts: [
      { id: 1, type: "dado", source: "Deeptrace Labs — Relatório 2023", content: "O número de deepfakes na internet cresceu 900% entre 2019 e 2023. 96% dos deepfakes detectados são pornográficos e têm mulheres como vítimas sem consentimento. Durante as eleições de 2024 em múltiplos países, deepfakes de candidatos foram usados para criar declarações falsas que circularam como autênticas. Detectores de deepfake têm eficácia média de apenas 65%." },
      { id: 2, type: "texto", source: "Jean Baudrillard — Simulacros e Simulação (1981)", content: "Baudrillard previu uma era em que os simulacros — cópias sem original — substituem a realidade. Os deepfakes são a realização radical dessa profecia: imagens sintéticas indistinguíveis das reais destroem a confiança na evidência visual, que foi o fundamento da epistemologia moderna. Quando qualquer vídeo pode ser falso, nenhum vídeo pode ser tomado como verdadeiro." },
      { id: 3, type: "dado", source: "MIT Media Lab, 2023", content: "Humanos conseguem identificar deepfakes com precisão de apenas 54% — praticamente o acaso. Ferramentas de detecção automática chegam a 73%, mas ficam obsoletas à medida que os algoritmos de geração evoluem. Legislações específicas contra deepfakes maliciosos existem em apenas 11 países. O Brasil não possui regulamentação específica, dependendo da Lei Geral de Proteção de Dados e do Marco Civil da Internet." },
    ],
  },
  {
    theme: "Desigualdade digital e exclusão social no Brasil",
    keywords: ["exclusão digital", "desigualdade digital", "internet", "acesso", "tecnologia"],
    texts: [
      { id: 1, type: "dado", source: "CETIC.br — TIC Domicílios 2023", content: "84% dos domicílios brasileiros têm acesso à internet, mas 72% dos moradores de baixa renda acessam exclusivamente via celular com dados limitados. Na zona rural, apenas 68% têm acesso. A velocidade média de internet nas periferias urbanas é 3 vezes menor que nas áreas nobres. Durante a pandemia, 5 milhões de estudantes não tiveram acesso a aulas remotas por falta de equipamento ou conectividade." },
      { id: 2, type: "texto", source: "Amartya Sen — Desenvolvimento como Liberdade (1999)", content: "O acesso à informação e ao conhecimento é condição de expansão das capacidades humanas. Na sociedade digital, a exclusão tecnológica é uma forma de privação de liberdades — impede o acesso ao mercado de trabalho, aos serviços públicos digitalizados e à participação política online. A exclusão digital não é apenas econômica: ela é epistêmica, cultural e política." },
      { id: 3, type: "dado", source: "Banco Mundial — Relatório sobre Desigualdade Digital 2022", content: "Países com maior desigualdade de renda apresentam maiores brechas digitais. No Brasil, o 1% mais rico tem acesso a internet de qualidade 15 vezes superior ao 50% mais pobre. A pandemia de COVID-19 demonstrou que a digitalização dos serviços públicos — saúde, educação, benefícios — sem garantir acesso universal aprofunda desigualdades existentes." },
    ],
  },
  {
    theme: "Impactos das redes sociais sobre a democracia",
    keywords: ["redes sociais", "democracia", "bolhas", "polarização", "eleições"],
    texts: [
      { id: 1, type: "texto", source: "Hannah Arendt — A Condição Humana (1958)", content: "A democracia depende de um espaço público compartilhado onde os cidadãos deliberam com base em fatos comuns. Os algoritmos das redes sociais constroem realidades paralelas, fragmentando o espaço público em bolhas de filtro que eliminam o dissenso. Quando grupos distintos habitam realidades informacionais incompatíveis, o diálogo democrático torna-se impossível." },
      { id: 2, type: "dado", source: "Pew Research Center, 2023", content: "76% dos usuários americanos de redes sociais relatam que a internet os deixou mais polarizados politicamente. No Brasil, pesquisa do IBOPE aponta que 68% dos eleitores afirmam que as redes sociais influenciaram seu voto nas últimas eleições. Algoritmos de engajamento priorizam conteúdo raivoso e extremista, pois este gera mais interações — criando incentivo estrutural à radicalização." },
      { id: 3, type: "texto", source: "Eli Pariser — O Filtro Invisível (2011)", content: "O filtro invisível dos algoritmos cria uma realidade personalizada que confirma e amplifica as crenças do usuário, excluindo informações contraditórias. Ao contrário da pluralidade editorial dos meios tradicionais, as redes sociais automatizam a segregação informacional em escala. O resultado é uma democracia de monólogos paralelos, não de diálogos que constroem consensos." },
    ],
  },
  {
    theme: "O uso de algoritmos na concessão de crédito e o racismo digital",
    keywords: ["algoritmo", "crédito", "racismo digital", "discriminação algorítmica"],
    texts: [
      { id: 1, type: "dado", source: "Serasa Experian / IBGE, 2023", content: "79% dos inadimplentes brasileiros são negros ou pardos. Algoritmos de crédito usam código postal, histórico de consumo e padrões de comportamento digital — variáveis altamente correlacionadas com raça e classe — para negar crédito. No Brasil, negros pagam em média 2,3 pontos percentuais a mais de juros que brancos para crédito equivalente." },
      { id: 2, type: "texto", source: "Safiya Umoja Noble — Algorithms of Oppression (2018)", content: "Os algoritmos não são neutros — eles refletem as escolhas e os preconceitos de quem os programou e dos dados históricos com que foram treinados. Dados históricos de crédito, emprego e educação carregam séculos de discriminação racial. Ao treinar algoritmos com esses dados, automatizamos e escalamos o racismo — tornando-o mais eficiente, menos visível e muito mais difícil de contestar." },
      { id: 3, type: "dado", source: "Instituto Propan / FGV, 2022", content: "Estudo com 2 milhões de requisições de crédito no Brasil mostrou que candidatos com nomes tipicamente negros tinham 23% mais chances de ter o crédito negado, controlando por renda e histórico financeiro. Plataformas de emprego online mostram vagas de salário menor para usuários que acessam via bairros periféricos, evidenciando discriminação geográfica automatizada." },
    ],
  },
  {
    theme: "Desafios para a universalização da educação básica no Brasil",
    keywords: ["educação básica", "evasão escolar", "analfabetismo", "escola pública"],
    texts: [
      { id: 1, type: "dado", source: "INEP — Censo Escolar 2023", content: "O Brasil tem 1,7 milhão de jovens de 15 a 17 anos fora da escola. A evasão escolar no ensino médio é de 11,5% ao ano. 50% dos alunos do 9º ano não dominam a leitura em nível adequado para a série. O índice de analfabetismo entre adultos é de 5,8% — 11 milhões de brasileiros — sendo 70% negros e 60% moradores do Nordeste." },
      { id: 2, type: "texto", source: "Paulo Freire — Pedagogia do Oprimido (1968)", content: "A educação bancária — que trata o aluno como receptáculo passivo de conteúdo — não liberta: domestica. Uma educação verdadeiramente transformadora parte da realidade concreta do educando, tornando-o sujeito do processo de conhecimento. A evasão escolar não é falha individual do aluno, mas resposta racional a um sistema que não reconhece sua realidade como válida." },
      { id: 3, type: "dado", source: "PNAD Educação / IBGE, 2022", content: "Jovens de famílias no quintil mais pobre têm 4 vezes mais chances de abandonar a escola do que os do quintil mais rico. O trabalho infantil responde por 35% da evasão no ensino fundamental. Escolas sem biblioteca, laboratório ou acesso à internet — que são 43% das escolas públicas brasileiras — apresentam taxa de evasão 2,5 vezes maior que escolas com infraestrutura completa." },
    ],
  },
  {
    theme: "O papel das cotas raciais no ensino superior brasileiro",
    keywords: ["cotas raciais", "ação afirmativa", "ensino superior", "universidade"],
    texts: [
      { id: 1, type: "dado", source: "ANDIFES — Associação Nacional dos Dirigentes das IFES, 2023", content: "Após dez anos da Lei de Cotas (12.711/2012), estudantes negros e pardos passaram de 9% para 36% nas universidades federais. O desempenho acadêmico dos cotistas é estatisticamente equivalente ao dos não-cotistas. A taxa de formatura de cotistas negros nas federais é de 71% — superior à média nacional do ensino superior privado (63%)." },
      { id: 2, type: "texto", source: "John Rawls — Uma Teoria da Justiça (1971)", content: "O princípio da diferença de Rawls estabelece que desigualdades só são justificadas quando beneficiam os membros mais desfavorecidos da sociedade. Aplicado às cotas, o argumento rawlsiano é claro: num contexto de desigualdade histórica, tratar a todos identicamente é reproduzir a desigualdade. A igualdade real exige tratamento desigual para corrigir desequilíbrios estruturais." },
      { id: 3, type: "texto", source: "STF — Arguição de Descumprimento de Preceito Fundamental 186, 2012", content: "O STF, por unanimidade, declarou as políticas de cotas raciais nas universidades constitucionais. O relator, ministro Ricardo Lewandowski, fundamentou que as cotas corrigem desigualdade histórica, são temporárias e reversíveis, e não violam a meritocracia — pois o mérito acadêmico só tem sentido numa sociedade de oportunidades efetivamente iguais." },
    ],
  },
  {
    theme: "Educação financeira como instrumento de cidadania",
    keywords: ["educação financeira", "endividamento", "finanças pessoais", "consumo"],
    texts: [
      { id: 1, type: "dado", source: "Serasa Experian, 2023", content: "O Brasil tem 72 milhões de inadimplentes — 40% da população adulta. O endividamento médio das famílias representa 58% da renda anual. Entre jovens de 18 a 25 anos, 68% não sabem calcular juros compostos. A inadimplência custa R$ 380 bilhões por ano à economia brasileira em crédito não realizado e juros elevados." },
      { id: 2, type: "texto", source: "OCDE — Princípios de Alto Nível sobre Educação Financeira, 2012", content: "A OCDE define educação financeira como a capacidade de compreender conceitos e riscos financeiros, e de aplicar habilidades, motivação e confiança para tomar decisões eficazes. Países com maior índice de educação financeira apresentam menores taxas de inadimplência, maior poupança privada e menor dependência de benefícios sociais de emergência." },
      { id: 3, type: "dado", source: "BCB — Banco Central do Brasil, 2022", content: "O Brasil incluiu educação financeira na Base Nacional Curricular Comum (BNCC) em 2017, mas apenas 23% das escolas implementam o conteúdo de forma sistemática. Países como Estados Unidos, Reino Unido e Austrália tornam a disciplina obrigatória desde o ensino fundamental. Estudos mostram que crianças que recebem educação financeira apresentam, na vida adulta, 30% menos probabilidade de acumular dívidas problemáticas." },
    ],
  },
  {
    theme: "A crise da leitura no Brasil e seus impactos sociais",
    keywords: ["leitura", "analfabetismo funcional", "livros", "cultura"],
    texts: [
      { id: 1, type: "dado", source: "INAF — Indicador de Alfabetismo Funcional, 2022", content: "29% dos brasileiros adultos são analfabetos funcionais — leem, mas não compreendem textos simples. Apenas 12% são plenamente alfabetizados, capazes de interpretar textos complexos e realizar operações matemáticas avançadas. O brasileiro lê em média 2,43 livros por ano, contra 10 na Alemanha e 7 no Chile. 52% dos lares brasileiros não possuem nenhum livro." },
      { id: 2, type: "texto", source: "Paulo Freire — A Importância do Ato de Ler (1981)", content: "A leitura do mundo precede a leitura da palavra. Ler não é decifrar grafemas — é compreender o contexto histórico, político e cultural em que o texto foi produzido. Um leitor crítico é um cidadão capaz de questionar o poder e transformar sua realidade. O analfabetismo funcional não é ausência de habilidade técnica: é ausência de instrumento de libertação." },
      { id: 3, type: "dado", source: "Retratos da Leitura no Brasil — Instituto Pró-Livro, 2020", content: "52% dos brasileiros não leram nenhum livro no último ano. Entre os que leem, 42% são estudantes — o que indica que a leitura é associada à obrigação escolar, não ao prazer. A ausência de bibliotecas públicas acessíveis — o Brasil tem 1 biblioteca para cada 20 mil habitantes, enquanto a recomendação da ONU é 1 para cada 5 mil — é fator estrutural do déficit de leitura." },
    ],
  },
  {
    theme: "Desafios para o combate às mudanças climáticas no Brasil",
    keywords: ["mudanças climáticas", "aquecimento global", "clima", "emissões", "carbono"],
    texts: [
      { id: 1, type: "dado", source: "IPCC — Relatório AR6, 2022", content: "O aquecimento global já atingiu 1,1°C acima dos níveis pré-industriais. Sem ação urgente, ultrapassará 1,5°C até 2040. O Brasil é o 6º maior emissor de gases de efeito estufa do mundo, sendo 45% das emissões provenientes de mudança de uso do solo (desmatamento). Seca, chuvas extremas e aumento do nível do mar ameaçam populações costeiras e agricultores." },
      { id: 2, type: "texto", source: "Ailton Krenak — Ideias para Adiar o Fim do Mundo (2019)", content: "A crise climática é inseparável da colonização: foi a lógica extrativista europeia, que trata a natureza como recurso infinito a ser explorado, que produziu o colapso ambiental atual. Povos indígenas, que jamais separaram humanidade e natureza, sempre souberam que destruir o ambiente é destruir a si mesmo. Escutá-los não é romantismo — é urgência civilizacional." },
      { id: 3, type: "dado", source: "SEEG — Sistema de Estimativas de Emissões de Gases, 2023", content: "O desmatamento da Amazônia emitiu 2,4 bilhões de toneladas de CO₂ entre 2019 e 2022. A agropecuária responde por 73% das emissões brasileiras rastreáveis. Em 2022, o Brasil desmatou 11.568 km² — área equivalente a 10 São Paulos. As enchentes e secas extremas no Brasil causaram prejuízos de R$ 38 bilhões em 2023 — evidência direta dos custos da inação climática." },
    ],
  },
  {
    theme: "A questão dos resíduos sólidos e o descarte inadequado de lixo no Brasil",
    keywords: ["resíduos sólidos", "lixo", "reciclagem", "descarte", "lixão"],
    texts: [
      { id: 1, type: "dado", source: "ABRELPE — Panorama dos Resíduos Sólidos no Brasil, 2023", content: "O Brasil produz 82 milhões de toneladas de resíduos por ano — 225 mil toneladas/dia. Apenas 4% são reciclados, contra 34% na Europa. 40% do lixo ainda vai para lixões e aterros clandestinos. 800 municípios descumprem a Política Nacional de Resíduos Sólidos. Catadores de recicláveis — 800 mil trabalhadores, 70% negros — coletam 90% dos materiais recicláveis do país sem qualquer proteção social." },
      { id: 2, type: "texto", source: "Política Nacional de Resíduos Sólidos — Lei 12.305/2010", content: "A PNRS estabelece responsabilidade compartilhada pelo ciclo de vida dos produtos: fabricantes, distribuidores, comerciantes e consumidores têm obrigações específicas. A logística reversa — devolução de embalagens, eletrônicos e pilhas para fabricantes — é obrigatória por lei, mas implementada de forma incompleta. A lei prevê encerramento de todos os lixões até 2014, prazo que foi prorrogado indefinidamente." },
      { id: 3, type: "dado", source: "PNUMA — Programa das Nações Unidas para o Meio Ambiente, 2022", content: "O plástico representa 16% dos resíduos sólidos urbanos brasileiros, com taxa de reciclagem de apenas 1,2%. O Brasil joga 10,6 mil toneladas de plástico nos oceanos por ano — 3º maior poluidor plástico marinho do mundo. Estudos mostram microplásticos no sangue, placenta e leite materno humanos, com efeitos ainda não completamente compreendidos para a saúde." },
    ],
  },
  {
    theme: "Segurança hídrica e crise da água no Brasil",
    keywords: ["água", "segurança hídrica", "saneamento", "seca", "recursos hídricos"],
    texts: [
      { id: 1, type: "dado", source: "ANA — Agência Nacional de Águas, 2023", content: "O Brasil possui 12% da água doce superficial do mundo, mas a distribuição é profundamente desigual: 80% está na Amazônia, onde vive 5% da população. 100 milhões de brasileiros não têm acesso a esgoto tratado. 35 milhões não têm água potável. A seca no Nordeste perdura há mais de 10 anos, afetando 12 milhões de pessoas no Semiárido." },
      { id: 2, type: "texto", source: "ONU — Resolução 64/292, 2010", content: "Em 2010, a ONU reconheceu o acesso à água potável limpa e ao saneamento como direito humano fundamental, essencial para o pleno gozo da vida e de todos os outros direitos. Sem água, não há saúde, educação ou dignidade. Países que privatizaram serviços de água sem regulação adequada apresentaram aumento de doenças de veiculação hídrica em populações de baixa renda." },
      { id: 3, type: "dado", source: "TRATA BRASIL / Instituto Trata Brasil, 2022", content: "Cada R$ 1 investido em saneamento básico gera R$ 4 em economia com saúde pública. No Brasil, doenças de veiculação hídrica custam R$ 13 bilhões por ano ao SUS. Municípios com saneamento universal apresentam 67% menos internações por diarreia infantil. O Marco Legal do Saneamento (2020) prevê universalização do serviço até 2033 — meta considerada desafiadora pela maioria dos especialistas." },
    ],
  },
  {
    theme: "O papel do agronegócio no desmatamento e na crise ambiental",
    keywords: ["agronegócio", "desmatamento", "cerrado", "amazônia", "soja"],
    texts: [
      { id: 1, type: "dado", source: "MapBiomas — Relatório Anual de Desmatamento 2023", content: "O agronegócio é responsável por 85% do desmatamento no Brasil. A soja e a pecuária avançam sobre 1,2 milhão de hectares de vegetação nativa por ano. O Cerrado perdeu 50% de sua cobertura original — mais do que a Amazônia proporcionalmente. A destruição do Cerrado ameaça nascentes de 8 das 12 principais bacias hidrográficas brasileiras." },
      { id: 2, type: "texto", source: "Decreto 6.321/2007 — Plano de Ação para Prevenção e Controle do Desmatamento", content: "O Brasil implementou com sucesso políticas de monitoramento por satélite que reduziram o desmatamento na Amazônia em 83% entre 2004 e 2012 — demonstrando que produção agropecuária e preservação ambiental podem coexistir com regulação eficaz. A reversão dessas políticas entre 2019 e 2022 resultou em aumento imediato do desmatamento, evidenciando que a destruição é escolha política, não inevitabilidade econômica." },
      { id: 3, type: "dado", source: "WWF Brasil, 2023", content: "85% dos produtos exportados pelo agronegócio brasileiro têm como destino mercados que exigem rastreabilidade ambiental. A União Europeia aprovou legislação que barra importações de produtos vinculados ao desmatamento a partir de 2024. Estima-se que o Brasil pode perder R$ 100 bilhões em exportações se não apresentar credenciais ambientais — tornando a agenda verde economicamente estratégica, não apenas moral." },
    ],
  },
  {
    theme: "Energias renováveis como alternativa à crise climática",
    keywords: ["energia renovável", "solar", "eólica", "sustentabilidade", "transição energética"],
    texts: [
      { id: 1, type: "dado", source: "ANEEL — Agência Nacional de Energia Elétrica, 2023", content: "O Brasil é o 9º maior produtor de energia renovável do mundo. 83% da matriz elétrica brasileira é de origem renovável — hidrelétricas (63%), eólica (12%), solar (5%) e biomassa (8%). A capacidade solar instalada cresceu 2.000% entre 2019 e 2023. Custo da energia solar caiu 89% em uma década, tornando-a mais barata que carvão e gás natural." },
      { id: 2, type: "texto", source: "Conferência Rio-92 — Agenda 21, 1992", content: "A Agenda 21, assinada por 178 países incluindo o Brasil, estabeleceu a transição para energias limpas como imperativo do desenvolvimento sustentável. Três décadas depois, a urgência tornou-se emergência: o IPCC confirma que apenas substituição acelerada de combustíveis fósseis por renováveis pode limitar o aquecimento a 1,5°C. A demora representa não apenas custo ambiental, mas ameaça à soberania energética nacional." },
      { id: 3, type: "dado", source: "IRENA — International Renewable Energy Agency, 2023", content: "Investimentos em energia renovável geraram 11,5 milhões de empregos globalmente em 2022. No Brasil, setor solar emprega 500 mil pessoas diretamente. Países que lideraram a transição energética reduziram dependência de importações de combustíveis, melhorando balanço comercial. A cada R$ 1 bilhão investido em renováveis no Brasil, criam-se 3.200 empregos — mais que o dobro dos setores fósseis equivalentes." },
    ],
  },
  {
    theme: "Desafios para o fortalecimento do SUS no Brasil",
    keywords: ["SUS", "saúde pública", "sistema de saúde", "sus", "saúde universal"],
    texts: [
      { id: 1, type: "dado", source: "CFM / DataSUS, 2023", content: "O SUS atende 190 milhões de brasileiros — 75% da população. O Brasil investe R$ 750 por habitante/ano em saúde pública, contra R$ 3.200 em países com sistemas semelhantes. Há 2,3 médicos por 1.000 habitantes no Brasil, contra 4,3 recomendados pela OMS. Regiões Norte e Nordeste têm índice de médicos 3 vezes menor que o Sul e Sudeste." },
      { id: 2, type: "texto", source: "Constituição Federal de 1988 — Art. 196", content: "A saúde é direito de todos e dever do Estado, garantido mediante políticas sociais e econômicas que visem à redução do risco de doença. O SUS, criado pela Constituição Cidadã de 1988, representa conquista histórica: pela primeira vez, o Estado brasileiro reconheceu que a saúde não é mercadoria, mas direito universal. O subfinanciamento crónico representa, portanto, violação constitucional cotidiana." },
      { id: 3, type: "dado", source: "IPEA, 2022", content: "Cada R$ 1 investido no SUS gera R$ 1,70 em atividade econômica. O sistema preveniu 76 mil mortes infantis e evitou 5 milhões de óbitos entre 2003 e 2017 por meio de programas de vacinação. Porém, Emenda Constitucional 95 congelou investimentos em saúde por 20 anos, reduzindo em R$ 22 bilhões o orçamento real do SUS entre 2017 e 2022." },
    ],
  },
  {
    theme: "O combate ao sedentarismo e à obesidade no Brasil",
    keywords: ["obesidade", "sedentarismo", "alimentação", "saúde", "ultraprocessados"],
    texts: [
      { id: 1, type: "dado", source: "IBGE — Pesquisa Nacional de Saúde, 2022", content: "57% dos brasileiros estão acima do peso; 25,9% são obesos — alta de 72% em 10 anos. O consumo de alimentos ultraprocessados aumentou 40% entre 2008 e 2020. Apenas 38% dos brasileiros praticam atividade física regularmente. Doenças crônicas não transmissíveis — diabetes, hipertensão, cardiopatias — associadas ao sedentarismo e à má alimentação, representam 72% das mortes no Brasil." },
      { id: 2, type: "texto", source: "Michael Pollan — Em Defesa da Comida (2008)", content: "A indústria alimentar transformou a alimentação de prática cultural em transação econômica. Alimentos ultraprocessados — formulações industriais com dezenas de ingredientes artificiais — são projetados para maximizar consumo, não nutrição. A crise de saúde associada à dieta ocidental não é falha individual de escolha: é resultado de um sistema alimentar que incentiva o consumo de produtos prejudiciais à saúde." },
      { id: 3, type: "dado", source: "OMS — Estratégia Global sobre Dieta e Atividade Física, 2022", content: "A obesidade custa ao Brasil R$ 108 bilhões por ano em tratamentos e produtividade perdida. O imposto sobre bebidas açucaradas, adotado por 50 países, reduziu o consumo em até 40% no México. Políticas de rotulagem frontal de alimentos, como o modelo chileno adotado pelo Brasil em 2022, reduzem a intenção de compra de ultraprocessados em 25%, segundo estudos do Inmetro." },
    ],
  },
  {
    theme: "O papel das fake news na resistência às vacinas",
    keywords: ["antivacina", "vacinas", "fake news", "vacinação", "imunização"],
    texts: [
      { id: 1, type: "dado", source: "OPAS — Organização Pan-Americana da Saúde, 2023", content: "A cobertura vacinal no Brasil caiu de 95% para 79% entre 2015 e 2022 — abaixo dos 95% necessários para imunidade coletiva. O sarampo, erradicado do Brasil em 2016, reemergiu em 2018 com 16 mil casos. A poliomielite, erradicada em 1994, voltou a registrar casos em 2022. A queda na vacinação está diretamente correlacionada ao aumento da desinformação sobre vacinas nas redes sociais." },
      { id: 2, type: "texto", source: "Richard Dawkins — O Gene Egoísta (1976)", content: "Dawkins cunhou o conceito de 'meme' — unidade de informação cultural que se replica de forma análoga ao gene. Fake news funcionam como memes altamente contagiosos: apelam às emoções, confirmam preconceitos e resistem à contradição factual. Quanto mais dramática a afirmação falsa, mais se replica — uma assimetria fatal quando aplicada a informações de saúde pública." },
      { id: 3, type: "dado", source: "Nature — Estudo sobre desinformação vacinal, 2022", content: "Grupos antivacina nas redes sociais cresceram 7.000% entre 2019 e 2022. Estudo publicado na Nature demonstrou que usuários expostos a desinformação antivacina têm 4 vezes mais chance de recusar imunização. O custo das epidemias de doenças evitáveis por vacina, associadas à queda de cobertura, é estimado em R$ 15 bilhões ao SUS nos próximos 10 anos." },
    ],
  },
  {
    theme: "A violência contra a população negra no Brasil",
    keywords: ["violência", "população negra", "homicídio", "racismo", "jovens negros"],
    texts: [
      { id: 1, type: "dado", source: "IPEA — Atlas da Violência 2023", content: "Jovens negros de 15 a 29 anos têm 2,9 vezes mais chance de ser assassinados que jovens brancos na mesma faixa etária. Negros representam 77% das vítimas de homicídio no Brasil. A taxa de homicídios de negros cresceu 11,5% entre 2009 e 2019, enquanto a de brancos caiu 33,4% no mesmo período — demonstrando que a redução da violência não foi universal." },
      { id: 2, type: "texto", source: "Frantz Fanon — Os Condenados da Terra (1961)", content: "A violência colonial não terminou com a independência formal — ela se reproduz nas estruturas sociais que mantêm colonizados em posição de subalternidade. No Brasil, a população negra ocupa os territórios mais violentos, tem acesso mais precário à justiça e é tratada como suspeita pelo aparato policial. A violência letal contra negros é, portanto, continuação da violência estrutural do racismo." },
      { id: 3, type: "dado", source: "Fórum Brasileiro de Segurança Pública, 2023", content: "67% das pessoas mortas pela polícia no Brasil são negras. Em operações policiais em favelas, 85% das vítimas são negras. O Rio de Janeiro registra uma morte por intervenção policial a cada 5 horas. Cidades com polícias mais racialmente diversas apresentam taxas 20% menores de uso letal da força contra negros, segundo estudo do CRISP/UFMG." },
    ],
  },
  {
    theme: "Desafios para a redução da violência nas escolas",
    keywords: ["violência escolar", "bullying", "cyberbullying", "escola", "segurança"],
    texts: [
      { id: 1, type: "dado", source: "UNESCO / INEP, 2023", content: "61% dos estudantes brasileiros relatam já ter sofrido bullying na escola. O cyberbullying afeta 40% dos adolescentes entre 12 e 17 anos. Escolas com casos de violência têm taxa de evasão 35% maior. O Brasil registrou 11 ataques a escolas em 2023 — alta de 400% em relação a 2018. Turmas com histórico de violência apresentam desempenho 18% inferior no SAEB." },
      { id: 2, type: "texto", source: "Émile Durkheim — As Regras do Método Sociológico (1895)", content: "A violência escolar não é fenômeno individual — é fato social. Durkheim demonstrou que comportamentos aparentemente individuais têm causas coletivas: desemprego, desigualdade, ausência de vínculos comunitários e anomia social produzem violência. Soluções punitivas individuais são insuficientes: é preciso atacar as condições sociais que a produzem." },
      { id: 3, type: "dado", source: "Unicef Brasil, 2022", content: "Programas de mediação de conflitos nas escolas reduzem em 30% os casos de violência registrados. Países que implementaram equipes multidisciplinares — psicólogos, assistentes sociais e mediadores — nas escolas públicas apresentaram queda de 45% em casos graves. No Brasil, apenas 8% das escolas públicas têm psicólogo e 12% têm assistente social — evidência do desinvestimento em prevenção." },
    ],
  },
  {
    theme: "O encarceramento em massa e o fracasso do sistema prisional",
    keywords: ["encarceramento", "prisão", "sistema prisional", "ressocialização"],
    texts: [
      { id: 1, type: "dado", source: "DEPEN — Departamento Penitenciário Nacional, 2023", content: "O Brasil tem 920 mil presos — 3ª maior população carcerária do mundo, atrás de EUA e China. O déficit de vagas é de 340 mil. 41% dos presos são provisórios — aguardam julgamento sem condenação. 68% são reincidentes. O custo por preso é de R$ 2.400/mês — equivalente a 2 matrículas universitárias. A cada 3 presos soltos, 2 retornam ao sistema em 5 anos." },
      { id: 2, type: "texto", source: "Michel Foucault — Vigiar e Punir (1975)", content: "Foucault demonstrou que a prisão não foi inventada para reduzir o crime — foi criada para produzir criminosos administráveis. O sistema carcerário falha em ressocializar porque nunca foi projetado para isso: ele classifica, segrega e fabrica identidades criminosas. A reincidência não é falha do sistema — é seu produto esperado, que justifica sua própria existência." },
      { id: 3, type: "dado", source: "IDDD — Instituto de Defesa do Direito de Defesa, 2022", content: "Apenas 5% das penitenciárias brasileiras oferecem programas de educação formal. 3% têm cursos profissionalizantes. Países com menores taxas de reincidência — como Noruega (20%) e Holanda (25%), contra 68% do Brasil — investem em educação, trabalho e saúde mental dentro dos presídios. A ausência de ressocialização no Brasil tem custo de R$ 13 bilhões anuais em crimes evitáveis." },
    ],
  },
  {
    theme: "O impacto das drogas na sociedade e as políticas de combate",
    keywords: ["drogas", "tráfico", "política de drogas", "dependência química", "guerra às drogas"],
    texts: [
      { id: 1, type: "dado", source: "SENAD — Secretaria Nacional de Políticas sobre Drogas, 2023", content: "O Brasil tem 3,9 milhões de dependentes de crack e cocaína. O tráfico de drogas representa o principal motivo de encarceramento feminino (62% das mulheres presas). 75% dos jovens presos por tráfico são negros e têm menos de 25 anos. O mercado ilícito de drogas movimenta R$ 60 bilhões por ano no Brasil — equivalente ao orçamento do Ministério da Saúde." },
      { id: 2, type: "texto", source: "Comissão Global de Políticas sobre Drogas, 2011", content: "A 'guerra às drogas' declarada por Nixon em 1971 fracassou nos seus próprios termos: o consumo de drogas cresceu, o tráfico se fortaleceu e milhões foram encarcerados — desproporcionalmente negros e pobres — sem qualquer redução de danos. A Comissão, formada por ex-presidentes e chefes de Estado, recomenda descriminalização do uso pessoal e tratamento da dependência como questão de saúde pública, não penal." },
      { id: 3, type: "dado", source: "IPEA / Fórum Brasileiro de Segurança Pública, 2022", content: "Portugal descriminalizou o uso pessoal de todas as drogas em 2001. Resultado: consumo caiu 50%, infecções por HIV entre usuários caíram 95%, mortes por overdose reduziram 80%. No Brasil, modelo atual de criminalização custa R$ 12 bilhões por ano ao sistema judiciário e prisional sem evidência de redução do uso. Estudos mostram que tratamento voluntário é 7 vezes mais eficaz que encarceramento para reduzir dependência." },
    ],
  },
  {
    theme: "A desinformação como ameaça à democracia brasileira",
    keywords: ["desinformação", "fake news", "democracia", "eleições", "misinformation"],
    texts: [
      { id: 1, type: "texto", source: "Norberto Bobbio — O Futuro da Democracia (1986)", content: "A democracia pressupõe cidadãos informados capazes de tomar decisões racionais. Quando o espaço público é inundado por desinformação sistemática, a capacidade deliberativa é comprometida na origem. Sem informação verdadeira, não há democracia possível — apenas sua aparência formal." },
      { id: 2, type: "dado", source: "TSE — Relatório Eleitoral 2022", content: "O Brasil registrou 2.847 ações judiciais de desinformação eleitoral em 2022. O TSE removeu mais de 25 mil conteúdos falsos. 49% dos brasileiros acreditaram em ao menos uma fake news sobre as eleições. O WhatsApp foi veículo de 89% das notícias falsas — plataforma de difícil monitoramento por operar em grupos fechados." },
      { id: 3, type: "dado", source: "Agência Lupa / Reuters Institute, 2023", content: "34% das afirmações de políticos verificadas em 2022 foram classificadas como falsas ou exageradas. O Brasil é o 3º país com mais circulação de desinformação em aplicativos de mensagem. Alfabetização midiática reduz em 40% a crença em fake news, segundo estudo da USP — demonstrando que educação é o principal antídoto estrutural." },
    ],
  },
  {
    theme: "Crise de representatividade e desconfiança nas instituições democráticas",
    keywords: ["representatividade", "democracia", "partidos políticos", "crise democrática", "confiança"],
    texts: [
      { id: 1, type: "dado", source: "Datafolha, 2023", content: "Apenas 6% dos brasileiros confiam nos partidos políticos. 41% dos jovens de 18 a 25 anos afirmam ser indiferentes à democracia. A abstenção eleitoral voluntária cresceu 12% entre 2010 e 2022. 70% dos brasileiros acreditam que nenhum partido representa seus interesses — o maior percentual desde a redemocratização." },
      { id: 2, type: "texto", source: "Robert Dahl — A Democracia e seus Críticos (1989)", content: "Dahl distingue democracia real de poliarquia — o regime competitivo dos países modernos. Para ele, a crise de representatividade é estrutural: sistemas eleitorais majoritários excluem minorias, o financiamento eleitoral favorece interesses econômicos e a mídia concentrada filtra quais vozes chegam ao debate público. Reformas institucionais são necessárias, não apenas moral cívica." },
      { id: 3, type: "dado", source: "Latinobarômetro, 2023", content: "O apoio à democracia na América Latina caiu de 61% (2010) para 48% (2023). No Brasil, 26% declaram preferir um governo autoritário se este resolver os problemas econômicos — alta de 8 pontos em 5 anos. Países com maior desigualdade apresentam menor apoio democrático: a insatisfação com o desempenho econômico corrói a legitimidade do regime." },
    ],
  },
  {
    theme: "A reforma tributária e a desigualdade no Brasil",
    keywords: ["reforma tributária", "impostos", "tributação", "desigualdade", "regressividade"],
    texts: [
      { id: 1, type: "dado", source: "IBPT — Instituto Brasileiro de Planejamento e Tributação, 2023", content: "Os 10% mais pobres gastam 32% da renda em impostos; os 10% mais ricos gastam apenas 21%. O Brasil arrecada R$ 2,3 trilhões em tributos por ano — carga equivalente a países desenvolvidos — mas entrega serviços públicos de qualidade muito inferior. Empresas lucram R$ 500 bilhões por ano em isenções fiscais, enquanto trabalhadores assalariados pagam até 27,5% de imposto de renda." },
      { id: 2, type: "texto", source: "Thomas Piketty — O Capital no Século XXI (2013)", content: "Piketty demonstrou que quando a taxa de retorno do capital supera a taxa de crescimento econômico — o que é a norma histórica — a desigualdade se aprofunda inexoravelmente. A solução é tributação progressiva do capital e das heranças. Sistemas tributários que taxam mais o trabalho do que o capital, como o brasileiro, aceleram a concentração de riqueza." },
      { id: 3, type: "dado", source: "OCDE / Receita Federal do Brasil, 2022", content: "O Brasil não tributa lucros e dividendos distribuídos aos sócios — único país entre as 38 nações da OCDE nessa situação. Taxar dividendos com alíquota de 15% geraria R$ 100 bilhões/ano em receita adicional, suficiente para dobrar o investimento federal em educação. A Reforma Tributária de 2023 simplificou impostos sobre consumo, mas postergou a tributação do patrimônio." },
    ],
  },
  {
    theme: "O papel do jornalismo na defesa da democracia",
    keywords: ["jornalismo", "imprensa", "liberdade de expressão", "mídia", "democracia"],
    texts: [
      { id: 1, type: "dado", source: "RSF — Repórteres Sem Fronteiras, Índice 2023", content: "O Brasil ocupa a 92ª posição no Índice Mundial de Liberdade de Imprensa — queda de 18 posições em 5 anos. 26 jornalistas foram ameaçados de morte em 2022. A concentração midiática é crítica: 6 famílias controlam 70% dos veículos de comunicação. Nos últimos 10 anos, fecharam 4.500 veículos de comunicação locais no Brasil por inviabilidade econômica." },
      { id: 2, type: "texto", source: "Walter Lippmann — Opinião Pública (1922)", content: "Lippmann identificou que os cidadãos não têm acesso direto à maioria dos fatos que importam para a vida democrática — dependem da imprensa para construir seu mapa da realidade. Um jornalismo comprometido com a verdade factual é, portanto, infraestrutura da democracia. A degradação do jornalismo de qualidade não enfraquece apenas a imprensa — enfraquece a capacidade coletiva de deliberar." },
      { id: 3, type: "dado", source: "Reuters Institute / Oxford, 2023", content: "A desconfiança na mídia no Brasil atinge 53% da população — alta de 20 pontos em 10 anos. Paradoxalmente, plataformas digitais que não verificam informações são usadas como fonte por 73% dos brasileiros. O financiamento público da imprensa, modelado na BBC britânica, é adotado por 40 países democráticos como forma de garantir jornalismo independente sem dependência de anunciantes." },
    ],
  },
  {
    theme: "A pobreza extrema e a insegurança alimentar no Brasil",
    keywords: ["pobreza", "fome", "insegurança alimentar", "extrema pobreza", "mapa da fome"],
    texts: [
      { id: 1, type: "dado", source: "PENSSAN — Pesquisa Nacional por Amostra de Domicílios sobre Insegurança Alimentar, 2022", content: "33,1 milhões de brasileiros passam fome — retorno ao Mapa da Fome da ONU. 125 milhões têm algum grau de insegurança alimentar. A pandemia reverteu 20 anos de progresso: em 2014, o Brasil saiu do Mapa da Fome; em 2022, voltou. Negros, indígenas e moradores do Nordeste são 70% dos que sofrem com fome severa." },
      { id: 2, type: "texto", source: "Josué de Castro — Geografia da Fome (1946)", content: "Josué de Castro demonstrou que a fome no Brasil não é fenômeno natural — é fenômeno político. Países com terra fértil, água abundante e clima favorável mantêm populações famintas porque a produção de alimentos é organizada para o lucro, não para a nutrição. A fome é resultado de escolhas políticas sobre distribuição, não de escassez absoluta." },
      { id: 3, type: "dado", source: "FAO — Organização das Nações Unidas para Alimentação, 2023", content: "O Brasil produz alimentos para 1 bilhão de pessoas, mas tem 33 milhões de famintos. Exporta 100 milhões de toneladas de soja e milho por ano enquanto 19% das crianças têm crescimento comprometido por desnutrição. O Bolsa Família, quando em pleno funcionamento, reduzia a fome em 35% e cada R$ 1 investido gerava R$ 1,78 em consumo local." },
    ],
  },
  {
    theme: "Habitação e o déficit habitacional no Brasil",
    keywords: ["habitação", "moradia", "déficit habitacional", "favela", "direito à moradia"],
    texts: [
      { id: 1, type: "dado", source: "FJP — Fundação João Pinheiro, 2023", content: "O déficit habitacional brasileiro é de 8 milhões de moradias — afeta 13% das famílias. 75% do déficit concentra-se na faixa de renda de até 3 salários mínimos. 13,6 milhões de brasileiros vivem em favelas ou assentamentos precários. O gasto com aluguel consome mais de 50% da renda de 3,5 milhões de famílias de baixa renda nas capitais." },
      { id: 2, type: "texto", source: "Henri Lefebvre — O Direito à Cidade (1968)", content: "Lefebvre cunhou o conceito de 'direito à cidade' — não apenas o direito à habitação, mas ao acesso à centralidade urbana, aos serviços, à cultura e à vida pública. A periferização das populações pobres nega esse direito: empurra os mais vulneráveis para zonas sem serviços, longe do trabalho e expostas a riscos ambientais. O problema habitacional é, portanto, problema de justiça urbana." },
      { id: 3, type: "dado", source: "IBGE / Ministério das Cidades, 2022", content: "Regiões metropolitanas brasileiras crescem principalmente pela expansão periférica irregular. 90% do déficit habitacional está em áreas de risco — encostas, margens de rios, áreas inundáveis. As tragédias climáticas de Petrópolis (2022) e São Sebastião (2023) mataram centenas de pessoas em habitações irregulares — evidência de que déficit habitacional é questão de vida ou morte." },
    ],
  },
  {
    theme: "A desigualdade regional no Brasil: Norte e Nordeste",
    keywords: ["desigualdade regional", "nordeste", "norte", "desenvolvimento", "concentração"],
    texts: [
      { id: 1, type: "dado", source: "IBGE — Pesquisa Regional de Desenvolvimento, 2022", content: "O PIB per capita do Sudeste (R$ 43.800) é 4 vezes maior que o do Nordeste (R$ 11.200). A mortalidade infantil no Norte (17,8/1.000) é 3 vezes maior que no Sul (5,8/1.000). 87% dos investimentos federais em infraestrutura se concentram no Centro-Sul. O IDH médio do Nordeste corresponde ao de países como Honduras e El Salvador." },
      { id: 2, type: "texto", source: "Celso Furtado — Formação Econômica do Brasil (1959)", content: "Celso Furtado demonstrou que o subdesenvolvimento nordestino não é herança natural — é produto histórico do modelo exportador colonial que integrou o Nordeste como fornecedor de matérias-primas para o mercado europeu, sem gerar desenvolvimento interno. A concentração industrial no Sudeste perpetua essa estrutura colonial: o Nordeste continua exportando mão de obra barata para o Centro-Sul." },
      { id: 3, type: "dado", source: "IPEA, 2023", content: "Transferências de renda como Bolsa Família respondem por 20% do PIB nordestino em alguns estados — evidência da dependência estrutural de políticas redistributivas. Porém, quando investimentos produtivos chegam ao Nordeste — como no polo petroquímico de Suape e no agronegócio do MATOPIBA — o crescimento é expressivo: o Nordeste cresceu 4,3% em 2022, acima da média nacional de 2,9%." },
    ],
  },
  {
    theme: "O trabalho infantil e a exploração de crianças no Brasil",
    keywords: ["trabalho infantil", "criança", "exploração", "ECA", "infância"],
    texts: [
      { id: 1, type: "dado", source: "IBGE — PNAD 2022", content: "1,8 milhão de crianças e adolescentes trabalham no Brasil — queda de 60% desde 2000, mas ainda alto. 60% trabalham na agropecuária, em condições insalubres. 35% da evasão escolar no fundamental está associada ao trabalho infantil. Crianças que trabalham têm 50% menos chance de concluir o ensino médio e ganham em média 30% menos na vida adulta." },
      { id: 2, type: "texto", source: "ECA — Estatuto da Criança e do Adolescente, Lei 8.069/1990", content: "O ECA proíbe qualquer trabalho para menores de 14 anos, exceto na condição de aprendiz a partir dos 14 anos. O trabalho infantil viola o princípio da proteção integral — doutrina segundo a qual crianças são sujeitos de direitos em condição peculiar de desenvolvimento, devendo ser protegidas de toda forma de exploração. O trabalho antes da idade mínima rouba da criança o direito à infância, à escola e ao desenvolvimento pleno." },
      { id: 3, type: "dado", source: "OIT — Relatório Global sobre Trabalho Infantil, 2022", content: "Cada ano de trabalho infantil reduz em 2% o salário futuro do indivíduo. O impacto econômico agregado do trabalho infantil — via perda de produtividade por menor escolaridade — custa ao Brasil R$ 120 bilhões por ano. Países que erradicaram o trabalho infantil, como Dinamarca e Noruega, usaram combinação de transferências de renda, qualidade escolar e fiscalização — não apenas legislação." },
    ],
  },
  {
    theme: "A violência contra a população LGBTQIA+ no Brasil",
    keywords: ["LGBTQIA+", "homofobia", "transfobia", "violência", "direitos"],
    texts: [
      { id: 1, type: "dado", source: "ANTRA — Associação Nacional de Travestis e Transexuais, 2023", content: "O Brasil lidera o ranking mundial de assassinatos de pessoas trans pelo 15º ano consecutivo: 131 mortes em 2022. A expectativa de vida de mulheres trans no Brasil é de 35 anos — menos da metade da média nacional. 79% das pessoas trans foram expulsas de casa na adolescência. 90% das trans que se prostituem fazem isso por falta de outras oportunidades de trabalho." },
      { id: 2, type: "texto", source: "STF — ADO 26 e MI 4733, 2019", content: "O STF criminalizou a homofobia e a transfobia por omissão legislativa, enquadrando-as na Lei do Racismo (7.716/1989). A decisão reconheceu que o Congresso omitiu-se deliberadamente em proteger a população LGBTQIA+, transferindo ao Judiciário a tarefa de garantir direitos constitucionais. A criminalização não elimina o preconceito, mas estabelece que ele tem custo legal." },
      { id: 3, type: "dado", source: "Grupo Gay da Bahia — Relatório 2022", content: "O Brasil registra uma morte por LGBTIfobia a cada 32 horas. 67% das vítimas são negras. 80% das agressões ocorrem em espaços públicos. Pesquisa DataFolha aponta que 35% dos brasileiros admitem preconceito contra pessoas gays e lésbicas, e 55% contra pessoas trans. Países com legislação de proteção específica apresentam redução de até 40% nos crimes de ódio." },
    ],
  },
  {
    theme: "Desigualdade salarial entre homens e mulheres no Brasil",
    keywords: ["desigualdade salarial", "gênero", "salário", "mercado de trabalho feminino"],
    texts: [
      { id: 1, type: "dado", source: "ONU Mulheres / IBGE, 2023", content: "Mulheres ganham em média 77,7% do salário dos homens em funções equivalentes no Brasil. A diferença aumenta para cargos de liderança: mulheres diretoras ganham 66% do salário de diretores homens. Mulheres negras ganham 44% do salário de homens brancos. No ritmo atual, a igualdade salarial plena levará 135 anos para ser alcançada globalmente." },
      { id: 2, type: "texto", source: "Simone de Beauvoir — O Segundo Sexo (1949)", content: "A subordinação econômica da mulher não é produto da natureza — é produto de uma ordem social que historicamente limitou o acesso feminino à educação, à propriedade e ao trabalho remunerado. Mesmo após conquistas formais de igualdade, estruturas invisíveis — preconceito, dupla jornada, viés de gênero nas promoções — perpetuam a desigualdade material." },
      { id: 3, type: "dado", source: "IPEA — Nota Técnica sobre Desigualdade de Gênero, 2022", content: "Mulheres trabalham em média 7,5 horas a mais por semana que homens, somando trabalho remunerado e não remunerado. Se o trabalho doméstico fosse remunerado, representaria 11,4% do PIB brasileiro. A maternidade reduz os salários femininos em 20% em média — fenômeno chamado 'penalidade da maternidade' — enquanto a paternidade não afeta os salários masculinos." },
    ],
  },
  {
    theme: "Representatividade feminina na política brasileira",
    keywords: ["mulheres na política", "representatividade", "eleições", "parlamento", "gênero"],
    texts: [
      { id: 1, type: "dado", source: "TSE / UIP — União Inter-Parlamentar, 2023", content: "O Brasil ocupa a 142ª posição no ranking mundial de participação feminina em parlamentos. Mulheres são apenas 18% da Câmara e 16% do Senado. Na América Latina, o Brasil tem a menor representação feminina entre países com mais de 30 milhões de habitantes. Apenas 11% dos prefeitos são mulheres; nenhuma mulher foi presidente do Brasil desde Dilma Rousseff." },
      { id: 2, type: "texto", source: "Anne Phillips — De Uma Política de Ideias a Uma Política de Presença (1995)", content: "A sub-representação feminina na política não é apenas injusta para as mulheres — é defeito funcional da democracia. Legislaturas compostas majoritariamente por homens tomam decisões que refletem experiências e interesses masculinos. A presença de mulheres muda a agenda política: países com mais de 30% de parlamentares mulheres aprovam mais leis sobre saúde reprodutiva, violência doméstica e licença parental." },
      { id: 3, type: "dado", source: "Transparência Brasil / ELAS, 2022", content: "A Lei das Cotas Eleitorais (2009) obriga partidos a candidatar no mínimo 30% de mulheres, mas apenas 18% chegam ao parlamento. Partidos cumprem formalmente a cota, mas não financiam campanhas femininas: candidatas recebem em média 35% menos recursos que candidatos. Municípios com mais mulheres na câmara apresentam menores índices de mortalidade infantil e materna — correlação que indica que presença muda prioridades." },
    ],
  },
  {
    theme: "O racismo estrutural e suas consequências para a população negra",
    keywords: ["racismo estrutural", "população negra", "discriminação", "desigualdade racial"],
    texts: [
      { id: 1, type: "texto", source: "Silvio Almeida — Racismo Estrutural (2018)", content: "O racismo estrutural é o modo pelo qual o racismo cria as condições para que grupos racialmente identificados sejam discriminados de forma sistemática. Ele não depende de intenção individual: manifesta-se em práticas institucionais, regras de mercado e políticas públicas que reproduzem hierarquias raciais mesmo quando nenhum ator individual tem intenção discriminatória explícita." },
      { id: 2, type: "dado", source: "IBGE — Desigualdades Sociais por Cor ou Raça, 2022", content: "Negros e pardos representam 56% da população, mas apenas 29% dos gestores, 18% dos diretores executivos e 4,7% dos parlamentares federais. A taxa de pobreza entre negros é 2,5 vezes maior que entre brancos. 75% dos moradores de favelas são negros. A expectativa de vida de um homem negro é 4 anos menor que a de um homem branco." },
      { id: 3, type: "dado", source: "Oxfam Brasil, 2023", content: "Os 6 bilionários mais ricos do Brasil têm patrimônio equivalente ao de 100 milhões de brasileiros mais pobres. Dos 10 maiores bilionários, nenhum é negro. Das 5 maiores fortunas herdadas do Brasil, todas são de famílias brancas com histórico de grandes proprietários de terras — demonstrando que riqueza presente tem raízes em concentração histórica associada ao trabalho escravo." },
    ],
  },
  {
    theme: "Desafios para a demarcação de terras indígenas no Brasil",
    keywords: ["terras indígenas", "demarcação", "indígenas", "território", "garimpo"],
    texts: [
      { id: 1, type: "dado", source: "FUNAI / ISA — Instituto Socioambiental, 2023", content: "O Brasil tem 773 terras indígenas identificadas, das quais apenas 487 são homologadas (regularizadas). 111 ainda aguardam demarcação há mais de 20 anos. As invasões a territórios indígenas cresceram 135% entre 2019 e 2023. O garimpo ilegal afeta 28 terras homologadas. Comunidades Yanomami perderam 570 indivíduos para doenças associadas ao garimpo em 2022." },
      { id: 2, type: "texto", source: "Constituição Federal — Art. 231", content: "A Constituição de 1988 reconhece aos índios sua organização social, costumes, línguas, crenças e tradições, e os direitos originários sobre as terras que tradicionalmente ocupam. A demarcação é dever do Estado, não concessão: os territórios indígenas são terras que 'sempre foram delas', no entendimento constitucional — precedem o próprio Estado nacional." },
      { id: 3, type: "texto", source: "Ailton Krenak — Ideias para Adiar o Fim do Mundo (2019)", content: "Os povos indígenas possuem conhecimentos desenvolvidos ao longo de milênios sobre o manejo sustentável de ecossistemas. Territórios indígenas demarcados têm taxas de desmatamento até 10 vezes menores que áreas vizinhas não protegidas. Demarcar terras indígenas não é apenas questão de direitos humanos — é estratégia eficaz de preservação ambiental e combate à crise climática." },
    ],
  },
  {
    theme: "O apagamento da cultura afro-brasileira e a resistência quilombola",
    keywords: ["cultura afro-brasileira", "quilombolas", "resistência", "patrimônio afro", "identidade negra"],
    texts: [
      { id: 1, type: "dado", source: "IBGE / INCRA, 2023", content: "O Brasil tem 3.524 comunidades quilombolas certificadas pela Fundação Cultural Palmares, mas apenas 144 têm titulação definitiva. 90% enfrentam conflitos fundiários. As comunidades quilombolas preservam práticas agrícolas, medicinais, religiosas e linguísticas únicas — patrimônio imaterial em risco de extinção junto com os territórios. 78% dos quilombolas vivem em situação de pobreza." },
      { id: 2, type: "texto", source: "Conceição Evaristo — Escrevivências (2016)", content: "A 'escrevivência' — conceito criado por Conceição Evaristo — é a escrita que nasce da vivência de mulheres negras historicamente silenciadas. Preservar a cultura afro-brasileira não é nostalgia folclórica — é ato político de resistência à narrativa dominante que tratou a contribuição africana como subalterna. Cada terreiro fechado, cada língua de matriz africana esquecida, cada receita culinária perdida é apagamento da memória coletiva." },
      { id: 3, type: "dado", source: "UNESCO / MinC, 2022", content: "O Brasil possui 76 bens culturais de matriz africana reconhecidos como patrimônio imaterial nacional — entre eles o candomblé, o jongo, o samba de roda e a capoeira. Porém, 67% dos terreiros de candomblé e umbanda relatam vandalismos nos últimos 5 anos. Museus de arte afro-brasileira recebem 8 vezes menos investimento público que museus de arte europeia de porte similar." },
    ],
  },
  {
    theme: "Precarização do trabalho e a uberização da economia",
    keywords: ["uberização", "precarização", "aplicativo", "gig economy", "trabalho informal"],
    texts: [
      { id: 1, type: "dado", source: "IBGE / MTE — Ministério do Trabalho, 2023", content: "O Brasil tem 1,5 milhão de motoristas de aplicativo e 800 mil entregadores de plataforma — sem carteira assinada, FGTS, seguro-desemprego ou aposentadoria. A renda média do entregador de aplicativo é de R$ 1.200/mês, abaixo do salário mínimo, trabalhando mais de 10 horas por dia. 78% dos entregadores já sofreram acidentes no trabalho sem qualquer cobertura de saúde." },
      { id: 2, type: "texto", source: "Ricardo Antunes — O Privilégio da Servidão (2018)", content: "A 'uberização' representa nova forma de servidão voluntária: trabalhadores assumem os riscos do capital — custeiam seus veículos, celulares e combustível — enquanto as plataformas ficam com a maior parcela do valor gerado. A ideologia do 'empreendedorismo' mascara a exploração: o entregador não é micro-empreendedor — é trabalhador assalariado sem os direitos do trabalho assalariado." },
      { id: 3, type: "dado", source: "FGV Social, 2022", content: "73% dos trabalhadores de plataforma no Brasil migraram do desemprego — evidência de que a uberização não criou trabalho novo, mas absorveu desempregados sem alternativa. O Brasil perdeu 14 milhões de postos de trabalho formal entre 2015 e 2020. Cada R$ 100 faturado por uma plataforma de delivery, o entregador recebe em média R$ 12 — enquanto a plataforma retém R$ 30 e o restaurante R$ 58." },
    ],
  },
  {
    theme: "O desemprego juvenil e a falta de perspectivas para os jovens",
    keywords: ["desemprego juvenil", "jovens", "emprego", "qualificação", "trabalho"],
    texts: [
      { id: 1, type: "dado", source: "IBGE — PNAD Contínua, 2023", content: "A taxa de desemprego entre jovens de 18 a 24 anos no Brasil é de 28,3% — 3 vezes a média nacional. 22 milhões de jovens brasileiros não estudam nem trabalham — os chamados 'nem-nem'. Entre jovens negros, o desemprego chega a 36,8%. O Brasil gasta apenas 0,1% do PIB em políticas ativas de emprego juvenil — menor percentual do G20." },
      { id: 2, type: "texto", source: "Zygmunt Bauman — Modernidade Líquida (2000)", content: "Na modernidade líquida, o trabalho perdeu sua capacidade de estruturar identidades e trajetórias. Jovens que ingressam num mercado de trabalho volátil, sem certezas de carreira, experimentam ansiedade existencial estrutural. A ausência de perspectiva não é apenas econômica — é de sentido: sem projeto de futuro, a vida presente perde orientação." },
      { id: 3, type: "dado", source: "OIT — Tendências Mundiais do Emprego Juvenil, 2023", content: "O Brasil forma 20 mil engenheiros por ano, mas o mercado absorve apenas 60% deles na área de formação. Ao mesmo tempo, faltam 800 mil técnicos especializados. O descompasso entre oferta educacional e demanda do mercado custa R$ 45 bilhões por ano em qualificação refeita. Países com menores taxas de desemprego juvenil combinam ensino técnico dual (escola + empresa) com proteção social robusta." },
    ],
  },
  {
    theme: "Reforma da previdência e o futuro do trabalho",
    keywords: ["previdência", "aposentadoria", "reforma", "envelhecimento", "INSS"],
    texts: [
      { id: 1, type: "dado", source: "IPEA / IBGE, 2023", content: "O Brasil envelhecerá rapidamente: em 2060, 29% da população terá mais de 60 anos, contra 14% hoje. A Reforma da Previdência de 2019 elevou a idade mínima de aposentadoria para 65 anos (homens) e 62 anos (mulheres). 47% dos trabalhadores brasileiros são informais — sem contribuição previdenciária. O déficit da previdência social é de R$ 300 bilhões/ano." },
      { id: 2, type: "texto", source: "Amartya Sen — Desenvolvimento como Liberdade (1999)", content: "A previdência social é mecanismo de expansão de liberdades: garante que o envelhecimento não implique dependência e pobreza. Sistemas previdenciários sólidos são condição de cidadania, não generosidade estatal. A tensão entre sustentabilidade fiscal e proteção social exige equilíbrio cuidadoso — cortes abruptos produzem pobreza imediata entre idosos, enquanto inação produz colapso fiscal futuro." },
      { id: 3, type: "dado", source: "OCDE — Revisão dos Sistemas Previdenciários, 2022", content: "Países nórdicos sustentam previdências generosas com contribuições altas e bases tributárias amplas que incluem capital e herança. O Chile privatizou sua previdência em 1981 — resultado: 50% dos aposentados recebem abaixo da linha de pobreza. O Brasil tem sistema misto: INSS público e RGPS, mas com enorme desigualdade — servidor público federal se aposenta com valor médio 3 vezes maior que trabalhador privado." },
    ],
  },
  {
    theme: "O papel transformador da arte na sociedade",
    keywords: ["arte", "cultura", "transformação social", "música", "literatura"],
    texts: [
      { id: 1, type: "texto", source: "Herbert Marcuse — A Dimensão Estética (1977)", content: "A arte autêntica é subversiva por natureza: ao criar mundos alternativos ao existente, ela provoca o 'estranhamento' — a percepção de que o mundo poderia ser diferente. A dimensão estética é a única que escapa ao controle total da razão instrumental capitalista, preservando a memória da felicidade possível e do sofrimento inaceitável. Uma sociedade sem arte é uma sociedade sem futuro." },
      { id: 2, type: "dado", source: "MinC — Ministério da Cultura, 2023", content: "O setor cultural representa 2,6% do PIB brasileiro — mais que a indústria automobilística. A cultura gera 7,8 milhões de empregos diretos e indiretos. Municípios com equipamentos culturais ativos apresentam menores índices de violência juvenil: um estudo do IBGE mostra correlação negativa de 0,67 entre equipamentos culturais per capita e taxa de homicídio juvenil." },
      { id: 3, type: "texto", source: "Boal, Augusto — Teatro do Oprimido (1974)", content: "Augusto Boal criou o Teatro do Oprimido como instrumento de transformação social: na peça-debate, espect-atores interrompem a encenação e propõem soluções diferentes para os conflitos mostrados. A arte não é espelho da realidade — é martelo para transformá-la. Comunidades que praticam o teatro comunitário desenvolvem maior capacidade organizativa e resolução coletiva de conflitos." },
    ],
  },
  {
    theme: "Acesso à cultura e o direito ao lazer nas periferias",
    keywords: ["acesso à cultura", "periferia", "lazer", "direitos culturais", "desigualdade cultural"],
    texts: [
      { id: 1, type: "dado", source: "MinC / IBGE, 2022", content: "87% dos teatros, 80% dos museus e 76% dos cinemas do Brasil estão nas regiões Sul e Sudeste. Nas periferias das capitais, a distância média até um equipamento cultural é de 12 km. 63% dos brasileiros nunca foram a um museu; 73% nunca foram a uma peça de teatro. O gasto público com cultura nas capitais é 8 vezes maior por habitante nos bairros ricos do que nas periferias." },
      { id: 2, type: "texto", source: "Henri Lefebvre — O Direito à Cidade (1968)", content: "O direito à cidade inclui o direito à obra — à participação na vida cultural urbana. A periferização das populações pobres as exclui não apenas da centralidade econômica, mas da centralidade cultural. Quando museus, teatros e centros culturais concentram-se nos bairros ricos, a arte deixa de ser universal para tornar-se privilégio de classe." },
      { id: 3, type: "dado", source: "Observatório Itaú Cultural, 2023", content: "Jovens que têm acesso regular a atividades culturais apresentam 25% menos envolvimento com criminalidade, 40% menor evasão escolar e desempenho 18% superior no ENEM. O BNDES estima que cada R$ 1 investido em equipamentos culturais comunitários gera R$ 2,40 em benefícios sociais mensuráveis. Pontos de Cultura, programa descontinuado em 2020, atendiam 14 milhões de pessoas nas periferias com custo médio de R$ 4 por beneficiário/mês." },
    ],
  },
  {
    theme: "O patrimônio histórico e cultural brasileiro em risco",
    keywords: ["patrimônio histórico", "museu", "cultura", "preservação", "memória"],
    texts: [
      { id: 1, type: "dado", source: "IPHAN — Instituto do Patrimônio Histórico e Artístico Nacional, 2023", content: "O Brasil tem 1.247 bens tombados pelo IPHAN, mas 30% estão em estado crítico de conservação. O incêndio do Museu Nacional (2018) destruiu 20 milhões de itens — a maior perda patrimonial da história do Brasil. O orçamento do IPHAN caiu 60% em termos reais entre 2013 e 2023. 47 cidades históricas tombadas têm plano de preservação, mas apenas 12 recebem recursos suficientes para implementá-lo." },
      { id: 2, type: "texto", source: "UNESCO — Convenção sobre a Proteção do Patrimônio Mundial, 1972", content: "A UNESCO define patrimônio cultural como herança do passado que vivemos no presente e transmitimos às gerações futuras. O patrimônio não pertence ao governo — pertence à humanidade. Destruí-lo por negligência ou vandalismo é crime contra a memória coletiva: priva as gerações futuras do acesso às raízes que moldam identidades e permitem compreender o presente a partir do passado." },
      { id: 3, type: "dado", source: "Ministério da Cultura / FGV, 2022", content: "O turismo cultural representa 7% do turismo nacional e gera R$ 35 bilhões anuais. Cidades com patrimônio preservado têm PIB per capita 23% maior que cidades similares sem preservação. O incêndio do Museu Nacional causou prejuízo estimado em R$ 3 bilhões — 40 vezes o orçamento anual do museu. A relação custo-benefício da preservação é positiva: cada R$ 1 investido em conservação evita R$ 7 em recuperação emergencial." },
    ],
  },
];

export function getColetaneaForTheme(theme: string): Coletanea | null {
  const t = theme.toLowerCase();

  // Exact match first
  const exact = coletaneas.find((c) => c.theme.toLowerCase() === t);
  if (exact) return exact;

  // Keyword match
  const byKeyword = coletaneas.find((c) =>
    c.keywords.some((k) => t.includes(k.toLowerCase()) || k.toLowerCase().includes(t.split(" ")[0].toLowerCase()))
  );
  if (byKeyword) return byKeyword;

  // Partial theme title match (first 3 significant words)
  const words = t.split(" ").filter((w) => w.length > 3).slice(0, 3);
  const partial = coletaneas.find((c) =>
    words.some((w) => c.theme.toLowerCase().includes(w))
  );
  return partial ?? null;
}
