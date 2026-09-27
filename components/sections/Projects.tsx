import { ArrowUpRight, GithubLogo } from "@phosphor-icons/react/dist/ssr";
import projects from "@/projects.json";
import { TechList } from "@/components/TechPill";

// Column spans cycle wide/narrow, narrow/wide, full. Literal class names so Tailwind sees them.
const SPAN = {
  5: "md:col-span-5",
  7: "md:col-span-7",
  12: "md:col-span-12",
} as const;
const PATTERN = [7, 5, 5, 7, 12] as const;

function spans(count: number): (keyof typeof SPAN)[] {
  const out: (keyof typeof SPAN)[] = [];
  let row = 0;
  for (let i = 0; i < count; i++) {
    const s = PATTERN[i % PATTERN.length];
    out.push(s);
    row = (row + s) % 12;
  }
  // A half-filled last row would leave an empty cell: stretch its last tile.
  if (row !== 0) out[count - 1] = 12;
  return out;
}

export default function Projects() {
  const layout = spans(projects.length);

  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h2 className="text-3xl font-bold tracking-[-0.03em] text-text sm:text-4xl">
        Projects
      </h2>
      <p className="mt-3 max-w-[60ch] text-sm text-text-muted">
        Things I&rsquo;ve built, mostly around ML, LLMs, and tools I wanted to
        exist.
      </p>

      <ul className="mt-12 grid gap-4 md:grid-cols-12">
        {projects.map((p, i) => (
          <li
            key={p.id}
            className={`reveal ${SPAN[layout[i]]} flex flex-col rounded-xl border border-line bg-surface/60 p-6 transition-colors hover:border-accent/40 sm:p-7`}
          >
            <h3 className="text-lg font-bold tracking-tight text-text">
              <a
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 hover:text-accent-ink"
              >
                <GithubLogo size={18} aria-hidden />
                {p.title}
                <span className="sr-only">(GitHub)</span>
              </a>
            </h3>
            <p className="mt-3 mb-6 max-w-[65ch] text-sm leading-relaxed text-text-muted">
              {p.description}
            </p>
            <div className="mt-auto flex flex-wrap items-end justify-between gap-4">
              <TechList items={p.technologies} />
              {p.liveUrl && (
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent-ink hover:underline"
                >
                  Live site
                  <ArrowUpRight size={14} weight="bold" aria-hidden />
                  <span className="sr-only">for {p.title}</span>
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
