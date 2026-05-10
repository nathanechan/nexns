"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Bot, Home, Menu, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

const dockItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/navigation", label: "Menu", icon: Menu },
  { href: "/chat", label: "Chat", icon: Bot },
  { href: "/dashboard", label: "Data", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function MobileDock() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 gap-1 rounded-2xl border border-white/10 bg-background/90 p-1 shadow-panel backdrop-blur-2xl lg:hidden"
      aria-label="Mobile navigation"
    >
      {dockItems.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex min-w-0 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] transition",
              active
                ? "bg-primary text-primary-foreground shadow-glow"
                : "text-muted-foreground hover:bg-white/[0.07] hover:text-foreground"
            )}
          >
            <Icon size={16} />
            <span className="max-w-full truncate">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
