import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Parallax } from "@/components/motion/parallax";
import { ProjectImage } from "@/components/ui/project-image";
import { stockImages } from "@/lib/stock-images";

export function AdLiving() {
  return (
    <section
      className="px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44"
      style={{
        backgroundColor: "color-mix(in srgb, var(--accent-wood) 10%, var(--surface))",
      }}
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-16 max-w-2xl sm:mb-20">
          <Reveal>
            <p className="label mb-8 text-ink-faint">AD Living</p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.02] text-ink">
              Beyond the space.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              Customized furniture and decor designed to belong to the
              space — joinery, textiles and detail, made specifically for
              the room they sit in.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <ImageReveal className="aspect-[16/11] w-full overflow-hidden lg:col-span-7">
            <Parallax className="h-full w-full scale-110">
              <ProjectImage
                label="AD Living — custom oak joinery"
                tone={0}
                src={stockImages.adLivingJoinery}
                className="h-full w-full"
              />
            </Parallax>
          </ImageReveal>
          <div className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-cols-1">
            <ImageReveal delay={0.08} className="aspect-[4/5] w-full">
              <ProjectImage
                label="AD Living — hand-finished textiles"
                tone={1}
                src={stockImages.adLivingTextile}
                className="h-full w-full"
              />
            </ImageReveal>
            <ImageReveal delay={0.16} className="aspect-[4/5] w-full">
              <ProjectImage
                label="AD Living — decor and material detail"
                tone={3}
                src={stockImages.adLivingDecor}
                className="h-full w-full"
              />
            </ImageReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
