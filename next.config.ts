import type { NextConfig } from "next";

// GitHub Pages serves this repo at /Gold_NextJs_Testing/, so the static
// export needs a basePath. Local dev/build stays at the root unless
// GITHUB_PAGES=true (set by the deploy workflow).
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/Gold_NextJs_Testing" : "";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isGithubPages && {
    output: "export",
    basePath,
    images: {
      unoptimized: true,
    },
  }),
};

export default nextConfig;
