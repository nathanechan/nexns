import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  FileSearch,
  GitBranch,
  KeyRound,
  LockKeyhole,
  Network,
  RadioTower,
  Route,
  ShieldCheck,
  Workflow,
  Zap
} from "lucide-react";
import { HeroDemo } from "@/components/site/hero-demo";
import { HomeSystems } from "@/components/site/home-systems";
import { SiteNav } from "@/components/site/nav";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getHomepageMetrics } from "@/lib/data/homepage-repository";

const operatingLayers = [
  {
    icon: Workflow,
    title: "Unified operations workspace",
    text: "A single place for chat, files, model comparison, route replay, team memory, and shared intelligence workflows."
  },
  {
    icon: Route,
    title: "Intelligent route engine",
    text: "Classifies intent, scores providers, applies policy, and chooses single or parallel execution for each request."
  },
  {
    icon: ShieldCheck,
    title: "Governance and policy",
    text: "Budget limits, sensitive-data boundaries, approved providers, fallback rules, and manual override logging."
  },
  {
    icon: BarChart3,
    title: "Cost and quality intelligence",
    text: "Tracks spend, avoided premium calls, latency, quality signals, fallback behavior, and report-ready savings."
  }
];

const workflow = [
  { step: "01", title: "Classify", text: "Detect task type, risk, file context, urgency, and freshness needs." },
  { step: "02", title: "Score", text: "Compare models on quality, speed, context length, cost, availability, and policy fit." },
  { step: "03", title: "Execute", text: "Stream the selected route or run parallel models for high-stakes decisions." },
  { step: "04", title: "Record", text: "Save route reasons, costs, fallback status, and replay data for governance." }
];

const trustControls = [
  { icon: KeyRound, label: "BYOK vault", value: "Encrypted provider keys" },
  { icon: LockKeyhole, label: "Policy guard", value: "Workspace-level controls" },
  { icon: RadioTower, label: "SLA monitor", value: "Provider health failover" },
  { icon: FileSearch, label: "Route replay", value: "Decision evidence trail" }
];

const roadmap = [
  "Usage metering from Supabase events",
  "Authenticated workspace and role enforcement",
  "Real provider execution with fallback chains",
  "Stripe plan limits and commercial controls",
  "Reliability, compliance, and incident operations"
];

const competitors = [
  ["Capability", "nexns", "Poe", "TypingMind", "Aymo"],
  ["Automatic model routing", "Yes", "Limited", "Manual", "Limited"],
  ["Parallel model comparison", "Yes", "Partial", "Partial", "Partial"],
  ["Cost governance", "Yes", "No", "No", "No"],
  ["BYOK policy controls", "Yes", "No", "Yes", "Varies"],
  ["Route replay and audit", "Yes", "No", "No", "No"]
];

export default async function HomePage() {
  const systemMetrics = await getHomepageMetrics();

  return (
    <>
      <SiteNav />
      <main>
        <HeroDemo />

        <section className="border-b border-white/10 bg-white/[0.03] py-14">
          <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-4">
            {systemMetrics.map((metric) => (
              <article key={metric.label} className="motion-card rounded-2xl border border-white/10 bg-card p-5">
                <div className="text-3xl font-semibold">{metric.value}</div>
                <p className="mt-2 text-sm text-muted-foreground">{metric.label}</p>
              </article>
            ))}
          </div>
        </section>

        <HomeSystems />

        <section className="py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
              <div>
                <p className="text-sm uppercase tracking-[0.26em] text-primary">Operating system for model usage</p>
                <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                  nexns turns fragmented model access into one governed operating layer.
                </h2>
                <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                  Teams should not need to manually choose between every model, provider, cost curve, file limit, and
                  policy rule. nexns handles the route decision, then gives operators a clear record of what happened.
                </p>
                <Link href="/workspace">
                  <Button className="mt-8 gap-2" variant="secondary">
                    Explore workspace controls
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {operatingLayers.map((item) => {
                  const Icon = item.icon;
                  return (
                    <article key={item.title} className="motion-card rounded-2xl border border-white/10 bg-card p-5">
                      <Icon className="text-primary" size={22} />
                      <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1.06fr_0.94fr]">
            <div className="route-scan rounded-3xl border border-white/10 bg-card p-5">
              <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">Route lifecycle</p>
                  <h2 className="mt-2 text-2xl font-semibold">From request to replay in one controlled path.</h2>
                </div>
                <Badge className="border-primary/30 bg-primary/10 text-primary">live route state</Badge>
              </div>
              <div className="mt-5 grid gap-3 md:grid-cols-4">
                {workflow.map((item) => (
                  <article key={item.step} className="rounded-2xl border border-white/10 bg-white/[0.045] p-4">
                    <div className="text-xs text-primary">{item.step}</div>
                    <h3 className="mt-3 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-muted-foreground">{item.text}</p>
                  </article>
                ))}
              </div>
              <div className="mt-5 flex items-center justify-center gap-3 text-sm text-muted-foreground">
                <GitBranch size={18} />
                classifier + provider registry + policy engine + usage ledger
              </div>
            </div>

            <div className="rounded-3xl border border-primary/20 bg-primary/[0.065] p-5">
              <p className="text-sm uppercase tracking-[0.24em] text-primary">Trust architecture</p>
              <h2 className="mt-3 text-2xl font-semibold">Built around security, evidence, and operational control.</h2>
              <div className="mt-5 grid gap-3">
                {trustControls.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-background/45 p-4">
                      <div className="flex items-center gap-3">
                        <span className="rounded-xl bg-primary/10 p-2 text-primary">
                          <Icon size={18} />
                        </span>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <span className="text-right text-sm text-muted-foreground">{item.value}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-accent">Market position</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                The wedge is not model access. It is controlled execution.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                Generic model workspaces give users a provider menu. nexns gives teams a system for deciding, executing,
                measuring, and governing AI usage across providers.
              </p>
            </div>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-card">
              <table className="w-full min-w-[720px] text-left text-sm">
                <tbody>
                  {competitors.map((row, index) => (
                    <tr key={row[0]} className={index === 0 ? "bg-white/[0.06]" : "border-t border-white/[0.08]"}>
                      {row.map((cell, cellIndex) => (
                        <td key={`${row[0]}-${cellIndex}`} className={cnCell(index, cellIndex)}>
                          {cell === "Yes" ? (
                            <span className="inline-flex items-center gap-1 text-primary">
                              <CheckCircle2 size={15} />
                              Yes
                            </span>
                          ) : (
                            cell
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-y border-white/10 bg-white/[0.03] py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.86fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-primary">Product roadmap</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                From premium UI to secure operating platform.
              </h2>
              <p className="mt-5 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                The next iterations should keep the interface polished while moving the product deeper into real
                routing execution, usage metering, billing controls, and workspace security.
              </p>
              <Link href="/dashboard">
                <Button className="mt-8 gap-2">
                  Open analytics dashboard
                  <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
            <div className="grid gap-3">
              {roadmap.map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card p-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="text-sm text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="route-scan rounded-3xl border border-primary/20 bg-primary/[0.08] p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[1fr_0.7fr] lg:items-center">
                <div>
                  <Badge className="border-primary/30 bg-primary/10 text-primary">
                    <Network size={14} className="mr-1" />
                    secure model operations
                  </Badge>
                  <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Start with routing. Grow into operational governance.</h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                    nexns is designed to become the control layer between teams, providers, policies, budgets, and
                    every model-powered workflow.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                  <Link href="/chat">
                    <Button size="lg" className="w-full gap-2 sm:w-auto">
                      Open workspace
                      <Zap size={17} />
                    </Button>
                  </Link>
                  <Link href="/settings/providers">
                    <Button size="lg" variant="secondary" className="w-full gap-2 sm:w-auto">
                      Configure BYOK
                      <ArrowRight size={17} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

function cnCell(rowIndex: number, cellIndex: number) {
  const base = "px-4 py-3";
  if (rowIndex === 0) return `${base} font-medium text-foreground`;
  if (cellIndex === 1) return `${base} font-medium text-primary`;
  return `${base} text-muted-foreground`;
}
