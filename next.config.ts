import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Parent dirs carry their own lockfiles — pin the workspace root so
  // Turbopack doesn't infer the wrong one.
  turbopack: { root: __dirname },
  async redirects() {
    // /v2 was the noindexed homepage-redesign preview; it IS the homepage now.
    return [{ source: "/v2", destination: "/", permanent: true }];
  },
};

export default nextConfig;
