import type { ModelProfile } from "@/lib/types";

export function providerModelName(model: ModelProfile) {
  const map: Record<string, string> = {
    "claude-4-sonnet": "claude-4-sonnet-20250514",
    "gpt-4.1": "gpt-4.1",
    "gemini-2.5-pro": "gemini-2.5-pro",
    "grok-4": "grok-4",
    "deepseek-r1": "deepseek-reasoner",
    "openrouter-auto": "openrouter/auto"
  };

  return map[model.id] ?? model.id;
}

export function requiresUserProvidedKey(provider: ModelProfile["provider"]) {
  return ["OpenAI", "Anthropic", "Google", "xAI", "DeepSeek", "OpenRouter"].includes(provider);
}
