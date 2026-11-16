"use client";

import { useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight, Pause, Play } from "@phosphor-icons/react";
import {
  captionFromFilename,
  listRuntimePhotos,
  loadCaptions,
  photoSrc,
  pickDaily,
} from "@/lib/photos";

type Photo = { name: string; caption: string };

const SPEED = 28; // px per second

const iconBtn =
  "grid h-11 w-11 place-items-center rounded-full border border-line bg-bg transition-colors hover:border-accent hover:text-accent-ink";

// Today's five in one level row that drifts slowly and loops. Hands, hover,
// keyboard focus and the pause button all stop it; reduced motion never starts it.
export default function PhotoReel({ fallback }: { fallback: string[] }) {
  const [photos, setPhotos] = useState<Photo[] | null>(null);
  const [paused, setPaused] = useState(false);
  const track = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const nudgeRef = useRef<(ms?: number) => void>(() => {});

  useEffect(() => {
    Promise.all([listRuntimePhotos(), loadCaptions()]).then(([runtime, captions]) => {
      const names = pickDaily(runtime && runtime.length ? runtime : fallback);
      setPhotos(names.map((name) => ({ name, caption: captions[name] ?? captionFromFilename(name) })));
    });
  }, [fallback]);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const el = track.current;
    if (!el || !photos?.length) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const count = photos.length;
    // The second copy starts exactly one loop-width in; jumping back by that
    // much is invisible.
    const loopW = () => {
      const kids = el.children as HTMLCollectionOf<HTMLElement>;
      return kids[count].offsetLeft - kids[0].offsetLeft;
    };
    let pos = el.scrollLeft;
    let last = 0;
    let held = false;
    let hover = false;
    let visible = false;
    let resumeAt = 0;
    let raf = 0;
    const nudge = (ms = 2500) => {
      resumeAt = performance.now() + ms;
    };
    nudgeRef.current = nudge;
    const running = () =>
      !reduce.matches && !pausedRef.current && !held && !hover && visible && !document.hidden && performance.now() > resumeAt;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = last ? Math.min(t - last, 64) : 0;
      last = t;
      if (!running()) return;
      pos += (SPEED * dt) / 1000;
      const L = loopW();
      if (pos >= L) pos -= L;
      el.scrollLeft = pos;
    };
    const onScroll = () => {
      if (Math.abs(el.scrollLeft - pos) < 2) return; // our own write
      pos = el.scrollLeft;
      const L = loopW();
      if (pos >= L) {
        pos -= L;
        el.scrollLeft = pos;
      }
      nudge();
    };
    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") hover = true;
    };
    const onLeave = () => {
      hover = false;
    };
    const onDown = () => {
      held = true;
    };
    const onUp = () => {
      if (held) {
        held = false;
        nudge();
      }
    };
    const onFocusIn = () => {
      held = true;
    };
    const onFocusOut = () => {
      held = false;
      nudge();
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    addEventListener("pointerup", onUp);
    addEventListener("pointercancel", onUp);
    el.addEventListener("focusin", onFocusIn);
    el.addEventListener("focusout", onFocusOut);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
    });
    io.observe(el);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      removeEventListener("pointerup", onUp);
      removeEventListener("pointercancel", onUp);
      el.removeEventListener("focusin", onFocusIn);
      el.removeEventListener("focusout", onFocusOut);
    };
  }, [photos]);

  function step(dir: 1 | -1) {
    const el = track.current;
    if (!el || !photos?.length) return;
    const count = photos.length;
    const kids = [...el.children] as HTMLElement[];
    const base = kids[0].offsetLeft;
    const edges = kids.map((k) => k.offsetLeft - base);
    const loop = edges[count];
    let x = el.scrollLeft;
    // Going back from the very start: hop to the same spot in the second copy first.
    if (dir < 0 && x < 4) {
      x += loop;
      el.scrollLeft = x;
    }
    const to =
      dir > 0
        ? (edges.find((e) => e > x + 4) ?? x)
        : ([...edges].reverse().find((e) => e < x - 4) ?? 0);
    nudgeRef.current(4000);
    const smooth = !matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({ left: to, behavior: smooth ? "smooth" : "instant" });
  }

  return (
    <section id="photos" aria-labelledby="photos-h" className="section">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
        <h2 id="photos-h" className="section-title mb-0">
          Around the world
        </h2>
        {photos && photos.length > 0 && (
          <div className="flex gap-2">
            <button type="button" className={iconBtn} onClick={() => step(-1)} aria-label="Previous photo">
              <CaretLeft size={20} aria-hidden />
            </button>
            <button
              type="button"
              className={`${iconBtn} motion-reduce:hidden`}
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? "Play photos" : "Pause photos"}
            >
              {paused ? <Play size={18} weight="fill" aria-hidden /> : <Pause size={18} weight="fill" aria-hidden />}
            </button>
            <button type="button" className={iconBtn} onClick={() => step(1)} aria-label="Next photo">
              <CaretRight size={20} aria-hidden />
            </button>
          </div>
        )}
      </div>

      {photos === null ? (
        <div className="reel" aria-busy="true" aria-label="Loading photos">
          {[0, 1, 2].map((i) => (
            <div key={i} className="reel-skeleton motion-safe:animate-pulse" />
          ))}
        </div>
      ) : photos.length === 0 ? (
        <p className="text-text-muted">No photos yet. Check back soon.</p>
      ) : (
        <div
          ref={track}
          className="reel"
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Today's photographs"
        >
          {[false, true].flatMap((copy) =>
            photos.map((p, i) => (
              <figure
                key={`${copy}-${p.name}`}
                // The second copy only exists to make the loop seamless.
                {...(copy
                  ? { "aria-hidden": true, inert: true }
                  : { role: "group", "aria-roledescription": "slide", "aria-label": `${i + 1} of ${photos.length}` })}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photoSrc(p.name)}
                  alt={p.caption}
                  loading={!copy && i < 2 ? "eager" : "lazy"}
                  decoding="async"
                  onError={() => setPhotos((ps) => ps && ps.filter((q) => q.name !== p.name))}
                />
                <figcaption>{p.caption}</figcaption>
              </figure>
            )),
          )}
        </div>
      )}
    </section>
  );
}
