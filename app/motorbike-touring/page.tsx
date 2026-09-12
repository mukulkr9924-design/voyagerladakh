import MotorbikeContent from "@/components/MotorbikeContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Motorbike Touring in Ladakh - High Pass Road Trips",
  description: "Experience the ultimate motorbike adventures in Ladakh. Ride through Khardung La, Nubra Valley, Pangong Lake, and Spiti crossing with expert support.",
  keywords: ["Ladakh motorbike tour", "Khardung La bike trip", "Nubra Valley biking", "Pangong Lake road trip", "Spiti crossing"],
  openGraph: {
    title: "Motorbike Touring in Ladakh - High Pass Road Trips",
    description: "Experience the ultimate motorbike adventures in Ladakh. Ride through Khardung La, Nubra Valley, and Pangong Lake.",
  },
};

export default function MotorbikePage() {
  return <MotorbikeContent />;
}
