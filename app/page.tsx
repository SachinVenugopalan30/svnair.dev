import Hero from "@/components/sections/Hero";
import SectionNav from "@/components/SectionNav";

export default function Home() {
  return (
    <>
      <SectionNav />
      <main>
        <Hero />

        {/* Placeholder sections for navigation dots */}
        <section id="about" className="min-h-dvh" />
        <section id="experience" className="min-h-dvh" />
        <section id="contact" className="min-h-dvh" />
      </main>
    </>
  );
}
