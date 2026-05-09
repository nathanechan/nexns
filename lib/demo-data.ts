import type { ModelProvider, RouteReplay, RoutingLog, UsageMetric } from "@/lib/types";

export const usageMetrics: UsageMetric[] = [
  { label: "Routing accuracy", value: 92, delta: 7, suffix: "%" },
  { label: "Monthly savings", value: 42, delta: 11, suffix: "%" },
  { label: "Avg response", value: 1.8, delta: -24, suffix: "s" },
  { label: "Active users", value: 128, delta: 38 }
];

export const businessMetrics = [
  {
    label: "Monthly model spend",
    value: "$3,056",
    delta: "-42%",
    description: "Reduced from projected $5,284 to $3,056."
  },
  {
    label: "Avoided cost",
    value: "$2,228",
    delta: "+$618",
    description: "High-cost calls avoided through routing and fallback rules."
  },
  {
    label: "Latency saved",
    value: "19.4h",
    delta: "-31%",
    description: "Estimated team waiting time saved this month."
  },
  {
    label: "Fallback rate",
    value: "3.8%",
    delta: "-1.2%",
    description: "Automatic switchovers during provider degradation."
  },
  {
    label: "Quality score",
    value: "94/100",
    delta: "+6",
    description: "Weighted score based on reroute rate and acceptance signals."
  }
];

export const modelDistribution = [
  { name: "Claude", value: 34, fill: "#14b8a6" },
  { name: "GPT", value: 27, fill: "#60a5fa" },
  { name: "Gemini", value: 18, fill: "#f59e0b" },
  { name: "DeepSeek", value: 14, fill: "#a78bfa" },
  { name: "Grok", value: 7, fill: "#f97316" }
];

export const performanceSeries = [
  { day: "Mon", auto: 1.6, manual: 2.8, savings: 31, spend: 412, avoided: 184 },
  { day: "Tue", auto: 1.7, manual: 2.6, savings: 36, spend: 438, avoided: 246 },
  { day: "Wed", auto: 1.4, manual: 2.5, savings: 38, spend: 397, avoided: 244 },
  { day: "Thu", auto: 1.9, manual: 2.9, savings: 41, spend: 456, avoided: 317 },
  { day: "Fri", auto: 1.5, manual: 2.7, savings: 42, spend: 424, avoided: 307 },
  { day: "Sat", auto: 1.8, manual: 3.1, savings: 39, spend: 468, avoided: 300 },
  { day: "Sun", auto: 1.6, manual: 2.4, savings: 44, spend: 461, avoided: 350 }
];

export const beforeAfterMetrics = [
  { label: "Monthly spend", before: 5284, after: 3056 },
  { label: "Avg latency", before: 2.8, after: 1.8 },
  { label: "Retry rate", before: 14.2, after: 6.1 },
  { label: "High-cost misuse", before: 38, after: 16 }
];

export const timeRangeMetrics = [
  { label: "7D", spend: "$724", avoided: "$511", routes: "5.8k", quality: "93" },
  { label: "30D", spend: "$3,056", avoided: "$2,228", routes: "24k", quality: "94" },
  { label: "90D", spend: "$8,920", avoided: "$6,104", routes: "71k", quality: "92" },
  { label: "Custom", spend: "$12.4k", avoided: "$8.7k", routes: "103k", quality: "91" }
];

export const anomalyInsights = [
  {
    title: "OpenAI spend spike",
    severity: "medium",
    detail: "Manual overrides increased GPT-4.1 usage by 18% in engineering workflows.",
    action: "Review override policy"
  },
  {
    title: "xAI degraded",
    severity: "high",
    detail: "Freshness routes were downweighted after p95 latency crossed 1.4s.",
    action: "Keep fallback active"
  },
  {
    title: "Document routes improving",
    severity: "positive",
    detail: "Long-context routing reduced memo summarization retries by 41%.",
    action: "Expand document policy"
  }
];

export const providerComparison = [
  { provider: "Anthropic", routes: 8120, spend: 1184, avoided: 760, p95: 1180, quality: 96, error: 0.4 },
  { provider: "OpenAI", routes: 6480, spend: 1056, avoided: 492, p95: 1040, quality: 94, error: 0.6 },
  { provider: "Google", routes: 4320, spend: 428, avoided: 384, p95: 1320, quality: 91, error: 0.8 },
  { provider: "DeepSeek", routes: 3360, spend: 188, avoided: 422, p95: 980, quality: 89, error: 1.1 },
  { provider: "xAI", routes: 1680, spend: 200, avoided: 170, p95: 1490, quality: 87, error: 3.7 }
];

export const savingsReport = [
  { label: "Projected manual-model spend", value: "$5,284" },
  { label: "Actual routed spend", value: "$3,056" },
  { label: "Avoided premium calls", value: "8,420" },
  { label: "Cost per successful answer", value: "$0.127" },
  { label: "Finance-ready ROI", value: "1.73x" }
];

export const manualVsAuto = {
  query: "Analyze this board packet and prepare executive-ready risk actions.",
  manual: {
    model: "GPT-4.1",
    cost: 0.092,
    latencyMs: 2800,
    quality: 88,
    risk: "The user picked a strong model manually, but the route ignores long-context fit and cost policy."
  },
  auto: {
    model: "Claude 4 Sonnet",
    cost: 0.061,
    latencyMs: 1900,
    quality: 94,
    risk: "nexns classified reasoning + document work, selected a long-context model, and kept fallback ready."
  },
  savingsPercent: 34
};

export const routingLogs: RoutingLog[] = Array.from({ length: 16 }).map((_, index) => {
  const intents = ["reasoning", "code", "search", "vision", "document"] as const;
  const models = ["Claude 4 Sonnet", "GPT-4.1", "Gemini 2.5 Pro", "DeepSeek R1", "Grok 4"];
  return {
    id: `log_${index + 1}`,
    user: `team-${(index % 6) + 1}@nexns.ai`,
    query: [
      "Compare churn risk by customer segment",
      "Debug Next.js streaming route handler",
      "Find current AI pricing shifts",
      "Summarize uploaded board packet",
      "Generate positioning copy for landing page"
    ][index % 5],
    intent: intents[index % intents.length],
    routedTo: models[index % models.length],
    latencyMs: 890 + index * 87,
    savedPercent: 28 + ((index * 7) % 29),
    status: index % 7 === 0 ? "fallback" : index % 5 === 0 ? "manual" : "success",
    createdAt: new Date(Date.now() - index * 1000 * 60 * 28).toISOString()
  };
});

export const providerHealth = [
  { provider: "Anthropic", status: "healthy", latencyMs: 940, errorRate: 0.4, routeShare: 34 },
  { provider: "OpenAI", status: "healthy", latencyMs: 880, errorRate: 0.6, routeShare: 27 },
  { provider: "Google", status: "healthy", latencyMs: 1020, errorRate: 0.8, routeShare: 18 },
  { provider: "DeepSeek", status: "healthy", latencyMs: 760, errorRate: 1.1, routeShare: 14 },
  { provider: "xAI", status: "degraded", latencyMs: 1490, errorRate: 3.7, routeShare: 7 }
];

export const controlPlaneStats = [
  { label: "Active tenants", value: "118", detail: "+14 this month" },
  { label: "Managed routes", value: "24.8k", detail: "92% auto-routed" },
  { label: "Budget protected", value: "$2.2k", detail: "42% lower model spend" },
  { label: "Audit coverage", value: "99.2%", detail: "Replay trail captured" }
];

export const controlPlaneAlerts = [
  {
    title: "xAI freshness fallback active",
    severity: "high",
    detail: "Grok routes are temporarily capped after p95 latency crossed the freshness SLA.",
    action: "Keep OpenRouter and Gemini fallback chain active"
  },
  {
    title: "Team workspace near budget cap",
    severity: "medium",
    detail: "Aster Labs has used 86% of its monthly model budget with 9 days left in cycle.",
    action: "Recommend savings-first policy for non-critical routes"
  },
  {
    title: "BYOK adoption improving",
    severity: "positive",
    detail: "64% of Pro tenants connected at least one provider key, lowering platform exposure.",
    action: "Prompt remaining tenants during onboarding"
  }
];

export const providerUptimeSeries = [
  { provider: "Anthropic", uptime: 99.98, p95: 1180, rateLimit: 2.1, errorRate: 0.4, status: "stable" },
  { provider: "OpenAI", uptime: 99.95, p95: 1040, rateLimit: 2.8, errorRate: 0.6, status: "stable" },
  { provider: "Google", uptime: 99.91, p95: 1320, rateLimit: 3.4, errorRate: 0.8, status: "watch" },
  { provider: "DeepSeek", uptime: 99.88, p95: 980, rateLimit: 4.2, errorRate: 1.1, status: "stable" },
  { provider: "xAI", uptime: 98.74, p95: 1490, rateLimit: 9.6, errorRate: 3.7, status: "degraded" }
];

export const tenantWorkspaces = [
  {
    name: "Aster Labs",
    plan: "Team",
    owner: "ops@aster.ai",
    users: 24,
    monthlyRoutes: 8420,
    budgetUsed: 86,
    budgetCap: "$1,200",
    byokStatus: "Connected",
    risk: "high",
    lastActive: "4 min ago"
  },
  {
    name: "Northstar Capital",
    plan: "Pro",
    owner: "partner@northstar.vc",
    users: 11,
    monthlyRoutes: 3920,
    budgetUsed: 58,
    budgetCap: "$720",
    byokStatus: "Partial",
    risk: "medium",
    lastActive: "11 min ago"
  },
  {
    name: "Helio Studio",
    plan: "Team",
    owner: "design@helio.so",
    users: 18,
    monthlyRoutes: 5110,
    budgetUsed: 44,
    budgetCap: "$940",
    byokStatus: "Connected",
    risk: "low",
    lastActive: "22 min ago"
  },
  {
    name: "Meridian AI",
    plan: "Enterprise",
    owner: "admin@meridian.ai",
    users: 42,
    monthlyRoutes: 12640,
    budgetUsed: 63,
    budgetCap: "$3,500",
    byokStatus: "Connected",
    risk: "low",
    lastActive: "38 min ago"
  },
  {
    name: "PilotForge",
    plan: "Free",
    owner: "founder@pilotforge.co",
    users: 5,
    monthlyRoutes: 820,
    budgetUsed: 73,
    budgetCap: "$120",
    byokStatus: "Missing",
    risk: "medium",
    lastActive: "1h ago"
  }
];

export const policyControls = [
  {
    name: "Budget pressure routing",
    scope: "Workspace",
    trigger: "Budget usage > 80%",
    action: "Prefer savings-first capable models",
    impact: "$680 avoided",
    status: "active"
  },
  {
    name: "Sensitive data boundary",
    scope: "Tenant",
    trigger: "PII, legal, health, or finance markers",
    action: "Restrict to approved providers and BYOK keys",
    impact: "99.2% compliant",
    status: "active"
  },
  {
    name: "Provider health failover",
    scope: "Global",
    trigger: "p95 latency or error rate breach",
    action: "Downweight degraded providers and open fallback",
    impact: "3.8% fallback",
    status: "active"
  },
  {
    name: "Manual override audit",
    scope: "User",
    trigger: "User selects a non-recommended model",
    action: "Record reason and compare cost delta",
    impact: "6% override rate",
    status: "active"
  },
  {
    name: "Enterprise data residency",
    scope: "Enterprise",
    trigger: "Workspace region requires EU processing",
    action: "Route only to residency-approved providers",
    impact: "ready",
    status: "draft"
  }
];

export const policySimulation = {
  query: "Summarize this board packet and extract risks, burn multiple, and fundraising objections.",
  detectedSignals: ["document", "finance", "long-context", "sensitive"],
  withoutPolicy: {
    model: "GPT-4.1",
    cost: "$0.092",
    latency: "2.8s",
    risk: "Uses a capable model but ignores sensitive data boundary and budget pressure."
  },
  withPolicy: {
    model: "Claude 4 Sonnet via BYOK",
    cost: "$0.061",
    latency: "1.9s",
    risk: "Approved provider, long-context fit, and 34% lower estimated spend."
  }
};

export const approvalQueue = [
  {
    request: "Raise Aster Labs daily cap from $180 to $260",
    owner: "ops@aster.ai",
    reason: "Board memo analysis spike before leadership review",
    risk: "medium",
    age: "12 min"
  },
  {
    request: "Allow Gemini for Northstar confidential docs",
    owner: "partner@northstar.vc",
    reason: "Large context and vision extraction needed",
    risk: "high",
    age: "34 min"
  },
  {
    request: "Enable DeepSeek for PilotForge coding routes",
    owner: "founder@pilotforge.co",
    reason: "Lower-cost reasoning for early product debugging",
    risk: "low",
    age: "1h"
  }
];

export const providerVaultMetrics = [
  { label: "BYOK coverage", value: "64%", detail: "Active tenants with at least one key" },
  { label: "Platform exposure", value: "-38%", detail: "Spend shifted to customer-owned keys" },
  { label: "Key health", value: "97.6%", detail: "Passing scheduled connection tests" },
  { label: "Fallback safety", value: "100%", detail: "Every tenant has a valid fallback path" }
];

export const providerKeyAudits = [
  { provider: "Anthropic", owner: "Aster Labs", event: "Key test passed", status: "passed", time: "4 min ago" },
  { provider: "xAI", owner: "Global fallback", event: "Latency SLA breached", status: "watch", time: "18 min ago" },
  { provider: "OpenAI", owner: "Northstar Capital", event: "Rotation due in 9 days", status: "notice", time: "42 min ago" },
  { provider: "Google", owner: "Meridian AI", event: "Vision route validated", status: "passed", time: "1h ago" }
];

export const workspaceOverview = [
  { label: "Members", value: "18", detail: "4 admins, 14 members" },
  { label: "Projects", value: "7", detail: "3 leadership-facing spaces" },
  { label: "Shared assets", value: "284", detail: "Files, prompts, and route replays" },
  { label: "Monthly savings", value: "$2.2k", detail: "42% below manual-model spend" }
];

export const workspaceMembers = [
  {
    name: "Ava Chen",
    email: "ava@nexns.ai",
    role: "Owner",
    seat: "Admin",
    usage: "4,210 routes",
    budget: 72,
    access: "Full control",
    status: "active"
  },
  {
    name: "Daniel Park",
    email: "daniel@nexns.ai",
    role: "Admin",
    seat: "Operator",
    usage: "2,084 routes",
    budget: 48,
    access: "Policy, providers, logs",
    status: "active"
  },
  {
    name: "Mina Patel",
    email: "mina@nexns.ai",
    role: "Member",
    seat: "Analyst",
    usage: "1,776 routes",
    budget: 41,
    access: "Chat, projects, exports",
    status: "active"
  },
  {
    name: "Chris Wong",
    email: "chris@nexns.ai",
    role: "Member",
    seat: "Builder",
    usage: "942 routes",
    budget: 29,
    access: "Chat and shared templates",
    status: "active"
  },
  {
    name: "Leah Stone",
    email: "leah@nexns.ai",
    role: "Viewer",
    seat: "Finance",
    usage: "318 routes",
    budget: 12,
    access: "Dashboard and reports",
    status: "invited"
  }
];

export const workspaceProjects = [
  {
    name: "Strategic Planning",
    type: "Leadership room",
    routes: "6,820",
    assets: 74,
    models: "Claude, GPT, Gemini",
    sensitivity: "high",
    updated: "8 min ago"
  },
  {
    name: "Product Research",
    type: "Market intelligence",
    routes: "4,190",
    assets: 53,
    models: "Grok, Gemini, OpenRouter",
    sensitivity: "medium",
    updated: "22 min ago"
  },
  {
    name: "Engineering Copilot",
    type: "Code workspace",
    routes: "5,430",
    assets: 61,
    models: "GPT, DeepSeek, Claude",
    sensitivity: "medium",
    updated: "41 min ago"
  },
  {
    name: "Customer Insights",
    type: "Revenue analytics",
    routes: "3,870",
    assets: 38,
    models: "Claude, Gemini",
    sensitivity: "high",
    updated: "1h ago"
  }
];

export const workspaceAssets = [
  { name: "Board packet Q&A", kind: "Prompt template", owner: "Ava Chen", routes: 128, visibility: "Team" },
  { name: "Board packet summary", kind: "PDF workflow", owner: "Daniel Park", routes: 86, visibility: "Admins" },
  { name: "Model cost report", kind: "Share export", owner: "Leah Stone", routes: 42, visibility: "Finance" },
  { name: "Debugging route replay", kind: "Audit replay", owner: "Chris Wong", routes: 73, visibility: "Engineering" }
];

export const workspaceAuditTrail = [
  { actor: "Ava Chen", event: "Invited Leah Stone as Finance Viewer", area: "Members", risk: "low", time: "6 min ago" },
  { actor: "Daniel Park", event: "Raised Engineering Copilot parallel limit to 3", area: "Policy", risk: "medium", time: "18 min ago" },
  { actor: "Mina Patel", event: "Shared Series A route replay with leadership", area: "Share", risk: "low", time: "27 min ago" },
  { actor: "System", event: "Blocked xAI route after provider SLA breach", area: "Routing", risk: "medium", time: "39 min ago" },
  { actor: "Chris Wong", event: "Uploaded codebase architecture PDF", area: "Assets", risk: "low", time: "1h ago" }
];

export const workspaceQuota = [
  { label: "Monthly routes", value: "24,000 / 30,000", percent: 80 },
  { label: "Model budget", value: "$3,056 / $4,000", percent: 76 },
  { label: "Parallel runs", value: "1,284 / 2,000", percent: 64 },
  { label: "Shared exports", value: "168 / 250", percent: 67 }
];

export const routeReplays: RouteReplay[] = routingLogs.map((log, index) => {
  const selectedProvider: ModelProvider =
    log.routedTo.includes("Claude")
      ? "Anthropic"
      : log.routedTo.includes("GPT")
        ? "OpenAI"
        : log.routedTo.includes("Gemini")
          ? "Google"
          : log.routedTo.includes("DeepSeek")
            ? "DeepSeek"
            : "xAI";

  const baseScore = 91 - (index % 5) * 3;

  return {
    id: log.id,
    query: log.query,
    user: log.user,
    intent: log.intent,
    selectedModel: log.routedTo,
    fallbackModel: index % 2 === 0 ? "OpenRouter Auto" : "GPT-4.1",
    savedPercent: log.savedPercent,
    latencyMs: log.latencyMs,
    scores: [
      {
        label: "Query complexity",
        value: 72 + (index % 4) * 6,
        description: "Longer reasoning chain and higher ambiguity increase this score."
      },
      {
        label: "Freshness need",
        value: log.intent === "search" ? 91 : log.intent === "realtime" ? 94 : 42 + (index % 3) * 9,
        description: "Measures whether current market or web context is required."
      },
      {
        label: "Document fit",
        value: log.intent === "document" ? 93 : 58 + (index % 4) * 5,
        description: "Rewards long-context and summarization strength."
      },
      {
        label: "Budget sensitivity",
        value: 66 + (index % 5) * 5,
        description: "Higher values push the route toward cheaper capable models."
      },
      {
        label: "Provider risk",
        value: log.status === "fallback" ? 78 : log.status === "manual" ? 52 : 24 + (index % 4) * 6,
        description: "Combines provider degradation, error rate, and fallback pressure."
      },
      {
        label: "Confidence interval",
        value: Math.min(97, baseScore + 4),
        description: "Estimated confidence after classifier, rules, and registry scoring."
      }
    ],
    candidates: [
      {
        model: log.routedTo,
        provider: selectedProvider,
        score: baseScore,
        cost: 0.061 + index * 0.002,
        latencyMs: log.latencyMs,
        selected: true,
        reasons: ["Highest weighted fit", "Policy-compliant cost", "Fallback path available"]
      },
      {
        model: "GPT-4.1",
        provider: "OpenAI",
        score: baseScore - 5,
        cost: 0.092,
        latencyMs: 1280 + index * 31,
        reasons: ["Strong general quality", "Higher expected cost", "Good tool support"]
      },
      {
        model: "Gemini 2.5 Pro",
        provider: "Google",
        score: baseScore - 8,
        cost: 0.074,
        latencyMs: 1180 + index * 26,
        reasons: ["Large context", "Strong vision/document support", "Slightly lower intent fit"]
      },
      {
        model: "DeepSeek R1",
        provider: "DeepSeek",
        score: baseScore - 12,
        cost: 0.035,
        latencyMs: 980 + index * 17,
        reasons: ["Cost efficient", "Good reasoning", "Limited multimodal capability"]
      }
    ],
    timeline: [
      { step: "Classify intent", detail: `Detected ${log.intent} workload`, durationMs: 96 },
      { step: "Score candidates", detail: "Weighted quality, speed, cost, context, and health", durationMs: 184 },
      { step: "Apply policy", detail: "Checked budget, provider status, and fallback requirement", durationMs: 72 },
      { step: "Select route", detail: `${log.routedTo} selected with ${log.savedPercent}% estimated savings`, durationMs: 41 }
    ]
  };
});

export const demoMessages = [
  {
    role: "assistant" as const,
    content:
      "Welcome to nexns. Ask a question and I will show the routing decision before producing a multi-model answer. Try: Analyze this board packet and prepare executive-ready risk actions."
  }
];
