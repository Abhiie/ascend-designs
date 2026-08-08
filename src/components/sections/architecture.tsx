import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Parallax } from "@/components/motion/parallax";
import { ProjectImage } from "@/components/ui/project-image";
import { stockImages } from "@/lib/stock-images";

// A barely-there architectural line drawing — reads as texture, not theme.
function BlueprintLines() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 400"
      className="pointer-events-none absolute -right-10 -top-10 h-[420px] w-[420px] text-ink opacity-[0.05]"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <rect x="40" y="40" width="320" height="320" />
      <line x1="40" y1="160" x2="360" y2="160" />
      <line x1="220" y1="40" x2="220" y2="360" />
      <circle cx="130" cy="260" r="60" />
      <line x1="40" y1="40" x2="0" y2="0" />
      <line x1="360" y1="360" x2="400" y2="400" />
    </svg>
  );
}

export function Architecture() {
  return (
    <section className="overflow-hidden px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <div className="mx-auto grid max-w-[1600px] grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
        <ImageReveal className="aspect-[4/5] w-full overflow-hidden lg:col-span-6">
          <Parallax className="h-full w-full scale-110">
            <ProjectImage
              label="Architecture — concrete and stone facade in daylight"
              tone={2}
              src={stockImages.architecture}
              className="h-full w-full"
            />
          </Parallax>
        </ImageReveal>

        <div className="relative lg:col-span-5 lg:col-start-8">
          <BlueprintLines />
          <Reveal className="relative">
            <p className="label mb-8 text-ink-faint">Architecture</p>
            <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] leading-[1.08] text-ink">
              Form, function, and light.
            </h2>
            <p className="mt-8 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg">
              Architecture is where structure meets experience. Our approach
              balances aesthetics, functionality and context to create
              environments that feel considered from every angle.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
