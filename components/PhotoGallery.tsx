"use client";

import { useEffect, useRef, useState } from "react";
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

function Photo({ name, index }: { name: string; index: number }) {
  const [loaded, setLoaded] = useState(false);
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src(name)}
      alt={altFromFilename(name)}
      loading={index < 2 ? "eager" : "lazy"}
      decoding="async"
      // Cached images can finish before hydration, so check on mount too.
      ref={(el) => {
        if (el?.complete && el.naturalWidth) setLoaded(true);
      }}
      onLoad={() => setLoaded(true)}
      style={{ transitionDelay: `${index * 80}ms` }}
      className={`w-full rounded-xl bg-surface transition duration-700 ease-out motion-reduce:transition-none ${
        loaded ? "opacity-100" : "min-h-48 opacity-0"
      }`}
    />
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

  if (status === "loading") {
    return (
      <div
        aria-busy="true"
        aria-label="Loading photos"
        className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3"
      >
        {["h-72", "h-96", "h-60", "h-80", "h-64"].map((h) => (
          <div
            key={h}
            className={`${h} mb-4 break-inside-avoid rounded-xl bg-surface motion-safe:animate-pulse`}
          />
        ))}
      </div>
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
      <ul className="mt-12 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {photos.map((name, i) => (
          <li key={name} className="mb-4 break-inside-avoid">
            <button
              type="button"
              onClick={() => show(i)}
              aria-label={`Open ${altFromFilename(name)}`}
              className="block w-full cursor-zoom-in overflow-hidden rounded-xl transition-transform duration-500 hover:scale-[1.01] motion-reduce:transition-none"
            >
              <Photo name={name} index={i} />
            </button>
          </li>
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
