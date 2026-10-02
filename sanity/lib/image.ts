import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "@/sanity/env";
import type { Photo, SanityImage } from "@/lib/trips";

const builder = createImageUrlBuilder({ projectId, dataset });

type Rect = { top: number; bottom: number; left: number; right: number };

/** An image field as projected by the `IMAGE` GROQ fragment. */
export interface RawImage {
  alt?: string;
  title?: string;
  caption?: string;
  tag?: string;
  crop?: Rect;
  hotspot?: { x: number; y: number };
  asset?: { _id: string; url: string; metadata: { lqip?: string; dimensions: { width: number; height: number } } };
}

export const IMAGE = `{ alt, title, caption, tag, crop, hotspot, asset->{ _id, url, metadata { lqip, dimensions { width, height } } } }`;

/** Resolves a Sanity image to a cropped URL, its cropped size and the editor's focal point. The image loader adds the size per screen. */
export function toImage(raw: RawImage | null | undefined): SanityImage | undefined {
  if (!raw?.asset) return undefined;
  const crop = raw.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const keepW = 1 - crop.left - crop.right;
  const keepH = 1 - crop.top - crop.bottom;
  const { width, height } = raw.asset.metadata.dimensions;
  // The hotspot is measured on the full image; express it relative to the cropped area.
  const position = raw.hotspot
    ? `${(((raw.hotspot.x - crop.left) / keepW) * 100).toFixed(1)}% ${(((raw.hotspot.y - crop.top) / keepH) * 100).toFixed(1)}%`
    : undefined;
  return {
    url: builder.image(raw).url(),
    alt: raw.alt ?? "",
    width: Math.round(width * keepW),
    height: Math.round(height * keepH),
    lqip: raw.asset.metadata.lqip,
    position,
  };
}

export function toPhoto(raw: RawImage): Photo | undefined {
  const image = toImage(raw);
  return image && { ...image, title: raw.title, caption: raw.caption, tag: raw.tag };
}
