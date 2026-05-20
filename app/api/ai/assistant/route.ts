import { NextRequest, NextResponse } from "next/server";
import { assistantChat } from "@/lib/claude";
import { z } from "zod";

const schema = z.object({
  messages: z.array(z.object({ role: z.enum(["user", "assistant"]), content: z.string() })).min(1),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        response: "Configure ANTHROPIC_API_KEY no arquivo .env para ativar o assistente com IA real.",
      });
    }

    const text = await assistantChat(parsed.data.messages);
    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("[Assistant]", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
