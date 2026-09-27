import fs from "fs";
import path from "path";
import Navbar from "@/components/Navbar";
import PhotoGallery from "@/components/PhotoGallery";
import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { isPhoto } from "@/lib/photos";
import { siteConfig as config } from "@/lib/config";

// "https://www.instagram.com/sachin_venugopalan" -> "@sachin_venugopalan"
const instagramHandle = `@${new URL(config.socialMedia.instagram).pathname.replace(/\//g, "")}`;

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
          <a
            href={config.socialMedia.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-5 inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
          >
            <InstagramLogo size={18} aria-hidden />
            More on Instagram
            <span className="font-bold text-accent-ink">{instagramHandle}</span>
            <ArrowUpRight
              size={12}
              weight="bold"
              aria-hidden
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </header>

        <PhotoGallery fallback={buildTimePhotos()} />
      </main>
    </>
  );
}
