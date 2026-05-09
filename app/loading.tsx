export default function Loading() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="glass-panel route-scan w-[min(92vw,520px)] rounded-2xl p-8">
        <div className="h-3 w-32 rounded-full bg-white/10" />
        <div className="mt-6 h-8 rounded-full bg-white/10" />
        <div className="mt-4 h-8 w-3/4 rounded-full bg-white/10" />
        <div className="mt-8 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-1/2 animate-pulseTrack bg-primary" />
        </div>
      </div>
    </main>
  );
}
