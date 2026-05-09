"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  KeyRound,
  LockKeyhole,
  RadioTower,
  ShieldCheck,
  Sparkles,
  Users,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { productGlossary } from "@/lib/i18n/product-glossary";

const routeProfiles = [
  {
    id: "executive",
    label: "Executive analysis",
    zh: "高管分析",
    intent: "reasoning + document",
    model: "Claude Sonnet",
    savings: "37%",
    confidence: 92,
    latency: "1.9s",
    policy: "BYOK + finance boundary"
  },
  {
    id: "engineering",
    label: "Engineering debugging",
    zh: "工程排障",
    intent: "code + tools",
    model: "GPT + DeepSeek",
    savings: "31%",
    confidence: 89,
    latency: "1.6s",
    policy: "code-safe provider set"
  },
  {
    id: "market",
    label: "Market intelligence",
    zh: "市场情报",
    intent: "freshness + synthesis",
    model: "Grok + Gemini",
    savings: "28%",
    confidence: 86,
    latency: "2.2s",
    policy: "freshness fallback chain"
  }
];

const providerHealth = [
  { provider: "Anthropic", status: "stable", p95: "1.18s", tone: "primary" },
  { provider: "OpenAI", status: "stable", p95: "1.04s", tone: "primary" },
  { provider: "Google", status: "watch", p95: "1.32s", tone: "warning" },
  { provider: "DeepSeek", status: "stable", p95: "0.98s", tone: "primary" },
  { provider: "xAI", status: "capped", p95: "1.49s", tone: "warning" }
];

const conversionSteps = [
  { icon: Users, title: "Create workspace", text: "Set up team access, members, quota, and project spaces.", href: "/workspace" },
  { icon: KeyRound, title: "Connect BYOK", text: "Add encrypted provider keys and define fallback coverage.", href: "/settings/providers" },
  { icon: Zap, title: "Run first route", text: "Send a high-value query and review the route decision replay.", href: "/chat" },
  { icon: BarChart3, title: "Track value", text: "Measure spend, quality, latency, and policy coverage.", href: "/dashboard" }
];

const readiness = [
  ["Workspace access", "Role-aware path prepared", "ready"],
  ["Provider keys", "Encrypted BYOK vault", "ready"],
  ["Usage ledger", "Supabase event model", "next"],
  ["Billing limits", "Stripe control path", "next"],
  ["Incident states", "Provider fallback telemetry", "next"]
];

const softEase = [0.16, 1, 0.3, 1] as const;

export function HomeSystems() {
  const [activeProfileId, setActiveProfileId] = useState(routeProfiles[0]!.id);
  const activeProfile = useMemo(
    () => routeProfiles.find((profile) => profile.id === activeProfileId) ?? routeProfiles[0]!,
    [activeProfileId]
  );

  return (
    <>
      <section className="border-y border-white/10 bg-white/[0.03] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-primary">Interactive route scoring</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
              Show the route decision before the answer is generated.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              V9.1 adds a more dynamic product feel: operators can see how task type changes model selection,
              confidence, latency, savings, and policy constraints.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {routeProfiles.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => setActiveProfileId(profile.id)}
                  className={cn(
                    "focus-ring rounded-2xl border px-4 py-2 text-left text-sm transition duration-300",
                    activeProfile.id === profile.id
                      ? "border-primary/40 bg-primary text-primary-foreground shadow-glow"
                      : "border-white/10 bg-white/[0.045] text-muted-foreground hover:border-primary/25 hover:text-foreground"
                  )}
                >
                  <span className="block font-medium">{profile.label}</span>
                  <span className="mt-1 block text-xs opacity-80">{profile.zh}</span>
                </button>
              ))}
            </div>
          </div>

          <motion.div
            key={activeProfile.id}
            initial={{ opacity: 0, y: 16, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45, ease: softEase }}
            className="route-scan rounded-3xl border border-primary/20 bg-primary/[0.065] p-5"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <Badge className="border-primary/30 bg-primary/10 text-primary">route preview</Badge>
                <h3 className="mt-3 text-2xl font-semibold">{activeProfile.model}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{activeProfile.intent}</p>
              </div>
              <Sparkles className="text-primary" size={24} />
            </div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <ScoreBlock label="Confidence" value={`${activeProfile.confidence}%`} progress={activeProfile.confidence} />
              <ScoreBlock label="Savings" value={activeProfile.savings} progress={Number(activeProfile.savings.replace("%", "")) * 2} />
              <ScoreBlock label="Latency" value={activeProfile.latency} progress={74} />
            </div>
            <div className="mt-5 rounded-2xl border border-white/10 bg-background/45 p-4">
              <div className="flex items-center gap-2 text-sm font-medium">
                <LockKeyhole size={16} className="text-primary" />
                {activeProfile.policy}
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                The selected route includes workspace policy, provider health, expected cost, fallback path, and replay metadata.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-card p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
              <div>
                <p className="text-sm uppercase tracking-[0.24em] text-primary">Provider health ticker</p>
                <h2 className="mt-2 text-2xl font-semibold">Live-looking SLA state for route decisions.</h2>
              </div>
              <Badge className="border-primary/30 bg-primary/10 text-primary">
                <span className="breathing-dot mr-2 h-2 w-2 rounded-full bg-primary text-primary" />
                monitored
              </Badge>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-5">
              {providerHealth.map((item, index) => (
                <motion.div
                  key={item.provider}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.05, duration: 0.36, ease: softEase }}
                  className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-medium">{item.provider}</span>
                    <span
                      className={cn(
                        "breathing-dot h-2.5 w-2.5 rounded-full",
                        item.tone === "warning" ? "bg-warning text-warning" : "bg-primary text-primary"
                      )}
                    />
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">{item.status}</p>
                  <p className="mt-1 text-xs text-muted-foreground">p95 {item.p95}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div>
              <p className="text-sm uppercase tracking-[0.26em] text-accent">Bilingual product language</p>
              <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
                Professional English and Chinese terms for a serious operating platform.
              </h2>
              <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
                V9.2 starts a consistent product glossary so the interface can scale cleanly across English and Chinese
                without sounding like a prototype or a pitch page.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              {productGlossary.map((term, index) => (
                <motion.article
                  key={term.key}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ delay: index * 0.05, ease: softEase }}
                  className="motion-card rounded-2xl border border-white/10 bg-card p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold">{term.en}</h3>
                    <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary">
                      {term.zh}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{term.description}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03] py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.26em] text-primary">Conversion path</p>
            <h2 className="mt-4 text-3xl font-semibold sm:text-5xl">
              Move from homepage to governed operation in four steps.
            </h2>
            <p className="mt-5 text-sm leading-7 text-muted-foreground sm:text-base">
              V9.3 makes the homepage lead naturally into setup: workspace, provider keys, first route, and value tracking.
            </p>
            <div className="mt-8 grid gap-3 md:grid-cols-2">
              {conversionSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <Link key={step.title} href={step.href}>
                    <motion.article
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{ delay: index * 0.06, ease: softEase }}
                      className="motion-card h-full rounded-2xl border border-white/10 bg-card p-5"
                    >
                      <Icon className="text-primary" size={22} />
                      <h3 className="mt-4 font-semibold">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{step.text}</p>
                    </motion.article>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-primary/20 bg-primary/[0.065] p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Security readiness</p>
            <h2 className="mt-3 text-2xl font-semibold">V9.5 operating platform checklist.</h2>
            <div className="mt-5 space-y-3">
              {readiness.map(([label, detail, status]) => (
                <div key={label} className="flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-background/45 p-4">
                  <div className="flex items-center gap-3">
                    {status === "ready" ? (
                      <CheckCircle2 size={18} className="text-primary" />
                    ) : (
                      <ShieldCheck size={18} className="text-muted-foreground" />
                    )}
                    <div>
                      <p className="font-medium">{label}</p>
                      <p className="mt-1 text-xs text-muted-foreground">{detail}</p>
                    </div>
                  </div>
                  <Badge
                    className={
                      status === "ready"
                        ? "border-primary/30 bg-primary/10 text-primary"
                        : "border-white/20 bg-white/[0.06] text-muted-foreground"
                    }
                  >
                    {status}
                  </Badge>
                </div>
              ))}
            </div>
            <Link href="/settings/policy">
              <Button className="mt-5 w-full gap-2" variant="secondary">
                Review policy center
                <ArrowRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ScoreBlock({ label, value, progress }: { label: string; value: string; progress: number }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-background/45 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(progress, 100)}%` }}
          transition={{ duration: 0.72, ease: softEase }}
        />
      </div>
    </div>
  );
}
