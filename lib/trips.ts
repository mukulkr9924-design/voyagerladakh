export type ActivityType = "trekking" | "motorbike" | "spiritual" | "cultural";
export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Advanced";

export interface DayPlan {
  day: string;
  title: string;
  details: string;
}

export interface Trip {
  id: string;
  slug: string;
  activityType: ActivityType;
  title: string;
  duration: string;
  difficulty: Difficulty;
  price: number;
  groupSize: string;
  images: string[];
  itinerary: DayPlan[];
  inclusions: string[];
  exclusions: string[];
}

export const trips: Trip[] = [
  {
    id: "trek-01",
    slug: "markha-valley-trek",
    activityType: "trekking",
    title: "Markha Valley Trek",
    duration: "6 days",
    difficulty: "Moderate",
    price: 18900,
    groupSize: "8 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Arrival in Leh", details: "Acclimatization walk through Leh and briefing." },
      { day: "Day 02", title: "Leh to Shingo", details: "Drive to the trailhead and begin the valley walk." },
      { day: "Day 03", title: "Shingo to Markha", details: "Cross high passes and camp below the river." },
      { day: "Day 04", title: "Markha to Hankar", details: "Village trail and glacier views along the valley." },
      { day: "Day 05", title: "Hankar to Leh", details: "Long descent and transfer back to the capital." }
    ],
    inclusions: ["Local guide", "Porter support", "Camping", "All meals"],
    exclusions: ["Flights", "Personal gear", "Tips"]
  },
  {
    id: "trek-02",
    slug: "zanskar-trail",
    activityType: "trekking",
    title: "Zanskar High Trail",
    duration: "8 days",
    difficulty: "Challenging",
    price: 24900,
    groupSize: "6 people",
    images: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh to Lamayuru", details: "Drive through the moonscape and settle in." },
      { day: "Day 02", title: "Trail transfer", details: "Begin the valley walk through remote villages." },
      { day: "Day 03", title: "High camp", details: "Cross ridge paths and open terrain." },
      { day: "Day 04", title: "River valley", details: "Walk into the Zanskar basin and village camps." }
    ],
    inclusions: ["Guide", "Camping", "Heavy equipment support"],
    exclusions: ["Flights", "Personal clothing", "Insurance"]
  },
  {
    id: "bike-01",
    slug: "lehmotorbike-nubra-sky",
    activityType: "motorbike",
    title: "Leh to Nubra Circuit",
    duration: "7 days",
    difficulty: "Moderate",
    price: 22900,
    groupSize: "10 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh arrival", details: "Bike fit and route orientation." },
      { day: "Day 02", title: "Leh to Kargil", details: "Mountain highway ride through the Indus valley." },
      { day: "Day 03", title: "Nubra valley", details: "Cross Khardung La and reach desert villages." }
    ],
    inclusions: ["Motorbike", "Mechanic support", "Fuel", "Stay"],
    exclusions: ["Gear", "Personal purchases", "Park permit"]
  },
  {
    id: "spirit-01",
    slug: "leh-spiritual-retreat",
    activityType: "spiritual",
    title: "Leh Spiritual Retreat",
    duration: "4 days",
    difficulty: "Easy",
    price: 14900,
    groupSize: "14 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Arrival and settle", details: "Welcome, calm walk and orientation." },
      { day: "Day 02", title: "Monastery day", details: "Visit Thiksey and Hemis monasteries." },
      { day: "Day 03", title: "Inner Ladakh", details: "Prayer walk and reflection in the valley." },
      { day: "Day 04", title: "Departure", details: "Morning tea and transfer to airport." }
    ],
    inclusions: ["Monastery access", "Local guide", "Meals", "Transport"],
    exclusions: ["Flights", "Personal donations", "Insurance"]
  },
  {
    id: "culture-01",
    slug: "village-culture-leh",
    activityType: "cultural",
    title: "Village Culture Circuit",
    duration: "5 days",
    difficulty: "Easy",
    price: 16900,
    groupSize: "12 people",
    images: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh arrival", details: "Welcome and orientation in the old city." },
      { day: "Day 02", title: "Monastery route", details: "Meeting monks and learning about local traditions." },
      { day: "Day 03", title: "Village homestay", details: "Stay with a family and share daily routines." },
      { day: "Day 04", title: "Market and craft", details: "Visit bazaar and local craft workshops." }
    ],
    inclusions: ["Homestay", "Culture guide", "Meals", "Local transfer"],
    exclusions: ["Flights", "Personal shopping", "Tips"]
  }
];

export const activityLabels: Record<ActivityType, string> = {
  trekking: "Trekking & Hiking",
  motorbike: "Motorbike Touring",
  spiritual: "Spiritual Journeys",
  cultural: "Cultural & Village Tours"
};

export const activityColor: Record<ActivityType, string> = {
  trekking: "#98a869",
  motorbike: "#d88f4c",
  spiritual: "#af8a6c",
  cultural: "#87968d"
};

export function getTripsByActivity(activityType: ActivityType) {
  return trips.filter((trip) => trip.activityType === activityType);
}

export function getTripBySlug(slug: string) {
  return trips.find((trip) => trip.slug === slug);
}
