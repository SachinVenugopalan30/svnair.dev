# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server with Turbopack
bun run build    # Static export to out/
bun run lint     # ESLint
```

No test suite exists in this project.

## Architecture

**Stack:** Next.js 15 (static export) + React 19 + Tailwind CSS v4 + Framer Motion, built with Bun.

**Output:** `next build` produces `out/` (not `dist/`). The site is fully static — no server-side rendering, no API routes. `next.config.ts` sets `output: "export"` and `images.unoptimized: true`.

**Pages:**
- `/` — Single-page portfolio (Hero → About → Experience → Contact sections)
- `/projects` — Projects grid from `projects.json`
- `/photography` — Masonry photo gallery with lightbox

**Content data:** `experience.json` and `projects.json` at project root are the only data files. Edit these to update content. Personal info (name, email, social links) lives in `lib/config.ts`.

**Photography:** `lib/photos.ts` reads `public/photography/` at build time using `fs.readdirSync`. On production the directory is volume-mounted (empty at build time). Daily rotation uses a seeded PRNG (`lib/seededShuffle.ts`) keyed by UTC date.

**Styling:** Tailwind CSS v4 — uses `@theme` block in `app/globals.css` instead of a JS config file. Design tokens are CSS variables referenced throughout:
- Colors: `--color-bg` (#0A0A0B), `--color-surface` (#141416), `--color-text` (#E8E4E0), `--color-accent` (#C4503A)
- Fonts: `--font-heading` (IBM Plex Serif), `--font-body` (Outfit), `--font-mono` (JetBrains Mono)

**Fonts:** Loaded via `next/font/google` in `app/layout.tsx`, injected as CSS variables (`--font-display`, `--font-outfit`, `--font-jetbrains`) on `<html>`, then mapped to semantic tokens in `@theme`.

**Analytics:** Umami via a single `<Script>` tag in `layout.tsx`. Requires `NEXT_PUBLIC_UMAMI_WEBSITE_ID` and `NEXT_PUBLIC_UMAMI_API_URL` env vars (passed as Docker build args in CI).

## Deployment

CI/CD via `.github/workflows/deploy.yml`: push to `main` → build test → Docker image pushed to GHCR → SSH deploy to server running `docker-compose.prod.yml`. The Dockerfile is a two-stage build: Bun builder → Nginx serving `out/`.

## Frontend Aesthetics

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Focus on:
- **Typography:** Choose beautiful, distinctive fonts. The current stack (IBM Plex Serif + Outfit) has character — preserve it.
- **Color & Theme:** Commit to the dark, warm aesthetic. Use the existing CSS variables. The burnt sienna accent (#C4503A) is intentional — don't dilute it.
- **Motion:** Use Framer Motion for React animations. Prioritize high-impact moments: staggered page-load reveals over scattered micro-interactions.
- **Backgrounds:** Create depth with layered CSS gradients (see `body::before` in `globals.css`), not solid fills.

Interpret creatively and make unexpected choices that feel genuinely designed for the context.
