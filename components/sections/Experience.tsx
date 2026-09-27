import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import experienceData from "@/experience.json";
import { TechList } from "@/components/TechPill";

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

// Consecutive roles at the same company render as one block (newest role first).
function groupByCompany(items: ExperienceItem[]) {
  const groups: ExperienceItem[][] = [];
  for (const item of items) {
    const last = groups.at(-1);
    if (last && last[0].company === item.company) last.push(item);
    else groups.push([item]);
  }
  return groups;
}

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h2
        data-build
        className="text-3xl font-bold tracking-[-0.03em] text-text sm:text-4xl"
      >
        Experience
      </h2>

      <div className="mt-12">
        {groupByCompany(experiences).map((roles) => {
          const { company, link } = roles[0];
          const span = `${roles.at(-1)!.startDate} - ${roles[0].endDate}`;
          return (
            <div
              key={roles[0].id}
              data-build
              className="grid gap-6 border-t border-line py-10 lg:grid-cols-[15rem_1fr] lg:gap-12"
            >
              <div className="lg:sticky lg:top-24 lg:self-start">
                <h3 className="text-lg font-bold tracking-tight text-text">
                  {link ? (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent-ink"
                    >
                      {company}
                      <ArrowUpRight
                        size={14}
                        weight="bold"
                        className="ml-1 inline align-baseline"
                        aria-hidden
                      />
                    </a>
                  ) : (
                    company
                  )}
                </h3>
                <p className="mt-1 text-xs text-text-muted tabular-nums">
                  {span}
                </p>
              </div>

              <ol className="space-y-10">
                {roles.map((r) => (
                  <li key={r.id}>
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h4 className="text-base font-semibold text-accent-ink">
                        {r.position}
                      </h4>
                      {roles.length > 1 && (
                        <p className="text-xs text-text-muted tabular-nums">
                          {r.startDate} - {r.endDate}
                        </p>
                      )}
                    </div>
                    <ul className="mt-3 max-w-[70ch] list-disc space-y-2 pl-4 text-sm leading-relaxed text-text-muted marker:text-accent">
                      {r.highlights.map((h) => (
                        <li key={h}>{h}</li>
                      ))}
                    </ul>
                    <div className="mt-4">
                      <TechList items={r.technologies} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}
