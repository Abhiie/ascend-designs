"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";

const TESTIMONIALS = [
  {
    quote:
      "Working with Ashish Prajapati and the Ascend Designs team transformed our vision into an architectural masterpiece. From site layout to custom millwork, their turnkey execution was flawless.",
    author: "Rajesh & Meera Shah",
    role: "Homeowners",
    project: "The Oakline Villa",
    location: "SG Highway, Ahmedabad",
    rating: 5,
  },
  {
    quote:
      "They understood exactly how we wanted to live and work in this space before we could put it into words. The attention to light, acoustic balance, and material finish is extraordinary.",
    author: "Vikram Patel",
    role: "Managing Director",
    project: "Corporate Office Suite",
    location: "Sindhu Bhavan Road, Ahmedabad",
    rating: 5,
  },
  {
    quote:
      "A process that felt deeply considered at every step. Having one unified team handle both architectural design and turnkey contractor work saved us months of effort.",
    author: "Ananya & Devang Mehta",
    role: "Homeowners",
    project: "Penthouse 402",
    location: "Bodakdev, Ahmedabad",
    rating: 5,
  },
  {
    quote:
      "AD Living custom furniture pieces elevated our entire living room. Every guest who visits asks about the bespoke marble dining setup and wood panelling.",
    author: "Dr. Siddharth Joshi",
    role: "Client",
    project: "Luxury Apartment Interior",
    location: "Ambawadi, Ahmedabad",
    rating: 5,
  },
];

const AUTOPLAY_MS = 6000;

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  function go(delta: number) {
    setDirection(delta > 0 ? 1 : -1);
    setIndex((c) => (c + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  function goTo(i: number) {
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  }

  // Auto-advance, paused on hover and skipped entirely under reduced motion.
  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => go(1), AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [index, paused]);

  const current = TESTIMONIALS[index];

  return (
    <section className="relative overflow-hidden border-t border-line bg-surface-alt py-28 sm:py-36 lg:py-44">
      {/* Section number */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[22vw] leading-none text-white/[0.025]"
      >
        04
      </span>

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-12 lg:px-20">
        {/* Header */}
        <Reveal>
          <div className="mb-16 flex items-center gap-5">
            <span className="h-px w-10 bg-gold/50" />
            <p className="label text-gold/80">Client Experiences</p>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            className="grid grid-cols-1 gap-10 lg:grid-cols-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Large quote mark */}
            <div className="lg:col-span-1">
              <span className="font-display text-[6rem] leading-none text-gold/20 select-none">
                &ldquo;
              </span>
            </div>

            {/* Quote body */}
            <div className="lg:col-span-9 overflow-hidden">
              {/* Stars */}
              <div className="mb-6 flex gap-1 text-gold" aria-label={`${current.rating} stars`}>
                {Array.from({ length: current.rating }).map((_, i) => (
                  <span key={i} className="text-sm">★</span>
                ))}
              </div>

              {/* Quote text */}
              <blockquote
                key={index}
                className="font-display text-[clamp(1.5rem,3.5vw,2.75rem)] font-light italic leading-[1.3] text-ink"
                style={{
                  animation: `${direction > 0 ? "slideInRight" : "slideInLeft"} 0.55s cubic-bezier(0.16,1,0.3,1) both`,
                }}
              >
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              {/* Attribution */}
              <div className="mt-10 flex flex-col gap-1 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-display text-lg text-ink">{current.author}</p>
                  <p className="label mt-1 text-gold/80">
                    {current.role} — {current.project}
                  </p>
                  <p className="mt-1 text-xs text-ink-faint">{current.location}</p>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-6 sm:flex-col sm:items-end">
                  {/* Dots — active one fills as a progress bar toward the next auto-advance */}
                  <div className="flex gap-2">
                    {TESTIMONIALS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`relative h-1 overflow-hidden rounded-none transition-[width,background-color] duration-300 ${
                          index === i ? "w-8 bg-ink-faint/20" : "w-2 bg-ink-faint/40 hover:bg-ink-faint"
                        }`}
                      >
                        {index === i && (
                          <span
                            aria-hidden
                            className="absolute inset-y-0 left-0 bg-gold"
                            style={{
                              animation: `dotFill ${AUTOPLAY_MS}ms linear forwards`,
                              animationPlayState: paused ? "paused" : "running",
                            }}
                          />
                        )}
                      </button>
                    ))}
                  </div>

                  {/* Arrows */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => go(-1)}
                      aria-label="Previous"
                      className="label border border-line px-4 py-2 text-ink-soft transition-colors hover:border-gold/40 hover:text-gold"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={() => go(1)}
                      aria-label="Next"
                      className="label border border-line px-4 py-2 text-ink-soft transition-colors hover:border-gold/40 hover:text-gold"
                    >
                      →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes dotFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </section>
  );
}
