import { NextRequest, NextResponse } from "next/server";

// Stub — returns mock user when Clerk not configured
export async function POST(req: NextRequest) {
  return NextResponse.json({
    id: "demo-user",
    clerkId: "demo",
    email: "demo@rumonotamil.com",
    name: "Ana Beatriz Silva",
    xp: 4280,
    level: 12,
    streakDays: 17,
    subscription: { plan: "PRO", status: "ACTIVE" },
  });
}
