"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

// Utility component to split text into per‑character spans for animation
function AnimatedChars({
  text,
  className = "",
  ...rest
}: {
  text: string;
  className?: string;
  [key: string]: any;
}) {
  return (
    <span className={className} {...rest}>
      {text.split("").map((c, i) => (
        // Each character gets a .char class for GSAP targeting
        <span key={i} className="char" style={{ display: "inline-block" }}>
          {c}
        </span>
      ))}
    </span>
  );
}

import { useIsReady } from "@/components/loader/loader";
import { stockImages } from "@/lib/stock-images";
import { SplitFlapBoard } from "@/components/ui/split-flap-board";

const FLAP_WORDS = [
  "Architecture",
  "Interior Design",
  "Turnkey Living",
  "Residential",
  "Commercial",
  "3D Visuals",
  "Renovations",
  "AD Living",
];

const ANIMATED =
  "[data-hero-frame],[data-hero-eyebrow],[data-hero-char],[data-hero-flap],[data-hero-rule],[data-hero-sub],[data-hero-cta],[data-hero-scroll],[data-hero-count]";

/** Splits a string into individually-animated <span> characters */
function AnimChars({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
      {text.split("").map((ch, i) => (
        <span
          key={i}
          data-hero-char
          className={`inline-block ${className}`}
          style={{ willChange: "transform, opacity" }}
        >
          {ch === " " ? "\u00A0" : ch}
        </span>
      ))}
    </>
  );
}

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const isReady = useIsReady();

  /* ── Initial hidden state, set before first paint ── */
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-frame]", { scale: 1.12 });
      gsap.set("[data-hero-eyebrow]", { opacity: 0, y: 16 });
      // Each character starts invisible, dropped down, and slightly rotated
      gsap.set("[data-hero-char]", { opacity: 0, y: 40, rotateX: -90, transformOrigin: "top center" });
      gsap.set("[data-hero-flap]", { opacity: 0, y: 16 });
      gsap.set("[data-hero-rule]", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-hero-sub]", { opacity: 0, y: 18 });
      gsap.set("[data-hero-cta]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-scroll]", { opacity: 0 });
      gsap.set("[data-hero-count]", { opacity: 0, y: 12 });
    }, root);
    return () => ctx.revert();
  }, []);

  /* ── Entrance timeline after loader finishes ── */
  useEffect(() => {
    if (!isReady) return;
    const root = rootRef.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(ANIMATED, { opacity: 1, y: 0, yPercent: 0, scale: 1, scaleX: 1, rotateX: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Collect line-1 and line-2 chars separately for staggered sequencing
      const line1Chars = root.querySelectorAll("[data-hero-line1] [data-hero-char]");
      const line2Chars = root.querySelectorAll("[data-hero-line2] [data-hero-char]");

      tl.to("[data-hero-frame]", { scale: 1, duration: 2.4, ease: "power3.out" })
        .to("[data-hero-eyebrow]", { opacity: 1, y: 0, duration: 0.8 }, 0.3)
        // Line 1 — each character drops in with staggered timing
        .to(
          line1Chars,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.035,
            ease: "back.out(1.4)",
          },
          0.5
        )
        // Line 2 — starts while line 1 is still finishing for a cascading feel
        .to(
          line2Chars,
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.7,
            stagger: 0.04,
            ease: "back.out(1.6)",
          },
          0.95
        )
        .to("[data-hero-rule]", { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 1.5)
        .to("[data-hero-sub]", { opacity: 1, y: 0, duration: 0.8 }, 1.6)
        .to("[data-hero-cta] [data-hero-char]", { opacity: 1, y: 0, duration: 0.7, stagger: 0.05 }, 1.75)
        .to("[data-hero-flap]", { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 1.9)
        .to("[data-hero-count]", { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 2.0)
        .to("[data-hero-scroll]", { opacity: 1, duration: 0.7 }, 2.15)
        // Slow Ken Burns drift
        .to("[data-hero-frame]", { scale: 1.07, duration: 30, ease: "none" }, 3.0);
    }, root);
    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
    >
      {/* ── Backdrop photo ── */}
      <div className="absolute inset-0">
        <div data-hero-frame className="absolute inset-0 will-change-transform">
          <Image
            src={stockImages.hero}
            alt="Luxury interior space designed by Ascend Designs"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Base dark scrim */}
        <div className="absolute inset-0 bg-[#070604]/50" />
        {/* Gradient: heavy top for nav, lighter mid, heavy bottom for legibility */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg,rgba(7,6,4,0.85) 0%,rgba(7,6,4,0.2) 30%,rgba(7,6,4,0.35) 65%,rgba(7,6,4,0.95) 100%)",
          }}
        />
      </div>

      {/* ── Watermark ── */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[22vw] leading-none tracking-[0.08em] text-white/[0.03] select-none"
      >
        ASCEND
      </span>

      {/* ── Main Hero Content ── */}
      <div className="relative z-10 flex flex-1 flex-col items-start justify-center px-6 pt-20 pb-4 sm:px-12 sm:pt-28 lg:px-20 lg:pt-32">
        {/* Eyebrow */}
        <div data-hero-eyebrow className="mb-3 flex items-center gap-3 sm:mb-6 sm:gap-4">
          <span className="block h-px w-8 bg-gold/70 sm:w-12" />
          <span className="label text-[0.5625rem] tracking-[0.28em] text-gold sm:text-[0.6875rem]">
            Architecture · Interiors · Turnkey
          </span>
        </div>

        {/* Headline — each character animates individually */}
        <h1
          className="max-w-5xl font-display font-light leading-[1.0] tracking-tight text-white"
          style={{ perspective: "800px" }}
        >
          {/* Line 1 */}
          <span data-hero-line1 className="block text-[clamp(2.35rem,6.8vw,7.5rem)]">
            <AnimChars text="Designing Spaces" />
          </span>
          {/* Line 2 — italic + gold */}
          <span data-hero-line2 className="block text-[clamp(2.35rem,6.8vw,7.5rem)]">
            <AnimChars text="With Intention." className="italic text-gold" />
          </span>
        </h1>

        {/* Rule */}
        <span
          data-hero-rule
          className="mt-5 block h-px w-16 bg-gold/60 sm:mt-7 sm:w-24"
        />

        {/* Sub-heading */}
        <p
          data-hero-sub
          className="mt-4 max-w-lg text-[0.875rem] leading-relaxed text-white/70 sm:mt-6 sm:text-[0.9375rem] md:text-base"
        >
          Architecture, interiors and turnkey execution — shaped around the
          people who will live in the space, delivered as one continuous
          process.
        </p>

        {/* CTAs */}
        <div className="mt-5 flex flex-row flex-wrap items-center gap-3 sm:mt-7 sm:gap-5">
          <Link
            data-hero-cta
            href="#work"
            className="btn-shimmer label inline-flex items-center justify-center gap-2 px-5 py-3 text-[0.625rem] text-[#0c0b09] transition-opacity hover:opacity-90 sm:gap-3 sm:px-8 sm:py-4 sm:text-xs"
          >
            <AnimChars text="Explore Portfolio" />
            <span aria-hidden>→</span>
          </Link>
          <Link
            data-hero-cta
            href="/about"
            className="label inline-flex items-center justify-center gap-2 border border-white/25 px-5 py-3 text-[0.625rem] text-white/80 transition-colors hover:border-gold/60 hover:text-gold sm:gap-3 sm:px-8 sm:py-4 sm:text-xs"
          >
            <AnimChars text="Our Story" />
          </Link>
        </div>

        {/* ── Specializing In section — all aligned in a single line ── */}
        <div
          data-hero-flap
          className="mt-6 flex flex-row items-center gap-3 sm:mt-7 sm:gap-4 max-w-full overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex items-center gap-2 shrink-0">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="label text-[0.5rem] tracking-[0.22em] text-gold/90 sm:text-[0.625rem] whitespace-nowrap">
              Specializing In
            </span>
          </div>
          <div className="shrink-0">
            <SplitFlapBoard words={FLAP_WORDS} />
          </div>
        </div>
      </div>

      {/* ── Stats row — commented out by user ── */}
      {/* <div className="relative z-10 grid grid-cols-3 gap-2 px-6 pb-5 sm:flex sm:items-center sm:gap-12 sm:px-12 sm:pb-8 lg:px-20">
        {[
          { num: "100+", label: "Spaces Done" },
          { num: "8+", label: "Years Practice" },
          { num: "100%", label: "Turnkey" },
        ].map((stat) => (
          <div data-hero-count key={stat.label} className="flex flex-col gap-0.5">
            <span className="font-display text-xl font-light text-gold sm:text-3xl">
              {stat.num}
            </span>
            <span className="label text-[0.4375rem] tracking-[0.16em] text-white/45 sm:text-[0.5625rem]">
              {stat.label}
            </span>
          </div>
        ))}
      </div> */}

      {/* ── Scroll cue ── */}
      <div
        data-hero-scroll
        className="absolute right-6 top-1/2 -translate-y-1/2 hidden flex-col items-center gap-2 lg:flex"
      >
        <span
          className="label text-[0.5rem] tracking-widest text-white/30"
          style={{ writingMode: "vertical-rl" }}
        >
          Scroll
        </span>
        <span className="mt-2 flex h-10 w-[20px] items-start justify-center rounded-full border border-white/20 pt-2">
          <span className="scroll-cue-dot h-1.5 w-1.5 rounded-full bg-gold" />
        </span>
      </div>
    </section>
  );
}
