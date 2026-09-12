"use client";

import { motion } from "framer-motion";

export default function PlanTripContent() {
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
        <span className="kicker">Plan your trip</span>
        <h2>Tell us about your Ladakh route</h2>
      </motion.div>
      <motion.div
        className="trip-detail-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="trip-detail-copy"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <form className="trip-form">
            {[
              { label: "Name", type: "text", placeholder: "Your name" },
              { label: "Email", type: "email", placeholder: "you@example.com" },
              { label: "Activity", type: "select", options: ["Trekking & Hiking", "Motorbike Touring", "Spiritual Journeys", "Cultural & Village Tours"] },
              { label: "Travel month", type: "text", placeholder: "June 2027" },
            ].map((field, i) => (
              <motion.div
                key={field.label}
                className="form-row"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08 }}
              >
                <label>{field.label}</label>
                {field.type === "select" ? (
                  <select>
                    <option value="">Select activity</option>
                    {field.options?.map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input type={field.type} placeholder={field.placeholder} />
                )}
              </motion.div>
            ))}
            <motion.button
              className="btn primary"
              type="button"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Request itinerary
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
