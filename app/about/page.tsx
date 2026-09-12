import AboutContent from "@/components/AboutContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Voyager Ladakh - Leh-based Adventure Planning",
  description: "Learn about Voyager Ladakh, a Leh-based local team planning trekking, biking, spiritual and cultural journeys across Ladakh with sustainability and community focus.",
  keywords: ["about Voyager Ladakh", "Ladakh tour operators", "sustainable tourism Ladakh", "local guides Leh"],
  openGraph: {
    title: "About Voyager Ladakh - Leh-based Adventure Planning",
    description: "Learn about Voyager Ladakh, a Leh-based local team planning trekking, biking, spiritual and cultural journeys across Ladakh.",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
