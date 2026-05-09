import type { ModelProfile } from "@/lib/types";

export const MODEL_REGISTRY: ModelProfile[] = [
  {
    id: "claude-4-sonnet",
    name: "Claude 4 Sonnet",
    provider: "Anthropic",
    bestFor: ["reasoning", "document", "creative"],
    quality: 96,
    speed: 78,
    cost: 58,
    contextWindow: 200000,
    supportsVision: true,
    supportsTools: true,
    status: "healthy",
    color: "#14b8a6"
  },
  {
    id: "gpt-4.1",
    name: "GPT-4.1",
    provider: "OpenAI",
    bestFor: ["code", "reasoning", "vision"],
    quality: 95,
    speed: 82,
    cost: 62,
    contextWindow: 1000000,
    supportsVision: true,
    supportsTools: true,
    status: "healthy",
    color: "#60a5fa"
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    bestFor: ["vision", "document", "search"],
    quality: 93,
    speed: 80,
    cost: 52,
    contextWindow: 1000000,
    supportsVision: true,
    supportsTools: true,
    status: "healthy",
    color: "#f59e0b"
  },
  {
    id: "grok-4",
    name: "Grok 4",
    provider: "xAI",
    bestFor: ["realtime", "search", "creative"],
    quality: 90,
    speed: 88,
    cost: 55,
    contextWindow: 256000,
    supportsVision: true,
    supportsTools: true,
    status: "degraded",
    color: "#f97316"
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    bestFor: ["code", "reasoning"],
    quality: 89,
    speed: 84,
    cost: 91,
    contextWindow: 128000,
    supportsVision: false,
    supportsTools: false,
    status: "healthy",
    color: "#a78bfa"
  },
  {
    id: "openrouter-auto",
    name: "OpenRouter Auto",
    provider: "OpenRouter",
    bestFor: ["general", "creative", "search"],
    quality: 84,
    speed: 86,
    cost: 88,
    contextWindow: 128000,
    supportsVision: true,
    supportsTools: true,
    status: "healthy",
    color: "#34d399"
  }
];

export function getModelById(id: string) {
  return MODEL_REGISTRY.find((model) => model.id === id);
}
