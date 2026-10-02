// Trip content lives in Sanity (edit it at /studio); these types mirror the shapes the queries return.

export const ACTIVITY_TYPES = ["trekking-hiking", "mountaineering", "motorbike-touring", "soul-of-ladakh"] as const;
export type ActivityType = (typeof ACTIVITY_TYPES)[number];

export const DIFFICULTIES = ["Easy", "Moderate", "Challenging", "Advanced"] as const;
export type Difficulty = (typeof DIFFICULTIES)[number];

export const activityLabels: Record<ActivityType, string> = {
  "trekking-hiking": "Trekking & Hiking",
  "motorbike-touring": "Motorbike Touring",
  "soul-of-ladakh": "Soul of Ladakh",
  "mountaineering": "Mountaineering",
};

/** A Sanity image with its resolved URL and the fields the site renders. */
export interface SanityImage {
  url: string;
  alt: string;
  width: number;
  height: number;
  lqip?: string;
  /** Focal point chosen in the Studio, as a CSS object-position. */
  position?: string;
}

export interface DayPlan {
  day: string;
  title: string;
  details?: string;
  /** Walking stats, shown for trekking days when known. */
  distanceKm?: number;
  hours?: string;
  gainM?: number;
  lossM?: number;
}

/** A point on the trail, `km` measured from the trailhead. */
export interface Waypoint {
  name: string;
  km: number;
  altitude: number;
  kind: "village" | "camp" | "pass";
}

/** A photo for the trip gallery, captioned so travellers know what they're looking at. */
export interface Photo extends SanityImage {
  title?: string;
  caption?: string;
  /** Where on the trip the photo belongs, e.g. "Day 02" or "Homestay". */
  tag?: string;
}

export interface Trip {
  id: string;
  slug: string;
  /** Last publish time in the Studio (ISO date), used for the sitemap's lastmod. */
  updatedAt: string;
  activityType: ActivityType;
  title: string;
  description: string;
  duration: string;
  difficulty: Difficulty;
  groupSize: string;
  bestSeason: string;
  start: string;
  end: string;
  stay: string;
  heroImage: SanityImage;
  gallery: Photo[];
  itinerary: DayPlan[];
  /** Waypoints for the elevation chart; days are split using each day's `distanceKm`. */
  elevationProfile: Waypoint[];
  inclusions: string[];
  exclusions: string[];
}
