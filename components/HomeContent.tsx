import Link from "next/link";
import Hero from "@/components/Hero";
import TripCard from "@/components/TripCard";
import AnimatedRouteMap from "@/components/AnimatedRouteMap";
import CtaBand from "@/components/CtaBand";
import { ActivityIcon, ArrowIcon } from "@/components/Icons";
import { activities, tripsFor } from "@/lib/activities";

const featured = (["trekking-hiking", "mountaineering", "motorbike-touring"] as const).map((type) => tripsFor(type)[0]);

const reasons = [
  {
    title: "Born in Leh",
    desc: "We live here. Routes, homestays and drivers come from our own network, not a booking platform.",
  },
  {
    title: "Acclimatisation first",
    desc: "Itineraries are paced for altitude, and we help you plan rest days in Leh before going high.",
  },
  {
    title: "Small groups",
    desc: "Groups are kept small, so trails stay quiet, villages aren't overwhelmed and guides know every guest.",
  },
  {
    title: "Money stays local",
    desc: "We work with local guides, horsemen, cooks and village hosts along every route.",
  },
];

export const faqs = [
  {
    q: "When is the best time to visit Ladakh?",
    a: "June to September is the main season, when high passes are open and trekking routes are snow-free. May and October are quieter and colder, which suits cultural trips and lower treks.",
  },
  {
    q: "How long should I acclimatise in Leh?",
    a: "Plan at least two full days in Leh (3,500 m) before any trek, ride or climb. We'll help you build these days into your plan, and mountaineering trips add further acclimatisation hikes.",
  },
  {
    q: "Do I need permits?",
    a: "Some areas such as Nubra, Pangong, Tso Moriri and Hanle require permits or protected-area fees depending on your nationality. We arrange whatever your route needs.",
  },
  {
    q: "Can you customise a trip?",
    a: "Yes. Every journey can be adjusted for dates, fitness, group size and interests. Tell us what you have in mind and we'll send a tailored itinerary.",
  },
];

export default function HomeContent() {
  return (
    <>
      <Hero />

      <section className="section" id="journeys" aria-labelledby="journeys-title">
        <div className="section-heading">
          <p className="kicker">The Ladakh way</p>
          <h2 id="journeys-title">Choose your mountain rhythm</h2>
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
                {tripsFor(a.type).length} journeys <ArrowIcon />
              </p>
            </article>
          ))}
        </div>
      </section>

      <AnimatedRouteMap />

      <section className="section" aria-labelledby="featured-title">
        <div className="section-heading split">
          <div>
            <p className="kicker">Featured journeys</p>
            <h2 id="featured-title">Routes from the valley</h2>
          </div>
          <Link href="/trekking-hiking" className="text-link">All treks <ArrowIcon /></Link>
        </div>
        <div className="trip-grid">
          {featured.map((trip) => <TripCard key={trip.id} trip={trip} />)}
        </div>
      </section>

      <section className="section section-tint" aria-labelledby="why-title">
        <div className="section-heading">
          <p className="kicker">Why Voyager Ladakh</p>
          <h2 id="why-title">Travel with the people who call it home</h2>
        </div>
        <div className="reason-grid">
          {reasons.map((r, i) => (
            <div key={r.title} className="reason reveal">
              <span className="reason-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section" aria-labelledby="faq-title">
        <div className="faq-layout">
          <div className="section-heading">
            <p className="kicker">Good to know</p>
            <h2 id="faq-title">Before you travel</h2>
            <p className="section-lede">Still have questions? <Link href="/contact" className="inline-link">Talk to our team</Link>.</p>
          </div>
          <div className="faq-list">
            {faqs.map((f) => (
              <details key={f.q} className="faq">
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
