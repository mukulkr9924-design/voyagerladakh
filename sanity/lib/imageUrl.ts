/**
 * Sizes a photo on Sanity's image CDN, which also picks WebP/AVIF per browser and keeps the editor's
 * crop (the `rect` param already in the URL). Other images (local logos, icons) are returned as they are.
 */
export function sanityImageUrl(src: string, width: number, quality = 75) {
  if (!src.startsWith("https://cdn.sanity.io/")) return src;
  const url = new URL(src);
  url.searchParams.set("w", String(width));
  url.searchParams.set("q", String(quality));
  url.searchParams.set("fit", "max");
  url.searchParams.set("auto", "format");
  return url.toString();
}

/** Width for share cards, the sitemap and Google's structured data. */
export const SHARE_IMAGE_WIDTH = 1200;
