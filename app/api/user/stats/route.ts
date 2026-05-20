import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, parseSessionToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const user = token ? parseSessionToken(token) : null;

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  // No Prisma configured — return null so dashboard falls back to mocks
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("xxxx")) {
    return NextResponse.json({ data: null, fallback: true });
  }

  try {
    const { prisma } = await import("@/lib/prisma");

    const dbUser = await prisma.user.findUnique({
      where: { email: user.email },
      include: {
        subscription: true,
        essays: {
          orderBy: { createdAt: "desc" },
          take: 10,
          include: { aiFeedback: true },
        },
        progress: {
          where: { completed: true },
        },
      },
    });

    if (!dbUser) {
      return NextResponse.json({ data: null, fallback: true });
    }

    const completedEssays = dbUser.essays.filter((e) => e.status === "COMPLETED");
    const avgScore = completedEssays.length > 0
      ? Math.round(completedEssays.reduce((sum, e) => sum + (e.aiFeedback?.score ?? 0), 0) / completedEssays.length)
      : 0;

    const competencyAvgs = [1, 2, 3, 4, 5].map((c) => {
      const scores = completedEssays
        .map((e) => e.aiFeedback?.[`competency${c}Score` as keyof typeof e.aiFeedback] as number | undefined)
        .filter((s): s is number => s !== undefined);
      return scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
    });

    const weeklyProgress = completedEssays
      .slice(0, 8)
      .reverse()
      .map((e, i) => ({
        day: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"][new Date(e.createdAt).getDay()],
        score: e.aiFeedback?.score ?? 0,
        index: i,
      }));

    return NextResponse.json({
      data: {
        user: {
          name: dbUser.name ?? user.name ?? "Estudante",
          email: dbUser.email,
          xp: dbUser.xp,
          level: dbUser.level,
          streakDays: dbUser.streakDays,
          plan: dbUser.subscription?.plan ?? "FREE",
        },
        stats: {
          totalEssays: completedEssays.length,
          avgScore,
          lessonsCompleted: dbUser.progress.length,
          competencyAvgs,
        },
        weeklyProgress,
        recentEssays: completedEssays.slice(0, 5).map((e) => ({
          id: e.id,
          theme: e.theme ?? "Sem tema",
          score: e.aiFeedback?.score ?? 0,
          createdAt: e.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("[User Stats]", error);
    return NextResponse.json({ data: null, fallback: true });
  }
}
