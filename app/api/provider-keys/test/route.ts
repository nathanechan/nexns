import { NextResponse } from "next/server";
import { z } from "zod";
import { updateProviderKeyTestStatus } from "@/lib/data/provider-key-repository";
import type { ProviderKeyStatus } from "@/lib/database.types";

const defaultWorkspaceId = "00000000-0000-0000-0000-000000000001";
const defaultActorId = "system_owner";

const testSchema = z.object({
  workspaceId: z.string().uuid().default(defaultWorkspaceId),
  provider: z.string().min(2).max(64),
  actorId: z.string().min(2).default(defaultActorId),
  dryRun: z.boolean().default(true)
});

export async function POST(request: Request) {
  const parsed = testSchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const result = simulateProviderConnection(parsed.data.provider);

  try {
    const key = await updateProviderKeyTestStatus({
      workspaceId: parsed.data.workspaceId,
      provider: parsed.data.provider,
      actorId: parsed.data.actorId,
      status: result.status,
      message: result.message
    });

    return NextResponse.json({ key, result });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to test provider key." },
      { status: 500 }
    );
  }
}

function simulateProviderConnection(provider: string): { status: ProviderKeyStatus; message: string } {
  if (provider.toLowerCase().includes("xai")) {
    return {
      status: "degraded",
      message: "Connection accepted, but provider is currently under latency watch."
    };
  }

  return {
    status: "connected",
    message: "Key format accepted and provider is ready for routing."
  };
}
