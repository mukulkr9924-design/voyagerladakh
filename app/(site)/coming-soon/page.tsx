import type { Metadata } from "next";
import ComingSoonContent from "@/components/ComingSoonContent";

export const metadata: Metadata = {
  title: "Coming Soon - New Adventures in Ladakh",
  description: "New Ladakh adventures are being crafted. Expertly curated routes, local guides, and authentic experiences coming soon to Voyager Ladakh.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ComingSoonPage() {
  return <ComingSoonContent />;
}