"use client";

import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

export function ArchitectSpotlight() {
  return (
    <section className="border-y border-line px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36 bg-surface">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column: Architect Bio & Vision */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="label mb-6 text-gold">Principal Architect & Founder</p>
              <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.1] text-ink">
                {siteConfig.founder}
              </h2>
            </Reveal>

            <Reveal delay={0.1}>
              <blockquote className="mt-8 border-l-2 border-gold/60 pl-6 font-display text-xl sm:text-2xl italic leading-relaxed text-ink/90">
                &ldquo;Architecture is not merely about constructing walls—it is about sculpting light, proportion, and human emotion into living sanctuaries.&rdquo;
              </blockquote>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="mt-6 text-base sm:text-lg leading-relaxed text-ink-soft max-w-2xl">
                {siteConfig.founderBio}
              </p>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-4 items-center">
                <Link
                  href="/about"
                  className="label inline-flex items-center gap-3 border border-line-strong px-6 py-3.5 text-ink transition-colors hover:border-gold hover:text-gold"
                >
                  Know More About Architect <span aria-hidden>→</span>
                </Link>
                <Link
                  href="/contact"
                  className="label inline-flex items-center gap-3 border border-transparent px-6 py-3.5 text-gold hover:underline"
                >
                  Schedule Consultation
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Architectural Principles & Key Metrics */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-line pt-10 lg:pt-0 lg:pl-12">
            <Reveal delay={0.15}>
              <h3 className="font-display text-2xl text-ink mb-6">Core Design Pillars</h3>
            </Reveal>

            <div className="flex flex-col gap-6">
              <Reveal delay={0.2}>
                <div className="group">
                  <p className="label text-gold mb-1">01 / Spatial Context</p>
                  <p className="text-base text-ink-soft">
                    Designing in dialogue with microclimate, natural light, and urban surroundings.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.25}>
                <div className="group border-t border-line/60 pt-5">
                  <p className="label text-gold mb-1">02 / Material Honesty</p>
                  <p className="text-base text-ink-soft">
                    Utilizing raw stone, warm woods, textured plasters, and refined metals that age gracefully.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.3}>
                <div className="group border-t border-line/60 pt-5">
                  <p className="label text-gold mb-1">03 / Turnkey Integrity</p>
                  <p className="text-base text-ink-soft">
                    Ensuring what is envisioned in 3D is crafted flawlessly on site down to the last millimeter.
                  </p>
                </div>
              </Reveal>
            </div>

            {/* Quick Metrics */}
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8">
              <Reveal delay={0.35}>
                <div>
                  <p className="font-display text-3xl sm:text-4xl text-ink">100+</p>
                  <p className="label text-ink-faint mt-1">Spaces Transformed</p>
                </div>
              </Reveal>
              <Reveal delay={0.4}>
                <div>
                  <p className="font-display text-3xl sm:text-4xl text-gold">100%</p>
                  <p className="label text-ink-faint mt-1">Turnkey Execution</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
