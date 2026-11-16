import Navbar from "@/components/Navbar";
import PhotoGallery from "@/components/PhotoGallery";
import { ArrowUpRight, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import { buildTimePhotos } from "@/lib/photos.server";
import { siteConfig as config } from "@/lib/config";

// "https://www.instagram.com/sachin_venugopalan" -> "@sachin_venugopalan"
const instagramHandle = `@${new URL(config.socialMedia.instagram).pathname.replace(/\//g, "")}`;

export const metadata = {
  title: "Sachin Nair",
  description:
    "A rotating selection of five photographs by Sachin Nair, refreshed daily at midnight UTC.",
};

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
            className="group mt-5 inline-flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-text-muted transition-colors hover:text-text"
          >
            <InstagramLogo size={18} aria-hidden />
            <span className="whitespace-nowrap">More on Instagram</span>
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap">
              <span className="font-bold text-accent-ink">
                {instagramHandle}
              </span>
              <ArrowUpRight
                size={12}
                weight="bold"
                aria-hidden
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </a>
        </header>

        <noscript>
          <p className="mt-12 text-sm text-text-muted">
            The gallery needs JavaScript to load today&rsquo;s photos.
          </p>
        </noscript>
        <PhotoGallery fallback={buildTimePhotos()} />
      </main>
    </>
  );
}
