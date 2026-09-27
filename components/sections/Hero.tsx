import Image from "next/image";
import Link from "next/link";
import { Camera, FileText } from "@phosphor-icons/react/dist/ssr";

export default function Hero() {
  return (
    // Entrance is pure CSS (.rise in globals.css) so the hero paints without waiting for JS.
    <section
      id="hero"
      className="mx-auto grid min-h-[100dvh] max-w-6xl items-center gap-10 px-4 pt-24 pb-16 sm:px-6 md:grid-cols-[1.25fr_1fr] md:gap-16"
    >
      <div className="order-2 md:order-1">
        <h1
          style={{ animationDelay: "120ms" }}
          className="rise text-4xl leading-[1.05] font-extrabold tracking-[-0.03em] text-balance text-text sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl"
        >
          Sachin Venugopalan Nair
        </h1>

        <p
          style={{ animationDelay: "160ms" }}
          className="rise mt-4 text-base font-semibold text-accent-ink sm:text-lg"
        >
          Data scientist and developer
        </p>

        <p
          style={{ animationDelay: "220ms" }}
          className="rise mt-5 max-w-[52ch] text-sm leading-relaxed text-text-muted sm:text-base"
        >
          I have about five years of experience as a data scientist, plus a
          habit of building the software around my models. I like turning messy
          data into decisions and shipping polished, end-to-end products. When
          I&rsquo;m not training models or writing code, I&rsquo;m out trying to
          take cool photos.
        </p>

        <div
          style={{ animationDelay: "280ms" }}
          className="rise mt-8 flex flex-wrap gap-3"
        >
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-on-accent transition-transform hover:-translate-y-px active:translate-y-0 active:scale-[0.98]"
          >
            <FileText size={16} weight="bold" aria-hidden />
            Resume
          </Link>
          <Link
            href="/photography"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-text transition-colors hover:bg-surface active:scale-[0.98]"
          >
            <Camera size={16} weight="bold" aria-hidden />
            Photography
          </Link>
        </div>
      </div>

      <div
        style={{ animationDelay: "100ms" }}
        className="rise-photo order-1 mx-auto w-full max-w-[200px] sm:max-w-[240px] md:order-2 md:mr-0 md:max-w-[300px] lg:max-w-[340px]"
      >
        {/* The outline follows the image's rounded corners at an even gap on every side. */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-surface outline outline-1 outline-offset-[6px] outline-accent/50">
          <Image
            src="/profile.jpg"
            alt="Portrait of Sachin Nair"
            fill
            priority
            sizes="(min-width: 1024px) 340px, (min-width: 768px) 300px, 240px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
