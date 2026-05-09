import Link from "next/link";
import { ArrowRight, KeyRound, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <main className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">
      <section className="flex items-center justify-center px-4 py-10 sm:px-6">
        <div className="route-scan w-full max-w-md rounded-2xl border border-white/10 bg-card p-6 shadow-panel">
          <div className="flex items-center gap-2 font-semibold">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary text-primary-foreground shadow-glow">
              <Sparkles size={18} />
            </span>
            nexns
          </div>
          <p className="mt-8 text-sm uppercase tracking-[0.24em] text-primary">Secure access</p>
          <h1 className="mt-3 text-3xl font-semibold">Sign in to your AI routing workspace</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            Secure workspace access for teams, organizations, SSO, and role-based AI governance.
          </p>
          <div className="mt-6 space-y-3">
            <Input placeholder="name@company.com" type="email" />
            <Input placeholder="Password" type="password" />
          </div>
          <Link href="/workspace">
            <Button className="mt-5 w-full">
              Continue to workspace
              <ArrowRight size={16} />
            </Button>
          </Link>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button variant="secondary" className="w-full">
              Google
            </Button>
            <Button variant="secondary" className="w-full">
              GitHub
            </Button>
          </div>
        </div>
      </section>
      <section className="hidden border-l border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl lg:flex lg:items-center">
        <div className="mx-auto max-w-xl">
          <KeyRound className="text-primary" size={32} />
          <h2 className="mt-6 text-4xl font-semibold">Enterprise-ready access for governed AI operations.</h2>
          <div className="mt-8 grid gap-3">
            {[
              "Workspace-level provider keys",
              "Team member roles and usage limits",
              "Policy-based routing and budget guardrails",
              "Audit-ready route replay for every request"
            ].map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-card p-4">
                <ShieldCheck size={18} className="text-primary" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
