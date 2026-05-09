"use client";

import Link from "next/link";
import { BarChart3, Bot, CreditCard, Settings, Share2, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";

const items = [
  { href: "/chat", label: "Chat", icon: Bot },
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
  { href: "/workspace", label: "Workspace", icon: Users },
  { href: "/settings/providers", label: "Settings", icon: Settings },
  { href: "/share", label: "Share", icon: Share2 },
  { href: "/pricing", label: "Pricing", icon: CreditCard }
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-background/62 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary text-primary-foreground shadow-glow">
            <Sparkles size={18} />
          </span>
          nexns
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
            >
              <item.icon size={16} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href="/login">
            <Button size="sm">Sign in</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
