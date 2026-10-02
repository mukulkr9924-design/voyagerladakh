"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { format, LANGUAGES, plural } from "@/lib/i18n";
import type { DayPlan, Waypoint } from "@/lib/trips";

const HEIGHT = 300;
const PAD = { top: 44, right: 16, bottom: 36, left: 52 };

type Day = { label: string; title: string; from: number; to: number; plan: DayPlan };

function altitudeAt(points: Waypoint[], km: number) {
  const i = points.findIndex((p) => p.km >= km);
  if (i <= 0) return points[Math.max(i, 0)].altitude;
  const a = points[i - 1];
  const b = points[i];
  return a.altitude + ((km - a.km) / (b.km - a.km)) * (b.altitude - a.altitude);
}

function niceTicks(min: number, max: number, maxCount: number, steps: number[]) {
  const step = steps.find((s) => (max - min) / s <= maxCount) ?? steps[steps.length - 1];
  const ticks = [];
  for (let v = Math.ceil(min / step) * step; v <= max; v += step) ticks.push(v);
  return ticks;
}

function Marker({ kind, x, y }: { kind: Waypoint["kind"]; x: number; y: number }) {
  if (kind === "pass") return <path d={`M${x},${y - 7}L${x + 6},${y + 4}L${x - 6},${y + 4}Z`} className="elev-mk-pass" />;
  if (kind === "camp") return <rect x={x - 4} y={y - 4} width={8} height={8} rx={1.5} className="elev-mk-camp" />;
  return <circle cx={x} cy={y} r={4.5} className="elev-mk-village" />;
}

export default function ElevationProfile({ points, days }: { points: Waypoint[]; days: DayPlan[] }) {
  const { locale, t } = useI18n();
  const fmt = (n: number) => n.toLocaleString(LANGUAGES[locale].tag);
  const kindLabel = t.elevation.kinds;
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(720);
  const [hoverKm, setHoverKm] = useState<number | null>(null);
  const [activeDay, setActiveDay] = useState<number | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const totalKm = points[points.length - 1].km;

  // Only walking days are drawn; drive-only days (no distance) are left off the chart.
  const walkDays = useMemo(() => days.filter((d) => d.distanceKm), [days]);
  const dayRanges = useMemo<Day[]>(
    () =>
      walkDays.map((d, i) => {
        const from = walkDays.slice(0, i).reduce((s, p) => s + (p.distanceKm ?? 0), 0);
        // The last day always runs to the end of the trail, absorbing rounding.
        const to = i === walkDays.length - 1 ? totalKm : Math.min(from + (d.distanceKm ?? 0), totalKm);
        // "Day 01" → "Day 1", whatever the word for "day".
        return { label: d.day.replace(/^(\D*?)0+(?=\d)/, "$1"), title: d.title, from, to, plan: d };
      }),
    [walkDays, totalKm]
  );

  const altitudes = points.map((p) => p.altitude);
  const highest = points.reduce((a, b) => (b.altitude > a.altitude ? b : a));
  const lowest = Math.min(...altitudes);
  // Headroom above the high point keeps its label clear of the day labels.
  const range = highest.altitude - lowest;
  const yMin = Math.floor((lowest - Math.max(150, range * 0.12)) / 100) * 100;
  const yMax = Math.ceil((highest.altitude + Math.max(80, range * 0.18)) / 100) * 100;

  const plotW = Math.max(width - PAD.left - PAD.right, 10);
  const plotH = HEIGHT - PAD.top - PAD.bottom;
  const x = (km: number) => PAD.left + (km / totalKm) * plotW;
  const y = (alt: number) => PAD.top + (1 - (alt - yMin) / (yMax - yMin)) * plotH;

  const line = points.map((p, i) => `${i ? "L" : "M"}${x(p.km).toFixed(1)},${y(p.altitude).toFixed(1)}`).join("");
  const area = `${line}L${x(totalKm).toFixed(1)},${y(yMin)}L${x(0)},${y(yMin)}Z`;

  const compact = width < 560;
  const yTicks = niceTicks(yMin, yMax, 7, [100, 200, 250, 500, 1000]);
  const xTicks = niceTicks(0, totalKm, compact ? 4 : 8, [5, 10, 20, 25, 50, 100]);

  // Pass labels, highest first, skipping any that would collide with one already placed.
  const labelled = useMemo(() => {
    const placed: { from: number; to: number }[] = [];
    const out = new Map<Waypoint, "start" | "middle" | "end">();
    const passes = points.filter((p) => p.kind === "pass").sort((a, b) => b.altitude - a.altitude);
    for (const p of passes) {
      if (compact && p !== passes[0]) break;
      const w = (p.name.length + 9) * 6.6;
      const px = PAD.left + (p.km / totalKm) * plotW;
      const anchor = px - w / 2 < PAD.left ? "start" : px + w / 2 > PAD.left + plotW ? "end" : "middle";
      const from = anchor === "start" ? px - 6 : anchor === "end" ? px - w + 6 : px - w / 2;
      if (placed.some((r) => from < r.to + 8 && from + w > r.from - 8)) continue;
      placed.push({ from, to: from + w });
      out.set(p, anchor);
    }
    return out;
  }, [points, compact, totalKm, plotW]);

  const kinds = (["pass", "village", "camp"] as const).filter((k) => points.some((p) => p.kind === k));

  // Snap to a named waypoint when the pointer is within ~14px of one.
  const snapKm = (14 / plotW) * totalKm;
  const nearest = hoverKm === null ? null : points.reduce((a, b) => (Math.abs(b.km - hoverKm) < Math.abs(a.km - hoverKm) ? b : a));
  const snapped = nearest && hoverKm !== null && Math.abs(nearest.km - hoverKm) <= snapKm ? nearest : null;
  const cursorKm = snapped ? snapped.km : hoverKm;
  const cursorAlt = cursorKm === null ? null : snapped ? snapped.altitude : altitudeAt(points, cursorKm);
  const cursorDay = cursorKm === null ? null : dayRanges.findIndex((d) => cursorKm <= d.to + 1e-6);

  const summary =
    activeDay === null
      ? {
          distance: `${fmt(Math.round(dayRanges.reduce((s, d) => s + (d.plan.distanceKm ?? 0), 0)))} km`,
          gain: days.reduce((s, d) => s + (d.gainM ?? 0), 0),
          loss: days.reduce((s, d) => s + (d.lossM ?? 0), 0),
          time: plural(locale, walkDays.length, t.elevation.days),
          high: highest,
        }
      : (() => {
          const d = dayRanges[activeDay];
          const inDay = points.filter((p) => p.km >= d.from - 1e-6 && p.km <= d.to + 1e-6);
          return {
            distance: `${d.plan.distanceKm} km`,
            gain: d.plan.gainM ?? 0,
            loss: d.plan.lossM ?? 0,
            time: d.plan.hours ?? "",
            high: inDay.reduce((a, b) => (b.altitude > a.altitude ? b : a)),
          };
        })();

  function kmFromPointer(clientX: number, target: SVGSVGElement) {
    const rect = target.getBoundingClientRect();
    const km = ((clientX - rect.left - PAD.left) / plotW) * totalKm;
    return Math.min(Math.max(km, 0), totalKm);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Escape") return;
    e.preventDefault();
    if (e.key === "Escape") return setHoverKm(null);
    const idx = snapped ? points.indexOf(snapped) : -1;
    const next = e.key === "ArrowRight" ? Math.min(idx + 1, points.length - 1) : Math.max(idx - 1, 0);
    setHoverKm(points[idx === -1 ? 0 : next].km);
  }

  const tipX = cursorKm === null ? 0 : x(cursorKm);
  const tipLeft = Math.min(Math.max(tipX, 90), width - 90);

  return (
    <div className="elev">
      <div className="elev-tabs" role="group" aria-label={t.elevation.showFor}>
        <button type="button" aria-pressed={activeDay === null} onClick={() => setActiveDay(null)}>
          {t.elevation.fullTrek}
        </button>
        {dayRanges.map((d, i) => (
          <button key={d.label} type="button" aria-pressed={activeDay === i} onClick={() => setActiveDay(i)}>
            {d.label}
          </button>
        ))}
      </div>

      <dl className="elev-stats">
        <div><dt>{t.elevation.distance}</dt><dd><span dir="ltr">{summary.distance}</span></dd></div>
        <div><dt>{activeDay === null ? t.elevation.trekkingDays : t.elevation.walkingTime}</dt><dd>{summary.time}</dd></div>
        <div><dt>{t.elevation.ascentDescent}</dt><dd><span dir="ltr">+{fmt(summary.gain)} m</span> <span dir="ltr">/ −{fmt(summary.loss)} m</span></dd></div>
        <div><dt>{t.elevation.highPoint}</dt><dd><span dir="ltr">{fmt(summary.high.altitude)} m</span> <small>{summary.high.name}</small></dd></div>
      </dl>

      {/* A chart: distance runs left to right in every language. */}
      <div className="elev-plot" ref={wrapRef} dir="ltr">
        <svg
          viewBox={`0 0 ${width} ${HEIGHT}`}
          role="img"
          aria-label={format(t.elevation.chart, {
            km: fmt(Math.round(totalKm)),
            from: points[0].name,
            to: points[points.length - 1].name,
            high: highest.name,
            altitude: fmt(highest.altitude),
          })}
          tabIndex={0}
          onPointerMove={(e) => setHoverKm(kmFromPointer(e.clientX, e.currentTarget))}
          onPointerDown={(e) => setHoverKm(kmFromPointer(e.clientX, e.currentTarget))}
          onPointerLeave={(e) => e.pointerType === "mouse" && setHoverKm(null)}
          onKeyDown={onKeyDown}
          onBlur={() => setHoverKm(null)}
        >
          <defs>
            <linearGradient id="elev-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="var(--sage)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--sage)" stopOpacity="0.08" />
            </linearGradient>
            <clipPath id="elev-day-clip">
              {activeDay !== null && (
                <rect x={x(dayRanges[activeDay].from)} y={0} width={x(dayRanges[activeDay].to) - x(dayRanges[activeDay].from)} height={HEIGHT} />
              )}
            </clipPath>
          </defs>

          {/* Day bands */}
          {dayRanges.map((d, i) => (
            <g key={d.label}>
              <rect
                x={x(d.from)}
                y={PAD.top - 28}
                width={x(d.to) - x(d.from)}
                height={plotH + 28}
                className={`elev-band${i % 2 ? " odd" : ""}${activeDay === i ? " active" : ""}`}
                onClick={() => setActiveDay(activeDay === i ? null : i)}
              />
              {x(d.to) - x(d.from) >= 16 && (
                <text x={(x(d.from) + x(d.to)) / 2} y={PAD.top - 12} textAnchor="middle" className="elev-daylabel">
                  {x(d.to) - x(d.from) >= 60 ? d.label : d.label.replace(/^\D+/, "")}
                </text>
              )}
              {i > 0 && <line x1={x(d.from)} x2={x(d.from)} y1={PAD.top - 28} y2={PAD.top + plotH} className="elev-divider" />}
            </g>
          ))}

          {/* Grid + axes */}
          {yTicks.map((t) => (
            <g key={t}>
              <line x1={PAD.left} x2={PAD.left + plotW} y1={y(t)} y2={y(t)} className="elev-grid" />
              <text x={PAD.left - 8} y={y(t)} dy="0.32em" textAnchor="end" className="elev-axis">
                {fmt(t)}
              </text>
            </g>
          ))}
          {xTicks.map((t) => (
            <text key={t} x={x(t)} y={PAD.top + plotH + 22} textAnchor="middle" className="elev-axis">
              {t} km
            </text>
          ))}
          <text x={12} y={PAD.top + plotH / 2} transform={`rotate(-90 12 ${PAD.top + plotH / 2})`} textAnchor="middle" className="elev-axis">
            {t.elevation.metres}
          </text>

          {/* Profile: dimmed everywhere when a day is selected, full strength inside it */}
          <g opacity={activeDay === null ? 1 : 0.3}>
            <path d={area} fill="url(#elev-fill)" />
            <path d={line} className="elev-line" />
          </g>
          {activeDay !== null && (
            <g clipPath="url(#elev-day-clip)">
              <path d={area} fill="url(#elev-fill)" />
              <path d={line} className="elev-line" />
            </g>
          )}

          {/* Waypoints */}
          {points.map((p) => {
            const px = x(p.km);
            const py = y(p.altitude);
            const anchor = labelled.get(p);
            return (
              <g key={p.name} className="elev-wp">
                <Marker kind={p.kind} x={px} y={py} />
                {anchor && (
                  <text x={px} y={py - 14} textAnchor={anchor} className="elev-wplabel">
                    {p.name} · {fmt(p.altitude)} m
                  </text>
                )}
              </g>
            );
          })}

          {/* Crosshair */}
          {cursorKm !== null && cursorAlt !== null && (
            <g pointerEvents="none">
              <line x1={tipX} x2={tipX} y1={PAD.top} y2={PAD.top + plotH} className="elev-cross" />
              <circle cx={tipX} cy={y(cursorAlt)} r={6} className="elev-dot" />
            </g>
          )}
        </svg>

        {cursorKm !== null && cursorAlt !== null && (
          <div className="elev-tip" style={{ left: tipLeft }} aria-live="polite">
            <strong>{snapped ? snapped.name : `${fmt(Math.round(cursorAlt))} m`}</strong>
            {snapped && <span>{fmt(snapped.altitude)} m · {kindLabel[snapped.kind].toLocaleLowerCase(LANGUAGES[locale].tag)}</span>}
            <span>
              {cursorKm.toFixed(1)} km{cursorDay !== null && cursorDay >= 0 ? ` · ${dayRanges[cursorDay].label}` : ""}
            </span>
          </div>
        )}
      </div>

      <div className="elev-legend">
        {kinds.map((k) => (
          <span key={k}>
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><Marker kind={k} x={7} y={k === "pass" ? 8 : 7} /></svg>
            {kindLabel[k]}
          </span>
        ))}
        <span className="elev-note">{t.elevation.approximate}</span>
      </div>

      <details className="elev-table">
        <summary>{t.elevation.viewTable}</summary>
        <table>
          <thead>
            <tr><th scope="col">{t.elevation.waypoint}</th><th scope="col">{t.elevation.distance}</th><th scope="col">{t.elevation.altitude}</th></tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.name}>
                <th scope="row">{p.name}{p.kind === "village" ? "" : ` (${kindLabel[p.kind].toLocaleLowerCase(LANGUAGES[locale].tag)})`}</th>
                <td><span dir="ltr">{p.km.toFixed(1)} km</span></td>
                <td><span dir="ltr">{fmt(p.altitude)} m</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
