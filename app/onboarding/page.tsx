import Link from "next/link";
import { KeyRound, Route, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const steps = [
  { icon: Users, title: "Create workspace", text: "Invite members and organize projects." },
  { icon: KeyRound, title: "Connect BYOK", text: "Add OpenAI, Anthropic, Google, or OpenRouter keys." },
  { icon: Route, title: "Choose policy", text: "Set quality, speed, savings, and freshness preferences." }
];

export default function OnboardingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-10">
      <section className="glass-panel route-scan w-full max-w-3xl rounded-2xl p-6 shadow-panel">
        <p className="text-sm uppercase tracking-[0.26em] text-primary">Onboarding</p>
        <h1 className="mt-4 text-3xl font-semibold">Configure team AI routing in three steps</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map(({ icon: StepIcon, title, text }) => {
            return (
              <article key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition duration-300 hover:-translate-y-1 hover:border-primary/25">
                <StepIcon size={20} className="text-primary" />
                <h2 className="mt-4 font-semibold">{title}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </article>
            );
          })}
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Input placeholder="Workspace name" defaultValue="nexns Operations Team" />
          <Input placeholder="OpenRouter API Key" type="password" />
        </div>
        <Link href="/workspace">
          <Button className="mt-6 w-full">Continue to workspace</Button>
        </Link>
      </section>
    </main>
  );
}
