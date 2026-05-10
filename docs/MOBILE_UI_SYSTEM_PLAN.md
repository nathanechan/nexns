# nexns Mobile UI System Plan

## Product Direction

nexns mobile should feel like a system-level operating surface, not a compressed desktop page. The core experience is interaction: users open the app, ask, route, compare, review cost impact, and adjust settings without hunting through scattered buttons.

## Design Principles

- Interaction first: chat, routing state, composer, and comparison results are the primary mobile surface.
- One navigation model: global movement belongs in the mobile dock and Navigation Center.
- Settings consolidation: provider keys, routing preferences, billing, privacy, and account controls live in Settings.
- Less page chrome: content pages should avoid repeated action rows and duplicate navigation.
- Fluid motion: use soft transitions, collapsible sheets, progressive reveal, and touch-friendly spacing.
- Product language: avoid demo-oriented copy; use mature operational language around reliability, governance, usage, and control.

## V10 Mobile UI Iteration Plan

### V10.1 Navigation Foundation

Status: shipped.

- Add a unified mobile dock for Home, Navigation, Chat, Dashboard, and Settings.
- Add a Navigation Center as the central mobile command surface.
- Remove scattered mobile quick-navigation rows from app pages.
- Keep chat focused while still exposing Home, Navigation, and Settings access.

### V10.2 Chat Interaction Surface

Status: in progress.

Goal: make mobile chat feel closer to a native AI workspace.

- Convert the routing panel into a bottom sheet on mobile. Shipped.
- Add compact route-confidence chips above the composer. Shipped as the mobile route command bar.
- Keep the composer sticky, touch-friendly, and visually calm. Shipped as the mobile-first composer surface.
- Add smoother state transitions for evaluating, routing, streaming, and comparing.
- Move secondary chat actions into a compact action menu.

Acceptance:

- A user can start, route, compare, and adjust a query with one hand.
- The composer never competes with global navigation.
- Routing information is visible without crowding the answer.

### V10.3 Settings And Control Center

Goal: make configuration feel mature and trustworthy.

- Group Settings into Account, Providers, Routing, Billing, Security, and Workspace.
- Add save states, validation states, and clear empty states.
- Move provider and routing controls out of general page headers.
- Add mobile-friendly provider cards with health, spend, and fallback status.

Acceptance:

- Users understand where every configuration belongs.
- BYOK setup feels like a secure product workflow, not a form demo.

### V10.4 Mobile Dashboard Redesign

Goal: make operating metrics readable on small screens.

- Replace dense desktop charts with summary-first KPI cards.
- Add drill-down sheets for cost, latency, model distribution, and routing quality.
- Use mobile-native report sections with clear trend labels.
- Add executive summary cards for savings, reliability, and throughput.

Acceptance:

- A founder can show business value from a phone in under 30 seconds.
- Metrics feel operational, not decorative.

### V10.5 Motion And Visual Polish

Goal: raise perceived quality across the product.

- Standardize page entrance, sheet, hover, tap, and loading motion.
- Add soft depth, active glow, and state-based color tokens without overusing gradients.
- Improve light/dark theme parity.
- Tighten typography scale, spacing rhythm, and button hierarchy.
- Add skeleton states for chat, settings, dashboard, and navigation surfaces.

Acceptance:

- The UI feels fluid without becoming distracting.
- Mobile and desktop share one premium product language.

### V10.6 Product Hardening Layer

Goal: prepare UI behavior for real customers.

- Add error recovery states for failed routing, missing keys, and provider timeout.
- Add rate-limit and usage-limit visual states.
- Add workspace role placeholders for owner, admin, and member.
- Add accessibility pass for focus states, contrast, labels, and reduced motion.
- Add performance checks for mobile first load and interaction latency.

Acceptance:

- The product communicates issues clearly.
- The interface supports real operations beyond a presentation flow.

## Implementation Order

1. Rework mobile chat into a composer-first interaction surface.
2. Move route evaluation into a collapsible bottom sheet.
3. Consolidate all secondary actions into Navigation Center or Settings.
4. Redesign Settings into a true control center.
5. Redesign Dashboard mobile reports.
6. Apply unified motion, loading, and accessibility rules.

## Definition Of Done

- Mobile navigation is consistent across all primary routes.
- No page uses duplicate mobile navigation controls.
- Every important action has one obvious home.
- Chat, settings, dashboard, and navigation feel like one system.
- UI copy presents nexns as a mature SaaS product.
- The mobile experience is strong enough to demo independently from desktop.
