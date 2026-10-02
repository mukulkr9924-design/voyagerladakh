"use client";

import Image from "next/image";
import { useEffect, useState, useSyncExternalStore } from "react";
import { useI18n } from "@/components/I18nProvider";
import { format } from "@/lib/i18n";
import type { SanityImage } from "@/lib/trips";

const INTERVAL_MS = 6000;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

export default function HeroSlideshow({ slides }: { slides: SanityImage[] }) {
  const { t } = useI18n();
  const [active, setActive] = useState(0);
  // Slides up to this index have their photo in the page. The rest are added just before they're
  // shown: stacked in the viewport, they'd otherwise all download alongside the first photo.
  const [reach, setReach] = useState(0);
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION).matches,
    () => false,
  );
  // Respect reduced motion until the visitor explicitly presses play or pause.
  const paused = userPaused ?? reducedMotion;

  const show = (i: number) => {
    setActive(i);
    setReach((r) => Math.max(r, i + 1));
  };

  // Fetch the second photo once the page has finished loading, so it's ready for the first change.
  useEffect(() => {
    const warm = () => setReach((r) => Math.max(r, 1));
    if (document.readyState === "complete") {
      const id = window.setTimeout(warm);
      return () => window.clearTimeout(id);
    }
    window.addEventListener("load", warm, { once: true });
    return () => window.removeEventListener("load", warm);
  }, []);

  useEffect(() => {
    if (paused || slides.length < 2) return;
    const id = window.setInterval(() => {
      if (document.hidden) return;
      const next = (active + 1) % slides.length;
      setActive(next);
      setReach((r) => Math.max(r, next + 1));
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, active, slides.length]);

  return (
    <>
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <div key={slide.url} className={`hero-slide${i === active ? " is-active" : ""}`} aria-hidden={i !== active}>
            {i <= reach && (
              <Image
                src={slide.url}
                alt={slide.alt}
                fill
                placeholder={slide.lqip ? "blur" : "empty"}
                blurDataURL={slide.lqip}
                style={slide.position ? { objectPosition: slide.position } : undefined}
                preload={i === 0}
                sizes="100vw"
                className="hero-image"
              />
            )}
          </div>
        ))}
      </div>
      <div className="hero-controls">
        {slides.map((slide, i) => (
          <button
            key={slide.url}
            type="button"
            className="hero-dot"
            aria-label={format(t.slideshow.showPhoto, { n: i + 1, total: slides.length })}
            aria-current={i === active}
            onClick={() => show(i)}
          />
        ))}
        <button
          type="button"
          className="hero-pause"
          aria-label={paused ? t.slideshow.play : t.slideshow.pause}
          onClick={() => setUserPaused(!paused)}
        >
          {paused ? (
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z" fill="currentColor" /></svg>
          ) : (
            <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4.5 3h2.5v10H4.5zM9 3h2.5v10H9z" fill="currentColor" /></svg>
          )}
        </button>
      </div>
    </>
  );
}
