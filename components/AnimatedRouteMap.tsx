"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { AnimatePresence, motion } from "framer-motion";

import type { MapStop } from "@/lib/content";

type LabelSide = MapStop["label"];

// Signed bend per road segment: how far the curve bows away from a straight line.
// Segments beyond this list (when stops are added in the Studio) alternate a gentle bend.
const BENDS = [0.18, -0.22, 0.28, 0.22, -0.3, 0.2, -0.16, 0.22];
const bendAt = (i: number) => BENDS[i] ?? (i % 2 ? -0.2 : 0.2);

// Mountain passes drawn on the road between two named stops, `t` of the way along.
const PASSES = [
  { name: "Namika La", from: "Mulbek", to: "Lamayuru", t: 0.35 },
  { name: "Fotu La", from: "Mulbek", to: "Lamayuru", t: 0.78 },
  { name: "Khardung La", from: "Leh", to: "Nubra Valley", t: 0.5 },
];

type Pt = { x: number; y: number };

function controlPoint(a: Pt, b: Pt, bend: number): Pt {
  return {
    x: (a.x + b.x) / 2 - bend * (b.y - a.y),
    y: (a.y + b.y) / 2 + bend * (b.x - a.x),
  };
}

function routeGeometry(stops: MapStop[]) {
  const pointOnSegment = (i: number, t: number): Pt => {
    const a = stops[i];
    const b = stops[i + 1];
    const c = controlPoint(a, b, bendAt(i));
    const u = 1 - t;
    return {
      x: u * u * a.x + 2 * u * t * c.x + t * t * b.x,
      y: u * u * a.y + 2 * u * t * c.y + t * t * b.y,
    };
  };

  const segments = stops.slice(0, -1).map((a, i) => {
    const b = stops[i + 1];
    const c = controlPoint(a, b, bendAt(i));
    return `M${a.x} ${a.y} Q${c.x.toFixed(1)} ${c.y.toFixed(1)} ${b.x} ${b.y}`;
  });

  const routeD = segments.map((d, i) => (i === 0 ? d : d.replace(/^M[^Q]+/, ""))).join(" ");

  const passes = PASSES.flatMap((p) => {
    const i = stops.findIndex((s, k) => s.name === p.from && stops[k + 1]?.name === p.to);
    return i === -1 ? [] : [{ name: p.name, ...pointOnSegment(i, p.t) }];
  });

  return { segments, routeD, passes };
}

// Deterministic contour rings around a few massifs for a topographic feel.
function contourRings(cx: number, cy: number, r: number, seed: number, rings: number) {
  const paths: string[] = [];
  for (let k = 0; k < rings; k++) {
    const rk = r * (1 - k / (rings + 0.6));
    const pts: Pt[] = [];
    for (let s = 0; s < 36; s++) {
      const th = (s / 36) * Math.PI * 2;
      const wobble = 1 + 0.16 * Math.sin(3 * th + seed) + 0.09 * Math.sin(5 * th + seed * 2.3 + k);
      pts.push({ x: cx + Math.cos(th) * rk * 1.5 * wobble, y: cy + Math.sin(th) * rk * wobble });
    }
    const mid = (p: Pt, q: Pt) => `${((p.x + q.x) / 2).toFixed(1)} ${((p.y + q.y) / 2).toFixed(1)}`;
    let d = `M${mid(pts[35], pts[0])}`;
    pts.forEach((p, i) => {
      d += ` Q${p.x.toFixed(1)} ${p.y.toFixed(1)} ${mid(p, pts[(i + 1) % 36])}`;
    });
    paths.push(d + "Z");
  }
  return paths;
}

const CONTOURS = [
  contourRings(260, 40, 70, 1, 5),
  contourRings(640, 30, 80, 2.4, 6),
  contourRings(900, 90, 60, 4.1, 4),
  contourRings(430, 230, 42, 0.7, 4),
  contourRings(210, 470, 80, 3.3, 6),
  contourRings(430, 520, 55, 5.2, 4),
  contourRings(790, 400, 50, 1.9, 4),
].flat();

const STARS = [
  [835, 450, 1.4], [905, 438, 1], [940, 470, 1.6], [860, 560, 1.1], [955, 540, 1.3],
  [915, 585, 0.9], [820, 520, 1], [970, 425, 1.2],
] as const;

const AUTOPLAY_MS = 4800;

function labelProps(side: LabelSide) {
  switch (side) {
    case "top": return { x: 0, y: -26, textAnchor: "middle" as const };
    case "bottom": return { x: 0, y: 38, textAnchor: "middle" as const };
    case "left": return { x: -24, y: 6, textAnchor: "end" as const };
    case "right": return { x: 24, y: 6, textAnchor: "start" as const };
  }
}

export default function AnimatedRouteMap({ stops, kicker, title, intro }: { stops: MapStop[]; kicker?: string; title?: string; intro?: string }) {
  const { segments, routeD, passes } = useMemo(() => routeGeometry(stops), [stops]);
  const sectionRef = useRef<HTMLElement>(null);
  const baseRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const travelerRef = useRef<SVGGElement>(null);
  const segmentRefs = useRef<(SVGPathElement | null)[]>([]);
  const stopLengths = useRef<number[]>([]);
  const travel = useRef({ len: 0 });
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const railRef = useRef<HTMLDivElement>(null);

  const [revealed, setRevealed] = useState(false);
  const [ready, setReady] = useState(false);
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const [autoplay, setAutoplay] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const stop = stops[active] ?? stops[0];

  const placeTraveler = useCallback((len: number) => {
    const progress = progressRef.current;
    const traveler = travelerRef.current;
    if (!progress || !traveler) return;
    const total = progress.getTotalLength();
    const p = progress.getPointAtLength(len);
    traveler.setAttribute("transform", `translate(${p.x} ${p.y})`);
    progress.style.strokeDashoffset = String(total - len);
  }, []);

  // Measure the road and prepare the draw-on animation.
  useEffect(() => {
    const base = baseRef.current;
    const progress = progressRef.current;
    if (!base || !progress) return;

    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);

    let acc = 0;
    stopLengths.current = [0];
    segmentRefs.current.forEach((seg) => {
      acc += seg?.getTotalLength() ?? 0;
      stopLengths.current.push(acc);
    });

    const total = progress.getTotalLength();
    base.style.strokeDasharray = `${total}`;
    base.style.strokeDashoffset = `${total}`;
    progress.style.strokeDasharray = `${total}`;
    placeTraveler(0);
  }, [placeTraveler, routeD]);

  // Reveal once the map scrolls into view.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!revealed || !baseRef.current) return;
    const tween = gsap.to(baseRef.current, {
      strokeDashoffset: 0,
      duration: reducedMotion ? 0 : 2.4,
      ease: "power2.inOut",
      onComplete: () => setReady(true),
    });
    return () => {
      tween.kill();
    };
  }, [revealed, reducedMotion]);

  // Drive the traveller along the road to the active stop.
  useEffect(() => {
    if (!ready) return;
    const target = stopLengths.current[active] ?? 0;
    const distance = Math.abs(target - travel.current.len);
    tweenRef.current?.kill();
    tweenRef.current = gsap.to(travel.current, {
      len: target,
      duration: reducedMotion ? 0 : Math.min(2.2, Math.max(0.7, distance / 380)),
      ease: "power2.inOut",
      onUpdate: () => placeTraveler(travel.current.len),
    });
  }, [active, ready, reducedMotion, placeTraveler]);

  // Keep the active chip visible when the rail scrolls horizontally (mobile).
  useEffect(() => {
    const rail = railRef.current;
    const chip = rail?.children[active] as HTMLElement | undefined;
    if (!rail || !chip || rail.scrollWidth <= rail.clientWidth) return;
    rail.scrollTo({ left: chip.offsetLeft - (rail.clientWidth - chip.offsetWidth) / 2, behavior: "smooth" });
  }, [active]);

  useEffect(() => () => {
    tweenRef.current?.kill();
  }, []);

  // Guided tour until the visitor takes over.
  useEffect(() => {
    if (!ready || !autoplay || reducedMotion) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % stops.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [ready, autoplay, reducedMotion, active, stops.length]);

  const select = (i: number) => {
    setAutoplay(false);
    setActive((i + stops.length) % stops.length);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      select(active + 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      select(active - 1);
    }
  };

  const tourProgress = ((active + 1) / stops.length) * 100;

  return (
    <section ref={sectionRef} className="lmap-section" aria-labelledby="lmap-title">
      <motion.div
        className="section-heading centered lmap-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {kicker && <span className="kicker">{kicker}</span>}
        <h2 id="lmap-title">{title}</h2>
        {intro && <p>{intro}</p>}
      </motion.div>

      <div className={`lmap-shell${revealed ? " is-revealed" : ""}`} onKeyDown={onKeyDown}>
        <div className="lmap-canvas">
          <svg className="lmap-svg" viewBox="0 0 1000 600" role="group" aria-label="Illustrated map of major tourist stops in Ladakh">
            <defs>
              <radialGradient id="lmap-bg" cx="45%" cy="40%" r="80%">
                <stop offset="0%" stopColor="#24473a" />
                <stop offset="100%" stopColor="#11251c" />
              </radialGradient>
              <linearGradient id="lmap-lake" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7cc6d6" />
                <stop offset="100%" stopColor="#2c7a9c" />
              </linearGradient>
              <filter id="lmap-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <rect width="1000" height="600" fill="url(#lmap-bg)" />

            <g className="lmap-contours">
              {CONTOURS.map((d, i) => <path key={i} d={d} />)}
            </g>

            <g className="lmap-ranges" aria-hidden="true">
              <text x="620" y="42">KARAKORAM RANGE</text>
              <text x="655" y="318" transform="rotate(-10 655 318)">LADAKH RANGE</text>
              <text x="250" y="470" transform="rotate(-18 250 470)">ZANSKAR RANGE</text>
              <text x="820" y="368">CHANGTHANG PLATEAU</text>
            </g>

            <g className="lmap-rivers" aria-hidden="true">
              <path d="M1010 440 C930 450, 860 420, 780 410 S620 385, 545 355 S430 345, 380 300 S330 230, 345 170 S260 95, 160 45 S70 0, 20 -20" />
              <path d="M40 360 C70 300, 85 240, 95 190 S140 100, 175 60" />
              <path d="M720 270 C700 200, 660 160, 600 152 S480 128, 410 95 S300 40, 240 -10" />
              <text x="585" y="376" transform="rotate(12 585 376)">Indus</text>
              <text x="628" y="148" transform="rotate(8 628 148)">Shyok</text>
            </g>

            <g aria-hidden="true">
              <path className="lmap-lake" d="M752 272 C770 255, 800 262, 830 248 S880 222, 920 212 S980 186, 1010 178 L1010 198 C980 207, 940 224, 900 238 S840 264, 810 274 S765 292, 752 272 Z" />
              <ellipse className="lmap-lake" cx="655" cy="498" rx="15" ry="38" transform="rotate(-12 655 498)" />
              <g className="lmap-dunes">
                <path d="M548 168 q10 -8 20 0 t20 0" />
                <path d="M560 180 q10 -8 20 0 t20 0" />
                <path d="M538 190 q8 -6 16 0 t16 0" />
              </g>
              <g className="lmap-stars">
                {STARS.map(([x, y, r], i) => (
                  <circle key={i} cx={x} cy={y} r={r} style={{ animationDelay: `${i * 0.45}s` }} />
                ))}
              </g>
            </g>

            {segments.map((d, i) => (
              <path key={i} ref={(el) => { segmentRefs.current[i] = el; }} d={d} fill="none" stroke="none" />
            ))}

            <path ref={baseRef} className="lmap-road" d={routeD} />
            <path ref={progressRef} className="lmap-road-progress" d={routeD} filter="url(#lmap-glow)" />

            <g className="lmap-passes" aria-hidden="true">
              {passes.map((p) => (
                <g key={p.name} transform={`translate(${p.x.toFixed(1)} ${p.y.toFixed(1)})`}>
                  <path d="M-6 4 L0 -6 L6 4 Z" />
                  <text x="9" y="-6">{p.name}</text>
                </g>
              ))}
            </g>

            {stops.map((s, i) => {
              const lp = labelProps(s.label);
              const isActive = i === active;
              const visited = ready && i <= active;
              return (
                <g
                  key={s.name}
                  transform={`translate(${s.x} ${s.y})`}
                  className={`lmap-stop${isActive ? " is-active" : ""}${visited ? " is-visited" : ""}${hovered === i ? " is-hovered" : ""}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${i + 1}. ${s.name}, ${s.altitude}`}
                  aria-pressed={isActive}
                  onClick={() => select(i)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      select(i);
                    }
                  }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(i)}
                  onBlur={() => setHovered(null)}
                >
                  <g className="lmap-stop-inner" style={{ transitionDelay: revealed && !ready ? `${0.4 + i * 0.2}s` : "0s" }}>
                    <g className="lmap-marker">
                      <circle className="lmap-hit" r="30" />
                      {isActive && <circle className="lmap-pulse" r="14" />}
                      <circle className="lmap-dot" r="14" />
                      <text className="lmap-num" y="5">{i + 1}</text>
                    </g>
                    <text className="lmap-label" x={lp.x} y={lp.y} textAnchor={lp.textAnchor}>{s.name}</text>
                  </g>
                </g>
              );
            })}

            <g ref={travelerRef} className={`lmap-traveler${ready ? " is-ready" : ""}`} aria-hidden="true">
              <g className="lmap-traveler-body">
                <circle r="22" className="lmap-traveler-halo" />
                <circle r="7" className="lmap-traveler-core" />
              </g>
            </g>

            <g className="lmap-compass" transform="translate(950 540)" aria-hidden="true">
              <circle r="24" />
              <path d="M0 -20 L6 0 L0 20 L-6 0 Z" />
              <path d="M0 -20 L6 0 L-6 0 Z" className="north" />
              <text y="-30">N</text>
            </g>
            <text className="lmap-note" x="24" y="584">Illustrative map · not to scale</text>
          </svg>

          <button
            type="button"
            className="lmap-play"
            onClick={() => setAutoplay((v) => !v)}
            aria-label={autoplay ? "Pause guided tour" : "Play guided tour"}
          >
            {autoplay ? (
              <svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="2" width="3.5" height="12" rx="1" /><rect x="9.5" y="2" width="3.5" height="12" rx="1" /></svg>
            ) : (
              <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9.5-5.5z" /></svg>
            )}
            <span>{autoplay ? "Touring" : "Tour"}</span>
          </button>
        </div>

        <aside className="lmap-panel" aria-live="polite">
          <div className="lmap-panel-top">
            <span className="lmap-count">
              {String(active + 1).padStart(2, "0")}
              <small> / {String(stops.length).padStart(2, "0")}</small>
            </span>
            <span className="lmap-tag">{stop.tag}</span>
          </div>
          <div className="lmap-bar"><span style={{ width: `${tourProgress}%` }} /></div>

          <AnimatePresence mode="wait">
            <motion.div
              key={stop.name}
              className="lmap-panel-body"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <h3>{stop.name}</h3>
              <p className="lmap-alt">
                <svg viewBox="0 0 20 14" aria-hidden="true"><path d="M0 14 L7 3 L10 7 L13 1 L20 14 Z" /></svg>
                {stop.altitude}
              </p>
              <p className="lmap-tagline">{stop.tagline}</p>
              <p className="lmap-desc">{stop.desc}</p>
              <ul className="lmap-highlights">
                {stop.highlights.map((h) => <li key={h}>{h}</li>)}
              </ul>
            </motion.div>
          </AnimatePresence>

          <div className="lmap-controls">
            <button type="button" onClick={() => select(active - 1)} aria-label="Previous stop">←</button>
            <button type="button" onClick={() => select(active + 1)} aria-label="Next stop">→</button>
            <Link href="/plan-your-trip" className="lmap-cta">Plan this route</Link>
          </div>
        </aside>
      </div>

      <div ref={railRef} className="lmap-rail" role="tablist" aria-label="Ladakh stops">
        {stops.map((s, i) => (
          <button
            key={s.name}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`lmap-chip${i === active ? " is-active" : ""}${ready && i < active ? " is-visited" : ""}`}
            onClick={() => select(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <span>{i + 1}</span>
            {s.name}
          </button>
        ))}
      </div>
    </section>
  );
}
