"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ProjectImage } from "@/components/ui/project-image";
import { stockImages } from "@/lib/stock-images";

const SERVICES = [
  {
    title: "Interior Design",
    description:
      "Interiors shaped around how you live — space planning, material selection and considered detail, room by room.",
    caption: "Interior Design — living room detail",
    photo: stockImages.servicesInteriorDesign,
    tone: 0 as const,
  },
  {
    title: "Architectural Design",
    description:
      "Architectural concepts built on proportion, context and light, from first sketch to construction drawing.",
    caption: "Architectural Design — facade study",
    photo: stockImages.servicesArchitecturalDesign,
    tone: 2 as const,
  },
  {
    title: "Turnkey Projects",
    description:
      "End-to-end execution — design, materials and site management handled as one continuous process.",
    caption: "Turnkey Projects — site under execution",
    photo: stockImages.servicesTurnkey,
    tone: 1 as const,
  },
  {
    title: "AD Living",
    description:
      "Customised furniture and decor, crafted to belong to the space they're designed for.",
    caption: "AD Living — custom joinery detail",
    photo: stockImages.servicesAdLiving,
    tone: 3 as const,
  },
];

export function Services() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(null);

  return (
    <section id="services" className="px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="label mb-8 text-ink-faint">What We Do</p>
          <h2 className="max-w-2xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink">
            Services.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          <div
            className="border-t border-line lg:col-span-7"
            onMouseLeave={() => setActive(0)}
          >
            {SERVICES.map((service, i) => {
              const isActive = active === i;
              const isOpenMobile = openMobile === i;
              return (
                <div
                  key={service.title}
                  className="border-b border-line"
                  onMouseEnter={() => setActive(i)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setOpenMobile((current) => (current === i ? null : i));
                    }}
                    aria-expanded={isOpenMobile}
                    className="flex w-full items-center gap-6 py-7 text-left sm:py-9"
                  >
                    <span
                      className={`label w-9 shrink-0 transition-colors duration-300 sm:w-11 ${
                        isActive ? "text-gold" : "text-ink-faint"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1 font-display text-3xl text-ink transition-colors duration-300 sm:text-4xl">
                      {service.title}
                    </span>
                    <span
                      aria-hidden
                      className={`label hidden shrink-0 text-ink transition-transform duration-300 lg:inline-block ${
                        isActive ? "translate-x-1" : ""
                      }`}
                    >
                      →
                    </span>
                    <span
                      aria-hidden
                      className={`label w-4 shrink-0 text-right text-ink transition-transform duration-300 lg:hidden ${
                        isOpenMobile ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className="grid transition-[grid-template-rows] duration-400 ease-out lg:hidden"
                    style={{ gridTemplateRows: isOpenMobile ? "1fr" : "0fr" }}
                  >
                    <div className="overflow-hidden">
                      <div className="pb-8">
                        <div className="aspect-[16/10] w-full">
                          <ProjectImage
                            label={service.caption}
                            tone={service.tone}
                            src={service.photo}
                            className="h-full w-full"
                          />
                        </div>
                        <p className="mt-5 max-w-md text-ink-soft">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <span
                    aria-hidden
                    className="block h-px w-full origin-left bg-gold transition-transform duration-500 ease-out"
                    style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                  />
                </div>
              );
            })}
          </div>

          <div className="hidden lg:col-span-5 lg:col-start-8 lg:block">
            <div className="aspect-[4/5] w-full">
              <ProjectImage
                label={SERVICES[active].caption}
                tone={SERVICES[active].tone}
                src={SERVICES[active].photo}
                className="h-full w-full"
              />
            </div>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              {SERVICES[active].description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
