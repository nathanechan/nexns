"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bot,
  CreditCard,
  DatabaseZap,
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

export function AppShell({ children, title, description, actions }: AppShellProps) {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(110deg,transparent,rgba(45,212,191,0.12),rgba(96,165,250,0.08),transparent)] blur-2xl" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-[linear-gradient(180deg,rgba(96,165,250,0.08),transparent,rgba(20,184,166,0.06))] blur-3xl" />
      </div>

      <div className="relative grid min-h-screen lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-white/10 bg-black/[0.18] p-4 backdrop-blur-2xl lg:block">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary text-primary-foreground shadow-glow transition duration-300 hover:-translate-y-0.5">
              <Sparkles size={18} />
            </span>
            {t.product}
          </Link>

          <div className="soft-surface mt-6 p-3">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">{t.shell.eyebrow}</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{t.shell.description}</p>
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

        <section className="min-w-0">
          <header className="sticky top-0 z-40 border-b border-white/10 bg-background/62 backdrop-blur-2xl">
            <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
              <div className="hidden min-w-[320px] items-center gap-2 rounded-xl border border-white/10 bg-white/[0.055] px-3 py-2 text-sm text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] md:flex">
                <Search size={16} />
                {t.shell.command}
              </div>
              <div className="flex flex-1 justify-end gap-2">
                <span className="hidden items-center gap-2 rounded-xl border border-primary/20 bg-primary/10 px-3 py-2 text-sm text-primary sm:flex">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
                  {t.shell.status}
                </span>
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
              <div className="surface-enter mb-6 flex flex-wrap items-end justify-between gap-4">
                <div className="max-w-4xl">
                  <p className="text-sm uppercase tracking-[0.24em] text-primary">nexns</p>
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
    </main>
  );
}
