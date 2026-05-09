"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Gauge,
  KeyRound,
  LineChart,
  LockKeyhole,
  Route,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const routeSteps = [
  { label: "Intent", value: "Reasoning + sensitive document", progress: 92 },
  { label: "Policy", value: "BYOK + finance boundary", progress: 89 },
  { label: "Cost", value: "37% lower expected spend", progress: 86 },
  { label: "Fallback", value: "Gemini + OpenRouter safety path", progress: 78 }
];

const metrics = [
  ["92%", "route confidence"],
  ["35%", "average savings"],
  ["99.2%", "audit coverage"]
];

const operatingSignals = [
  { label: "Provider health", value: "Stable", icon: ShieldCheck },
  { label: "Key policy", value: "BYOK enforced", icon: KeyRound },
  { label: "Execution", value: "Streaming", icon: Zap }
];

export function HeroDemo() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="pb-8"
        >
          <Badge className="border-primary/30 bg-primary/10 text-primary">
            nexns / model operations platform
          </Badge>
          <h1 className="mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[1.02] tracking-normal sm:text-7xl">
            Govern every request before it reaches a model.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            nexns gives teams one intelligent layer for model routing, BYOK control, policy enforcement, cost tracking,
            provider fallback, and audit-ready reporting across the fast-moving model stack.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/chat">
              <Button size="lg" className="w-full sm:w-auto">
                Open routing workspace <ArrowRight size={18} />
              </Button>
            </Link>
            <Link href="/share">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                View report center
              </Button>
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-3 text-sm">
            {metrics.map(([value, label]) => (
              <div key={label} className="border-l border-white/[0.12] pl-4">
                <div className="text-2xl font-semibold">{value}</div>
                <div className="mt-1 text-muted-foreground">{label}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2 text-xs text-muted-foreground">
            {["OpenAI", "Anthropic", "Google", "xAI", "DeepSeek", "OpenRouter"].map((provider) => (
              <span key={provider} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1.5">
                {provider}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.985 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="glass-panel route-scan relative rounded-3xl p-4 shadow-panel"
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <p className="text-sm text-muted-foreground">Route operation center</p>
              <h2 className="mt-1 text-xl font-semibold">Executive risk analysis</h2>
            </div>
            <Badge className="border-primary/30 bg-primary/10 text-primary">
              <span className="breathing-dot mr-2 h-2 w-2 rounded-full bg-primary text-primary" />
              scoring
            </Badge>
          </div>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-sm text-muted-foreground">User asks</p>
            <p className="mt-2 text-base">
              Analyze this board packet, identify operating risks, and prepare an executive action brief.
            </p>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {operatingSignals.map((signal) => {
              const Icon = signal.icon;
              return (
                <div key={signal.label} className="rounded-2xl border border-white/10 bg-white/[0.045] p-3">
                  <Icon className="text-primary" size={17} />
                  <p className="mt-3 text-xs text-muted-foreground">{signal.label}</p>
                  <p className="mt-1 text-sm font-medium">{signal.value}</p>
                </div>
              );
            })}
          </div>

          <div className="mt-5 space-y-3">
            {routeSteps.map((step, index) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
              >
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    {index === 0 ? <Brain size={15} /> : index === 1 ? <Route size={15} /> : index === 2 ? <Gauge size={15} /> : <ShieldCheck size={15} />}
                    {step.label}
                  </span>
                  <span>{step.value}</span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className="h-full rounded-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${step.progress}%` }}
                    transition={{ duration: 0.9, delay: 0.2 + index * 0.08 }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {["Claude reasoning", "Grok freshness", "Gemini vision"].map((label) => (
              <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.05] p-3 text-sm">
                <LineChart className="mb-3 text-primary" size={17} />
                {label}
              </div>
            ))}
          </div>
          <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_0.82fr]">
            <div className="flex items-center gap-2 rounded-2xl border border-primary/20 bg-primary/10 p-3 text-sm text-primary">
              <Sparkles size={16} />
              Recommended: Claude for reasoning, Gemini fallback, OpenRouter safety net.
            </div>
            <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.045] p-3 text-sm">
              <CheckCircle2 size={16} className="text-primary" />
              Audit event recorded
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 p-3 text-xs text-muted-foreground">
            <LockKeyhole size={15} className="text-primary" />
            Workspace policy, provider key, route score, fallback chain, and cost estimate are attached to the replay.
          </div>
        </motion.div>
      </div>
    </section>
  );
}
