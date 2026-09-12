"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Trip } from "@/lib/trips";

export default function TripCard({ trip }: { trip: Trip }) {
  return (
    <motion.article
      className="trip-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.12)" }}
    >
      <div className="trip-image-wrap">
        <motion.img
          src={trip.images[0]}
          alt={trip.title}
          className="trip-image"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          whileHover={{ scale: 1.08 }}
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
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {trip.title}
        </motion.h3>
        <motion.div
          className="trip-details"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span>{trip.price.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 })}</span>
          <span>{trip.groupSize}</span>
        </motion.div>
      </div>
    </motion.article>
  );
}
