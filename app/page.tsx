import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import PhotoReel from "@/components/PhotoReel";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import { buildTimePhotos } from "@/lib/photos.server";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <PhotoReel fallback={buildTimePhotos()} />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </>
  );
}
