import Link from "next/link";
import { ArrowRight, CheckCircle2, Download, FileText, Link2, Mail, Share2, Sparkles } from "lucide-react";
import { savingsReport } from "@/lib/demo-data";
import { AppShell } from "@/components/app-shell/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const exports = [
  {
    title: "Executive summary",
    description: "Package selected routes, savings estimates, and final answers into an executive-ready summary.",
    icon: FileText,
    status: "ready"
  },
  {
    title: "Routing report",
    description: "Export route decision, candidate scores, model costs, fallback policy, and expected savings.",
    icon: Download,
    status: "ready"
  },
  {
    title: "Secure share link",
    description: "Share a read-only session replay with route explanations, policy checks, and model comparison.",
    icon: Link2,
    status: "planned"
  },
  {
    title: "Email brief",
    description: "Send a weekly model spend and quality digest to operators, finance, and workspace owners.",
    icon: Mail,
    status: "planned"
  }
];

const operatingWorkflow = [
  "Start with one complex board packet or customer analysis query in the chat workspace.",
  "Show the route timeline: classify, score, policy, stream.",
  "Open the model comparison and explain why the winning route was selected.",
  "Move to the dashboard and review spend, latency, fallback, and quality impact.",
  "Export the report center package for leadership, finance, or audit review."
];

export default function SharePage() {
  return (
    <AppShell
      title="Report Center"
      description="Package routing decisions, savings evidence, route replays, and export assets for leadership and operations."
      actions={
        <Link href="/chat">
          <Button>Back to chat</Button>
        </Link>
      }
    >
      <section className="route-scan mt-6 rounded-2xl border border-primary/20 bg-primary/[0.065] p-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <Badge className="border-primary/30 bg-primary/10 text-primary">Report and replay center</Badge>
            <Share2 className="mt-6 text-primary" size={28} />
            <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">A system-of-record for routing value and decisions.</h1>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              This center turns daily AI usage into evidence: what routed, why it routed there, how much it saved,
              and which policies protected the workspace.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-black/15 p-5">
            <p className="text-sm uppercase tracking-[0.24em] text-primary">Board-ready ROI</p>
            <div className="mt-4 grid gap-3">
              {savingsReport.slice(0, 4).map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="font-medium">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2">
        {exports.map((item) => {
          const Icon = item.icon;
          return (
            <article key={item.title} className="motion-card rounded-2xl border border-white/10 bg-card p-5">
              <div className="flex items-start justify-between gap-3">
                <Icon size={22} className="text-primary" />
                <Badge
                  className={
                    item.status === "ready"
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-white/20 bg-white/[0.06] text-muted-foreground"
                  }
                >
                  {item.status}
                </Badge>
              </div>
              <h2 className="mt-5 text-xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
              <Button className="mt-5 w-full" variant={item.status === "ready" ? "primary" : "secondary"}>
                {item.status === "ready" ? "Generate" : "Preview"}
              </Button>
            </article>
          );
        })}
      </section>

      <div className="mt-5 grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
        <section className="rounded-2xl border border-white/10 bg-card p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles size={18} className="text-primary" />
            Operating workflow
          </h2>
          <div className="mt-5 space-y-3">
            {operatingWorkflow.map((step, index) => (
              <div key={step} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {index + 1}
                </span>
                <p className="text-sm leading-6 text-muted-foreground">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-card p-5">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <CheckCircle2 size={18} className="text-primary" />
            Leadership takeaways
          </h2>
          <div className="mt-5 grid gap-3">
            {[
              "Clear product value: model routing and AI cost governance, not another generic chat interface.",
              "Observable differentiation: route timeline, parallel comparison, savings reports, and audit replay.",
              "Commercial path: BYOK plus Pro, Team, and Enterprise governance features.",
              "Expansion path: RAG, agents, enterprise integrations, and compliance-grade audit trails."
            ].map((item) => (
              <div key={item} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-muted-foreground">
                {item}
              </div>
            ))}
          </div>
          <Link href="/dashboard">
            <Button className="mt-5 w-full gap-2" variant="secondary">
              Open savings dashboard
              <ArrowRight size={16} />
            </Button>
          </Link>
        </section>
      </div>
    </AppShell>
  );
}
