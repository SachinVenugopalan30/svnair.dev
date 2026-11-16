import fs from "fs";
import path from "path";
import { isPhoto } from "./photos";

// Fallback list for `bun dev`, where nginx isn't around to list the folder.
// In production the folder is mounted at runtime, so this is empty and the
// client fetches nginx's JSON listing instead.
export function buildTimePhotos(): string[] {
  const dir = path.join(process.cwd(), "public", "photography");
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter(isPhoto) : [];
}
