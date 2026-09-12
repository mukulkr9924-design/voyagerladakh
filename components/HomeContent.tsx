"use client";

import Hero from "@/components/Hero";
import TripCard from "@/components/TripCard";
import AnimatedRouteMap from "@/components/AnimatedRouteMap";
import { trips } from "@/lib/trips";
import { motion } from "framer-motion";

export default function HomeContent() {
  return (
    <>
      <Hero />

      <motion.section
        className="section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="kicker">The Ladakh Way</span>
          <h2>Choose your mountain rhythm</h2>
        </motion.div>
        <motion.div
          className="activity-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {[
            { icon: "✦", title: "Trekking & Hiking", desc: "High passes, river valleys and remote ridge trails.", href: "/trekking-hiking" },
            { icon: "♞", title: "Motorbike Touring", desc: "Leh roads, high passes and mountain highway routes.", href: "/motorbike-touring" },
            { icon: "☼", title: "Spiritual Journeys", desc: "Monasteries, quiet walks and reflection in isolation.", href: "/spiritual-journeys" },
            { icon: "✎", title: "Cultural & Village Tours", desc: "Homestays, craft, markets and village traditions.", href: "/cultural-tours" },
          ].map((activity) => (
            <motion.article
              key={activity.title}
              className="activity-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(0,0,0,0.1)" }}
            >
              <span className="icon">{activity.icon}</span>
              <div>
                <h3>{activity.title}</h3>
                <p>{activity.desc}</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </motion.section>

      <AnimatedRouteMap />

      <motion.section
        className="section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="section-heading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <span className="kicker">Featured trips</span>
          <h2>Routes from the valley</h2>
        </motion.div>
        <motion.div
          className="trip-card-row"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
        >
          {trips.slice(0, 3).map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </motion.div>
      </motion.section>
    </>
  );
}
