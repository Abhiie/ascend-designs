"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ProjectImage } from "@/components/ui/project-image";
import { stockImages } from "@/lib/stock-images";

const SERVICES = [
  {
    num: "01",
    title: "Architecture",
    short: "Site to Structure",
    description:
      "We design buildings that respond to their site, climate and culture — translating spatial ambition into precise construction documents and built form.",
    deliverables: ["Concept Design", "Working Drawings", "Site Supervision", "3D Visualisation"],
    photo: stockImages.architecture,
    tone: 2 as const,
  },
  {
    num: "02",
    title: "Interior Design",
    short: "Space to Experience",
    description:
      "Each interior is an expression of those who inhabit it. We compose material, light and form into environments that feel both beautiful and lived-in.",
    deliverables: ["Space Planning", "Material Selection", "Custom Joinery", "Lighting Design"],
    photo: stockImages.interiors,
    tone: 1 as const,
  },
  {
    num: "03",
    title: "Turnkey Projects",
    short: "Design to Delivery",
    description:
      "From the first sketch to the final polish, we manage every vendor, contractor and timeline so the result matches the design — flawlessly.",
    deliverables: ["Project Management", "Contractor Coordination", "Procurement", "Handover"],
    photo: stockImages.hero,
    tone: 0 as const,
  },
  {
    num: "04",
    title: "AD Living",
    short: "Furniture & Décor",
    description:
      "Bespoke furniture and curated decor objects that complete a space — each piece selected or designed to hold its own and enhance the whole.",
    deliverables: ["Bespoke Furniture", "Décor Curation", "Art Selection", "Styling"],
    photo: stockImages.adLivingDecor,
    tone: 3 as const,
  },
];

export function Services() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="services"
      className="relative overflow-hidden border-t border-line py-28 sm:py-36 lg:py-44"
    >
      {/* Section number */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-2 top-1/2 -translate-y-1/2 select-none font-display text-[22vw] leading-none text-white/[0.025]"
      >
        03
      </span>

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-12 lg:px-20">
        {/* Header */}
        <Reveal>
          <div className="mb-16 flex items-center gap-5">
            <span className="h-px w-10 bg-gold/50" />
            <p className="label text-gold/80">Services</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Accordion list */}
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="mb-12 font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] text-ink">
                What We Do
              </h2>
            </Reveal>

            <div className="flex flex-col">
              {SERVICES.map((svc, i) => (
                <Reveal key={svc.num} delay={i * 0.06}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    className={`group flex w-full items-start gap-6 border-t border-line py-7 text-left transition-all duration-300 ${
                      active === i ? "border-gold/40" : "hover:border-gold/20"
                    }`}
                  >
                    {/* Number */}
                    <span
                      className={`font-display text-lg font-light transition-colors ${
                        active === i ? "text-gold" : "text-ink-faint"
                      }`}
                    >
                      {svc.num}
                    </span>

                    {/* Title + short */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3
                          className={`font-display text-2xl font-light transition-colors sm:text-3xl ${
                            active === i ? "text-ink" : "text-ink-soft group-hover:text-ink"
                          }`}
                        >
                          {svc.title}
                        </h3>
                        <span
                          className={`label text-[0.5625rem] transition-colors ${
                            active === i ? "text-gold" : "text-ink-faint"
                          }`}
                        >
                          {svc.short}
                        </span>
                      </div>

                      {/* Expanded content */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${
                          active === i ? "mt-5 max-h-64" : "max-h-0"
                        }`}
                      >
                        <p className="text-sm leading-relaxed text-ink-soft">
                          {svc.description}
                        </p>
                        <ul className="mt-4 flex flex-wrap gap-2">
                          {svc.deliverables.map((d) => (
                            <li
                              key={d}
                              className="label border border-gold/30 px-3 py-1 text-[0.5625rem] text-gold/80"
                            >
                              {d}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Arrow */}
                    <span
                      className={`mt-1 text-ink-faint transition-[color,transform] duration-300 ${
                        active === i ? "rotate-90 text-gold" : "group-hover:text-ink"
                      }`}
                    >
                      →
                    </span>
                  </button>
                </Reveal>
              ))}
              {/* Bottom border */}
              <div className="border-t border-line" />
            </div>
          </div>

          {/* Sticky image panel */}
          <div className="lg:col-span-5 lg:col-start-8">
            <div className="sticky top-24 overflow-hidden">
              <div
                key={active}
                className="relative aspect-[4/5] overflow-hidden"
                style={{ animation: "fadeUp 0.5s ease forwards" }}
              >
                <ProjectImage
                  label={SERVICES[active].title}
                  tone={SERVICES[active].tone}
                  src={SERVICES[active].photo}
                  className="h-full w-full"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
                {/* Service name overlay */}
                <div className="absolute inset-0 flex items-end p-8"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(12,11,9,0.7) 0%, transparent 50%)",
                  }}
                >
                  <div>
                    <p className="label text-gold/80">{SERVICES[active].num}</p>
                    <p className="font-display text-3xl font-light text-ink">
                      {SERVICES[active].title}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
