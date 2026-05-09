import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "border border-primary/30 bg-primary text-primary-foreground shadow-glow hover:bg-primary/90 hover:shadow-[0_0_38px_rgba(20,184,166,0.32)] disabled:bg-primary/50",
  secondary:
    "border border-white/[0.12] bg-white/[0.075] text-foreground shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] hover:border-primary/25 hover:bg-white/[0.12]",
  ghost: "text-muted-foreground hover:bg-white/[0.08] hover:text-foreground",
  danger: "border border-red-400/20 bg-red-500/[0.15] text-red-200 hover:bg-red-500/25"
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 gap-2 px-3 text-sm",
  md: "h-10 gap-2 px-4 text-sm",
  lg: "h-12 gap-2 px-5 text-base",
  icon: "h-10 w-10 p-0"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "focus-ring inline-flex shrink-0 items-center justify-center rounded-md font-medium transition disabled:cursor-not-allowed",
          "duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 disabled:hover:translate-y-0",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
