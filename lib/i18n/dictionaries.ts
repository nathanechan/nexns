export type Locale = "en" | "zh";

export const dictionaries = {
  en: {
    language: "Language",
    product: "nexns",
    nav: {
      chat: "Chat",
      dashboard: "Dashboard",
      admin: "Admin",
      workspace: "Workspace",
      providers: "Providers",
      policy: "Policy",
      share: "Share",
      pricing: "Pricing"
    },
    shell: {
      eyebrow: "AI routing control plane",
      description: "Unified access, route policy, cost governance, and provider health monitoring.",
      command: "Search routes, providers, policies...",
      status: "Live system",
      signIn: "Sign in"
    }
  },
  zh: {
    language: "\u8bed\u8a00",
    product: "nexns",
    nav: {
      chat: "\u804a\u5929",
      dashboard: "\u4eea\u8868\u76d8",
      admin: "\u540e\u53f0",
      workspace: "\u56e2\u961f",
      providers: "\u4f9b\u5e94\u5546",
      policy: "\u7b56\u7565",
      share: "\u5206\u4eab",
      pricing: "\u5b9a\u4ef7"
    },
    shell: {
      eyebrow: "AI \u8def\u7531\u63a7\u5236\u5e73\u9762",
      description: "\u7edf\u4e00\u5165\u53e3\u3001\u8def\u7531\u7b56\u7565\u3001\u6210\u672c\u6cbb\u7406\u4e0e\u4f9b\u5e94\u5546\u5065\u5eb7\u76d1\u63a7\u3002",
      command: "\u641c\u7d22\u8def\u7531\u3001\u4f9b\u5e94\u5546\u3001\u7b56\u7565...",
      status: "\u8fd0\u884c\u4e2d",
      signIn: "\u767b\u5f55"
    }
  }
} as const;
