# V9 Home And Brand Plan

V9 starts the transition from a polished product surface into a fundable, commercial-grade AI operations platform under the `nexns` name.

## V9.0 Completed Direction

- Rename the visible product brand to `nexns`.
- Rebuild the home page around operational value instead of feature listing.
- Make the first viewport show the product's system behavior: routing, policy, provider health, BYOK, fallback, cost, and audit.
- Add operating metrics, route lifecycle, trust architecture, market positioning, and roadmap sections.
- Keep the visual language premium, dark-first, animated, and SaaS-oriented.

## V9.1 Home Page Interaction Polish

Goal: make the home page feel more alive and product-like.

- Status: implemented in `components/site/home-systems.tsx`.
- Added scroll-based section reveals and route-path motion.
- Added a lightweight provider health ticker.
- Added a model scoring preview with selectable task types.
- Added mobile-optimized stacked product panels.
- Add stronger light-mode tuning for the new home sections.

## V9.2 Product Language System

Goal: make English and Chinese copy consistent across the platform.

- Status: started in `lib/i18n/product-glossary.ts`.
- Created a shared product glossary for route, workspace, provider, policy, audit, and billing terms.
- Replace remaining hard-coded product copy with dictionary-backed strings where practical.
- Added a bilingual homepage glossary block with professional SaaS tone.
- Add empty/error/loading states in both languages.

## V9.3 Home-To-Product Conversion Flow

Goal: make the landing page lead naturally into product setup.

- Status: implemented as a visible conversion path on the home page.
- Added workspace, BYOK, first route, and value tracking paths.
- Added guided links into `/workspace`, `/settings/providers`, `/chat`, and `/dashboard`.
- Next: connect these paths to real first-run setup state.

## V9.4 Production Data Integration

Goal: make the product show real operational data.

- Status: started in `lib/data/homepage-repository.ts`.
- Homepage metrics now read from Supabase when service credentials exist, with local fallback metrics.
- Connect route lifecycle visuals to stored `routing_decisions`.
- Connect provider health visuals to provider key tests and fallback telemetry.
- Add workspace-aware report generation.

## V9.5 Security And Operations Readiness

Goal: make `nexns` credible as a safe operating platform.

- Status: visible operating checklist added to the homepage.
- Enforce authenticated workspace access.
- Add role-based controls for provider keys, policies, and reports.
- Add route-level rate limits and provider execution timeouts.
- Add audit export, retention settings, and incident states.

## Chat Navigation Fix

The Chat workspace now includes:

- clickable `nexns` brand in the left sidebar that returns to `/`
- desktop Home button in the top bar
- mobile Home icon button in the top bar
