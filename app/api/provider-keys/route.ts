import { NextResponse } from "next/server";
import { z } from "zod";
import { listProviderKeys, upsertProviderKey } from "@/lib/data/provider-key-repository";

const defaultWorkspaceId = "00000000-0000-0000-0000-000000000001";
const defaultActorId = "system_owner";

const providerKeySchema = z.object({
  workspaceId: z.string().uuid().default(defaultWorkspaceId),
  provider: z.string().min(2).max(64),
  providerKey: z.string().min(8).max(4096),
  actorId: z.string().min(2).default(defaultActorId),
  rotationDays: z.number().int().min(1).max(365).optional()
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const workspaceId = searchParams.get("workspaceId") ?? defaultWorkspaceId;

  try {
    const keys = await listProviderKeys(workspaceId);
    return NextResponse.json({ keys });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to list provider keys." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const parsed = providerKeySchema.safeParse(await request.json());

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  try {
    const key = await upsertProviderKey(parsed.data);
    return NextResponse.json({ key });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to save provider key." },
      { status: 500 }
    );
  }
}
