import { seededShuffle, getDailySeed } from "./seededShuffle";

// Client-safe helpers. The fs read for the build-time fallback lives in
// app/photography/page.tsx so this file can ship to the browser.

const PHOTO_EXT = /\.(jpe?g|png|webp)$/i;

export function isPhoto(name: string): boolean {
  return PHOTO_EXT.test(name);
}

// Same five for everyone all day, new set at 00:00 UTC.
export function pickDaily(files: string[], count = 5): string[] {
  return seededShuffle([...files].sort(), getDailySeed()).slice(0, count);
}

// "sunset_ridge-02.jpg" -> "sunset ridge 02"
export function altFromFilename(name: string): string {
  return name.replace(PHOTO_EXT, "").replace(/[-_]+/g, " ").trim();
}

// nginx serves /photography/ as JSON (autoindex_format json). Anywhere else,
// such as `bun dev`, the request fails and the caller uses the build-time list.
export async function listRuntimePhotos(): Promise<string[] | null> {
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

export const photoSrc = (name: string) =>
  `/photography/${encodeURIComponent(name)}`;

// Optional sidecar next to the photos: { "file.jpg": "Caption", ... }.
// Missing file or entry falls back to the filename, title-cased.
export async function loadCaptions(): Promise<Record<string, string>> {
  try {
    const res = await fetch("/photography/captions.json");
    return res.ok ? await res.json() : {};
  } catch {
    return {};
  }
}

// "matterhorn-zermatt.jpg" -> "Matterhorn Zermatt"
export function captionFromFilename(name: string): string {
  return altFromFilename(name).replace(/\b\w/g, (c) => c.toUpperCase());
}
