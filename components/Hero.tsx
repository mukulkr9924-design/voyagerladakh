import Link from "next/link";
import HeroSlideshow from "@/components/HeroSlideshow";
import type { HomePage } from "@/lib/content";

export default function Hero({ home, tripCount, categoryCount }: { home: HomePage; tripCount: number; categoryCount: number }) {
  // Stats can include live counts, written as {trips} and {categories} in the Studio.
  const fill = (value: string) => value.replace(/\{trips\}/g, String(tripCount)).replace(/\{categories\}/g, String(categoryCount));

  return (
    <section className="hero">
      <HeroSlideshow slides={home.heroSlides} />
      <div className="hero-content">
        {home.heroKicker && <p className="kicker">{home.heroKicker}</p>}
        <h1>
          {home.heroTitle}
          {home.heroTitleEmphasis && <> <em>{home.heroTitleEmphasis}</em></>}
        </h1>
        {home.heroLede && <p className="hero-lede">{home.heroLede}</p>}
        <div className="hero-actions">
          <Link className="btn light" href="/plan-your-trip">Plan your trip</Link>
          <Link className="btn ghost" href="#journeys">Explore journeys</Link>
        </div>
      </div>
      {home.heroStats.length > 0 && (
        <dl className="hero-stats">
          {home.heroStats.map((s) => (
            <div key={s.label}><dt>{s.label}</dt><dd>{fill(s.value)}</dd></div>
          ))}
        </dl>
      )}
    </section>
  );
}
