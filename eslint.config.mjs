import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      ".next/**", "out/**", "next-env.d.ts",
      // local tooling and scratch output, never part of the site
      "dist/**", "temp_files/**", "mockups/**", "mockups-v2/**",
      ".agents/**", ".claude/**", ".crush/**", ".pi/**", ".taste-skill/**",
    ],
  },
];

export default config;
