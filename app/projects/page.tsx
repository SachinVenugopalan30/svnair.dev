import Link from "next/link";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/projects.json";

export const metadata = {
  title: "Projects — Sachin",
  description: "A collection of projects built by Sachin Nair.",
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-5xl px-6 pt-32 pb-24">
        {/* Back link */}
        <Link
          href="/"
          className="mb-10 inline-block font-mono text-xs tracking-widest text-text-muted uppercase transition-colors hover:text-text"
        >
          &larr; Back
        </Link>

        {/* Page heading */}
        <h1 className="font-heading text-4xl text-text sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 mb-12 max-w-xl font-body text-text-muted">
          A few things I&rsquo;ve built and shipped.
        </p>

        {/* Project grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </main>
    </>
  );
}
