import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "BYOK provider keys",
    text: "Production should encrypt customer-owned API keys per tenant, restrict access by workspace role, and record every connection test or rotation event."
  },
  {
    title: "Routing audit trail",
    text: "Every route should capture model candidates, policy checks, fallback behavior, estimated cost, latency, and the final selected provider."
  },
  {
    title: "Data retention",
    text: "Teams should be able to configure retention windows for chats, files, exports, and route replays based on plan and compliance needs."
  }
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen px-4 py-10 sm:px-6">
      <article className="glass-panel route-scan mx-auto max-w-3xl rounded-2xl p-6 shadow-panel">
        <ShieldCheck className="text-primary" size={28} />
        <h1 className="mt-5 text-3xl font-semibold">Privacy Policy Placeholder</h1>
        <p className="mt-4 text-muted-foreground">
          This page documents the production posture for customer data, BYOK credentials, and routing
          logs. It is ready to be replaced with legal copy before launch.
        </p>
        <div className="mt-6 space-y-4 text-sm text-muted-foreground">
          {sections.map((section, index) => (
            <section key={section.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <p className="font-medium text-foreground">
                {index + 1}. {section.title}
              </p>
              <p className="mt-2 leading-6">{section.text}</p>
            </section>
          ))}
        </div>
        <Link href="/">
          <Button className="mt-8" variant="secondary">
            Back to home
          </Button>
        </Link>
      </article>
    </main>
  );
}
