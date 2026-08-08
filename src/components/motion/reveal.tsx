"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
}

// Fades a block up into place the first time it crosses into the viewport.
// Used for text — see ImageReveal for the photography clip-path treatment.
export function Reveal({ children, className, y = 28, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, [y, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
