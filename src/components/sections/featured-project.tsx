import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Parallax } from "@/components/motion/parallax";

export function FeaturedProject() {
  const project = projects.find((p) => p.featured) ?? projects[0];
  const cover = project.images[0];

  return (
    // Clips the full-bleed image below: ImageReveal enters at scale 1.08, and
    // with nothing else to contain it that 8% spills past both edges and gives
    // the whole page a horizontal scrollbar until the reveal finishes.
    <section className="overflow-hidden py-28 sm:py-36 lg:py-44">
      <Reveal className="px-5 sm:px-8 lg:px-12">
        <p className="label mx-auto mb-8 max-w-[1600px] text-ink-faint">
          Selected Work — 01
        </p>
      </Reveal>

      <ImageReveal className="mx-auto aspect-[16/10] w-full max-w-[1760px] overflow-hidden sm:aspect-[21/10] lg:aspect-[21/9]">
        <Parallax className="h-full w-full scale-110">
          {cover && (
            <div className="relative h-full w-full">
              <Image
                src={cover.src}
                alt={`${project.title} — ${project.location}`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </div>
          )}
        </Parallax>
      </ImageReveal>

      <div className="mx-auto mt-10 max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex flex-col gap-10 border-t border-line pt-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h3 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-tight text-ink">
                {project.title}
              </h3>
              <p className="label mt-3 text-ink-faint">
                {project.location} — {project.category}
                {project.year ? ` — ${project.year}` : ""}
              </p>
            </div>
            <div className="max-w-md">
              <p className="text-base leading-relaxed text-ink-soft sm:text-lg">
                {project.description}
              </p>
              <Link
                href={`/projects#${project.id}`}
                data-cursor="view"
                data-cursor-label="View"
                className="label mt-6 inline-flex items-center gap-2 text-ink transition-colors hover:text-gold"
              >
                View Project <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
