"use client";

import { Moon, Sun } from "@phosphor-icons/react";

// Light by default; the toggle stores "dark" or clears the key. No React
// state: the `dark:` variant in globals.css picks the icon, so the server
// render is already correct and there is nothing to hydrate.
export default function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    const apply = () => {
      if (next === "dark") root.dataset.theme = "dark";
      else delete root.dataset.theme;
      try {
        if (next === "dark") localStorage.setItem("theme", "dark");
        else localStorage.removeItem("theme");
      } catch {}
    };
    // One even cross-fade of the whole page (timing in globals.css).
    // Browsers without view transitions, or with reduced motion on, switch instantly.
    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      apply();
      return;
    }
    // The browser skips the animation (but still applies the theme) if the tab
    // is hidden mid-switch; `ready` then rejects, which is expected.
    document.startViewTransition(apply).ready.catch(() => {});
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="grid h-11 w-11 place-items-center rounded-full border border-line bg-bg transition-colors hover:border-accent hover:text-accent-ink"
    >
      <Moon size={20} aria-hidden className="dark:hidden" />
      <Sun size={20} aria-hidden className="hidden dark:block" />
      <span className="sr-only dark:hidden">Switch to dark theme</span>
      <span className="sr-only hidden dark:inline">Switch to light theme</span>
    </button>
  );
}
