import { MODEL_REGISTRY, getModelById } from "@/lib/models";
import type {
  ModelProfile,
  QueryIntent,
  RouteCandidate,
  RouteDecision,
  RouteRequest,
  UserPriority
} from "@/lib/types";

const intentSignals: Record<QueryIntent, string[]> = {
  reasoning: ["analyze", "reason", "strategy", "why", "tradeoff", "risk", "memo", "decision"],
  creative: ["write", "brand", "story", "campaign", "copy", "positioning", "landing"],
  code: ["code", "debug", "typescript", "api", "sql", "bug", "function", "route handler"],
  search: ["find", "source", "research", "compare", "citation", "competitor", "market"],
  vision: ["image", "screenshot", "diagram", "vision", "ui", "photo"],
  document: ["pdf", "contract", "summarize", "document", "memo", "deck", "report"],
  realtime: ["latest", "today", "news", "current", "pricing", "fresh", "recent"],
  general: []
};

const priorityWeights: Record<UserPriority, { quality: number; speed: number; cost: number }> = {
  balanced: { quality: 0.42, speed: 0.29, cost: 0.29 },
  quality: { quality: 0.62, speed: 0.18, cost: 0.2 },
  speed: { quality: 0.28, speed: 0.52, cost: 0.2 },
  savings: { quality: 0.3, speed: 0.16, cost: 0.54 },
  freshness: { quality: 0.38, speed: 0.36, cost: 0.26 }
};

export function classifyIntent(input: Pick<RouteRequest, "message" | "hasFiles" | "hasImage">) {
  const text = input.message.toLowerCase();
  const scores = Object.entries(intentSignals).map(([intent, signals]) => {
    const keywordScore = signals.reduce((total, signal) => {
      return total + (text.includes(signal.toLowerCase()) ? 1 : 0);
    }, 0);
    const attachmentBoost =
      (intent === "vision" && input.hasImage ? 3 : 0) +
      (intent === "document" && input.hasFiles ? 2 : 0);

    return {
      intent: intent as QueryIntent,
      score: keywordScore + attachmentBoost
    };
  });

  scores.sort((a, b) => b.score - a.score);
  const top = scores[0];

  return {
    intent: top.score > 0 ? top.intent : "general",
    confidence: top.score > 0 ? Math.min(96, 58 + top.score * 11) : 52
  };
}

function statusMultiplier(status: ModelProfile["status"]) {
  if (status === "healthy") return 1;
  if (status === "degraded") return 0.83;
  return 0.68;
}

function estimateCost(message: string, model: ModelProfile) {
  const tokenEstimate = Math.max(260, Math.ceil(message.length / 3.4));
  const normalizedCost = (100 - model.cost + 14) / 100000;
  return Number((tokenEstimate * normalizedCost).toFixed(4));
}

function scoreModel(model: ModelProfile, request: RouteRequest, intent: QueryIntent) {
  const priority = request.userPriority ?? "balanced";
  const weights = priorityWeights[priority];
  const fit = model.bestFor.includes(intent) ? 16 : intent === "general" ? 4 : -8;
  const status = statusMultiplier(model.status);
  const attachmentPenalty =
    request.hasImage && !model.supportsVision ? -32 : request.hasFiles && model.contextWindow < 128000 ? -8 : 0;
  const freshnessBoost =
    (priority === "freshness" || intent === "realtime") && model.supportsTools ? 12 : 0;

  const weighted =
    model.quality * weights.quality + model.speed * weights.speed + model.cost * weights.cost;

  return Math.max(1, (weighted + fit + freshnessBoost + attachmentPenalty) * status);
}

function reasonsFor(model: ModelProfile, intent: QueryIntent, request: RouteRequest) {
  const reasons: string[] = [];

  if (model.bestFor.includes(intent)) {
    reasons.push(`Strong fit for ${intent} work`);
  }
  if (model.contextWindow >= 200000) {
    reasons.push("Large context window for long documents and project memory");
  }
  if (model.supportsTools && (intent === "search" || intent === "realtime")) {
    reasons.push("Tool-ready model for fresh information workflows");
  }
  if (request.userPriority === "savings" && model.cost > 80) {
    reasons.push("Cost-efficient under savings-first policy");
  }
  if (model.status !== "healthy") {
    reasons.push(`Provider is currently ${model.status}; score was reduced`);
  }

  return reasons.length ? reasons : ["Best aggregate score across quality, speed, cost, and health"];
}

export function routeQuery(request: RouteRequest): RouteDecision {
  const { intent, confidence } = classifyIntent(request);
  const manualModel = request.manualModelId ? getModelById(request.manualModelId) : undefined;
  const candidates: RouteCandidate[] = MODEL_REGISTRY.map((model) => {
    const score = scoreModel(model, request, intent);
    return {
      model,
      score,
      confidence: Math.round(Math.min(98, score + confidence * 0.2)),
      estimatedCost: estimateCost(request.message, model),
      estimatedLatencyMs: Math.round(520 + (100 - model.speed) * 26 + (model.status === "degraded" ? 420 : 0)),
      reasons: reasonsFor(model, intent, request)
    };
  }).sort((a, b) => b.score - a.score);

  const mode = request.mode ?? "auto";
  const primary =
    mode === "manual" && manualModel
      ? candidates.find((candidate) => candidate.model.id === manualModel.id) ?? candidates[0]
      : candidates[0];
  const parallelCount = mode === "parallel" ? Math.min(request.maxModels ?? 3, 4) : 3;
  const parallel = candidates.slice(0, parallelCount);
  const mostExpensive = Math.max(...candidates.map((candidate) => candidate.estimatedCost));
  const expectedSavings = Math.round((1 - primary.estimatedCost / Math.max(mostExpensive, 0.0001)) * 100);

  return {
    intent,
    confidence,
    mode,
    primary,
    parallel,
    reasons: [
      `Classified as ${intent} with ${confidence}% confidence`,
      `Reweighted quality, speed, and cost for ${request.userPriority ?? "balanced"} preference`,
      mode === "parallel" ? "Parallel mode enabled for multi-model comparison" : "Selected one primary model with fallback ready"
    ],
    expectedSavings,
    fallbackModelId: candidates.find((candidate) => candidate.model.id !== primary.model.id)?.model.id ?? "openrouter-auto",
    trace: [
      { label: "intent", value: confidence },
      { label: "quality", value: Math.round(primary.model.quality) },
      { label: "speed", value: Math.round(primary.model.speed) },
      { label: "savings", value: Math.max(0, expectedSavings) }
    ]
  };
}

export function routingPseudocode() {
  return `intent = lightweightClassifier(query, attachments)
candidateModels = providerRegistry.filter(capabilities match intent)
for each model:
  score = weighted(quality, latency, cost, context, health, userPreference)
  score += embeddingSimilarity(query, modelStrengthExamples)
  score -= penalties(missing vision/tools, degraded provider, budget cap)
if manualOverride:
  return selectedModel with audit trail
if parallelMode:
  stream top 2-4 models and compare cost/quality
return bestModel + fallback + confidence + explainable routing reasons`;
}
