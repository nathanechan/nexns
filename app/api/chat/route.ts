import { NextResponse } from "next/server";
import { z } from "zod";
import { routeQuery } from "@/lib/routing/engine";

const chatSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string()
      })
    )
    .min(1),
  mode: z.enum(["auto", "parallel", "manual"]).optional(),
  userPriority: z.enum(["balanced", "quality", "speed", "savings", "freshness"]).optional(),
  manualModelId: z.string().optional()
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = chatSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid chat request" }, { status: 400 });
  }

  const latest = [...parsed.data.messages].reverse().find((message) => message.role === "user");

  if (!latest) {
    return NextResponse.json({ error: "Missing user message" }, { status: 400 });
  }

  const decision = routeQuery({
    message: latest.content,
    mode: parsed.data.mode,
    manualModelId: parsed.data.manualModelId,
    userPriority: parsed.data.userPriority
  });

  return NextResponse.json({
    decision,
    message: {
      role: "assistant",
      modelId: decision.primary.model.id,
      content: `Handled by ${decision.primary.model.name}.\n\nRouting reasons: ${decision.reasons.join("; ")}.\n\nAnswer: I would break down the goal, risks, constraints, and next actions, then record the projected ${decision.expectedSavings}% savings in the team dashboard.`
    }
  });
}
