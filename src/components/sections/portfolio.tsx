"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ProjectImage } from "@/components/ui/project-image";
import { Reveal } from "@/components/motion/reveal";
import { projects, filterCategories, type ProjectCategory } from "@/data/projects";

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">("all");
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  const filtered = activeFilter === "all"
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  /* ── Drag-to-scroll on the track ── */
  function onMouseDown(e: React.MouseEvent) {
    if (!trackRef.current) return;
    setIsDragging(false);
    dragStart.current = { x: e.clientX, scrollLeft: trackRef.current.scrollLeft };
    trackRef.current.style.cursor = "grabbing";

    function onMove(ev: MouseEvent) {
      if (!trackRef.current) return;
      const dx = ev.clientX - dragStart.current.x;
      if (Math.abs(dx) > 4) setIsDragging(true);
      trackRef.current.scrollLeft = dragStart.current.scrollLeft - dx;
    }
    function onUp() {
      if (trackRef.current) trackRef.current.style.cursor = "grab";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    }
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative overflow-hidden py-28 sm:py-36 lg:py-44"
    >
      {/* Section number */}
      <span
        aria-hidden
        className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 select-none font-display text-[22vw] leading-none text-white/[0.025]"
      >
        02
      </span>

      <div className="relative mx-auto max-w-[1600px] px-6 sm:px-12 lg:px-20">
        {/* Header row */}
        <Reveal>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-6 flex items-center gap-5">
                <span className="h-px w-10 bg-gold/50" />
                <p className="label text-gold/80">Portfolio</p>
              </div>
              <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.05] text-ink">
                Selected Works
              </h2>
            </div>
            <Link
              href="/projects"
              className="label inline-flex shrink-0 items-center gap-2 border border-line-strong px-5 py-3 text-ink-soft transition-colors hover:border-gold/50 hover:text-gold"
            >
              View All Projects <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>

        {/* Filter tabs */}
        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap gap-2 border-b border-line pb-8">
            {filterCategories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveFilter(cat.value)}
                className={`label rounded-none px-5 py-2 text-[0.625rem] transition-colors ${
                  activeFilter === cat.value
                    ? "bg-gold text-[#0c0b09]"
                    : "border border-line text-ink-soft hover:border-gold/40 hover:text-gold"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Horizontal scrollable track */}
      <div
        ref={trackRef}
        className="mt-12 flex cursor-grab gap-4 overflow-x-auto pb-4 pl-6 sm:pl-12 lg:pl-20"
        style={{ scrollbarWidth: "none" }}
        onMouseDown={onMouseDown}
      >
        {filtered.map((project, i) => (
          <article
            key={project.id}
            className="group relative flex-shrink-0"
            style={{ width: "clamp(280px, 32vw, 480px)" }}
          >
            {/* Image */}
            <div className="relative aspect-[3/4] overflow-hidden">
              <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                <ProjectImage
                  label={project.coverImage}
                  tone={project.tone}
                  src={project.image}
                  sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 80vw"
                  className="h-full w-full"
                />
              </div>
              {/* Overlay on hover */}
              <div className="pointer-events-none absolute inset-0 bg-[#0c0b09]/0 transition-[background-color] duration-500 group-hover:bg-[#0c0b09]/25" />
              {/* Index badge */}
              <span className="absolute left-4 top-4 font-display text-4xl font-light text-white/20">
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>

            {/* Caption */}
            <div className="mt-5 flex items-start justify-between gap-4 pr-4">
              <div>
                <p className="label text-ink-faint">
                  {project.location} &nbsp;·&nbsp; {project.year}
                </p>
                <h3 className="mt-2 font-display text-2xl font-light text-ink transition-colors group-hover:text-gold sm:text-3xl">
                  {project.title}
                </h3>
                <p className="label mt-2 text-ink-faint">{project.category}</p>
              </div>
              <span
                aria-hidden
                className="mt-1 shrink-0 text-ink-faint transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-gold"
              >
                →
              </span>
            </div>
          </article>
        ))}

        {/* End spacer */}
        <div className="flex-shrink-0 w-6 sm:w-12 lg:w-20" />
      </div>

      {/* Drag hint */}
      <div className="mt-6 flex items-center gap-3 px-6 sm:px-12 lg:px-20">
        <span className="label text-ink-faint">Drag to explore</span>
        <span className="h-px flex-1 max-w-[80px] bg-line" />
      </div>
    </section>
  );
}
