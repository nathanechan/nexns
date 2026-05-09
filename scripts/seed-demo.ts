import { modelDistribution, performanceSeries, routingLogs, usageMetrics } from "../lib/demo-data";

const payload = {
  note: "For Supabase SQL seed data, run supabase/seed.sql. This JSON payload remains useful for demos and smoke checks.",
  workspaces: [
    {
      id: "demo_workspace",
      name: "NexusRoute Demo Team",
      plan: "team"
    }
  ],
  usageMetrics,
  modelDistribution,
  performanceSeries,
  routingLogs
};

console.log(JSON.stringify(payload, null, 2));
