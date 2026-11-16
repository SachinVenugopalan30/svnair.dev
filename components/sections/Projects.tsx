import projectsData from "@/projects.json";

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  image: string;
}

// Newest first: ids grow as projects are added.
const projects: Project[] = [...projectsData].sort((a, b) => b.id - a.id);

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-h" className="section">
      <h2 id="projects-h" className="section-title">
        Projects
      </h2>
      <div className="grid gap-x-16 gap-y-12 rounded bg-surface p-[clamp(1.5rem,4vw,3.5rem)] md:grid-cols-2">
        {projects.map((p) => {
          const href = p.liveUrl || p.githubUrl;
          return (
            <article
              key={p.id}
              className="grid grid-cols-[6rem_1fr] items-start gap-5 md:grid-cols-[9rem_1fr]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={p.image}
                alt=""
                width={1600}
                height={1000}
                loading="lazy"
                className="aspect-square rounded-[3px] object-cover object-left-top"
              />
              <div>
                <h3 className="text-[1.625rem]">
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline hover:text-accent-ink hover:underline"
                  >
                    {p.title}
                  </a>
                </h3>
                <p className="mt-1.5">{p.description}</p>
                <p className="mt-1.5 text-[0.9375rem] text-text-muted">
                  {p.technologies.join(", ")}
                </p>
                {p.liveUrl && p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-block text-[0.9375rem] text-accent-ink"
                  >
                    Source on GitHub
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
