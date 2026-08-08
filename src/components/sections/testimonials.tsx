"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  project: string;
  location: string;
  rating: number;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      "Working with Ashish Prajapati and the Ascend Designs team transformed our vision into an architectural masterpiece. From site layout to custom millwork, their turnkey execution was flawless.",
    author: "Rajesh & Meera Shah",
    role: "Homeowners",
    project: "The Oakline Villa",
    location: "B sickness / SG Highway, Ahmedabad",
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

export function Testimonials() {
  const [index, setIndex] = useState(0);

  function go(delta: number) {
    setIndex((current) => (current + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  const current = TESTIMONIALS[index];

  return (
    <section className="border-y border-line px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36 bg-surface">
      <div className="mx-auto max-w-5xl">
        <Reveal>
          <div className="text-center mb-12">
            <p className="label text-gold mb-3">Client Experiences</p>
            <h2 className="font-display text-[clamp(2.25rem,4vw,3.5rem)] text-ink">
              Words From Our Clients
            </h2>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="relative border border-line bg-surface-muted p-8 sm:p-14 rounded-sm">
            {/* Gold Quote Mark */}
            <div className="absolute top-6 left-8 font-display text-7xl text-gold/20 select-none pointer-events-none">
              &ldquo;
            </div>

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Star Rating */}
              <div className="flex gap-1 mb-6 text-gold text-sm" aria-label={`Rating: ${current.rating} out of 5 stars`}>
                {Array.from({ length: current.rating }).map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              <blockquote className="max-w-3xl font-display text-[clamp(1.5rem,3.2vw,2.35rem)] italic leading-[1.35] text-ink">
                &ldquo;{current.quote}&rdquo;
              </blockquote>

              <div className="mt-8 pt-6 border-t border-line/60 flex flex-col items-center">
                <p className="font-display text-xl text-ink font-medium">{current.author}</p>
                <p className="label mt-1 text-gold">{current.role} — {current.project}</p>
                <p className="text-xs text-ink-faint mt-1">{current.location}</p>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="mt-10 flex items-center justify-between border-t border-line/50 pt-6">
              <button
                type="button"
                onClick={() => go(-1)}
                aria-label="Previous testimonial"
                className="label text-xs inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-gold"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-2">
                {TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-1.5 transition-all duration-300 rounded-full ${
                      index === i ? "w-8 bg-gold" : "w-2 bg-line-strong hover:bg-ink-soft"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                aria-label="Next testimonial"
                className="label text-xs inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-gold"
              >
                Next →
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
