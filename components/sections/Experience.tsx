"use client";

import { motion } from "framer-motion";
import Link from "next/link";
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
          className="font-heading text-text mb-6 text-center text-4xl tracking-tight sm:text-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          Experience
        </motion.h2>

        <motion.div
          className="mb-16 flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <Link
            href="/resume"
            className="font-mono group inline-flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-5 py-2.5 text-sm tracking-wide text-accent transition-all duration-200 hover:border-accent/60 hover:bg-accent/20"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-200 group-hover:-translate-y-0.5"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <polyline points="10 9 9 9 8 9" />
            </svg>
            View Resume
          </Link>
        </motion.div>

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
