import { cn } from "@/lib/utils";

type StatusTone = "success" | "warning" | "neutral" | "primary";

const toneStyles: Record<StatusTone, string> = {
  success: "border-success/25 bg-success/10 text-success",
  warning: "border-warning/25 bg-warning/10 text-warning",
  neutral: "border-white/15 bg-white/[0.06] text-muted-foreground",
  primary: "border-primary/25 bg-primary/10 text-primary"
};

export function StatusChip({
  children,
  tone = "neutral",
  pulse = false,
  className
}: {
  children: React.ReactNode;
  tone?: StatusTone;
  pulse?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-8 items-center gap-2 rounded-full border px-3 text-xs font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]",
        toneStyles[tone],
        className
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "success" ? "bg-success" : tone === "warning" ? "bg-warning" : tone === "primary" ? "bg-primary" : "bg-muted-foreground",
          pulse ? "animate-pulse" : ""
        )}
      />
      {children}
    </span>
  );
}
