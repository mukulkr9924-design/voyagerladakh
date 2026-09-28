"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

// The map pulls in gsap + framer-motion, so its code is only fetched once the
// visitor scrolls near it.
const AnimatedRouteMap = dynamic(() => import("@/components/AnimatedRouteMap"), {
  ssr: false,
  loading: () => <div className="lmap-placeholder" aria-hidden="true" />,
});

export default function LazyRouteMap() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      // Start loading well before it enters the viewport so the swap happens off-screen.
      { rootMargin: "800px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (visible) return <AnimatedRouteMap />;
  return <div ref={ref} className="lmap-placeholder" aria-hidden="true" />;
}
