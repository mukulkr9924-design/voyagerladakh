"use client";

import { motion } from "framer-motion";
import type { Trip } from "@/lib/trips";
import ItineraryAccordion from "@/components/ItineraryAccordion";

export default function TripDetailTemplate({ trip, activityName }: { trip: Trip; activityName: string }) {
  return (
    <motion.section
      className="trip-detail-wrap"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="trip-detail-hero"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <motion.img
          src={trip.images[0]}
          alt={trip.title}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        />
        <motion.div
          className="trip-detail-copy"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.span
            className="kicker"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            {activityName}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {trip.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {trip.duration} • {trip.difficulty} • {trip.groupSize}
          </motion.p>
          <motion.div
            className="trip-detail-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, staggerChildren: 0.08 }}
          >
            {[
              { label: "Duration", value: trip.duration },
              { label: "Difficulty", value: trip.difficulty },
              { label: "Group", value: trip.groupSize },
              { label: "Price", value: trip.price.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }) },
            ].map((item) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <strong>{item.label}</strong>
                <span>{item.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <ItineraryAccordion trip={trip} />
      </motion.div>
    </motion.section>
  );
}
