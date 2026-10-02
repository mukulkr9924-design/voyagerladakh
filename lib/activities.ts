import type { SanityImage, Trip } from "@/lib/trips";
import { SHARE_IMAGE_WIDTH, sanityImageUrl } from "@/sanity/lib/imageUrl";

export const SITE_URL = "https://voyagerladakh.com";
/** Resolves a site-relative path (e.g. a photo in /public) to a full URL. */
export const absoluteUrl = (src: string) => (src.startsWith("/") ? `${SITE_URL}${src}` : src);

export const SITE_NAME = "Voyager Ladakh";

// Share image for pages without their own trip photo.
export const OG_FALLBACK_IMAGE = { url: "/voyager-ladakh-app-icon-512.png", width: 512, height: 512, alt: SITE_NAME };

// Next merges metadata shallowly: a page's `openGraph` replaces the layout's entirely,
// so every page builds its Open Graph block from this to keep the site name and image.
export function openGraphFor(url: string, title: string, description: string, images: { url: string; width?: number; height?: number; alt?: string }[] = [OG_FALLBACK_IMAGE]) {
  return { siteName: SITE_NAME, locale: "en_IN", type: "website" as const, url, title, description, images };
}

/** A photo sized for share cards (1200 px wide), for `openGraphFor`'s `images`. */
export function shareImage({ url, width, height, alt }: SanityImage, fallbackAlt: string) {
  const w = Math.min(width, SHARE_IMAGE_WIDTH);
  return { url: sanityImageUrl(url, w), width: w, height: Math.round((height * w) / width), alt: alt || fallbackAlt };
}

/** Open Graph and Twitter blocks for a page; with a photo, links are shared as a large image card. */
export function socialFor(url: string, title: string, description: string, photo?: SanityImage) {
  return {
    openGraph: openGraphFor(url, title, description, photo ? [shareImage(photo, title)] : undefined),
    twitter: { card: photo ? ("summary_large_image" as const) : ("summary" as const) },
  };
}

export function tripPath(trip: Pick<Trip, "activityType" | "slug">) {
  return `/${trip.activityType}/${trip.slug}`;
}

/** "Leh → Manali", or "Round trip from Leh" when the trip starts and ends in the same place. */
export function formatRoute(trip: Trip) {
  return trip.start === trip.end ? `Round trip from ${trip.start}` : `${trip.start} → ${trip.end}`;
}

/** "10 people" reads as a maximum; a range like "3–5 people" is shown as is. */
export function formatGroupSize(size: string) {
  return /\d\s*[–-]\s*\d/.test(size) ? size : `Up to ${size}`;
}
