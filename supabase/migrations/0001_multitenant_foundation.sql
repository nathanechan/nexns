-- NexusRoute AI V8.0 multi-tenant foundation.
-- Run in Supabase SQL Editor or with `supabase db push`.

create extension if not exists pgcrypto;

create type public.workspace_plan as enum ('free', 'pro', 'team', 'enterprise');
create type public.workspace_role as enum ('owner', 'admin', 'member', 'viewer');
create type public.route_status as enum ('success', 'fallback', 'manual', 'error');
create type public.provider_key_status as enum ('connected', 'degraded', 'missing', 'fallback');
create type public.asset_kind as enum ('file', 'image', 'pdf', 'prompt_template', 'route_replay', 'share_export');

create table public.workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  plan public.workspace_plan not null default 'free',
  monthly_route_limit integer not null default 100,
  monthly_budget_cents integer not null default 0,
  settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.workspace_members (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  user_id text not null,
  email text not null,
  display_name text,
  role public.workspace_role not null default 'member',
  joined_at timestamptz not null default now(),
  unique (workspace_id, user_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  name text not null,
  description text,
  sensitivity text not null default 'medium',
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.chats (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  title text not null,
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.chat_messages (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  chat_id uuid not null references public.chats(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  model_id text,
  token_count integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.workspace_assets (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  chat_id uuid references public.chats(id) on delete set null,
  name text not null,
  kind public.asset_kind not null,
  storage_path text,
  mime_type text,
  size_bytes bigint not null default 0,
  metadata jsonb not null default '{}'::jsonb,
  created_by text not null,
  created_at timestamptz not null default now()
);

create table public.provider_keys (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  provider text not null,
  encrypted_key text not null,
  key_hint text,
  status public.provider_key_status not null default 'missing',
  last_tested_at timestamptz,
  rotation_due_at timestamptz,
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (workspace_id, provider)
);

create table public.routing_decisions (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  project_id uuid references public.projects(id) on delete set null,
  chat_id uuid references public.chats(id) on delete set null,
  user_id text not null,
  query text not null,
  intent text not null,
  mode text not null,
  selected_model text not null,
  selected_provider text not null,
  fallback_model text,
  confidence numeric(5,2) not null default 0,
  estimated_cost_cents integer not null default 0,
  estimated_latency_ms integer not null default 0,
  expected_savings_percent integer not null default 0,
  status public.route_status not null default 'success',
  trace jsonb not null default '[]'::jsonb,
  candidates jsonb not null default '[]'::jsonb,
  policy_checks jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table public.usage_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  route_id uuid references public.routing_decisions(id) on delete set null,
  user_id text not null,
  provider text not null,
  model text not null,
  input_tokens integer not null default 0,
  output_tokens integer not null default 0,
  cost_cents integer not null default 0,
  latency_ms integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.audit_events (
  id uuid primary key default gen_random_uuid(),
  workspace_id uuid not null references public.workspaces(id) on delete cascade,
  actor_id text not null,
  action text not null,
  entity_type text not null,
  entity_id text,
  risk text not null default 'low',
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index workspace_members_user_idx on public.workspace_members(user_id);
create index projects_workspace_idx on public.projects(workspace_id);
create index chats_workspace_idx on public.chats(workspace_id, updated_at desc);
create index messages_chat_idx on public.chat_messages(chat_id, created_at asc);
create index assets_workspace_idx on public.workspace_assets(workspace_id, created_at desc);
create index routes_workspace_idx on public.routing_decisions(workspace_id, created_at desc);
create index usage_workspace_idx on public.usage_events(workspace_id, created_at desc);
create index audit_workspace_idx on public.audit_events(workspace_id, created_at desc);

create or replace function public.touch_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger touch_workspaces_updated_at before update on public.workspaces
for each row execute function public.touch_updated_at();

create trigger touch_projects_updated_at before update on public.projects
for each row execute function public.touch_updated_at();

create trigger touch_chats_updated_at before update on public.chats
for each row execute function public.touch_updated_at();

create trigger touch_provider_keys_updated_at before update on public.provider_keys
for each row execute function public.touch_updated_at();

create or replace function public.is_workspace_member(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members member
    where member.workspace_id = target_workspace_id
      and member.user_id = auth.uid()::text
  );
$$;

create or replace function public.is_workspace_admin(target_workspace_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.workspace_members member
    where member.workspace_id = target_workspace_id
      and member.user_id = auth.uid()::text
      and member.role in ('owner', 'admin')
  );
$$;

alter table public.workspaces enable row level security;
alter table public.workspace_members enable row level security;
alter table public.projects enable row level security;
alter table public.chats enable row level security;
alter table public.chat_messages enable row level security;
alter table public.workspace_assets enable row level security;
alter table public.provider_keys enable row level security;
alter table public.routing_decisions enable row level security;
alter table public.usage_events enable row level security;
alter table public.audit_events enable row level security;

create policy "Members can read their workspaces" on public.workspaces
for select using (public.is_workspace_member(id));

create policy "Workspace admins can update workspaces" on public.workspaces
for update using (public.is_workspace_admin(id));

create policy "Members can read workspace members" on public.workspace_members
for select using (public.is_workspace_member(workspace_id));

create policy "Admins can manage workspace members" on public.workspace_members
for all using (public.is_workspace_admin(workspace_id));

create policy "Members can read projects" on public.projects
for select using (public.is_workspace_member(workspace_id));

create policy "Members can create projects" on public.projects
for insert with check (public.is_workspace_member(workspace_id));

create policy "Members can update projects" on public.projects
for update using (public.is_workspace_member(workspace_id));

create policy "Members can read chats" on public.chats
for select using (public.is_workspace_member(workspace_id));

create policy "Members can create chats" on public.chats
for insert with check (public.is_workspace_member(workspace_id));

create policy "Members can update chats" on public.chats
for update using (public.is_workspace_member(workspace_id));

create policy "Members can read messages" on public.chat_messages
for select using (public.is_workspace_member(workspace_id));

create policy "Members can create messages" on public.chat_messages
for insert with check (public.is_workspace_member(workspace_id));

create policy "Members can read assets" on public.workspace_assets
for select using (public.is_workspace_member(workspace_id));

create policy "Members can create assets" on public.workspace_assets
for insert with check (public.is_workspace_member(workspace_id));

create policy "Admins can read provider keys" on public.provider_keys
for select using (public.is_workspace_admin(workspace_id));

create policy "Admins can manage provider keys" on public.provider_keys
for all using (public.is_workspace_admin(workspace_id));

create policy "Members can read routing decisions" on public.routing_decisions
for select using (public.is_workspace_member(workspace_id));

create policy "Members can create routing decisions" on public.routing_decisions
for insert with check (public.is_workspace_member(workspace_id));

create policy "Members can read usage events" on public.usage_events
for select using (public.is_workspace_member(workspace_id));

create policy "Members can create usage events" on public.usage_events
for insert with check (public.is_workspace_member(workspace_id));

create policy "Members can read audit events" on public.audit_events
for select using (public.is_workspace_member(workspace_id));

create policy "Members can create audit events" on public.audit_events
for insert with check (public.is_workspace_member(workspace_id));
