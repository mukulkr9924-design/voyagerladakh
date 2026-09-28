import Image from "next/image";
import Link from "next/link";
import { activities } from "@/lib/activities";
import { trips } from "@/lib/trips";

const HERO_IMAGE = "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2400&q=80";

export default function Hero() {
  return (
    <section className="hero">
      <Image
        src={HERO_IMAGE}
        alt="High mountain valley under a clear Himalayan sky"
        fill
        preload
        sizes="100vw"
        className="hero-image"
      />
      <div className="hero-content">
        <p className="kicker">Leh-based · Locally guided</p>
        <h1>
          Where the trail meets <em>the timeless</em>
        </h1>
        <p className="hero-lede">
          Treks, 6,000 m climbs, motorbike tours and cultural journeys across Ladakh — planned and led by a local team
          from Leh.
        </p>
        <div className="hero-actions">
          <Link className="btn light" href="/plan-your-trip">Plan your trip</Link>
          <Link className="btn ghost" href="#journeys">Explore journeys</Link>
        </div>
      </div>
      <dl className="hero-stats">
        <div><dt>Base altitude</dt><dd>3,500 m</dd></div>
        <div><dt>Journeys</dt><dd>{trips.length}</dd></div>
        <div><dt>Ways to travel</dt><dd>{activities.length}</dd></div>
        <div><dt>Team</dt><dd>Leh local</dd></div>
      </dl>
    </section>
  );
}
