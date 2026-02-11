"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sections = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export default function SectionNav() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { threshold: 0.4 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-end gap-5 md:flex"
      aria-label="Section navigation"
    >
      {sections.map(({ id, label }) => {
        const isActive = activeSection === id;

        return (
          <button
            key={id}
            onClick={() => handleClick(id)}
            className="group flex items-center gap-3"
            aria-label={`Scroll to ${label}`}
            aria-current={isActive ? "true" : undefined}
          >
            {/* Label on hover */}
            <span
              className="pointer-events-none font-mono text-[10px] tracking-widest text-text-muted uppercase opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              {label}
            </span>

            {/* Dot / line indicator */}
            <motion.span
              className="block rounded-full bg-text-muted/30"
              animate={{
                width: isActive ? 20 : 6,
                height: isActive ? 2 : 6,
                backgroundColor: isActive
                  ? "var(--color-accent)"
                  : "rgba(138, 138, 141, 0.3)",
                borderRadius: isActive ? 1 : 3,
              }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </button>
        );
      })}
    </nav>
  );
}
