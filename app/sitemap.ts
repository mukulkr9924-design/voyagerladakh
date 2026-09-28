import type { MetadataRoute } from "next";
import { activities, SITE_URL, tripPath } from "@/lib/activities";
import { trips } from "@/lib/trips";

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    priority,
  });

  return [
    page("", 1),
    ...activities.map((a) => page(`/${a.type}`, 0.9)),
    ...trips.map((t) => ({
      ...page(tripPath(t), 0.8),
      images: t.images.slice(0, 1),
    })),
    page("/plan-your-trip", 0.7),
    page("/about", 0.6),
    page("/contact", 0.6),
  ];
}
