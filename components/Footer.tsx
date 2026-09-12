"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="brand small">Voyager Ladakh</div>
          <p>Leh, Ladakh</p>
        </motion.div>
        <motion.div
          className="footer-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {[
            { label: "Trekking", href: "/trekking-hiking" },
            { label: "Motorbike", href: "/motorbike-touring" },
            { label: "Spiritual", href: "/spiritual-journeys" },
            { label: "Cultural", href: "/cultural-tours" },
            { label: "Plan your trip", href: "/plan-your-trip" },
          ].map((item, i) => (
            <motion.div
              key={item.href}
              whileHover={{ x: 4, color: "var(--sage)" }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Link href={item.href}>{item.label}</Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
      <div className="footer-container">
        <motion.div
          className="footer-bottom"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="footer-bottom-left">
            <p>© 2026 Voyager Ladakh. All rights reserved.</p>
          </div>
          <div className="footer-bottom-right">
            <p>Developed by <a href="https://mukulkumar.dev" target="_blank" rel="noopener noreferrer">mukulkumar.dev</a></p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
