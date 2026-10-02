import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  // Photos are resized by Sanity's image CDN (see the loader), not by Vercel's image optimizer.
  images: {
    loader: "custom",
    loaderFile: "./sanity/lib/imageLoader.ts",
    qualities: [75],
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
