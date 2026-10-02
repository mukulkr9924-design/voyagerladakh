import Image from "next/image";
import LanguageMenu from "@/components/LanguageMenu";
import Link from "@/components/LocaleLink";
import MobileMenu from "@/components/MobileMenu";
import { ActivityIcon } from "@/components/Icons";
import { tripPath } from "@/lib/activities";
import { getActivities, getSettings, getTrips } from "@/lib/content";
import { format } from "@/lib/i18n";
import { getI18n } from "@/lib/locale";

export default async function Header() {
  const [activities, trips, { contact }, { locale, t }] = await Promise.all([getActivities(), getTrips(), getSettings(), getI18n()]);
  const nav = activities.map((a) => ({
    href: `/${a.type}`,
    label: a.name,
    type: a.type,
    trips: trips.filter((t) => t.activityType === a.type).map((t) => ({ href: tripPath(t), title: t.title, duration: t.duration })),
  }));

  return (
    <header className="site-header">
      <div className="topbar">
        <Link href="/" className="brand-link">
          {/* Above the fold on every page, so preload it (`preload` replaces `priority` in Next 16). */}
          <Image
            src="/voyager-ladakh-horizontal.svg"
            alt={t.common.logoAlt}
            width={467}
            height={140}
            className="brand-logo"
            preload
          />
        </Link>

        <nav className="main-nav" aria-label={t.nav.main}>
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="nav-item">
                <Link href={item.href} className="nav-link">{item.label}</Link>
                <div className="nav-dropdown">
                  <div className="nav-dropdown-inner">
                    <p className="nav-dropdown-title">
                      <ActivityIcon type={item.type} className="nav-dropdown-icon" />
                      {item.label}
                    </p>
                    <ul>
                      {item.trips.map((trip) => (
                        <li key={trip.href}>
                          <Link href={trip.href}>
                            <span>{trip.title}</span>
                            <small>{trip.duration}</small>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <Link href={item.href} className="nav-dropdown-all">
                      {format(t.nav.viewAll, { name: locale === "en" ? item.label.toLowerCase() : item.label })}
                    </Link>
                  </div>
                </div>
              </li>
            ))}
            <li><Link href="/about" className="nav-link">{t.common.about}</Link></li>
            <li><Link href="/contact" className="nav-link">{t.common.contact}</Link></li>
          </ul>
        </nav>

        <LanguageMenu />

        <Link href="/plan-your-trip" className="btn primary header-cta">{t.common.planYourTrip}</Link>

        <MobileMenu
          phone={contact.phone}
          phoneHref={contact.phoneHref}
          links={[
            ...nav.map(({ href, label }) => ({ href, label })),
            { href: "/about", label: t.common.about },
            { href: "/contact", label: t.common.contact },
          ]}
        />
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
