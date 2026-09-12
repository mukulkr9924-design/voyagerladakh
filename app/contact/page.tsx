import type { Metadata } from "next";
import ContactContent from "@/components/ContactContent";

export const metadata: Metadata = {
  title: "Contact Voyager Ladakh - Plan Your Ladakh Adventure",
  description: "Get in touch with Voyager Ladakh to plan your adventure. Contact us at +91 9541379356 or email contact@voyagerladakh.com. Visit us in Leh, Ladakh.",
  keywords: ["contact Voyager Ladakh", "Ladakh tour booking", "Leh travel contact", "plan Ladakh trip"],
  openGraph: {
    title: "Contact Voyager Ladakh - Plan Your Ladakh Adventure",
    description: "Get in touch with Voyager Ladakh to plan your adventure. Contact us at +91 9541379356 or email contact@voyagerladakh.com.",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
