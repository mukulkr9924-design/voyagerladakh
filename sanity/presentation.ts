import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation";
import { activityLabels, type ActivityType } from "@/lib/trips";

const page = (title: string, href: string) => defineLocations({ locations: [{ title, href }] });
const HOME = { title: "Home", href: "/" };

// Which pages each document appears on, shown at the top of the editor in Presentation.
const locations: NonNullable<PresentationPluginOptions["resolve"]>["locations"] = {
  trip: defineLocations({
    select: { title: "title", slug: "slug.current", type: "activityType" },
    resolve: (doc) =>
      doc?.slug && doc.type
        ? {
            locations: [
              { title: doc.title || "Untitled trip", href: `/${doc.type}/${doc.slug}` },
              { title: activityLabels[doc.type as ActivityType] ?? doc.type, href: `/${doc.type}` },
            ],
          }
        : null,
  }),
  activity: defineLocations({
    select: { name: "name", type: "type" },
    resolve: (doc) => (doc?.type ? { locations: [{ title: doc.name || doc.type, href: `/${doc.type}` }, HOME] } : null),
  }),
  homePage: page("Home", "/"),
  aboutPage: page("About", "/about"),
  contactPage: page("Contact", "/contact"),
  planTripPage: page("Plan your trip", "/plan-your-trip"),
  siteSettings: defineLocations({ message: "Used in the header, footer and banners on every page", locations: [HOME] }),
};

// Which document opens beside the preview for each URL. Fixed paths come before the patterns.
const mainDocuments = defineDocuments([
  { route: "/", filter: `_id == "homePage"` },
  { route: "/about", filter: `_id == "aboutPage"` },
  { route: "/contact", filter: `_id == "contactPage"` },
  { route: "/plan-your-trip", filter: `_id == "planTripPage"` },
  { route: "/:type", filter: `_type == "activity" && type == $type` },
  { route: "/:type/:slug", filter: `_type == "trip" && activityType == $type && slug.current == $slug` },
]);

export const presentation: PresentationPluginOptions = {
  title: "Live preview",
  previewUrl: {
    previewMode: { enable: "/api/draft-mode/enable", disable: "/api/draft-mode/disable" },
  },
  resolve: { locations, mainDocuments },
};
