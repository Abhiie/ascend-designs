"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useIsReady } from "@/components/loader/loader";
import { stockImages } from "@/lib/stock-images";

const TICKER_ITEMS = [
  "Architecture",
  "Interior Design",
  "Turnkey Projects",
  "AD Living",
  "Residential",
  "Commercial",
  "3D Visualisation",
  "Renovation",
];

const ANIMATED =
  "[data-hero-frame],[data-hero-eyebrow],[data-hero-line],[data-hero-rule],[data-hero-sub],[data-hero-cta],[data-hero-scroll],[data-hero-ticker],[data-hero-count]";

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
      gsap.set("[data-hero-line]", { yPercent: 110 });
      gsap.set("[data-hero-rule]", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-hero-sub]", { opacity: 0, y: 18 });
      gsap.set("[data-hero-cta]", { opacity: 0, y: 20 });
      gsap.set("[data-hero-scroll]", { opacity: 0 });
      gsap.set("[data-hero-ticker]", { yPercent: 100 });
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
        gsap.set(ANIMATED, { opacity: 1, y: 0, yPercent: 0, scale: 1, scaleX: 1 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to("[data-hero-frame]", { scale: 1, duration: 2.4, ease: "power3.out" })
        .to("[data-hero-eyebrow]", { opacity: 1, y: 0, duration: 0.8 }, 0.3)
        .to(
          "[data-hero-line]",
          { yPercent: 0, duration: 1.1, stagger: 0.12, ease: "power4.out" },
          0.5
        )
        .to("[data-hero-rule]", { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 1.15)
        .to("[data-hero-sub]", { opacity: 1, y: 0, duration: 0.8 }, 1.25)
        .to("[data-hero-cta]", { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 1.4)
        .to("[data-hero-count]", { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 1.5)
        .to("[data-hero-scroll]", { opacity: 1, duration: 0.7 }, 1.7)
        .to("[data-hero-ticker]", { yPercent: 0, duration: 1.0, ease: "power3.out" }, 1.6)
        // Slow Ken Burns drift
        .to("[data-hero-frame]", { scale: 1.07, duration: 30, ease: "none" }, 2.6);
    }, root);
    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
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
        {/* Gradient: heavy top for nav, lighter mid, heavy bottom for ticker */}
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

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-1 flex-col items-start justify-center px-6 pt-32 pb-10 sm:px-12 lg:px-20">
        {/* Eyebrow */}
        <div data-hero-eyebrow className="mb-8 flex items-center gap-4">
          <span className="block h-px w-12 bg-gold/70" />
          <span className="label text-[0.6rem] tracking-[0.28em] text-gold sm:text-[0.6875rem]">
            Architecture · Interiors · Turnkey
          </span>
        </div>

        {/* Headline */}
        <h1 className="max-w-5xl font-display font-light leading-[1.0] tracking-tight text-white">
          {/* Line 1 */}
          <span className="line-mask text-[clamp(3rem,9vw,8.5rem)]">
            <span data-hero-line className="block">Designing Spaces</span>
          </span>
          {/* Line 2 — italic + gold */}
          <span className="line-mask text-[clamp(3rem,9vw,8.5rem)]">
            <span
              data-hero-line
              className="block italic text-gold"
            >
              With Intention.
            </span>
          </span>
        </h1>

        {/* Rule */}
        <span
          data-hero-rule
          className="mt-8 block h-px w-20 bg-gold/60 sm:mt-10 sm:w-28"
        />

        {/* Sub-heading */}
        <p
          data-hero-sub
          className="mt-8 max-w-lg text-[0.9375rem] leading-relaxed text-white/60 sm:text-base"
        >
          Architecture, interiors and turnkey execution — shaped around the
          people who will live in the space, delivered as one continuous
          process.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
          <Link
            data-hero-cta
            href="#projects"
            className="btn-shimmer label inline-flex items-center gap-3 px-8 py-4 text-[#0c0b09] transition-opacity hover:opacity-90"
          >
            Explore Portfolio <span aria-hidden>→</span>
          </Link>
          <Link
            data-hero-cta
            href="#studio"
            className="label inline-flex items-center gap-3 border border-white/25 px-8 py-4 text-white/80 transition-colors hover:border-gold/60 hover:text-gold"
          >
            Our Story
          </Link>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="relative z-10 flex items-center gap-10 px-6 pb-6 sm:px-12 lg:px-20">
        {[
          { num: "100+", label: "Spaces Delivered" },
          { num: "8+", label: "Years of Practice" },
          { num: "100%", label: "Turnkey Execution" },
        ].map((stat) => (
          <div data-hero-count key={stat.label} className="flex flex-col gap-1">
            <span className="font-display text-2xl font-light text-gold sm:text-3xl">
              {stat.num}
            </span>
            <span className="label text-[0.5625rem] text-white/40">{stat.label}</span>
          </div>
        ))}
      </div>

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

      {/* ── Services ticker ── */}
      <div
        data-hero-ticker
        className="relative z-10 w-full overflow-hidden border-t border-white/10 bg-gold/10 py-3 backdrop-blur-sm"
      >
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {TICKER_ITEMS.map((item) => (
                <span
                  key={item}
                  className="label flex items-center gap-7 whitespace-nowrap pl-7 text-[0.5625rem] text-gold/80 tracking-[0.26em]"
                >
                  {item}
                  <span aria-hidden className="text-[0.4rem] text-gold/40">◆</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
