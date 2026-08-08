"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  initials: string;
  role: string;
  project: string;
  location: string;
  rating: number;
  year: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "review-1",
    quote:
      "Working with Ashish Prajapati transformed our raw site into an architectural masterpiece. From foundation layout to custom walnut joinery, their turnkey execution was handled with supreme precision.",
    author: "Rajesh & Meera Shah",
    initials: "RS",
    role: "Homeowners",
    project: "The Oakline Villa",
    location: "SG Highway, Ahmedabad",
    rating: 5,
    year: "2024",
  },
  {
    id: "review-2",
    quote:
      "They understood exactly how we wanted to live and work in this space before we could put it into words. The acoustic balance, travertine accents, and natural light management are extraordinary.",
    author: "Vikram Patel",
    initials: "VP",
    role: "Managing Director",
    project: "Meridian Corporate Suite",
    location: "Sindhu Bhavan Road, Ahmedabad",
    rating: 5,
    year: "2024",
  },
  {
    id: "review-3",
    quote:
      "A process that felt deeply considered at every single step. Having one unified studio handle both architectural blueprinting and turnkey contractor work saved us months of coordination.",
    author: "Ananya & Devang Mehta",
    initials: "DM",
    role: "Homeowners",
    project: "Penthouse 402",
    location: "Bodakdev, Ahmedabad",
    rating: 5,
    year: "2023",
  },
  {
    id: "review-4",
    quote:
      "AD Living custom furniture pieces elevated our entire living room. Every guest who visits asks about the bespoke marble dining setup and concealed wall panelling.",
    author: "Dr. Siddharth Joshi",
    initials: "SJ",
    role: "Client",
    project: "Luxury Apartment Interior",
    location: "Ambawadi, Ahmedabad",
    rating: 5,
    year: "2024",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const current = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-line bg-surface py-28 sm:py-36 lg:py-44 px-5 sm:px-8 lg:px-12"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Decorative Classic Background Elements */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 font-display text-[22vw] font-bold text-ink/[0.02] select-none"
      >
        ASCEND
      </div>

      <div className="mx-auto max-w-[1400px] relative z-10">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col items-center text-center mb-16">
            <div className="inline-flex items-center gap-3 border border-gold/40 px-4 py-1.5 mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
              <p className="label text-xs text-gold tracking-widest uppercase">
                Classic Standards & Verified Reviews
              </p>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.25rem)] leading-[1.08] text-ink max-w-2xl">
              Crafting Spaces That Stand The Test Of Time
            </h2>
            <p className="mt-4 text-ink-soft max-w-lg text-base">
              Direct experiences from homeowners and commercial directors who entrusted their architectural vision to Ascend Designs.
            </p>
          </div>
        </Reveal>

        {/* Featured Testimonial Card */}
        <Reveal delay={0.1}>
          <div className="relative mx-auto max-w-4xl border border-line bg-surface-muted p-8 sm:p-14 md:p-16 shadow-xl transition-all duration-700">
            {/* Classic Gold Corner Accents */}
            <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-gold" />
            <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-gold" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-gold" />
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-gold" />

            {/* Quote Mark watermark */}
            <div className="absolute top-6 left-8 font-display text-8xl text-gold/15 select-none pointer-events-none font-serif">
              &ldquo;
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Star Rating & Year */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex gap-1 text-gold text-base" aria-label="5 out of 5 stars">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-xs text-ink-faint border-l border-line pl-3">
                  Verified Project • {current.year}
                </span>
              </div>

              {/* Quote Text */}
              <blockquote className="min-h-[140px] sm:min-h-[160px] flex items-center justify-center">
                <p className="font-display text-[clamp(1.5rem,3.2vw,2.25rem)] italic leading-[1.38] text-ink transition-opacity duration-500">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </blockquote>

              {/* Client Info Badge */}
              <div className="mt-8 pt-8 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="h-12 w-12 rounded-full border border-gold/50 bg-gold/10 flex items-center justify-center font-display text-lg text-gold font-medium">
                    {current.initials}
                  </div>
                  <div>
                    <p className="font-display text-xl text-ink font-semibold">{current.author}</p>
                    <p className="label text-xs text-gold">{current.role}</p>
                  </div>
                </div>

                <div className="text-center sm:text-right border-t sm:border-t-0 sm:border-l border-line pt-3 sm:pt-0 sm:pl-6">
                  <p className="label text-xs text-ink font-medium">{current.project}</p>
                  <p className="text-xs text-ink-faint">{current.location}</p>
                </div>
              </div>
            </div>

            {/* Navigation & Auto Play Bar */}
            <div className="mt-10 pt-6 border-t border-line/40 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIndex((index - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
                aria-label="Previous testimonial"
                className="label text-xs inline-flex items-center gap-2 text-ink-soft hover:text-gold transition-colors py-2 px-3 border border-transparent hover:border-line"
              >
                ← Previous
              </button>

              {/* Slide Dots */}
              <div className="flex items-center gap-2.5">
                {TESTIMONIALS.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 transition-all duration-500 rounded-full ${
                      index === i ? "w-8 bg-gold" : "w-2 bg-line-strong hover:bg-ink-soft"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIndex((index + 1) % TESTIMONIALS.length)}
                aria-label="Next testimonial"
                className="label text-xs inline-flex items-center gap-2 text-ink-soft hover:text-gold transition-colors py-2 px-3 border border-transparent hover:border-line"
              >
                Next →
              </button>
            </div>
          </div>
        </Reveal>

        {/* Small Ticker Cards Grid at the bottom */}
        <Reveal delay={0.2}>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TESTIMONIALS.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(idx)}
                className={`p-5 text-left border transition-all duration-300 ${
                  index === idx
                    ? "border-gold bg-gold/5 shadow-md"
                    : "border-line bg-surface hover:border-line-strong"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="label text-[10px] text-gold">{item.project}</span>
                  <span className="text-gold text-xs">★★★★★</span>
                </div>
                <p className="text-xs text-ink-soft line-clamp-2 italic mb-3 font-display">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="text-xs text-ink font-medium">{item.author}</p>
              </button>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
