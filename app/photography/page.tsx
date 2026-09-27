import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import PhotoGallery from "@/components/PhotoGallery";
import { isPhoto } from "@/lib/photos";

export const metadata = {
  title: "Photography | Sachin Nair",
  description:
    "A rotating selection of five photographs by Sachin Nair, refreshed daily at midnight UTC.",
};

// Fallback list for `bun dev`, where nginx isn't around to list the folder.
// In production the folder is mounted at runtime, so this is empty and the
// gallery fetches nginx's JSON listing instead.
function buildTimePhotos(): string[] {
  const dir = path.join(process.cwd(), "public", "photography");
  return fs.existsSync(dir) ? fs.readdirSync(dir).filter(isPhoto) : [];
}

export default function PhotographyPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 pt-32 pb-24 sm:px-6">
        <header className="max-w-[60ch]">
          <h1 className="text-4xl font-extrabold tracking-[-0.03em] text-text sm:text-5xl">
            Photography
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-text-muted">
            Five frames from my archive, picked fresh every day at 00:00 UTC.
            Select one to see it full size, then use the arrow keys to move
            between them.
          </p>
        </header>

        <PhotoGallery fallback={buildTimePhotos()} />
      </main>
    </>
  );
}
