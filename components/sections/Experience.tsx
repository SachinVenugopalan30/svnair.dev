"use client";

import { motion } from "framer-motion";
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

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Experience() {
  return (
    <section id="experience" className="px-6 py-32">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <motion.h2
          className="font-heading text-text mb-16 text-center text-4xl tracking-tight sm:text-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          Experience
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical accent line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-accent/20 sm:left-4" />

          {/* Experience cards */}
          <div className="flex flex-col gap-12">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                className="relative pl-8 sm:pl-14"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeInUp}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 top-1.5 h-2 w-2 -translate-x-[3.5px] rounded-full bg-accent sm:left-4" />

                {/* Card */}
                <div className="rounded-xl border border-white/5 bg-surface/50 p-6 sm:p-8">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="font-heading text-text text-xl sm:text-2xl">
                      {exp.position}
                    </h3>
                    <div className="mt-1 flex flex-wrap items-center gap-x-2 text-sm text-text-muted">
                      {exp.link ? (
                        <a
                          href={exp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent transition-colors hover:text-accent-hover"
                        >
                          {exp.company}
                        </a>
                      ) : (
                        <span>{exp.company}</span>
                      )}
                      <span className="text-text-muted/40">/</span>
                      <span className="font-mono text-xs tracking-wide">
                        {exp.startDate} &mdash; {exp.endDate}
                      </span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="mb-6 space-y-2">
                    {exp.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="font-body relative pl-4 text-sm leading-relaxed text-text-muted before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-accent/40"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono rounded-md bg-accent/10 px-2.5 py-1 text-[11px] tracking-wide text-accent"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
