import Link from "next/link";
import { WhatsAppIcon } from "@/components/Icons";
import { getSettings } from "@/lib/content";

/** The enquiry banner; heading and text default to the ones set in Site settings. */
export default async function CtaBand({ title, text }: { title?: string; text?: string }) {
  const { contact, ctaTitle, ctaText } = await getSettings();
  return (
    <section className="cta-band" aria-label="Plan your trip">
      <div className="cta-band-inner">
        <div>
          <h2>{title ?? ctaTitle}</h2>
          <p>{text ?? ctaText}</p>
        </div>
        <div className="cta-band-actions">
          <Link href="/plan-your-trip" className="btn light">Get an itinerary</Link>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn ghost">
            <WhatsAppIcon /> WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
