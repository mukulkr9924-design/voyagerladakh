import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHeader from "@/components/PageHeader";
import { openGraphFor, SITE_NAME } from "@/lib/activities";

const title = "Plan Your Ladakh Trip – Get a Custom Itinerary";
const description =
  "Tell us your dates and interests and get a tailored Ladakh itinerary for trekking, mountaineering, motorbike touring or cultural travel from our Leh-based team.";

export const metadata: Metadata = {
  title,
  description,
  keywords: ["plan Ladakh trip", "Ladakh itinerary", "custom Ladakh tour", "Leh travel planner"],
  alternates: { canonical: "/plan-your-trip" },
  openGraph: openGraphFor("/plan-your-trip", `${title} | ${SITE_NAME}`, description),
};

const steps = [
  { title: "Tell us about your trip", desc: "Your dates, the kind of journey you want and anything we should know." },
  { title: "Get a tailored itinerary", desc: "Our Leh team sends a day-by-day plan with a clear price." },
  { title: "Refine and confirm", desc: "Adjust anything you like, then we take care of permits, guides and logistics." },
];

export default function PlanTripPage() {
  return (
    <>
      <PageHeader
        kicker="Plan your trip"
        title="Tell us about your Ladakh route"
        intro="Share a few details and we'll design a journey around your dates, fitness and interests."
        crumbs={[{ name: "Plan your trip", href: "/plan-your-trip" }]}
      />
      <section className="section section-flush-top">
        <div className="contact-layout">
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title}>
                <span className="step-num">{i + 1}</span>
                <div>
                  <h2>{s.title}</h2>
                  <p>{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="form-panel">
            <EnquiryForm variant="plan_trip" />
          </div>
        </div>
      </section>
    </>
  );
}
