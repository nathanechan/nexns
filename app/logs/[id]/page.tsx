import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, GitCompareArrows, Route, ShieldCheck } from "lucide-react";
import { routeReplays } from "@/lib/demo-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

type RouteReplayPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RouteReplayPage({ params }: RouteReplayPageProps) {
  const { id } = await params;
  const replay = routeReplays.find((item) => item.id === id);

  if (!replay) {
    notFound();
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft size={16} />
                Back to admin
              </Button>
            </Link>
            <p className="mt-5 text-sm uppercase tracking-[0.24em] text-primary">Route replay</p>
            <h1 className="mt-3 text-3xl font-semibold">{replay.selectedModel}</h1>
            <p className="mt-2 max-w-3xl text-muted-foreground">{replay.query}</p>
          </div>
          <div className="rounded-lg border border-primary/20 bg-primary/10 p-4 text-right">
            <p className="text-sm text-primary">Estimated savings</p>
            <div className="mt-1 text-3xl font-semibold">{replay.savedPercent}%</div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <section className="space-y-5">
            <article className="rounded-lg border border-white/10 bg-card p-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Route size={18} className="text-primary" />
                Decision summary
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <SummaryMetric label="Intent" value={replay.intent} />
                <SummaryMetric label="Latency" value={`${replay.latencyMs}ms`} />
                <SummaryMetric label="Fallback" value={replay.fallbackModel} />
                <SummaryMetric label="User" value={replay.user} />
              </div>
            </article>

            <article className="rounded-lg border border-white/10 bg-card p-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <ShieldCheck size={18} className="text-primary" />
                Explanation scores
              </h2>
              <div className="mt-5 space-y-4">
                {replay.scores.map((score) => (
                  <div key={score.label}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span>{score.label}</span>
                      <span className="text-primary">{score.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${score.value}%` }} />
                    </div>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">{score.description}</p>
                  </div>
                ))}
              </div>
            </article>
          </section>

          <section className="space-y-5">
            <article className="rounded-lg border border-white/10 bg-card p-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <GitCompareArrows size={18} className="text-primary" />
                Candidate model scoring
              </h2>
              <div className="mt-5 grid gap-3 md:grid-cols-2">
                {replay.candidates.map((candidate) => (
                  <div
                    key={candidate.model}
                    className={
                      candidate.selected
                        ? "rounded-lg border border-primary/30 bg-primary/10 p-4 shadow-glow"
                        : "rounded-lg border border-white/10 bg-white/[0.04] p-4"
                    }
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="font-semibold">{candidate.model}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{candidate.provider}</p>
                      </div>
                      {candidate.selected ? <Badge className="border-primary/30 bg-primary/10 text-primary">selected</Badge> : null}
                    </div>
                    <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
                      <SmallMetric label="Score" value={`${candidate.score}`} />
                      <SmallMetric label="Cost" value={formatCurrency(candidate.cost)} />
                      <SmallMetric label="Latency" value={`${candidate.latencyMs}ms`} />
                    </div>
                    <ul className="mt-4 space-y-1 text-xs leading-5 text-muted-foreground">
                      {candidate.reasons.map((reason) => (
                        <li key={reason}>- {reason}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </article>

            <article className="rounded-lg border border-white/10 bg-card p-5">
              <h2 className="flex items-center gap-2 text-lg font-semibold">
                <Clock size={18} className="text-primary" />
                Decision timeline
              </h2>
              <div className="mt-5 space-y-3">
                {replay.timeline.map((item, index) => (
                  <div key={item.step} className="grid grid-cols-[32px_1fr_auto] gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-sm text-primary">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{item.step}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.detail}</p>
                    </div>
                    <div className="text-sm text-muted-foreground">{item.durationMs}ms</div>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </div>
      </div>
    </main>
  );
}

function SummaryMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/20 p-2">
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium text-foreground">{value}</p>
    </div>
  );
}

export function generateStaticParams() {
  return routeReplays.map((replay) => ({
    id: replay.id
  }));
}
