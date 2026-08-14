"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useIsReady } from "@/components/loader/loader";
import { stockImages } from "@/lib/stock-images";

const HEADLINE_LINES = [
  { text: "Designing Spaces With", accent: false },
  { text: "Intention.", accent: true },
];

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

const ANIMATED_SELECTOR =
  "[data-hero-frame], [data-hero-watermark], [data-hero-label], [data-hero-line], [data-hero-rule], [data-hero-sub], [data-hero-cta], [data-hero-scroll], [data-hero-ticker]";

export function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const isReady = useIsReady();

  // Establish the hidden "from" state immediately via GSAP itself (not a
  // static Tailwind class) so there is nothing to reconcile once the gated
  // entrance timeline below takes over — avoids a pop when it starts.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Deliberately not faded from zero: the photograph sits behind opaque
      // doors regardless, and leaving it painted lets the browser decode it
      // during the intro instead of at the exact frame the doors part.
      gsap.set("[data-hero-frame]", { scale: 1.14 });
      // Opacity only — this is 24vw of serif, and scaling glyphs that size
      // re-rasterises them every frame.
      gsap.set("[data-hero-watermark]", { opacity: 0 });
      gsap.set("[data-hero-label]", { opacity: 0, y: 14 });
      gsap.set("[data-hero-line]", { yPercent: 115 });
      gsap.set("[data-hero-rule]", { scaleX: 0, transformOrigin: "center center" });
      gsap.set("[data-hero-sub]", { opacity: 0, y: 14 });
      gsap.set("[data-hero-cta]", { opacity: 0, y: 18 });
      gsap.set("[data-hero-scroll]", { opacity: 0 });
      gsap.set("[data-hero-ticker]", { yPercent: 100 });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(ANIMATED_SELECTOR, {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scale: 1,
          scaleX: 1,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // The photograph settles out of its own push-in as the doors clear.
      tl.to("[data-hero-frame]", {
        scale: 1,
        duration: 2.2,
        ease: "power3.out",
      })
        .to("[data-hero-watermark]", { opacity: 1, duration: 1.8 }, 0.2)
        .to("[data-hero-label]", { opacity: 1, y: 0, duration: 0.7 }, 0.35)
        .to(
          "[data-hero-line]",
          { yPercent: 0, duration: 1.0, stagger: 0.11, ease: "power4.out" },
          0.5
        )
        .to("[data-hero-rule]", { scaleX: 1, duration: 0.7, ease: "power2.inOut" }, 1.1)
        .to("[data-hero-sub]", { opacity: 1, y: 0, duration: 0.7 }, 1.2)
        .to("[data-hero-cta]", { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 1.35)
        .to("[data-hero-scroll]", { opacity: 1, duration: 0.7 }, 1.6)
        .to("[data-hero-ticker]", { yPercent: 0, duration: 0.9, ease: "power3.out" }, 1.5)
        // A very slow drift keeps the still frame alive without reading as motion.
        .to("[data-hero-frame]", { scale: 1.08, duration: 26, ease: "none" }, 2.4);
    }, root);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
    >
      {/* Backdrop */}
      <div className="absolute inset-0">
        <div data-hero-frame className="absolute inset-0 will-change-transform">
          <Image
            src={stockImages.hero}
            alt="Warm contemporary living room with oak, stone and layered natural light"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        {/* Two scrims: a flat one for legibility, a vertical one to weight the
            top for the nav and the bottom for the ticker. */}
        <div className="absolute inset-0 bg-[#0d0a07]/45" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(13,10,7,0.78) 0%, rgba(13,10,7,0.28) 32%, rgba(13,10,7,0.4) 62%, rgba(13,10,7,0.88) 100%)",
          }}
        />
      </div>

      <span
        data-hero-watermark
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap font-display text-[24vw] leading-none tracking-[0.06em] text-white/[0.055]"
      >
        ASCEND
      </span>

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-28 pb-8 text-center sm:px-8 sm:pt-32 sm:pb-10 lg:px-12">
        {/* Location-led, unornamented — both reference studios open on where
            they practise rather than on decoration. The rule drops away below
            `sm`, where the line alone already fills the width. */}
        <div
          data-hero-label
          className="mb-6 flex items-center justify-center gap-4 sm:mb-8"
        >
          <span className="hidden h-px w-10 bg-white/30 sm:block sm:w-14" />
          <span className="label text-[0.5625rem] tracking-[0.18em] text-white/85 sm:text-[0.6875rem] sm:tracking-[0.26em]">
            Ahmedabad, Gujarat — India
          </span>
          <span className="hidden h-px w-10 bg-white/30 sm:block sm:w-14" />
        </div>

        {/* The 2.25rem floor keeps "Designing Spaces With" on one line at
            360px wide; anything larger wraps and the second line orphans. */}
        <h1 className="font-display text-[clamp(2.25rem,8.5vw,7.5rem)] font-normal leading-[1.02] tracking-tight text-white">
          {HEADLINE_LINES.map((line) => (
            <span key={line.text} className="block overflow-hidden pb-[0.08em]">
              <span
                data-hero-line
                className={`block ${line.accent ? "text-gold" : ""}`}
              >
                {line.text}
              </span>
            </span>
          ))}
        </h1>

        <span data-hero-rule className="mt-7 block h-px w-24 bg-gold sm:mt-9 sm:w-32" />

        <p
          data-hero-sub
          className="mt-7 max-w-xl text-[0.9375rem] leading-relaxed text-white/75 sm:mt-9 sm:text-lg"
        >
          Architecture, interiors and turnkey execution — shaped around the people
          who will live in the space, and delivered as one continuous process.
        </p>

        <div className="mt-8 flex w-full max-w-sm flex-col items-center gap-3 sm:mt-11 sm:w-auto sm:max-w-none sm:flex-row sm:gap-5">
          <Link
            data-hero-cta
            href="#projects"
            className="label flex w-full items-center justify-center gap-3 bg-gold px-9 py-4 text-[#14100c] transition-colors duration-300 hover:bg-[#c9a469] sm:w-auto"
          >
            Explore Portfolio <span aria-hidden>→</span>
          </Link>
          <Link
            data-hero-cta
            href="#studio"
            className="label flex w-full items-center justify-center border border-white/35 px-9 py-4 text-white transition-colors duration-300 hover:border-gold hover:text-gold sm:w-auto"
          >
            Our Story
          </Link>
        </div>
      </div>

      <div
        data-hero-scroll
        className="relative z-10 mb-6 flex flex-col items-center gap-2 sm:mb-10 sm:gap-3"
      >
        <span className="label text-[0.5625rem] text-white/45">Scroll</span>
        <span className="flex h-9 w-[22px] items-start justify-center rounded-full border border-white/30 pt-2">
          <span className="scroll-cue-dot h-1.5 w-1.5 rounded-full bg-gold" />
        </span>
      </div>

      {/* Services ticker along the foot of the frame. */}
      <div data-hero-ticker className="relative z-10 w-full overflow-hidden bg-gold py-3.5">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0" aria-hidden={copy === 1}>
              {TICKER_ITEMS.map((item) => (
                <span
                  key={item}
                  className="label flex items-center gap-8 whitespace-nowrap pl-8 text-[#14100c]"
                >
                  {item}
                  <span aria-hidden className="text-[0.5rem] opacity-60">
                    ◆
                  </span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
