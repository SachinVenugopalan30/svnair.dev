
# Project Context: Personal Portfolio

This document provides a summary of the personal portfolio project.

## Project Overview

This is a modern, responsive personal portfolio built with Astro, React, and Tailwind CSS. It features smooth animations, a glass morphism design, and is optimized for performance.

### Key Features

- **Fast Performance**: Built with Astro.
- **Modern Design**: Glass morphism with a custom color palette.
- **Responsive**: Mobile-first design.
- **Animations**: Uses Framer Motion and custom CSS animations.
- **Accessible**: WCAG compliant.
- **Typed**: Fully typed with TypeScript.
- **SEO Optimized**: Includes meta tags and structured data.

## Tech Stack

- **Framework**: Astro & React
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion & GSAP
- **Package Manager**: Bun
- **Build Tool**: Vite (via Astro)

### Dependencies

- `@astrojs/react`: React integration for Astro.
- `framer-motion`: For animations.
- `gsap`: For animations.
- `tailwindcss`: For styling.

## Project Structure

The project is organized as follows:

```
src/
├── components/          # React components
├── layouts/             # Astro layouts
├── pages/               # Astro pages (file-based routing)
├── styles/              # Global styles
└── utils/               # Utility functions
```

### Pages

- **Home (`index.astro`)**: About and Projects sections.
- **Photography (`photography.astro`)**: Photography showcase.
- **Resume & Contact (`resume-contact.astro`)**: Resume and contact information.

## Getting Started

### Prerequisites

- Bun or Node.js 18+
- Git

### Installation and Usage

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SachinVenugopalan30/portfolio
    cd portfolio
    ```

2.  **Install dependencies:**
    ```bash
    bun install
    ```

3.  **Run the development server:**
    ```bash
    bun run dev
    ```

4.  **Build for production:**
    ```bash
    bun run build
    ```

5.  **Preview the production build:**
    ```bash
    bun run preview
    ```
