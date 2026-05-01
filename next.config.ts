import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ecovistalife.in' },
      { protocol: 'http', hostname: 'ecovistalife.in' },
      { protocol: 'https', hostname: 'wordpress.themeholy.com' },
    ],
  },
};

export default nextConfig;
