import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  ...(process.env.CADLAB_STATIC_PREVIEW === "1" ? { output: "export" as const, images: { unoptimized: true } } : {})
};

export default nextConfig;
