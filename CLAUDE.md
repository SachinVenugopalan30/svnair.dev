# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun dev          # Start dev server (Turbopack is the default in Next 16)
bun run build    # Static export to out/
bun run lint     # eslint . (flat config in eslint.config.mjs; `next lint` no longer exists)
```

No test suite exists in this project.

## Architecture

**Stack:** Next.js 16 (static export) + React 19 + Tailwind CSS v4 + Phosphor icons, built with Bun. No animation library: motion is CSS (see Styling).

**Output:** `next build` produces `out/` (not `dist/`). The site is fully static — no server-side rendering, no API routes. `next.config.ts` sets `output: "export"`, `images.unoptimized: true`, and `agentRules: false` (stops `next dev` from appending a block to this file).

**Pages:**
- `/`: Hero → Projects → Experience → Contact (`components/sections/`). Sections are server components.
- `/projects`: meta-refresh stub to `/#projects` (static export cannot 301), `noindex`.
- `/photography`: daily five photos as tilted, borderless prints "tossed" onto a table (hand-placed `SLOTS` in `components/PhotoGallery.tsx`, `.toss` keyframes in globals.css; single tilted column on mobile), native `<dialog>` lightbox with arrow-key navigation.
- `/resume`: embeds `/resume.pdf`.

**Content data:** `experience.json` and `projects.json` at project root are the only data files. Edit these to update content. Personal info (name, email, social links) lives in `lib/config.ts`.

**Photography:** the directory is volume-mounted at runtime, so it is empty at build time. `nginx.conf` serves `/photography/` as a JSON listing (`autoindex_format json`); `components/PhotoGallery.tsx` fetches it and picks five with `pickDaily` (`lib/photos.ts`, seeded PRNG from `lib/seededShuffle.ts` keyed by UTC date). In `bun dev` the fetch fails and the page falls back to an `fs.readdirSync` list passed from `app/photography/page.tsx`. `lib/photos.ts` must stay client-safe (no `fs`).

**Styling:** Tailwind CSS v4, configured in `app/globals.css` (no JS config).
- Palette: raw values on `:root` via `light-dark(light, dark)`; `color-scheme` picks the side. `:root[data-theme]` forces a theme, otherwise the system preference applies. `@theme inline` maps them to `bg`, `surface`, `text`, `text-muted`, `accent`, `accent-ink`, `on-accent`, `line`. Never hardcode hex in components.
- Dark: bg #120E18, surface #1E1828, text #ECE8F0, muted #9D94A5, accent #E4B55B. Light: #F4F1F5, #E7E1E9, #211925, #625968, #936514. Chosen by the user.
- Light accent is 3.97:1 on surface, so accent-colored text uses `text-accent-ink` (#7F5711 in light).
- Tech tags: `components/TechPill.tsx` hashes the name to `--tag-0..7-fg/bg`. All pairs checked at >= 4.5:1 in both themes; re-check if you change them.
- `dark:` is a custom variant that follows the same rule as the palette.
- Motion: hero entrance is CSS (`.rise`, `.rise-photo`) so it paints without JS; elements marked `data-build` get a one-time reverse-Tetris entrance (`components/BuildOnScroll.tsx` + `build-rise`/`build-fade` in globals.css). Only JS hides pieces, and only ones below the fold, so no-JS and reduced motion show content as-is. Avoid scroll listeners.

**Theme toggle:** `components/ThemeToggle.tsx` sets `data-theme` and `localStorage.theme`; an inline script in `app/layout.tsx` applies the saved value before paint. The icon swap is pure CSS, so the toggle has no React state.

**Fonts:** JetBrains Mono only, via `next/font/google` in `app/layout.tsx` as `--font-jetbrains`, mapped to `--font-sans` and `--font-mono`.

**Copy rule:** no em dashes anywhere in site copy (user requirement). CI greps `app components lib *.json README.md` and fails on one.

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

- **Production:** The PDF is volume-mounted into the Nginx container from `/root/PersonalBlog/data/resume.pdf` (see `quadlet/portfolio.container`). Upload a new resume to that path with rsync/scp. No rebuild or restart is needed.
- **Local development:** A placeholder `public/resume.pdf` is used by `bun dev`. It is gitignored and not deployed.

## Frontend Aesthetics

Avoid generic AI-generated aesthetics:
- Overused font families (Inter, Roboto, Arial, system fonts)
- Clichéd color schemes (particularly purple gradients on white backgrounds)
- Predictable layouts and component patterns
- Cookie-cutter design that lacks context-specific character

Focus on:
- **Typography:** JetBrains Mono across the whole site is a deliberate user choice. Build hierarchy with weight, size, and tracking, not a second family.
- **Color & Theme:** Dusk violet base with an amber accent, in both light and dark. Use the tokens; keep one accent.
- **Motion:** One authored moment (the hero entrance) plus light scroll reveals. Prefer CSS over JS animation; honor reduced motion.
- **Backgrounds:** Create depth with layered CSS gradients (see `body::before` in `globals.css`), not solid fills.

Interpret creatively and make unexpected choices that feel genuinely designed for the context.
