"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Clip-path + subtle scale reveal for photography entering the viewport,
// matching the hero's load-in language for scroll-triggered imagery.
export function ImageReveal({ children, className, delay = 0 }: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(el, { clipPath: "inset(0% 0% 0% 0%)", scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0% 0% 100% 0%)", scale: 1.08 },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          scale: 1,
          duration: 1.1,
          delay,
          ease: "power4.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        }
      );
    });

    return () => ctx.revert();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
