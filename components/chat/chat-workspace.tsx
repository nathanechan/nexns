"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Award,
  Bot,
  BrainCircuit,
  Activity,
  Clock,
  FolderKanban,
  ImagePlus,
  Library,
  Home,
  Mic,
  PanelLeft,
  Paperclip,
  Download,
  Copy,
  FileText,
  Pin,
  RotateCcw,
  Send,
  Share2,
  Sparkles,
  Volume2
} from "lucide-react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { demoMessages, manualVsAuto } from "@/lib/demo-data";
import type { ChatMessage, RouteCandidate, RouteDecision, RouteMode, UserPriority } from "@/lib/types";
import { MODEL_REGISTRY } from "@/lib/models";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MiniRoutingScorecard, RoutingPanel } from "@/components/chat/routing-panel";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { cn, formatCurrency } from "@/lib/utils";

const softEase = [0.16, 1, 0.3, 1] as const;

const panelVariants = {
  hidden: { opacity: 0, y: 14, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 }
};

const templates = [
  "Analyze this board packet and prepare executive-ready risk actions",
  "Debug a Next.js Route Handler and explain the root cause",
  "Compare OpenAI, Claude, and Gemini for this workflow",
  "Summarize an uploaded PDF into a sales action plan"
];

const projects = ["Fundraising", "Product Strategy", "Engineering", "Customer Research"];

const parallelAngles = [
  "Reasoning view: decompose the goal, risks, and constraints before giving an executive-ready recommendation.",
  "Freshness view: add market movement, pricing shifts, and competitor context so the answer is not static.",
  "Execution view: turn the response into next actions, owners, and measurable follow-up metrics."
];

export function ChatWorkspace() {
  const [messages, setMessages] = useState<ChatMessage[]>(
    demoMessages.map((message, index) => ({
      id: `seed_${index}`,
      role: message.role,
      content: message.content,
      createdAt: new Date().toISOString()
    }))
  );
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<RouteMode>("parallel");
  const [priority, setPriority] = useState<UserPriority>("balanced");
  const [manualModelId, setManualModelId] = useState("claude-4-sonnet");
  const [decision, setDecision] = useState<RouteDecision>();
  const [isRouting, setIsRouting] = useState(false);
  const [attachments, setAttachments] = useState<Array<{ name: string; type: string; size: number; progress: number }>>([]);
  const [shareNotice, setShareNotice] = useState("");
  const [composerFocused, setComposerFocused] = useState(false);

  const parallelResponses = useMemo(() => decision?.parallel ?? [], [decision]);

  async function sendMessage() {
    const content = input.trim();
    if (!content || isRouting) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      createdAt: new Date().toISOString()
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsRouting(true);

    const assistantId = crypto.randomUUID();
    setMessages((current) => [
      ...current,
      {
        id: assistantId,
        role: "assistant",
        modelId: "streaming",
        content: "",
        createdAt: new Date().toISOString()
      }
    ]);

    const response = await fetch("/api/chat/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: [...messages, userMessage].map(({ role, content }) => ({ role, content })),
        mode,
        userPriority: priority,
        manualModelId: mode === "manual" ? manualModelId : undefined,
        attachments
      })
    });

    if (!response.body) {
      setIsRouting(false);
      return;
    }

    await readEventStream(response, (event, data) => {
      if (event === "decision") {
        const nextDecision = data as unknown as RouteDecision;
        setDecision(nextDecision);
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId ? { ...message, modelId: nextDecision.primary.model.id } : message
          )
        );
      }
      if (event === "token") {
        const text = typeof data?.text === "string" ? data.text : "";
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId ? { ...message, content: `${message.content}${text}` } : message
          )
        );
      }
    });

    setIsRouting(false);
    setAttachments([]);
  }

  function handleFileChange(files: FileList | null) {
    if (!files?.length) return;
    setAttachments((current) => [
      ...current,
      ...Array.from(files).map((file) => ({
        name: file.name,
        type: file.type || "application/octet-stream",
        size: file.size,
        progress: file.type.startsWith("image/") ? 72 : 84
      }))
    ]);
  }

  async function copyShareSummary() {
    const latestAssistant = [...messages].reverse().find((message) => message.role === "assistant");
    const summary = [
      "nexns routing report",
      decision ? `Winning model: ${decision.primary.model.name}` : "Winning model: pending",
      decision ? `Expected savings: ${decision.expectedSavings}%` : "Expected savings: pending",
      latestAssistant ? `Summary: ${latestAssistant.content}` : "Summary: no assistant response yet"
    ].join("\n\n");

    try {
      await navigator.clipboard.writeText(summary);
      setShareNotice("Routing report copied");
    } catch {
      setShareNotice("Copy unavailable in this browser");
    }
  }

  return (
    <main className="min-h-screen">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr] xl:grid-cols-[260px_1fr_390px]">
        <motion.aside
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: softEase }}
          className="hidden border-r border-white/10 bg-black/[0.14] p-4 backdrop-blur-2xl lg:block"
        >
          <Link href="/" className="flex items-center gap-2 font-semibold transition hover:text-primary">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary text-primary-foreground shadow-glow">
              <Sparkles size={18} />
            </span>
            nexns
          </Link>
          <div className="route-scan mt-5 rounded-2xl border border-primary/20 bg-primary/10 p-3">
            <p className="text-xs uppercase tracking-[0.22em] text-primary">Premium workspace</p>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Parallel model routing, document-aware context, and ROI proof in one operator console.
            </p>
          </div>
          <Button className="mt-6 w-full justify-start" variant="secondary">
            <PanelLeft size={16} />
            New routing session
          </Button>
          <section className="mt-8">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <FolderKanban size={14} />
              Projects
            </p>
            <div className="mt-3 space-y-1">
              {projects.map((project, index) => (
                <motion.button
                  key={project}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * index }}
                  className="focus-ring flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground"
                >
                  {project}
                  <span className="text-xs">{Math.floor(project.length * 1.7)}</span>
                </motion.button>
              ))}
            </div>
          </section>
          <section className="mt-8">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <Activity size={14} />
              Provider pulse
            </p>
            <div className="mt-3 space-y-2">
              {["Anthropic healthy", "OpenAI healthy", "xAI degraded"].map((status) => (
                <div key={status} className="flex items-center justify-between rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs">
                  <span>{status}</span>
                  <span
                    className={cn(
                      "breathing-dot h-2 w-2 rounded-full",
                      status.includes("degraded") ? "bg-warning text-warning" : "bg-success text-success"
                    )}
                  />
                </div>
              ))}
            </div>
          </section>
          <section className="mt-8">
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-muted-foreground">
              <Library size={14} />
              Prompt templates
            </p>
            <div className="mt-3 space-y-2">
              {templates.map((template, index) => (
                <motion.button
                  key={template}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * index }}
                  onClick={() => setInput(template)}
                  className="focus-ring w-full rounded-md border border-white/10 bg-white/[0.04] p-3 text-left text-sm text-muted-foreground transition hover:border-primary/30 hover:text-foreground"
                >
                  {template}
                </motion.button>
              ))}
            </div>
          </section>
        </motion.aside>

        <section className="flex min-w-0 flex-col">
          <motion.header
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: softEase }}
            className="flex min-h-16 items-center justify-between gap-3 border-b border-white/10 bg-background/35 px-4 backdrop-blur-2xl sm:px-6"
          >
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-lg font-semibold">AI Routing Workspace</h1>
                <Badge className="border-primary/30 bg-primary/10 text-primary">{mode} mode</Badge>
                <Badge className="border-white/20 bg-white/[0.06] text-muted-foreground">{priority} priority</Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">Memory, file routing, parallel comparison, and cost proof</p>
            </div>
            <div className="hidden gap-2 sm:flex">
              <Link href="/">
                <Button variant="secondary" size="sm">
                  <Home size={16} />
                  Home
                </Button>
              </Link>
              <Button variant="ghost" size="icon" title="Voice input">
                <Mic size={17} />
              </Button>
              <Button variant="ghost" size="icon" title="Voice output">
                <Volume2 size={17} />
              </Button>
              <Button variant="secondary" size="sm" onClick={copyShareSummary}>
                <Share2 size={16} />
                Share
              </Button>
              <ThemeToggle />
            </div>
            <Link href="/" className="sm:hidden">
              <Button variant="secondary" size="icon" title="Back to home">
                <Home size={17} />
              </Button>
            </Link>
          </motion.header>

          <div className="flex-1 overflow-y-auto px-4 py-5 sm:px-6">
            <div className="mx-auto max-w-6xl space-y-5">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isStreaming={isRouting && message.role === "assistant" && message.content.length === 0}
                />
              ))}

              {(isRouting || decision) && (
                <RouteTimeline decision={decision} isRouting={isRouting} attachmentsCount={attachments.length} />
              )}

              {(isRouting || decision) && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.42, ease: softEase }}
                  className="xl:hidden"
                >
                  <RoutingPanel decision={decision} isRouting={isRouting} />
                </motion.div>
              )}

              {isRouting && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={panelVariants}
                  transition={{ duration: 0.45, ease: softEase }}
                  className="grid gap-3 md:grid-cols-3"
                >
                  {["Understand query", "Score models", "Prepare parallel response"].map((label, index) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.08 }}
                      className="route-scan rounded-2xl border border-white/10 bg-card p-4"
                    >
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock size={15} className="text-primary" />
                        {label}
                      </div>
                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full animate-pulseTrack rounded-full bg-primary"
                          style={{ animationDelay: `${index * 120}ms` }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {parallelResponses.length > 0 && (
                <>
                  <ParallelComparison candidates={parallelResponses} winnerId={decision?.primary.model.id} />
                  <ManualVsAutoInline />
                </>
              )}
            </div>
          </div>

          <footer className="border-t border-white/10 bg-background/30 p-4 backdrop-blur-2xl sm:p-5">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: softEase }}
              className={cn(
                "mx-auto max-w-5xl rounded-2xl border bg-card p-3 transition duration-300",
                composerFocused ? "border-primary/35 shadow-glow" : "border-white/10"
              )}
            >
              {attachments.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="route-scan mb-3 rounded-2xl border border-primary/20 bg-primary/10 p-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-primary">Document routing context</p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Uploaded files will bias the route toward document-aware and long-context models.
                      </p>
                    </div>
                    <button
                      onClick={() => setAttachments([])}
                      className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-white/[0.08] hover:text-foreground"
                    >
                      clear
                    </button>
                  </div>
                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    {attachments.map((file, index) => (
                      <motion.div
                        key={`${file.name}-${file.size}`}
                        initial={{ opacity: 0, y: 8, scale: 0.985 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.06, ease: softEase }}
                        className="rounded-xl border border-primary/20 bg-black/20 p-3"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="flex min-w-0 items-center gap-2 text-sm">
                            <FileText size={15} className="shrink-0 text-primary" />
                            <span className="truncate">{file.name}</span>
                          </span>
                          <span className="text-xs text-muted-foreground">{formatFileSize(file.size)}</span>
                        </div>
                        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <motion.div
                            className="h-full rounded-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${file.progress}%` }}
                            transition={{ duration: 0.8 }}
                          />
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">
                          Extracting metadata / routing as {file.type.startsWith("image/") ? "vision" : "document"}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
              <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                {(["auto", "parallel", "manual"] as RouteMode[]).map((item) => (
                  <motion.button
                    layout
                    key={item}
                    onClick={() => setMode(item)}
                    className={cn(
                      "focus-ring rounded-xl px-3 py-1.5 text-sm capitalize transition",
                      mode === item ? "bg-primary text-primary-foreground shadow-glow" : "bg-white/[0.07] text-muted-foreground hover:bg-white/[0.1]"
                    )}
                  >
                    {item}
                  </motion.button>
                ))}
                <select
                  value={priority}
                  onChange={(event) => setPriority(event.target.value as UserPriority)}
                  className="focus-ring rounded-xl border border-white/10 bg-background px-3 py-1.5 text-sm"
                >
                  <option value="balanced">Balanced</option>
                  <option value="quality">Quality</option>
                  <option value="speed">Speed</option>
                  <option value="savings">Savings</option>
                  <option value="freshness">Freshness</option>
                </select>
                {mode === "manual" && (
                  <select
                    value={manualModelId}
                    onChange={(event) => setManualModelId(event.target.value)}
                    className="focus-ring rounded-xl border border-white/10 bg-background px-3 py-1.5 text-sm"
                  >
                    {MODEL_REGISTRY.map((model) => (
                      <option key={model.id} value={model.id}>
                        {model.name}
                      </option>
                    ))}
                  </select>
                )}
                </div>
                <ComposerSignal mode={mode} priority={priority} attachmentsCount={attachments.length} />
              </div>
              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onFocus={() => setComposerFocused(true)}
                onBlur={() => setComposerFocused(false)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                    void sendMessage();
                  }
                }}
                className="min-h-28 rounded-2xl border-white/10 bg-black/20 text-base leading-7"
                placeholder="Ask a question. nexns will score intent, cost, latency, and provider health before choosing one model or a parallel route."
              />
              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex gap-2">
                  <label className="focus-ring inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground" title="Upload file">
                    <Paperclip size={17} />
                    <input className="sr-only" type="file" multiple onChange={(event) => handleFileChange(event.target.files)} />
                  </label>
                  <label className="focus-ring inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition hover:bg-white/[0.08] hover:text-foreground" title="Upload image">
                    <ImagePlus size={17} />
                    <input className="sr-only" type="file" accept="image/*" multiple onChange={(event) => handleFileChange(event.target.files)} />
                  </label>
                  <Button variant="ghost" size="icon" title="Copy routing report" onClick={copyShareSummary}>
                    <Download size={17} />
                  </Button>
                </div>
                <div className="flex items-center gap-3">
                  {shareNotice && <span className="text-xs text-muted-foreground">{shareNotice}</span>}
                  <Button onClick={sendMessage} disabled={!input.trim() || isRouting}>
                    <Send size={16} />
                    {isRouting ? "Streaming" : "Send"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </footer>
        </section>

        <motion.section
          initial={{ opacity: 0, x: 18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: softEase }}
          className="hidden space-y-4 border-l border-white/10 bg-black/[0.08] p-4 backdrop-blur-xl xl:block"
        >
          <RoutingPanel decision={decision} isRouting={isRouting} />
          <MiniRoutingScorecard decision={decision} />
        </motion.section>
      </div>
    </main>
  );
}

function MessageBubble({ message, isStreaming }: { message: ChatMessage; isStreaming: boolean }) {
  const modelName =
    message.role === "assistant"
      ? MODEL_REGISTRY.find((model) => model.id === message.modelId)?.name ?? "Router"
      : "You";

  return (
    <motion.article
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.38, ease: softEase }}
      className={cn(
        "group rounded-2xl border p-4 transition duration-300 hover:-translate-y-0.5 hover:border-primary/30",
        message.role === "user"
          ? "ml-auto max-w-[82%] border-primary/20 bg-primary/10"
          : "mr-auto max-w-[88%] border-white/10 bg-card"
      )}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {message.role === "assistant" ? <Bot size={14} /> : <BrainCircuit size={14} />}
          {modelName}
          {message.modelId && <Badge>{message.modelId}</Badge>}
          {isStreaming && <Badge className="border-primary/30 bg-primary/10 text-primary">streaming</Badge>}
        </div>
        {message.role === "assistant" && (
          <div className="flex opacity-0 transition group-hover:opacity-100">
            <Button variant="ghost" size="icon" title="Copy response">
              <Copy size={14} />
            </Button>
            <Button variant="ghost" size="icon" title="Pin response">
              <Pin size={14} />
            </Button>
            <Button variant="ghost" size="icon" title="Retry route">
              <RotateCcw size={14} />
            </Button>
          </div>
        )}
      </div>
      <div className="max-w-none text-sm leading-7">
        {message.content ? <ReactMarkdown>{message.content}</ReactMarkdown> : <StreamingCursor />}
      </div>
    </motion.article>
  );
}

function StreamingCursor() {
  return (
    <div className="flex items-center gap-2 text-muted-foreground">
      <span>Preparing routed answer</span>
      <span className="typing-caret h-4 w-1 rounded-full bg-primary" />
    </div>
  );
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`;
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function ComposerSignal({
  mode,
  priority,
  attachmentsCount
}: {
  mode: RouteMode;
  priority: UserPriority;
  attachmentsCount: number;
}) {
  const signals = [
    `${mode} routing`,
    `${priority} policy`,
    attachmentsCount > 0 ? `${attachmentsCount} file signal${attachmentsCount > 1 ? "s" : ""}` : "no files"
  ];

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
      {signals.map((signal, index) => (
        <motion.span
          key={signal}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04 }}
          className="rounded-full border border-white/10 bg-white/[0.055] px-2.5 py-1"
        >
          {signal}
        </motion.span>
      ))}
    </div>
  );
}

function RouteTimeline({
  decision,
  isRouting,
  attachmentsCount
}: {
  decision?: RouteDecision;
  isRouting: boolean;
  attachmentsCount: number;
}) {
  const steps = [
    {
      label: "Classify",
      detail: decision ? `${decision.intent} intent` : "Reading prompt",
      active: isRouting || Boolean(decision),
      complete: Boolean(decision)
    },
    {
      label: "Score",
      detail: decision ? `${Math.round(decision.primary.score)} top score` : "Comparing models",
      active: isRouting || Boolean(decision),
      complete: Boolean(decision)
    },
    {
      label: "Policy",
      detail: attachmentsCount > 0 ? "File-aware routing" : "Budget + health",
      active: isRouting || Boolean(decision),
      complete: Boolean(decision)
    },
    {
      label: "Stream",
      detail: decision ? decision.primary.model.name : "Preparing answer",
      active: isRouting,
      complete: Boolean(decision) && !isRouting
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.42, ease: softEase }}
      className="route-scan rounded-2xl border border-primary/20 bg-primary/[0.065] p-4"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-primary">Route intelligence timeline</p>
          <h2 className="text-xl font-semibold">Classifier, scoring, policy, and answer stream</h2>
        </div>
        <Badge className="border-primary/30 bg-primary/10 text-primary">
          {isRouting ? "live evaluation" : "route captured"}
        </Badge>
      </div>
      <div className="grid gap-3 md:grid-cols-4">
        {steps.map((step, index) => (
          <motion.article
            key={step.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07, ease: softEase }}
            className={cn(
              "relative overflow-hidden rounded-2xl border p-4",
              step.complete
                ? "border-primary/30 bg-primary/10"
                : step.active
                  ? "border-white/15 bg-white/[0.055]"
                  : "border-white/10 bg-black/15"
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium">{step.label}</span>
              <span
                className={cn(
                  "breathing-dot h-2.5 w-2.5 rounded-full",
                  step.complete || step.active ? "bg-primary text-primary" : "bg-muted-foreground text-muted-foreground"
                )}
              />
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">{step.detail}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: step.complete ? "100%" : step.active ? "68%" : "18%" }}
                transition={{ duration: 0.7, delay: index * 0.08 }}
              />
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}

async function readEventStream(
  response: Response,
  onEvent: (event: string, data: Record<string, unknown>) => void
) {
  const reader = response.body?.getReader();
  if (!reader) return;

  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";

    for (const rawEvent of events) {
      const lines = rawEvent.split("\n");
      const event = lines.find((line) => line.startsWith("event: "))?.slice(7) ?? "message";
      const dataLine = lines.find((line) => line.startsWith("data: "));
      if (!dataLine) continue;
      try {
        onEvent(event, JSON.parse(dataLine.slice(6)));
      } catch {
        // Ignore malformed stream chunks.
      }
    }
  }
}

function ManualVsAutoInline() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: softEase }}
      className="route-scan rounded-2xl border border-primary/20 bg-primary/10 p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-primary">ROI proof</p>
          <h2 className="text-xl font-semibold">Manual pick vs nexns Auto</h2>
        </div>
        <Badge className="border-primary/30 bg-primary/10 text-primary">
          saved {manualVsAuto.savingsPercent}%
        </Badge>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-black/20 p-4">
          <p className="text-sm text-muted-foreground">User manual choice</p>
          <h3 className="mt-2 text-lg font-semibold">{manualVsAuto.manual.model}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{manualVsAuto.manual.risk}</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <InlineMetric label="Cost" value={formatCurrency(manualVsAuto.manual.cost)} />
            <InlineMetric label="Latency" value={`${manualVsAuto.manual.latencyMs}ms`} />
            <InlineMetric label="Quality" value={`${manualVsAuto.manual.quality}`} />
          </div>
        </div>
        <div className="rounded-lg border border-primary/30 bg-card p-4 shadow-glow">
          <p className="text-sm text-primary">nexns Auto</p>
          <h3 className="mt-2 text-lg font-semibold">{manualVsAuto.auto.model}</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">{manualVsAuto.auto.risk}</p>
          <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
            <InlineMetric label="Cost" value={formatCurrency(manualVsAuto.auto.cost)} />
            <InlineMetric label="Latency" value={`${manualVsAuto.auto.latencyMs}ms`} />
            <InlineMetric label="Quality" value={`${manualVsAuto.auto.quality}`} />
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function InlineMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] p-2">
      <p className="text-muted-foreground">{label}</p>
      <p className="mt-1 font-medium text-foreground">{value}</p>
    </div>
  );
}

function ParallelComparison({
  candidates,
  winnerId
}: {
  candidates: RouteCandidate[];
  winnerId?: string;
}) {
  const [activeId, setActiveId] = useState<string | undefined>();
  const selectedId = activeId ?? winnerId ?? candidates[0]?.model.id;
  const selectedCandidate = candidates.find((candidate) => candidate.model.id === selectedId) ?? candidates[0];

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: softEase }}
      className="rounded-2xl border border-white/10 bg-black/[0.16] p-4"
    >
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">Parallel split-view</p>
          <h2 className="text-xl font-semibold">Multi-model comparison</h2>
        </div>
        <Badge className="border-primary/30 bg-primary/10 text-primary">winner selected</Badge>
      </div>
      <div className="grid gap-3 lg:grid-cols-3">
        {candidates.slice(0, 3).map((candidate, index) => (
          <motion.article
            key={candidate.model.id}
            initial={{ opacity: 0, y: 14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.08, duration: 0.42, ease: softEase }}
            onClick={() => setActiveId(candidate.model.id)}
            className={cn(
              "relative cursor-pointer overflow-hidden rounded-2xl border bg-card p-4 transition duration-300 hover:-translate-y-1",
              candidate.model.id === selectedId
                ? "border-primary/45 shadow-glow"
                : candidate.model.id === winnerId
                  ? "border-primary/30"
                  : "border-white/10"
            )}
          >
            {candidate.model.id === winnerId && (
              <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                <Award size={13} />
                Winner
              </div>
            )}
            <div className="flex items-center gap-2 pr-20 text-sm font-medium">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: candidate.model.color }} />
              {candidate.model.name}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {candidate.model.provider} / score {Math.round(candidate.score)}
            </p>
            <TypingLines delay={index * 0.15} />
            <p className="mt-4 text-sm leading-6 text-muted-foreground">{parallelAngles[index]}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-2">
                Cost
                <div className="mt-1 font-medium text-foreground">{formatCurrency(candidate.estimatedCost)}</div>
              </div>
              <div className="rounded-md border border-white/10 bg-white/[0.04] p-2">
                Latency
                <div className="mt-1 font-medium text-foreground">{candidate.estimatedLatencyMs}ms</div>
              </div>
            </div>
            {candidate.model.id !== winnerId && (
              <div className="mt-4 rounded-md border border-white/10 bg-white/[0.04] p-3 text-xs leading-5 text-muted-foreground">
                Why not selected: lower aggregate fit under current quality, speed, and cost preferences.
              </div>
            )}
          </motion.article>
        ))}
      </div>
      {selectedCandidate && (
        <motion.div
          key={selectedCandidate.model.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: softEase }}
          className="mt-4 rounded-2xl border border-white/10 bg-white/[0.045] p-4"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-sm text-muted-foreground">Focus lens</p>
              <h3 className="mt-1 text-lg font-semibold">{selectedCandidate.model.name}</h3>
            </div>
            <Badge
              className={
                selectedCandidate.model.id === winnerId
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-white/20 bg-white/[0.06] text-muted-foreground"
              }
            >
              {selectedCandidate.model.id === winnerId ? "recommended" : "alternative"}
            </Badge>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {selectedCandidate.reasons.slice(0, 3).map((reason) => (
              <div key={reason} className="rounded-xl border border-white/10 bg-black/15 p-3 text-sm text-muted-foreground">
                {reason}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.section>
  );
}

function TypingLines({ delay }: { delay: number }) {
  return (
    <div className="mt-5 space-y-2">
      {[82, 96, 68].map((width, index) => (
        <motion.div
          key={width}
          className="h-2 rounded-full bg-white/10"
          initial={{ width: "22%" }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 0.8, delay: delay + index * 0.12 }}
        />
      ))}
    </div>
  );
}
