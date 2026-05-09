"use client";

import type React from "react";
import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  Cpu,
  Gauge,
  GitCompareArrows,
  Network,
  Route,
  ShieldCheck,
  Sparkles,
  Zap
} from "lucide-react";
import type { RouteDecision } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn, formatCurrency } from "@/lib/utils";

const emptyStages = [
  { label: "Understand intent", value: 26, detail: "Waiting for query" },
  { label: "Score models", value: 18, detail: "Reading provider registry" },
  { label: "Balance cost", value: 12, detail: "Budget policy ready" },
  { label: "Select route", value: 8, detail: "Fallback prepared" }
];

const softEase = [0.16, 1, 0.3, 1] as const;

export function RoutingPanel({
  decision,
  isRouting
}: {
  decision?: RouteDecision;
  isRouting?: boolean;
}) {
  const stages = decision
    ? [
        { label: "Understand intent", value: decision.confidence, detail: `${decision.intent} / ${decision.confidence}%` },
        { label: "Score models", value: Math.round(decision.primary.score), detail: decision.primary.model.name },
        { label: "Balance cost", value: Math.max(12, decision.expectedSavings), detail: `Save ${decision.expectedSavings}%` },
        { label: "Select route", value: decision.primary.confidence, detail: `fallback: ${decision.fallbackModelId}` }
      ]
    : emptyStages;

  return (
    <aside className="glass-panel route-scan rounded-2xl p-4 shadow-panel">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Routing engine</p>
          <h2 className="mt-1 flex items-center gap-2 text-lg font-semibold">
            <Route size={18} className="text-primary" />
            Live route decision
          </h2>
        </div>
        <Badge className={cn(isRouting && "border-primary/30 bg-primary/10 text-primary")}>
          {isRouting ? "scoring" : decision ? `${decision.confidence}% confidence` : "standby"}
        </Badge>
      </div>

      <div className="mt-5 space-y-3">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, ease: softEase }}
            className={cn(
              "rounded-2xl border border-white/10 bg-white/[0.04] p-3 transition duration-300",
              isRouting && "route-scan border-primary/20 bg-primary/[0.055]"
            )}
          >
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="flex items-center gap-2">
                {decision || isRouting ? (
                  <CheckCircle2 size={15} className="text-primary" />
                ) : (
                  <CircleDot size={15} className="text-muted-foreground" />
                )}
                {stage.label}
              </span>
              <span className="text-xs text-muted-foreground">{stage.detail}</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={cn("h-full rounded-full bg-primary", isRouting && index === stages.length - 1 && "animate-pulseTrack")}
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(8, stage.value))}%` }}
                transition={{ duration: 0.7, delay: 0.08 * index }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {decision ? (
        <div className="mt-5 space-y-4">
          <RouteGraph decision={decision} />
          <section className="route-scan rounded-2xl border border-primary/20 bg-primary/10 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.22em] text-primary">Winner</p>
                <h3 className="mt-2 text-xl font-semibold">{decision.primary.model.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {decision.primary.model.provider} / {decision.intent}
                </p>
              </div>
              <ArrowUpRight className="text-primary" size={20} />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
              <Metric icon={Gauge} label="Latency" value={`${decision.primary.estimatedLatencyMs}ms`} />
              <Metric icon={Zap} label="Cost" value={formatCurrency(decision.primary.estimatedCost)} />
              <Metric icon={Activity} label="Save" value={`${decision.expectedSavings}%`} />
            </div>
          </section>

          <section>
            <h3 className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <GitCompareArrows size={15} />
              Candidate scores
            </h3>
            <div className="mt-3 space-y-2">
              {decision.parallel.map((candidate, index) => (
                <motion.div
                  key={candidate.model.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className={cn(
                    "rounded-2xl border p-3 transition duration-300 hover:-translate-y-0.5",
                    candidate.model.id === decision.primary.model.id
                      ? "border-primary/30 bg-primary/10"
                      : "border-white/10 bg-white/[0.04]"
                  )}
                >
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="flex items-center gap-2">
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: candidate.model.color }}
                      />
                      {candidate.model.name}
                    </span>
                    <span className="text-muted-foreground">{Math.round(candidate.score)}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${Math.min(100, candidate.score)}%`,
                        backgroundColor: candidate.model.color
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
            <h3 className="flex items-center gap-2 text-sm font-medium">
              <ShieldCheck size={15} className="text-primary" />
              Why this route won
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {decision.primary.reasons.map((reason) => (
                <li key={reason}>- {reason}</li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-muted-foreground">
          Ask a question to see intent detection, model scoring, cost and latency tradeoffs, the winning route, and fallback policy.
        </div>
      )}
    </aside>
  );
}

function RouteGraph({ decision }: { decision: RouteDecision }) {
  const nodes = [
    { label: "Query", value: decision.intent },
    { label: "Classifier", value: `${decision.confidence}%` },
    { label: "Winner", value: decision.primary.model.name },
    { label: "Fallback", value: decision.fallbackModelId }
  ];

  return (
    <section className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <h3 className="flex items-center gap-2 text-sm font-medium">
        <Network size={15} className="text-primary" />
        Route graph
      </h3>
      <div className="mt-4 grid gap-2">
        {nodes.map((node, index) => (
          <div key={node.label} className="grid grid-cols-[1fr_28px_1.15fr] items-center gap-2 text-xs">
            <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
              <p className="text-muted-foreground">{node.label}</p>
              <p className="mt-1 truncate font-medium">{node.value}</p>
            </div>
            <div className="flex justify-center text-primary">{index < nodes.length - 1 ? "->" : ""}</div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${Math.max(18, 92 - index * 12)}%` }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Metric({
  icon: Icon,
  label,
  value
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-2">
      <Icon size={14} className="text-primary" />
      <p className="mt-2 text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

export function MiniRoutingScorecard({ decision }: { decision?: RouteDecision }) {
  const items = decision?.trace ?? [
    { label: "intent", value: 0 },
    { label: "quality", value: 0 },
    { label: "speed", value: 0 },
    { label: "savings", value: 0 }
  ];

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 bg-card p-4">
      <h3 className="flex items-center gap-2 text-sm font-medium">
        <Sparkles size={15} className="text-primary" />
        Routing scorecard
      </h3>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between text-xs text-muted-foreground">
              <span className="capitalize">{item.label}</span>
              <span>{item.value}</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, item.value)}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
      <ProviderMiniMap />
      <RadarBars decision={decision} />
    </div>
  );
}

function ProviderMiniMap() {
  const providers = [
    ["Anthropic", "healthy", 34],
    ["OpenAI", "healthy", 27],
    ["Google", "healthy", 18],
    ["DeepSeek", "healthy", 14],
    ["xAI", "degraded", 7]
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-4">
      <h3 className="flex items-center gap-2 text-sm font-medium">
        <Cpu size={15} className="text-primary" />
        Provider health
      </h3>
      <div className="mt-4 space-y-2">
        {providers.map(([name, status, share]) => (
          <div key={name} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] p-2 text-xs">
            <span className="flex items-center gap-2">
              <span
                className={cn(
                  "breathing-dot h-2 w-2 rounded-full",
                  status === "healthy" ? "bg-success text-success" : "bg-warning text-warning"
                )}
              />
              {name}
            </span>
            <span className="text-muted-foreground">{share}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function RadarBars({ decision }: { decision?: RouteDecision }) {
  const model = decision?.primary.model;
  const bars = [
    ["Quality", model?.quality ?? 0],
    ["Speed", model?.speed ?? 0],
    ["Cost fit", model?.cost ?? 0],
    ["Confidence", decision?.confidence ?? 0]
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-card p-4">
      <h3 className="text-sm font-medium">Model radar</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {bars.map(([label, value]) => (
          <div key={label} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
            <div className="text-xs text-muted-foreground">{label}</div>
            <div className="mt-2 text-lg font-semibold">{value}</div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-primary" style={{ width: `${value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
