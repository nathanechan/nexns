import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  Building2,
  Clock3,
  DatabaseZap,
  Filter,
  Gauge,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import {
  controlPlaneAlerts,
  controlPlaneStats,
  providerUptimeSeries,
  routingLogs,
  tenantWorkspaces
} from "@/lib/demo-data";
import { AppShell } from "@/components/app-shell/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type AdminPageProps = {
  searchParams?: Promise<{
    intent?: string;
    status?: string;
    model?: string;
  }>;
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = (await searchParams) ?? {};
  const filteredLogs = routingLogs.filter((log) => {
    const intentMatch = !params.intent || params.intent === "all" || log.intent === params.intent;
    const statusMatch = !params.status || params.status === "all" || log.status === params.status;
    const modelMatch = !params.model || params.model === "all" || log.routedTo.includes(params.model);
    return intentMatch && statusMatch && modelMatch;
  });

  const selectedReplay = filteredLogs[0] ?? routingLogs[0]!;
  const fallbackRate = Math.round((routingLogs.filter((log) => log.status === "fallback").length / routingLogs.length) * 100);
  const manualRate = Math.round((routingLogs.filter((log) => log.status === "manual").length / routingLogs.length) * 100);
  const budgetAtRisk = tenantWorkspaces.filter((tenant) => tenant.risk !== "low").length;

  return (
    <AppShell
      title="Control Plane"
      description="Operate tenants, budgets, provider health, and explainable routing from one executive-grade command center."
    >
      <section className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-card">
        <div className="grid gap-0 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_42%)]" />
            <div className="relative">
              <Badge className="border-primary/30 bg-primary/10 text-primary">Live control plane</Badge>
              <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Multi-tenant AI routing operations for reliable workspace governance.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Monitor cost exposure, fallback pressure, BYOK adoption, provider reliability, and replayable routing evidence
                without leaving the product.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {controlPlaneStats.map((stat) => (
                  <article key={stat.label} className="rounded-2xl border border-white/10 bg-background/55 p-4 backdrop-blur">
                    <div className="text-2xl font-semibold">{stat.value}</div>
                    <div className="mt-1 text-sm text-foreground">{stat.label}</div>
                    <div className="mt-2 text-xs text-muted-foreground">{stat.detail}</div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 bg-white/[0.03] p-5 lg:border-l lg:border-t-0">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                <ShieldCheck size={16} className="text-primary" />
                Operator pulse
              </h2>
              <Badge>live telemetry</Badge>
            </div>
            <div className="mt-5 grid gap-3">
              {[
                { icon: Users, label: "Manual override rate", value: `${manualRate}%`, detail: "Policy drift remains controlled" },
                { icon: Activity, label: "Fallback pressure", value: `${fallbackRate}%`, detail: "xAI routes capped automatically" },
                { icon: AlertTriangle, label: "Budgets at risk", value: `${budgetAtRisk}`, detail: "Workspaces need policy tuning" }
              ].map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.label} className="route-scan rounded-2xl border border-white/10 bg-background/55 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="rounded-xl bg-primary/10 p-2 text-primary">
                          <Icon size={18} />
                        </span>
                        <div>
                          <div className="font-medium">{item.label}</div>
                          <div className="mt-1 text-xs text-muted-foreground">{item.detail}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-semibold">{item.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="route-scan mt-5 rounded-2xl border border-primary/20 bg-primary/[0.065] p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Operations stream</p>
            <h2 className="mt-1 text-xl font-semibold">Routing health, budget exposure, and tenant risk are actively monitored.</h2>
          </div>
          <div className="grid gap-3 text-sm sm:grid-cols-3">
            <OpsPill label="Auto routes" value="92%" />
            <OpsPill label="Fallback SLA" value={`${fallbackRate}%`} />
            <OpsPill label="Overrides" value={`${manualRate}%`} />
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <section className="motion-card rounded-2xl border border-white/10 bg-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <RadioTower size={18} className="text-primary" />
              Risk alerts
            </h2>
            <Badge className="border-warning/30 bg-warning/10 text-warning">3 active</Badge>
          </div>
          <div className="space-y-3">
            {controlPlaneAlerts.map((alert) => (
              <article key={alert.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/25">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{alert.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{alert.detail}</p>
                  </div>
                  <SeverityBadge severity={alert.severity} />
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs text-primary">
                  <Sparkles size={14} />
                  {alert.action}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="motion-card rounded-2xl border border-white/10 bg-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Gauge size={18} className="text-primary" />
              Provider SLA board
            </h2>
            <span className="text-xs text-muted-foreground">Uptime, latency, limits, and error pressure</span>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-white/[0.04] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">Provider</th>
                  <th className="px-4 py-3 font-medium">Uptime</th>
                  <th className="px-4 py-3 font-medium">p95</th>
                  <th className="px-4 py-3 font-medium">Rate limit</th>
                  <th className="px-4 py-3 font-medium">Error</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {providerUptimeSeries.map((provider) => (
                  <tr key={provider.provider} className="border-t border-white/[0.08] transition hover:bg-white/[0.035]">
                    <td className="px-4 py-3 font-medium">{provider.provider}</td>
                    <td className="px-4 py-3">
                      <div className="flex min-w-[130px] items-center gap-3">
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, provider.uptime)}%` }} />
                        </div>
                        <span>{provider.uptime}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">{provider.p95}ms</td>
                    <td className="px-4 py-3">{provider.rateLimit}%</td>
                    <td className="px-4 py-3">{provider.errorRate}%</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={provider.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      <section className="motion-card mt-5 rounded-2xl border border-white/10 bg-card p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Building2 size={18} className="text-primary" />
            Tenant workspaces
          </h2>
          <Badge>100+ managed users</Badge>
        </div>
        <div className="overflow-hidden rounded-2xl border border-white/10">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-white/[0.04] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Workspace</th>
                <th className="px-4 py-3 font-medium">Plan</th>
                <th className="px-4 py-3 font-medium">Users</th>
                <th className="px-4 py-3 font-medium">Routes</th>
                <th className="px-4 py-3 font-medium">Budget</th>
                <th className="px-4 py-3 font-medium">BYOK</th>
                <th className="px-4 py-3 font-medium">Risk</th>
                <th className="px-4 py-3 font-medium">Last active</th>
              </tr>
            </thead>
            <tbody>
              {tenantWorkspaces.map((tenant) => (
                <tr key={tenant.name} className="border-t border-white/[0.08] transition hover:bg-white/[0.035]">
                  <td className="px-4 py-3">
                    <div className="font-medium">{tenant.name}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{tenant.owner}</div>
                  </td>
                  <td className="px-4 py-3">{tenant.plan}</td>
                  <td className="px-4 py-3">{tenant.users}</td>
                  <td className="px-4 py-3">{tenant.monthlyRoutes.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex min-w-[150px] items-center gap-3">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                        <div
                          className={
                            tenant.risk === "high"
                              ? "h-full rounded-full bg-warning"
                              : "h-full rounded-full bg-primary"
                          }
                          style={{ width: `${tenant.budgetUsed}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">{tenant.budgetUsed}%</span>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">Cap {tenant.budgetCap}</div>
                  </td>
                  <td className="px-4 py-3">{tenant.byokStatus}</td>
                  <td className="px-4 py-3">
                    <RiskBadge risk={tenant.risk} />
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{tenant.lastActive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="motion-card mt-5 rounded-2xl border border-white/10 bg-card p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <DatabaseZap size={18} className="text-primary" />
            Routing audit trail
          </h2>
          <FilterBar intent={params.intent} status={params.status} model={params.model} />
        </div>

        <div className="grid gap-5 xl:grid-cols-[1fr_320px]">
          <div className="overflow-hidden rounded-2xl border border-white/10">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-white/[0.04] text-muted-foreground">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Query</th>
                  <th className="px-4 py-3 font-medium">Intent</th>
                  <th className="px-4 py-3 font-medium">Model</th>
                  <th className="px-4 py-3 font-medium">Latency</th>
                  <th className="px-4 py-3 font-medium">Saved</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Replay</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="border-t border-white/[0.08] transition hover:bg-white/[0.035]">
                    <td className="px-4 py-3 text-muted-foreground">{log.user}</td>
                    <td className="max-w-[260px] truncate px-4 py-3">{log.query}</td>
                    <td className="px-4 py-3">{log.intent}</td>
                    <td className="px-4 py-3">{log.routedTo}</td>
                    <td className="px-4 py-3">{log.latencyMs}ms</td>
                    <td className="px-4 py-3 text-primary">{log.savedPercent}%</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={log.status} />
                    </td>
                    <td className="px-4 py-3">
                      <Link href={`/logs/${log.id}`}>
                        <Button variant="secondary" size="sm">
                          Replay
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <aside className="route-scan rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-primary">Replay preview</p>
                <h3 className="mt-2 text-xl font-semibold">Explainable route ready</h3>
              </div>
              <Clock3 className="text-primary" size={22} />
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{selectedReplay.query}</p>
            <div className="mt-5 space-y-3 text-sm">
              <ReplayMetric label="Selected model" value={selectedReplay.routedTo} />
              <ReplayMetric label="Intent" value={selectedReplay.intent} />
              <ReplayMetric label="Latency" value={`${selectedReplay.latencyMs}ms`} />
              <ReplayMetric label="Estimated savings" value={`${selectedReplay.savedPercent}%`} />
            </div>
            <Link href={`/logs/${selectedReplay.id}`}>
              <Button className="mt-5 w-full gap-2">
                Open full replay
                <ArrowUpRight size={16} />
              </Button>
            </Link>
          </aside>
        </div>
      </section>
    </AppShell>
  );
}

function ReplayMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-background/55 px-3 py-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}

function OpsPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/15 px-4 py-3">
      <div className="flex items-center gap-2">
        <span className="breathing-dot h-2 w-2 rounded-full bg-primary text-primary" />
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="mt-2 text-lg font-semibold">{value}</div>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const className =
    severity === "high"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : severity === "medium"
        ? "border-warning/30 bg-warning/10 text-warning"
        : "border-primary/30 bg-primary/10 text-primary";

  return (
    <Badge className={className}>
      {severity}
    </Badge>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const className =
    risk === "high"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : risk === "medium"
        ? "border-warning/30 bg-warning/10 text-warning"
        : "border-primary/30 bg-primary/10 text-primary";

  return (
    <Badge className={className}>
      {risk}
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  const className =
    status === "fallback" || status === "degraded"
      ? "border-warning/30 bg-warning/10 text-warning"
      : status === "manual" || status === "watch"
        ? "border-white/20 bg-white/[0.06] text-muted-foreground"
        : "border-primary/30 bg-primary/10 text-primary";

  return (
    <Badge className={className}>
      {status}
    </Badge>
  );
}

function FilterBar({
  intent,
  status,
  model
}: {
  intent?: string;
  status?: string;
  model?: string;
}) {
  const filters = [
    {
      label: "Intent",
      key: "intent",
      value: intent ?? "all",
      options: ["all", "reasoning", "code", "search", "vision", "document"]
    },
    {
      label: "Status",
      key: "status",
      value: status ?? "all",
      options: ["all", "success", "fallback", "manual"]
    },
    {
      label: "Model",
      key: "model",
      value: model ?? "all",
      options: ["all", "Claude", "GPT", "Gemini", "DeepSeek", "Grok"]
    }
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Filter size={16} className="text-muted-foreground" />
      {filters.map((filter) => (
        <div key={filter.key} className="flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] p-1">
          <span className="px-2 text-xs text-muted-foreground">{filter.label}</span>
          {filter.options.map((option) => {
            const nextParams = new URLSearchParams();
            for (const item of filters) {
              const nextValue = item.key === filter.key ? option : item.value;
              if (nextValue !== "all") {
                nextParams.set(item.key, nextValue);
              }
            }
            const href = nextParams.toString() ? `/admin?${nextParams.toString()}` : "/admin";

            return (
              <Link
                key={option}
                href={href}
                className={
                  option === filter.value
                    ? "rounded px-2 py-1 text-xs font-medium bg-primary text-primary-foreground"
                    : "rounded px-2 py-1 text-xs text-muted-foreground hover:bg-white/[0.08] hover:text-foreground"
                }
              >
                {option}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
