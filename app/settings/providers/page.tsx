import Link from "next/link";
import {
  Activity,
  ArrowRight,
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  PlugZap,
  RotateCcw,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  TestTube2,
  Vault
} from "lucide-react";
import {
  providerKeyAudits,
  providerUptimeSeries,
  providerVaultMetrics
} from "@/lib/demo-data";
import { AppShell } from "@/components/app-shell/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ProviderKeyConsole } from "@/components/settings/provider-key-console";

const providers = [
  {
    name: "OpenAI",
    status: "connected",
    key: "sk-live-************8A2",
    usage: "27% route share",
    owner: "Northstar Capital",
    policy: "Coding, tools, general reasoning",
    rotation: "9 days"
  },
  {
    name: "Anthropic",
    status: "connected",
    key: "sk-ant-************1D9",
    usage: "34% route share",
    owner: "Aster Labs",
    policy: "Long-context reasoning and board docs",
    rotation: "21 days"
  },
  {
    name: "Google",
    status: "connected",
    key: "AIza************R4",
    usage: "18% route share",
    owner: "Meridian AI",
    policy: "Vision, files, large document windows",
    rotation: "34 days"
  },
  {
    name: "xAI",
    status: "degraded",
    key: "xai-************7F",
    usage: "7% route share",
    owner: "Global fallback",
    policy: "Freshness routes under SLA watch",
    rotation: "14 days"
  },
  {
    name: "DeepSeek",
    status: "connected",
    key: "ds-************K2",
    usage: "14% route share",
    owner: "PilotForge",
    policy: "Cost-efficient coding and reasoning",
    rotation: "48 days"
  },
  {
    name: "OpenRouter",
    status: "fallback",
    key: "or-************P0",
    usage: "global fallback",
    owner: "Platform",
    policy: "Provider-of-last-resort coverage",
    rotation: "30 days"
  }
];

export default function ProviderVaultPage() {
  return (
    <AppShell
      title="Provider Vault"
      description="Manage BYOK coverage, provider health, key rotation, and fallback safety for every workspace."
      actions={
        <Link href="/settings/policy">
          <Button variant="secondary" className="gap-2">
            Open policy center
            <ArrowRight size={16} />
          </Button>
        </Link>
      }
    >
      <section className="route-scan mt-6 overflow-hidden rounded-2xl border border-white/10 bg-card shadow-[0_24px_80px_rgba(0,0,0,0.18)]">
        <div className="grid gap-0 xl:grid-cols-[0.88fr_1.12fr]">
          <div className="relative p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_46%)]" />
            <div className="relative">
              <Badge className="border-primary/30 bg-primary/10 text-primary">Encrypted BYOK vault</Badge>
              <Vault className="mt-6 text-primary" size={30} />
              <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Customer-owned provider keys, routed through one governed layer.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                The vault reduces platform cash burn, keeps provider access under customer control, and gives the routing
                engine enough health data to fail over safely.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {providerVaultMetrics.map((metric) => (
                  <article key={metric.label} className="rounded-2xl border border-white/10 bg-background/55 p-4 backdrop-blur">
                    <div className="text-2xl font-semibold">{metric.value}</div>
                    <div className="mt-1 text-sm">{metric.label}</div>
                    <div className="mt-2 text-xs leading-5 text-muted-foreground">{metric.detail}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.03] p-5 xl:border-l xl:border-t-0">
            <div className="flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Activity size={18} className="text-primary" />
                Provider health sync
              </h2>
              <Button variant="secondary" size="sm" className="gap-2">
                <TestTube2 size={15} />
                Test all
              </Button>
            </div>
            <div className="mt-5 space-y-3">
              {providerUptimeSeries.map((provider) => (
                <article key={provider.provider} className="rounded-2xl border border-white/10 bg-background/55 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <h3 className="font-medium">{provider.provider}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {provider.uptime}% uptime / {provider.p95}ms p95 / {provider.errorRate}% error
                      </p>
                    </div>
                    <StatusBadge status={provider.status} />
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(provider.uptime, 100)}%` }} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="motion-card mt-5 rounded-2xl border border-white/10 bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <PlugZap size={18} className="text-primary" />
              Provider connections
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Workspace-scoped keys with policy ownership and rotation windows.</p>
          </div>
          <Button size="sm" className="gap-2">
            <KeyRound size={15} />
            Add provider key
          </Button>
        </div>

        <div className="mt-5 grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
          {providers.map((provider) => (
            <article key={provider.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{provider.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{provider.usage}</p>
                </div>
                <StatusBadge status={provider.status} />
              </div>
              <div className="mt-4">
                <label className="mb-2 block text-xs text-muted-foreground" htmlFor={`${provider.name}-key`}>
                  Encrypted key preview
                </label>
                <Input id={`${provider.name}-key`} value={provider.key} readOnly aria-label={`${provider.name} API key`} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <InfoPill label="Owner" value={provider.owner} />
                <InfoPill label="Rotate in" value={provider.rotation} />
              </div>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{provider.policy}</p>
              <div className="mt-4 flex gap-2">
                <Button variant="secondary" size="sm" className="gap-2">
                  <RotateCcw size={14} />
                  Rotate
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <TestTube2 size={14} />
                  Run test
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="route-scan mt-5 rounded-2xl border border-primary/20 bg-primary/[0.065] p-5">
        <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
          <div>
            <Badge className="border-primary/30 bg-primary/10 text-primary">Key lifecycle</Badge>
            <h2 className="mt-3 text-lg font-semibold">Encrypted provider access with operational controls.</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Server-side encryption, provider health testing, and audit logging keep customer-owned keys governed
              through the same operational layer as routing policy.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <InfoPill label="Save key" value="POST /api/provider-keys" />
            <InfoPill label="Test key" value="POST /api/provider-keys/test" />
            <InfoPill label="Storage" value="Supabase provider_keys" />
            <InfoPill label="Audit" value="Supabase audit_events" />
          </div>
        </div>
        <div className="mt-5">
          <ProviderKeyConsole />
        </div>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <section className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <LockKeyhole size={18} className="text-primary" />
              Security posture
            </h2>
            <Badge className="border-primary/30 bg-primary/10 text-primary">production path</Badge>
          </div>
          <div className="mt-5 space-y-3">
            {[
              "Server-side AES-GCM encryption through BYOK_ENCRYPTION_KEY",
              "Per-tenant encryption envelope for stored provider keys",
              "Connection tests run before routing traffic to a provider",
              "Key rotation reminders tied to workspace owner and plan",
              "Fallback route stays available when BYOK keys fail",
              "Audit events recorded for tests, rotations, and policy changes"
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm">
                <ShieldCheck size={16} className="mt-0.5 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Sparkles size={18} className="text-primary" />
              Key audit stream
            </h2>
            <Badge>latest events</Badge>
          </div>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-white/[0.04] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Provider</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Event</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Time</th>
                </tr>
              </thead>
              <tbody>
                {providerKeyAudits.map((audit) => (
                  <tr key={`${audit.provider}-${audit.event}`} className="border-t border-white/[0.08]">
                    <td className="px-4 py-3 font-medium">{audit.provider}</td>
                    <td className="px-4 py-3 text-muted-foreground">{audit.owner}</td>
                    <td className="px-4 py-3">{audit.event}</td>
                    <td className="px-4 py-3">
                      <AuditBadge status={audit.status} />
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{audit.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function InfoPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 p-3">
      <div className="text-muted-foreground">{label}</div>
      <div className="mt-1 truncate font-medium">{value}</div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "connected" || status === "stable") {
    return (
      <Badge className="border-primary/30 bg-primary/10 text-primary">
        <CheckCircle2 size={13} className="mr-1" />
        {status === "stable" ? "stable" : "connected"}
      </Badge>
    );
  }

  if (status === "degraded" || status === "watch") {
    return (
      <Badge className="border-warning/30 bg-warning/10 text-warning">
        <ShieldAlert size={13} className="mr-1" />
        {status}
      </Badge>
    );
  }

  return (
    <Badge className="border-white/20 bg-white/[0.06] text-muted-foreground">
      <ShieldCheck size={13} className="mr-1" />
      fallback
    </Badge>
  );
}

function AuditBadge({ status }: { status: string }) {
  const className =
    status === "passed"
      ? "border-primary/30 bg-primary/10 text-primary"
      : status === "watch"
        ? "border-warning/30 bg-warning/10 text-warning"
        : "border-white/20 bg-white/[0.06] text-muted-foreground";

  return <Badge className={className}>{status}</Badge>;
}
