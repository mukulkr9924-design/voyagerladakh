// Content queries. Everything here is edited in the Sanity Studio at /studio.
//
// English documents are the originals. A French or Hebrew version is a copy of one with "__fr" or
// "__he" added to its id (e.g. "homePage__fr"), made from the Studio's language sections. Any field
// left empty in a translation, or a document not translated yet, shows the English text.
import { DEFAULT_LOCALE, type Locale } from "@/lib/i18n";
import { getLocale } from "@/lib/locale";
import { sanityFetch } from "@/sanity/lib/client";
import { IMAGE, type RawImage, toImage, toPhoto } from "@/sanity/lib/image";
import { translationId } from "@/sanity/translations";
import { ACTIVITY_TYPES, type ActivityType, type Photo, type SanityImage, type Trip } from "@/lib/trips";

/* ----------------------------------------------------------------------------- Translations */

/** The given language, or the current page's when called from a page without one. */
const resolveLocale = async (locale?: Locale) => locale ?? (await getLocale());

const isEmpty = (v: unknown) => v === null || v === undefined || v === "" || (Array.isArray(v) && v.length === 0);

/**
 * The English document with the translation's non-empty fields laid over it. `shared` fields always
 * come from the English document: they set web addresses or how the page works, not what it says.
 */
function localize<T extends object>(base: T, translation: Partial<T> | null | undefined, shared: readonly string[] = []): T {
  if (!translation) return base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [key, value] of Object.entries(translation)) {
    // Skip the translation's own id, revision and language.
    if (key.startsWith("_") || key === "language") continue;
    if (!isEmpty(value) && !shared.includes(key)) out[key] = value;
  }
  return out as T;
}

/**
 * Translated list items, with `fields` (numbers, map positions) taken from the English item with the
 * same _key, so the translation can't drift from the English figures. Items keep their key copied
 * from English when a translation is made.
 */
function syncItems<T extends { _key?: string }>(items: T[], english: T[], fields: readonly (keyof T)[]): T[] {
  if (items === english) return items;
  return items.map((item) => {
    const source = english.find((e) => e._key && e._key === item._key);
    if (!source) return item;
    const synced = { ...item };
    for (const f of fields) synced[f] = source[f];
    return synced;
  });
}

/** Fetches a document and its translation in one query: `{ base, tr }`. */
async function fetchWithTranslation<T>(id: string, projection: string, locale: Locale) {
  return sanityFetch<{ base: T | null; tr: Partial<T> | null }>(
    `{ "base": *[_id == $id][0]${projection}, "tr": *[_id == $trId][0]${projection} }`,
    { id, trId: locale === DEFAULT_LOCALE ? "" : translationId(id, locale) },
  );
}

// The translation of each listed document, fetched alongside it as "tr" (see translationId).
const TRANSLATION = `"tr": *[_id == ^._id + "__" + $locale][0]`;

/* ----------------------------------------------------------------------------- Settings */

export interface Contact {
  person: string;
  phone: string;
  phoneHref: string;
  email: string;
  whatsapp: string;
  instagram?: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  /** Street on the first line, town and postcode on the second. */
  address: [string, string];
  latitude?: number;
  longitude?: number;
  mapUrl: string;
  openingHours?: string;
}

export interface Settings {
  contact: Contact;
  defaultTitle: string;
  description: string;
  keywords: string[];
  organizationDescription: string;
  footerBlurb: string;
  ctaTitle: string;
  ctaText: string;
  listingCtaTitle: string;
  listingCtaText: string;
}

type RawSettings = Partial<Omit<Settings, "contact">> & {
  contactPerson?: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
  streetAddress?: string;
  locality?: string;
  region?: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  openingHours?: string;
};

// Contact details are the same in every language.
const SETTINGS_SHARED = [
  "contactPerson", "phone", "email", "whatsapp", "instagram", "streetAddress", "postalCode", "latitude", "longitude", "openingHours",
] as const;

export async function getSettings(locale?: Locale): Promise<Settings> {
  const { base, tr } = await fetchWithTranslation<RawSettings>("siteSettings", "", await resolveLocale(locale));
  const s = localize(base ?? {}, tr, SETTINGS_SHARED);
  const phone = s.phone ?? "";
  const locality = s.locality ?? "Leh";
  const region = s.region ?? "Ladakh";
  const postalCode = s.postalCode ?? "";
  const streetAddress = s.streetAddress ?? "";
  const hasGeo = s.latitude !== undefined && s.longitude !== undefined;
  return {
    contact: {
      person: s.contactPerson ?? "",
      phone,
      phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}`,
      email: s.email ?? "",
      whatsapp: s.whatsapp ?? "",
      instagram: s.instagram,
      streetAddress,
      locality,
      region,
      postalCode,
      address: [streetAddress, `${locality}, ${region} ${postalCode}`.trim()],
      latitude: s.latitude,
      longitude: s.longitude,
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        hasGeo ? `${s.latitude},${s.longitude}` : `${streetAddress}, ${locality}`,
      )}`,
      openingHours: s.openingHours,
    },
    defaultTitle: s.defaultTitle ?? "Voyager Ladakh",
    description: s.description ?? "",
    keywords: s.keywords ?? [],
    organizationDescription: s.organizationDescription ?? s.description ?? "",
    footerBlurb: s.footerBlurb ?? "",
    ctaTitle: s.ctaTitle ?? "Ready to plan your Ladakh journey?",
    ctaText: s.ctaText ?? "",
    listingCtaTitle: s.listingCtaTitle ?? s.ctaTitle ?? "",
    listingCtaText: s.listingCtaText ?? s.ctaText ?? "",
  };
}

/* ----------------------------------------------------------------------------- Activities */

export interface Activity {
  type: ActivityType;
  name: string;
  short: string;
  heading: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
}

/** The four category pages, in menu order. */
export async function getActivities(locale?: Locale): Promise<Activity[]> {
  const docs = await sanityFetch<(Partial<Activity> & { tr: Partial<Activity> | null })[]>(
    `*[_type == "activity" && type in $types && !defined(language)]{ ..., ${TRANSLATION} }`,
    { types: [...ACTIVITY_TYPES], locale: await resolveLocale(locale) },
  );
  return ACTIVITY_TYPES.map((type) => {
    const doc = docs.find((d) => d.type === type);
    const a: Partial<Activity> = doc ? localize(doc, doc.tr, ["type"]) : {};
    const name = a.name ?? type;
    return {
      type,
      name,
      short: a.short ?? "",
      heading: a.heading ?? name,
      intro: a.intro ?? "",
      metaTitle: a.metaTitle ?? a.heading ?? name,
      metaDescription: a.metaDescription ?? a.intro ?? "",
      keywords: a.keywords ?? [],
    };
  });
}

export async function getActivity(type: ActivityType, locale?: Locale): Promise<Activity> {
  return (await getActivities(locale)).find((a) => a.type === type)!;
}

/* ----------------------------------------------------------------------------- Trips */

const TRIP_FIELDS = `
  "id": _id,
  "slug": slug.current,
  "updatedAt": _updatedAt,
  activityType, title, description, duration, difficulty, groupSize, bestSeason, start, end, stay,
  "heroImage": heroImage${IMAGE},
  "gallery": gallery[]${IMAGE},
  itinerary[]{ _key, day, title, details, distanceKm, hours, gainM, lossM },
  elevationProfile[]{ _key, name, km, altitude, kind },
  inclusions, exclusions`;

type Keyed<T> = T & { _key?: string };

type RawTrip = Omit<Trip, "heroImage" | "gallery" | "itinerary" | "elevationProfile" | "inclusions" | "exclusions"> & {
  heroImage: RawImage | null;
  gallery: RawImage[] | null;
  itinerary: Keyed<Trip["itinerary"][number]>[] | null;
  elevationProfile: Keyed<Trip["elevationProfile"][number]>[] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
};

// What sets a trip's web address, category and badge colour, plus the walking figures and trail
// points, stays as entered on the English trip.
const TRIP_SHARED = ["id", "slug", "updatedAt", "activityType", "difficulty"] as const;

function localizeTrip(raw: RawTrip & { tr: Partial<RawTrip> | null }): RawTrip {
  const { tr, ...base } = raw;
  const trip = localize<RawTrip>(base, tr, TRIP_SHARED);
  return {
    ...trip,
    itinerary: syncItems(trip.itinerary ?? [], base.itinerary ?? [], ["distanceKm", "gainM", "lossM"]),
    elevationProfile: syncItems(trip.elevationProfile ?? [], base.elevationProfile ?? [], ["km", "altitude", "kind"]),
  };
}

// Shown if a trip is published without a main photo, so pages never break.
const PLACEHOLDER_IMAGE: SanityImage = { url: "/voyager-ladakh-app-icon-512.png", alt: "", width: 512, height: 512 };

function toTrip(raw: RawTrip): Trip {
  const strip = <T extends object>(o: T) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== null)) as T;
  return {
    ...raw,
    heroImage: toImage(raw.heroImage) ?? PLACEHOLDER_IMAGE,
    gallery: (raw.gallery ?? []).map(toPhoto).filter((p): p is Photo => p !== undefined),
    // GROQ returns null for empty optional fields; the components expect them to be absent.
    itinerary: (raw.itinerary ?? []).map(strip),
    elevationProfile: raw.elevationProfile ?? [],
    inclusions: raw.inclusions ?? [],
    exclusions: raw.exclusions ?? [],
  };
}

/** All published trips, in the order set in the Studio. */
export async function getTrips(locale?: Locale): Promise<Trip[]> {
  const raw = await sanityFetch<(RawTrip & { tr: Partial<RawTrip> | null })[]>(
    `*[_type == "trip" && defined(slug.current) && activityType in $types && !defined(language)] | order(orderRank asc, _createdAt asc) {
      ${TRIP_FIELDS},
      ${TRANSLATION}{ ${TRIP_FIELDS} }
    }`,
    { types: [...ACTIVITY_TYPES], locale: await resolveLocale(locale) },
  );
  return raw.map((t) => toTrip(localizeTrip(t)));
}

export async function tripsFor(type: ActivityType, locale?: Locale): Promise<Trip[]> {
  return (await getTrips(locale)).filter((t) => t.activityType === type);
}

export async function getTrip(type: ActivityType, slug: string, locale?: Locale): Promise<Trip | undefined> {
  return (await tripsFor(type, locale)).find((t) => t.slug === slug);
}

/* ----------------------------------------------------------------------------- Pages */

export interface Seo {
  title?: string;
  description?: string;
  keywords?: string[];
}

export interface PageHeaderContent {
  kicker?: string;
  title: string;
  intro?: string;
}

export interface TextItem {
  title: string;
  desc?: string;
}

export interface MapStop {
  name: string;
  /** The stop's English name, which the map uses to place the mountain passes. */
  ref: string;
  x: number;
  y: number;
  label: "top" | "bottom" | "left" | "right";
  altitude: string;
  tag: string;
  tagline: string;
  desc: string;
  highlights: string[];
}

export interface HomePage {
  heroKicker?: string;
  heroTitle: string;
  heroTitleEmphasis?: string;
  heroLede?: string;
  heroSlides: SanityImage[];
  heroStats: { label: string; value: string }[];
  journeysKicker?: string;
  journeysTitle?: string;
  featuredKicker?: string;
  featuredTitle?: string;
  featuredTripIds: string[];
  whyKicker?: string;
  whyTitle?: string;
  reasons: TextItem[];
  mapKicker?: string;
  mapTitle?: string;
  mapIntro?: string;
  mapStops: MapStop[];
  faqKicker?: string;
  faqTitle?: string;
  faqs: { q: string; a: string }[];
}

type RawHomePage = Omit<HomePage, "heroSlides" | "mapStops"> & { heroSlides: RawImage[] | null; mapStops: Keyed<Partial<MapStop>>[] | null };

export async function getHomePage(locale?: Locale): Promise<HomePage> {
  const { base, tr } = await fetchWithTranslation<RawHomePage>(
    "homePage",
    `{ ..., "heroSlides": heroSlides[]${IMAGE}, "featuredTripIds": featuredTrips[]._ref }`,
    await resolveLocale(locale),
  );
  // Featured trips are picked once, on the English page.
  const english = base?.mapStops ?? [];
  const merged = base ? localize(base, tr, ["featuredTripIds"]) : null;
  const raw = merged && {
    ...merged,
    // Each stop keeps its English position on the map and its English name for placing the passes.
    mapStops: syncItems(merged.mapStops ?? [], english, ["x", "y", "label"]).map((s) => ({
      ...s,
      ref: english.find((e) => e._key && e._key === s._key)?.name ?? s.name,
    })),
  };
  return {
    ...raw,
    heroTitle: raw?.heroTitle ?? "",
    heroSlides: (raw?.heroSlides ?? []).map(toImage).filter((i): i is SanityImage => i !== undefined),
    heroStats: raw?.heroStats ?? [],
    featuredTripIds: raw?.featuredTripIds ?? [],
    reasons: raw?.reasons ?? [],
    mapStops: (raw?.mapStops ?? [])
      .filter((s) => s.name && s.x !== undefined && s.y !== undefined)
      .map((s) => ({
        name: s.name!,
        ref: s.ref ?? s.name!,
        x: s.x!,
        y: s.y!,
        label: s.label ?? "bottom",
        altitude: s.altitude ?? "",
        tag: s.tag ?? "",
        tagline: s.tagline ?? "",
        desc: s.desc ?? "",
        highlights: s.highlights ?? [],
      })),
    faqs: raw?.faqs ?? [],
  };
}

/** A page document in the given language, falling back to English field by field. */
async function getPage<T extends object>(id: string, projection: string, locale?: Locale): Promise<T | null> {
  const { base, tr } = await fetchWithTranslation<T>(id, projection, await resolveLocale(locale));
  return base && localize(base, tr);
}

export interface AboutPage {
  seo?: Seo;
  header: PageHeaderContent;
  storyTitle?: string;
  story: string[];
  bannerImage?: SanityImage;
  bannerCaption?: string;
  founderKicker?: string;
  founderTitle?: string;
  founderMeta?: string;
  founderImage?: SanityImage;
  founderCaption?: string;
  founderBio: string[];
  founderSignoff?: string;
  valuesKicker?: string;
  valuesTitle?: string;
  values: TextItem[];
}

export async function getAboutPage(locale?: Locale): Promise<AboutPage> {
  const raw = await getPage<Omit<AboutPage, "bannerImage" | "founderImage"> & { bannerImage: RawImage | null; founderImage: RawImage | null }>(
    "aboutPage",
    `{ ..., "bannerImage": bannerImage${IMAGE}, "founderImage": founderImage${IMAGE} }`,
    locale,
  );
  return {
    ...raw,
    header: raw?.header ?? { title: "About us" },
    story: raw?.story ?? [],
    bannerImage: toImage(raw?.bannerImage),
    founderImage: toImage(raw?.founderImage),
    founderBio: raw?.founderBio ?? [],
    values: raw?.values ?? [],
  };
}

export interface ContactPage {
  seo?: Seo;
  header: PageHeaderContent;
  bannerImage?: SanityImage;
  formTitle?: string;
}

export async function getContactPage(locale?: Locale): Promise<ContactPage> {
  const raw = await getPage<Omit<ContactPage, "bannerImage"> & { bannerImage: RawImage | null }>(
    "contactPage",
    `{ ..., "bannerImage": bannerImage${IMAGE} }`,
    locale,
  );
  return { ...raw, header: raw?.header ?? { title: "Contact us" }, bannerImage: toImage(raw?.bannerImage) };
}

export interface PlanTripPage {
  seo?: Seo;
  header: PageHeaderContent;
  steps: TextItem[];
}

export async function getPlanTripPage(locale?: Locale): Promise<PlanTripPage> {
  const raw = await getPage<PlanTripPage>("planTripPage", "", locale);
  return { ...raw, header: raw?.header ?? { title: "Plan your trip" }, steps: raw?.steps ?? [] };
}
