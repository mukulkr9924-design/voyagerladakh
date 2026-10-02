import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL, tripPath } from "@/lib/activities";
import { getTrips } from "@/lib/content";
import { SHARE_IMAGE_WIDTH, sanityImageUrl } from "@/sanity/lib/imageUrl";
import { ACTIVITY_TYPES } from "@/lib/trips";

// Rebuilt hourly so trips added in the Studio are listed without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const trips = await getTrips();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    priority,
  });

  // A listing changes whenever one of its trips does.
  const latest = (list: typeof trips) => list.reduce<string | undefined>((max, t) => (max && max > t.updatedAt ? max : t.updatedAt), undefined);

  return [
    page("", 1),
    ...ACTIVITY_TYPES.map((type) => ({
      ...page(`/${type}`, 0.9),
      lastModified: latest(trips.filter((t) => t.activityType === type)),
    })),
    ...trips.map((t) => ({
      ...page(tripPath(t), 0.8),
      lastModified: t.updatedAt,
      images: [absoluteUrl(sanityImageUrl(t.heroImage.url, SHARE_IMAGE_WIDTH))],
    })),
    page("/plan-your-trip", 0.7),
    page("/about", 0.6),
    page("/contact", 0.6),
  ];
}
