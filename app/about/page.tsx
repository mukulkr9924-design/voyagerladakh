import type { Metadata } from "next";
import CtaBand from "@/components/CtaBand";
import PageHeader from "@/components/PageHeader";
import { openGraphFor, SITE_NAME } from "@/lib/activities";

const title = "About Us – Leh-based Adventure Travel Team";
const description =
  "Voyager Ladakh is a Leh-based local team planning trekking, mountaineering, motorbike and cultural journeys across Ladakh with local guides and village hosts.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["about Voyager Ladakh", "Ladakh tour operator", "sustainable tourism Ladakh", "local guides Leh"],
  alternates: { canonical: "/about" },
  openGraph: openGraphFor("/about", `${title} | ${SITE_NAME}`, description),
};

const values = [
  { title: "Sustainability", desc: "Low-impact planning: small groups, leave-no-trace camps and routes that respect fragile high-altitude ecosystems." },
  { title: "Community", desc: "A network of village homestays and local hosts, so your journey supports the families who live along the trail." },
  { title: "Local guides", desc: "Regional experts who grew up in these valleys and know the passes, the weather and the stories." },
  { title: "Responsible travel", desc: "Respect for monasteries, wildlife and local customs is built into every itinerary we design." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        kicker="About Voyager Ladakh"
        title="Leh-based adventure planning"
        intro="We are a local team from Leh planning trekking, mountaineering, motorbike, spiritual and cultural journeys across Ladakh."
        crumbs={[{ name: "About", href: "/about" }]}
      />
      <section className="section section-flush-top">
        <div className="prose-split">
          <h2>Designed with the people of Ladakh</h2>
          <div className="prose">
            <p>
              Our routes are designed together with local guides, village hosts, conservation teams and regional
              operators. That means realistic pacing for altitude, homestays where the welcome is genuine, and support
              teams who know exactly what to do when a pass closes or the weather turns.
            </p>
            <p>
              Whether you want an easy walk through apricot villages, a 6,000 m summit, a ride over Khardung La or a
              quiet week among monasteries, we plan it around you — and make sure the benefits stay in Ladakh.
            </p>
          </div>
        </div>
      </section>
      <section className="section section-tint" aria-labelledby="values-title">
        <div className="section-heading">
          <p className="kicker">What we stand for</p>
          <h2 id="values-title">How we travel</h2>
        </div>
        <div className="reason-grid">
          {values.map((v, i) => (
            <div key={v.title} className="reason reveal">
              <span className="reason-num">{String(i + 1).padStart(2, "0")}</span>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
