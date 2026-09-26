"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { trips } from "@/lib/trips";

export default function TrekkingContent() {
  const trekkingTrips = trips.filter((trip) => trip.activityType === "trekking-hiking");

  return (
    <motion.section
      className="section"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="section-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="kicker">Trekking & Hiking</span>
        <h2>Routes through the high valleys</h2>
      </motion.div>
      <motion.div
        className="trip-card-row"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, staggerChildren: 0.1 }}
      >
        {trekkingTrips.map((trip) => (
          <motion.article
            key={trip.id}
            className="trip-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="trip-image-wrap">
              <motion.img
                src={trip.images[0]}
                alt={trip.title}
                className="trip-image"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.08 }}
                transition={{ duration: 0.6 }}
              />
              <motion.span
                className="trip-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link href={`/trekking-hiking/${trip.slug}`}>View trip</Link>
              </motion.span>
            </div>
            <div className="trip-content">
              <div className="trip-meta">
                <span>{trip.duration}</span>
                <span>{trip.difficulty}</span>
              </div>
              <h3>{trip.title}</h3>
              <div className="trip-details">
                <span>{trip.price.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}</span>
                <span>{trip.groupSize}</span>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </motion.section>
  );
}
