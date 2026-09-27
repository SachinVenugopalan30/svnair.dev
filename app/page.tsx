import Navbar from "@/components/Navbar";
import BuildOnScroll from "@/components/BuildOnScroll";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <BuildOnScroll />
    </>
  );
}
