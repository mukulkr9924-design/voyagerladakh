import Image from "next/image";
import { ArrowIcon, CalendarIcon, ClockIcon, GroupIcon } from "@/components/Icons";
import Link from "@/components/LocaleLink";
import { difficultyLabel, formatGroupSize, tripPath } from "@/lib/activities";
import { getI18n } from "@/lib/locale";
import type { Trip } from "@/lib/trips";

export default async function TripCard({ trip, headingLevel = "h3" }: { trip: Trip; headingLevel?: "h2" | "h3" }) {
  const { t } = await getI18n();
  const Heading = headingLevel;
  return (
    <article className="trip-card reveal">
      <div className="trip-card-media">
        <Image
          src={trip.heroImage.url}
          alt=""
          fill
          style={trip.heroImage.position ? { objectPosition: trip.heroImage.position } : undefined}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 420px"
        />
        <span className={`badge badge-${trip.difficulty.toLowerCase()}`}>{difficultyLabel(trip.difficulty, t)}</span>
      </div>
      <div className="trip-card-body">
        <Heading className="trip-card-title">
          <Link href={tripPath(trip)} className="stretched-link">{trip.title}</Link>
        </Heading>
        <p className="trip-card-desc">{trip.description}</p>
        <ul className="trip-card-meta">
          <li><ClockIcon />{trip.duration}</li>
          <li><GroupIcon />{formatGroupSize(trip.groupSize, t)}</li>
          <li><CalendarIcon /><span className="sr-only">{t.trip.bestSeason}: </span>{trip.bestSeason}</li>
        </ul>
        <div className="trip-card-foot">
          <span className="trip-card-cta">{t.trip.viewTrip}</span>
          <span className="trip-card-go" aria-hidden="true"><ArrowIcon /></span>
        </div>
      </div>
    </article>
  );
}
