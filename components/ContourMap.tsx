"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  MOUNTAINS,
  drawContours,
  type ContourLabel,
  type ContourLine,
  type Mountain,
} from "@/lib/contours";

type Map = { W: number; H: number; lines: ContourLine[]; labels: ContourLabel[] };

// Fills its positioned parent (the hero). Picks a mountain per visit, so it
// renders nothing on the server and draws after mount.
export default function ContourMap() {
  const svg = useRef<SVGSVGElement>(null);
  const [mountain, setMountain] = useState<Mountain | null>(null);
  const [map, setMap] = useState<Map | null>(null);
  const [trace, setTrace] = useState(false);

  useEffect(() => {
    const hero = svg.current?.parentElement;
    if (!hero) return;
    const m = MOUNTAINS[Math.floor(Math.random() * MOUNTAINS.length)];
    const phase = Array.from({ length: 5 }, () => Math.random() * Math.PI * 2);
    setMountain(m);

    let last = { w: 0, h: 0 };
    const draw = () => {
      const w = hero.clientWidth;
      const h = hero.clientHeight;
      if (Math.abs(w - last.w) < 40 && Math.abs(h - last.h) < 40) return;
      // Trace the lines in on the first draw only; a resize just redraws.
      setTrace(last.w === 0 && !matchMedia("(prefers-reduced-motion: reduce)").matches);
      last = { w, h };
      const hr = hero.getBoundingClientRect();
      const name = hero.querySelector("[data-summit]")?.getBoundingClientRect() ?? hr;
      const keepClear = {
        left: name.left - hr.left,
        right: name.right - hr.left,
        top: name.top - hr.top,
        bottom: name.bottom - hr.top,
      };
      setMap({ W: w, H: h, ...drawContours(m, phase, w, h, keepClear) });
    };
    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(hero);
    return () => ro.disconnect();
  }, []);

  // Dash lengths need the real path lengths: measure before paint so the
  // lines never flash in whole before the trace starts.
  useLayoutEffect(() => {
    if (!trace || !svg.current) return;
    svg.current.querySelectorAll("path").forEach((p) => {
      p.style.setProperty("--len", String(Math.ceil(p.getTotalLength() + 2)));
    });
  }, [trace, map]);

  return (
    <>
      <svg
        ref={svg}
        className={`contour-map${trace ? " trace" : ""}`}
        aria-hidden="true"
        preserveAspectRatio="none"
        viewBox={map ? `0 0 ${map.W} ${map.H}` : undefined}
      >
        {map?.lines.map((l, i) => (
          <path
            key={i}
            d={l.d}
            className={l.index ? "index" : undefined}
            style={{ "--i": i } as React.CSSProperties}
          />
        ))}
        {map?.labels.map((l) => (
          <text key={`${l.text}${l.x}`} x={l.x + 6} y={l.y + 4.4} fontSize="12.5">
            {l.text}
          </text>
        ))}
      </svg>
      <p className="contour-caption">
        {mountain ? (
          <>
            Contours drawn from a model of <b>{mountain.name}</b>,{" "}
            {mountain.place} ({mountain.top.toLocaleString("en-US")} m)
          </>
        ) : (
          // Same line height before the pick, so nothing jumps.
          <>&nbsp;</>
        )}
      </p>
    </>
  );
}
