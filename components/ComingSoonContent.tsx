"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ComingSoonContent() {
  return (
    <div className="coming-soon-container">
      <motion.div
        className="coming-soon-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="coming-soon-icon"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", damping: 15 }}
        >
          🏔️
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Coming Soon
        </motion.h1>

        <motion.p
          className="coming-soon-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          We&apos;re crafting an unforgettable adventure for you. This journey is currently being prepared and will be available soon.
        </motion.p>

        <motion.div
          className="coming-soon-features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, staggerChildren: 0.1 }}
        >
          {[
            { icon: "✦", text: "Expertly curated routes" },
            { icon: "♞", text: "Local guides & support" },
            { icon: "☼", text: "Authentic experiences" },
            { icon: "✎", text: "Sustainable tourism" }
          ].map((feature, i) => (
            <motion.div
              key={i}
              className="feature-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.1 }}
            >
              <span className="feature-icon">{feature.icon}</span>
              <span>{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="coming-soon-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Link href="/" className="btn primary">
            Return Home
          </Link>
          <Link href="/contact" className="btn ghost">
            Contact Us
          </Link>
        </motion.div>

        <motion.p
          className="coming-soon-notify"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Want to be notified when this journey launches?{" "}
          <Link href="/contact">Get in touch</Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
