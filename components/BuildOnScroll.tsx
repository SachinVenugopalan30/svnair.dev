"use client";

import { useEffect } from "react";

// Sideways offsets (in 16px "cells") a piece starts at before snapping into
// its column, like a falling piece being steered. Picked by position so every
// load looks the same.
const NUDGE = [-2, 1, 0, 2, -1, 0, 1, -2];

// Reverse-Tetris entrance: each [data-build] piece rises in blocky steps,
// snaps sideways into place, and locks in while fading up (CSS in globals.css).
// Runs once per piece per page load. Pieces already on screen, no JS, or
// reduced motion all mean the content just shows: nothing starts hidden in HTML.
export default function BuildOnScroll() {
  useEffect(() => {
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    )
      return;

    const pieces = [...document.querySelectorAll<HTMLElement>("[data-build]")];

    const io = new IntersectionObserver(
      (entries) => {
        // Pieces entering together start one after another, top to bottom.
        entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
          .forEach((e, n) => {
            const el = e.target as HTMLElement;
            el.style.setProperty("--build-delay", `${n * 110}ms`);
            el.dataset.build = "go";
            io.unobserve(el);
          });
      },
      // Waiting pieces sit 160px below their slot and the observer sees that
      // shifted box, so the slot itself is ~160px into view when this fires.
      { threshold: 0 },
    );

    pieces.forEach((el, i) => {
      if (el.getBoundingClientRect().top < innerHeight) return; // already seen
      el.style.setProperty("--build-dx", `${NUDGE[i % NUDGE.length] * 16}px`);
      el.dataset.build = "wait";
      io.observe(el);
    });

    // Once the entrance finishes, drop the animation so the piece is plain
    // content again (no lingering transform or stacking context).
    const settle = (e: AnimationEvent) => {
      const el = e.target as HTMLElement;
      if (e.animationName === "build-fade" && el.dataset.build === "go")
        el.dataset.build = "done";
    };
    document.addEventListener("animationend", settle);

    return () => {
      io.disconnect();
      document.removeEventListener("animationend", settle);
    };
  }, []);

  return null;
}
