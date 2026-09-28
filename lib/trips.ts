export type ActivityType = "trekking-hiking" | "motorbike-touring" | "soul-of-ladakh" | "mountaineering";
export type Difficulty = "Easy" | "Moderate" | "Challenging" | "Advanced";

export interface DayPlan {
  day: string;
  title: string;
  details: string;
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

export interface Trip {
  id: string;
  slug: string;
  activityType: ActivityType;
  title: string;
  description: string;
  duration: string;
  difficulty: Difficulty;
  price: number;
  groupSize: string;
  images: string[];
  itinerary: DayPlan[];
  /** Waypoints for the elevation chart; days are split using each day's `distanceKm`. */
  elevationProfile?: Waypoint[];
  inclusions: string[];
  exclusions: string[];
}

export const trips: Trip[] = [
  {
    id: "trek-01",
    slug: "sham-valley-trek",
    activityType: "trekking-hiking",
    title: "Sham Valley Trek",
    description: "Known as the \"Baby Trek,\" this gentle 3-day, 32 km route crosses four low passes through the Sham region, Ladakh's lower Indus valley, linking the monastery villages of Likir, Yangthang, Hemis Shukpachen and Temisgam. Nights are spent in village homestays, it tops out at just 3,874m and can be walked almost year-round, making it ideal for beginners and families. Extend it to 4–5 days via Rizong monastery or onwards from Temisgam to Khaltse.",
    duration: "3 days",
    difficulty: "Easy",
    price: 12500,
    groupSize: "6–7 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Likir to Yangthang",
        details: "Drive 60 km (about 1.5 hrs) from Leh to Likir and visit Likir monastery before setting off. The trail climbs to the Phobe La, drops to Sumdo village, then rises steadily to the Chagatse La before descending to Yangthang. Overnight in a village homestay.",
        distanceKm: 10.1,
        hours: "3–4 hrs",
        gainM: 431,
        lossM: 274
      },
      {
        day: "Day 02",
        title: "Yangthang to Hemis Shukpachen via Tsermangchen La",
        details: "Cross the Tsermangchen La, visible right from Yangthang, and take in the panoramic views from the top. Descend to the charming village of Hemis Shukpachen. Overnight in a village homestay.",
        distanceKm: 10.4,
        hours: "3–4 hrs",
        gainM: 238,
        lossM: 283
      },
      {
        day: "Day 03",
        title: "Hemis Shukpachen to Temisgam, drive to Leh",
        details: "Climb to the Mebtak La, the high point of the trek, and walk down to the village of Ang. Follow the trail on to Temisgam to visit its palace and monastery on a hillock, then drive 90 km (about 2.5 hrs) back to Leh, or stay a night in a Temisgam homestay.",
        distanceKm: 11.3,
        hours: "4 hrs",
        gainM: 312,
        lossM: 714
      }
    ],
    // Pass and village altitudes are approximate, fitted to the daily gain/loss figures.
    elevationProfile: [
      { name: "Likir", km: 0, altitude: 3468, kind: "village" },
      { name: "Phobe La", km: 3.4, altitude: 3580, kind: "pass" },
      { name: "Sumdo", km: 5.6, altitude: 3420, kind: "village" },
      { name: "Chagatse La", km: 8.2, altitude: 3630, kind: "pass" },
      { name: "Yangthang", km: 10.1, altitude: 3625, kind: "village" },
      { name: "Tsermangchen La", km: 14.2, altitude: 3750, kind: "pass" },
      { name: "Hemis Shukpachen", km: 20.5, altitude: 3580, kind: "village" },
      { name: "Mebtak La", km: 24.6, altitude: 3874, kind: "pass" },
      { name: "Ang", km: 28.2, altitude: 3330, kind: "village" },
      { name: "Temisgam", km: 31.8, altitude: 3178, kind: "village" }
    ],
    inclusions: ["Local guide", "Homestay/Camping", "All meals", "Transport"],
    exclusions: ["Flights", "Personal gear", "Tips"]
  },
  {
    id: "trek-02",
    slug: "lamayuru-chilling-trek",
    activityType: "trekking-hiking",
    title: "Lamayuru to Chilling Trek",
    description: "A 5-day, 63 km trek from the \"Moonland\" monastery of Lamayuru through rural villages of green barley fields and apricot trees to Chilling on the Zanskar river. It crosses three passes, topping out at the 4,948m Kongskil La, with sweeping views of the Stok and Karakoram ranges. Homestays in Wanla and Hinju, then camping in the high country.",
    duration: "5 days",
    difficulty: "Challenging",
    price: 24500,
    groupSize: "3–4 people",
    images: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Lamayuru to Wanla via Prinkti La",
        details: "Drive 115 km (about 3 hrs) from Leh to Lamayuru and visit the monastery built on the hill right above the village. Cross the Prinkti La, walk through Shilla village and reach Wanla. Overnight in a village homestay.",
        distanceKm: 9.1,
        hours: "3–4 hrs",
        gainM: 369,
        lossM: 592
      },
      {
        day: "Day 02",
        title: "Wanla to Hinju",
        details: "Keep to the trail along the river bank, passing through villages amidst green fields, and climb gently to Hinju. Overnight in a village homestay.",
        distanceKm: 16.5,
        hours: "6 hrs",
        gainM: 639,
        lossM: 0
      },
      {
        day: "Day 03",
        title: "Hinju to Sumda Doksa via Kongskil La",
        details: "Cross the Kongskil La, the highest pass on this trek, with spectacular views of the Karakoram and Stok mountains, then walk down to the summer pastures of Sumda Doksa. Overnight in camp.",
        distanceKm: 11.4,
        hours: "6–7 hrs",
        gainM: 1163,
        lossM: 526
      },
      {
        day: "Day 04",
        title: "Sumda Doksa to Dung Dung Chan La base",
        details: "A short walk brings you to the village of Sumda Chenmo, after which the trail climbs to the base of the Dung Dung Chan La. Overnight in camp.",
        distanceKm: 15.8,
        hours: "6–7 hrs",
        gainM: 785,
        lossM: 779
      },
      {
        day: "Day 05",
        title: "Dung Dung Chan La to Chilling, drive to Leh",
        details: "Climb to the Dung Dung Chan La for your first view of Zanskar, then make the long descent to Chilling, a village known for its skilled silversmiths. Drive 60 km (about 1.5 hrs) back to Leh.",
        distanceKm: 10.3,
        hours: "3–4 hrs",
        gainM: 175,
        lossM: 1413
      }
    ],
    // Altitudes are approximate, fitted to the daily gain/loss figures and the 4,948m high point.
    elevationProfile: [
      { name: "Lamayuru", km: 0, altitude: 3369, kind: "village" },
      { name: "Prinkti La", km: 4.5, altitude: 3738, kind: "pass" },
      { name: "Wanla", km: 9.1, altitude: 3146, kind: "village" },
      { name: "Hinju", km: 25.6, altitude: 3785, kind: "village" },
      { name: "Kongskil La", km: 32.1, altitude: 4948, kind: "pass" },
      { name: "Sumda Doksa", km: 37.0, altitude: 4422, kind: "camp" },
      { name: "Sumda Chenmo", km: 41.0, altitude: 3643, kind: "village" },
      { name: "Dung Dung Chan La base", km: 52.8, altitude: 4428, kind: "camp" },
      { name: "Dung Dung Chan La", km: 55.3, altitude: 4603, kind: "pass" },
      { name: "Chilling", km: 63.1, altitude: 3190, kind: "village" }
    ],
    inclusions: ["Guide", "Porter support", "Homestays & camping equipment", "All meals"],
    exclusions: ["Flights", "Personal gear", "Insurance"]
  },
  {
    id: "trek-03",
    slug: "rumtse-tso-moriri-trek",
    activityType: "trekking-hiking",
    title: "Rumtse to Tso Moriri Trek",
    description: "One of Ladakh's most beautiful treks: 98 km over 7 days across the Changthang plateau of Rupshu, following the old salt road past Tso Kar to the turquoise shores of Tso Moriri. The route crosses numerous passes above 5,000m, topping out at the 5,435m Yalung Nyau La, and passes the camps of Changpa nomads with their pashmina goats and yaks. Exceptional, but demanding.",
    duration: "8 days",
    difficulty: "Challenging",
    price: 32000,
    groupSize: "3–4 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Rumtse to Kyamar",
        details: "Drive 80 km (about 2 hrs) from Leh to Rumtse. Follow the trail to Kyamar along what was once the salt road, used to carry salt from Tso Kar to Leh and the Indus valley. The landscapes are unlike the rest of Ladakh. Overnight in camp.",
        distanceKm: 10.9,
        hours: "4 hrs",
        gainM: 298,
        lossM: 0
      },
      {
        day: "Day 02",
        title: "Kyamar to Tisaling via Kyamar La & Mandalchan La",
        details: "Climb gradually to the Kyamar La for a fantastic view over Changthang, descend to the shepherds' shelter at Tiri Doksa, then cross the Mandalchan La and drop down to Tisaling. Overnight in camp.",
        distanceKm: 13.5,
        hours: "6–7 hrs",
        gainM: 786,
        lossM: 384
      },
      {
        day: "Day 03",
        title: "Tisaling to Ponganagu via Shibuk La",
        details: "The trail slowly gains height to the Shibuk La, with a spectacular view of Tso Kar from the top. Walk down to Ponganagu near the lake, an area known for migratory birds, kiang (wild asses), marmots and ibex. Overnight in camp.",
        distanceKm: 14.3,
        hours: "6 hrs",
        gainM: 377,
        lossM: 666
      },
      {
        day: "Day 04",
        title: "Ponganagu to Nuruchan",
        details: "Walk along the west side of Tso Kar, the \"white lake\" named for the salt deposited on its banks, watching for black-necked cranes and brahminy ducks, and continue to Nuruchan. Overnight in camp.",
        distanceKm: 17.8,
        hours: "5–6 hrs",
        gainM: 173,
        lossM: 145
      },
      {
        day: "Day 05",
        title: "Nuruchan to Gyamar Barma via Horlam Kongka La & Kyamayuri La",
        details: "Cross two passes, the Horlam Kongka La and the Kyamayuri La, meeting nomad families with their yaks, sheep and goats along the way. Overnight in camp at Gyamar Barma.",
        distanceKm: 19.3,
        hours: "7–8 hrs",
        gainM: 855,
        lossM: 339
      },
      {
        day: "Day 06",
        title: "Gyamar Barma to Gyamar via Kartse La",
        details: "A short day: cross the Kartse La and descend into the Gyamar valley at the foot of Yalung Nong. Overnight in camp.",
        distanceKm: 5.7,
        hours: "3 hrs",
        gainM: 213,
        lossM: 251
      },
      {
        day: "Day 07",
        title: "Gyamar to Korzok via Yalung Nyau La",
        details: "Cross the Yalung Nyau La, the highest pass of the trek, with a great view of Tso Moriri from the top, then walk down to Korzok village on the lake shore.",
        distanceKm: 16.3,
        hours: "5–6 hrs",
        gainM: 300,
        lossM: 905
      },
      {
        day: "Day 08",
        title: "Korzok to Leh",
        details: "Drive 215 km (about 7 hrs) from Korzok back to Leh."
      }
    ],
    // Altitudes are approximate, fitted to the daily gain/loss figures and the 5,435m high point.
    elevationProfile: [
      { name: "Rumtse", km: 0, altitude: 4218, kind: "village" },
      { name: "Kyamar", km: 10.9, altitude: 4516, kind: "camp" },
      { name: "Kyamar La", km: 15.4, altitude: 5116, kind: "pass" },
      { name: "Tiri Doksa", km: 18.4, altitude: 4866, kind: "camp" },
      { name: "Mandalchan La", km: 20.9, altitude: 5052, kind: "pass" },
      { name: "Tisaling", km: 24.4, altitude: 4918, kind: "camp" },
      { name: "Shibuk La", km: 29.4, altitude: 5295, kind: "pass" },
      { name: "Ponganagu", km: 38.7, altitude: 4629, kind: "camp" },
      { name: "Nuruchan", km: 56.5, altitude: 4657, kind: "camp" },
      { name: "Horlam Kongka La", km: 62.5, altitude: 4957, kind: "pass" },
      { name: "Kyamayuri La", km: 71.5, altitude: 5362, kind: "pass" },
      { name: "Gyamar Barma", km: 75.8, altitude: 5173, kind: "camp" },
      { name: "Kartse La", km: 78.3, altitude: 5386, kind: "pass" },
      { name: "Gyamar", km: 81.5, altitude: 5135, kind: "camp" },
      { name: "Yalung Nyau La", km: 86.5, altitude: 5435, kind: "pass" },
      { name: "Korzok", km: 97.8, altitude: 4530, kind: "village" }
    ],
    inclusions: ["Expert guide", "Pack animals & crew", "Full camping setup", "All meals"],
    exclusions: ["Flights", "Personal equipment", "Emergency evacuation"]
  },
  {
    id: "trek-04",
    slug: "markha-valley-chilling-trek",
    activityType: "trekking-hiking",
    title: "Markha Valley Trek (from Chilling)",
    description: "Ladakh's most popular trek, in a shorter and easier 6-day, 78 km version starting at Chilling. The trail follows the Markha river through villages tucked into a deep valley in Hemis National Park, home of the snow leopard, up to the high pastures of Nimaling and over the 5,260m Kongmaru La, with spectacular views of the Kang Yatse peaks. Homestays most nights.",
    duration: "6 days",
    difficulty: "Moderate",
    price: 25000,
    groupSize: "3–5 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Chilling to Skiu",
        details: "Drive 60 km (about 1.5 hrs) from Leh to Chilling. Cross the Zanskar river into Hemis National Park and follow the trail into the Markha valley to Skiu. Overnight in a village homestay.",
        distanceKm: 6.9,
        hours: "2–3 hrs",
        gainM: 189,
        lossM: 18
      },
      {
        day: "Day 02",
        title: "Skiu to Markha",
        details: "Continue along the river through small villages to Markha, a pretty village of around 20 households. Visit the old monastery and the ruined fort above the village. Overnight in a village homestay.",
        distanceKm: 21.2,
        hours: "6–7 hrs",
        gainM: 451,
        lossM: 57
      },
      {
        day: "Day 03",
        title: "Markha to Hankar",
        details: "Walk along the river, with the option to visit Techa gompa on its cliff near Umlung village. Overnight in a village homestay in Hankar.",
        distanceKm: 11.2,
        hours: "4–5 hrs",
        gainM: 305,
        lossM: 35
      },
      {
        day: "Day 04",
        title: "Hankar to Nimaling",
        details: "Climb from Hankar to Nimaling, where villagers bring their cattle to graze in summer. Enthusiastic trekkers can hike to the base of the Kang Yatse glacier in a few hours. Overnight in camp.",
        distanceKm: 10.7,
        hours: "5–6 hrs",
        gainM: 836,
        lossM: 25
      },
      {
        day: "Day 05",
        title: "Nimaling to Shang Sumdo via Kongmaru La",
        details: "Ascend the Kongmaru La for spectacular views of Kang Yatse and the Karakoram, then make the long, steep descent through the Shang gorge, crossing the river several times. Overnight in a homestay at Shang Sumdo.",
        distanceKm: 17.0,
        hours: "6–8 hrs",
        gainM: 439,
        lossM: 1601
      },
      {
        day: "Day 06",
        title: "Shang Sumdo to Hemis, drive to Leh",
        details: "Walk via Martselang to Hemis monastery, one of the best known in Ladakh (a jeep can be arranged from Shang Sumdo or Martselang instead). Drive 40 km (about 1 hr) back to Leh.",
        distanceKm: 10.7,
        hours: "3–4 hrs",
        gainM: 281,
        lossM: 283
      }
    ],
    // Altitudes are approximate, fitted to the daily gain/loss figures and the 5,260m high point.
    elevationProfile: [
      { name: "Chilling", km: 0, altitude: 3175, kind: "village" },
      { name: "Skiu", km: 6.9, altitude: 3346, kind: "village" },
      { name: "Markha", km: 28.1, altitude: 3740, kind: "village" },
      { name: "Hankar", km: 39.3, altitude: 4010, kind: "village" },
      { name: "Nimaling", km: 50.0, altitude: 4821, kind: "camp" },
      { name: "Kongmaru La", km: 54.0, altitude: 5260, kind: "pass" },
      { name: "Shang Sumdo", km: 67.0, altitude: 3659, kind: "village" },
      { name: "Martselang", km: 73.0, altitude: 3376, kind: "village" },
      { name: "Hemis", km: 77.7, altitude: 3657, kind: "village" }
    ],
    inclusions: ["Local guide", "Porter support", "Homestays & camping", "All meals"],
    exclusions: ["Flights", "Personal gear", "Tips"]
  },
  {
    id: "trek-05",
    slug: "markha-valley-zingchen-trek",
    activityType: "trekking-hiking",
    title: "Markha Valley Trek (from Zingchen)",
    description: "The fuller, more diverse version of the Markha valley trek: 7 days and 97 km from Zingchen, a short drive from Leh past Spituk, up the Rumbak valley to Yurutse and over the 4,941m Ganda La into the Markha valley, then on to Nimaling and over the 5,260m Kongmaru La. Remote villages, green oases in an immense arid landscape and a high chance of spotting wildlife in Hemis National Park.",
    duration: "7 days",
    difficulty: "Moderate",
    price: 28000,
    groupSize: "3–5 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Zingchen to Yurutse",
        details: "Drive from Leh past Spituk gompa to the trailhead at Zingchen. The trail continues through a narrow gorge until it opens into the valley leading to the small village of Yurutse. Overnight in a village homestay.",
        distanceKm: 8.2,
        hours: "4–5 hrs",
        gainM: 763,
        lossM: 17
      },
      {
        day: "Day 02",
        title: "Yurutse to Skiu via Ganda La",
        details: "A long day over the Ganda La, with a panoramic view of the Zanskar and Stok ranges from the pass, down to Skiu village in the Markha valley. Watch for marmots, Himalayan hares, pikas and eagles. Overnight in a village homestay.",
        distanceKm: 17.8,
        hours: "6–8 hrs",
        gainM: 813,
        lossM: 1595
      },
      {
        day: "Day 03",
        title: "Skiu to Markha",
        details: "A pleasant walk through small villages along the river to Markha, the largest village in the valley. Take time to visit the gompa and the ruins of an ancient fort above the village. Overnight in a village homestay.",
        distanceKm: 21.2,
        hours: "6–7 hrs",
        gainM: 451,
        lossM: 57
      },
      {
        day: "Day 04",
        title: "Markha to Hankar",
        details: "Follow the trail along the river, stopping at Techa gompa perched on top of a cliff. Overnight in a village homestay in Hankar.",
        distanceKm: 11.2,
        hours: "4–5 hrs",
        gainM: 305,
        lossM: 35
      },
      {
        day: "Day 05",
        title: "Hankar to Nimaling",
        details: "Climb to the plateau of Nimaling, where herders graze their animals from June to September. Hike to the base of the Kang Yatse glacier in a few hours if you have the energy. Overnight in camp.",
        distanceKm: 10.7,
        hours: "5–6 hrs",
        gainM: 836,
        lossM: 25
      },
      {
        day: "Day 06",
        title: "Nimaling to Shang Sumdo via Kongmaru La",
        details: "Climb the Kongmaru La, the highest pass of the trek, for a great view of the Kang Yatse peaks, then make the steep, long descent through the Shang gorge, crossing the river a few times. Overnight in a homestay at Shang Sumdo.",
        distanceKm: 17.0,
        hours: "6–8 hrs",
        gainM: 439,
        lossM: 1601
      },
      {
        day: "Day 07",
        title: "Shang Sumdo to Hemis, drive to Leh",
        details: "An easy walk via Martselang to Hemis, one of the most important gompas in Ladakh (a jeep can be arranged from Shang Sumdo or Martselang instead). Drive 40 km (about 1 hr) back to Leh.",
        distanceKm: 10.7,
        hours: "3–4 hrs",
        gainM: 281,
        lossM: 283
      }
    ],
    // Altitudes are approximate, fitted to the daily gain/loss figures and the 5,260m high point.
    elevationProfile: [
      { name: "Zingchen", km: 0, altitude: 3382, kind: "village" },
      { name: "Yurutse", km: 8.2, altitude: 4128, kind: "village" },
      { name: "Ganda La", km: 13.0, altitude: 4941, kind: "pass" },
      { name: "Skiu", km: 26.0, altitude: 3346, kind: "village" },
      { name: "Markha", km: 47.2, altitude: 3740, kind: "village" },
      { name: "Hankar", km: 58.4, altitude: 4010, kind: "village" },
      { name: "Nimaling", km: 69.1, altitude: 4821, kind: "camp" },
      { name: "Kongmaru La", km: 73.1, altitude: 5260, kind: "pass" },
      { name: "Shang Sumdo", km: 86.1, altitude: 3659, kind: "village" },
      { name: "Martselang", km: 92.1, altitude: 3376, kind: "village" },
      { name: "Hemis", km: 96.8, altitude: 3657, kind: "village" }
    ],
    inclusions: ["Guide", "Porter support", "Homestays & camping equipment", "All meals"],
    exclusions: ["Flights", "Personal gear", "Tips"]
  },
  {
    id: "trek-06",
    slug: "jhunglam-hemis-padum-trek",
    activityType: "trekking-hiking",
    title: "Jhunglam Trek (Hemis to Padum)",
    description: "A demanding 10-day, 141 km trek that starts at Hemis monastery and crosses the 5,260m Kongmaru La into the Markha valley. From Tachungtse it leaves the Markha trail behind for a seldom-used path over the Zalung Karpo La and Charchar La, through narrow canyons with many river crossings, to Zangla and the Zanskar valley. For experienced trekkers seeking rugged, off-the-beaten-path terrain.",
    duration: "12 days",
    difficulty: "Challenging",
    price: 38000,
    groupSize: "3–5 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Hemis to Shang Sumdo via Martselang",
        details: "Drive 40 km (about 1 hr) from Leh to Hemis and visit its gompa, one of the richest and largest in Ladakh, then walk via Martselang to Shang Sumdo (a jeep can be arranged instead). Overnight in a homestay.",
        distanceKm: 10.7,
        hours: "3–4 hrs",
        gainM: 283,
        lossM: 281
      },
      {
        day: "Day 02",
        title: "Shang Sumdo to Lartse",
        details: "The trail follows the river up a magnificent valley through the villages of Chokdo and Chuskurmo to Lartse. Overnight in camp.",
        distanceKm: 11.0,
        hours: "5–6 hrs",
        gainM: 914,
        lossM: 0
      },
      {
        day: "Day 03",
        title: "Lartse to Tachungtse via Kongmaru La",
        details: "Climb the Kongmaru La for a superb view of Kang Yatse, descend to Nimaling where villagers graze their livestock, and continue down to Tachungtse. Overnight in camp.",
        distanceKm: 11.9,
        hours: "6–7 hrs",
        gainM: 686,
        lossM: 904
      },
      {
        day: "Day 04",
        title: "Tachungtse to Yakrupal",
        details: "Leave the Markha valley behind and pass through the remote Langthang valley to Yakrupal. Overnight in camp.",
        distanceKm: 15.5,
        hours: "5–6 hrs",
        gainM: 545,
        lossM: 313
      },
      {
        day: "Day 05",
        title: "Yakrupal to Tilat Sumdo via Zalung Karpo La",
        details: "Cross the Zalung Karpo La, with a spectacular view of the Zanskar range and the Changthang plateau. After several river crossings, a long trail follows the Changchu river to Tilat Sumdo. Overnight in camp.",
        distanceKm: 25.6,
        hours: "8–9 hrs",
        gainM: 556,
        lossM: 1488
      },
      {
        day: "Day 06",
        title: "Tilat Sumdo to Charchar La base camp",
        details: "Cross the Changchu river into a beautiful narrow valley and follow the canyon, with several river crossings, to the base camp below the Charchar La. Overnight in camp.",
        distanceKm: 17.4,
        hours: "6–7 hrs",
        gainM: 706,
        lossM: 0
      },
      {
        day: "Day 07",
        title: "Charchar La to Zangla Sumdo",
        details: "Walk through spectacular gorges and cross the Charchar La, then make a steep descent to Zangla Sumdo. Overnight in camp.",
        distanceKm: 11.7,
        hours: "5–6 hrs",
        gainM: 595,
        lossM: 1187
      },
      {
        day: "Day 08",
        title: "Zangla Sumdo to Zangla",
        details: "A short, easy walk out to Zangla and the Zanskar valley. Visit the small hilltop palace-fortress. Overnight in a village homestay.",
        distanceKm: 7.2,
        hours: "3 hrs",
        gainM: 170,
        lossM: 338
      },
      {
        day: "Day 09",
        title: "Zangla to Karsha",
        details: "Cross the bridge over the Zanskar river near Pishu and climb gradually through Rinam to Karsha. Visit Karsha monastery, the largest and most important in Zanskar, rising almost vertically above the village. Overnight in a village homestay.",
        distanceKm: 18.7,
        hours: "6 hrs",
        gainM: 250,
        lossM: 210
      },
      {
        day: "Day 10",
        title: "Karsha to Padum",
        details: "A short, easy walk (or drive) to Padum, the capital of Zanskar. Overnight in a homestay.",
        distanceKm: 11.2,
        hours: "3 hrs",
        gainM: 77,
        lossM: 174
      },
      {
        day: "Day 11",
        title: "Padum to Kargil",
        details: "Begin the 450 km drive back to Leh over the Pensi La, with an overnight stop in Kargil or the Suru valley."
      },
      {
        day: "Day 12",
        title: "Kargil to Leh",
        details: "Drive back to Leh along the Srinagar–Leh highway."
      }
    ],
    // Altitudes are approximate, fitted to the daily gain/loss figures and the 5,260m high point.
    elevationProfile: [
      { name: "Hemis", km: 0, altitude: 3658, kind: "village" },
      { name: "Martselang", km: 4.7, altitude: 3377, kind: "village" },
      { name: "Shang Sumdo", km: 10.7, altitude: 3660, kind: "village" },
      { name: "Lartse", km: 21.7, altitude: 4574, kind: "camp" },
      { name: "Kongmaru La", km: 26.7, altitude: 5260, kind: "pass" },
      { name: "Nimaling", km: 29.7, altitude: 4821, kind: "camp" },
      { name: "Tachungtse", km: 33.6, altitude: 4356, kind: "camp" },
      { name: "Yakrupal", km: 49.1, altitude: 4588, kind: "camp" },
      { name: "Zalung Karpo La", km: 55.1, altitude: 5144, kind: "pass" },
      { name: "Tilat Sumdo", km: 74.7, altitude: 3656, kind: "camp" },
      { name: "Charchar La base", km: 92.1, altitude: 4362, kind: "camp" },
      { name: "Charchar La", km: 96.1, altitude: 4957, kind: "pass" },
      { name: "Zangla Sumdo", km: 103.8, altitude: 3770, kind: "camp" },
      { name: "Zangla", km: 111.0, altitude: 3602, kind: "village" },
      { name: "Karsha", km: 129.7, altitude: 3642, kind: "village" },
      { name: "Padum", km: 140.9, altitude: 3545, kind: "village" }
    ],
    inclusions: ["Expert guide", "Full support team", "High-altitude equipment", "All meals"],
    exclusions: ["Flights", "Personal gear", "Emergency evacuation"]
  },
  {
    id: "trek-07",
    slug: "nubra-valley-phyang-hunder-trek",
    activityType: "trekking-hiking",
    title: "Nubra Valley Trek (Phyang to Hunder)",
    description: "Follow an ancient trade route between the Indus and Nubra valleys, once part of the Silk Road network linking India with Central Asia. This 5-day, 59 km trek goes through one of the least-visited corners of Ladakh, over the 5,438m Lasermo La with the Indus on one side and Nubra on the other, down through the flower meadows of Hunder Dok to the sand dunes and Bactrian camels of Hunder.",
    duration: "6 days",
    difficulty: "Moderate",
    price: 26000,
    groupSize: "3–5 people",
    images: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Phyang to Phyang Phu",
        details: "Drive 20 km (about 30 min) from Leh to Phyang and visit the monastery on the hilltop above the village, then climb steadily to Phyang Phu, where villagers bring their animals to graze in summer. Overnight in camp.",
        distanceKm: 13.6,
        hours: "7–8 hrs",
        gainM: 1067,
        lossM: 0
      },
      {
        day: "Day 02",
        title: "Phyang Phu to Lasermo La south base",
        details: "A short acclimatisation day, walking gradually up to the base of the Lasermo La. Overnight in camp.",
        distanceKm: 3.3,
        hours: "2–3 hrs",
        gainM: 334,
        lossM: 0
      },
      {
        day: "Day 03",
        title: "Over the Lasermo La to its north base",
        details: "Start early for the long day over the Lasermo La, with great views of the peaks, the Indus valley on one side and the Nubra valley on the other. Descend to the north base. Overnight in camp.",
        distanceKm: 10.4,
        hours: "5–6 hrs",
        gainM: 483,
        lossM: 528
      },
      {
        day: "Day 04",
        title: "Lasermo La north base to Hunder Dok",
        details: "Walk down through a valley of meadows and flowers, following the stream to Hunder Dok, with its shepherd huts and grazing animals. Overnight in camp.",
        distanceKm: 16.8,
        hours: "4–5 hrs",
        gainM: 0,
        lossM: 849
      },
      {
        day: "Day 05",
        title: "Hunder Dok to Hunder",
        details: "Pass through the villages of Drok Gongma and Drok Yokma to Skarchen, then walk down a beautiful valley with views of Saser Kangri (7,672m) to the bridge and across the sand dunes of Hunder, home to Bactrian camels, a reminder of Silk Route times. Overnight in Hunder.",
        distanceKm: 15.4,
        hours: "4–5 hrs",
        gainM: 153,
        lossM: 1054
      },
      {
        day: "Day 06",
        title: "Hunder to Leh",
        details: "Drive 120 km (5–6 hrs) back to Leh over the Khardung La (5,602m), one of the world's highest motorable roads."
      }
    ],
    // Altitudes are approximate, fitted to the daily gain/loss figures and the 5,438m high point.
    elevationProfile: [
      { name: "Phyang", km: 0, altitude: 3554, kind: "village" },
      { name: "Phyang Phu", km: 13.6, altitude: 4621, kind: "camp" },
      { name: "Lasermo La south base", km: 16.9, altitude: 4955, kind: "camp" },
      { name: "Lasermo La", km: 21.9, altitude: 5438, kind: "pass" },
      { name: "Lasermo La north base", km: 27.3, altitude: 4910, kind: "camp" },
      { name: "Hunder Dok", km: 44.1, altitude: 4061, kind: "camp" },
      { name: "Hunder", km: 59.5, altitude: 3160, kind: "village" }
    ],
    inclusions: ["Expert guide", "Pack animals & crew", "Full camping setup", "All meals"],
    exclusions: ["Flights", "Personal gear", "Tips"]
  },
  {
    id: "bike-01",
    slug: "srinagar-leh-manali-bike-trip",
    activityType: "motorbike-touring",
    title: "Srinagar to Manali via Leh & Umling La",
    description: "The classic trans-Himalayan ride, 12 days and roughly 2,000 km on a Royal Enfield Himalayan. Start in the green meadows of Sonamarg, cross the Zoji La to Kargil and Leh, ride over the Khardung La to Nubra, take the remote Shyok road to Pangong Tso, then head deep into Changthang to Hanle and the Umling La (5,799m), the highest motorable road in the world. The trip finishes down the Leh–Manali highway over the Tanglang La, More Plains, Gata Loops and Baralacha La, through the Atal Tunnel to Manali.",
    duration: "12 days",
    difficulty: "Challenging",
    price: 44900,
    groupSize: "8–9 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Srinagar arrival, transfer to Sonamarg",
        details: "Arrive at Srinagar airport by noon and transfer 80 km to Sonamarg. Meet the team and your fellow riders in the evening for the trip briefing, group formation and riding rules. Overnight in a hotel."
      },
      {
        day: "Day 02",
        title: "Sonamarg to Kargil",
        details: "The first day on the Srinagar–Leh highway, 125 km over the Zoji La (3,528m), a pass that tests your riding on any given day. Stop at the Kargil War Memorial in Drass to pay homage to the Indian Army. Overnight in a hotel in Kargil."
      },
      {
        day: "Day 03",
        title: "Kargil to Leh",
        details: "A 220 km ride past the rock-carved Maitreya Buddha at Mulbekh, over the Namika La and Fotu La, and through the moonland landscape around Lamayuru monastery. Stop at Gurudwara Pathar Sahib, Magnetic Hill and the Sangam, the confluence of the Indus and Zanskar, before reaching Leh. Overnight in a hotel."
      },
      {
        day: "Day 04",
        title: "Leh to Hunder (Nubra Valley)",
        details: "Ride 125 km over the Khardung La (5,359m) to the Nubra valley, where desert, mountains and river meet. See the Bactrian camels on the Hunder dunes and the 32m Maitreya Buddha at Diskit, Nubra's oldest and largest monastery. Overnight in a camp or guesthouse."
      },
      {
        day: "Day 05",
        title: "Hunder to Pangong Tso",
        details: "The most remote ride of the trip, 145 km along the Shyok river road with water crossings, dry riverbeds and stretches of road that barely exist, to the shores of Pangong Tso. Overnight in a lakeside camp."
      },
      {
        day: "Day 06",
        title: "Pangong Tso to Hanle",
        details: "Ride 200 km south along the lake and through Chushul, past the Rezang La war memorial into the Changthang region. Hanle is home to a 17th-century Drukpa monastery with views over the whole valley, and the Indian Astronomical Observatory at about 4,500m, one of the highest in the world. Overnight in a guesthouse."
      },
      {
        day: "Day 07",
        title: "Hanle to Umling La and back",
        details: "A 180 km round trip to the Umling La (5,799m / 19,024 ft), the highest motorable road in the world and higher than Everest Base Camp. Stop for tea at the café on the way before riding back to Hanle. Overnight in a homestay."
      },
      {
        day: "Day 08",
        title: "Hanle to Leh",
        details: "A 260 km ride back to Leh along the Indus, stopping at Thiksey monastery, the Shakyamuni Buddha at Shey Palace, once Ladakh's summer capital, and the Druk White Lotus School, the 'Rancho's school' of the film 3 Idiots. Overnight in a hotel."
      },
      {
        day: "Day 09",
        title: "Rest day in Leh",
        details: "A day off the bike to rest, get the bikes serviced for the ride south, and explore Leh's old town, Shanti Stupa and the market at your own pace. Overnight in a hotel."
      },
      {
        day: "Day 10",
        title: "Leh to Sarchu",
        details: "Ride 220 km down the Leh–Manali highway over the Tanglang La (5,328m), across the 40 km More Plains at about 4,800m, past Pang and over the Lachulung La and Nakee La, then down the 21 hairpins of the Gata Loops to the high plateau of Sarchu on the Ladakh–Himachal border. Overnight in a camp."
      },
      {
        day: "Day 11",
        title: "Sarchu to Manali via the Atal Tunnel",
        details: "A rough 250 km day with water crossings and unpaved stretches over the Baralacha La (4,890m), past Suraj Tal and Deepak Tal, through Zing Zing Bar, Darcha, Jispa, Keylong and Tandi. Ride through the 9.02 km Atal Tunnel, the longest highway tunnel above 10,000 ft in the world, and back into green valleys to Manali. Overnight in a hotel."
      },
      {
        day: "Day 12",
        title: "Manali, overnight bus to Delhi",
        details: "Check out at 10 am after breakfast and leave your luggage at the hotel cloakroom. Spend the day exploring Manali, then board the overnight Volvo semi-sleeper bus to Delhi (530 km)."
      }
    ],
    inclusions: [
      "Royal Enfield Himalayan with fuel, Sonamarg to Manali",
      "Riding jacket for rider and pillion",
      "Breakfast and dinner every day",
      "Hotels, camps and homestays on triple sharing (double for couples)",
      "Experienced road captain and mechanic",
      "Support vehicle for luggage and bike backup",
      "First aid with portable oxygen",
      "All inner line permits and monument entry fees",
      "Srinagar airport to Sonamarg transfer",
      "Manali to Delhi Volvo semi-sleeper bus",
      "Two bonfire nights",
      "Trip completion certificate"
    ],
    exclusions: [
      "GST",
      "Lunches and personal beverages",
      "Flights to Srinagar",
      "Damage to the bike or riding gear from falls or accidents",
      "Medical and insurance costs",
      "Extra costs from weather, road closures or other delays"
    ]
  },
  {
    id: "bike-02",
    slug: "leh-umling-la-manali-bike-trip",
    activityType: "motorbike-touring",
    title: "Leh to Manali via Umling La & Tso Moriri",
    description: "An 11-day ride that starts in Leh and takes in the best of eastern Ladakh on a Royal Enfield Himalayan. Cross the Khardung La to Nubra and the Balti village of Turtuk, ride the Shyok road to Pangong Tso, then head through Changthang to Hanle and the Umling La (5,799m), the highest motorable road in the world. From the high lake of Tso Moriri, cross the More Plains and Baralacha La to Jispa, and finish through the Atal Tunnel in Manali.",
    duration: "11 days",
    difficulty: "Challenging",
    price: 39900,
    groupSize: "5–7 people",
    images: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      {
        day: "Day 01",
        title: "Leh arrival",
        details: "Arrive in Leh (3,500m) and spend the day resting to acclimatise. Overnight in a hotel."
      },
      {
        day: "Day 02",
        title: "Leh local ride to the Sangam",
        details: "A short ride west to the Hall of Fame war museum, the Magnetic Hill, where vehicles seem to roll uphill, and the Sangam, where the Indus and Zanskar rivers meet in two colours. If time permits, visit Gurudwara Pathar Sahib, then finish at Shanti Stupa for views over Leh. Overnight in a hotel."
      },
      {
        day: "Day 03",
        title: "Leh to Hunder (Nubra Valley)",
        details: "Ride over the Khardung La (5,359m) to the Nubra valley, where desert, mountains and river meet. See the Bactrian camels on the Hunder dunes and the 32m Maitreya Buddha at Diskit, Nubra's oldest and largest monastery. Overnight in a camp or guesthouse."
      },
      {
        day: "Day 04",
        title: "Hunder to Turtuk and back",
        details: "Ride along the Shyok river to Turtuk, a Balti village that was under Pakistan's control until 1971. Its language, culture and landscape of narrow valleys and apricot orchards are unlike anywhere else in Ladakh. Return to Hunder by evening."
      },
      {
        day: "Day 05",
        title: "Hunder to Pangong Tso",
        details: "The most remote ride of the trip, along the Shyok river road with water crossings, dry riverbeds and stretches of road that barely exist, to the shores of Pangong Tso. Overnight in a lakeside camp."
      },
      {
        day: "Day 06",
        title: "Pangong Tso to Hanle",
        details: "Catch sunrise over the lake, then ride south through Chushul to the Rezang La war memorial, which honours the soldiers of the 1962 war. Cross the high passes of Changthang to Hanle, a small village known for its monastery and the Indian Astronomical Observatory, one of the highest in the world. Overnight in a guesthouse."
      },
      {
        day: "Day 07",
        title: "Hanle to Umling La and back",
        details: "Ride through some of the most remote country in the world to the Umling La (5,799m / 19,024 ft), the highest motorable road on earth, then return to Hanle by the same route. Overnight in a homestay."
      },
      {
        day: "Day 08",
        title: "Hanle to Tso Moriri",
        details: "Ride to Nyoma, cross the Indus at Mahe Bridge and continue via Sumdo to Tso Moriri, a high-altitude lake ringed by snow peaks. Visit Korzok monastery above the lakeshore. Overnight in a camp."
      },
      {
        day: "Day 09",
        title: "Tso Moriri to Jispa",
        details: "A long day past Tso Kar onto the Leh–Manali highway, across the More Plains to Pang, over the Lachulung La and Nakee La, down the 21 hairpins of the Gata Loops to Sarchu, and over the Baralacha La (4,890m) to Jispa. Overnight in a hotel or camp."
      },
      {
        day: "Day 10",
        title: "Jispa to Manali via the Atal Tunnel",
        details: "Ride through Keylong and the 9.02 km Atal Tunnel, the longest highway tunnel above 10,000 ft in the world, and back into green valleys to Manali. Overnight in a hotel."
      },
      {
        day: "Day 11",
        title: "Manali, overnight bus to Delhi",
        details: "Check out at 10 am after breakfast and leave your luggage at the hotel cloakroom. Spend the day exploring Manali, then board the overnight Volvo semi-sleeper bus to Delhi."
      }
    ],
    inclusions: [
      "Royal Enfield Himalayan with fuel, Leh to Manali",
      "Breakfast and dinner every day",
      "Hotels, camps and homestays on triple sharing (double for couples)",
      "Experienced road captain and mechanic",
      "Support vehicle for luggage and bike backup",
      "First aid with portable oxygen",
      "All inner line permits and monument entry fees",
      "Manali to Delhi Volvo semi-sleeper bus"
    ],
    exclusions: [
      "GST",
      "Lunches and personal beverages",
      "Flights to Leh",
      "Damage to the bike or riding gear from falls or accidents",
      "Medical and insurance costs",
      "Extra costs from weather, road closures or other delays"
    ]
  },
  {
    id: "soul-01",
    slug: "ladakh-spiritual-retreat",
    activityType: "soul-of-ladakh",
    title: "Ladakh Spiritual Retreat",
    description: "An 8-day journey through the living heart of Ladakhi Buddhism. Visit the great monasteries of the Sham valley (Lamayuru, Alchi and Likir) and the Indus valley (Shey, Thiksey and Hemis), sit with a Ladakhi oracle, then cross the Khardung La to the gompas of Nubra before ending at the high lakes of Pangong and Tso Moriri. The pace is slow, with time to join morning prayers and simply be still.",
    duration: "8 days",
    difficulty: "Easy",
    price: 34900,
    groupSize: "2–8 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Arrive in Leh", details: "Transfer from the airport to your hotel and rest for the day to acclimatise to Leh's 3,500m altitude." },
      { day: "Day 02", title: "Sham valley monasteries", details: "Drive west along the Indus to Lamayuru, one of Ladakh's oldest monasteries, set above the eroded 'moonland'. Visit the 11th-century Alchi monastery, famous for its Kashmiri-style murals, and Likir monastery with its giant seated Maitreya Buddha. Return to Leh." },
      { day: "Day 03", title: "Shey, Thiksey, Hemis and an oracle", details: "Visit Shey palace and its great copper Buddha, then Thiksey monastery, built in the style of the Potala, and Hemis, Ladakh's largest and wealthiest monastery. In the afternoon, sit in on a session with a Ladakhi oracle (lhamo), a trance healing tradition still practised in the villages around Leh (subject to availability)." },
      { day: "Day 04", title: "Leh to Nubra valley via Khardung La", details: "Cross the Khardung La (5,359m) into the Nubra valley. Visit Diskit monastery and its 32m Maitreya statue overlooking the valley, then walk the sand dunes at Hunder. Overnight in Nubra." },
      { day: "Day 05", title: "Nubra valley", details: "Visit Samstanling monastery at Sumur and the small Ensa monastery, walk to the sacred lake of Yarab Tso, and soak in the Panamik hot springs. Overnight in Nubra." },
      { day: "Day 06", title: "Nubra to Pangong Lake", details: "Drive along the Shyok river to Pangong Tso, the long blue lake that stretches into Tibet. Quiet evening by the shore. Overnight at Pangong." },
      { day: "Day 07", title: "Pangong to Tso Moriri", details: "Drive south through Changthang to Tso Moriri and visit Korzok monastery, one of the highest in Ladakh, on the lake's western shore. Overnight at Korzok." },
      { day: "Day 08", title: "Return to Leh", details: "Drive back to Leh (about 6 hrs) and rest for the evening." }
    ],
    inclusions: [
      "Hotels, camps and homestays on twin sharing",
      "Breakfast and dinner every day",
      "Private vehicle with driver for all sightseeing",
      "English-speaking local guide",
      "Oracle session (subject to availability)",
      "Inner line permits"
    ],
    exclusions: ["GST", "Flights to Leh", "Lunches", "Monastery entry fees and personal donations", "Insurance", "Tips"]
  },
  {
    id: "soul-02",
    slug: "sang-valley-tour",
    activityType: "soul-of-ladakh",
    title: "Sang Valley Village Walk",
    description: "A gentle walk up the Sang (Shang) valley, a green side valley off the Indus near Hemis. Starting from Martselang, the trail follows the stream through barley fields and poplar groves to the village of Shang, its old gompa perched high above braided irrigation channels, and on to the new Shang monastery and Shang Sumdo. Do it as a day walk, or stay the night with a local family.",
    duration: "1–2 days",
    difficulty: "Easy",
    price: 4500,
    groupSize: "2–8 people",
    images: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Martselang to Shang Sumdo", details: "Drive about 1 hr from Leh to Martselang on the Indus. Walk up the valley to Shang Sumdo at the confluence of two streams, then on to Shang village and its old gompa. Lunch in the poplar grove by the new monastery. Return to Leh, or stay overnight in a village homestay.", distanceKm: 7, hours: "2–3 hrs" },
      { day: "Day 02", title: "Shang village and return to Leh (optional)", details: "Spend the morning with your host family in the fields and kitchen, then walk back down to Martselang and drive to Leh." }
    ],
    inclusions: ["Local guide", "Leh to Martselang return transfer", "Packed lunch", "Homestay with dinner and breakfast (2-day option)"],
    exclusions: ["Monastery entry fees and donations", "Personal expenses", "Tips"]
  },
  {
    id: "soul-03",
    slug: "stok-valley-tour",
    activityType: "soul-of-ladakh",
    title: "Stok Valley Tour",
    description: "A day in Stok, the village of Ladakh's royal family, just 15 km from Leh across the Indus. Explore Stok palace, built in 1820 by King Tsepal Namgyal and still home to the royal family, with a museum of royal costumes, jewellery, coins and thangkas. Visit Stok monastery, then wander through the barley fields and lanes of the village below Stok Kangri.",
    duration: "1 day",
    difficulty: "Easy",
    price: 2500,
    groupSize: "2–8 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Stok palace, monastery and village", details: "Drive 30 minutes from Leh to Stok. Tour the palace and its museum, walk ten minutes along the road to Stok monastery, then spend the afternoon walking through the village and its fields, with tea in a local home before returning to Leh." }
    ],
    inclusions: ["Local guide", "Leh to Stok return transfer", "Lunch and butter tea with a local family"],
    exclusions: ["Palace museum entry fees", "Personal expenses", "Tips"]
  },
  {
    id: "soul-04",
    slug: "tar-to-hipti-walk",
    activityType: "soul-of-ladakh",
    title: "Tar to Hipti Village Walk",
    description: "A full-day walk between two of the Sham region's most isolated villages. Tar can only be reached on foot, through a dramatic river gorge from Nurla on the Leh–Kargil highway. From Tar a steep zigzag trail climbs to the Hipti La (4,200m), with wide views over the Sham mountains and the Indus, before dropping to the small farming village of Hipti. Keep an eye out for blue sheep on the slopes.",
    duration: "1 day",
    difficulty: "Moderate",
    price: 4500,
    groupSize: "2–6 people",
    images: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Nurla to Tar, over the Hipti La to Hipti", details: "Early drive of about 2 hrs from Leh to Nurla. Walk up the gorge to Tar (about 2 hrs), then climb the zigzag trail to the Hipti La (4,200m) and descend to Hipti village, where the vehicle meets you for the drive back to Leh.", hours: "7–8 hrs" }
    ],
    inclusions: ["Local guide", "Leh to Nurla and Hipti to Leh transfers", "Packed lunch"],
    exclusions: ["Personal expenses", "Insurance", "Tips"]
  },
  {
    id: "soul-05",
    slug: "ladakh-sightseeing-tour",
    activityType: "soul-of-ladakh",
    title: "Ladakh Sightseeing Tour",
    description: "The classic 8-day loop through Ladakh's best-known sights. Explore Leh palace, Shanti Stupa and the Indus–Zanskar confluence, cross the Khardung La to the sand dunes and villages of Nubra, then head to Pangong Tso, the dark skies of Hanle and the shores of Tso Moriri before returning to Leh.",
    duration: "8 days",
    difficulty: "Easy",
    price: 32900,
    groupSize: "2–8 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Arrive in Leh", details: "Transfer from the airport to your hotel and rest for the day to acclimatise." },
      { day: "Day 02", title: "Leh sightseeing", details: "Visit the nine-storey Leh palace and Shanti Stupa above town, then drive west to Gurudwara Pathar Sahib, Magnetic Hill and the Sangam, where the Indus meets the Zanskar at Nimmu." },
      { day: "Day 03", title: "Leh to Nubra via Khardung La", details: "Cross the Khardung La (5,359m) into Nubra. Visit Diskit monastery and its giant Maitreya Buddha, then ride a double-humped Bactrian camel on the Hunder sand dunes. Overnight in Nubra." },
      { day: "Day 04", title: "Turtuk or Panamik", details: "Choose between a day trip to Turtuk, a Balti village close to the Line of Control, or the Panamik hot springs and the sacred lake of Yarab Tso. Visit Samstanling monastery at Sumur on the way. Overnight in Nubra." },
      { day: "Day 05", title: "Nubra to Pangong Lake", details: "Drive along the Shyok river to Pangong Tso and spend the evening watching the lake change colour. Overnight at Pangong." },
      { day: "Day 06", title: "Pangong to Hanle", details: "Drive south via Chushul to Hanle, home to the Indian Astronomical Observatory and part of the Hanle Dark Sky Reserve. Stargazing after dark. Overnight in Hanle." },
      { day: "Day 07", title: "Hanle to Tso Moriri", details: "Drive to Tso Moriri and the village of Korzok on its western shore. Overnight at Korzok." },
      { day: "Day 08", title: "Return to Leh", details: "Drive back to Leh (about 6 hrs) and rest for the evening." }
    ],
    inclusions: [
      "Hotels, camps and homestays on twin sharing",
      "Breakfast and dinner every day",
      "Private vehicle with driver for all sightseeing",
      "Inner line permits"
    ],
    exclusions: ["GST", "Flights to Leh", "Lunches", "Camel safari and monument entry fees", "Insurance", "Tips"]
  },
  {
    id: "soul-06",
    slug: "snow-leopard-expedition",
    activityType: "soul-of-ladakh",
    title: "Snow Leopard Expedition",
    description: "A winter wildlife expedition into the Rumbak valley in Hemis National Park, one of the best places in the world to see the snow leopard. Walk in from Spituk through the Zingchen gorge, then spend five days based in Rumbak village, heading out each day with expert spotters to track snow leopards, Tibetan wolves, blue sheep and golden eagles. Best in February and March, when the cats come down to lower valleys.",
    duration: "8 days",
    difficulty: "Moderate",
    price: 58000,
    groupSize: "2–6 people",
    images: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Spituk to Zingchen", details: "Visit Spituk monastery, then follow the south bank of the Indus and turn into the Zingchen gorge. The walk can be shortened by jeep.", distanceKm: 15.7, hours: "5 hrs", gainM: 375, lossM: 161 },
      { day: "Day 02", title: "Zingchen to Rumbak", details: "Enter Hemis National Park through a narrow gorge and climb to Rumbak village (3,956m). Overnight in a village homestay.", distanceKm: 6.5, hours: "2–3 hrs", gainM: 555, lossM: 0 },
      { day: "Days 03–07", title: "Tracking in the Rumbak valley", details: "Five days out with an expert guide and spotters, scanning ridges and side valleys with spotting scopes for snow leopards, Tibetan wolves, blue sheep, Ladakh urial and birds of prey. Evenings by the stove in the homestay." },
      { day: "Day 08", title: "Rumbak to Zingchen, drive to Leh", details: "Walk back down the gorge to Zingchen and drive to Leh.", distanceKm: 6.5, hours: "2–3 hrs", gainM: 0, lossM: 555 }
    ],
    inclusions: [
      "Expert wildlife guide and spotters",
      "Spotting scopes",
      "Village homestays with all meals",
      "Leh transfers",
      "Hemis National Park fees"
    ],
    exclusions: ["GST", "Flights to Leh", "Hotels in Leh", "Winter clothing and gear", "Insurance", "Tips"]
  },
  {
    id: "soul-07",
    slug: "zanskar-valley-cultural-tour",
    activityType: "soul-of-ladakh",
    title: "Zanskar Valley Cultural Tour",
    description: "A road journey of about 990 km into Zanskar, an isolated valley of remote villages where time seems to stand still. Travel through Lamayuru, the Mulbek rock-carved Buddha and the Suru valley below Nun (7,135m) and Kun (7,087m), cross the Pensi La past the 23 km Drang Drung glacier, and visit the great monasteries of Zanskar: Karsha, Stongde, Sani and the palace at Zangla.",
    duration: "6 days",
    difficulty: "Easy",
    price: 38900,
    groupSize: "2–8 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh to Kargil", details: "Drive west along the Indus past Lamayuru and over the Fotu La, stopping at the 1,000-year-old Maitreya Buddha carved into the rock at Mulbek and Shargole's cliffside monastery. Overnight in Kargil." },
      { day: "Day 02", title: "Kargil to Rangdum via the Suru valley", details: "Follow the Suru valley past the Nun and Kun massif and the Parkachik glacier to Rangdum and its monastery on a hillock in the middle of the valley. Overnight at Rangdum." },
      { day: "Day 03", title: "Rangdum to Padum via Pensi La", details: "Cross the Pensi La (4,400m) with views over the Drang Drung glacier and descend into Zanskar. Visit Sani monastery, one of the oldest in the region, before reaching Padum, Zanskar's small capital." },
      { day: "Day 04", title: "Monasteries of Zanskar", details: "Visit Karsha, the largest monastery in Zanskar, founded in the 11th century, Stongde, set 300m above the valley floor, and Zangla, with a short hike to its old palace and citadel. Overnight in Padum." },
      { day: "Day 05", title: "Padum to Kargil", details: "Visit Zongkhul, a cave monastery built into a cliff, then drive back over the Pensi La and down the Suru valley to Kargil." },
      { day: "Day 06", title: "Kargil to Leh", details: "Drive back to Leh along the Srinagar–Leh highway." }
    ],
    inclusions: [
      "Hotels, guesthouses and camps on twin sharing",
      "Breakfast and dinner every day",
      "Private vehicle with driver for the whole journey",
      "English-speaking local guide"
    ],
    exclusions: ["GST", "Flights to Leh", "Lunches", "Monastery entry fees and donations", "Insurance", "Tips"]
  },
  {
    id: "mount-01",
    slug: "kang-yatse-ii",
    activityType: "mountaineering",
    title: "Kang Yatse II (6,200m)",
    description: "The lower western summit of the Kang Yatse massif, approached via the Markha Valley trek from Chilling or Spituk. It needs no special mountaineering skills, making it ideal as a first Himalayan 6,000m summit. Scree slopes lead to a steep snow climb, with summit views stretching to K2 and the Zanskar range.",
    duration: "12-14 days",
    difficulty: "Moderate",
    price: 45000,
    groupSize: "4–5 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh arrival", details: "Acclimatization in Leh (3,500m)." },
      { day: "Day 02", title: "Leh acclimatization", details: "Explore local monasteries and prepare for expedition." },
      { day: "Day 03", title: "Leh to Chilling", details: "Drive to Chilling and begin trek to Skiu." },
      { day: "Day 04", title: "Skiu to Markha", details: "Trek through Markha Valley villages." },
      { day: "Day 05", title: "Markha to Hankar", details: "Continue up valley with Kang Yatse views." },
      { day: "Day 06", title: "Hankar to Nimaling", details: "Ascend to high camp at Nimaling (4,700m)." },
      { day: "Day 07", title: "Nimaling rest day", details: "Acclimatization and climbing skills training." },
      { day: "Day 08", title: "Nimaling to Base Camp", details: "Establish base camp at 5,200m." },
      { day: "Day 09", title: "Summit attempt", details: "Early start for summit bid (6,200m) and return to base camp." },
      { day: "Day 10", title: "Base Camp to Kongmaru La", details: "Cross Kongmaru La pass (5,150m) and descend to Shang." },
      { day: "Day 11", title: "Shang to Leh", details: "Walk to road and drive back to Leh." },
      { day: "Day 12", title: "Leh departure", details: "Transfer to airport." }
    ],
    inclusions: ["Climbing guide", "Porter support", "Camping equipment", "All meals", "Climbing gear"],
    exclusions: ["Flights", "Personal climbing gear", "Insurance", "Emergency evacuation"]
  },
  {
    id: "mount-02",
    slug: "kang-yatse-i",
    activityType: "mountaineering",
    title: "Kang Yatse I (6,400m)",
    description: "The true, higher summit of the Kang Yatse massif, reached via a technically demanding knife-edge ridge traverse. Approached via the Markha Valley, it should only be attempted by experienced climbers and sees far fewer ascents than its easier neighbour, Kang Yatse II.",
    duration: "14-16 days",
    difficulty: "Advanced",
    price: 55000,
    groupSize: "4–5 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh arrival", details: "Acclimatization in Leh (3,500m)." },
      { day: "Day 02", title: "Leh acclimatization", details: "Explore local monasteries and prepare for expedition." },
      { day: "Day 03", title: "Leh to Chilling", details: "Drive to Chilling and begin trek to Skiu." },
      { day: "Day 04", title: "Skiu to Markha", details: "Trek through Markha Valley villages." },
      { day: "Day 05", title: "Markha to Hankar", details: "Continue up valley with Kang Yatse views." },
      { day: "Day 06", title: "Hankar to Nimaling", details: "Ascend to high camp at Nimaling (4,700m)." },
      { day: "Day 07", title: "Nimaling rest day", details: "Acclimatization and technical climbing skills training." },
      { day: "Day 08", title: "Nimaling to Base Camp", details: "Establish base camp at 5,200m." },
      { day: "Day 09", title: "Base Camp to Advanced Base", details: "Move to advanced base camp at 5,600m." },
      { day: "Day 10", title: "Advanced Base to High Camp", details: "Establish high camp at 6,000m." },
      { day: "Day 11", title: "Summit attempt", details: "Early start for summit bid (6,400m) via knife-edge ridge and return to high camp." },
      { day: "Day 12", title: "Descent to Base Camp", details: "Return to base camp." },
      { day: "Day 13", title: "Base Camp to Kongmaru La", details: "Cross Kongmaru La pass (5,150m) and descend to Shang." },
      { day: "Day 14", title: "Shang to Leh", details: "Walk to road and drive back to Leh." },
      { day: "Day 15", title: "Leh departure", details: "Transfer to airport." }
    ],
    inclusions: ["Expert climbing guide", "Sherpa support", "Technical climbing equipment", "Full camping setup", "All meals"],
    exclusions: ["Flights", "Personal technical gear", "Insurance", "Emergency evacuation"]
  },
  {
    id: "mount-03",
    slug: "mentok-kangri",
    activityType: "mountaineering",
    title: "Mentok Kangri (6,250m)",
    description: "Rising above the western shore of Tso Moriri in the remote Rupshu-Changthang plateau, this semi-technical peak offers stunning views across the lake to the 6,600m Chamser and Lungser Kangri. The climb itself takes 3–4 days from Korzok village and pairs well with the Rumtse to Tso Moriri trek for acclimatisation.",
    duration: "10-12 days",
    difficulty: "Moderate",
    price: 42000,
    groupSize: "4–5 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh arrival", details: "Acclimatization in Leh (3,500m)." },
      { day: "Day 02", title: "Leh acclimatization", details: "Explore local monasteries and prepare for expedition." },
      { day: "Day 03", title: "Leh to Tso Moriri", details: "Drive to Tso Moriri lake via Mahe bridge." },
      { day: "Day 04", title: "Tso Moriri to Korzok", details: "Explore Korzok village and begin acclimatization at 4,500m." },
      { day: "Day 05", title: "Korzok to Base Camp", details: "Trek to base camp at 5,200m." },
      { day: "Day 06", title: "Base Camp rest", details: "Acclimatization and climbing skills training." },
      { day: "Day 07", title: "Base Camp to High Camp", details: "Establish high camp at 5,800m." },
      { day: "Day 08", title: "Summit attempt", details: "Early start for summit bid (6,250m) and return to base camp." },
      { day: "Day 09", title: "Base Camp to Korzok", details: "Return to Korzok village." },
      { day: "Day 10", title: "Korzok to Leh", details: "Drive back to Leh." },
      { day: "Day 11", title: "Leh departure", details: "Transfer to airport." }
    ],
    inclusions: ["Climbing guide", "Porter support", "Camping equipment", "All meals", "Basic climbing gear"],
    exclusions: ["Flights", "Personal climbing gear", "Insurance", "Emergency evacuation"]
  },
  {
    id: "mount-04",
    slug: "dzo-jongo-east-west",
    activityType: "mountaineering",
    title: "Dzo Jongo East & West (6,220m / 6,300m)",
    description: "Twin summits at the head of the Nimaling Valley, reached via the Markha Valley trek and facing the main peak of Kang Yatse. Dzo Jongo East (6,220m) is a straightforward plod up a snow-lined ridge, trickier near the top where it crosses boulder fields hidden beneath the snow — roughly a nine-hour round trip from base camp. The higher West summit is climbed separately from a high camp at 5,800m, up a rocky plateau and a rib of moraine, then a snow slope that steepens near the top and needs care after fresh snowfall. Among the easiest 6,000m peaks in the Himalaya, and a far gentler objective than Kang Yatse I.",
    duration: "11-13 days",
    difficulty: "Moderate",
    price: 38000,
    groupSize: "4–5 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh arrival", details: "Acclimatization in Leh (3,500m)." },
      { day: "Day 02", title: "Leh acclimatization", details: "Explore local monasteries and prepare for expedition." },
      { day: "Day 03", title: "Leh to Chilling", details: "Drive to Chilling and begin trek to Skiu." },
      { day: "Day 04", title: "Skiu to Markha", details: "Trek through Markha Valley villages." },
      { day: "Day 05", title: "Markha to Hankar", details: "Continue up valley with Kang Yatse views." },
      { day: "Day 06", title: "Hankar to Nimaling", details: "Ascend to high camp at Nimaling (4,700m)." },
      { day: "Day 07", title: "Nimaling rest day", details: "Acclimatisation hike up the Kongmaru La (5,270m) above camp, with views west to Dzo Jongo and Kang Yatse." },
      { day: "Day 08", title: "Nimaling to Base Camp", details: "Establish base camp at 5,200m." },
      { day: "Day 09", title: "Dzo Jongo East summit", details: "Summit Dzo Jongo East (6,220m) and return to base camp." },
      { day: "Day 10", title: "Dzo Jongo West summit", details: "Climb Dzo Jongo West (6,300m) from high camp at 5,800m, via a rocky plateau, moraine rib and final snow slope." },
      { day: "Day 11", title: "Base Camp to Kongmaru La", details: "Cross the Kongmaru La (5,270m) and descend to Shang." },
      { day: "Day 12", title: "Shang to Leh", details: "Walk to road and drive back to Leh." },
      { day: "Day 13", title: "Leh departure", details: "Transfer to airport." }
    ],
    inclusions: ["Climbing guide", "Porter support", "Camping equipment", "All meals", "Crampons, harness and rope"],
    exclusions: ["Flights", "Personal climbing gear", "Insurance", "Emergency evacuation"]
  }
];

export const activityLabels: Record<ActivityType, string> = {
  "trekking-hiking": "Trekking & Hiking",
  "motorbike-touring": "Motorbike Touring",
  "soul-of-ladakh": "Soul of Ladakh",
  "mountaineering": "Mountaineering"
};

export const activityColor: Record<ActivityType, string> = {
  "trekking-hiking": "#98a869",
  "motorbike-touring": "#d88f4c",
  "soul-of-ladakh": "#9b8b7a",
  "mountaineering": "#6b8e9f"
};

export function getTripsByActivity(activityType: ActivityType) {
  return trips.filter((trip) => trip.activityType === activityType);
}

export function getTripBySlug(slug: string) {
  return trips.find((trip) => trip.slug === slug);
}
