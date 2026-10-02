"use client";

import type { ImageLoaderProps } from "next/image";
import { sanityImageUrl } from "@/sanity/lib/imageUrl";

// next.config.ts points every next/image here, so photos are sized by Sanity's CDN and Vercel's
// image optimizer is never used. Local files (logos, icons) are served as they are.
export default function imageLoader({ src, width, quality }: ImageLoaderProps) {
  return sanityImageUrl(src, width, quality);
}
