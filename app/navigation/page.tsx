import Link from "next/link";
import type { ComponentType } from "react";
import {
  ArrowRight,
  BarChart3,
  Bot,
  CreditCard,
  DatabaseZap,
  FileText,
  Home,
  LockKeyhole,
  Settings,
  ShieldCheck,
  Users
} from "lucide-react";
import { AppShell } from "@/components/app-shell/app-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const primaryRoutes = [
  { href: "/", label: "Home", detail: "Product entry and route overview", icon: Home },
  { href: "/chat", label: "Routing workspace", detail: "Run requests, compare routes, and capture decisions", icon: Bot },
  { href: "/dashboard", label: "Usage dashboard", detail: "Review spend, latency, savings, and quality", icon: BarChart3 },
  { href: "/workspace", label: "Workspace", detail: "Members, projects, assets, quota, and audit activity", icon: Users }
];

const settingsRoutes = [
  { href: "/settings", label: "Control center", detail: "Settings overview, governance health, and operating controls", icon: Settings },
  { href: "/settings/providers", label: "Provider vault", detail: "BYOK keys, provider health, and fallback safety", icon: DatabaseZap },
  { href: "/settings/policy", label: "Policy center", detail: "Budget controls, model tiers, approvals, and guardrails", icon: ShieldCheck },
  { href: "/share", label: "Report center", detail: "Route replays, leadership summaries, and export assets", icon: FileText },
  { href: "/pricing", label: "Plans", detail: "Route volume, team controls, and governance limits", icon: CreditCard }
];

const operatingSignals = [
  ["Routes optimized", "24.8k"],
  ["Savings captured", "$2.2k"],
  ["Audit coverage", "99.2%"]
];

export default function NavigationPage() {
  return (
    <AppShell
      title="Navigation Center"
      description="A mobile-first command center for routing, reporting, workspace controls, and system settings."
      actions={
        <Link href="/settings">
          <Button className="gap-2">
            <Settings size={16} />
            Open settings
          </Button>
        </Link>
      }
    >
      <section className="route-scan mt-6 rounded-2xl border border-primary/20 bg-primary/[0.065] p-5">
        <Badge className="border-primary/30 bg-primary/10 text-primary">Mobile command layer</Badge>
        <h2 className="mt-4 text-2xl font-semibold">Core actions stay in one predictable place.</h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-muted-foreground">
          Mobile screens should focus on the active workflow. Navigation, configuration, and reporting actions live here
          so the workspace stays clean and easy to operate.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {operatingSignals.map(([label, value]) => (
            <div key={label} className="operations-kpi p-4">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="mt-2 text-2xl font-semibold">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-5 grid gap-5 xl:grid-cols-[1fr_0.92fr]">
        <RouteGroup title="Core workspace" routes={primaryRoutes} />
        <RouteGroup title="Settings and reports" routes={settingsRoutes} />
      </div>

      <section className="mt-5 rounded-2xl border border-white/10 bg-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="flex items-center gap-2 text-lg font-semibold">
              <LockKeyhole size={18} className="text-primary" />
              Mobile UI direction
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Next updates should keep actions centralized and preserve the interaction surface.</p>
          </div>
          <Badge className="border-primary/30 bg-primary/10 text-primary">system-level UI</Badge>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-3">
          {[
            "Navigation buttons belong in the dock or Navigation Center.",
            "Configuration buttons belong inside Settings pages.",
            "Workspace screens should prioritize the active interaction."
          ].map((item) => (
            <div key={item} className="interactive-row rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-muted-foreground">
              {item}
            </div>
          ))}
        </div>
      </section>
    </AppShell>
  );
}

function RouteGroup({
  title,
  routes
}: {
  title: string;
  routes: Array<{ href: string; label: string; detail: string; icon: ComponentType<{ size?: number; className?: string }> }>;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-card p-5">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-5 grid gap-3">
        {routes.map((route) => {
          const Icon = route.icon;

          return (
            <Link key={route.href} href={route.href}>
              <article className="interactive-row flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={18} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-medium">{route.label}</h3>
                    <p className="mt-1 truncate text-sm text-muted-foreground">{route.detail}</p>
                  </div>
                </div>
                <ArrowRight size={16} className="shrink-0 text-muted-foreground" />
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
