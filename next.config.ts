import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/photo-*" }],
  },
  async redirects() {
    return [
      {
        source: "/trekking-hiking/markha-valley-spituk-trek",
        destination: "/trekking-hiking/markha-valley-zingchen-trek",
        permanent: true,
      },
      {
        source: "/motorbike-touring/lehmotorbike-nubra-sky",
        destination: "/motorbike-touring/leh-umling-la-manali-bike-trip",
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "gsap"],
  },
};

export default nextConfig;
