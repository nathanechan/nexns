import { z } from "zod";
import { routeQuery } from "@/lib/routing/engine";

const streamSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant", "system"]),
        content: z.string()
      })
    )
    .min(1),
  mode: z.enum(["auto", "parallel", "manual"]).optional(),
  userPriority: z.enum(["balanced", "quality", "speed", "savings", "freshness"]).optional(),
  manualModelId: z.string().optional(),
  attachments: z
    .array(
      z.object({
        name: z.string(),
        type: z.string(),
        size: z.number()
      })
    )
    .optional()
});

const modelMap: Record<string, string> = {
  "claude-4-sonnet": "anthropic/claude-3.5-sonnet",
  "gpt-4.1": "openai/gpt-4.1",
  "gemini-2.5-pro": "google/gemini-2.5-pro",
  "grok-4": "x-ai/grok-4",
  "deepseek-r1": "deepseek/deepseek-r1",
  "openrouter-auto": "openrouter/auto"
};

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = streamSchema.safeParse(json);

  if (!parsed.success) {
    return new Response("Invalid chat request", { status: 400 });
  }

  const latest = [...parsed.data.messages].reverse().find((message) => message.role === "user");

  if (!latest) {
    return new Response("Missing user message", { status: 400 });
  }

  const hasFiles = Boolean(parsed.data.attachments?.length);
  const hasImage = Boolean(parsed.data.attachments?.some((file) => file.type.startsWith("image/")));
  const decision = routeQuery({
    message: latest.content,
    mode: parsed.data.mode,
    manualModelId: parsed.data.manualModelId,
    userPriority: parsed.data.userPriority,
    hasFiles,
    hasImage
  });

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: string, data: unknown) => {
        controller.enqueue(encoder.encode(`event: ${event}\n`));
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      send("decision", decision);

      const apiKey = process.env.OPENROUTER_API_KEY;
      if (!apiKey) {
        for (const chunk of fallbackChunks(decision.primary.model.name, decision.expectedSavings, hasFiles)) {
          send("token", { text: chunk });
          await sleep(120);
        }
        send("done", { source: "local" });
        controller.close();
        return;
      }

      try {
        const upstream = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
            "X-Title": "nexns"
          },
          body: JSON.stringify({
            model: modelMap[decision.primary.model.id] ?? "openrouter/auto",
            stream: true,
            messages: [
              {
                role: "system",
                content:
                  "You are nexns. Answer clearly, mention the routing choice briefly, and produce concise executive-ready output."
              },
              ...parsed.data.messages.map((message) => ({
                role: message.role,
                content: message.content
              }))
            ]
          })
        });

        if (!upstream.ok || !upstream.body) {
          throw new Error(`OpenRouter returned ${upstream.status}`);
        }

        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const payload = line.slice(6).trim();
            if (payload === "[DONE]") continue;
            try {
              const parsedPayload = JSON.parse(payload);
              const text = parsedPayload.choices?.[0]?.delta?.content;
              if (text) {
                send("token", { text });
              }
            } catch {
              // Ignore malformed upstream keepalive chunks.
            }
          }
        }

        send("done", { source: "openrouter" });
        controller.close();
      } catch {
        for (const chunk of fallbackChunks(decision.primary.model.name, decision.expectedSavings, hasFiles)) {
          send("token", { text: chunk });
          await sleep(90);
        }
        send("done", { source: "fallback" });
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive"
    }
  });
}

function fallbackChunks(modelName: string, savings: number, hasFiles: boolean) {
  const fileLine = hasFiles
    ? "The uploaded file is treated as document context, so the route favors long-context reasoning and summary quality. "
    : "";

  return [
    `Handled by ${modelName}. `,
    fileLine,
    "I would start with the decision context, identify the main risks, separate leadership-ready answers from internal action items, ",
    `and log the projected ${savings}% savings back to the team dashboard. `,
    "Next steps: validate assumptions, assign owners, and replay the route if the team wants to audit why this model won."
  ];
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
