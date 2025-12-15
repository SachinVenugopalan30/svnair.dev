import { motion } from "framer-motion";
import type { ReactElement } from "react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index,
}): ReactElement => {
  const { title, description, technologies, githubUrl, liveUrl, image } =
    project;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.4, 0, 0.2, 1],
      }}
      whileHover={{
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className="group relative bg-card glass rounded-xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-scarlet/20 border border-white/10"
    >
      {/* Project Image */}
      <div className="relative h-40 sm:h-44 lg:h-48 bg-gradient-to-br from-ash-gray/10 to-air-superiority-blue/10 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <motion.svg
              className="w-16 h-16 text-scarlet/60"
              fill="currentColor"
              viewBox="0 0 20 20"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </motion.svg>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-raisin-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Project Content */}
      <div className="p-6 space-y-4">
        <motion.h3
          className="text-xl font-bold text-ivory group-hover:text-scarlet transition-colors duration-300"
          whileHover={{ scale: 1.05 }}
        >
          {title}
        </motion.h3>

        <p className="text-text-secondary leading-relaxed text-sm">
          {description}
        </p>

        {/* Technologies */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-ash-gray">Technologies:</h4>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + techIndex * 0.05 }}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-scarlet/10 text-scarlet border border-scarlet/30 rounded-full text-xs font-medium hover:bg-scarlet/20 transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Project Links */}
        <div className="flex gap-3 pt-2">
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden group/btn border backdrop-blur-md no-underline text-white bg-white/10 border-white/20 hover:bg-gradient-to-r hover:from-ash-gray/90 hover:to-ash-gray hover:border-ash-gray/60 hover:shadow-lg hover:shadow-ash-gray/20 inline-flex items-center gap-2 flex-1 justify-center min-h-[44px]"
              style={{ textDecoration: "none" }}
            >
              {/* Animated background gradient - only on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-ash-gray/20 via-ash-gray/40 to-ash-gray/20 opacity-0 group-hover/btn:opacity-100 transition-all duration-500 rounded-full blur-sm"></div>

              {/* Shimmer effect - only on hover */}
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 rounded-full"></div>
              </div>

              <svg
                className="w-4 h-4 relative z-10"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="relative z-10 tracking-wide font-medium">
                Code
              </span>
            </motion.a>
          )}

          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 relative overflow-hidden group/btn border backdrop-blur-md no-underline text-white bg-white/10 border-white/20 hover:bg-gradient-to-r hover:from-scarlet/90 hover:to-scarlet hover:border-scarlet/60 hover:shadow-lg hover:shadow-scarlet/20 inline-flex items-center gap-2 flex-1 justify-center min-h-[44px]"
              style={{ textDecoration: "none" }}
            >
              {/* Animated background gradient - only on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-scarlet/20 via-scarlet/40 to-scarlet/20 opacity-0 group-hover/btn:opacity-100 transition-all duration-500 rounded-full blur-sm"></div>

              {/* Shimmer effect - only on hover */}
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-700">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-200%] group-hover/btn:translate-x-[200%] transition-transform duration-1000 rounded-full"></div>
              </div>

              <svg
                className="w-4 h-4 relative z-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span className="relative z-10 tracking-wide font-medium">
                Live Demo
              </span>
            </motion.a>
          )}
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-scarlet/5 to-ash-gray/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </motion.div>
  );
};

export default ProjectCard;
