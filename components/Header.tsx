"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const megamenu = {
  trekking: [
    { title: "Sham Valley Trek", href: "/trekking-hiking/sham-valley-trek" },
    { title: "Lamayuru to Chilling", href: "/trekking-hiking/lamayuru-chilling-trek" },
    { title: "Rumtse to Tso Moriri", href: "/trekking-hiking/rumtse-tso-moriri-trek" },
    { title: "Markha Valley (Chilling)", href: "/trekking-hiking/markha-valley-chilling-trek" },
    { title: "Markha Valley (Spituk)", href: "/trekking-hiking/markha-valley-spituk-trek" },
    { title: "Jhunglam Trek", href: "/trekking-hiking/jhunglam-hemis-padum-trek" }
  ],
  motorbike: [
    { title: "Leh to Nubra Circuit", href: "/motorbike-touring/lehmotorbike-nubra-sky" },
    { title: "Leh to Zanskar Road", href: "/motorbike-touring/leh-zanskar-road" },
    { title: "Pangong High Road", href: "/motorbike-touring/pangong-high-road" },
    { title: "Spiti Crossing", href: "/motorbike-touring/spiti-crossing" }
  ],
  soulOfLadakh: [
    { title: "Leh Spiritual Retreat", href: "/soul-of-ladakh/leh-spiritual-retreat" },
    { title: "Village Culture Circuit", href: "/soul-of-ladakh/village-culture-leh" }
  ],
  mountaineering: [
    { title: "Kang Yatse II", href: "/mountaineering/kang-yatse-ii" },
    { title: "Kang Yatse I", href: "/mountaineering/kang-yatse-i" },
    { title: "Kang Yatse I & II", href: "/mountaineering/kang-yatse-i-ii" },
    { title: "Mentok Kangri", href: "/mountaineering/mentok-kangri" },
    { title: "Dzo Jongo East & West", href: "/mountaineering/dzo-jongo-east-west" }
  ]
};

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState<string | null>(null);
  const [megaTimeout, setMegaTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeDrawer = () => setDrawerOpen(false);
  const closeMega = () => {
    if (megaTimeout) clearTimeout(megaTimeout);
    setMegaTimeout(setTimeout(() => setMegaOpen(null), 150));
  };

  const openMega = (category: string) => {
    if (megaTimeout) clearTimeout(megaTimeout);
    setMegaOpen(category);
  };

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
            <div className="mega-hover" onMouseEnter={() => openMega("trekking")} onMouseLeave={closeMega}>
              <Link href="/trekking-hiking" onClick={closeDrawer}>Trekking & Hiking</Link>
              <AnimatePresence>
                {megaOpen === "trekking" && (
                  <div className="mega-menu-shell">
                    <motion.div
                      className="mega-menu"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      onMouseEnter={() => openMega("trekking")}
                      onMouseLeave={closeMega}
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
                      <div className="mega-title">Mountaineering</div>
                      {megamenu.mountaineering.map((item, i) => (
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
                      <div className="mega-title">Soul of Ladakh</div>
                      {megamenu.soulOfLadakh.map((item, i) => (
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
                  </div>
                )}
              </AnimatePresence>
            </div>
            <div className="mega-hover" onMouseEnter={() => openMega("mountaineering")} onMouseLeave={closeMega}>
              <Link href="/mountaineering" onClick={closeDrawer}>Mountaineering</Link>
              <AnimatePresence>
                {megaOpen === "mountaineering" && (
                  <div className="mega-menu-shell">
                    <motion.div
                      className="mega-menu"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      onMouseEnter={() => openMega("mountaineering")}
                      onMouseLeave={closeMega}
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
                      <div className="mega-title">Mountaineering</div>
                      {megamenu.mountaineering.map((item, i) => (
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
                      <div className="mega-title">Soul of Ladakh</div>
                      {megamenu.soulOfLadakh.map((item, i) => (
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
                  </div>
                )}
              </AnimatePresence>
            </div>
            <div className="mega-hover" onMouseEnter={() => openMega("motorbike")} onMouseLeave={closeMega}>
              <Link href="/motorbike-touring" onClick={closeDrawer}>Motorbike Touring</Link>
              <AnimatePresence>
                {megaOpen === "motorbike" && (
                  <div className="mega-menu-shell">
                    <motion.div
                      className="mega-menu"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      onMouseEnter={() => openMega("motorbike")}
                      onMouseLeave={closeMega}
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
                      <div className="mega-title">Mountaineering</div>
                      {megamenu.mountaineering.map((item, i) => (
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
                      <div className="mega-title">Soul of Ladakh</div>
                      {megamenu.soulOfLadakh.map((item, i) => (
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
                  </div>
                )}
              </AnimatePresence>
            </div>
            <div className="mega-hover" onMouseEnter={() => openMega("soulOfLadakh")} onMouseLeave={closeMega}>
              <Link href="/soul-of-ladakh" onClick={closeDrawer}>Soul of Ladakh</Link>
              <AnimatePresence>
                {megaOpen === "soulOfLadakh" && (
                  <div className="mega-menu-shell">
                    <motion.div
                      className="mega-menu"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ type: "spring", damping: 25, stiffness: 300 }}
                      onMouseEnter={() => openMega("soulOfLadakh")}
                      onMouseLeave={closeMega}
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
                      <div className="mega-title">Mountaineering</div>
                      {megamenu.mountaineering.map((item, i) => (
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
                      <div className="mega-title">Soul of Ladakh</div>
                      {megamenu.soulOfLadakh.map((item, i) => (
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
                  </div>
                )}
              </AnimatePresence>
            </div>
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
                  { label: "Mountaineering", href: "/mountaineering" },
                  { label: "Motorbike Touring", href: "/motorbike-touring" },
                  { label: "Soul of Ladakh", href: "/soul-of-ladakh" },
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
