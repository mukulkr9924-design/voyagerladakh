"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const megamenu = {
  trekking: [
    { title: "Markha Valley Trek", href: "/trekking-hiking/markha-valley-trek" },
    { title: "Zanskar High Trail", href: "/trekking-hiking/zanskar-trail" },
    { title: "Moonland Ridge Walk", href: "/trekking-hiking/moonland-ridge-walk" },
    { title: "Khardung to Pangong", href: "/trekking-hiking/khardung-pangong" }
  ],
  motorbike: [
    { title: "Leh to Nubra Circuit", href: "/motorbike-touring/lehmotorbike-nubra-sky" },
    { title: "Leh to Zanskar Road", href: "/motorbike-touring/leh-zanskar-road" },
    { title: "Pangong High Road", href: "/motorbike-touring/pangong-high-road" },
    { title: "Spiti Crossing", href: "/motorbike-touring/spiti-crossing" }
  ],
  spiritual: [
    { title: "Leh Spiritual Retreat", href: "/spiritual-journeys/leh-spiritual-retreat" },
    { title: "Prayer Walk Circuit", href: "/spiritual-journeys/prayer-walk-circuit" },
    { title: "Monastery Stillness", href: "/spiritual-journeys/monastery-stillness" },
    { title: "Inner Pass Pilgrimage", href: "/spiritual-journeys/inner-pass-pilgrimage" }
  ],
  cultural: [
    { title: "Village Culture Circuit", href: "/cultural-tours/village-culture-leh" },
    { title: "Ladakh Craft Week", href: "/cultural-tours/ladakh-craft-week" },
    { title: "Homestay Valley Loop", href: "/cultural-tours/homestay-valley-loop" },
    { title: "Monastery Kitchen Trail", href: "/cultural-tours/monastery-kitchen-trail" }
  ]
};

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);
  const closeMega = () => setMegaOpen(null);

  return (
    <>
      <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
        <div className="topbar">
          <div className="brand">
            <Link href="/" className="brand-link">
              <Image src="/voyager-logo.jpg" alt="Voyager Ladakh Logo" className="brand-logo" width={40} height={40} />
              <span className="brand-name">Voyager Ladakh</span>
            </Link>
          </div>
          <nav className="main-nav">
            <div className="mega-hover" onMouseEnter={() => setMegaOpen("trekking")} onMouseLeave={closeMega}>
              <Link href="/trekking-hiking" onClick={closeDrawer}>Trekking & Hiking</Link>
              <AnimatePresence>
                {megaOpen === "trekking" && (
                  <motion.div
                    className="mega-menu"
                    initial={{ opacity: 0, y: 12, scaleY: 0.95 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -8, scaleY: 0.95 }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  >
                    <div className="mega-col">
                      <div className="mega-title">Trekking & Hiking</div>
                      {megamenu.trekking.map((item, i) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link href={item.href} onClick={closeMega} className="mega-link">
                            {item.title}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mega-col">
                      <div className="mega-title">Motorbike Touring</div>
                      {megamenu.motorbike.map((item, i) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link href={item.href} onClick={closeMega} className="mega-link">
                            {item.title}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mega-col">
                      <div className="mega-title">Spiritual Journeys</div>
                      {megamenu.spiritual.map((item, i) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link href={item.href} onClick={closeMega} className="mega-link">
                            {item.title}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                    <div className="mega-col">
                      <div className="mega-title">Cultural & Village Tours</div>
                      {megamenu.cultural.map((item, i) => (
                        <motion.div
                          key={item.href}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.04 }}
                        >
                          <Link href={item.href} onClick={closeMega} className="mega-link">
                            {item.title}
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <Link href="/motorbike-touring" onClick={closeDrawer}>Motorbike Touring</Link>
            <Link href="/spiritual-journeys" onClick={closeDrawer}>Spiritual Journeys</Link>
            <Link href="/cultural-tours" onClick={closeDrawer}>Cultural & Village Tours</Link>
            <Link href="/plan-your-trip" onClick={closeDrawer}>Plan your trip</Link>
            <Link href="/contact" onClick={closeDrawer}>Contact</Link>
          </nav>
          <motion.button
            className="menu-button"
            onClick={() => setDrawerOpen(!drawerOpen)}
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            ☰
          </motion.button>
        </div>

        <AnimatePresence>
          {drawerOpen && (
            <motion.div
              className="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <motion.button
                className="drawer-close"
                onClick={closeDrawer}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.8 }}
              >
                ×
              </motion.button>
              <div className="drawer-brand">
                <Link href="/" onClick={closeDrawer} className="brand-link">
                  <Image src="/voyager-logo.jpg" alt="Voyager Ladakh Logo" className="brand-logo" width={40} height={40} />
                  <span className="brand-name">Voyager Ladakh</span>
                </Link>
              </div>
              <nav className="drawer-nav">
                {[
                  { label: "Trekking & Hiking", href: "/trekking-hiking" },
                  { label: "Motorbike Touring", href: "/motorbike-touring" },
                  { label: "Spiritual Journeys", href: "/spiritual-journeys" },
                  { label: "Cultural & Village Tours", href: "/cultural-tours" },
                  { label: "Plan your trip", href: "/plan-your-trip" },
                  { label: "Contact", href: "/contact" },
                ].map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    whileHover={{ x: 8 }}
                  >
                    <Link href={item.href} onClick={closeDrawer}>
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Scroll Progress Bar */}
      <motion.div
        className="scroll-progress"
        style={{ width: scrolled ? "100%" : "0%" }}
        animate={{ width: scrolled ? "100%" : "0%" }}
        transition={{ duration: 0.3 }}
      />
    </>
  );
}
