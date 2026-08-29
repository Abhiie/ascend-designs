import { Reveal } from "@/components/motion/reveal";

export function StudioIntro() {
  return (
    <section
      id="studio"
      className="relative overflow-hidden px-6 py-32 sm:px-12 sm:py-44 lg:px-20 lg:py-56"
    >
      {/* Giant background section number */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-4 top-1/2 -translate-y-1/2 select-none font-display text-[22vw] leading-none text-white/[0.025]"
      >
        01
      </span>

      <div className="relative mx-auto max-w-[1600px]">
        {/* Label row */}
        <Reveal>
          <div className="mb-12 flex items-center gap-5">
            <span className="h-px w-10 bg-gold/50" />
            <p className="label text-gold/80">The Studio</p>
          </div>
        </Reveal>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-10">
          {/* Left: big headline */}
          <div className="lg:col-span-6">
            <Reveal>
              <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] text-ink">
                Thoughtful design{" "}
                <em className="italic text-gold">begins with</em>{" "}
                understanding.
              </h2>
            </Reveal>
          </div>

          {/* Right: body copy + stats */}
          <div className="flex flex-col justify-between gap-10 lg:col-span-5 lg:col-start-8 lg:pt-8">
            <Reveal delay={0.1}>
              <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                At Ascend Designs, we blend creativity, functionality and
                meticulous attention to detail to create spaces that truly
                reflect the people who experience them.
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                From architectural design to interiors and full turnkey
                execution, every project is approached with intention, precision
                and a deep understanding of space, light and material.
              </p>
            </Reveal>

            {/* Horizontal rule + stats */}
            <Reveal delay={0.3}>
              <div className="grid grid-cols-3 gap-6 border-t border-line pt-8">
                {[
                  { num: "100+", label: "Projects" },
                  { num: "8+", label: "Years" },
                  { num: "3", label: "Disciplines" },
                ].map((s) => (
                  <div key={s.label}>
                    <p className="font-display text-3xl font-light text-gold sm:text-4xl">
                      {s.num}
                    </p>
                    <p className="label mt-1 text-ink-faint">{s.label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
