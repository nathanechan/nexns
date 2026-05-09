import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: "hsl(var(--muted))",
        "muted-foreground": "hsl(var(--muted-foreground))",
        border: "hsl(var(--border))",
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "hsl(var(--primary))",
        "primary-foreground": "hsl(var(--primary-foreground))",
        accent: "hsl(var(--accent))",
        "accent-foreground": "hsl(var(--accent-foreground))",
        success: "hsl(var(--success))",
        warning: "hsl(var(--warning))"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        glow: "0 0 42px rgba(20, 184, 166, 0.24)",
        panel: "0 22px 80px rgba(0, 0, 0, 0.35)",
        soft: "0 18px 70px rgba(0, 0, 0, 0.22)",
        lift: "0 26px 90px rgba(0, 0, 0, 0.34)"
      },
      keyframes: {
        pulseTrack: {
          "0%, 100%": { transform: "translateX(-30%)", opacity: "0.45" },
          "50%": { transform: "translateX(70%)", opacity: "0.95" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" }
        },
        surfaceIn: {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.992)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" }
        },
        breathe: {
          "0%, 100%": { opacity: "0.68", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" }
        }
      },
      animation: {
        pulseTrack: "pulseTrack 2.8s ease-in-out infinite",
        float: "float 5s ease-in-out infinite",
        surfaceIn: "surfaceIn 560ms cubic-bezier(0.16, 1, 0.3, 1) both",
        breathe: "breathe 3.8s cubic-bezier(0.16, 1, 0.3, 1) infinite"
      }
    }
  },
  plugins: []
};

export default config;
