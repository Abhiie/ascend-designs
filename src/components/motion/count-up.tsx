"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Custom renderer for the animating number, e.g. currency grouping.
   * Defaults to `${rounded}${suffix}`. */
  format?: (rounded: number) => string;
}

// Animates a number from 0 up to `value` once it scrolls into view.
// Re-runs (and animates again) whenever `value` changes while already
// on screen, so it also works as a live-updating figure, not just a
// one-time scroll reveal.
export function CountUp({ value, suffix = "", duration = 1.8, className, format }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const render = format ?? ((rounded: number) => `${rounded}${suffix}`);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = render(value);
      return;
    }

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: value,
        duration,
        ease: "power2.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = render(Math.round(counter.val));
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix, duration]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <span ref={ref} className={className}>
      {render(0)}
    </span>
  );
}
