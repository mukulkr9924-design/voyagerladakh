"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AnimatedRouteMap() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const waypointsRef = useRef<SVGCircleElement[]>([]);

  useEffect(() => {
    const path = pathRef.current;
    const waypoints = waypointsRef.current;
    if (!path || !svgRef.current) return;

    const pathLength = path.getTotalLength();
    
    // Set initial state
    gsap.set(path, { strokeDasharray: pathLength, strokeDashoffset: pathLength });
    gsap.set(waypoints, { scale: 0, transformOrigin: "center" });

    // Animate path drawing
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: svgRef.current,
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
        onEnter: () => tl.play(),
        onLeaveBack: () => tl.reverse(),
      }
    });

    tl.to(path, {
      strokeDashoffset: 0,
      duration: 2,
      ease: "power2.inOut"
    })
    .to(waypoints, {
      scale: 1,
      stagger: 0.15,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, "-=1.5");

    // Pulse animation for waypoints
    waypoints.forEach((wp, i) => {
      gsap.to(wp, {
        scale: 1.3,
        opacity: 0.5,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: i * 0.3
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
      gsap.killTweensOf([path, ...waypoints]);
    };
  }, []);

  return (
    <section className="route-map-section">
      <div className="section-heading centered">
        <span className="kicker">Route map</span>
        <h2>Ladakh by trail</h2>
      </div>
      <div className="route-map-wrap">
        <svg ref={svgRef} className="route-map" viewBox="0 0 800 420" fill="none">
          <path className="route-shadow" d="M100 250 C160 180, 180 210, 230 170 S270 190, 300 140 S340 180, 390 160 S430 170, 470 150 S530 110, 570 130 S620 170, 650 160" />
          <path 
            ref={pathRef}
            className="route-line" 
            d="M100 250 C160 180, 180 210, 230 170 S270 190, 300 140 S340 180, 390 160 S430 170, 470 150 S530 110, 570 130 S620 170, 650 160" 
          />
          <circle ref={(el) => { if (el) waypointsRef.current.push(el); }} className="waypoint" cx="100" cy="250" r="6" />
          <circle ref={(el) => { if (el) waypointsRef.current.push(el); }} className="waypoint" cx="230" cy="170" r="6" />
          <circle ref={(el) => { if (el) waypointsRef.current.push(el); }} className="waypoint" cx="390" cy="160" r="6" />
          <circle ref={(el) => { if (el) waypointsRef.current.push(el); }} className="waypoint" cx="570" cy="130" r="6" />
          <circle ref={(el) => { if (el) waypointsRef.current.push(el); }} className="waypoint" cx="650" cy="160" r="6" />
        </svg>
      </div>
    </section>
  );
}
