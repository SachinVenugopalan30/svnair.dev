import experienceData from "@/experience.json";

interface ExperienceItem {
  id: number;
  company: string;
  link?: string;
  position: string;
  startDate: string;
  endDate: string;
  highlights: string[];
  technologies: string[];
}

const experiences: ExperienceItem[] = experienceData;

const span = ({ startDate, endDate }: ExperienceItem) =>
  startDate === endDate ? startDate : `${startDate} to ${endDate}`;

export default function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-h"
      className="section grid gap-12 lg:grid-cols-[1fr_2fr]"
    >
      <div>
        <h2 id="experience-h" className="section-title">
          The route so far
        </h2>
        <p className="max-w-[32ch] text-xl">
          Six years from forecasts in a contact centre to audits in litigation.
        </p>
      </div>
      <dl className="grid gap-x-8 gap-y-2 md:grid-cols-[9rem_1fr] md:gap-y-10">
        {experiences.map((r) => (
          <div key={r.id} className="contents">
            <dt className="font-semibold text-accent-ink tabular-nums">{span(r)}</dt>
            <dd className="mb-8 md:mb-0">
              <h3 className="text-[1.375rem] leading-tight">
                {r.position},{" "}
                {r.link ? (
                  <a
                    href={r.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-1 hover:text-accent-ink"
                  >
                    {r.company}
                  </a>
                ) : (
                  r.company
                )}
              </h3>
              <ul className="mt-3 max-w-[68ch] list-disc space-y-1.5 pl-5 marker:text-accent">
                {r.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
              <p className="mt-3 text-[0.9375rem] text-text-muted">
                {r.technologies.join(", ")}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
