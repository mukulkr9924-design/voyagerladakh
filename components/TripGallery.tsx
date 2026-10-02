"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { ChevronIcon, CrossIcon, ExpandIcon } from "@/components/Icons";
import { format, LANGUAGES } from "@/lib/i18n";
import type { Photo } from "@/lib/trips";

/** Tiles shown in the mosaic; the rest are reached through the viewer. */
const MAX_TILES = 5;
const SWIPE_PX = 50;

export default function TripGallery({ photos, tripTitle }: { photos: Photo[]; tripTitle: string }) {
  const { locale, t } = useI18n();
  // In right-to-left languages the next photo sits to the left.
  const forward = LANGUAGES[locale].dir === "rtl" ? -1 : 1;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const swipeStart = useRef<number | null>(null);
  const [index, setIndex] = useState<number | null>(null);

  const count = photos.length;
  const tiles = photos.slice(0, MAX_TILES);
  const hidden = count - tiles.length;

  const open = (i: number) => {
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();
  const step = useCallback((dir: number) => setIndex((i) => (i === null ? i : (i + dir + count) % count)), [count]);

  // Keep the active thumbnail in view as the viewer moves.
  useEffect(() => {
    if (index === null) return;
    thumbsRef.current?.children[index]?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [index]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") step(forward);
    else if (e.key === "ArrowLeft") step(-forward);
  };

  const current = index === null ? null : photos[index];

  return (
    <>
      <div className={`gallery-grid gallery-n${Math.min(count, MAX_TILES)}`}>
        {tiles.map((p, i) => (
          <button key={p.url} type="button" className="gallery-tile" onClick={() => open(i)} aria-label={format(t.gallery.open, { n: i + 1, total: count, title: p.title ?? p.alt })}>
            <Image
              src={p.url}
              alt={p.alt}
              fill
              style={p.position ? { objectPosition: p.position } : undefined}
              sizes={i === 0 ? "(max-width: 900px) 100vw, 560px" : "(max-width: 640px) 50vw, (max-width: 900px) 33vw, 280px"}
            />
            {p.tag && <span className="gallery-tag">{p.tag}</span>}
            {p.title && <span className="gallery-tile-title">{p.title}</span>}
            {hidden > 0 && i === tiles.length - 1 ? (
              <span className="gallery-more">{format(t.gallery.more, { n: hidden })}</span>
            ) : (
              <span className="gallery-zoom" aria-hidden="true"><ExpandIcon /></span>
            )}
          </button>
        ))}
      </div>
      {count > 1 && (
        <button type="button" className="gallery-all" onClick={() => open(0)}>
          {format(t.gallery.viewAll, { n: count })} <ExpandIcon />
        </button>
      )}

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={format(t.gallery.dialog, { title: tripTitle })}
        onClose={() => setIndex(null)}
        onKeyDown={onKeyDown}
        onClick={(e) => e.target === e.currentTarget && close()}
      >
        {current && index !== null && (
          <div className="lightbox-inner">
            <div className="lightbox-bar">
              <span className="lightbox-count" aria-live="polite">{index + 1} / {count}</span>
              <button type="button" className="lightbox-btn" onClick={close} aria-label={t.gallery.close} autoFocus>
                <CrossIcon />
              </button>
            </div>

            <div
              className="lightbox-stage"
              onPointerDown={(e) => (swipeStart.current = e.clientX)}
              onPointerUp={(e) => {
                if (swipeStart.current === null) return;
                const dx = e.clientX - swipeStart.current;
                swipeStart.current = null;
                if (Math.abs(dx) > SWIPE_PX) step(dx < 0 ? forward : -forward);
              }}
            >
              <Image key={current.url} src={current.url} alt={current.alt} fill sizes="(max-width: 900px) 100vw, 75vw" className="lightbox-image" draggable={false} />
              {count > 1 && (
                <>
                  <button type="button" className="lightbox-btn lightbox-prev" onClick={() => step(-1)} aria-label={t.gallery.previous}>
                    <ChevronIcon />
                  </button>
                  <button type="button" className="lightbox-btn lightbox-next" onClick={() => step(1)} aria-label={t.gallery.next}>
                    <ChevronIcon />
                  </button>
                </>
              )}
            </div>

            <div className="lightbox-info">
              {current.tag && <span className="lightbox-tag">{current.tag}</span>}
              {current.title && <h3>{current.title}</h3>}
              {current.caption && <p>{current.caption}</p>}
            </div>

            {count > 1 && (
              <div className="lightbox-thumbs" ref={thumbsRef}>
                {photos.map((p, i) => (
                  <button
                    key={p.url}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={format(t.gallery.show, { n: i + 1 })}
                    aria-current={i === index ? "true" : undefined}
                  >
                    <Image src={p.url} alt="" fill sizes="96px" style={p.position ? { objectPosition: p.position } : undefined} />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
