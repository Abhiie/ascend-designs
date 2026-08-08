"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";

// Placeholder quotes attributed by role and project, not by invented personal
// names — swap in real client testimonials once the studio supplies them.
const TESTIMONIALS = [
  {
    quote: "Beautiful spaces are not only seen. They are experienced.",
    attribution: "Homeowner",
    project: "Residence 01, Ahmedabad",
  },
  {
    quote:
      "They understood exactly how we wanted to live in this home before we could put it into words.",
    attribution: "Homeowner",
    project: "The Oakline Residence, Ahmedabad",
  },
  {
    quote:
      "A process that felt considered at every step, from first sketch to final handover.",
    attribution: "Director",
    project: "Meridian Business Park, Ahmedabad",
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);

  function go(delta: number) {
    setIndex((current) => (current + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  }

  return (
    <section className="border-y border-line px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {TESTIMONIALS.map((t) => (
                <div key={t.quote} className="w-full shrink-0 text-center">
                  <p className="mx-auto max-w-3xl font-display text-[clamp(1.75rem,4vw,3rem)] italic leading-[1.3] text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <p className="label mt-10 text-ink-faint">
                    {t.attribution} — {t.project}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-14 flex items-center justify-center gap-8">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="label text-ink-faint transition-colors hover:text-ink"
            >
              ←
            </button>
            <span className="label text-ink-faint">
              {String(index + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="label text-ink-faint transition-colors hover:text-ink"
            >
              →
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
