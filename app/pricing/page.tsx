import Link from "next/link";
import { Check } from "lucide-react";
import { AppShell } from "@/components/app-shell/app-shell";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    features: ["100 routes / month", "BYOK", "Basic model comparison", "Community support"]
  },
  {
    name: "Pro",
    price: "$19",
    features: ["3,000 routes / month", "Parallel mode", "Savings dashboard", "Shareable sessions"]
  },
  {
    name: "Team",
    price: "$79",
    features: ["20,000 routes / month", "Admin logs", "Team folders", "Budget alerts"]
  }
];

export default function PricingPage() {
  return (
    <AppShell
      title="Pricing"
      description="Stripe-ready subscription plans for routing volume, team controls, and spend governance."
      actions={
        <Link href="/login">
          <Button>Start trial</Button>
        </Link>
      }
    >
        <div className="mt-10 text-center">
          <p className="text-sm uppercase tracking-[0.26em] text-primary">Usage-based plans</p>
          <h1 className="mt-4 text-4xl font-semibold">Subscription plans for routing volume</h1>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Choose the right level of route volume, governance, BYOK coverage, and team reporting for your workspace.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {tiers.map((tier) => (
            <article
              key={tier.name}
              className={
                tier.name === "Pro"
                  ? "motion-card route-scan rounded-2xl border border-primary/30 bg-primary/10 p-6 shadow-glow"
                  : "motion-card rounded-2xl border border-white/10 bg-card p-6"
              }
            >
              <h2 className="text-xl font-semibold">{tier.name}</h2>
              <div className="mt-5 flex items-end gap-1">
                <span className="text-4xl font-semibold">{tier.price}</span>
                <span className="pb-1 text-muted-foreground">/mo</span>
              </div>
              <Button className="mt-6 w-full" variant={tier.name === "Pro" ? "primary" : "secondary"}>
                Choose {tier.name}
              </Button>
              <div className="mt-6 space-y-3">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Check size={16} className="text-primary" />
                    {feature}
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
    </AppShell>
  );
}
