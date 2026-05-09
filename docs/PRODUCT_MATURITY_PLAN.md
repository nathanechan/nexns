# Product Maturity Plan

This plan moves nexns from a polished routing workspace into a mature commercial system.

## Product Voice

The product should describe itself as an operational AI routing platform, not as a demo or fundraising artifact.

Preferred language:

- routing control plane
- workspace governance
- provider health
- cost intelligence
- audit trail
- report center
- policy-based routing
- executive-ready reporting
- production telemetry

Avoid in product UI:

- demo
- investor demo
- MVP
- placeholder
- pitch
- VC-ready
- simulated users

## V8.3 Usage Metering

Goal: make dashboard metrics come from product events.

Implementation:

- Write `routing_decisions` after every route decision.
- Write `usage_events` after every provider execution.
- Add repository functions for spend, latency, savings, and provider distribution.
- Replace dashboard demo arrays with Supabase-backed aggregates.
- Keep graceful local fallback data for development only.

Acceptance:

- Dashboard reflects stored route events.
- Admin logs and route replay share the same source of truth.
- Savings report can be regenerated from usage events.

## V8.4 Auth And Workspace Enforcement

Goal: make all workspace data access membership-aware.

Implementation:

- Integrate Clerk Organizations or Auth.js organization mapping.
- Create workspace membership sync.
- Require authenticated actor IDs in provider key, policy, chat, and report APIs.
- Enforce workspace role checks before mutations.
- Add locked, empty, and unauthorized states.

Acceptance:

- Users only see workspaces they belong to.
- Admin-only actions are blocked for members/viewers.
- Provider keys cannot be saved without a valid workspace role.

## V8.5 Real Provider Execution

Goal: replace local response paths with production provider calls.

Implementation:

- Connect Vercel AI SDK providers for OpenAI, Anthropic, Google, xAI, DeepSeek, and OpenRouter.
- Decrypt BYOK keys only inside server-side execution.
- Add provider timeout, retry, and fallback chain.
- Record provider cost and token estimates.
- Surface route failure reasons clearly in chat and logs.

Acceptance:

- Chat can stream real responses.
- Fallback activates when a provider fails or breaches health rules.
- Usage events include provider, model, latency, cost, and status.

## V8.6 Billing And Plan Limits

Goal: turn plan pages into enforceable commercial controls.

Implementation:

- Map Stripe customers and subscriptions to workspaces.
- Enforce monthly route limits, parallel mode limits, member limits, and report exports.
- Add upgrade prompts at the point of value.
- Add invoice and plan status to workspace settings.

Acceptance:

- Free, Pro, Team, and Enterprise limits are enforced server-side.
- Billing state is visible to workspace admins.
- Limit events are recorded in audit logs.

## V8.7 Reliability And Compliance

Goal: prepare for real customer operation.

Implementation:

- Add rate limits by user, workspace, and API route.
- Add structured error boundaries and incident states.
- Add audit filters, export logs, retention policy, and sensitive-data policy checks.
- Add deployment checklist for Vercel, Supabase, Stripe, Clerk, and provider secrets.

Acceptance:

- Critical API routes are protected by rate limits.
- Admins can review provider incidents and fallback history.
- Compliance and audit posture is visible without engineering help.
