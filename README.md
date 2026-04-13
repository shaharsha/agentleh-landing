# agentiko-landing

Marketing landing page for [Agentiko](https://agentiko.io) — Hebrew-first WhatsApp AI agent.

## Stack

React 19 + TypeScript + Vite + Tailwind CSS 4

## Design

Liquid Glass design system shared with the [app](https://github.com/shaharsha/agentleh-app). Shared CSS classes: `glass-nav`, `glass-card`, `glass-card-elevated`, `btn-brand`, `section-gradient`.

## Environments

| | URL | Branch | Service |
|---|---|---|---|
| Prod | [agentiko.io](https://agentiko.io) | `main` | Cloud Run `agentleh-landing` |
| Dev | [dev.agentiko.io](https://dev.agentiko.io) | `develop` | Cloud Run `agentleh-landing-dev` |

Both served via the shared Global HTTPS LB (`34.111.24.95`) with Google-managed TLS. Container is a multi-stage `node:22-alpine` build → `nginx:alpine` serving the Vite `dist/` with SPA fallback.

## Running

```bash
npm install
npm run dev
```

Env vars (`.env`):
- `VITE_APP_URL` — app URL (e.g. `https://app.agentiko.io`)

## Deploy

GitHub Actions CI/CD with Workload Identity Federation:
1. Lint + Vite build
2. `gcloud builds submit` → Artifact Registry
3. `gcloud run deploy` to prod (on `main`) or dev (on `develop`)
4. Curl-verify the `/` endpoint on the custom hostname

Push to `develop` deploys dev. Merge PR to `main` deploys prod.
