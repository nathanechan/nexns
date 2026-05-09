import { cn } from "@/lib/utils";

export function Badge({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/[0.13] bg-white/[0.075] px-2.5 py-1 text-xs font-medium text-muted-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-md",
        className
      )}
    >
      {children}
    </span>
  );
}
