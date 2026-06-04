import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow local public images (no remote domains needed)
    unoptimized: false,
  },
};

export default nextConfig;
