import Navbar from "@/components/Navbar";
import PhotoGallery from "@/components/PhotoGallery";
import { getSelectedPhotos } from "@/lib/photos";

export const metadata = {
  title: "Photography",
  description: "A rotating selection of photographs, refreshed daily at midnight UTC.",
};

export default function PhotographyPage() {
  const photos = getSelectedPhotos(5);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 pt-32 pb-20">
        <header className="mb-12 text-center">
          <h1 className="font-heading text-4xl tracking-tight text-text sm:text-5xl">
            Photography
          </h1>
          <p className="mt-3 font-mono text-xs tracking-wider text-text-muted">
            Photos rotate daily at midnight UTC
          </p>
        </header>

        {photos.length > 0 ? (
          <PhotoGallery photos={photos} />
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <p className="font-body text-lg text-text-muted">No photos yet.</p>
            <p className="mt-2 font-mono text-xs text-text-muted/60">
              Check back soon.
            </p>
          </div>
        )}
      </main>
    </>
  );
}
