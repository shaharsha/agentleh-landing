# agentleh-landing

Marketing landing page for [agentiko.io](https://agentiko.io). Hebrew-first (base locale `he`) with English opt-in, served as static HTML from an nginx Cloud Run container. Architecture + brand live in the parent [CLAUDE.md](../CLAUDE.md) and [BRAND.md](../BRAND.md).

## Stack

- **React 19 + TypeScript + Vite 8**, pre-rendered with [vite-react-ssg](https://github.com/unjs/vite-react-ssg) → static HTML per route. `npm run build` emits a ready-to-serve `dist/` that the runtime just hands to nginx.
- **Tailwind CSS 4** via `@tailwindcss/vite` (no PostCSS). Shared `glass-*` / `btn-*` / `section-*` classes with the app — see [app/CLAUDE.md](../app/CLAUDE.md) "Design System" for the full list.
- **Paraglide 2** (`@inlang/paraglide-js`) for i18n. Base locale `he`, secondary `en`; messages in [messages/he.json](messages/he.json) + [messages/en.json](messages/en.json), project config in [project.inlang/settings.json](project.inlang/settings.json). Compiler runs via `npm run paraglide:compile` (invoked automatically from `postinstall` and `build`) and emits [src/paraglide/](src/paraglide/) — do not hand-edit that output.
- **react-router-dom 6** for the three routes: `/` ([Home](src/pages/Home.tsx)), `/terms` ([Terms](src/pages/Terms.tsx)), `/privacy` ([Privacy](src/pages/Privacy.tsx)).

## Pages

`src/Layout.tsx` is the shared shell (header + footer + language switcher). `src/pages/Home.tsx` is the single-page marketing page; `Terms` and `Privacy` are long-form legal pages rendered from the same Layout.

## Bilingual routing (RTL/LTR)

The landing is **static HTML per locale via Paraglide URL patterns**, not a runtime provider like the app. In the app we have a React i18n context that flips `document.documentElement.dir` on the client; here, each localized build variant ships with the right `lang` + `dir` baked in. `src/i18n/LanguageSwitcher.tsx` swaps between variants; the base-URL convention and redirect rules live in Paraglide's compiled output.

No FOUC safety-net is needed here because there is no dynamic direction flip — the document arrives in the correct script direction from the CDN.

## Assets

- Hero imagery: [public/hero.jpg](public/hero.jpg) (light mode) + [public/hero-dark.jpg](public/hero-dark.jpg) (dark mode), swapped via `<picture>` / `dark:` class pair.
- Brand logos: [public/brand/](public/brand/) — icon + wordmark, light + dark, SVG + PNG. Mirror of [app/frontend/public/brand/](../app/frontend/public/brand/). Source of truth is [BRAND.md](../BRAND.md) at the parent repo root; asset regeneration is documented in [BRAND.html](../BRAND.html).

## Running locally

```bash
npm install                    # runs paraglide:compile via postinstall
npm run dev                    # Vite dev server on :5173
```

Env (`frontend/.env` or shell):
- `VITE_APP_URL` — app URL for the CTA buttons (default `https://app.agentiko.io`)

From the repo root you can also run `uv run landing` (the root orchestrator documented in [parent CLAUDE.md](../CLAUDE.md) "Local dev") to boot landing alongside the app.

## Production

Container is a multi-stage build: `node:22-alpine` (Paraglide compile + Vite SSG build) → `nginx:alpine` serving `dist/` with SPA fallback. See [Dockerfile](Dockerfile) + [nginx.conf](nginx.conf).

| | Dev (`develop`) | Prod (`main`) |
|---|---|---|
| Cloud Run service | `agentleh-landing-dev` | `agentleh-landing` |
| Public URL | [dev.agentiko.io](https://dev.agentiko.io) | [agentiko.io](https://agentiko.io) / [www.agentiko.io](https://www.agentiko.io) |

Both routed via the shared Global HTTPS LB (`34.111.24.95`) with Google-managed TLS.

## CI/CD

GitHub Actions on push to `develop` or `main`:
1. Lint + Paraglide compile + Vite SSG build (type check via `tsc -b`)
2. `gcloud builds submit` → Artifact Registry
3. `gcloud run deploy` to the environment-matching service
4. Curl-verify `/` on the custom hostname

Required GitHub secrets: `GCP_WIF_PROVIDER`, `GCP_DEPLOY_SA`.

## Firebase leftover

[firebase.json](firebase.json) is from an earlier Firebase Hosting deployment before the GCP migration. It's not part of the current deploy path; leave it in place until we're sure nothing references it, then it can be deleted in a cleanup pass.
