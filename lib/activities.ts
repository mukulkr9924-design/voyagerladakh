import type { ActivityType, Trip } from "@/lib/trips";
import { trips } from "@/lib/trips";

export const SITE_URL = "https://voyagerladakh.com";
export const SITE_NAME = "Voyager Ladakh";

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
      "Guided Ladakh treks from Leh: Sham Valley, Markha Valley, Lamayuru to Chilling, Rumtse to Tso Moriri and Zanskar crossings. Local guides, homestays and camping.",
    keywords: ["Ladakh trekking", "Markha Valley trek", "Sham Valley trek", "Zanskar trek", "Tso Moriri trek"],
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
      "Climb Kang Yatse I & II, Dzo Jongo and Mentok Kangri with a Leh-based team. Guided 6,000 m mountaineering expeditions with acclimatisation and technical support.",
    keywords: ["Ladakh mountaineering", "Kang Yatse expedition", "Dzo Jongo climb", "Mentok Kangri", "6000m peaks India"],
  },
  {
    type: "motorbike-touring",
    name: "Motorbike Touring",
    short: "Khardung La, Pangong and the high mountain highways.",
    heading: "Motorbike tours from Leh",
    intro:
      "Ride over some of the world's highest motorable passes to the dunes of Nubra and the shores of Pangong. Tours include well-maintained bikes, a backup vehicle and a mechanic who knows every hairpin.",
    metaTitle: "Motorbike Tours in Ladakh – Leh, Nubra & Pangong",
    metaDescription:
      "Leh motorbike tours over Khardung La to Nubra Valley and Pangong Lake. Bikes, backup vehicle, mechanic and local road captains included.",
    keywords: ["Ladakh bike trip", "Leh motorbike tour", "Khardung La ride", "Nubra Pangong bike tour"],
  },
  {
    type: "soul-of-ladakh",
    name: "Soul of Ladakh",
    short: "Monasteries, village homestays and quiet reflection.",
    heading: "Cultural & spiritual journeys",
    intro:
      "Slow journeys through Hemis and Thiksey monasteries, village homestays and craft traditions — designed for travellers who want to understand Ladakh, not just see it.",
    metaTitle: "Cultural & Spiritual Tours in Ladakh",
    metaDescription:
      "Monastery visits, village homestays and spiritual retreats around Leh. Slow, respectful cultural journeys hosted by local Ladakhi families.",
    keywords: ["Ladakh cultural tour", "Ladakh monastery tour", "Leh spiritual retreat", "Ladakh homestay"],
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
