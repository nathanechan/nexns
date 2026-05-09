export const productGlossary = [
  {
    key: "route-control",
    en: "Route control",
    zh: "路由控制",
    description: "How nexns decides which model, provider, and fallback path should handle a request."
  },
  {
    key: "workspace-governance",
    en: "Workspace governance",
    zh: "工作区治理",
    description: "Team-level permissions, policies, budgets, reports, and audit coverage."
  },
  {
    key: "provider-health",
    en: "Provider health",
    zh: "供应商健康状态",
    description: "Latency, uptime, error pressure, rate limits, and fallback readiness for each AI provider."
  },
  {
    key: "audit-replay",
    en: "Audit replay",
    zh: "审计回放",
    description: "A stored record of route reasons, policy checks, selected model, fallback path, and expected cost."
  }
] as const;
