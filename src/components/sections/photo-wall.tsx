"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Reveal } from "@/components/motion/reveal";

// ─── All photos flat pool ─────────────────────────────────────────────────────
export interface Photo {
  src: string;
  project: string;
  category: "residential" | "commercial" | "interiors" | "turnkey";
  location: string;
  year: number;
}

export const ALL_PHOTOS: Photo[] = [
  // ── Tapan Residence (21 photos) ───────────────────────────────────────────
  ...[
    "001","02","03","04","05","06","07","08","09",
    "12 copy","13 copy","211 copy","212 copy","213 copy","215 copy",
    "216 copy","311 copy","312 copy","313 copy","314 copy","315 copy",
  ].map((f) => ({
    src: `/projects/tapan bhai Ahmadava/${f}.webp`,
    project: "Tapan Residence",
    category: "residential" as const,
    location: "Ahmedabad",
    year: 2025,
  })),

  // ── Rajdhani (19 photos) ──────────────────────────────────────────────────
  ...[
    "1_","2_","3_","4_","5_","002_","003_",
    "105 copy","106 copy","107 copy","108 copy","109 copy","110 copy",
    "201 copy","202 copy","203 copy","204 copy","2_ (2)","3_ (2)",
  ].map((f) => ({
    src: `/projects/rajdhani mukesh bhai/${f}.webp`,
    project: "Rajdhani Residence",
    category: "interiors" as const,
    location: "Ahmedabad",
    year: 2024,
  })),

  // ── Alayam Madhuvan (11 photos) ───────────────────────────────────────────
  ...[
    "003_","005_","006_","1_","1_ (2)","2_","2_ (2)",
    "25_","3_","3_ (2)","4_",
  ].map((f) => ({
    src: `/projects/alayam madhuvan/${f}.webp`,
    project: "Alayam Madhuvan",
    category: "residential" as const,
    location: "Gujarat",
    year: 2024,
  })),

  // ── Dr. Prakash (12 photos) ───────────────────────────────────────────────
  ...[
    "01_","05_","06_","20_","21_","22_",
    "210_","211_","302_","303_","304_","305",
  ].map((f) => ({
    src: `/projects/DR.Prakash bhai/${f}.webp`,
    project: "Dr. Prakash Residence",
    category: "residential" as const,
    location: "Ahmedabad",
    year: 2024,
  })),

  // ── Krushnam Gruham (11 photos) ───────────────────────────────────────────
  ...[
    "001_","002_","003_","004_","005_","006_",
    "001_ (2)","002_ (2)","003_ (2)","004_ (2)","f.f 02",
  ].map((f) => ({
    src: `/projects/KRUSHNAM GRUHAM 07 BAKA BHAI/${f}.webp`,
    project: "Krushnam Gruham",
    category: "residential" as const,
    location: "Gujarat",
    year: 2023,
  })),

  // ── Pahal 83 (16 photos) ──────────────────────────────────────────────────
  ...[
    "001","002","003","01","02","03","04","05",
    "01 (2)","02 (2)","03 (2)","04 (2)","1","2","3","5",
  ].map((f) => ({
    src: `/projects/PAHAL83 11/${f}.webp`,
    project: "Pahal 83",
    category: "interiors" as const,
    location: "Ahmedabad",
    year: 2023,
  })),

  // ── Shreenathji Ashiyana (8 photos) ──────────────────────────────────────
  ...[
    "001","001 (2)","002","003",
    "01 copy (2)","02 copy (2)","03 copy (2)","06 copy",
  ].map((f) => ({
    src: `/projects/SHREENATHJI ASHIYANA/${f}.webp`,
    project: "Shreenathji Ashiyana",
    category: "turnkey" as const,
    location: "Gujarat",
    year: 2023,
  })),

  // ── Bhemat Jewellers (9 photos) ───────────────────────────────────────────
  ...[
    "2022_09_17_07_22_IMG_1654","2022_09_17_07_22_IMG_1655",
    "2022_09_17_07_32_IMG_1661","2022_10_07_23_38_IMG_2260",
    "2022_10_07_23_39_IMG_2261","2022_10_07_23_39_IMG_2262",
    "2022_10_07_23_40_IMG_2265","2022_10_07_23_40_IMG_2266","6",
  ].map((f) => ({
    src: `/projects/BHEMAT JWELER/${f}.webp`,
    project: "Bhemat Jewellers",
    category: "commercial" as const,
    location: "Gujarat",
    year: 2022,
  })),
];

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Residential", value: "residential" },
  { label: "Interiors", value: "interiors" },
  { label: "Commercial", value: "commercial" },
  { label: "Turnkey", value: "turnkey" },
] as const;

type CategoryFilter = "all" | Photo["category"];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
function Lightbox({
  photos, index, onClose, onPrev, onNext,
}: {
  photos: Photo[];
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
      {/* Image */}
      <div
        className="relative flex max-h-[92svh] max-w-[90vw] flex-col"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "lbFade 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.project}
          className="max-h-[80svh] w-auto max-w-full object-contain"
          loading="eager"
        />
        {/* Info bar */}
        <div className="mt-5 flex items-end justify-between gap-8">
          <div>
            <p className="font-display text-xl font-light text-white/90">{photo.project}</p>
            <p className="label mt-1 text-gold/70">{photo.location} · {photo.year}</p>
          </div>
          <p className="label shrink-0 text-white/30">{index + 1} / {photos.length}</p>
        </div>
      </div>

      {/* Nav arrows */}
      <button type="button" aria-label="Prev"
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="group absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-white/15 text-white/50 transition-all hover:border-gold/50 hover:text-gold sm:left-8">
        ←
      </button>
      <button type="button" aria-label="Next"
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="group absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center border border-white/15 text-white/50 transition-all hover:border-gold/50 hover:text-gold sm:right-8">
        →
      </button>
      <button type="button" aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 label text-white/40 transition-colors hover:text-gold">
        ✕
      </button>

      <style>{`
        @keyframes lbFade {
          from { opacity:0; transform:scale(0.94) translateY(16px); }
          to   { opacity:1; transform:scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Single animated photo card ───────────────────────────────────────────────
function PhotoCard({
  photo,
  index,
  onClick,
}: {
  photo: Photo;
  index: number;
  onClick: () => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);

  // GSAP clip-path reveal on scroll
  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap } = await import("@/lib/gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!cardRef.current) return;

      ctx = gsap.context(() => {
        gsap.fromTo(
          cardRef.current,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            opacity: 0,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            delay: (index % 4) * 0.08,
            scrollTrigger: {
              trigger: cardRef.current,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      }, cardRef.current);
    })();
    return () => ctx?.revert();
  }, [index]);

  // Magnetic hover tilt
  function onMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    el.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
  }
  function onMouseLeave() {
    if (cardRef.current) cardRef.current.style.transform = "";
  }

  return (
    <button
      ref={cardRef}
      type="button"
      className="group relative block w-full overflow-hidden bg-surface-strong text-left"
      style={{
        clipPath: "inset(100% 0% 0% 0%)",
        opacity: 0,
        transition: "transform 0.4s cubic-bezier(0.23,1,0.32,1)",
        willChange: "transform",
      }}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      aria-label={`View ${photo.project}`}
    >
      {/* Image */}
      <div className="aspect-[4/3] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.project}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
      </div>

      {/* Info reveal on hover */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-[#0c0b09]/90 via-[#0c0b09]/20 to-transparent p-4 opacity-0 transition-opacity duration-400 group-hover:opacity-100 sm:p-5">
        <p className="font-display text-base font-light text-white sm:text-lg">{photo.project}</p>
        <div className="mt-1 flex items-center justify-between">
          <p className="label text-[0.5rem] text-gold/80">{photo.location}</p>
          <p className="label text-[0.5rem] text-white/40">{photo.year}</p>
        </div>
      </div>

      {/* Gold corner accent */}
      <div className="absolute right-0 top-0 h-0 w-0 border-l-[36px] border-t-[36px] border-l-transparent border-t-gold/0 transition-[border-top-color] duration-300 group-hover:border-t-gold/80" />
    </button>
  );
}

// ─── Project Wall ─────────────────────────────────────────────────────────────
export function ProjectWall() {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const filterBarRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  const filtered = activeFilter === "all"
    ? ALL_PHOTOS
    : ALL_PHOTOS.filter((p) => p.category === activeFilter);

  const visible = showAll ? filtered : filtered.slice(0, 20);

  // Animated filter indicator underline
  const moveIndicator = useCallback((btn: HTMLButtonElement) => {
    const bar = filterBarRef.current;
    const ind = indicatorRef.current;
    if (!bar || !ind) return;
    const barRect = bar.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    ind.style.left = `${btnRect.left - barRect.left}px`;
    ind.style.width = `${btnRect.width}px`;
  }, []);

  function handleFilter(val: CategoryFilter, e: React.MouseEvent<HTMLButtonElement>) {
    setActiveFilter(val);
    setShowAll(false);
    moveIndicator(e.currentTarget);
  }

  function openLightbox(idxInFiltered: number) {
    setLightboxIndex(idxInFiltered);
    document.body.style.overflow = "hidden";
  }
  function closeLightbox() {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }
  function goPrev() {
    setLightboxIndex((i) => i === null ? null : (i - 1 + filtered.length) % filtered.length);
  }
  function goNext() {
    setLightboxIndex((i) => i === null ? null : (i + 1) % filtered.length);
  }

  return (
    <>
      <section id="work" className="px-4 pb-32 pt-28 sm:px-8 sm:pb-40 sm:pt-36 lg:px-12 lg:pb-48 lg:pt-44">
        <div className="mx-auto max-w-[1600px]">

          {/* ── Header ──────────────────────────────────────────────────── */}
          <Reveal>
            <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="mb-5 flex items-center gap-4">
                  <span className="h-px w-10 bg-gold/50" />
                  <p className="label text-gold/70">Portfolio</p>
                </div>
                <h2 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-light leading-[1.02] text-ink">
                  40+ Completed
                  <br />
                  <em className="italic text-gold">Projects</em>
                </h2>
              </div>
              <p className="max-w-[280px] text-sm leading-relaxed text-ink-soft">
                Every space below was designed, visualised, and delivered by Ascend Designs.
              </p>
            </div>
          </Reveal>

          {/* ── Filter tabs ──────────────────────────────────────────────── */}
          <Reveal delay={0.08}>
            <div className="relative mb-10">
              <div
                ref={filterBarRef}
                className="relative flex flex-wrap gap-2 border-b border-line pb-px sm:gap-0"
              >
                {CATEGORIES.map(({ label, value }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={(e) => handleFilter(value as CategoryFilter, e)}
                    className={`label px-4 py-3 text-[0.625rem] transition-colors sm:px-5 ${
                      activeFilter === value ? "text-gold" : "text-ink-faint hover:text-ink-soft"
                    }`}
                  >
                    {label}
                    {value !== "all" && (
                      <span className="ml-1.5 text-[0.5rem] opacity-50">
                        ({ALL_PHOTOS.filter((p) => p.category === value).length})
                      </span>
                    )}
                  </button>
                ))}
                {/* Sliding underline */}
                <span
                  ref={indicatorRef}
                  className="absolute bottom-0 h-[2px] bg-gold transition-all duration-300 ease-out"
                  style={{ left: 0, width: 0 }}
                />
              </div>
            </div>
          </Reveal>

          {/* ── Photo grid ───────────────────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4 lg:gap-3 xl:grid-cols-5">
            {visible.map((photo, i) => (
              <PhotoCard
                key={`${photo.src}-${activeFilter}`}
                photo={photo}
                index={i}
                onClick={() => openLightbox(filtered.indexOf(photo))}
              />
            ))}
          </div>

          {/* ── Stats bar ────────────────────────────────────────────────── */}
          <Reveal delay={0.1}>
            <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-line pt-8 text-ink-faint">
              <span className="label text-[0.5625rem]">
                Showing <span className="text-gold">{visible.length}</span> of{" "}
                <span className="text-ink-soft">{filtered.length}</span> images
              </span>
              {!showAll && filtered.length > 20 && (
                <button
                  type="button"
                  onClick={() => setShowAll(true)}
                  className="label ml-auto inline-flex items-center gap-3 border border-line-strong px-7 py-3.5 text-ink-soft transition-colors hover:border-gold/50 hover:text-gold"
                >
                  Load {filtered.length - 20} More <span aria-hidden>↓</span>
                </button>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox
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
