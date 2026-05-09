# nexns

nexns is an AI routing SaaS platform for teams that need unified AI access, intelligent model routing, BYOK provider controls, usage analytics, policy governance, and auditable reporting.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Key Routes

- `/` - Product landing page and operating narrative.
- `/chat` - Premium AI routing workspace with route timeline, parallel comparison, file-aware routing, and streaming output.
- `/dashboard` - Usage, savings, latency, provider, and ROI dashboard.
- `/admin` - Control plane for tenants, provider SLA, risk alerts, and routing audit logs.
- `/workspace` - Team workspace, projects, members, assets, quota, and audit activity.
- `/settings/providers` - BYOK provider vault.
- `/settings/policy` - Policy center for budget, sensitive data, fallback, and approval rules.
- `/share` - Report center and export workspace.
- `/pricing` - Pricing plans for route volume and governance.

## V8.0 Production Foundation

V8.0 adds a Supabase multi-tenant foundation:

- `supabase/migrations/0001_multitenant_foundation.sql`
- `supabase/seed.sql`
- `lib/database.types.ts`
- `lib/integrations/supabase.ts`
- `lib/data/workspace-repository.ts`
- `docs/PRODUCT_MATURITY_PLAN.md`

The schema supports:

- workspaces and workspace members
- projects and chats
- chat messages
- shared assets and file metadata
- provider keys for BYOK
- routing decisions and route traces
- usage events for metering
- audit events for governance
- row-level security helpers and policies

## V8.2 BYOK Vault

V8.2 adds the first real provider key lifecycle:

- `lib/security/provider-key-crypto.ts`
- `lib/data/provider-key-repository.ts`
- `app/api/provider-keys/route.ts`
- `app/api/provider-keys/test/route.ts`
- `docs/V8_BYOK_VAULT.md`

Provider keys are encrypted server-side, stored with safe key hints, tested through a dedicated route, and recorded in the audit stream.

## V9.0 Home And Brand

V9.0 introduces the `nexns` brand and upgrades the home page into a premium product entry point:

- operational hero with route scoring, policy, BYOK, fallback, and audit signals
- system metrics for managed routes, savings, fallback, and audit coverage
- route lifecycle section from classification to replay
- trust architecture section for provider keys, policies, SLA, and route evidence
- roadmap section for usage metering, workspace enforcement, real provider execution, billing, and reliability

See `docs/V9_HOME_AND_BRAND_PLAN.md` for the next iteration plan.

## Supabase Setup

1. Create a Supabase project.
2. Copy `.env.example` to `.env.local`.
3. Fill:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
BYOK_ENCRYPTION_KEY=replace_with_long_random_secret_min_32_chars
```

4. Run the SQL in `supabase/migrations/0001_multitenant_foundation.sql`.
5. Optionally run `supabase/seed.sql` for local development data.

With Supabase CLI, the intended flow is:

```bash
supabase db push
supabase db reset
```

## Vercel Deployment

Deployment notes are in `docs/VERCEL_DEPLOYMENT.md`.

The project is configured for Vercel with:

- Node.js 20.x
- `npm install --legacy-peer-deps`
- `npm run build`

## Environment

The app can run without real AI keys for local development. For real streaming, configure one or more provider keys:

```bash
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
XAI_API_KEY=
DEEPSEEK_API_KEY=
OPENROUTER_API_KEY=
```

## Product Direction

The next production milestones are:

- V8.3 Usage metering and dashboard data from Supabase.
- V8.4 authenticated workspace membership and role enforcement.
- V8.5 real provider execution with retries, fallback, and BYOK decryption.
- V8.6 Stripe subscription gating and plan limits.
- V8.7 production reliability: rate limits, compliance logs, incident states, and deployment checklist.
