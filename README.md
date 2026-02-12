# Personal Portfolio

A statically exported personal portfolio site built with Next.js 15, styled with Tailwind CSS v4, and animated with Framer Motion. Served via Nginx in Docker, with optional Traefik for HTTPS.

## Tech Stack

- **Framework:** Next.js 15 (static export via `output: 'export'`)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion
- **Runtime / Package Manager:** Bun
- **Serving:** Nginx (Alpine)
- **Deployment:** Docker + Traefik (Let's Encrypt TLS)
- **Analytics:** Umami (self-hosted, optional)

## Project Structure

```
app/                  # Next.js app router pages and layouts
  layout.tsx          # Root layout, fonts, analytics script
  page.tsx            # Home page (hero, about, experience, projects)
  projects/page.tsx   # Projects listing
  photography/page.tsx # Photography gallery
components/           # Client components (Navbar, SectionNav, PhotoGallery, etc.)
lib/                  # Utilities (config, photo loader, seeded shuffle)
experience.json       # Work experience data
projects.json         # Project data
public/photography/   # Photo directory (volume-mounted in production)
```

## Local Development

Requires [Bun](https://bun.sh) installed.

```bash
bun install
bun run dev
```

The dev server starts at `http://localhost:3000` with Turbopack enabled.

## Building

```bash
bun run build
```

This produces a fully static site in the `out/` directory.

## Deployment

### Docker (recommended)

The included `Dockerfile` runs a two-stage build: Bun installs dependencies and builds the site, then the static output is copied into an Nginx Alpine image.

```bash
docker build -t portfolio .
docker run -p 80:80 portfolio
```

### Docker Compose with Traefik

The `docker-compose.yml` sets up the portfolio behind Traefik with automatic Let's Encrypt certificates. Before running:

1. Create the external Traefik network: `docker network create traefik`
2. Update the domain and email in `docker-compose.yml`
3. Optionally set analytics env vars in a `.env` file

```env
NEXT_PUBLIC_UMAMI_WEBSITE_ID=your-website-id
NEXT_PUBLIC_UMAMI_API_URL=https://your-umami-instance.com
NEXT_PUBLIC_ANALYTICS_ENABLED=true
```

Then start everything:

```bash
docker compose up -d
```

Photography images are volume-mounted from `public/photography/` into the Nginx container, so photos can be updated without rebuilding.

### CI/CD

A GitHub Actions workflow (`.github/workflows/deploy.yml`) handles automated builds and deployment. Add the required secrets to your repository settings.

## License

MIT
