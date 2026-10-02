import { WhatsAppIcon } from "@/components/Icons";
import Link from "@/components/LocaleLink";
import { getSettings } from "@/lib/content";
import { getI18n } from "@/lib/locale";

/** The enquiry banner; heading and text default to the ones set in Site settings. */
export default async function CtaBand({ title, text }: { title?: string; text?: string }) {
  const [{ contact, ctaTitle, ctaText }, { t }] = await Promise.all([getSettings(), getI18n()]);
  return (
    <section className="cta-band" aria-label={t.common.planYourTrip}>
      <div className="cta-band-inner">
        <div>
          <h2>{title ?? ctaTitle}</h2>
          <p>{text ?? ctaText}</p>
        </div>
        <div className="cta-band-actions">
          <Link href="/plan-your-trip" className="btn light">{t.cta.getItinerary}</Link>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn ghost">
            <WhatsAppIcon /> {t.cta.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
