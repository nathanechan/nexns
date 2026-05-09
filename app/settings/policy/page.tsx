import Link from "next/link";
import {
  ArrowRight,
  Ban,
  CheckCircle2,
  FileWarning,
  Gauge,
  GitBranch,
  KeyRound,
  Lock,
  Route,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles
} from "lucide-react";
import {
  approvalQueue,
  policyControls,
  policySimulation,
  providerVaultMetrics
} from "@/lib/demo-data";
import { AppShell } from "@/components/app-shell/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const defaultPolicies = [
  { label: "Default priority", value: "Balanced", detail: "Quality, speed, and cost are weighted together." },
  { label: "Daily budget cap", value: "$180", detail: "Routes downgrade automatically after cap pressure." },
  { label: "Max parallel models", value: "3", detail: "Prevents runaway spend during comparison mode." },
  { label: "Fallback provider", value: "OpenRouter Auto", detail: "Used when provider health drops or keys fail." }
];

const guardrails = [
  {
    title: "Sensitive data restriction",
    icon: Lock,
    description: "Keep legal, health, and PII-marked prompts inside approved provider and BYOK boundaries."
  },
  {
    title: "Disable degraded providers",
    icon: Ban,
    description: "Automatically downweight models when latency, rate limits, or error rates cross thresholds."
  },
  {
    title: "Budget pressure downgrade",
    icon: Gauge,
    description: "After 80% monthly usage, non-critical routes prefer lower-cost capable models."
  },
  {
    title: "Manual override audit",
    icon: ShieldCheck,
    description: "Record every override with cost delta, latency delta, and policy reason."
  }
];

const modelTiers = [
  { tier: "Critical", models: "Claude 4 Sonnet, GPT-4.1", rule: "Quality-first with approved fallback" },
  { tier: "Standard", models: "Gemini 2.5 Pro, DeepSeek R1", rule: "Balanced quality, speed, and cost" },
  { tier: "Savings", models: "DeepSeek R1, OpenRouter Auto", rule: "Cost-first for low-risk requests" }
];

export default function PolicyEnginePage() {
  return (
    <AppShell
      title="Policy Center"
      description="Govern model selection, budgets, sensitive data, fallbacks, and approvals from one routing policy layer."
      actions={
        <Link href="/settings/providers">
          <Button variant="secondary" className="gap-2">
            Provider vault
            <KeyRound size={16} />
          </Button>
        </Link>
      }
    >
      <section className="mt-6 overflow-hidden rounded-lg border border-white/10 bg-card">
        <div className="grid gap-0 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="relative p-6 sm:p-8">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(20,184,166,0.18),transparent_32%),linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%)]" />
            <div className="relative">
              <Badge className="border-primary/30 bg-primary/10 text-primary">V6.5 governance layer</Badge>
              <SlidersHorizontal className="mt-6 text-primary" size={30} />
              <h1 className="mt-5 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Route every prompt through business policy, not just model preference.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Budget caps, sensitive data rules, BYOK boundaries, fallback chains, and human approvals become first-class
                controls around the AI routing engine.
              </p>
              <div className="mt-7 grid gap-3 sm:grid-cols-2">
                {providerVaultMetrics.map((metric) => (
                  <article key={metric.label} className="rounded-lg border border-white/10 bg-background/55 p-4 backdrop-blur">
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
                <GitBranch size={18} className="text-primary" />
                Policy simulation
              </h2>
              <Badge>board packet route</Badge>
            </div>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{policySimulation.query}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {policySimulation.detectedSignals.map((signal) => (
                <Badge key={signal} className="border-white/15 bg-white/[0.06] text-muted-foreground">
                  {signal}
                </Badge>
              ))}
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <SimulationCard title="Without policy" data={policySimulation.withoutPolicy} tone="muted" />
              <SimulationCard title="With policy" data={policySimulation.withPolicy} tone="primary" />
            </div>
          </div>
        </div>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <section className="motion-card rounded-lg border border-white/10 bg-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <Route size={18} className="text-primary" />
              Routing defaults
            </h2>
            <Badge className="border-primary/30 bg-primary/10 text-primary">workspace template</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {defaultPolicies.map((policy) => (
              <article key={policy.label} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <p className="text-sm text-muted-foreground">{policy.label}</p>
                <div className="mt-2 text-xl font-semibold">{policy.value}</div>
                <p className="mt-2 text-xs leading-5 text-muted-foreground">{policy.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="motion-card rounded-lg border border-white/10 bg-card p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <FileWarning size={18} className="text-primary" />
              Active guardrails
            </h2>
            <Badge className="border-primary/30 bg-primary/10 text-primary">4 enabled</Badge>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {guardrails.map((rule) => {
              const Icon = rule.icon;

              return (
                <article key={rule.title} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <Icon size={18} className="text-primary" />
                    <Badge className="border-primary/30 bg-primary/10 text-primary">enabled</Badge>
                  </div>
                  <h3 className="mt-4 font-semibold">{rule.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{rule.description}</p>
                </article>
              );
            })}
          </div>
        </section>
      </div>

      <section className="motion-card mt-5 rounded-lg border border-white/10 bg-card p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles size={18} className="text-primary" />
            Policy control matrix
          </h2>
          <Button variant="secondary" size="sm">Create policy</Button>
        </div>
        <div className="overflow-hidden rounded-lg border border-white/10">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-white/[0.04] text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">Policy</th>
                <th className="px-4 py-3 font-medium">Scope</th>
                <th className="px-4 py-3 font-medium">Trigger</th>
                <th className="px-4 py-3 font-medium">Action</th>
                <th className="px-4 py-3 font-medium">Impact</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {policyControls.map((policy) => (
                <tr key={policy.name} className="border-t border-white/[0.08]">
                  <td className="px-4 py-3 font-medium">{policy.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{policy.scope}</td>
                  <td className="px-4 py-3">{policy.trigger}</td>
                  <td className="px-4 py-3 text-muted-foreground">{policy.action}</td>
                  <td className="px-4 py-3 text-primary">{policy.impact}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={policy.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <section className="rounded-lg border border-white/10 bg-card p-5">
          <h2 className="text-lg font-semibold">Budget and model controls</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <Field label="Daily budget cap" value="$180" />
            <Field label="Downgrade threshold" value="80%" />
            <Field label="Approval threshold" value="$260/day" />
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {modelTiers.map((tier) => (
              <article key={tier.tier} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-semibold">{tier.tier}</h3>
                  <CheckCircle2 size={16} className="text-primary" />
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{tier.models}</p>
                <p className="mt-3 text-xs leading-5 text-muted-foreground">{tier.rule}</p>
              </article>
            ))}
          </div>
          <Button className="mt-5 w-full">Save policy changes</Button>
        </section>

        <section className="rounded-lg border border-white/10 bg-card p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-lg font-semibold">Approval queue</h2>
            <Badge className="border-warning/30 bg-warning/10 text-warning">{approvalQueue.length} pending</Badge>
          </div>
          <div className="mt-5 space-y-3">
            {approvalQueue.map((item) => (
              <article key={item.request} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-medium">{item.request}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">{item.owner} · {item.age}</p>
                  </div>
                  <RiskBadge risk={item.risk} />
                </div>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.reason}</p>
                <Button variant="ghost" size="sm" className="mt-3 gap-2">
                  Review request
                  <ArrowRight size={14} />
                </Button>
              </article>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}

function SimulationCard({
  title,
  data,
  tone
}: {
  title: string;
  data: { model: string; cost: string; latency: string; risk: string };
  tone: "muted" | "primary";
}) {
  return (
    <article
      className={
        tone === "primary"
          ? "rounded-lg border border-primary/25 bg-primary/10 p-4"
          : "rounded-lg border border-white/10 bg-background/55 p-4"
      }
    >
      <p className={tone === "primary" ? "text-sm text-primary" : "text-sm text-muted-foreground"}>{title}</p>
      <h3 className="mt-2 font-semibold">{data.model}</h3>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-md border border-white/10 bg-black/15 p-3">
          <span className="text-muted-foreground">Cost</span>
          <div className="mt-1 font-medium">{data.cost}</div>
        </div>
        <div className="rounded-md border border-white/10 bg-black/15 p-3">
          <span className="text-muted-foreground">Latency</span>
          <div className="mt-1 font-medium">{data.latency}</div>
        </div>
      </div>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">{data.risk}</p>
    </article>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-sm text-muted-foreground" htmlFor={label}>
        {label}
      </label>
      <Input id={label} defaultValue={value} className="mt-2" />
    </div>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const className =
    risk === "high"
      ? "border-red-500/30 bg-red-500/10 text-red-300"
      : risk === "medium"
        ? "border-warning/30 bg-warning/10 text-warning"
        : "border-primary/30 bg-primary/10 text-primary";

  return <Badge className={className}>{risk}</Badge>;
}

function StatusBadge({ status }: { status: string }) {
  const className =
    status === "draft"
      ? "border-white/20 bg-white/[0.06] text-muted-foreground"
      : "border-primary/30 bg-primary/10 text-primary";

  return <Badge className={className}>{status}</Badge>;
}
