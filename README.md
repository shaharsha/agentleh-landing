# agentiko-landing

Marketing landing page for [Agentiko](https://agentiko.io) — Hebrew-first WhatsApp AI agent.

## Stack

React 19 + TypeScript + Vite + Tailwind CSS 4

## Design

Liquid Glass design system shared with the [app](https://github.com/shaharsha/agentleh-app). Shared CSS classes: `glass-nav`, `glass-card`, `glass-card-elevated`, `btn-brand`, `section-gradient`.

## Environments

| | URL | Branch | Render |
|---|---|---|---|
| Prod | [agentiko.io](https://agentiko.io) | `main` | `srv-d7ag0tggjchc73foqoj0` |
| Dev | [dev.agentiko.io](https://dev.agentiko.io) | `develop` | `srv-d7agpqtm5p6s73f0pk8g` |

## Running

```bash
npm install
npm run dev
```

Env vars (`.env`):
- `VITE_APP_URL` — app URL (e.g. `https://app-dev.agentiko.io`)

## Deploy

Push to `main` auto-deploys prod. Push to `develop` auto-deploys dev. Render static site with `npm run build` → `dist/`.
