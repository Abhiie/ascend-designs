"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { projects } from "@/data/projects";

interface FlatPhoto {
  src: string;
  projectId: string;
  projectTitle: string;
  location: string;
  year: number;
}

const ALL_PHOTOS: FlatPhoto[] = projects.flatMap((p) =>
  p.gallery.map((src) => ({
    src,
    projectId: p.id,
    projectTitle: p.title,
    location: p.location,
    year: p.year,
  }))
);

const CLIENTS = [
  { id: "all", label: "All Clients", count: ALL_PHOTOS.length },
  ...projects.map((p) => ({ id: p.id, label: p.title, count: p.gallery.length })),
];

// ─── Lightbox ───────────────────────────────────────────────────────────────
function GridLightbox({
  photos,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  photos: FlatPhoto[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
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
      className="fixed inset-0 z-[999] flex items-center justify-center bg-[#080807]/95 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92svh] max-w-[90vw] flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "gridLbFade 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={photo.src}
          src={photo.src}
          alt={photo.projectTitle}
          className="max-h-[80svh] w-auto max-w-full object-contain"
          loading="eager"
        />
        <div className="mt-5 flex items-end justify-between gap-8">
          <div>
            <p className="font-display text-xl font-light text-white/90">{photo.projectTitle}</p>
            <p className="label mt-1 text-gold/70">
              {photo.location} · {photo.year}
            </p>
          </div>
          <p className="label shrink-0 text-white/30">
            {index + 1} / {photos.length}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label="Prev"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-white/15 text-white/50 transition-all hover:border-gold/50 hover:text-gold sm:left-8"
      >
        ←
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-white/15 text-white/50 transition-all hover:border-gold/50 hover:text-gold sm:right-8"
      >
        →
      </button>
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="label absolute right-5 top-5 text-white/40 transition-colors hover:text-gold"
      >
        ✕
      </button>

      <style>{`
        @keyframes gridLbFade {
          from { opacity:0; transform:scale(0.94) translateY(16px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Single grid tile ───────────────────────────────────────────────────────
function GridTile({
  photo,
  index,
  onClick,
}: {
  photo: FlatPhoto;
  index: number;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el, { opacity: 1, scale: 1 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.85 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: (index % 12) * 0.035,
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        }
      );
    }, el);
    return () => ctx.revert();
  }, [index]);

  return (
    <button
      ref={ref}
      type="button"
      data-cursor="view"
      data-cursor-label="View"
      onClick={onClick}
      className="group relative block aspect-square w-full overflow-hidden bg-surface-strong"
      style={{ opacity: 0 }}
      aria-label={`View photo from ${photo.projectTitle}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt={photo.projectTitle}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-[#0c0b09]/0 opacity-0 transition-all duration-300 group-hover:bg-[#0c0b09]/55 group-hover:opacity-100">
        <span aria-hidden className="text-lg text-white">
          ♡
        </span>
        <span className="label px-3 text-center text-[0.5rem] text-white/85 line-clamp-1">
          {photo.projectTitle}
        </span>
      </div>
    </button>
  );
}

// ─── Photo Grid Wall ────────────────────────────────────────────────────────
export function PhotoGridWall() {
  const [activeClient, setActiveClient] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const filtered =
    activeClient === "all" ? ALL_PHOTOS : ALL_PHOTOS.filter((p) => p.projectId === activeClient);

  function moveIndicator(btn: HTMLButtonElement) {
    const bar = filterBarRef.current;
    const ind = indicatorRef.current;
    if (!bar || !ind) return;
    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    ind.style.left = `${btnRect.left - barRect.left + bar.scrollLeft}px`;
    ind.style.width = `${btnRect.width}px`;
  }

  function handleFilter(id: string, e: React.MouseEvent<HTMLButtonElement>) {
    setActiveClient(id);
    setLightboxIndex(null);
    moveIndicator(e.currentTarget);
  }

  function openLightbox(idx: number) {
    setLightboxIndex(idx);
  }
  function closeLightbox() {
    setLightboxIndex(null);
  }
  function goPrev() {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }
  function goNext() {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    <>
      {/* Client filter — horizontally scrollable pill row */}
      <div className="relative mb-8 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        <div
          ref={filterBarRef}
          className="relative flex w-max gap-2 border-b border-line pb-px"
        >
          {CLIENTS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={(e) => handleFilter(c.id, e)}
              className={`label whitespace-nowrap px-4 py-3 text-[0.625rem] transition-colors sm:px-5 ${
                activeClient === c.id ? "text-gold" : "text-ink-faint hover:text-ink-soft"
              }`}
            >
              {c.label}
              <span className="ml-1.5 text-[0.5rem] opacity-50">({c.count})</span>
            </button>
          ))}
          <span
            ref={indicatorRef}
            className="absolute bottom-0 h-[2px] bg-gold transition-all duration-300 ease-out"
            style={{ left: 0, width: 0 }}
          />
        </div>
      </div>

      {/* Instagram-style dense square grid */}
      <div
        key={activeClient}
        className="grid grid-cols-3 gap-[3px] sm:grid-cols-4 sm:gap-1 lg:grid-cols-6"
      >
        {filtered.map((photo, i) => (
          <GridTile
            key={`${photo.src}-${activeClient}`}
            photo={photo}
            index={i}
            onClick={() => openLightbox(i)}
          />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <span className="label text-[0.5625rem] text-ink-faint">
          Showing <span className="text-gold">{filtered.length}</span> photo
          {filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {lightboxIndex !== null && (
        <GridLightbox
          photos={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
