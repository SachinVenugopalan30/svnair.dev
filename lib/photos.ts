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
