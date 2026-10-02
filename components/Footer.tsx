import Image from "next/image";
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import Link from "@/components/LocaleLink";
import { getActivities, getSettings } from "@/lib/content";
import { format } from "@/lib/i18n";
import { getI18n } from "@/lib/locale";

export default async function Footer() {
  const [activities, { contact: CONTACT, footerBlurb }, { t }] = await Promise.all([getActivities(), getSettings(), getI18n()]);
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          {/* Dark variant: its built-in background matches the footer's forest green. */}
          <Link href="/" className="footer-logo">
            <Image src="/voyager-ladakh-horizontal-dark.svg" alt={t.common.logoAlt} width={467} height={140} />
          </Link>
          <p>{footerBlurb}</p>
          <div className="footer-social">
            {CONTACT.instagram && (
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label={t.footer.instagram}>
                <InstagramIcon />
              </a>
            )}
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label={t.footer.whatsapp}>
              <WhatsAppIcon />
            </a>
            <a href={`mailto:${CONTACT.email}`} aria-label={t.footer.email}>
              <MailIcon />
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label={t.footer.journeys}>
          <p className="footer-heading">{t.footer.journeys}</p>
          <ul>
            {activities.map((a) => (
              <li key={a.type}><Link href={`/${a.type}`}>{a.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label={t.footer.company}>
          <p className="footer-heading">{t.footer.company}</p>
          <ul>
            <li><Link href="/about">{t.footer.aboutUs}</Link></li>
            <li><Link href="/plan-your-trip">{t.common.planYourTrip}</Link></li>
            <li><Link href="/contact">{t.common.contact}</Link></li>
          </ul>
        </nav>

        <address className="footer-col footer-contact">
          <p className="footer-heading">{t.footer.visitUs}</p>
          <p><PinIcon />{CONTACT.address[0]}<br />{CONTACT.address[1]}</p>
          <p><PhoneIcon /><a href={CONTACT.phoneHref} dir="ltr">{CONTACT.phone}</a></p>
          <p><MailIcon /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
        </address>
      </div>

      <div className="footer-bottom">
        <p>{format(t.footer.rights, { year: new Date().getFullYear() })}</p>
        <LanguageSwitcher className="footer-lang" />
        <p>{t.footer.developedBy} <a href="https://mukulkumar.dev" target="_blank" rel="noopener noreferrer">mukulkumar.dev</a></p>
      </div>
    </footer>
  );
}
