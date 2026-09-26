import MountaineeringContent from "@/components/MountaineeringContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mountaineering in Ladakh - 6,000m Himalayan Peaks",
  description: "Explore mountaineering expeditions in Ladakh including Kang Yatse, Mentok Kangri, and Dzo Jongo with expert high-altitude climbing support.",
  keywords: ["Ladakh mountaineering", "Kang Yatse climb", "Mentok Kangri", "Dzo Jongo", "Himalayan summit expedition"],
  openGraph: {
    title: "Mountaineering in Ladakh - 6,000m Himalayan Peaks",
    description: "Summit expeditions in Ladakh, from first 6,000m climbs to technical ridge traverses and glacier objectives.",
  },
};

export default function MountaineeringPage() {
  return <MountaineeringContent />;
}
