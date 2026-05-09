"use client";

import { useState } from "react";
import { KeyRound, Loader2, TestTube2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const defaultWorkspaceId = "00000000-0000-0000-0000-000000000001";

type SaveState = "idle" | "saving" | "testing" | "success" | "error";

export function ProviderKeyConsole() {
  const [provider, setProvider] = useState("openai");
  const [providerKey, setProviderKey] = useState("");
  const [rotationDays, setRotationDays] = useState("30");
  const [state, setState] = useState<SaveState>("idle");
  const [message, setMessage] = useState("Ready to save an encrypted workspace-scoped key.");

  async function saveProviderKey() {
    setState("saving");
    setMessage("Encrypting and saving provider key...");

    try {
      const response = await fetch("/api/provider-keys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId: defaultWorkspaceId,
          provider,
          providerKey,
          actorId: "system_owner",
          rotationDays: Number(rotationDays)
        })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ? JSON.stringify(payload.error) : "Unable to save provider key.");
      }

      setProviderKey("");
      setState("success");
      setMessage(`Saved ${payload.key.provider} with safe hint ${payload.key.key_hint}.`);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Unable to save provider key.");
    }
  }

  async function testProviderKey() {
    setState("testing");
    setMessage("Running provider health check...");

    try {
      const response = await fetch("/api/provider-keys/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workspaceId: defaultWorkspaceId,
          provider,
          actorId: "system_owner",
          dryRun: true
        })
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error ? JSON.stringify(payload.error) : "Unable to test provider key.");
      }

      setState(payload.result.status === "connected" ? "success" : "error");
      setMessage(payload.result.message);
    } catch (error) {
      setState("error");
      setMessage(error instanceof Error ? error.message : "Unable to test provider key.");
    }
  }

  const isBusy = state === "saving" || state === "testing";
  const canSave = provider.trim().length > 1 && providerKey.trim().length >= 8 && !isBusy;

  return (
    <div className="rounded-2xl border border-white/10 bg-background/60 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Live key console</h3>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">Save and test one encrypted workspace key.</p>
        </div>
        <KeyRound size={18} className="text-primary" />
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-[0.7fr_1.3fr_0.55fr]">
        <Input value={provider} onChange={(event) => setProvider(event.target.value)} aria-label="Provider name" />
        <Input
          value={providerKey}
          onChange={(event) => setProviderKey(event.target.value)}
          placeholder="Paste provider API key"
          type="password"
          aria-label="Provider API key"
        />
        <Input
          value={rotationDays}
          onChange={(event) => setRotationDays(event.target.value)}
          inputMode="numeric"
          aria-label="Rotation days"
        />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button size="sm" className="gap-2" onClick={saveProviderKey} disabled={!canSave}>
          {state === "saving" ? <Loader2 size={14} className="animate-spin" /> : <KeyRound size={14} />}
          Save encrypted key
        </Button>
        <Button size="sm" variant="secondary" className="gap-2" onClick={testProviderKey} disabled={isBusy}>
          {state === "testing" ? <Loader2 size={14} className="animate-spin" /> : <TestTube2 size={14} />}
          Run health test
        </Button>
        <span
          className={
            state === "error"
              ? "text-xs text-warning"
              : state === "success"
                ? "text-xs text-primary"
                : "text-xs text-muted-foreground"
          }
        >
          {message}
        </span>
      </div>
    </div>
  );
}
