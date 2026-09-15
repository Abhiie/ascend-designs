"use client";

import { useEffect } from "react";
import { getLenis } from "@/components/providers/smooth-scroll-provider";

// Scrolls to the element matching the URL hash on mount — i.e. when a
// Link like `/#services` lands on this page fresh from another route.
// Routed through Lenis (not native `scrollIntoView`) so it doesn't fight
// Lenis's own scroll state, and retried briefly since the intro loader
// can delay layout settling and Lenis's init on a first visit.
export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = hash.slice(1);

    function attemptScroll() {
      const el = document.getElementById(id);
      if (!el) return false;
      const lenis = getLenis();
      if (lenis) {
        lenis.scrollTo(el, { offset: 0 });
      } else {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return true;
    }

    if (attemptScroll()) return;
    const interval = setInterval(() => {
      if (attemptScroll()) clearInterval(interval);
    }, 150);
    const timeout = setTimeout(() => clearInterval(interval), 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return null;
}
