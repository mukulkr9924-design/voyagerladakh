import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import Image from "next/image";
import { notFound } from "next/navigation";
import CtaBand from "@/components/CtaBand";
import ElevationProfile from "@/components/ElevationProfile";
import JsonLd from "@/components/JsonLd";
import Link from "@/components/LocaleLink";
import { Breadcrumbs } from "@/components/PageHeader";
import TripCard from "@/components/TripCard";
import TripGallery from "@/components/TripGallery";
import { CheckIcon, ClockIcon, CrossIcon, GaugeIcon, GroupIcon, WhatsAppIcon } from "@/components/Icons";
import { absoluteUrl, difficultyLabel, formatGroupSize, formatRoute, pageMeta, SITE_NAME, SITE_URL, tripPath } from "@/lib/activities";
import { getActivity, getSettings, getTrip, tripsFor } from "@/lib/content";
import type { Dictionary } from "@/lib/dictionaries";
import { DEFAULT_LOCALE, format, LANGUAGES, localePath } from "@/lib/i18n";
import { getI18n } from "@/lib/locale";
import { SHARE_IMAGE_WIDTH, sanityImageUrl } from "@/sanity/lib/imageUrl";
import type { ActivityType, Trip } from "@/lib/trips";

// Trip addresses are the same in every language.
export async function tripStaticParams(type: ActivityType) {
  return (await tripsFor(type, DEFAULT_LOCALE)).map((t) => ({ slug: t.slug }));
}

function metaDescription(trip: Trip, t: Dictionary) {
  const text = `${trip.title}: ${trip.duration}, ${difficultyLabel(trip.difficulty, t).toLowerCase()}. ${trip.description}`;
  return text.length > 158 ? `${text.slice(0, 155).replace(/\s+\S*$/, "")}…` : text;
}

export async function tripMetadata(type: ActivityType, params: Promise<{ slug: string }>): Promise<Metadata> {
  const trip = stegaClean(await getTrip(type, (await params).slug));
  if (!trip) return {};
  const [activity, { locale, t }] = stegaClean(await Promise.all([getActivity(type), getI18n()]));
  const description = metaDescription(trip, t);
  return {
    title: format(t.trip.metaTitle, { title: trip.title, activity: activity.name }),
    description,
    keywords: [trip.title, `${activity.name} Ladakh`, "Leh", SITE_NAME],
    ...pageMeta(locale, tripPath(trip), trip.title, description, trip.heroImage),
  };
}

export default async function TripDetail({ type, params }: { type: ActivityType; params: Promise<{ slug: string }> }) {
  const trip = await getTrip(type, (await params).slug);
  if (!trip) notFound();

  const [activity, siblings, { contact }, { locale, t }] = await Promise.all([getActivity(type), tripsFor(type), getSettings(), getI18n()]);
  const related = siblings.filter((s) => s.id !== trip.id).slice(0, 3);
  const facts = [
    { icon: <ClockIcon />, label: t.trip.duration, value: trip.duration },
    { icon: <GaugeIcon />, label: t.trip.difficulty, value: difficultyLabel(trip.difficulty, t) },
    { icon: <GroupIcon />, label: t.trip.groupSize, value: formatGroupSize(trip.groupSize, t) },
  ];
  const details = [
    ...facts,
    { label: t.trip.bestSeason, value: trip.bestSeason },
    { label: t.trip.startEnd, value: formatRoute(trip, t, locale) },
    { label: t.trip.stay, value: trip.stay },
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
            <h2 id="overview">{t.trip.overview}</h2>
            <p className="trip-lede">{trip.description}</p>
          </section>

          <section aria-labelledby="gallery">
            <h2 id="gallery">{t.trip.gallery}</h2>
            <TripGallery photos={photos} tripTitle={trip.title} />
          </section>

          {trip.elevationProfile.length > 1 && (
            <section aria-labelledby="elevation">
              <h2 id="elevation">{t.trip.elevation}</h2>
              <ElevationProfile points={trip.elevationProfile} days={trip.itinerary} />
            </section>
          )}

          <section aria-labelledby="itinerary">
            <h2 id="itinerary">{t.trip.itinerary}</h2>
            <ol className="timeline">
              {trip.itinerary.map((d, i) => (
                <li key={i}>
                  <span className="timeline-day">{d.day}</span>
                  <h3>{d.title}</h3>
                  {d.distanceKm !== undefined && (
                    <p className="timeline-stats">
                      <span dir="ltr">{d.distanceKm} km</span>
                      {d.hours && <span>{d.hours}</span>}
                      {d.gainM !== undefined && d.lossM !== undefined && <span dir="ltr">+{d.gainM} m / −{d.lossM} m</span>}
                    </p>
                  )}
                  {d.details && <p>{d.details}</p>}
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="included" className="incl-grid">
            <div>
              <h2 id="included">{t.trip.included}</h2>
              <ul className="incl-list">
                {trip.inclusions.map((x) => <li key={x}><CheckIcon />{x}</li>)}
              </ul>
            </div>
            <div>
              <h2>{t.trip.notIncluded}</h2>
              <ul className="incl-list excl">
                {trip.exclusions.map((x) => <li key={x}><CrossIcon />{x}</li>)}
              </ul>
            </div>
          </section>
        </div>

        <aside className="booking-card" aria-label={t.trip.book}>
          <p className="booking-quote">
            {t.trip.priceOnRequest}
            <small>{t.trip.priceNote}</small>
          </p>
          <dl className="booking-facts">
            {details.map((f) => (
              <div key={f.label}><dt>{f.label}</dt><dd>{f.value}</dd></div>
            ))}
          </dl>
          <Link href="/plan-your-trip" className="btn primary block">{t.trip.enquire}</Link>
          <a href={contact.whatsapp} target="_blank" rel="noopener noreferrer" className="btn outline block">
            <WhatsAppIcon /> {t.trip.askWhatsApp}
          </a>
          <p className="booking-note">{t.trip.tailored}</p>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="section section-tint" aria-labelledby="related">
          <div className="section-heading">
            <p className="kicker">{format(t.trip.more, { name: locale === "en" ? activity.name.toLowerCase() : activity.name })}</p>
            <h2 id="related">{t.trip.related}</h2>
          </div>
          <div className="trip-grid">
            {related.map((r) => <TripCard key={r.id} trip={r} />)}
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
          url: absoluteUrl(localePath(locale, tripPath(trip))),
          inLanguage: LANGUAGES[locale].tag,
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
