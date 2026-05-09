import { createSupabaseServiceClient } from "@/lib/integrations/supabase";

export type HomepageMetric = {
  value: string;
  label: string;
};

const fallbackMetrics: HomepageMetric[] = [
  { value: "24.8k", label: "managed routes" },
  { value: "$2.2k", label: "monthly spend avoided" },
  { value: "3.8%", label: "fallback rate" },
  { value: "99.2%", label: "audit coverage" }
];

export async function getHomepageMetrics(): Promise<HomepageMetric[]> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return fallbackMetrics;
  }

  try {
    const supabase = createSupabaseServiceClient();
    const [{ count: routeCount }, { data: routes }, { count: auditCount }] = await Promise.all([
      supabase.from("routing_decisions").select("id", { count: "exact", head: true }),
      supabase
        .from("routing_decisions")
        .select("expected_savings_percent,status")
        .order("created_at", { ascending: false })
        .limit(500),
      supabase.from("audit_events").select("id", { count: "exact", head: true })
    ]);

    const routeRows = routes ?? [];
    const fallbackCount = routeRows.filter((route) => route.status === "fallback").length;
    const averageSavings =
      routeRows.length > 0
        ? Math.round(routeRows.reduce((total, route) => total + route.expected_savings_percent, 0) / routeRows.length)
        : 35;
    const fallbackRate =
      routeRows.length > 0 ? `${((fallbackCount / routeRows.length) * 100).toFixed(1)}%` : fallbackMetrics[2]!.value;
    const auditCoverage =
      routeCount && routeCount > 0 && auditCount !== null
        ? `${Math.min(99.9, (auditCount / routeCount) * 100).toFixed(1)}%`
        : fallbackMetrics[3]!.value;

    return [
      { value: formatCompact(routeCount ?? 0), label: "managed routes" },
      { value: `${averageSavings}%`, label: "average savings" },
      { value: fallbackRate, label: "fallback rate" },
      { value: auditCoverage, label: "audit coverage" }
    ];
  } catch {
    return fallbackMetrics;
  }
}

function formatCompact(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }

  return String(value);
}
