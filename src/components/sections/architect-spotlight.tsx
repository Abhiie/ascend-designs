"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import { siteConfig } from "@/lib/site-config";

const PILLARS = [
  {
    num: "01",
    title: "Spatial Context",
    desc: "Designing in dialogue with microclimate, natural light, and urban surroundings.",
  },
  {
    num: "02",
    title: "Material Honesty",
    desc: "Raw stone, warm woods, textured plasters and refined metals that age gracefully.",
  },
  {
    num: "03",
    title: "Turnkey Integrity",
    desc: "Ensuring what is envisioned in 3D is crafted flawlessly on-site, to the last millimetre.",
  },
];

export function ArchitectSpotlight() {
  return (
    <section id="about" className="relative overflow-hidden border-t border-line bg-surface-alt py-28 sm:py-36 lg:py-44">
      {/* Section number */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[22vw] leading-none text-white/[0.025]"
      >
        05
      </span>

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-12 lg:px-20">
        {/* Label */}
        <Reveal>
          <div className="mb-16 flex items-center gap-5">
            <span className="h-px w-10 bg-gold/50" />
            <p className="label text-gold/80">The Architect</p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Left: name + quote + bio */}
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light leading-[1.05] text-ink">
                {siteConfig.founder}
              </h2>
              <p className="label mt-3 text-gold/70">{siteConfig.founderTitle}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <blockquote className="mt-10 border-l-2 border-gold/40 pl-6 font-display text-xl italic leading-relaxed text-ink/80 sm:text-2xl">
                &ldquo;Architecture is not merely about constructing walls — it is
                about sculpting light, proportion, and human emotion into living
                sanctuaries.&rdquo;
              </blockquote>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-8 text-sm leading-relaxed text-ink-soft sm:text-base">
                {siteConfig.founderBio}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="#contact"
                  className="label inline-flex items-center gap-2 border border-line-strong px-6 py-3.5 text-ink-soft transition-colors hover:border-gold/50 hover:text-gold"
                >
                  Schedule Consultation <span aria-hidden>→</span>
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right: design pillars + stats */}
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={0.1}>
              <h3 className="font-display text-2xl font-light text-ink-soft">
                Core Design Pillars
              </h3>
            </Reveal>

            <div className="mt-8 flex flex-col">
              {PILLARS.map((p, i) => (
                <Reveal key={p.num} delay={0.15 + i * 0.07}>
                  <div className="border-t border-line py-7">
                    <div className="flex items-start gap-6">
                      <span className="font-display text-base text-gold/50">{p.num}</span>
                      <div>
                        <p className="font-display text-xl text-ink">{p.title}</p>
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
              <div className="border-t border-line" />
            </div>

            {/* Stats */}
            <Reveal delay={0.4}>
              <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-10">
                <div>
                  <p className="font-display text-4xl font-light text-ink">
                    <CountUp value={100} suffix="+" />
                  </p>
                  <p className="label mt-1 text-ink-faint">Spaces Transformed</p>
                </div>
                <div>
                  <p className="font-display text-4xl font-light text-gold">
                    <CountUp value={100} suffix="%" />
                  </p>
                  <p className="label mt-1 text-ink-faint">Turnkey Execution</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
