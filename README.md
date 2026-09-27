# svnair.dev

Source for [svnair.dev](https://svnair.dev), my personal site. It is a static Next.js export served by Nginx, running in rootful Podman behind Traefik.

## Stack

- Next.js 16 with `output: "export"` (static HTML, no server code)
- React 19 and TypeScript
- Tailwind CSS v4, with tokens in `app/globals.css`
- JetBrains Mono for all text, loaded through `next/font`
- Phosphor icons
- Bun for installs and scripts
- Nginx (Alpine) in a container, run by Podman Quadlet units, with Traefik in front
- Umami analytics (optional)

## Pages

- `/` has the hero, projects, experience, and contact sections, in that order.
- `/photography` shows five photos a day, picked by a seeded shuffle keyed to the UTC date.
- `/resume` embeds `/resume.pdf`.
- `/projects` redirects to `/#projects`. It exists so old links still work.

## Editing content

| What | Where |
|---|---|
| Work history | `experience.json` |
| Projects | `projects.json` |
| Name, email, social links | `lib/config.ts` |
| Bio | `components/sections/Hero.tsx` |

In `experience.json`, consecutive entries with the same `company` render as one block with several roles. Each name in `technologies` becomes a colored tag. The color comes from a hash of the name, so a technology has the same color everywhere on the site.

CI fails the build if site copy contains an em dash. Use commas, periods, or parentheses instead.

## Theme

Colors are CSS custom properties set with `light-dark()` in `app/globals.css`, so one set of tokens covers both themes. Components use the Tailwind names (`bg-bg`, `text-text-muted`, `text-accent`, and so on) and never raw hex values.

On a first visit the site follows the system `prefers-color-scheme` setting. The sun/moon button in the nav stores the visitor's choice in `localStorage`, and a small script in `app/layout.tsx` applies it before first paint.

Every text and tag pair meets WCAG AA (4.5:1) in both themes. Light-mode accent text on a surface uses `--accent-ink`, a darker shade, because the base accent is only 3.97:1 there.

## Local development

Requires [Bun](https://bun.sh).

```bash
bun install
bun dev          # http://localhost:3000
bun run lint
bun run build    # static site in out/
```

`public/profile.jpg`, `public/resume.pdf`, and `public/photography/` are gitignored. Put local copies there to see them in dev.

## Photography

The photo folder is mounted into the container at runtime, so the build never sees the photos. Instead, Nginx serves a JSON listing of `/photography/` (`autoindex_format json` in `nginx.conf`). The gallery fetches that list in the browser and picks the day's five.

To add photos, copy them to `/root/PersonalBlog/public/photography/` on the server. They appear on the next page load. No rebuild or restart is needed. Subfolders are not shown and their listings return 404, but files inside them can still be fetched by exact URL, so keep only publishable photos there. Alt text comes from the filename (`sunset_ridge.jpg` becomes "sunset ridge").

In `bun dev` there is no Nginx, so the page falls back to the list it read from `public/photography/` at render time.

## Deployment

`.github/workflows/deploy.yml` runs on every push and pull request to `main`:

1. `test`: install, lint, em dash check, and build. This runs on pull requests too.
2. `build-and-push`: builds the Docker image and pushes it to GHCR. Runs only on pushes to `main`.
3. `deploy`: connects to the server over SSH, runs `git pull`, copies `quadlet/*` into `/etc/containers/systemd/`, reloads systemd, and restarts `portfolio.service`. The unit sets `Pull=newer`, so the restart pulls the new image.

The `Dockerfile` has two stages. Bun builds `out/`, and `nginx:alpine` serves it.

On the server, three paths are mounted into the container read-only (see `quadlet/portfolio.container`):

| Server path | Served at |
|---|---|
| `/root/PersonalBlog/public/profile.jpg` | `/profile.jpg` |
| `/root/PersonalBlog/public/photography/` | `/photography/` |
| `/root/PersonalBlog/data/resume.pdf` | `/resume.pdf` |

Replacing any of these files takes effect immediately.

Traefik terminates TLS using the ACME DNS-01 challenge, because Cloudflare proxies the origin and the other challenge types cannot reach it. It reads `CF_DNS_API_TOKEN` from `/root/PersonalBlog/.env` on the server.

### Repository secrets

| Secret | Used for |
|---|---|
| `HOST`, `USERNAME`, `SSH_PRIVATE_KEY`, `PORT` (optional) | SSH deploy |
| `DEPLOY_PATH` (optional, default `/root/PersonalBlog`) | Checkout path on the server |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID`, `NEXT_PUBLIC_UMAMI_API_URL` | Analytics, baked in at build time |

## License

MIT
