import { createSupabaseServiceClient } from "@/lib/integrations/supabase";
import type { Json } from "@/lib/database.types";

export async function getWorkspaceOverview(workspaceId: string) {
  const supabase = createSupabaseServiceClient();

  const [workspaceResult, membersResult, projectsResult, routesResult, usageResult] = await Promise.all([
    supabase.from("workspaces").select("*").eq("id", workspaceId).single(),
    supabase.from("workspace_members").select("*").eq("workspace_id", workspaceId).order("joined_at", { ascending: true }),
    supabase.from("projects").select("*").eq("workspace_id", workspaceId).order("updated_at", { ascending: false }),
    supabase.from("routing_decisions").select("*").eq("workspace_id", workspaceId).order("created_at", { ascending: false }).limit(20),
    supabase.from("usage_events").select("*").eq("workspace_id", workspaceId).order("created_at", { ascending: false }).limit(100)
  ]);

  if (workspaceResult.error) {
    throw workspaceResult.error;
  }

  return {
    workspace: workspaceResult.data,
    members: membersResult.data ?? [],
    projects: projectsResult.data ?? [],
    routes: routesResult.data ?? [],
    usageEvents: usageResult.data ?? []
  };
}

export async function recordAuditEvent(input: {
  workspaceId: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId?: string;
  risk?: string;
  metadata?: Json;
}) {
  const supabase = createSupabaseServiceClient();
  const { error } = await supabase.from("audit_events").insert({
    workspace_id: input.workspaceId,
    actor_id: input.actorId,
    action: input.action,
    entity_type: input.entityType,
    entity_id: input.entityId,
    risk: input.risk ?? "low",
    metadata: input.metadata ?? {}
  });

  if (error) {
    throw error;
  }
}
