import { NextResponse } from "next/server";
import { z } from "zod";
import { routeQuery } from "@/lib/routing/engine";

const routeSchema = z.object({
  message: z.string().min(1).max(12000),
  mode: z.enum(["auto", "parallel", "manual"]).optional(),
  manualModelId: z.string().optional(),
  userPriority: z.enum(["balanced", "quality", "speed", "savings", "freshness"]).optional(),
  hasFiles: z.boolean().optional(),
  hasImage: z.boolean().optional(),
  maxModels: z.number().int().min(2).max(4).optional()
});

const buckets = new Map<string, { count: number; resetAt: number }>();

function rateLimit(key: string) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + 60_000 });
    return true;
  }

  if (bucket.count >= 24) return false;
  bucket.count += 1;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local-dev";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Rate limit exceeded. Upgrade to Pro for higher throughput." },
      { status: 429 }
    );
  }

  const json = await request.json().catch(() => null);
  const parsed = routeSchema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid routing request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const decision = routeQuery(parsed.data);

  return NextResponse.json({
    decision,
    streamedPreview: decision.parallel.map((candidate, index) => ({
      modelId: candidate.model.id,
      title: candidate.model.name,
      content:
        index === 0
          ? "Primary route selected. I would answer with deeper synthesis, explicit assumptions, and a decision-ready structure."
          : "Parallel scout response. I would contribute a second angle so the user can compare freshness, cost, or implementation detail.",
      tokenEstimate: 520 + index * 140
    }))
  });
}
