# Personal Portfolio

A modern, responsive personal portfolio built with Astro, React, and TypeScript. Features smooth animations, glass morphism design, and optimized performance.

## Features

- Built with Astro for optimal performance
- Modern glass morphism design with custom color palette
- Mobile-first responsive design
- Smooth animations with CSS transitions
- TypeScript for better development experience
- SEO optimized with proper meta tags

## Tech Stack

- **Framework**: Astro + React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Package Manager**: Bun
- **Build Tool**: Vite (via Astro)

## Quick Start

### Prerequisites

- Bun (recommended) or Node.js 18+
- Git

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd PersonalBlog

# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Preview production build
bun run preview
```

## Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
src/
├── components/          # React components
│   ├── Navigation.tsx   # Navigation component
│   ├── PageTransition.tsx # Page transition animations
│   └── ProjectCard.tsx  # Project card component
├── layouts/             # Astro layouts
│   └── Layout.astro     # Base layout with meta tags
├── pages/               # Astro pages (file-based routing)
│   ├── index.astro      # Home page (About & Projects)
│   ├── photography.astro # Photography showcase
│   └── resume-contact.astro # Resume & Contact
├── styles/              # Global styles
│   └── global.css       # Global CSS with custom animations
└── utils/               # Utility functions
    └── smoothScroll.ts  # Smooth scrolling functionality
```

## Pages

### Home (About & Projects)
- Hero section with animated profile area
- About section with skills showcase
- Featured projects with interactive cards
- Smooth scrolling navigation

### Photography
- Coming soon page with Instagram API integration setup
- Animated camera icons and floating elements
- Links to social media platforms

### Resume & Contact
- Downloadable resume section
- Contact form with validation
- Social media links
- Professional information display

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`                 | Starts local dev server at `localhost:4321`     |
| `bun build`               | Build your production site to `./dist/`         |
| `bun preview`             | Preview your build locally, before deploying    |
| `bun astro ...`           | Run CLI commands like `astro add`, `astro check`|
| `bun astro -- --help`     | Get help using the Astro CLI                    |

## Customization

### Colors
The design uses a carefully curated color scheme defined in `tailwind.config.js`:

- **Raisin Black** (`#141423`) - Main background color
- **Ivory** (`#F1FEC6`) - Primary text color
- **Scarlet** (`#FF3A20`) - Accent color for buttons and highlights
- **Air Superiority Blue** (`#74A4BC`) - Secondary accent
- **Ash Gray** (`#B6D6CC`) - Muted text and subtle accents

### Content
Update the content in the respective page files:

- `src/pages/index.astro` - Home page content and projects
- `src/pages/photography.astro` - Photography page
- `src/pages/resume-contact.astro` - Resume and contact information

## Deployment

### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Netlify
```bash
# Build
bun run build

# Deploy dist/ folder to Netlify
```

Built with Astro, React, and TypeScript.
