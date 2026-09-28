import Link from "next/link";
import { WhatsAppIcon } from "@/components/Icons";
import { CONTACT } from "@/lib/activities";

export default function CtaBand({
  title = "Ready to plan your Ladakh journey?",
  text = "Tell us your dates and interests — we'll reply with a tailored itinerary.",
}: { title?: string; text?: string }) {
  return (
    <section className="cta-band" aria-label="Plan your trip">
      <div className="cta-band-inner">
        <div>
          <h2>{title}</h2>
          <p>{text}</p>
        </div>
        <div className="cta-band-actions">
          <Link href="/plan-your-trip" className="btn light">Get an itinerary</Link>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn ghost">
            <WhatsAppIcon /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
