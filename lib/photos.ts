import fs from "fs";
import path from "path";
import { seededShuffle, getDailySeed } from "./seededShuffle";

export interface Photo {
  filename: string;
  url: string;
}

export function getSelectedPhotos(count: number = 5): Photo[] {
  const photoDir = path.join(process.cwd(), "public", "photography");

  if (!fs.existsSync(photoDir)) return [];

  const extensions = [".jpg", ".jpeg", ".png", ".webp"];
  const files = fs
    .readdirSync(photoDir)
    .filter((f) => extensions.includes(path.extname(f).toLowerCase()));

  if (files.length === 0) return [];

  const photos: Photo[] = files.map((f) => ({
    filename: f,
    url: `/photography/${f}`,
  }));

  const seed = getDailySeed();
  const shuffled = seededShuffle(photos, seed);
  return shuffled.slice(0, Math.min(count, shuffled.length));
}
