export type QueryIntent =
  | "reasoning"
  | "creative"
  | "code"
  | "search"
  | "vision"
  | "document"
  | "realtime"
  | "general";

export type ModelProvider =
  | "OpenAI"
  | "Anthropic"
  | "Google"
  | "xAI"
  | "DeepSeek"
  | "OpenRouter";

export type RouteMode = "auto" | "parallel" | "manual";

export type UserPriority = "balanced" | "quality" | "speed" | "savings" | "freshness";

export interface ModelProfile {
  id: string;
  name: string;
  provider: ModelProvider;
  bestFor: QueryIntent[];
  quality: number;
  speed: number;
  cost: number;
  contextWindow: number;
  supportsVision: boolean;
  supportsTools: boolean;
  status: "healthy" | "degraded" | "limited";
  color: string;
}

export interface RouteRequest {
  message: string;
  mode?: RouteMode;
  manualModelId?: string;
  userPriority?: UserPriority;
  hasFiles?: boolean;
  hasImage?: boolean;
  maxModels?: number;
}

export interface RouteCandidate {
  model: ModelProfile;
  score: number;
  confidence: number;
  estimatedCost: number;
  estimatedLatencyMs: number;
  reasons: string[];
}

export interface RouteDecision {
  intent: QueryIntent;
  confidence: number;
  mode: RouteMode;
  primary: RouteCandidate;
  parallel: RouteCandidate[];
  reasons: string[];
  expectedSavings: number;
  fallbackModelId: string;
  trace: Array<{
    label: string;
    value: number;
  }>;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  modelId?: string;
  createdAt: string;
}

export interface UsageMetric {
  label: string;
  value: number;
  delta: number;
  suffix?: string;
}

export interface RoutingLog {
  id: string;
  user: string;
  query: string;
  intent: QueryIntent;
  routedTo: string;
  latencyMs: number;
  savedPercent: number;
  status: "success" | "fallback" | "manual";
  createdAt: string;
}

export interface RouteReplay {
  id: string;
  query: string;
  user: string;
  intent: QueryIntent;
  selectedModel: string;
  fallbackModel: string;
  savedPercent: number;
  latencyMs: number;
  scores: Array<{
    label: string;
    value: number;
    description: string;
  }>;
  candidates: Array<{
    model: string;
    provider: ModelProvider;
    score: number;
    cost: number;
    latencyMs: number;
    reasons: string[];
    selected?: boolean;
  }>;
  timeline: Array<{
    step: string;
    detail: string;
    durationMs: number;
  }>;
}
