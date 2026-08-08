"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Reveal } from "@/components/motion/reveal";

const STEPS = [
  {
    title: "Consultation",
    description: "Understanding the vision, requirements and lifestyle.",
  },
  {
    title: "Design Development",
    description: "Concept, layout, materials and visual direction.",
  },
  {
    title: "Space Planning",
    description: "Optimizing flow, proportion and usability.",
  },
  {
    title: "Material Selection",
    description: "Selecting finishes and materials.",
  },
  {
    title: "Project Management",
    description: "Managing execution and coordination.",
  },
  {
    title: "Quality Assurance",
    description: "Maintaining standards throughout execution.",
  },
  {
    title: "Final Reveal",
    description: "Walkthrough and handover.",
  },
];

export function TurnkeyProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const numberRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useEffect(() => {
    const container = containerRef.current;
    const fill = fillRef.current;
    if (!container || !fill) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(fill, { scaleY: 1 });
      numberRefs.current.forEach((el) => {
        if (el) el.style.color = "var(--accent-gold)";
      });
      return;
    }

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top 65%",
        end: "bottom 55%",
        scrub: 0.4,
        onUpdate: (self) => {
          gsap.set(fill, { scaleY: self.progress });
          const activeIndex = Math.min(
            STEPS.length - 1,
            Math.floor(self.progress * STEPS.length)
          );
          numberRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.color = i <= activeIndex ? "var(--accent-gold)" : "var(--ink-faint)";
          });
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="bg-surface-alt px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="label mb-8 text-ink-faint">The Process</p>
          <h2 className="max-w-2xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink">
            From idea to reality.
          </h2>
        </Reveal>

        <div ref={containerRef} className="relative mx-auto mt-20 max-w-2xl">
          <div className="absolute left-5 top-2 bottom-2 w-px -translate-x-1/2 bg-line" />
          <div
            ref={fillRef}
            className="absolute left-5 top-2 bottom-2 w-px -translate-x-1/2 origin-top bg-gold"
            style={{ transform: "translateX(-50%) scaleY(0)" }}
          />

          <ol className="flex flex-col gap-14 sm:gap-16">
            {STEPS.map((step, i) => (
              <li key={step.title} className="relative flex gap-6 sm:gap-8">
                <span
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                  className="label w-10 shrink-0 pt-1 text-ink-faint transition-colors duration-300"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-display text-2xl text-ink sm:text-3xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-md text-ink-soft">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
