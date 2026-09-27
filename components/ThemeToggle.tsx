"use client";

import { Moon, Sun } from "@phosphor-icons/react";

function isDark(): boolean {
  const set = document.documentElement.dataset.theme;
  if (set) return set === "dark";
  return matchMedia("(prefers-color-scheme: dark)").matches;
}

// No React state: the `dark:` variant in globals.css picks the icon, so the
// server render is already correct and there is nothing to hydrate.
export default function ThemeToggle() {
  function toggle() {
    const next = isDark() ? "light" : "dark";
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };
    // Crossfade the whole page between themes (timing in globals.css).
    // Browsers without view transitions, or with reduced motion on, switch instantly.
    if (
      !document.startViewTransition ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      apply();
      return;
    }
    document.startViewTransition(apply);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark theme"
      title="Toggle theme"
      className="grid h-9 w-9 place-items-center rounded-full text-text-muted transition-colors hover:bg-surface hover:text-text active:scale-95"
    >
      <Sun size={18} weight="bold" aria-hidden className="hidden dark:block" />
      <Moon size={18} weight="bold" aria-hidden className="dark:hidden" />
    </button>
  );
}
