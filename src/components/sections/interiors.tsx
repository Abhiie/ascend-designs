import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Parallax } from "@/components/motion/parallax";
import { ProjectImage } from "@/components/ui/project-image";
import { stockImages } from "@/lib/stock-images";

const HIGHLIGHTS = [
  "Personalized Design",
  "Space Planning",
  "Material Selection",
  "Lighting",
  "Custom Furniture",
  "Details",
];

export function Interiors() {
  return (
    <section className="bg-surface-alt px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label mb-8 text-ink-faint">Interiors</p>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] text-ink">
              Interiors with character.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              We design interiors around the way people live — balancing
              beauty, comfort, functionality and individuality.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6">
              {HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="label border-t border-line-strong pt-4 text-ink-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <ImageReveal
          delay={0.1}
          className="aspect-[4/5] w-full overflow-hidden lg:col-span-6 lg:col-start-7"
        >
          <Parallax className="h-full w-full scale-110">
            <ProjectImage
              label="Interiors — warm oak joinery and natural textiles"
              tone={1}
              src={stockImages.interiors}
              className="h-full w-full"
            />
          </Parallax>
        </ImageReveal>
      </div>
    </section>
  );
}
