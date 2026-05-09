"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="glass-panel route-scan max-w-lg rounded-2xl p-8 text-center shadow-panel">
        <p className="text-sm uppercase tracking-[0.28em] text-warning">Runtime guard</p>
        <h1 className="mt-4 text-2xl font-semibold">Something interrupted this workspace.</h1>
        <p className="mt-3 text-sm text-muted-foreground">{error.message}</p>
        <Button className="mt-6" onClick={reset}>
          Try again
        </Button>
      </section>
    </main>
  );
}
