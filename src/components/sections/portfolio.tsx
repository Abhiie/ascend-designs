"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  filterCategories,
  projects,
  type Project,
  type ProjectCategory,
  type ProjectImage,
} from "@/data/projects";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Parallax } from "@/components/motion/parallax";

/**
 * Column span rhythm for a gallery. Nearly all the source photography is 16:9,
 * so the variety has to come from how wide each frame is rather than from its
 * shape — a uniform grid of identical renders reads like a contact sheet.
 * Portraits are forced narrow so they never stretch across the full measure.
 */
function spanFor(image: ProjectImage, index: number) {
  const isPortrait = image.height > image.width;
  if (isPortrait) return "lg:col-span-4";

  switch (index % 6) {
    case 0:
      return "lg:col-span-12";
    case 1:
    case 2:
      return "lg:col-span-6";
    case 3:
      return "lg:col-span-7";
    case 4:
      return "lg:col-span-5";
    default:
      return "lg:col-span-12";
  }
}

function GalleryFrame({
  image,
  index,
  title,
}: {
  image: ProjectImage;
  index: number;
  title: string;
}) {
  const isWide = index % 6 === 0 || index % 6 === 5;

  return (
    <figure className={`col-span-1 ${spanFor(image, index)}`}>
      <ImageReveal className="w-full overflow-hidden">
        {/* Real intrinsic dimensions drive the box, so nothing reflows as the
            images decode and the scroll triggers keep their measurements. */}
        <Parallax className="h-full w-full" speed={isWide ? 0.05 : 0.09}>
          <div
            className="relative w-full"
            style={{ aspectRatio: `${image.width} / ${image.height}` }}
          >
            <Image
              src={image.src}
              alt={`${title} — view ${index + 1}`}
              fill
              sizes={
                isWide
                  ? "(min-width: 1024px) 92vw, 100vw"
                  : "(min-width: 1024px) 46vw, 100vw"
              }
              className="object-cover"
            />
          </div>
        </Parallax>
      </ImageReveal>
    </figure>
  );
}

function ProjectChapter({ project, index }: { project: Project; index: number }) {
  return (
    <article
      id={project.id}
      className="scroll-mt-28 border-t border-line pt-12 sm:pt-16 lg:pt-20"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
        {/* Sticky spine — the chapter number and title stay with the gallery
            as it scrolls past, so you always know whose work you're looking at. */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <p className="label flex items-baseline gap-4 text-ink-faint">
                <span className="font-display text-5xl leading-none text-gold sm:text-6xl">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>
                  {project.category === "commercial" ? "Commercial" : "Residential"}
                  {project.year ? ` · ${project.year}` : ""}
                </span>
              </p>

              <h3 className="mt-6 font-display text-[clamp(2rem,3.5vw,3.25rem)] leading-[1.05] text-ink">
                {project.title}
              </h3>

              <p className="label mt-4 text-ink-faint">{project.location}</p>

              <p className="mt-6 max-w-sm text-base leading-relaxed text-ink-soft">
                {project.description}
              </p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {project.services.map((service) => (
                  <li
                    key={service}
                    className="label border border-line px-3 py-1.5 text-[0.5625rem] text-ink-soft"
                  >
                    {service}
                  </li>
                ))}
              </ul>

              <p className="label mt-7 text-ink-faint">
                {project.images.length} Photographs
              </p>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-12">
            {project.images.map((image, i) => (
              <GalleryFrame
                key={image.src}
                image={image}
                index={i}
                title={project.title}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Portfolio() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
  );

  const totalPhotos = useMemo(
    () => filtered.reduce((n, p) => n + p.images.length, 0),
    [filtered]
  );

  return (
    <section id="projects" className="px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-col gap-10 sm:mb-20 sm:flex-row sm:items-end sm:justify-between">
          <Reveal>
            <p className="label mb-6 text-ink-faint">Selected Work</p>
            <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink">
              The Portfolio
            </h2>
            <p className="label mt-6 text-ink-faint">
              {filtered.length} Projects · {totalPhotos} Photographs
            </p>
          </Reveal>

          <nav aria-label="Filter projects" className="flex flex-wrap gap-x-6 gap-y-3">
            {filterCategories.map((f) => {
              const isActive = active === f.value;
              return (
                <button
                  key={f.value}
                  type="button"
                  onClick={() => setActive(f.value)}
                  aria-pressed={isActive}
                  className={`label relative pb-1.5 transition-colors ${
                    isActive ? "text-ink" : "text-ink-faint hover:text-ink"
                  }`}
                >
                  {f.label}
                  <span
                    aria-hidden
                    className="absolute inset-x-0 -bottom-px h-px origin-left bg-gold transition-transform duration-400 ease-out"
                    style={{ transform: isActive ? "scaleX(1)" : "scaleX(0)" }}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-col gap-24 sm:gap-32 lg:gap-40">
          {filtered.map((project, i) => (
            <ProjectChapter key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-20 text-center text-ink-faint">
            No projects in this category yet.
          </p>
        )}
      </div>
    </section>
  );
}
