import type { ActivityType, Trip } from "@/lib/trips";
import { trips } from "@/lib/trips";

export const SITE_URL = "https://voyagerladakh.com";
export const SITE_NAME = "Voyager Ladakh";

// Share image for pages without their own trip photo.
export const OG_FALLBACK_IMAGE = { url: "/voyager-ladakh-app-icon-512.png", width: 512, height: 512, alt: SITE_NAME };

// Next merges metadata shallowly: a page's `openGraph` replaces the layout's entirely,
// so every page builds its Open Graph block from this to keep the site name and image.
export function openGraphFor(url: string, title: string, description: string, images: { url: string; width?: number; height?: number; alt?: string }[] = [OG_FALLBACK_IMAGE]) {
  return { siteName: SITE_NAME, locale: "en_IN", type: "website" as const, url, title, description, images };
}

export const CONTACT = {
  phone: "+91 9541379356",
  phoneHref: "tel:+919541379356",
  email: "contact@voyagerladakh.com",
  whatsapp: "https://wa.me/message/FTJZMEYIZMYRE1",
  instagram: "https://www.instagram.com/8_wonders_itself/",
  address: ["Near Akama Restaurant, Zumpa Choglamsar", "Leh, Ladakh 194104"],
  person: "Tsewang Chosdup",
};

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

export const activities: Activity[] = [
  {
    type: "trekking-hiking",
    name: "Trekking & Hiking",
    short: "High passes, river valleys and remote ridge trails.",
    heading: "Trekking & hiking in Ladakh",
    intro:
      "From the gentle apricot-village walks of Sham Valley to multi-day crossings of 5,000 m passes on the Markha and Rupshu trails, every trek is led by local Ladakhi guides with homestay or camping support.",
    metaTitle: "Trekking & Hiking Tours in Ladakh",
    metaDescription:
      "Guided Ladakh treks from Leh: Sham Valley, Markha Valley, Lamayuru to Chilling, Rumtse to Tso Moriri, Nubra and Zanskar crossings. Local guides, homestays and camping.",
    keywords: ["Ladakh trekking", "Markha Valley trek", "Sham Valley trek", "Zanskar trek", "Tso Moriri trek", "Nubra Valley trek"],
  },
  {
    type: "mountaineering",
    name: "Mountaineering",
    short: "6,000 m peaks, glacier travel and summit pushes.",
    heading: "Mountaineering expeditions in Ladakh",
    intro:
      "Kang Yatse, Dzo Jongo and Mentok Kangri are some of the most rewarding 6,000 m objectives in the Indian Himalaya. Our expeditions include acclimatisation days, certified guides and full technical support.",
    metaTitle: "Mountaineering Expeditions in Ladakh – 6,000 m Peaks",
    metaDescription:
      "Climb Kang Yatse I, Kang Yatse II, Dzo Jongo and Mentok Kangri with a Leh-based team. Guided 6,000 m mountaineering expeditions with acclimatisation and technical support.",
    keywords: ["Ladakh mountaineering", "Kang Yatse expedition", "Dzo Jongo climb", "Mentok Kangri", "6000m peaks India"],
  },
  {
    type: "motorbike-touring",
    name: "Motorbike Touring",
    short: "Umling La, Khardung La, Pangong and the Srinagar–Leh–Manali highways.",
    heading: "Motorbike tours in Ladakh",
    intro:
      "Ride the Srinagar–Leh–Manali highways and over the Umling La, the highest motorable road in the world, by way of Khardung La, Nubra, Pangong and Hanle. Tours include a Royal Enfield Himalayan with fuel, a support vehicle, a road captain and a mechanic who knows every hairpin.",
    metaTitle: "Ladakh Bike Trips – Srinagar, Leh, Umling La & Manali",
    metaDescription:
      "Guided Royal Enfield tours from Srinagar or Leh to Manali over Khardung La and Umling La, via Nubra, Pangong, Hanle and Tso Moriri. Bike, fuel, backup vehicle and mechanic included.",
    keywords: ["Ladakh bike trip", "Srinagar Leh Manali bike trip", "Umling La bike trip", "Leh motorbike tour", "Khardung La ride", "Hanle Tso Moriri bike tour"],
  },
  {
    type: "soul-of-ladakh",
    name: "Soul of Ladakh",
    short: "Monasteries, village walks, Zanskar and the snow leopard.",
    heading: "Cultural, spiritual & wildlife journeys",
    intro:
      "Slow journeys through Ladakh's monasteries and villages: a spiritual retreat from Lamayuru and Hemis to Nubra and Tso Moriri, short village walks in Stok, Sang and Tar, the road into Zanskar and a winter search for the snow leopard in Hemis National Park.",
    metaTitle: "Cultural, Spiritual & Wildlife Tours in Ladakh",
    metaDescription:
      "Monastery retreats, Leh sightseeing, village walks in Stok, Sang and Tar, a Zanskar cultural tour and snow leopard expeditions in Hemis National Park, hosted by local Ladakhis.",
    keywords: ["Ladakh cultural tour", "Ladakh monastery tour", "Ladakh spiritual retreat", "Ladakh sightseeing tour", "Zanskar cultural tour", "snow leopard tour Ladakh", "Ladakh village walk"],
  },
];

export function getActivity(type: ActivityType): Activity {
  return activities.find((a) => a.type === type)!;
}

export function tripsFor(type: ActivityType): Trip[] {
  return trips.filter((t) => t.activityType === type);
}

export function tripPath(trip: Trip) {
  return `/${trip.activityType}/${trip.slug}`;
}

export function formatPrice(price: number) {
  return price.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

/** "10 people" reads as a maximum; a range like "3–5 people" is shown as is. */
export function formatGroupSize(size: string) {
  return /\d\s*[–-]\s*\d/.test(size) ? size : `Up to ${size}`;
}
