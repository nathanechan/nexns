import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "focus-ring min-h-24 w-full resize-none rounded-md border border-white/[0.13] bg-white/[0.065] px-4 py-3 text-sm text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition duration-300 placeholder:text-muted-foreground hover:border-white/20 focus:bg-white/[0.08] focus-visible:border-primary/45",
      className
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";
