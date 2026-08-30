"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

interface CountUpProps {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}

// Animates a number from 0 up to `value` once it scrolls into view.
export function CountUp({ value, suffix = "", duration = 1.8, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      el.textContent = `${value}${suffix}`;
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
          el.textContent = `${Math.round(counter.val)}${suffix}`;
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
