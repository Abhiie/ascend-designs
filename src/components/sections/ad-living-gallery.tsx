"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { adLivingPieces, type AdLivingPiece } from "@/data/ad-living";

const CATEGORIES = [
  { id: "all", label: "All Pieces", count: adLivingPieces.length },
  ...Array.from(new Set(adLivingPieces.map((p) => p.category))).map((cat) => ({
    id: cat,
    label: cat,
    count: adLivingPieces.filter((p) => p.category === cat).length,
  })),
];

// ─── Lightbox ───────────────────────────────────────────────────────────────
function Lightbox({
  pieces,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  pieces: AdLivingPiece[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const piece = pieces[index];

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
        style={{ animation: "adLbFade 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={piece.src}
          src={piece.src}
          alt={piece.title}
          className="max-h-[80svh] w-auto max-w-full object-contain"
          loading="eager"
        />
        <div className="mt-5 flex items-end justify-between gap-8">
          <div>
            <p className="font-display text-xl font-light text-white/90">{piece.title}</p>
            <p className="label mt-1 text-gold/70">{piece.category}</p>
          </div>
          <p className="label shrink-0 text-white/30">
            {index + 1} / {pieces.length}
          </p>
        </div>
      </div>

      {pieces.length > 1 && (
        <>
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
        </>
      )}
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="label absolute right-5 top-5 text-white/40 transition-colors hover:text-gold"
      >
        ✕
      </button>

      <style>{`
        @keyframes adLbFade {
          from { opacity:0; transform:scale(0.94) translateY(16px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Single grid tile ───────────────────────────────────────────────────────
function Tile({
  piece,
  index,
  onClick,
}: {
  piece: AdLivingPiece;
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
      className="group relative block aspect-[4/5] h-full w-full overflow-hidden bg-surface-strong"
      style={{ opacity: 0 }}
      aria-label={`View ${piece.title}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={piece.src}
        alt={piece.title}
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
      />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-[#0c0b09]/95 via-[#0c0b09]/75 to-transparent px-3 pb-3 pt-8 transition-transform duration-400 ease-out group-hover:translate-y-0 sm:px-4 sm:pb-4">
        <span aria-hidden className="mb-1.5 block h-[2px] w-8 bg-gold" />
        <p className="font-display text-sm leading-tight text-white line-clamp-1 sm:text-base">
          {piece.title}
        </p>
        <p className="label mt-1 text-[0.5rem] text-white/60">{piece.category}</p>
      </div>
    </button>
  );
}

// ─── AD Living Gallery ──────────────────────────────────────────────────────
export function AdLivingGallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const filtered =
    activeCategory === "all"
      ? adLivingPieces
      : adLivingPieces.filter((p) => p.category === activeCategory);

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
    setActiveCategory(id);
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
      {CATEGORIES.length > 2 && (
        <div className="relative mb-8 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
          <div ref={filterBarRef} className="relative flex w-max gap-2 border-b border-line pb-px">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={(e) => handleFilter(c.id, e)}
                className={`label whitespace-nowrap px-4 py-3 text-[0.625rem] transition-colors sm:px-5 ${
                  activeCategory === c.id ? "text-gold" : "text-ink-faint hover:text-ink-soft"
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
      )}

      <div
        key={activeCategory}
        className="grid grid-cols-2 gap-[3px] sm:grid-cols-3 sm:gap-1 lg:grid-cols-4"
      >
        {filtered.map((piece, i) => (
          <Tile key={piece.id} piece={piece} index={i} onClick={() => openLightbox(i)} />
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <span className="label text-[0.5625rem] text-ink-faint">
          Showing <span className="text-gold">{filtered.length}</span> piece
          {filtered.length === 1 ? "" : "s"}
        </span>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          pieces={filtered}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
}
