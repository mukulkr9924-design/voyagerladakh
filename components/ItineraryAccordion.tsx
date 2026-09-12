"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Trip } from "@/lib/trips";

export default function ItineraryAccordion({ trip }: { trip: Trip }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="itinerary">
      <div className="section-heading">
        <span className="kicker">Itinerary</span>
        <h2>Trip flow</h2>
      </div>
      <div className="accordion">
        {trip.itinerary.map((day, index) => (
          <motion.div
            key={day.day}
            className="accordion-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <motion.button
              className="accordion-trigger"
              onClick={() => setOpen(open === index ? null : index)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>{day.day}</span>
              <span>{day.title}</span>
              <motion.span
                className="accordion-icon"
                animate={{ rotate: open === index ? 45 : 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              >
                +
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {open === index && (
                <motion.div
                  className="accordion-panel"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <p>{day.details}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
