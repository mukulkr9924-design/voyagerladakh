import Image from "next/image";
import Link from "next/link";
import { ArrowIcon, ClockIcon, GroupIcon } from "@/components/Icons";
import { formatGroupSize, formatPrice, tripPath } from "@/lib/activities";
import type { Trip } from "@/lib/trips";

export default function TripCard({ trip, headingLevel = "h3" }: { trip: Trip; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;
  return (
    <article className="trip-card reveal">
      <div className="trip-card-media">
        <Image
          src={trip.images[0]}
          alt=""
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 420px"
        />
        <span className={`badge badge-${trip.difficulty.toLowerCase()}`}>{trip.difficulty}</span>
      </div>
      <div className="trip-card-body">
        <Heading className="trip-card-title">
          <Link href={tripPath(trip)} className="stretched-link">{trip.title}</Link>
        </Heading>
        <p className="trip-card-desc">{trip.description}</p>
        <ul className="trip-card-meta">
          <li><ClockIcon />{trip.duration}</li>
          <li><GroupIcon />{formatGroupSize(trip.groupSize)}</li>
        </ul>
        <div className="trip-card-foot">
          <p className="trip-card-price">
            <small>From</small>
            {formatPrice(trip.price)}
          </p>
          <span className="trip-card-go" aria-hidden="true"><ArrowIcon /></span>
        </div>
      </div>
    </article>
  );
}
