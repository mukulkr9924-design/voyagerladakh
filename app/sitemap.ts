import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL, tripPath } from "@/lib/activities";
import { getTrips } from "@/lib/content";
import { LOCALES, localePath } from "@/lib/i18n";
import { SHARE_IMAGE_WIDTH, sanityImageUrl } from "@/sanity/lib/imageUrl";
import { ACTIVITY_TYPES } from "@/lib/trips";

// Rebuilt hourly so trips added in the Studio are listed without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Trip addresses and dates are the same in every language.
  const trips = await getTrips("en");

  // Each page is listed once per language, each entry linking to the others.
  const page = (path: string, priority: number, extra: Partial<MetadataRoute.Sitemap[number]> = {}): MetadataRoute.Sitemap => {
    const languages = Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${localePath(l, path).replace(/^\/$/, "")}`]));
    return LOCALES.map((l) => ({ url: languages[l], priority, alternates: { languages }, ...extra }));
  };

  // A listing changes whenever one of its trips does.
  const latest = (list: typeof trips) => list.reduce<string | undefined>((max, t) => (max && max > t.updatedAt ? max : t.updatedAt), undefined);

  return [
    ...page("/", 1),
    ...ACTIVITY_TYPES.flatMap((type) => page(`/${type}`, 0.9, { lastModified: latest(trips.filter((t) => t.activityType === type)) })),
    ...trips.flatMap((t) =>
      page(tripPath(t), 0.8, {
        lastModified: t.updatedAt,
        // Next writes image URLs into the XML as is; an unescaped "&" from the query string makes the whole sitemap invalid.
        images: [absoluteUrl(sanityImageUrl(t.heroImage.url, SHARE_IMAGE_WIDTH)).replace(/&/g, "&amp;")],
      }),
    ),
    ...page("/plan-your-trip", 0.7),
    ...page("/about", 0.6),
    ...page("/contact", 0.6),
  ];
}
