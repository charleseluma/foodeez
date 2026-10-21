import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The shared package ships TypeScript source; let Next compile it.
  transpilePackages: ["@foodeez/shared"],
};

export default nextConfig;
