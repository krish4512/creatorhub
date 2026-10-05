import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/creatorhub",
  images: { unoptimized: true },
};

export default nextConfig;
