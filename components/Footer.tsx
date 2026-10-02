import Image from "next/image";
import Link from "next/link";
import { InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "@/components/Icons";
import { getActivities, getSettings } from "@/lib/content";

export default async function Footer() {
  const [activities, { contact: CONTACT, footerBlurb }] = await Promise.all([getActivities(), getSettings()]);
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          {/* Dark variant: its built-in background matches the footer's forest green. */}
          <Link href="/" className="footer-logo">
            <Image src="/voyager-ladakh-horizontal-dark.svg" alt="Voyager Ladakh – home" width={467} height={140} />
          </Link>
          <p>{footerBlurb}</p>
          <div className="footer-social">
            {CONTACT.instagram && (
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Voyager Ladakh on Instagram">
                <InstagramIcon />
              </a>
            )}
            <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
              <WhatsAppIcon />
            </a>
            <a href={`mailto:${CONTACT.email}`} aria-label="Email Voyager Ladakh">
              <MailIcon />
            </a>
          </div>
        </div>

        <nav className="footer-col" aria-label="Journeys">
          <p className="footer-heading">Journeys</p>
          <ul>
            {activities.map((a) => (
              <li key={a.type}><Link href={`/${a.type}`}>{a.name}</Link></li>
            ))}
          </ul>
        </nav>

        <nav className="footer-col" aria-label="Company">
          <p className="footer-heading">Company</p>
          <ul>
            <li><Link href="/about">About us</Link></li>
            <li><Link href="/plan-your-trip">Plan your trip</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </nav>

        <address className="footer-col footer-contact">
          <p className="footer-heading">Visit us</p>
          <p><PinIcon />{CONTACT.address[0]}<br />{CONTACT.address[1]}</p>
          <p><PhoneIcon /><a href={CONTACT.phoneHref}>{CONTACT.phone}</a></p>
          <p><MailIcon /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></p>
        </address>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Voyager Ladakh. All rights reserved.</p>
        <p>Developed by <a href="https://mukulkumar.dev" target="_blank" rel="noopener noreferrer">mukulkumar.dev</a></p>
      </div>
    </footer>
  );
}
