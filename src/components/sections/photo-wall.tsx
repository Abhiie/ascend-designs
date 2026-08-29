"use client";

import { useState, useEffect } from "react";
import { Reveal } from "@/components/motion/reveal";
import { projects } from "@/data/projects";

// Collect every gallery image from every project into one flat pool
const ALL_PHOTOS: { src: string; project: string; id: string }[] = projects.flatMap((p) =>
  p.gallery.map((src, i) => ({ src, project: p.title, id: `${p.id}-${i}` }))
);

// Deterministic irregular grid rhythm
type Span = "tall" | "wide" | "square" | "big";
const SPAN_PATTERN: Span[] = [
  "big",    "square", "tall",
  "wide",   "square", "square",
  "tall",   "big",    "wide",
  "square", "tall",   "square",
];
const SPAN_CLASSES: Record<Span, string> = {
  big:    "col-span-2 row-span-2",
  wide:   "col-span-2 row-span-1",
  tall:   "col-span-1 row-span-2",
  square: "col-span-1 row-span-1",
};

// ─── Lightbox ─────────────────────────────────────────────────────────────────
interface LightboxProps {
  photos: typeof ALL_PHOTOS;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}
function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const photo = photos[index];

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose, onPrev, onNext]);

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#0c0b09]/96 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90svh] max-w-[92vw] w-full"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "lbIn 0.3s cubic-bezier(0.16,1,0.3,1) forwards" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.project}
          className="mx-auto block max-h-[82svh] w-auto max-w-full object-contain"
          loading="eager"
        />
        <div className="mt-4 flex items-center justify-between px-2">
          <p className="label text-ink-soft">{photo.project}</p>
          <p className="label text-ink-faint">{index + 1} / {photos.length}</p>
        </div>
      </div>

      <button type="button" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous"
        className="absolute left-4 top-1/2 -translate-y-1/2 label border border-line px-4 py-3 text-ink-soft transition-colors hover:border-gold/50 hover:text-gold">
        ←
      </button>
      <button type="button" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next"
        className="absolute right-4 top-1/2 -translate-y-1/2 label border border-line px-4 py-3 text-ink-soft transition-colors hover:border-gold/50 hover:text-gold">
        →
      </button>
      <button type="button" onClick={onClose} aria-label="Close"
        className="absolute right-5 top-5 label text-ink-soft transition-colors hover:text-gold">
        ✕
      </button>

      <style>{`
        @keyframes lbIn {
          from { opacity: 0; transform: scale(0.96); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

// ─── Photo Wall ───────────────────────────────────────────────────────────────
export function PhotoWall() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayPhotos = showAll ? ALL_PHOTOS : ALL_PHOTOS.slice(0, 24);

  function openLightbox(globalIndex: number) {
    setLightboxIndex(globalIndex);
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }
  function goPrev() {
    setLightboxIndex((i) => i === null ? null : (i - 1 + ALL_PHOTOS.length) % ALL_PHOTOS.length);
  }
  function goNext() {
    setLightboxIndex((i) => i === null ? null : (i + 1) % ALL_PHOTOS.length);
  }

  return (
    <>
      <section id="work" className="px-4 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
        <div className="mx-auto max-w-[1600px]">
          {/* Header */}
          <Reveal>
            <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-px w-10 bg-gold/50" />
                  <p className="label text-gold/70">Our Work</p>
                </div>
                <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.04] text-ink">
                  {ALL_PHOTOS.length}+ images across{" "}
                  <span className="italic text-gold">{projects.length} projects</span>
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-ink-soft">
                Every image below is a real space designed and delivered by
                Ascend Designs. Click any photo to explore.
              </p>
            </div>
          </Reveal>

          {/* Masonry grid */}
          <div
            className="grid gap-2 sm:gap-3"
            style={{
              gridTemplateColumns: "repeat(4, 1fr)",
              gridAutoRows: "clamp(160px, 18vw, 280px)",
            }}
          >
            {displayPhotos.map((photo, i) => {
              const span = SPAN_PATTERN[i % SPAN_PATTERN.length];
              // Global index into ALL_PHOTOS for lightbox (even after "show all")
              const globalIdx = ALL_PHOTOS.findIndex((p) => p.id === photo.id);

              return (
                <Reveal
                  key={photo.id}
                  y={20}
                  delay={(i % 4) * 0.04}
                  className={SPAN_CLASSES[span]}
                >
                  <button
                    type="button"
                    className="group relative block h-full w-full overflow-hidden"
                    onClick={() => openLightbox(globalIdx)}
                    aria-label={`View ${photo.project}`}
                  >
                    {/* WebP image — lazy loaded except first 6 */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={photo.src}
                      alt={photo.project}
                      loading={i < 6 ? "eager" : "lazy"}
                      decoding="async"
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    {/* Hover scrim + label */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-start justify-end bg-[#0c0b09]/0 p-3 sm:p-5 transition-[background-color] duration-500 group-hover:bg-[#0c0b09]/55">
                      <span className="label translate-y-3 text-[0.5rem] text-gold opacity-0 transition-[opacity,transform] duration-400 group-hover:translate-y-0 group-hover:opacity-100 sm:text-[0.5625rem]">
                        {photo.project}
                      </span>
                    </div>
                  </button>
                </Reveal>
              );
            })}
          </div>

          {/* Load more */}
          {!showAll && ALL_PHOTOS.length > 24 && (
            <Reveal delay={0.1}>
              <div className="mt-14 text-center">
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="label inline-flex items-center gap-3 border border-line-strong px-8 py-4 text-ink-soft transition-colors hover:border-gold/50 hover:text-gold"
                >
                  Load All {ALL_PHOTOS.length} Images <span aria-hidden>↓</span>
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          photos={ALL_PHOTOS}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
