"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Download,
  Gauge,
  ShieldCheck,
  Target,
  TrendingDown
} from "lucide-react";
import { motion } from "framer-motion";
import {
  anomalyInsights,
  beforeAfterMetrics,
  businessMetrics,
  manualVsAuto,
  modelDistribution,
  performanceSeries,
  providerComparison,
  savingsReport,
  timeRangeMetrics
} from "@/lib/demo-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

const icons = [DollarSign, TrendingDown, Clock, ShieldCheck, Target];
const softEase = [0.16, 1, 0.3, 1] as const;

export function MetricsDashboard() {
  return (
    <div className="space-y-5">
      <ExecutivePulse />
      <TimeRangeHeader />

      <section className="motion-card route-scan rounded-2xl border border-primary/20 bg-primary/10 p-5">
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-primary">CFO-ready ROI</p>
            <h2 className="mt-3 text-3xl font-semibold">Saved $2,228 in model spend this month</h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
              nexns turns model choice from guesswork into policy. It avoids unnecessary premium calls,
              preserves answer quality, and records cost, latency, fallback behavior, and manual override impact.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {[
              ["42%", "Spend reduction"],
              ["31%", "Latency reduction"],
              ["22 pts", "High-cost misuse down"]
            ].map(([value, label]) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, ease: softEase }}
                className="rounded-2xl border border-white/10 bg-black/20 p-4"
              >
                <div className="text-2xl font-semibold">{value}</div>
                <p className="mt-1 text-sm text-muted-foreground">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {businessMetrics.map((metric, index) => {
          const Icon = icons[index] ?? Activity;
          return (
            <motion.article
              key={metric.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4, ease: softEase }}
              className="motion-card rounded-2xl border border-white/10 bg-card p-5"
            >
              <div className="flex items-center justify-between">
                <Icon className="text-primary" size={20} />
                <span className="text-sm text-success">{metric.delta}</span>
              </div>
              <div className="mt-5 text-2xl font-semibold">{metric.value}</div>
              <p className="mt-1 text-sm text-foreground">{metric.label}</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{metric.description}</p>
            </motion.article>
          );
        })}
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
        <SpendAvoidedChart />
        <InsightsPanel />
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.88fr_1.12fr]">
        <ModelDistributionPanel />
        <ProviderComparisonTable />
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <ManualVsAutoPanel />
        <BeforeAfterPanel />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <LatencySavingsChart />
        <SavingsReportPanel />
      </div>
    </div>
  );
}

function ExecutivePulse() {
  const items = [
    { label: "Routes optimized", value: "24.8k", width: 86, tone: "primary" },
    { label: "Savings captured", value: "$2.2k", width: 78, tone: "primary" },
    { label: "Fallbacks handled", value: "3.8%", width: 42, tone: "warning" },
    { label: "Audit coverage", value: "99.2%", width: 96, tone: "primary" }
  ];

  return (
    <section className="route-scan rounded-2xl border border-white/10 bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-primary">Live business pulse</p>
          <h2 className="mt-1 text-xl font-semibold">Cost, quality, and reliability in one operating loop</h2>
        </div>
        <Badge className="border-primary/30 bg-primary/10 text-primary">
          <span className="breathing-dot mr-2 h-2 w-2 rounded-full bg-primary text-primary" />
          live telemetry
        </Badge>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {items.map((item, index) => (
          <motion.article
            key={item.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, ease: softEase }}
            className="rounded-2xl border border-white/10 bg-white/[0.045] p-4"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-muted-foreground">{item.label}</span>
              <span
                className={
                  item.tone === "warning"
                    ? "breathing-dot h-2 w-2 rounded-full bg-warning text-warning"
                    : "breathing-dot h-2 w-2 rounded-full bg-primary text-primary"
                }
              />
            </div>
            <div className="mt-3 text-2xl font-semibold">{item.value}</div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${item.width}%` }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function TimeRangeHeader() {
  return (
    <section className="rounded-2xl border border-white/10 bg-card p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Analytics range</h2>
          <p className="text-sm text-muted-foreground">Switch the executive view across billing, quality, and reliability windows.</p>
        </div>
        <Button variant="secondary" size="sm">
          <Download size={16} />
          Export savings report
        </Button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-4">
        {timeRangeMetrics.map((range) => (
          <motion.article
            key={range.label}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{range.label}</span>
              {range.label === "30D" ? <Badge className="border-primary/30 bg-primary/10 text-primary">active</Badge> : null}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <MiniMetric label="Spend" value={range.spend} />
              <MiniMetric label="Avoided" value={range.avoided} />
              <MiniMetric label="Routes" value={range.routes} />
              <MiniMetric label="Quality" value={range.quality} />
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function SpendAvoidedChart() {
  return (
    <section className="motion-card rounded-2xl border border-white/10 bg-card p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Model spend avoided</h2>
          <p className="text-sm text-muted-foreground">Actual spend and avoided cost by day</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Avoided $2,228</span>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={performanceSeries}>
            <defs>
              <linearGradient id="spend" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="avoided" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.36} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.55)" />
            <YAxis stroke="rgba(255,255,255,0.55)" />
            <Tooltip contentStyle={tooltipStyle} />
            <Area type="monotone" dataKey="spend" name="Actual spend" stroke="#14b8a6" fill="url(#spend)" />
            <Area type="monotone" dataKey="avoided" name="Avoided cost" stroke="#f59e0b" fill="url(#avoided)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function InsightsPanel() {
  return (
    <section className="motion-card rounded-2xl border border-white/10 bg-card p-5">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <AlertTriangle size={18} className="text-primary" />
        Anomaly insights
      </h2>
      <p className="text-sm text-muted-foreground">Signals the operator should act on.</p>
      <div className="mt-5 space-y-3">
        {anomalyInsights.map((insight) => (
          <motion.article
            key={insight.title}
            whileHover={{ x: 4 }}
            className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold">{insight.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{insight.detail}</p>
              </div>
              <SeverityBadge severity={insight.severity} />
            </div>
            <Button className="mt-4" variant="secondary" size="sm">
              {insight.action}
            </Button>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

function ModelDistributionPanel() {
  return (
    <section className="motion-card rounded-2xl border border-white/10 bg-card p-5">
      <h2 className="text-lg font-semibold">Model routing distribution</h2>
      <p className="text-sm text-muted-foreground">Share of team queries by selected provider</p>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={modelDistribution} dataKey="value" innerRadius={62} outerRadius={100} paddingAngle={4}>
              {modelDistribution.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        {modelDistribution.map((item) => (
          <div key={item.name} className="flex items-center gap-2 text-muted-foreground">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.fill }} />
            {item.name} {item.value}%
          </div>
        ))}
      </div>
    </section>
  );
}

function ProviderComparisonTable() {
  return (
    <section className="motion-card rounded-2xl border border-white/10 bg-card p-5">
      <h2 className="text-lg font-semibold">Provider comparison</h2>
      <p className="text-sm text-muted-foreground">Spend, quality, reliability, and p95 latency by provider.</p>
      <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/[0.04] text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Provider</th>
              <th className="px-4 py-3 font-medium">Routes</th>
              <th className="px-4 py-3 font-medium">Spend</th>
              <th className="px-4 py-3 font-medium">Avoided</th>
              <th className="px-4 py-3 font-medium">p95</th>
              <th className="px-4 py-3 font-medium">Quality</th>
              <th className="px-4 py-3 font-medium">Error</th>
            </tr>
          </thead>
          <tbody>
            {providerComparison.map((row) => (
              <tr key={row.provider} className="border-t border-white/[0.08]">
                <td className="px-4 py-3 font-medium">{row.provider}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.routes.toLocaleString()}</td>
                <td className="px-4 py-3">{formatCurrency(row.spend)}</td>
                <td className="px-4 py-3 text-primary">{formatCurrency(row.avoided)}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.p95}ms</td>
                <td className="px-4 py-3">{row.quality}</td>
                <td className={row.error > 3 ? "px-4 py-3 text-warning" : "px-4 py-3 text-muted-foreground"}>{row.error}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ManualVsAutoPanel() {
  return (
    <section className="motion-card rounded-2xl border border-white/10 bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Manual vs Auto</h2>
          <p className="text-sm text-muted-foreground">Measured impact of policy-based routing</p>
        </div>
        <span className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
          Saved {manualVsAuto.savingsPercent}%
        </span>
      </div>
      <p className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 text-sm text-muted-foreground">
        Query: {manualVsAuto.query}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <ComparisonCard title="Manual pick" tone="muted" data={manualVsAuto.manual} />
        <ComparisonCard title="nexns auto" tone="primary" data={manualVsAuto.auto} />
      </div>
    </section>
  );
}

function ComparisonCard({
  title,
  tone,
  data
}: {
  title: string;
  tone: "muted" | "primary";
  data: { model: string; cost: number; latencyMs: number; quality: number; risk: string };
}) {
  return (
    <article
      className={
        tone === "primary"
          ? "rounded-2xl border border-primary/30 bg-primary/10 p-4"
          : "rounded-2xl border border-white/10 bg-white/[0.04] p-4"
      }
    >
      <p className={tone === "primary" ? "text-sm text-primary" : "text-sm text-muted-foreground"}>{title}</p>
      <h3 className="mt-2 text-lg font-semibold">{data.model}</h3>
      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <SmallMetric label="Cost" value={formatCurrency(data.cost)} />
        <SmallMetric label="Latency" value={`${data.latencyMs}ms`} />
        <SmallMetric label="Quality" value={`${data.quality}`} />
      </div>
      <p className="mt-4 text-xs leading-5 text-muted-foreground">{data.risk}</p>
    </article>
  );
}

function BeforeAfterPanel() {
  return (
    <section className="motion-card rounded-2xl border border-white/10 bg-card p-5">
      <h2 className="flex items-center gap-2 text-lg font-semibold">
        <Gauge size={18} className="text-primary" />
        Before / After nexns
      </h2>
      <p className="text-sm text-muted-foreground">Operational baseline compared with routed execution</p>
      <div className="mt-5 space-y-4">
        {beforeAfterMetrics.map((item) => {
          const max = Math.max(item.before, item.after);
          return (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>{item.label}</span>
                <span className="text-primary">
                  {Math.round(((item.before - item.after) / item.before) * 100)}% better
                </span>
              </div>
              <div className="grid gap-2">
                <ProgressRow label="Before" value={item.before} max={max} color="#f59e0b" />
                <ProgressRow label="After" value={item.after} max={max} color="#14b8a6" />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function LatencySavingsChart() {
  return (
    <section className="motion-card rounded-2xl border border-white/10 bg-card p-5">
      <h2 className="text-lg font-semibold">Latency and savings rate</h2>
      <p className="text-sm text-muted-foreground">Auto route vs manual model selection</p>
      <div className="mt-5 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={performanceSeries}>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey="day" stroke="rgba(255,255,255,0.55)" />
            <YAxis stroke="rgba(255,255,255,0.55)" />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="savings" name="Savings %" fill="#14b8a6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="auto" name="Auto latency" fill="#60a5fa" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

function SavingsReportPanel() {
  return (
    <section className="motion-card rounded-2xl border border-white/10 bg-card p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Savings report</h2>
          <p className="text-sm text-muted-foreground">Finance-ready summary for founders and CFOs.</p>
        </div>
        <Button variant="secondary" size="sm">
          <Download size={16} />
          PDF
        </Button>
      </div>
      <div className="mt-5 space-y-2">
        {savingsReport.map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] p-3">
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="font-medium">{item.value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-4">
        <p className="flex items-center gap-2 text-sm font-medium text-primary">
          <CheckCircle2 size={16} />
          Board narrative
        </p>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          nexns reduced spend while improving routing quality, creating a credible wedge as an AI cost governance layer.
        </p>
      </div>
    </section>
  );
}

function ProgressRow({
  label,
  value,
  max,
  color
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  return (
    <div className="grid grid-cols-[60px_1fr_72px] items-center gap-3 text-xs text-muted-foreground">
      <span>{label}</span>
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full" style={{ width: `${(value / max) * 100}%`, backgroundColor: color }} />
      </div>
      <span className="text-right">{value}</span>
    </div>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  if (severity === "positive") {
    return <Badge className="border-primary/30 bg-primary/10 text-primary">positive</Badge>;
  }

  if (severity === "high") {
    return <Badge className="border-warning/30 bg-warning/10 text-warning">high</Badge>;
  }

  return <Badge className="border-white/20 bg-white/[0.06] text-muted-foreground">medium</Badge>;
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 p-2">
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium text-foreground">{value}</p>
    </div>
  );
}

function MiniMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 p-2">
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

const tooltipStyle = {
  background: "#0b1418",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8
};
