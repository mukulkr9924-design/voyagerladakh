export type ActivityType = "trekking-hiking" | "motorbike-touring" | "soul-of-ladakh" | "mountaineering";
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
  description: string;
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
    slug: "sham-valley-trek",
    activityType: "trekking-hiking",
    title: "Sham Valley Trek",
    description: "Known as \"Baby Trek,\" this gentle 3–4 day route winds through Ladakh's oldest villages, monasteries, and apricot orchards along the Indus. Ideal for beginners and families seeking scenic trails without high-altitude strain.",
    duration: "3-4 days",
    difficulty: "Easy",
    price: 12500,
    groupSize: "10 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh to Likir", details: "Drive to Likir monastery and begin gentle walk through apricot orchards." },
      { day: "Day 02", title: "Likir to Yangthang", details: "Walk through Hemis Shukpachan village and camp by the stream." },
      { day: "Day 03", title: "Yangthang to Temisgam", details: "Visit Temisgam monastery and explore the royal palace ruins." },
      { day: "Day 04", title: "Return to Leh", details: "Short walk to road and drive back to Leh." }
    ],
    inclusions: ["Local guide", "Homestay/Camping", "All meals", "Transport"],
    exclusions: ["Flights", "Personal gear", "Tips"]
  },
  {
    id: "trek-02",
    slug: "lamayuru-chilling-trek",
    activityType: "trekking-hiking",
    title: "Lamayuru to Chilling Trek",
    description: "A classic 6–7 day high-altitude trek from the \"Moonland\" monastery of Lamayuru through remote villages and river gorges to Chilling, crossing passes above 4,900m. A demanding route best suited for experienced trekkers seeking Ladakh's wilder, less-traveled terrain.",
    duration: "6-7 days",
    difficulty: "Challenging",
    price: 24500,
    groupSize: "6 people",
    images: [
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh to Lamayuru", details: "Drive to Lamayuru monastery and explore the moonland landscape." },
      { day: "Day 02", title: "Lamayuru to Wanla", details: "Cross Prinkiti La pass (3,750m) and camp at Wanla village." },
      { day: "Day 03", title: "Wanla to Hinju", details: "Walk through remote villages and camp near the stream." },
      { day: "Day 04", title: "Hinju to Sumda Chenmo", details: "Cross Dundunche La pass (4,800m) with stunning views." },
      { day: "Day 05", title: "Sumda Chenmo to Chilling", details: "Descend to the Zanskar river and reach Chilling village." },
      { day: "Day 06", title: "Chilling to Leh", details: "Drive back to Leh along the Indus river." }
    ],
    inclusions: ["Guide", "Porter support", "Camping equipment", "All meals"],
    exclusions: ["Flights", "Personal gear", "Insurance"]
  },
  {
    id: "trek-03",
    slug: "rumtse-tso-moriri-trek",
    activityType: "trekking-hiking",
    title: "Rumtse to Tso Moriri Trek",
    description: "A remote 8–9 day high-altitude trek across the Rupshu plateau, passing nomadic camps and passes over 5,000m before reaching the stunning turquoise waters of Tso Moriri. A challenging, off-the-beaten-path route for seasoned trekkers seeking solitude and dramatic landscapes.",
    duration: "8-9 days",
    difficulty: "Advanced",
    price: 32000,
    groupSize: "4 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh to Rumtse", details: "Drive to Rumtse and begin the trek across the plateau." },
      { day: "Day 02", title: "Rumtse to Kyamar", details: "Cross Kyamar La (5,200m) and camp near nomadic settlements." },
      { day: "Day 03", title: "Kyamar to Tisaling", details: "Cross Mandalchan La (5,200m) and Shibuk La (5,150m)." },
      { day: "Day 04", title: "Tisaling to Pangunagu", details: "Walk past Tso Kar lake and camp near the salt flats." },
      { day: "Day 05", title: "Pangunagu to Nuruchan", details: "Continue to Nuruchan village and rest day." },
      { day: "Day 06", title: "Nuruchan to Horlam Kongka", details: "Cross Horlam Kongka La (5,000m) with panoramic views." },
      { day: "Day 07", title: "Horlam Kongka to Tso Moriri", details: "Reach the stunning Tso Moriri lake and camp by its shores." },
      { day: "Day 08", title: "Tso Moriri to Leh", details: "Drive back to Leh via Mahe bridge." }
    ],
    inclusions: ["Expert guide", "High-altitude porters", "Full camping setup", "All meals"],
    exclusions: ["Flights", "Personal equipment", "Emergency evacuation"]
  },
  {
    id: "trek-04",
    slug: "markha-valley-chilling-trek",
    activityType: "trekking-hiking",
    title: "Markha Valley Trek (from Chilling)",
    description: "Ladakh's most popular multi-day trek, this 7–8 day route follows the Markha river through remote villages, past Kang Yatse's towering peak, and over the Kongmaru La pass. A well-established path offering a great balance of scenery, culture, and moderate-to-challenging terrain.",
    duration: "7-8 days",
    difficulty: "Moderate",
    price: 25000,
    groupSize: "8 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh to Chilling", details: "Drive to Chilling and begin trek along the Zanskar river." },
      { day: "Day 02", title: "Chilling to Skiu", details: "Cross the river and walk to Skiu village." },
      { day: "Day 03", title: "Skiu to Markha", details: "Follow the Markha river through beautiful valleys." },
      { day: "Day 04", title: "Markha to Hankar", details: "Pass pastures and camp with views of Kang Yatse." },
      { day: "Day 05", title: "Hankar to Nimaling", details: "Ascend to the high pasture at Nimaling (4,700m)." },
      { day: "Day 06", title: "Nimaling to Kongmaru La", details: "Cross Kongmaru La pass (5,150m) and descend to Shang." },
      { day: "Day 07", title: "Shang to Leh", details: "Walk to road and drive back to Leh." }
    ],
    inclusions: ["Local guide", "Porter support", "Camping", "All meals"],
    exclusions: ["Flights", "Personal gear", "Tips"]
  },
  {
    id: "trek-05",
    slug: "markha-valley-spituk-trek",
    activityType: "trekking-hiking",
    title: "Markha Valley Trek (from Spituk)",
    description: "A longer 8–9 day variation of Ladakh's classic Markha trek, starting near Leh and crossing the Ganda La pass before joining the main valley route through remote villages, past Kang Yatse, and over Kongmaru La. Offers extra acclimatization days and a more gradual, scenic build-up to the trek's high points.",
    duration: "8-9 days",
    difficulty: "Moderate",
    price: 28000,
    groupSize: "8 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh to Spituk", details: "Drive to Spituk monastery and begin the trek." },
      { day: "Day 02", title: "Spituk to Zinchen", details: "Cross Ganda La pass (4,900m) and descend to Zinchen." },
      { day: "Day 03", title: "Zinchen to Yurutse", details: "Walk through Rumbak valley and camp at Yurutse." },
      { day: "Day 04", title: "Yurutse to Skiu", details: "Cross Shingo La and join the Markha valley route." },
      { day: "Day 05", title: "Skiu to Markha", details: "Follow the Markha river through traditional villages." },
      { day: "Day 06", title: "Markha to Hankar", details: "Continue up the valley with Kang Yatse views." },
      { day: "Day 07", title: "Hankar to Nimaling", details: "Ascend to high meadows at Nimaling." },
      { day: "Day 08", title: "Nimaling to Leh", details: "Cross Kongmaru La and return to Leh." }
    ],
    inclusions: ["Guide", "Porter support", "Camping equipment", "All meals"],
    exclusions: ["Flights", "Personal gear", "Tips"]
  },
  {
    id: "trek-06",
    slug: "jhunglam-hemis-padum-trek",
    activityType: "trekking-hiking",
    title: "Jhunglam Trek (Hemis to Padum)",
    description: "A demanding 10-day, 141km trek that begins at Hemis monastery, crosses the Kongmaru La into the Markha valley, then follows a remote, seldom-used trail over high passes to Zangla and the Zanskar valley. Best suited for experienced trekkers seeking rugged, off-the-beaten-path terrain.",
    duration: "10 days",
    difficulty: "Advanced",
    price: 38000,
    groupSize: "4 people",
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
    ],
    itinerary: [
      { day: "Day 01", title: "Leh to Hemis", details: "Visit Hemis monastery and begin the trek." },
      { day: "Day 02", title: "Hemis to Nimaling", details: "Cross Kongmaru La pass (5,150m) to Nimaling." },
      { day: "Day 03", title: "Nimaling to Chumik Marpo", details: "Cross high passes into remote Zanskar territory." },
      { day: "Day 04", title: "Chumik Marpo to Lakong", details: "Follow the remote trail through pristine wilderness." },
      { day: "Day 05", title: "Lakong to Zangla", details: "Reach Zangla village and explore the ancient monastery." },
      { day: "Day 06", title: "Zangla to Karsha", details: "Walk along the Zanskar river to Karsha monastery." },
      { day: "Day 07", title: "Karsha to Padum", details: "Short walk to Padum, the capital of Zanskar." },
      { day: "Day 08", title: "Padum rest day", details: "Explore local villages and monasteries." },
      { day: "Day 09", title: "Padum to Kargil", details: "Drive over Pensila pass to Kargil." },
      { day: "Day 10", title: "Kargil to Leh", details: "Drive back to Leh via Srinagar-Leh highway." }
    ],
    inclusions: ["Expert guide", "Full support team", "High-altitude equipment", "All meals"],
    exclusions: ["Flights", "Personal gear", "Emergency evacuation"]
  },
  {
    id: "bike-01",
    slug: "lehmotorbike-nubra-sky",
    activityType: "motorbike-touring",
    title: "Leh to Nubra Circuit",
    description: "A thrilling 7-day motorbike circuit through the highest motorable roads, crossing Khardung La pass (5,359m) and exploring the Nubra Valley's desert landscapes and ancient monasteries.",
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
      { day: "Day 02", title: "Leh to Khardung La", details: "Cross world's highest motorable pass to Nubra Valley." },
      { day: "Day 03", title: "Nubra exploration", details: "Visit Diskit monastery and Hunder sand dunes." },
      { day: "Day 04", title: "Nubra to Pangong", details: "Ride to Pangong Lake via Shyok river." },
      { day: "Day 05", title: "Pangong Lake", details: "Explore the lake and return via Chang La." },
      { day: "Day 06", title: "Leh local", details: "Visit local monasteries and markets." },
      { day: "Day 07", title: "Departure", details: "Transfer to airport." }
    ],
    inclusions: ["Motorbike", "Mechanic support", "Fuel", "Stay"],
    exclusions: ["Gear", "Personal purchases", "Park permit"]
  },
  {
    id: "spirit-01",
    slug: "leh-spiritual-retreat",
    activityType: "soul-of-ladakh",
    title: "Leh Spiritual Retreat",
    description: "A peaceful 4-day retreat focusing on meditation, monastery visits, and inner reflection in the serene surroundings of Ladakh's spiritual centers.",
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
    activityType: "soul-of-ladakh",
    title: "Village Culture Circuit",
    description: "An immersive 5-day experience living with local families, learning traditional crafts, and exploring the rich cultural heritage of Ladakhi villages.",
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
      { day: "Day 04", title: "Market and craft", details: "Visit bazaar and local craft workshops." },
      { day: "Day 05", title: "Departure", details: "Farewell and transfer to airport." }
    ],
    inclusions: ["Homestay", "Culture guide", "Meals", "Local transfer"],
    exclusions: ["Flights", "Personal shopping", "Tips"]
  },
  {
    id: "mount-01",
    slug: "kang-yatse-ii",
    activityType: "mountaineering",
    title: "Kang Yatse II (6,200m)",
    description: "A non-technical trekking peak in the Markha Valley, ideal as a first Himalayan 6,000m summit. Scree slopes lead to a steep snow climb, with summit views stretching to K2 and the Zanskar range.",
    duration: "12-14 days",
    difficulty: "Moderate",
    price: 45000,
    groupSize: "6 people",
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
    description: "The true, higher summit of the Kang Yatse massif, reached via a technically demanding knife-edge ridge traverse. A serious mountaineering objective for experienced climbers, offering far fewer ascents than its easier neighbor.",
    duration: "14-16 days",
    difficulty: "Advanced",
    price: 55000,
    groupSize: "4 people",
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
    slug: "kang-yatse-i-ii",
    activityType: "mountaineering",
    title: "Kang Yatse I & II (6,400m / 6,200m)",
    description: "Twin summits of the Markha Valley's signature massif — Kang Yatse II is a non-technical trekking peak perfect for a first Himalayan 6,000m climb, while Kang Yatse I demands a serious knife-edge ridge traverse for experienced mountaineers. Together they offer routes for every level, framed by views of K2 and the Zanskar range.",
    duration: "16-18 days",
    difficulty: "Advanced",
    price: 65000,
    groupSize: "4 people",
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
      { day: "Day 09", title: "Kang Yatse II summit", details: "Summit Kang Yatse II (6,200m) and return to base camp." },
      { day: "Day 10", title: "Base Camp rest", details: "Rest and prepare for Kang Yatse I attempt." },
      { day: "Day 11", title: "Base Camp to Advanced Base", details: "Move to advanced base camp at 5,600m." },
      { day: "Day 12", title: "Advanced Base to High Camp", details: "Establish high camp at 6,000m." },
      { day: "Day 13", title: "Kang Yatse I summit", details: "Summit Kang Yatse I (6,400m) via knife-edge ridge and return to high camp." },
      { day: "Day 14", title: "Descent to Base Camp", details: "Return to base camp." },
      { day: "Day 15", title: "Base Camp to Kongmaru La", details: "Cross Kongmaru La pass (5,150m) and descend to Shang." },
      { day: "Day 16", title: "Shang to Leh", details: "Walk to road and drive back to Leh." },
      { day: "Day 17", title: "Leh departure", details: "Transfer to airport." }
    ],
    inclusions: ["Expert climbing guide", "Sherpa support", "Technical climbing equipment", "Full camping setup", "All meals"],
    exclusions: ["Flights", "Personal technical gear", "Insurance", "Emergency evacuation"]
  },
  {
    id: "mount-04",
    slug: "mentok-kangri",
    activityType: "mountaineering",
    title: "Mentok Kangri (6250m)",
    description: "Rising above the western shore of Tso Moriri in the remote Rupshu-Changthang plateau, this semi-technical peak offers stunning views across the lake to the 6,600m Chamser and Lungser Kangri. A rewarding gateway climb for mountaineers stepping into 6,000m Himalayan expeditions.",
    duration: "10-12 days",
    difficulty: "Moderate",
    price: 42000,
    groupSize: "6 people",
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
    id: "mount-05",
    slug: "dzo-jongo-east-west",
    activityType: "mountaineering",
    title: "Dzo Jongo East & West (6,220m / 6,300m)",
    description: "Rising above the Nimaling meadows in the shadow of Kang Yatse, these twin peaks rank among the Himalaya's easiest 6,000m summits — East is a straightforward walk-up, while West adds glacier travel for a slightly more demanding climb. An ideal, uncrowded introduction to Himalayan mountaineering.",
    duration: "11-13 days",
    difficulty: "Moderate",
    price: 38000,
    groupSize: "8 people",
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
      { day: "Day 07", title: "Nimaling rest day", details: "Acclimatization and glacier travel training." },
      { day: "Day 08", title: "Nimaling to Base Camp", details: "Establish base camp at 5,200m." },
      { day: "Day 09", title: "Dzo Jongo East summit", details: "Summit Dzo Jongo East (6,220m) and return to base camp." },
      { day: "Day 10", title: "Dzo Jongo West summit", details: "Summit Dzo Jongo West (6,300m) via glacier and return to base camp." },
      { day: "Day 11", title: "Base Camp to Kongmaru La", details: "Cross Kongmaru La pass (5,150m) and descend to Shang." },
      { day: "Day 12", title: "Shang to Leh", details: "Walk to road and drive back to Leh." },
      { day: "Day 13", title: "Leh departure", details: "Transfer to airport." }
    ],
    inclusions: ["Climbing guide", "Porter support", "Camping equipment", "All meals", "Glacier travel gear"],
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
