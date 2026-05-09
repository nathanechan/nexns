# V8 Production Foundation

V8 moves NexusRoute AI from a polished investor demo toward a reliable SaaS product.

## Data Model

The Supabase schema is intentionally tenant-first:

- `workspaces` own all commercial and governance boundaries.
- `workspace_members` maps authenticated users to workspace roles.
- `projects` organize work by investor room, engineering, research, or customer workflows.
- `chats` and `chat_messages` persist the core AI experience.
- `workspace_assets` stores metadata for files, prompt templates, share exports, and route replays.
- `provider_keys` prepares the BYOK vault.
- `routing_decisions` stores the explainable route decision.
- `usage_events` stores metering data for dashboards and billing.
- `audit_events` records policy, key, route, and workspace changes.

## RLS Strategy

The migration enables row-level security on all tenant tables.

Two helper functions drive access:

- `is_workspace_member(workspace_id)`
- `is_workspace_admin(workspace_id)`

The current policy model:

- Members can read workspace data they belong to.
- Members can create chats, messages, assets, routes, usage events, and audit events inside their workspace.
- Admins can manage members and provider keys.
- Workspace settings can be updated by admins.

## Clerk Integration Plan

The migration stores `user_id` as text to support Clerk user IDs.

Recommended V8.1 mapping:

1. Use Clerk Organizations as the source of truth for teams.
2. Create a `workspaces` row when a Clerk organization is created.
3. Sync Clerk memberships into `workspace_members`.
4. Put the Clerk user ID into Supabase JWT claims or use API routes with the service role client.

## BYOK Vault Status

V8.2 now includes the first production BYOK path:

1. Provider keys are encrypted before inserting into `provider_keys.encrypted_key`.
2. A non-sensitive `key_hint` is stored for UI previews.
3. `/api/provider-keys/test` updates connection status before routing traffic.
4. Key saves and tests are recorded in `audit_events`.

The next step is to enforce authenticated workspace membership before key mutation and replace simulated health checks with real provider SDK probes.

## Usage Metering Plan

For V8.3:

1. Write a `routing_decisions` row after every route decision.
2. Write a `usage_events` row after every provider call.
3. Aggregate spend, latency, fallback rate, and model distribution from Supabase.
4. Replace demo arrays in `lib/demo-data.ts` with repository calls.

## Billing Plan

For V8.4:

1. Map Stripe customer IDs to workspaces.
2. Enforce route limits from `workspaces.monthly_route_limit`.
3. Enforce budget guardrails from `workspaces.monthly_budget_cents`.
4. Surface upgrade prompts when plan limits are reached.
