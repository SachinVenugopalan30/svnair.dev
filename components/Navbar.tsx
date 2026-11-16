"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/#photos", label: "Photos" },
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/resume", label: "Résumé" },
];

// Sits over the hero (the map fades out beneath it), so it has no bar of its own.
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    // The menu is md:hidden; without this, widening the window would leave
    // it "open" and the page scroll-locked.
    const desktop = matchMedia("(min-width: 768px)");
    const onDesktop = () => desktop.matches && setMenuOpen(false);
    desktop.addEventListener("change", onDesktop);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onDesktop);
    };
  }, [menuOpen]);

  return (
    <header className="relative z-40">
      <nav
        aria-label="Main"
        className="flex items-center justify-between gap-4 px-(--gutter) py-4"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 font-semibold text-text no-underline"
        >
          <Logo />
          Sachin Nair
        </Link>

        <div className="flex items-center gap-3 md:gap-6">
          <ul className="hidden items-center gap-6 md:flex">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="font-medium text-text no-underline transition-colors hover:text-accent-ink"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-bg md:hidden"
          >
            {menuOpen ? <X size={20} aria-hidden /> : <List size={20} aria-hidden />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul
          id="mobile-menu"
          className="fixed inset-x-0 top-[76px] bottom-0 flex flex-col gap-1 bg-bg px-(--gutter) pt-6 md:hidden"
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 font-serif text-4xl text-text no-underline"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
