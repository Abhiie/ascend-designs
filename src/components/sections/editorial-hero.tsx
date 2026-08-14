"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { useIsReady } from "@/components/loader/loader";
import { siteConfig } from "@/lib/site-config";

const HEADLINE_LINES = ["Designing spaces", "with intention."];

const DISCIPLINES = [
  "Architecture",
  "Interior Design",
  "Turnkey Projects",
  "AD Living",
];

const ANIMATED_SELECTOR =
  "[data-eh-label], [data-eh-line], [data-eh-sub], [data-eh-cta], [data-eh-meta], [data-eh-rule]";

/**
 * The editorial design's hero: no photograph, the type carries the whole
 * frame. Deliberately shares the classic hero's motion language — masked line
 * reveals gated on the loader — so switching designs changes the composition
 * without changing how the site feels in motion.
 */
export function EditorialHero() {
  const rootRef = useRef<HTMLDivElement>(null);
  const isReady = useIsReady();

  // Hidden "from" state via GSAP rather than static classes, so the entrance
  // timeline has nothing to reconcile when it takes over. Setting transforms
  // here (not as inline styles in the markup) keeps the offset owned entirely
  // by yPercent — an inline percentage would be read back as pixels and left
  // behind as a stray `y`.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.set("[data-eh-label]", { opacity: 0, y: 14 });
      gsap.set("[data-eh-line]", { yPercent: 115 });
      gsap.set("[data-eh-sub]", { opacity: 0, y: 16 });
      gsap.set("[data-eh-cta]", { opacity: 0, y: 18 });
      gsap.set("[data-eh-rule]", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-eh-meta]", { opacity: 0, y: 12 });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!isReady) return;
    const root = rootRef.current;
    if (!root) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(ANIMATED_SELECTOR, {
          opacity: 1,
          y: 0,
          yPercent: 0,
          scaleX: 1,
        });
        return;
      }

      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to("[data-eh-label]", { opacity: 1, y: 0, duration: 0.7 }, 0.1)
        .to(
          "[data-eh-line]",
          { yPercent: 0, duration: 1.1, stagger: 0.12, ease: "power4.out" },
          0.25
        )
        .to("[data-eh-sub]", { opacity: 1, y: 0, duration: 0.8 }, 0.9)
        .to("[data-eh-cta]", { opacity: 1, y: 0, duration: 0.7 }, 1.05)
        .to("[data-eh-rule]", { scaleX: 1, duration: 0.9, ease: "power2.inOut" }, 1.1)
        .to("[data-eh-meta]", { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 1.25);
    }, root);

    return () => ctx.revert();
  }, [isReady]);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-between px-5 pt-32 pb-10 sm:px-8 sm:pt-40 lg:px-12"
    >
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-center">
        <p data-eh-label className="label text-ink-faint">
          {siteConfig.shortLocation}
        </p>

        <h1 className="mt-10 font-display text-[clamp(2.5rem,9vw,8.5rem)] leading-[0.95] text-ink">
          {HEADLINE_LINES.map((line) => (
            <span key={line} className="block overflow-hidden pb-[0.06em]">
              <span data-eh-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:mt-16 lg:grid-cols-12 lg:items-end">
          <p
            data-eh-sub
            className="max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg lg:col-span-6"
          >
            An Ahmedabad studio working across architecture, interiors and
            turnkey execution — one team from first sketch to final handover,
            so the idea that starts the project is the one that survives it.
          </p>

          <div data-eh-cta className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <Link
              href="/contact"
              data-cursor="cta"
              className="label group inline-flex items-center gap-3 bg-ink px-9 py-4 text-surface transition-colors duration-300 hover:bg-gold"
            >
              Get In Touch
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px]">
        <span data-eh-rule className="mt-16 block h-px w-full bg-line-strong" />
        <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-3">
          {DISCIPLINES.map((discipline, i) => (
            <li key={discipline} data-eh-meta className="label flex items-baseline gap-3">
              <span className="text-gold">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-ink-soft">{discipline}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
