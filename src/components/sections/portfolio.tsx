"use client";

import { useMemo, useState } from "react";
import { filterCategories, projects, type ProjectCategory, type ProjectLayout } from "@/data/projects";
import { Reveal } from "@/components/motion/reveal";
import { ProjectImage } from "@/components/ui/project-image";

const LAYOUT_CLASSES: Record<ProjectLayout, string> = {
  horizontal: "lg:col-span-7",
  portrait: "lg:col-span-5 lg:mt-16",
  full: "lg:col-span-12",
  compact: "lg:col-span-4",
};

const ASPECT_CLASSES: Record<ProjectLayout, string> = {
  horizontal: "aspect-[4/3]",
  portrait: "aspect-[3/4]",
  full: "aspect-[21/9]",
  compact: "aspect-[4/5]",
};

export function Portfolio() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const filtered = useMemo(
    () => (active === "all" ? projects : projects.filter((p) => p.category === active)),
    [active]
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

        <div className="grid grid-cols-1 gap-x-4 gap-y-14 lg:grid-cols-12 lg:gap-y-20">
          {filtered.map((project, i) => (
            <article
              key={project.id}
              data-cursor="view"
              data-cursor-label="View"
              className={`group ${LAYOUT_CLASSES[project.layout]}`}
            >
              <Reveal delay={(i % 4) * 0.06}>
                <div
                  className={`relative overflow-hidden ${ASPECT_CLASSES[project.layout]}`}
                >
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]">
                    <ProjectImage
                      label={project.coverImage}
                      tone={project.tone}
                      src={project.image}
                      className="h-full w-full"
                    />
                  </div>
                </div>
                <div className="mt-5 flex items-start justify-between gap-4">
                  <div>
                    <p className="label text-ink-faint">
                      {String(i + 1).padStart(2, "0")} — {project.location}
                    </p>
                    <h3 className="mt-2 font-display text-2xl text-ink transition-colors group-hover:text-gold sm:text-3xl">
                      {project.title}
                    </h3>
                    <p className="label mt-2 text-ink-faint">
                      {project.category} · {project.year}
                    </p>
                  </div>
                  <span
                    aria-hidden
                    className="label mt-1 shrink-0 text-ink transition-transform duration-300 ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </Reveal>
            </article>
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
