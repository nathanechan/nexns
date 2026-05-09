import type { ProviderKeyStatus } from "@/lib/database.types";
import { createSupabaseServiceClient } from "@/lib/integrations/supabase";
import { createKeyHint, encryptProviderKey } from "@/lib/security/provider-key-crypto";

export type ProviderKeyInput = {
  workspaceId: string;
  provider: string;
  providerKey: string;
  actorId: string;
  rotationDays?: number;
};

export async function listProviderKeys(workspaceId: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("provider_keys")
    .select("id, workspace_id, provider, key_hint, status, last_tested_at, rotation_due_at, created_by, created_at, updated_at")
    .eq("workspace_id", workspaceId)
    .order("provider", { ascending: true });

  if (error) {
    throw error;
  }

  return data ?? [];
}

export async function upsertProviderKey(input: ProviderKeyInput) {
  const supabase = createSupabaseServiceClient();
  const encryptedKey = encryptProviderKey(input.providerKey);
  const keyHint = createKeyHint(input.providerKey);
  const rotationDueAt = new Date(Date.now() + (input.rotationDays ?? 30) * 24 * 60 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from("provider_keys")
    .upsert(
      {
        workspace_id: input.workspaceId,
        provider: input.provider,
        encrypted_key: encryptedKey,
        key_hint: keyHint,
        status: "connected",
        rotation_due_at: rotationDueAt,
        created_by: input.actorId
      },
      { onConflict: "workspace_id,provider" }
    )
    .select("id, workspace_id, provider, key_hint, status, last_tested_at, rotation_due_at, created_by, created_at, updated_at")
    .single();

  if (error) {
    throw error;
  }

  await recordProviderKeyAudit({
    workspaceId: input.workspaceId,
    actorId: input.actorId,
    action: "provider_key.upserted",
    provider: input.provider,
    status: "connected",
    keyHint
  });

  return data;
}

export async function updateProviderKeyTestStatus(input: {
  workspaceId: string;
  provider: string;
  actorId: string;
  status: ProviderKeyStatus;
  message: string;
}) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("provider_keys")
    .update({
      status: input.status,
      last_tested_at: new Date().toISOString()
    })
    .eq("workspace_id", input.workspaceId)
    .eq("provider", input.provider)
    .select("id, workspace_id, provider, key_hint, status, last_tested_at, rotation_due_at, created_by, created_at, updated_at")
    .single();

  if (error) {
    throw error;
  }

  await recordProviderKeyAudit({
    workspaceId: input.workspaceId,
    actorId: input.actorId,
    action: "provider_key.tested",
    provider: input.provider,
    status: input.status,
    message: input.message
  });

  return data;
}

async function recordProviderKeyAudit(input: {
  workspaceId: string;
  actorId: string;
  action: string;
  provider: string;
  status: ProviderKeyStatus;
  keyHint?: string;
  message?: string;
}) {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.from("audit_events").insert({
    workspace_id: input.workspaceId,
    actor_id: input.actorId,
    action: input.action,
    entity_type: "provider_key",
    entity_id: input.provider,
    risk: input.status === "degraded" || input.status === "missing" ? "medium" : "low",
    metadata: {
      provider: input.provider,
      status: input.status,
      keyHint: input.keyHint,
      message: input.message
    }
  });

  if (error) {
    throw error;
  }
}
