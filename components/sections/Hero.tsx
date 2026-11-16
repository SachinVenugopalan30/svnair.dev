import ContourMap from "@/components/ContourMap";

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-h" className="hero">
      <ContourMap />
      <div data-summit className="summit max-w-[46rem] px-4 py-6 text-center md:px-11 md:py-8">
        <h1 id="hero-h" className="text-[clamp(3rem,1.6rem+6vw,7rem)] tracking-[-0.01em]">
          Sachin Nair
        </h1>
        <p className="mx-auto mt-4 max-w-[30ch] text-[clamp(1.125rem,1rem+0.5vw,1.375rem)]">
          Data Scientist, Learner, Gamer, Leetcode Hater and Hobby Photographer
        </p>
        <a
          href="#projects"
          className="mt-7 inline-block rounded-full bg-accent px-6 py-3.5 font-semibold text-on-accent no-underline transition-colors hover:bg-(--accent-hover)"
        >
          See my projects
        </a>
      </div>
    </section>
  );
}
