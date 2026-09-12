"use client";

import { motion } from "framer-motion";

export default function AboutContent() {
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
        <span className="kicker">About Voyager Ladakh</span>
        <h2>Leh-based adventure planning</h2>
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
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            We are a Leh-based local team planning trekking, biking, spiritual and cultural journeys across Ladakh. Our routes are designed with local guides, village hosts, conservation teams and regional operators.
          </motion.p>
          <motion.div
            className="trip-detail-list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, staggerChildren: 0.08 }}
          >
            {[
              { title: "Sustainability", desc: "Low-impact planning" },
              { title: "Community", desc: "Local host networks" },
              { title: "Guides", desc: "Regional experts" },
              { title: "Focus", desc: "Responsible travel" },
            ].map((item) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <strong>{item.title}</strong>
                <span>{item.desc}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
