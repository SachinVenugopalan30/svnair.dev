"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const skills = [
  "Python",
  "JavaScript/TypeScript",
  "SQL",
  "NoSQL",
  "React",
  "Machine Learning",
  "Artificial Intelligence",
  "Deep Learning",
  "Large Language Models",
  "Cloud (GCP/Azure)",
  "Docker",
  "Photography",
];

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function About() {
  return (
    <section id="about" className="px-6 py-32">
      <div className="mx-auto max-w-3xl">
        {/* Section heading */}
        <motion.h2
          className="font-heading text-text mb-16 text-center text-4xl tracking-tight sm:text-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          About
        </motion.h2>

        {/* Profile image + bio */}
        <motion.div
          className="flex flex-col items-center gap-10 sm:flex-row sm:items-start"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {/* Profile photo */}
          <motion.div className="shrink-0" variants={fadeInUp}>
            <div className="relative h-48 w-48 overflow-hidden rounded-2xl border border-accent/30">
              <Image
                src="/profile.jpg"
                alt="Sachin"
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div className="flex flex-col gap-6" variants={fadeInUp}>
            <p className="font-body text-text-muted leading-relaxed text-base sm:text-lg">
              Hi there! At the time of writing this I have ~5 years of
              experience as a Data Scientist, with some experience in software
              development. Currently based in the US, with a passion for turning
              complex data into actionable insights and building polished,
              end-to-end digital products. When I'm not training models or
              writing code, you'll find me trying to take cool photos, lol.
              Thanks for stopping by!
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Link
                href="/projects"
                className="group font-mono inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-accent/10 px-4 py-2 text-sm tracking-wide text-accent transition-all duration-200 hover:border-accent hover:bg-accent/20"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                >
                  <path d="M3 3h7v7H3z" />
                  <path d="M14 3h7v7h-7z" />
                  <path d="M3 14h7v7H3z" />
                  <path d="M14 14h7v7h-7z" />
                </svg>
                Projects
              </Link>
              <Link
                href="/photography"
                className="group font-mono inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-wide text-text-muted transition-all duration-200 hover:border-white/20 hover:bg-white/10 hover:text-text"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:scale-110"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
                Photography
              </Link>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills tags */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.05, delayChildren: 0.2 },
            },
          }}
        >
          {skills.map((skill) => (
            <motion.span
              key={skill}
              className="font-mono rounded-md bg-surface px-3 py-1.5 text-xs tracking-wide text-text-muted"
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1] as const,
                  },
                },
              }}
            >
              {skill}
            </motion.span>
          ))}
        </motion.div>

        {/* Scroll hint — experience below */}
        <motion.div
          className="mt-20 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <span className="font-mono text-xs tracking-widest text-text-muted/50 uppercase">
            Work Experience
          </span>
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent/40"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
