"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const skills = [
  "Python",
  "TypeScript",
  "React",
  "Next.js",
  "Machine Learning",
  "Data Science",
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
              Sachin is a Senior Data Scientist and full-stack developer based
              in the US, with a passion for turning complex data into actionable
              insights and building polished, end-to-end digital products. When
              he's not training models or writing code, you'll find him behind a
              camera capturing light and landscapes, or experimenting with new
              recipes in the kitchen.
            </p>
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
      </div>
    </section>
  );
}
