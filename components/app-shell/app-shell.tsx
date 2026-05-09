"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  Bot,
  CreditCard,
  DatabaseZap,
  HelpCircle,
  Home,
  Search,
  Settings,
  Share2,
  ShieldCheck,
  Sparkles,
  Users
} from "lucide-react";
import { LanguageToggle } from "@/components/i18n/language-toggle";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useLanguage } from "@/components/i18n/language-provider";
import { Button } from "@/components/ui/button";
import { StatusChip } from "@/components/ui/status-chip";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
  actions?: React.ReactNode;
};

const routeKeys = [
  { href: "/chat", key: "chat", icon: Bot },
  { href: "/dashboard", key: "dashboard", icon: BarChart3 },
  { href: "/admin", key: "admin", icon: ShieldCheck },
  { href: "/workspace", key: "workspace", icon: Users },
  { href: "/settings/providers", key: "providers", icon: DatabaseZap },
  { href: "/settings/policy", key: "policy", icon: Settings },
  { href: "/share", key: "share", icon: Share2 },
  { href: "/pricing", key: "pricing", icon: CreditCard }
] as const;

const mobileRouteKeys = [
  { href: "/", label: "Home", icon: Home },
  { href: "/chat", key: "chat", icon: Bot },
  { href: "/dashboard", key: "dashboard", icon: BarChart3 },
  { href: "/workspace", key: "workspace", icon: Users },
  { href: "/settings/providers", key: "providers", icon: DatabaseZap }
] as const;

export function AppShell({ children, title, description, actions }: AppShellProps) {
  const pathname = usePathname();
  const { t } = useLanguage();
  const activeRoute = routeKeys.find((item) => pathname === item.href || pathname.startsWith(`${item.href}/`));

  return (
    <main className="commercial-shell relative min-h-screen overflow-hidden">
      <div className="relative grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-white/10 bg-black/[0.16] p-4 backdrop-blur-2xl lg:block">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary text-primary-foreground shadow-glow transition duration-300 hover:-translate-y-0.5">
              <Sparkles size={18} />
            </span>
            {t.product}
          </Link>

          <div className="soft-surface mt-6 p-3">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">{t.shell.eyebrow}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.shell.description}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
                <p className="text-muted-foreground">Routes</p>
                <p className="mt-1 font-semibold text-foreground">24.8k</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.04] p-2">
                <p className="text-muted-foreground">Savings</p>
                <p className="mt-1 font-semibold text-foreground">35%</p>
              </div>
            </div>
          </div>

          <nav className="mt-6 space-y-1">
            {routeKeys.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 overflow-hidden rounded-xl px-3 py-2.5 text-sm transition duration-300",
                    active
                      ? "border border-primary/25 bg-primary/95 text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:bg-white/[0.08] hover:text-foreground"
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-y-1 left-1 w-1 rounded-full bg-primary transition duration-300",
                      active ? "opacity-100" : "opacity-0 group-hover:opacity-50"
                    )}
                  />
                  <Icon size={17} className="relative" />
                  <span className="relative">{t.nav[item.key]}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="min-w-0 pb-20 lg:pb-0">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-background/62 backdrop-blur-2xl">
            <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Link href="/" className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.055] text-muted-foreground transition hover:text-foreground lg:hidden">
                  <Home size={17} />
                </Link>
                <div className="hidden min-w-[320px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.055] px-3 py-2 text-sm text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] md:flex">
                  <Search size={16} />
                  {t.shell.command}
                </div>
                {activeRoute ? (
                  <StatusChip tone="primary" className="hidden sm:inline-flex">
                    {t.nav[activeRoute.key]}
                  </StatusChip>
                ) : null}
              </div>
              <div className="flex justify-end gap-2">
                <StatusChip tone="success" pulse className="hidden sm:inline-flex">
                  {t.shell.status}
                </StatusChip>
                <Button variant="ghost" size="icon" title="Notifications">
                  <Bell size={16} />
                </Button>
                <Button variant="ghost" size="icon" title="Help">
                  <HelpCircle size={16} />
                </Button>
                <LanguageToggle />
                <ThemeToggle />
                <Link href="/login">
                  <Button size="sm">{t.shell.signIn}</Button>
                </Link>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            <div className="mx-auto max-w-7xl">
              <div className="section-header surface-enter mb-6 flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-4xl">
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">workspace control</p>
                  <h1 className="mt-2 text-3xl font-semibold tracking-tight text-balance">{title}</h1>
                  {description ? <p className="mt-2 max-w-3xl text-muted-foreground">{description}</p> : null}
                </div>
                {actions}
              </div>
              <div className="fluid-divider mb-6" />
              {children}
            </div>
          </div>
        </section>
      </div>

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 gap-1 rounded-2xl border border-white/10 bg-background/88 p-1 shadow-panel backdrop-blur-2xl lg:hidden">
        {mobileRouteKeys.map((item) => {
          const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          const label = "key" in item ? t.nav[item.key] : item.label;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] transition",
                active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-white/[0.07] hover:text-foreground"
              )}
            >
              <Icon size={16} />
              <span className="max-w-full truncate">{label}</span>
            </Link>
          );
        })}
      </nav>
    </main>
  );
}
