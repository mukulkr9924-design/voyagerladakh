import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import ElevationProfile from "@/components/ElevationProfile";
import JsonLd from "@/components/JsonLd";
import { Breadcrumbs } from "@/components/PageHeader";
import TripCard from "@/components/TripCard";
import TripGallery from "@/components/TripGallery";
import { CheckIcon, ClockIcon, CrossIcon, GaugeIcon, GroupIcon, WhatsAppIcon } from "@/components/Icons";
import { absoluteUrl, formatGroupSize, formatRoute, SITE_NAME, SITE_URL, socialFor, tripPath } from "@/lib/activities";
import { getActivity, getSettings, getTrip, tripsFor } from "@/lib/content";
import { SHARE_IMAGE_WIDTH, sanityImageUrl } from "@/sanity/lib/imageUrl";
import type { ActivityType, Trip } from "@/lib/trips";

export async function tripStaticParams(type: ActivityType) {
  return (await tripsFor(type)).map((t) => ({ slug: t.slug }));
}

function metaDescription(trip: Trip) {
  const text = `${trip.title}: ${trip.duration}, ${trip.difficulty.toLowerCase()}. ${trip.description}`;
  return text.length > 158 ? `${text.slice(0, 155).replace(/\s+\S*$/, "")}…` : text;
}

export async function tripMetadata(type: ActivityType, params: Promise<{ slug: string }>): Promise<Metadata> {
  const trip = stegaClean(await getTrip(type, (await params).slug));
  if (!trip) return {};
  const activity = stegaClean(await getActivity(type));
  const description = metaDescription(trip);
  return {
    title: `${trip.title} – ${activity.name} in Ladakh`,
    description,
    keywords: [trip.title, `${activity.name} Ladakh`, "Leh", SITE_NAME],
    alternates: { canonical: tripPath(trip) },
    ...socialFor(tripPath(trip), trip.title, description, trip.heroImage),
  };
}

export default async function TripDetail({ type, params }: { type: ActivityType; params: Promise<{ slug: string }> }) {
  const trip = await getTrip(type, (await params).slug);
  if (!trip) notFound();

  const [activity, siblings, { contact }] = await Promise.all([getActivity(type), tripsFor(type), getSettings()]);
  const related = siblings.filter((t) => t.id !== trip.id).slice(0, 3);
  const facts = [
    { icon: <ClockIcon />, label: "Duration", value: trip.duration },
    { icon: <GaugeIcon />, label: "Difficulty", value: trip.difficulty },
    { icon: <GroupIcon />, label: "Group size", value: formatGroupSize(trip.groupSize) },
  ];
  const details = [
    ...facts,
    { label: "Best season", value: trip.bestSeason },
    { label: "Start / end", value: formatRoute(trip) },
    { label: "Stay", value: trip.stay },
  ];
  const photos = trip.gallery.length > 0 ? trip.gallery : [{ ...trip.heroImage, alt: trip.heroImage.alt || trip.title }];

  return (
    <>
      <section className="trip-hero">
        <Image
          src={trip.heroImage.url}
          alt={trip.heroImage.alt}
          fill
          preload
          sizes="100vw"
          className="trip-hero-image"
          style={trip.heroImage.position ? { objectPosition: trip.heroImage.position } : undefined}
        />
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

          <section aria-labelledby="gallery">
            <h2 id="gallery">Gallery</h2>
            <TripGallery photos={photos} tripTitle={trip.title} />
          </section>

          {trip.elevationProfile.length > 1 && (
            <section aria-labelledby="elevation">
              <h2 id="elevation">Elevation &amp; distance</h2>
              <ElevationProfile points={trip.elevationProfile} days={trip.itinerary} />
            </section>
          )}

          <section aria-labelledby="itinerary">
            <h2 id="itinerary">Day-by-day itinerary</h2>
            <ol className="timeline">
              {trip.itinerary.map((d, i) => (
                <li key={i}>
                  <span className="timeline-day">{d.day}</span>
                  <h3>{d.title}</h3>
                  {d.distanceKm !== undefined && (
                    <p className="timeline-stats">
                      <span>{d.distanceKm} km</span>
                      {d.hours && <span>{d.hours}</span>}
                      {d.gainM !== undefined && d.lossM !== undefined && <span>+{d.gainM} m / −{d.lossM} m</span>}
                    </p>
                  )}
                  {d.details && <p>{d.details}</p>}
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
          <p className="booking-quote">
            Price on request
            <small>Quoted for your dates and group size</small>
          </p>
          <dl className="booking-facts">
            {details.map((f) => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
          <Link href="/plan-your-trip" className="btn primary block">Enquire about this trip</Link>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn outline block">
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
          image: photos.map((p) => absoluteUrl(sanityImageUrl(p.url, SHARE_IMAGE_WIDTH))),
          touristType: activity.name,
          itinerary: {
            "@type": "ItemList",
            numberOfItems: trip.itinerary.length,
            itemListElement: trip.itinerary.map((d, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: `${d.day}: ${d.title}`,
              description: d.details ?? d.title,
            })),
          },
          provider: { "@id": `${SITE_URL}/#organization` },
        }}
      />
    </>
  );
}
