# Vercel Deployment

This project is prepared for Vercel deployment with Node 20 and a compatibility install command.

## Why Node 20

Several current dependencies, including Supabase packages, require Node 20. Local installs on Node 18 may hang, warn, or fail depending on network and cache state.

Use Node 20 locally before installing:

```bash
nvm use 20
npm install --legacy-peer-deps
npm run build
```

## Vercel Settings

The project includes `vercel.json`:

```json
{
  "framework": "nextjs",
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev"
}
```

Recommended Vercel project settings:

- Framework Preset: Next.js
- Node.js Version: 20.x
- Install Command: `npm install --legacy-peer-deps`
- Build Command: `npm run build`
- Output Directory: default

## Required Environment Variables

Minimum for a production-like deployment:

```bash
NEXT_PUBLIC_APP_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
BYOK_ENCRYPTION_KEY=
```

Optional integrations:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
XAI_API_KEY=
DEEPSEEK_API_KEY=
OPENROUTER_API_KEY=
```

## Deployment Checklist

1. Push the repository to GitHub.
2. Import the repository in Vercel.
3. Set Node.js Version to 20.x.
4. Add the environment variables above.
5. Deploy.
6. If install still fails, clear Vercel build cache and redeploy.

## Current Local Limitation

In this workspace, `npm run build` is blocked by a local filesystem permission error while resolving `C:\Users\User`. This is a local sandbox issue. The project is configured so Vercel can build it with Node 20.
