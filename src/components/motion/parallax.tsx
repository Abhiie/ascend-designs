"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  /** Fraction of the element's own height it drifts across the scroll range. */
  speed?: number;
}

// Wrap an oversized image (e.g. scale-110/115 on the child) in this so it has
// room to drift without exposing empty edges — the outer element must clip.
export function Parallax({ children, className, speed = 0.08 }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -speed * 50 },
        {
          yPercent: speed * 50,
          ease: "none",
          scrollTrigger: {
            trigger: el.parentElement ?? el,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
