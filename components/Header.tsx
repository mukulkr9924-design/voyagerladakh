import Image from "next/image";
import Link from "next/link";
import MobileMenu from "@/components/MobileMenu";
import { ActivityIcon } from "@/components/Icons";
import { activities, tripPath, tripsFor } from "@/lib/activities";

export default function Header() {
  const nav = activities.map((a) => ({
    href: `/${a.type}`,
    label: a.name,
    type: a.type,
    trips: tripsFor(a.type).map((t) => ({ href: tripPath(t), title: t.title, duration: t.duration })),
  }));

  return (
    <header className="site-header">
      <div className="topbar">
        <Link href="/" className="brand-link">
          {/* Above the fold on every page, so preload it (`preload` replaces `priority` in Next 16). */}
          <Image
            src="/voyager-ladakh-horizontal.svg"
            alt="Voyager Ladakh – home"
            width={467}
            height={140}
            className="brand-logo"
            preload
          />
        </Link>

        <nav className="main-nav" aria-label="Main">
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
                    <Link href={item.href} className="nav-dropdown-all">View all {item.label.toLowerCase()} →</Link>
                  </div>
                </div>
              </li>
            ))}
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/contact" className="nav-link">Contact</Link></li>
          </ul>
        </nav>

        <Link href="/plan-your-trip" className="btn primary header-cta">Plan your trip</Link>

        <MobileMenu
          links={[
            ...nav.map(({ href, label }) => ({ href, label })),
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ]}
        />
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </header>
  );
}
