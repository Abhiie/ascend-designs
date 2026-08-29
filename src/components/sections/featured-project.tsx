import { projects } from "@/data/projects";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Parallax } from "@/components/motion/parallax";
import { ProjectImage } from "@/components/ui/project-image";

export function FeaturedProject() {
  const project = projects.find((p) => p.featured) ?? projects[0];

  return (
    <section className="relative overflow-hidden">
      {/* Full-bleed image */}
      <ImageReveal className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[21/10] lg:aspect-[21/9]">
        <Parallax className="h-full w-full scale-110">
          <ProjectImage
            label={project.coverImage}
            tone={project.tone}
            src={project.image}
            className="h-full w-full"
          />
        </Parallax>
        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(12,11,9,0.92) 0%, rgba(12,11,9,0.3) 40%, transparent 70%)",
          }}
        />

        {/* Overlaid project info */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-10 sm:px-12 lg:px-20">
          <Reveal>
            <p className="label mb-4 text-gold/70">Selected Work — 01</p>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <h3 className="font-display text-[clamp(2rem,5vw,4.5rem)] font-light leading-[1.0] text-ink">
                {project.title}
              </h3>
              <div className="lg:text-right">
                <p className="label text-ink-soft">
                  {project.location} &nbsp;·&nbsp; {project.category} &nbsp;·&nbsp; {project.year}
                </p>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft/70 lg:max-w-sm">
                  {project.description}
                </p>
                <a
                  href="#projects"
                  data-cursor="view"
                  data-cursor-label="View"
                  className="label mt-5 inline-flex items-center gap-2 text-gold transition-opacity hover:opacity-70"
                >
                  View Project <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </ImageReveal>
    </section>
  );
}
