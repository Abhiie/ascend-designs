"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { Reveal } from "@/components/motion/reveal";

/**
 * PLACEHOLDER FIGURES — these are plausible stand-ins, not the studio's real
 * numbers. Swap `value` and `suffix` for Ascend's actual record before this
 * goes live; a metrics band that overstates a practice is worse than none.
 */
const STATS = [
  {
    value: 8,
    suffix: "+",
    label: "Years in practice",
    note: "Building in and around Ahmedabad since the studio opened its doors.",
  },
  {
    value: 120,
    suffix: "+",
    label: "Projects delivered",
    note: "Residential, commercial and hospitality work taken from brief to handover.",
  },
  {
    value: 40,
    suffix: "+",
    label: "Trusted partners",
    note: "Fabricators, contractors and suppliers we've worked with long enough to vouch for.",
  },
  {
    value: 98,
    suffix: "%",
    label: "Client satisfaction",
    note: "Measured on handover, across every turnkey project we've closed.",
  },
];

export function Stats() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-stat-value]")
    );
    if (nodes.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      nodes.forEach((node) => {
        node.textContent = node.dataset.statValue ?? "";
      });
      return;
    }

    const ctx = gsap.context(() => {
      nodes.forEach((node) => {
        const target = Number(node.dataset.statValue ?? 0);
        const counter = { value: 0 };
        let lastShown = -1;

        // Rewind to zero now rather than in the tween: the markup ships the
        // final figure so it survives with JS off, and leaving it there until
        // the trigger fires would show the number snap back before counting.
        node.textContent = "0";

        gsap.to(counter, {
          value: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 88%", once: true },
          onUpdate: () => {
            const next = Math.round(counter.value);
            if (next === lastShown) return;
            lastShown = next;
            node.textContent = String(next);
          },
        });
      });
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="border-y border-line px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="label mb-8 text-ink-faint">By the Numbers</p>
          <h2 className="max-w-2xl font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.05] text-ink">
            A practice measured in delivery.
          </h2>
        </Reveal>

        <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-12 border-t border-line pt-12 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <Reveal key={stat.label} y={20} delay={(i % 4) * 0.08}>
              <div className="flex flex-col">
                <dd className="flex items-baseline font-display text-[clamp(3rem,6vw,5rem)] leading-none text-ink">
                  {/* Starts at the target so it still reads correctly with JS
                      off; the effect above rewinds it to 0 before counting. */}
                  <span data-stat-value={stat.value} className="tabular-nums">
                    {stat.value}
                  </span>
                  <span className="text-gold">{stat.suffix}</span>
                </dd>
                <span aria-hidden className="mt-6 block h-px w-12 bg-gold" />
                <dt className="label mt-6 text-ink">{stat.label}</dt>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
                  {stat.note}
                </p>
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
