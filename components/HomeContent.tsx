import Link from "next/link";
import Hero from "@/components/Hero";
import TripCard from "@/components/TripCard";
import LazyRouteMap from "@/components/LazyRouteMap";
import CtaBand from "@/components/CtaBand";
import { ActivityIcon, ArrowIcon } from "@/components/Icons";
import { getActivities, getTrips, type HomePage } from "@/lib/content";
import type { Trip } from "@/lib/trips";

export default async function HomeContent({ home }: { home: HomePage }) {
  const [activities, trips] = await Promise.all([getActivities(), getTrips()]);
  const picked = home.featuredTripIds.map((id) => trips.find((t) => t.id === id)).filter((t): t is Trip => t !== undefined);
  // With nothing picked in the Studio, feature the first trip of the first three categories.
  const featured = picked.length > 0
    ? picked
    : activities.slice(0, 3).map((a) => trips.find((t) => t.activityType === a.type)).filter((t): t is Trip => t !== undefined);

  return (
    <>
      <Hero home={home} tripCount={trips.length} categoryCount={activities.length} />

      <section className="section" id="journeys" aria-labelledby="journeys-title">
        <div className="section-heading">
          {home.journeysKicker && <p className="kicker">{home.journeysKicker}</p>}
          <h2 id="journeys-title">{home.journeysTitle}</h2>
        </div>
        <div className="activity-grid">
          {activities.map((a) => (
            <article key={a.type} className="activity-card reveal">
              <span className="activity-icon"><ActivityIcon type={a.type} /></span>
              <h3>
                <Link href={`/${a.type}`} className="stretched-link">{a.name}</Link>
              </h3>
              <p>{a.short}</p>
              <p className="activity-foot">
                {trips.filter((t) => t.activityType === a.type).length} journeys <ArrowIcon />
              </p>
            </article>
          ))}
        </div>
      </section>

      {home.mapStops.length > 1 && (
        <LazyRouteMap stops={home.mapStops} kicker={home.mapKicker} title={home.mapTitle} intro={home.mapIntro} />
      )}

      {featured.length > 0 && (
        <section className="section" aria-labelledby="featured-title">
          <div className="section-heading split">
            <div>
              {home.featuredKicker && <p className="kicker">{home.featuredKicker}</p>}
              <h2 id="featured-title">{home.featuredTitle}</h2>
            </div>
            <Link href="/trekking-hiking" className="text-link">All treks <ArrowIcon /></Link>
          </div>
          <div className="trip-grid">
            {featured.map((trip) => <TripCard key={trip.id} trip={trip} />)}
          </div>
        </section>
      )}

      {home.reasons.length > 0 && (
        <section className="section section-tint" aria-labelledby="why-title">
          <div className="section-heading">
            {home.whyKicker && <p className="kicker">{home.whyKicker}</p>}
            <h2 id="why-title">{home.whyTitle}</h2>
          </div>
          <div className="reason-grid">
            {home.reasons.map((r, i) => (
              <div key={r.title} className="reason reveal">
                <span className="reason-num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{r.title}</h3>
                <p>{r.desc}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {home.faqs.length > 0 && (
        <section className="section" aria-labelledby="faq-title">
          <div className="faq-layout">
            <div className="section-heading">
              {home.faqKicker && <p className="kicker">{home.faqKicker}</p>}
              <h2 id="faq-title">{home.faqTitle}</h2>
              <p className="section-lede">Still have questions? <Link href="/contact" className="inline-link">Talk to our team</Link>.</p>
            </div>
            <div className="faq-list">
              {home.faqs.map((f) => (
                <details key={f.q} className="faq">
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand />
    </>
  );
}
