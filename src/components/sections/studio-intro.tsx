import { Reveal } from "@/components/motion/reveal";

export function StudioIntro() {
  return (
    <section id="studio" className="px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <Reveal>
            <p className="label mb-8 text-ink-faint">The Studio</p>
            <h2 className="max-w-2xl font-display text-[clamp(2.25rem,5vw,4.25rem)] italic leading-[1.08] text-ink">
              Thoughtful design begins with understanding.
            </h2>
          </Reveal>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-4 lg:col-start-9 lg:mt-20">
          <Reveal delay={0.1}>
            <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
              At Ascend Designs, we blend creativity, functionality and
              attention to detail to create spaces that reflect the people
              who experience them.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
              From architecture and interiors to complete turnkey execution,
              every project is approached with intention, precision and a
              deep understanding of space.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
