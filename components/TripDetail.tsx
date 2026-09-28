import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHeader";
import TripCard from "@/components/TripCard";
import { CheckIcon, ClockIcon, CrossIcon, GaugeIcon, GroupIcon, WhatsAppIcon } from "@/components/Icons";
import { CONTACT, formatPrice, getActivity, SITE_NAME, SITE_URL, tripPath, tripsFor } from "@/lib/activities";
import type { ActivityType, Trip } from "@/lib/trips";

function findTrip(type: ActivityType, slug: string) {
  return tripsFor(type).find((t) => t.slug === slug);
}

export function tripStaticParams(type: ActivityType) {
  return tripsFor(type).map((t) => ({ slug: t.slug }));
}

function metaDescription(trip: Trip) {
  const text = `${trip.title}: ${trip.duration}, ${trip.difficulty.toLowerCase()}. ${trip.description}`;
  return text.length > 158 ? `${text.slice(0, 155).replace(/\s+\S*$/, "")}…` : text;
}

export async function tripMetadata(type: ActivityType, params: Promise<{ slug: string }>): Promise<Metadata> {
  const trip = findTrip(type, (await params).slug);
  if (!trip) return {};
  const activity = getActivity(type);
  const description = metaDescription(trip);
  return {
    title: `${trip.title} – ${activity.name} in Ladakh`,
    description,
    keywords: [trip.title, `${activity.name} Ladakh`, "Leh", SITE_NAME],
    alternates: { canonical: tripPath(trip) },
    openGraph: {
      title: trip.title,
      description,
      url: tripPath(trip),
      images: [{ url: trip.images[0], width: 1800, alt: trip.title }],
    },
  };
}

export default async function TripDetail({ type, params }: { type: ActivityType; params: Promise<{ slug: string }> }) {
  const trip = findTrip(type, (await params).slug);
  if (!trip) notFound();

  const activity = getActivity(type);
  const related = tripsFor(type).filter((t) => t.id !== trip.id).slice(0, 3);
  const facts = [
    { icon: <ClockIcon />, label: "Duration", value: trip.duration },
    { icon: <GaugeIcon />, label: "Difficulty", value: trip.difficulty },
    { icon: <GroupIcon />, label: "Group size", value: `Up to ${trip.groupSize}` },
  ];

  return (
    <>
      <section className="trip-hero">
        <Image src={trip.images[0]} alt="" fill preload sizes="100vw" className="trip-hero-image" />
        <div className="trip-hero-inner">
          <Breadcrumbs items={[{ name: activity.name, href: `/${type}` }, { name: trip.title, href: tripPath(trip) }]} />
          <p className="kicker">{activity.name}</p>
          <h1>{trip.title}</h1>
          <ul className="trip-hero-facts">
            {facts.map((f) => <li key={f.label}>{f.icon}<span className="sr-only">{f.label}: </span>{f.value}</li>)}
          </ul>
        </div>
      </section>

      <div className="trip-layout">
        <div className="trip-main">
          <section aria-labelledby="overview">
            <h2 id="overview">Overview</h2>
            <p className="trip-lede">{trip.description}</p>
          </section>

          <section aria-labelledby="itinerary">
            <h2 id="itinerary">Day-by-day itinerary</h2>
            <ol className="timeline">
              {trip.itinerary.map((d) => (
                <li key={d.day}>
                  <span className="timeline-day">{d.day}</span>
                  <h3>{d.title}</h3>
                  <p>{d.details}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="included" className="incl-grid">
            <div>
              <h2 id="included">What&apos;s included</h2>
              <ul className="incl-list">
                {trip.inclusions.map((x) => <li key={x}><CheckIcon />{x}</li>)}
              </ul>
            </div>
            <div>
              <h2>Not included</h2>
              <ul className="incl-list excl">
                {trip.exclusions.map((x) => <li key={x}><CrossIcon />{x}</li>)}
              </ul>
            </div>
          </section>
        </div>

        <aside className="booking-card" aria-label="Book this trip">
          <p className="booking-price">
            <small>From</small>
            {formatPrice(trip.price)}
          </p>
          <dl className="booking-facts">
            {facts.map((f) => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
          <Link href="/plan-your-trip" className="btn primary block">Enquire about this trip</Link>
          <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn outline block">
            <WhatsAppIcon /> Ask on WhatsApp
          </a>
          <p className="booking-note">Dates and itinerary can be tailored to your group.</p>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section section-tint" aria-labelledby="related">
          <div className="section-heading">
            <p className="kicker">More {activity.name.toLowerCase()}</p>
            <h2 id="related">You might also like</h2>
          </div>
          <div className="trip-grid">
            {related.map((t) => <TripCard key={t.id} trip={t} />)}
          </div>
        </section>
      )}

      <CtaBand />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TouristTrip",
          name: trip.title,
          description: trip.description,
          url: `${SITE_URL}${tripPath(trip)}`,
          image: trip.images,
          touristType: activity.name,
          itinerary: {
            "@type": "ItemList",
            numberOfItems: trip.itinerary.length,
            itemListElement: trip.itinerary.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${d.day}: ${d.title}`,
              description: d.details,
            })),
          },
          offers: {
            "@type": "Offer",
            price: trip.price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: `${SITE_URL}${tripPath(trip)}`,
          },
          provider: { "@id": `${SITE_URL}/#organization` },
        }}
      />
    </>
  );
}
