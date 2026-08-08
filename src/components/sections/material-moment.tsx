import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { ProjectImage } from "@/components/ui/project-image";
import { stockImages } from "@/lib/stock-images";

const MATERIALS = [
  { label: "Oak Grain", tone: 0 as const, offset: false, image: stockImages.materialOak },
  {
    label: "Travertine Surface",
    tone: 2 as const,
    offset: true,
    image: stockImages.materialTravertine,
  },
  { label: "Linen Texture", tone: 3 as const, offset: false, image: stockImages.materialLinen },
  {
    label: "Sunlit Plaster",
    tone: 1 as const,
    offset: true,
    image: stockImages.materialPlaster,
  },
];

export function MaterialMoment() {
  return (
    <section className="border-y border-line bg-surface-alt px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 max-w-2xl sm:mb-20">
          <Reveal>
            <p className="label mb-8 text-ink-faint">Materials</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-[1.02] tracking-tight text-ink">
              Materials
              <br />
              Matter.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              We believe the character of a space is found in the details —
              the grain of wood, the texture of stone, the movement of
              light.
            </p>
          </Reveal>
        </div>

        <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {MATERIALS.map((material, i) => (
            <div
              key={material.label}
              className={`w-[72%] shrink-0 sm:w-[46%] lg:w-auto ${
                material.offset ? "lg:mt-16" : ""
              }`}
            >
              <ImageReveal delay={i * 0.08} className="aspect-[3/4] w-full">
                <ProjectImage
                  label={material.label}
                  tone={material.tone}
                  src={material.image}
                  className="h-full w-full"
                />
              </ImageReveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
