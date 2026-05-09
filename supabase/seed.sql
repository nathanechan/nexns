-- Demo workspace seed for local Supabase development.
-- Replace the user_id values with Clerk user IDs or Supabase auth user IDs in production.

insert into public.workspaces (id, name, slug, plan, monthly_route_limit, monthly_budget_cents, settings)
values (
  '00000000-0000-0000-0000-000000000001',
  'NexusRoute Demo Team',
  'nexusroute-demo',
  'team',
  30000,
  400000,
  '{"defaultPriority":"balanced","maxParallelModels":3,"fallbackProvider":"OpenRouter Auto"}'
)
on conflict (slug) do update set
  name = excluded.name,
  plan = excluded.plan,
  monthly_route_limit = excluded.monthly_route_limit,
  monthly_budget_cents = excluded.monthly_budget_cents,
  settings = excluded.settings;

insert into public.workspace_members (workspace_id, user_id, email, display_name, role)
values
  ('00000000-0000-0000-0000-000000000001', 'demo_owner', 'ava@nexusdemo.ai', 'Ava Chen', 'owner'),
  ('00000000-0000-0000-0000-000000000001', 'demo_admin', 'daniel@nexusdemo.ai', 'Daniel Park', 'admin'),
  ('00000000-0000-0000-0000-000000000001', 'demo_member', 'mina@nexusdemo.ai', 'Mina Patel', 'member')
on conflict (workspace_id, user_id) do update set
  email = excluded.email,
  display_name = excluded.display_name,
  role = excluded.role;

insert into public.projects (id, workspace_id, name, description, sensitivity, created_by)
values
  ('00000000-0000-0000-0000-000000000101', '00000000-0000-0000-0000-000000000001', 'Series A Fundraise', 'Investor memo analysis, Q&A, and route replays.', 'high', 'demo_owner'),
  ('00000000-0000-0000-0000-000000000102', '00000000-0000-0000-0000-000000000001', 'Engineering Copilot', 'Code review and debugging workflows.', 'medium', 'demo_admin')
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  sensitivity = excluded.sensitivity;

insert into public.chats (id, workspace_id, project_id, title, created_by)
values (
  '00000000-0000-0000-0000-000000000201',
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000101',
  'Investor memo route demo',
  'demo_owner'
)
on conflict (id) do update set title = excluded.title;

insert into public.routing_decisions (
  id,
  workspace_id,
  project_id,
  chat_id,
  user_id,
  query,
  intent,
  mode,
  selected_model,
  selected_provider,
  fallback_model,
  confidence,
  estimated_cost_cents,
  estimated_latency_ms,
  expected_savings_percent,
  status,
  trace,
  candidates,
  policy_checks
)
values (
  '00000000-0000-0000-0000-000000000301',
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000101',
  '00000000-0000-0000-0000-000000000201',
  'demo_owner',
  'Analyze this fundraising memo and generate VC-ready Q&A.',
  'document',
  'parallel',
  'Claude 4 Sonnet',
  'Anthropic',
  'OpenRouter Auto',
  94,
  6,
  1900,
  34,
  'success',
  '[{"label":"intent","value":94},{"label":"quality","value":96},{"label":"savings","value":34}]',
  '[{"model":"Claude 4 Sonnet","score":94},{"model":"GPT-4.1","score":89},{"model":"Gemini 2.5 Pro","score":86}]',
  '[{"name":"Sensitive data boundary","result":"approved"},{"name":"Budget pressure","result":"optimized"}]'
)
on conflict (id) do update set
  confidence = excluded.confidence,
  expected_savings_percent = excluded.expected_savings_percent;

insert into public.usage_events (
  workspace_id,
  route_id,
  user_id,
  provider,
  model,
  input_tokens,
  output_tokens,
  cost_cents,
  latency_ms
)
values (
  '00000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000301',
  'demo_owner',
  'Anthropic',
  'Claude 4 Sonnet',
  2400,
  1100,
  6,
  1900
);

insert into public.audit_events (workspace_id, actor_id, action, entity_type, entity_id, risk, metadata)
values (
  '00000000-0000-0000-0000-000000000001',
  'demo_owner',
  'route.created',
  'routing_decision',
  '00000000-0000-0000-0000-000000000301',
  'low',
  '{"summary":"Demo route captured for investor room"}'
);
