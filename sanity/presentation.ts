import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation";
import { DEFAULT_LOCALE, hasLocale, type Locale, localePath, LOCALES, TRANSLATED_LOCALES } from "@/lib/i18n";
import { activityLabels, type ActivityType } from "@/lib/trips";
import { translationId } from "@/sanity/translations";

/** A document's language: set on translations, empty on English documents. */
const languageOf = (doc: { language?: string } | null): Locale => (hasLocale(doc?.language) ? doc.language : DEFAULT_LOCALE);

const page = (title: string, path: string) =>
  defineLocations({
    select: { language: "language" },
    resolve: (doc) => ({ locations: [{ title, href: localePath(languageOf(doc), path) }] }),
  });

// Which pages each document appears on, shown at the top of the editor in Presentation.
const locations: NonNullable<PresentationPluginOptions["resolve"]>["locations"] = {
  trip: defineLocations({
    select: { title: "title", slug: "slug.current", type: "activityType", language: "language" },
    resolve: (doc) =>
      doc?.slug && doc.type
        ? {
            locations: [
              { title: doc.title || "Untitled trip", href: localePath(languageOf(doc), `/${doc.type}/${doc.slug}`) },
              { title: activityLabels[doc.type as ActivityType] ?? doc.type, href: localePath(languageOf(doc), `/${doc.type}`) },
            ],
          }
        : null,
  }),
  activity: defineLocations({
    select: { name: "name", type: "type", language: "language" },
    resolve: (doc) =>
      doc?.type
        ? {
            locations: [
              { title: doc.name || doc.type, href: localePath(languageOf(doc), `/${doc.type}`) },
              { title: "Home", href: localePath(languageOf(doc), "/") },
            ],
          }
        : null,
  }),
  homePage: page("Home", "/"),
  aboutPage: page("About", "/about"),
  contactPage: page("Contact", "/contact"),
  planTripPage: page("Plan your trip", "/plan-your-trip"),
  siteSettings: defineLocations({
    select: { language: "language" },
    resolve: (doc) => ({
      message: "Used in the header, footer and banners on every page",
      locations: [{ title: "Home", href: localePath(languageOf(doc), "/") }],
    }),
  }),
};

const idIn = (id: string, locale: Locale) => (locale === DEFAULT_LOCALE ? id : translationId(id, locale));

// Which document opens beside the preview for each URL. Fixed paths come before the patterns, and
// "/fr/:type" before "/:type/:slug", which would match it too.
const mainDocuments = defineDocuments([
  ...LOCALES.flatMap((locale) => [
    { route: localePath(locale, "/"), filter: `_id == "${idIn("homePage", locale)}"` },
    { route: localePath(locale, "/about"), filter: `_id == "${idIn("aboutPage", locale)}"` },
    { route: localePath(locale, "/contact"), filter: `_id == "${idIn("contactPage", locale)}"` },
    { route: localePath(locale, "/plan-your-trip"), filter: `_id == "${idIn("planTripPage", locale)}"` },
  ]),
  ...TRANSLATED_LOCALES.flatMap((locale) => [
    { route: `/${locale}/:type`, filter: `_type == "activity" && type == $type && language == "${locale}"` },
    { route: `/${locale}/:type/:slug`, filter: `_type == "trip" && activityType == $type && slug.current == $slug && language == "${locale}"` },
  ]),
  { route: "/:type", filter: `_type == "activity" && type == $type && !defined(language)` },
  { route: "/:type/:slug", filter: `_type == "trip" && activityType == $type && slug.current == $slug && !defined(language)` },
]);

export const presentation: PresentationPluginOptions = {
  title: "Live preview",
  previewUrl: {
    previewMode: { enable: "/api/draft-mode/enable", disable: "/api/draft-mode/disable" },
  },
  resolve: { locations, mainDocuments },
};
