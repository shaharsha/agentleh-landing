# agentleh-landing

Marketing landing page for [Agentiko](https://agentiko.io) — Hebrew-first WhatsApp AI agent.

Operational detail in [CLAUDE.md](CLAUDE.md). Brand spec in [../BRAND.md](../BRAND.md).

## Stack

React 19 + TypeScript + Vite 8, pre-rendered with `vite-react-ssg` to static HTML. Tailwind CSS 4. Hebrew-first (base locale) with English opt-in via Paraglide 2 ([messages/](messages/)).

## Environments

| | URL | Branch | Cloud Run service |
|---|---|---|---|
| Prod | [agentiko.io](https://agentiko.io) | `main` | `agentleh-landing` |
| Dev | [dev.agentiko.io](https://dev.agentiko.io) | `develop` | `agentleh-landing-dev` |

Both routed via the shared Global HTTPS LB (`34.111.24.95`). Container is a multi-stage `node:22-alpine` build (Paraglide compile + Vite SSG) → `nginx:alpine` serving `dist/`.

## Running locally

```bash
npm install        # runs paraglide:compile via postinstall
npm run dev        # :5173
```

Env: `VITE_APP_URL` (default `https://app.agentiko.io`).

## Deploy

GitHub Actions + Workload Identity Federation. Push to `develop` → dev; merge to `main` → prod.

## License

Private.
