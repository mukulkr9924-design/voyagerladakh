import { TRANSLATED_LOCALES } from "@/lib/i18n";

// A translation is a copy of an English document whose id adds the language: "homePage__fr",
// "activity-mountaineering__he", "<trip id>__fr". The site and the Studio both rely on this pattern.

export const translationId = (id: string, locale: string) => `${id}__${locale}`;

/** The document types that have French and Hebrew versions. */
export const TRANSLATABLE_TYPES = ["trip", "activity", "siteSettings", "homePage", "aboutPage", "contactPage", "planTripPage"];

/** The language of a translation's id, or undefined for an English document. */
export function translationLocale(id: string | undefined) {
  const suffix = id?.split("__")[1];
  return TRANSLATED_LOCALES.find((l) => l === suffix);
}
