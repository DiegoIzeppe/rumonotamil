import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Achievements
  const achievements = [
    { key: "first_essay", title: "Primeira Redação", description: "Enviou sua primeira redação para correção", rarity: "COMMON", xpReward: 50 },
    { key: "streak_7", title: "Semana Dedicada", description: "Manteve 7 dias de streak", rarity: "UNCOMMON", xpReward: 100 },
    { key: "streak_30", title: "Mês Perfeito", description: "Manteve 30 dias de streak", rarity: "EPIC", xpReward: 500 },
    { key: "score_700", title: "Nível 700", description: "Atingiu 700 pontos em uma redação", rarity: "COMMON", xpReward: 75 },
    { key: "score_800", title: "Alto Nível", description: "Atingiu 800 pontos em uma redação", rarity: "RARE", xpReward: 200 },
    { key: "score_900", title: "Elite", description: "Atingiu 900 pontos em uma redação", rarity: "EPIC", xpReward: 400 },
    { key: "score_960", title: "Quase Lá", description: "Atingiu 960 pontos em uma redação", rarity: "EPIC", xpReward: 600 },
    { key: "score_1000", title: "Nota Máxima", description: "Atingiu 1000 pontos na redação", rarity: "LEGENDARY", xpReward: 1000 },
    { key: "essays_10", title: "Escritor Assíduo", description: "Enviou 10 redações para correção", rarity: "UNCOMMON", xpReward: 150 },
    { key: "essays_50", title: "Mestre das Palavras", description: "Enviou 50 redações para correção", rarity: "RARE", xpReward: 500 },
    { key: "c5_perfect", title: "Intervenção Perfeita", description: "Atingiu 200 em C5", rarity: "RARE", xpReward: 200 },
    { key: "all_lessons", title: "Aluno Completo", description: "Completou todas as aulas", rarity: "EPIC", xpReward: 800 },
  ];

  for (const ach of achievements) {
    await prisma.achievement.upsert({
      where: { key: ach.key },
      update: ach,
      create: ach as any,
    });
  }
  console.log(`✅ ${achievements.length} achievements seeded`);

  // Weekly theme
  await prisma.weeklyTheme.upsert({
    where: { id: "wt1" },
    update: {},
    create: {
      id: "wt1",
      title: "Crise da Saúde Mental na Era Digital",
      description: "Discuta os desafios e consequências da saúde mental para jovens brasileiros no contexto do uso excessivo de redes sociais e tecnologias digitais.",
      week: "2024-W47",
      active: true,
      tags: ["saúde mental", "tecnologia", "juventude"],
      repertoires: ["OMS: 1 em cada 4 jovens", "Byung-Chul Han — Sociedade do Cansaço", "Jonathan Haidt — A Geração Ansiosa"],
    },
  });
  console.log("✅ Weekly theme seeded");

  // Prompt templates
  const prompts = [
    {
      key: "essay_correction_v2",
      name: "Correção de Redação v2",
      content: `Você é um avaliador especialista em redações do ENEM...`,
      version: "v2",
      active: true,
    },
    {
      key: "study_plan_generator",
      name: "Gerador de Plano de Estudos",
      content: `Você é um tutor educacional especializado em ENEM...`,
      version: "v1",
      active: true,
    },
  ];

  for (const p of prompts) {
    await prisma.promptTemplate.upsert({
      where: { key: p.key },
      update: p,
      create: p,
    });
  }
  console.log("✅ Prompt templates seeded");

  // Sample lessons
  const lessons = [
    {
      title: "Domínio da Norma Culta: O que o ENEM realmente avalia",
      slug: "dominio-norma-culta",
      description: "Entenda os critérios da Competência 1 e como garantir 200 pontos.",
      content: "<p>Conteúdo completo da aula...</p>",
      category: "COMPETENCIA_1" as const,
      competency: 1,
      difficulty: "INTERMEDIATE" as const,
      readingTime: 15,
      published: true,
      featured: true,
      tags: ["gramática", "ortografia", "sintaxe"],
      order: 1,
    },
    {
      title: "Como construir um repertório sociocultural irresistível",
      slug: "repertorio-sociocultural",
      description: "Aprenda a selecionar e usar repertórios que impressionam os avaliadores.",
      content: "<p>Conteúdo completo da aula...</p>",
      category: "COMPETENCIA_2" as const,
      competency: 2,
      difficulty: "ADVANCED" as const,
      readingTime: 20,
      published: true,
      featured: true,
      tags: ["repertório", "argumentação", "cultura"],
      order: 2,
    },
  ];

  for (const lesson of lessons) {
    await prisma.lesson.upsert({
      where: { slug: lesson.slug },
      update: lesson,
      create: lesson,
    });
  }
  console.log(`✅ ${lessons.length} lessons seeded`);

  console.log("🎉 Database seeded successfully!");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
