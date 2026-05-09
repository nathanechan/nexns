import Link from "next/link";
import { MetricsDashboard } from "@/components/dashboard/metrics-dashboard";
import { AppShell } from "@/components/app-shell/app-shell";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <AppShell
      title="Usage & Savings Dashboard"
      description="Show the business value of nexns: dollars saved, latency reduced, and fewer poor model choices."
      actions={
        <Link href="/chat">
          <Button>Open workspace</Button>
        </Link>
      }
    >
      <MetricsDashboard />
    </AppShell>
  );
}
