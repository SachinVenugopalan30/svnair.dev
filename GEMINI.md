# GEMINI.md - Project Documentation

This file provides a detailed overview of the Personal Portfolio project, including its structure, technologies, and key components.

## Project Overview

This project is a modern, responsive personal portfolio website built with Astro, React, and TypeScript. It features a "glassmorphism" design, smooth animations, and a focus on performance and SEO. The portfolio showcases the developer's projects, work experience, and photography.

## Tech Stack

- **Framework:** Astro
- **UI Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion, GSAP
- **Analytics:** Umami
- **Package Manager:** Bun
- **Deployment:** Docker, Nginx, Traefik

## Project Structure

```
/Users/sachin/Desktop/Codes/PersonalBlog/
├───.dockerignore
├───.DS_Store
├───.env.example
├───.gitignore
├───astro-icon-light-gradient.svg
├───astro.config.mjs
├───bun.lock
├───deploy-simple.sh
├───deploy.sh
├───DEPLOYMENT-DETAILED.md
├───DEPLOYMENT.md
├───docker-compose.prod.yml
├───docker-compose.simple.yml
├───docker-compose.yml
├───Dockerfile
├───experience.json
├───nginx.conf
├───package.json
├───README.md
├───server-setup.sh
├───tailwind.config.js
├───TODO.md
├───tsconfig.json
├───.astro/
├───.git/
├───.github/
│   └───workflows/
│       └───deploy.yml
├───dist/
├───node_modules/
├───public/
│   ├───apple-touch-icon.png
│   ├───favicon-16x16.png
│   ├───favicon-32x32.png
│   ├───favicon.svg
│   ├───site.webmanifest
│   └───images/
├───src/
│   ├───config.ts
│   ├───components/
│   │   ├───AstroLogo.astro
│   │   ├───DynamicGreeting.tsx
│   │   ├───ExperienceTabs.tsx
│   │   ├───Logo.tsx
│   │   ├───Navigation.tsx
│   │   ├───PageTransition.tsx
│   │   ├───ProjectCard.tsx
│   │   ├───ScrollToTop.tsx
│   │   ├───SocialMediaBar.tsx
│   │   └───icons/
│   ├───layouts/
│   │   └───Layout.astro
│   ├───pages/
│   │   ├───index.astro
│   │   └───photography.astro
│   ├───styles/
│   │   └───global.css
│   └───utils/
│       ├───analytics.js
│       ├───analytics.ts
│       ├───analyticsClient.ts
│       └───smoothScroll.ts
└───temp_files/
```

### Root Directory

- **`.dockerignore`**: Specifies files to be excluded from the Docker build.
- **`.env.example`**: Example environment variables file.
- **`.gitignore`**: Specifies files to be ignored by Git.
- **`astro.config.mjs`**: Astro configuration file.
- **`bun.lock`**: Bun lock file.
- **`deploy-simple.sh`**, **`deploy.sh`**: Deployment scripts.
- **`DEPLOYMENT-DETAILED.md`**, **`DEPLOYMENT.md`**: Detailed deployment documentation.
- **`docker-compose.prod.yml`**, **`docker-compose.simple.yml`**, **`docker-compose.yml`**: Docker Compose files for different environments.
- **`Dockerfile`**: Dockerfile for building the production image.
- **`experience.json`**: JSON file containing work experience data.
- **`nginx.conf`**: Nginx configuration file.
- **`package.json`**: Node.js project manifest.
- **`README.md`**: Project README file.
- **`server-setup.sh`**: Server setup script.
- **`tailwind.config.js`**: Tailwind CSS configuration file.
- **`TODO.md`**: A file with a list of to-dos.
- **`tsconfig.json`**: TypeScript configuration file.

### `src` Directory

- **`config.ts`**: Configuration file for the application.
- **`components/`**: Contains reusable React and Astro components.
- **`layouts/`**: Contains Astro layout components.
- **`pages/`**: Contains the pages of the website.
- **`styles/`**: Contains global styles.
- **`utils/`**: Contains utility functions.

## Key Components

### `Layout.astro`

The main layout component for the application. It includes:

- SEO meta tags
- Favicon and theme color
- A privacy-focused Umami analytics implementation
- A page load animation
- A custom scrollbar and animated background

### `Navigation.tsx`

A responsive navigation component with:

- A "glassmorphism" effect that changes on scroll
- Smooth scrolling to anchor links
- A separate design for desktop and mobile

### `ProjectCard.tsx`

A card component for displaying projects with:

- Animations using Framer Motion
- A placeholder for projects without images
- Links to GitHub and live demos

### `ExperienceTabs.tsx`

A component for displaying work experience in a tabbed interface.

### `DynamicGreeting.tsx`

A component that likely displays a dynamic greeting on the home page.

## Deployment

The project is deployed using Docker and Traefik. The `DEPLOYMENT.md` file provides a detailed guide on how to deploy the application, including a one-command deployment script. The deployment setup includes:

- Automatic HTTPS with Let's Encrypt
- Nginx with security headers and caching
- A health check endpoint
