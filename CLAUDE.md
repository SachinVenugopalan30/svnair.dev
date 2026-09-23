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

CI/CD via `.github/workflows/deploy.yml`: push to `main` → build test → Docker image pushed to GHCR → SSH deploy (key auth) to the server. The Dockerfile is a two-stage build: Bun builder → Nginx serving `out/`.

**Runtime:** the server runs **rootful Podman with Quadlet**, not Docker Compose. Unit files live in `quadlet/` and are copied to `/etc/containers/systemd/` by the deploy job; systemd generates the services from them. Deploy is `systemctl restart portfolio.service` — the unit sets `Pull=newer`, so the restart pulls the new image itself. Image names must be fully qualified (`docker.io/library/traefik:latest`); Podman has no implicit Docker Hub fallback.

Quadlet does no variable interpolation, so the domain and ACME email are literals in `quadlet/*.container` rather than `${DOMAIN}`-style refs. Changing either means editing the unit file.

Traefik's Docker provider reads `/run/podman/podman.sock` (requires `systemctl enable --now podman.socket`) mounted at the Docker socket path.

**TLS:** the origin is behind Cloudflare's proxy, so Traefik uses the ACME **DNS-01** challenge — HTTP-01 and TLS-ALPN-01 cannot reach a proxied origin. Requires `CF_DNS_API_TOKEN` (Cloudflare token scoped to Zone:DNS:Edit) in `/root/PersonalBlog/.env` on the server, read via the unit's `EnvironmentFile=`. `.env` is gitignored and exists only on the server.

The Traefik dashboard is bound to loopback (`127.0.0.1:8080`) since `--api.insecure=true` has no auth. Reach it with `ssh -L 8080:127.0.0.1:8080 root@<server>`.

## Resume

The resume is served as a static PDF at `/resume.pdf`, embedded by `/resume`.

- **Production:** The PDF is volume-mounted into the Nginx container from `./data/resume.pdf` (relative to `docker-compose.prod.yml` on the server). Upload a new resume directly to the server via rsync/scp — no rebuild or container restart is required.
- **Local development:** A placeholder `public/resume.pdf` is used by `bun dev`. It is gitignored and not deployed.

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
