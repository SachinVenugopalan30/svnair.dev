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

**Stack:** Next.js 16 (static export) + React 19 + Tailwind CSS v4 + Phosphor icons, built with Bun. No animation library: motion is CSS plus one small rAF loop for the photo reel (see Styling).

**Output:** `next build` produces `out/` (not `dist/`). The site is fully static — no server-side rendering, no API routes. `next.config.ts` sets `output: "export"`, `images.unoptimized: true`, and `agentRules: false` (stops `next dev` from appending a block to this file).

**Pages:**
- `/`: Hero → Photos → Projects → Experience → Contact. Sections in `components/sections/` are server components; the hero's contour map (`components/ContourMap.tsx`, generator in `lib/contours.ts`) and the photo reel (`components/PhotoReel.tsx`) are client components.
- Hero: a contour map of one of ten famous mountains, picked at random per visit and named in the caption. Heights are stylised, not real terrain; the caption says "a model of". Lines trace in on load and fade out as the hero scrolls away (`view()` timeline, so `.hero` must stay `overflow: clip`, not `hidden`).
- Photos: today's five in one level row that drifts slowly and loops (the set is rendered twice; the copy is `inert` and `aria-hidden`). Hover, touch, focus and the pause button stop it; reduced motion never starts it.
- `/projects`: meta-refresh stub to `/#projects` (static export cannot 301), `noindex`.
- `/photography`: daily five photos as tilted, borderless prints "tossed" onto a table (hand-placed `SLOTS` in `components/PhotoGallery.tsx`, `.toss` keyframes in globals.css; single tilted column on mobile), native `<dialog>` lightbox with arrow-key navigation.
- `/resume`: embeds `/resume.pdf`.

**Content data:** `experience.json` and `projects.json` at project root are the only data files. Edit these to update content. Projects show newest first (highest `id`); each needs an `image` (previews live in `public/images/work/`). Personal info (name, email, social links) lives in `lib/config.ts`.

**Photography:** the directory is volume-mounted at runtime, so it is empty at build time. `nginx.conf` serves `/photography/` as a JSON listing (`autoindex_format json`); `components/PhotoGallery.tsx` fetches it and picks five with `pickDaily` (`lib/photos.ts`, seeded PRNG from `lib/seededShuffle.ts` keyed by UTC date). In `bun dev` the fetch fails and the page falls back to an `fs.readdirSync` list (`lib/photos.server.ts`). `lib/photos.ts` must stay client-safe (no `fs`). Captions come from an optional `captions.json` in the same folder (`{"file.jpg": "Caption"}`); a missing entry falls back to the filename, title-cased.

**Styling:** Tailwind CSS v4, configured in `app/globals.css` (no JS config).
- Palette: raw values on `:root` via `light-dark(light, dark)`; `color-scheme` picks the side. Light is the default and the system preference is ignored (user choice); only `:root[data-theme="dark"]` switches to dark. `@theme inline` maps them to `bg`, `surface`, `text`, `text-muted`, `accent`, `accent-ink`, `on-accent`, `line`. Never hardcode hex in components.
- Moss palette, chosen by the user. Light: bg #DFE5D8, surface #EEF1E9, text #22301F, muted #4F5D4A, accent (teal) #0F5E63. Dark: #131912, #1B2319, #DFE5D8, #A5B09A, #72C4BE. Contour lines use `--contour` / `--contour-index`.
- `dark:` is a custom variant matching `:root[data-theme="dark"]`.
- Motion: the contour trace is the one authored moment; the theme switch is a view-transition cross-fade. Honor reduced motion everywhere.

**Theme toggle:** `components/ThemeToggle.tsx` sets `data-theme="dark"` and `localStorage.theme = "dark"`, or clears both for light; an inline script in `app/layout.tsx` applies a saved dark before paint. The icon swap is pure CSS, so the toggle has no React state.

**Logo:** "summit rings" (three contour rings on a teal tile). `components/Logo.tsx` draws it with theme tokens; `public/favicon.svg` is the fixed-colour master, and the PNG/ICO icons are rendered from it.

**Fonts:** Young Serif (headings, `font-serif`) and Work Sans (body, `font-sans`), via `next/font/google` in `app/layout.tsx`.

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
- **Typography:** Young Serif for headings, Work Sans for everything else (user choice). No third family.
- **Color & Theme:** Moss ground with one teal accent, light by default with a dark option. Use the tokens; keep one accent.
- **Motion:** One authored moment (the contour trace) plus the drifting photo reel. Prefer CSS over JS animation; honor reduced motion.
- **Backgrounds:** The contour map is the texture; sections sit on flat moss with a tone step (`surface`) for the projects sheet.

Interpret creatively and make unexpected choices that feel genuinely designed for the context.
