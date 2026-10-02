// Content queries. Everything here is edited in the Sanity Studio at /studio.
import { sanityFetch } from "@/sanity/lib/client";
import { IMAGE, type RawImage, toImage, toPhoto } from "@/sanity/lib/image";
import { ACTIVITY_TYPES, type ActivityType, type Photo, type SanityImage, type Trip } from "@/lib/trips";

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

export async function getSettings(): Promise<Settings> {
  const s = (await sanityFetch<RawSettings | null>(`*[_id == "siteSettings"][0]`)) ?? {};
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
export async function getActivities(): Promise<Activity[]> {
  const docs = await sanityFetch<Partial<Activity>[]>(`*[_type == "activity" && type in $types]`, { types: [...ACTIVITY_TYPES] });
  return ACTIVITY_TYPES.map((type) => {
    const a = docs.find((d) => d.type === type) ?? {};
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

export async function getActivity(type: ActivityType): Promise<Activity> {
  return (await getActivities()).find((a) => a.type === type)!;
}

/* ----------------------------------------------------------------------------- Trips */

const TRIP = `{
  "id": _id,
  "slug": slug.current,
  "updatedAt": _updatedAt,
  activityType, title, description, duration, difficulty, groupSize, bestSeason, start, end, stay,
  "heroImage": heroImage${IMAGE},
  "gallery": gallery[]${IMAGE},
  itinerary[]{ day, title, details, distanceKm, hours, gainM, lossM },
  elevationProfile[]{ name, km, altitude, kind },
  inclusions, exclusions
}`;

type RawTrip = Omit<Trip, "heroImage" | "gallery" | "itinerary" | "elevationProfile" | "inclusions" | "exclusions"> & {
  heroImage: RawImage | null;
  gallery: RawImage[] | null;
  itinerary: Trip["itinerary"] | null;
  elevationProfile: Trip["elevationProfile"] | null;
  inclusions: string[] | null;
  exclusions: string[] | null;
};

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
export async function getTrips(): Promise<Trip[]> {
  const raw = await sanityFetch<RawTrip[]>(
    `*[_type == "trip" && defined(slug.current) && activityType in $types] | order(orderRank asc, _createdAt asc) ${TRIP}`,
    { types: [...ACTIVITY_TYPES] },
  );
  return raw.map(toTrip);
}

export async function tripsFor(type: ActivityType): Promise<Trip[]> {
  return (await getTrips()).filter((t) => t.activityType === type);
}

export async function getTrip(type: ActivityType, slug: string): Promise<Trip | undefined> {
  return (await tripsFor(type)).find((t) => t.slug === slug);
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

export async function getHomePage(): Promise<HomePage> {
  const raw = await sanityFetch<(Omit<HomePage, "heroSlides" | "mapStops"> & { heroSlides: RawImage[] | null; mapStops: Partial<MapStop>[] | null }) | null>(
    `*[_id == "homePage"][0]{
      ..., "heroSlides": heroSlides[]${IMAGE}, "featuredTripIds": featuredTrips[]._ref
    }`,
  );
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

export async function getAboutPage(): Promise<AboutPage> {
  const raw = await sanityFetch<(Omit<AboutPage, "bannerImage" | "founderImage"> & { bannerImage: RawImage | null; founderImage: RawImage | null }) | null>(
    `*[_id == "aboutPage"][0]{ ..., "bannerImage": bannerImage${IMAGE}, "founderImage": founderImage${IMAGE} }`,
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

export async function getContactPage(): Promise<ContactPage> {
  const raw = await sanityFetch<(Omit<ContactPage, "bannerImage"> & { bannerImage: RawImage | null }) | null>(
    `*[_id == "contactPage"][0]{ ..., "bannerImage": bannerImage${IMAGE} }`,
  );
  return { ...raw, header: raw?.header ?? { title: "Contact us" }, bannerImage: toImage(raw?.bannerImage) };
}

export interface PlanTripPage {
  seo?: Seo;
  header: PageHeaderContent;
  steps: TextItem[];
}

export async function getPlanTripPage(): Promise<PlanTripPage> {
  const raw = await sanityFetch<PlanTripPage | null>(`*[_id == "planTripPage"][0]`);
  return { ...raw, header: raw?.header ?? { title: "Plan your trip" }, steps: raw?.steps ?? [] };
}
