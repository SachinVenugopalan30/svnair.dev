"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { CaretLeft, CaretRight, X } from "@phosphor-icons/react";
import { altFromFilename, isPhoto, pickDaily } from "@/lib/photos";

type Status = "loading" | "ready";

// nginx serves /photography/ as JSON (autoindex_format json). Anywhere else,
// such as `bun dev`, the request fails and the build-time list is used.
async function listRuntimePhotos(): Promise<string[] | null> {
  try {
    const res = await fetch("/photography/", {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const entries: { name: string; type: string }[] = await res.json();
    return entries
      .filter((e) => e.type === "file" && isPhoto(e.name))
      .map((e) => e.name);
  } catch {
    return null;
  }
}

const src = (name: string) => `/photography/${encodeURIComponent(name)}`;

// Where each print lands on the "table" (desktop), its resting tilt, and the
// off-screen spot it is tossed from with how far it spins on the way in.
// Hand-placed for up to five prints; x/y are the print's center.
const SLOTS = [
  { x: "17%", y: "30%", rot: -7, fromX: "-70vw", fromY: "-25vh", spin: -540 },
  { x: "49%", y: "24%", rot: 5, fromX: "10vw", fromY: "-90vh", spin: 450 },
  { x: "82%", y: "34%", rot: -4, fromX: "75vw", fromY: "-20vh", spin: 540 },
  { x: "33%", y: "72%", rot: 4, fromX: "-65vw", fromY: "70vh", spin: -450 },
  { x: "67%", y: "73%", rot: -8, fromX: "75vw", fromY: "65vh", spin: 360 },
];

function slotStyle(i: number): CSSProperties {
  const s = SLOTS[i % SLOTS.length];
  return {
    "--x": s.x,
    "--y": s.y,
    "--rot": `${s.rot}deg`,
    "--from-x": s.fromX,
    "--from-y": s.fromY,
    "--spin": `${s.spin}deg`,
    "--toss-delay": `${i * 220}ms`,
    "--z": i + 1,
  } as CSSProperties;
}

const slotClass =
  "z-(--z) w-[82%] max-w-sm odd:self-start even:self-end hover:z-30 focus-within:z-30 md:absolute md:top-(--y) md:left-(--x) md:w-[clamp(200px,24vw,330px)] md:max-w-none md:-translate-x-1/2 md:-translate-y-1/2";

// A bare photo at its tilt, lifted off the table by a soft shadow.
const printClass =
  "block w-full overflow-hidden rounded-xl rotate-(--rot) shadow-[0_18px_40px_-14px_rgb(18_14_24/0.55)] transition-[rotate,translate,scale,box-shadow] duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]";

function Print({
  name,
  index,
  onOpen,
  onError,
}: {
  name: string;
  index: number;
  onOpen: () => void;
  onError: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const alt = altFromFilename(name);

  return (
    <li className={slotClass} style={slotStyle(index)}>
      {/* Tossed in only once its image is ready, so no empty frame flies in. */}
      <div className={loaded ? "toss" : "opacity-0"}>
        <button
          type="button"
          onClick={onOpen}
          aria-label={`Open ${alt}`}
          className={`${printClass} cursor-zoom-in hover:-translate-y-1.5 hover:scale-[1.04] hover:rotate-0 hover:shadow-[0_28px_60px_-16px_rgb(18_14_24/0.6)] focus-visible:rotate-0`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src(name)}
            alt={alt}
            decoding="async"
            // Cached images can finish before hydration, so check on mount too.
            ref={(el) => {
              if (el?.complete && el.naturalWidth) setLoaded(true);
            }}
            onLoad={() => setLoaded(true)}
            // A missing or corrupt file would otherwise stay an invisible, clickable print.
            onError={onError}
            className="block max-h-[60vh] w-full bg-surface object-cover md:max-h-[34vh]"
          />
        </button>
      </div>
    </li>
  );
}

export default function PhotoGallery({ fallback }: { fallback: string[] }) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("loading");
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    listRuntimePhotos().then((runtime) => {
      setPhotos(pickDaily(runtime && runtime.length ? runtime : fallback));
      setStatus("ready");
    });
  }, [fallback]);

  function show(i: number) {
    setOpen(i);
    dialog.current?.showModal();
  }

  function step(delta: number) {
    setOpen((i) =>
      i === null ? i : (i + delta + photos.length) % photos.length,
    );
  }

  const table =
    "relative mt-12 flex flex-col gap-10 md:block md:h-[min(90vh,820px)]";

  if (status === "loading") {
    return (
      <ul aria-busy="true" aria-label="Loading photos" className={table}>
        {SLOTS.map((_, i) => (
          <li key={i} className={slotClass} style={slotStyle(i)}>
            <div className={`${printClass} opacity-40`}>
              <div className="aspect-[4/3] w-full bg-surface motion-safe:animate-pulse" />
            </div>
          </li>
        ))}
      </ul>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="mt-12 rounded-xl border border-dashed border-line px-6 py-20 text-center">
        <p className="text-base text-text">No photos yet.</p>
        <p className="mt-2 text-xs text-text-muted">Check back soon.</p>
      </div>
    );
  }

  const current = open === null ? null : photos[open];

  return (
    <>
      <ul className={table}>
        {photos.map((name, i) => (
          <Print
            key={name}
            name={name}
            index={i}
            onOpen={() => show(i)}
            onError={() => setPhotos((p) => p.filter((n) => n !== name))}
          />
        ))}
      </ul>

      {/* Native <dialog>: focus trap, Esc to close, and focus return come for free. */}
      <dialog
        ref={dialog}
        onClose={() => setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        onClick={(e) => {
          // Clicks on the dimmed area (dialog or figure, not the photo or buttons) close it.
          const t = e.target as HTMLElement;
          if (t === e.currentTarget || t.dataset.backdrop !== undefined)
            dialog.current?.close();
        }}
        aria-label="Photo viewer"
        className="m-auto max-h-none max-w-none bg-transparent p-0 text-[#ece8f0] backdrop:bg-transparent"
      >
        {current && (
          <figure
            data-backdrop
            className="flex h-[100dvh] w-[100vw] flex-col items-center justify-center gap-4 p-4 sm:p-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src(current)}
              alt={altFromFilename(current)}
              className="max-h-[80dvh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            <figcaption className="flex items-center gap-4 text-xs">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <CaretLeft size={18} weight="bold" aria-hidden />
              </button>
              <span aria-live="polite">
                {open! + 1} of {photos.length}
              </span>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next photo"
                className="grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
              >
                <CaretRight size={18} weight="bold" aria-hidden />
              </button>
            </figcaption>
          </figure>
        )}
        <button
          type="button"
          onClick={() => dialog.current?.close()}
          aria-label="Close photo viewer"
          className="fixed top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
        >
          <X size={18} weight="bold" aria-hidden />
        </button>
      </dialog>
    </>
  );
}
