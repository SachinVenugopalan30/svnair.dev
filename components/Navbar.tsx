"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/#projects", label: "Projects" },
  { href: "/#experience", label: "Experience" },
  { href: "/photography", label: "Photography" },
  { href: "/resume", label: "Resume" },
  { href: "/#contact", label: "Contact" },
];

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
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-lg">
      <nav
        aria-label="Main"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-text"
        >
          <Logo />
          sachin nair
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="rounded-full px-3 py-1.5 text-xs text-text-muted transition-colors hover:bg-surface hover:text-text"
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
            className="grid h-9 w-9 place-items-center rounded-full text-text md:hidden"
          >
            {menuOpen ? (
              <X size={20} aria-hidden />
            ) : (
              <List size={20} aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul
          id="mobile-menu"
          className="flex h-[calc(100dvh-4rem)] flex-col gap-1 border-t border-line bg-bg px-4 pt-6 md:hidden"
        >
          {navLinks.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block py-3 text-2xl font-bold tracking-tight text-text"
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
