import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // Stop `next dev` from appending its own block to CLAUDE.md.
  agentRules: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
