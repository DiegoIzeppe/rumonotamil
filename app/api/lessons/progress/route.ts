import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE, parseSessionToken } from "@/lib/auth";
import { z } from "zod";

const schema = z.object({
  lessonSlug: z.string(),
  completed: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const user = token ? parseSessionToken(token) : null;

  if (!user) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.errors[0].message }, { status: 400 });
  }

  const { lessonSlug, completed } = parsed.data;

  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("xxxx")) {
    return NextResponse.json({ success: true, fallback: true, xpAwarded: completed ? 50 : 0 });
  }

  try {
    const { prisma } = await import("@/lib/prisma");

    const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
    if (!dbUser) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 });
    }

    const lesson = await prisma.lesson.findUnique({ where: { slug: lessonSlug } });
    if (!lesson) {
      return NextResponse.json({ error: "Aula não encontrada" }, { status: 404 });
    }

    const existing = await prisma.lessonProgress.findUnique({
      where: { userId_lessonId: { userId: dbUser.id, lessonId: lesson.id } },
    });

    const alreadyCompleted = existing?.completed === true;

    await prisma.lessonProgress.upsert({
      where: { userId_lessonId: { userId: dbUser.id, lessonId: lesson.id } },
      create: {
        userId: dbUser.id,
        lessonId: lesson.id,
        completed,
        progress: completed ? 100 : 0,
        completedAt: completed ? new Date() : null,
      },
      update: {
        completed,
        progress: completed ? 100 : 0,
        completedAt: completed && !alreadyCompleted ? new Date() : existing?.completedAt,
      },
    });

    // Award XP only on first completion
    const xpAwarded = completed && !alreadyCompleted ? 50 : 0;
    if (xpAwarded > 0) {
      await prisma.user.update({
        where: { id: dbUser.id },
        data: { xp: { increment: xpAwarded } },
      });
    }

    return NextResponse.json({ success: true, xpAwarded });
  } catch (error) {
    console.error("[Lesson Progress]", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const token = req.cookies.get(AUTH_COOKIE)?.value;
  const user = token ? parseSessionToken(token) : null;

  if (!user) {
    return NextResponse.json({ completedSlugs: [] });
  }

  if (!process.env.DATABASE_URL || process.env.DATABASE_URL.includes("xxxx")) {
    return NextResponse.json({ completedSlugs: [], fallback: true });
  }

  try {
    const { prisma } = await import("@/lib/prisma");

    const dbUser = await prisma.user.findUnique({ where: { email: user.email } });
    if (!dbUser) return NextResponse.json({ completedSlugs: [] });

    const completed = await prisma.lessonProgress.findMany({
      where: { userId: dbUser.id, completed: true },
      include: { lesson: { select: { slug: true } } },
    });

    return NextResponse.json({ completedSlugs: completed.map((p) => p.lesson.slug) });
  } catch {
    return NextResponse.json({ completedSlugs: [] });
  }
}
