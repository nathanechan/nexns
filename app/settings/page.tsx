import Link from "next/link";
import {
  ArrowRight,
  BadgeDollarSign,
  CheckCircle2,
  CreditCard,
  DatabaseZap,
  Fingerprint,
  LockKeyhole,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Users
} from "lucide-react";
import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const controlGroups = [
  {
    title: "Provider Vault",
    href: "/settings/providers",
    icon: DatabaseZap,
    status: "healthy",
    description: "Manage BYOK coverage, key rotation, provider health, and fallback readiness.",
    metrics: [
      ["Coverage", "94%"],
      ["Connected", "6"],
      ["Rotation", "9d"]
    ]
  },
  {
    title: "Routing Policy",
    href: "/settings/policy",
    icon: SlidersHorizontal,
    status: "active",
    description: "Control budget caps, sensitive data rules, fallback chains, and approval thresholds.",
    metrics: [
      ["Guardrails", "4"],
      ["Savings", "35%"],
      ["Override", "8%"]
    ]
  },
  {
    title: "Billing Controls",
    href: "/pricing",
    icon: CreditCard,
    status: "configured",
    description: "Review plan limits, route volume, billing owner, and subscription capacity.",
    metrics: [
      ["Plan", "Team"],
      ["Routes", "80%"],
      ["Seats", "12"]
    ]
  },
  {
    title: "Workspace Access",
    href: "/workspace",
    icon: Users,
    status: "managed",
    description: "Manage projects, members, shared assets, route evidence, and operating roles.",
    metrics: [
      ["Members", "12"],
      ["Projects", "4"],
      ["Assets", "284"]
    ]
  }
];

const securityItems = [
  { label: "API key encryption", value: "Enabled", icon: LockKeyhole },
  { label: "Route replay audit", value: "99.4%", icon: ShieldCheck },
  { label: "Workspace roles", value: "Owner / Admin / Member", icon: Fingerprint },
  { label: "Budget guardrails", value: "$180 daily cap", icon: BadgeDollarSign }
];

const setupHealth = [
  { label: "Provider keys", state: "complete", detail: "All primary providers have a tested fallback path." },
  { label: "Policy defaults", state: "complete", detail: "Balanced routing is active with budget pressure downgrade." },
  { label: "Billing owner", state: "ready", detail: "Subscription and usage alerts are assigned to workspace finance." },
  { label: "Security review", state: "ready", detail: "Audit, retention, and role controls are prepared for production rollout." }
];

export default function SettingsCenterPage() {
  return (
    <AppShell
      title="Control Center"
      description="Configure providers, routing policy, billing capacity, workspace access, and security posture from one operational settings layer."
      actions={
        <Link href="/settings/providers">
          <Button className="gap-2">
            Open provider vault
            <ArrowRight size={16} />
          </Button>
        </Link>
      }
    >
      <section className="route-scan mt-6 overflow-hidden rounded-[1.6rem] border border-primary/20 bg-primary/[0.065] shadow-panel">
        <div className="grid gap-0 xl:grid-cols-[0.82fr_1.18fr]">
          <div className="relative p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.2),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_48%)]" />
            <div className="relative">
              <Badge className="border-primary/30 bg-primary/10 text-primary">System settings</Badge>
              <Sparkles className="mt-6 text-primary" size={32} />
              <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                One control plane for model access, policy, cost, and governance.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                nexns settings are organized around operational ownership: keys, policy, billing, roles, audit, and
                rollout readiness.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <ControlMetric label="Route reliability" value="99.2%" />
                <ControlMetric label="Monthly savings" value="35%" />
                <ControlMetric label="Audit coverage" value="99.4%" />
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-background/35 p-5 xl:border-l xl:border-t-0">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-primary">Configuration health</p>
                <h2 className="mt-1 text-xl font-semibold">Workspace is ready for controlled rollout.</h2>
              </div>
              <Badge className="border-primary/30 bg-primary/10 text-primary">4/4 ready</Badge>
            </div>
            <div className="mt-5 space-y-3">
              {setupHealth.map((item) => (
                <article key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-medium">{item.label}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                    </div>
                    <StatusBadge status={item.state} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {controlGroups.map((group) => {
          const Icon = group.icon;

          return (
            <Link key={group.title} href={group.href} className="group">
              <article className="motion-card h-full rounded-[1.35rem] border border-white/10 bg-card p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/25 bg-primary/10 text-primary">
                    <Icon size={20} />
                  </span>
                  <StatusBadge status={group.status} />
                </div>
                <h2 className="mt-5 text-lg font-semibold">{group.title}</h2>
                <p className="mt-2 min-h-16 text-sm leading-6 text-muted-foreground">{group.description}</p>
                <div className="mt-5 grid grid-cols-3 gap-2">
                  {group.metrics.map(([label, value]) => (
                    <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-2">
                      <p className="truncate text-[11px] text-muted-foreground">{label}</p>
                      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-sm text-primary">
                  Open controls
                  <ArrowRight size={15} className="transition group-hover:translate-x-1" />
                </div>
              </article>
            </Link>
          );
        })}
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1.05fr_0.95fr]">
        <section className="rounded-[1.35rem] border border-white/10 bg-card p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ShieldCheck size={18} className="text-primary" />
                Security and governance
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">Operational controls that protect routing reliability and customer-owned access.</p>
            </div>
            <Badge className="border-primary/30 bg-primary/10 text-primary">production path</Badge>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {securityItems.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <Icon size={18} className="text-primary" />
                  <p className="mt-3 text-sm text-muted-foreground">{item.label}</p>
                  <p className="mt-1 font-semibold">{item.value}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="rounded-[1.35rem] border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Route size={18} className="text-primary" />
              Recommended next controls
            </h2>
            <Badge>next</Badge>
          </div>
          <div className="mt-5 space-y-3">
            {[
              ["Provider key policy", "Require key test before a provider receives production traffic."],
              ["Monthly budget alert", "Notify owners at 70%, 85%, and 100% of route capacity."],
              ["Sensitive workspace mode", "Restrict high-risk prompts to approved providers and logged route replay."],
              ["Team role templates", "Create default permissions for Finance, Engineering, and Operations."]
            ].map(([title, detail]) => (
              <article key={title} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <CheckCircle2 size={17} className="mt-0.5 text-primary" />
                <div>
                  <h3 className="font-medium">{title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">{detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function ControlMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-background/55 p-4 backdrop-blur">
      <p className="text-2xl font-semibold">{value}</p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const tone =
    status === "healthy" || status === "complete"
      ? "border-primary/30 bg-primary/10 text-primary"
      : status === "active" || status === "ready"
        ? "border-success/30 bg-success/10 text-success"
        : "border-white/20 bg-white/[0.06] text-muted-foreground";

  return <Badge className={tone}>{status}</Badge>;
}
