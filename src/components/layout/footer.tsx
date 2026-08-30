"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { siteConfig, socialLinks } from "@/lib/site-config";

export function Footer() {
  const wrapRef = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const wordmark = wordmarkRef.current;
    if (!wrap || !wordmark) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(wordmark, { yPercent: 0, opacity: 1 });
      gsap.set(".footer-row", { y: 0, opacity: 1 });
      gsap.set(".footer-line", { scaleX: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      // ── Wordmark reveal ──────────────────────────────────────────
      gsap.fromTo(
        wordmark,
        { yPercent: 60, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: wordmark, start: "top 90%" },
        }
      );

      // ── Row reveal ───────────────────────────────────────────────
      gsap.fromTo(
        ".footer-row",
        { y: 22, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".footer-content", start: "top 90%" },
        }
      );

      // ── Divider line draw ────────────────────────────────────────
      gsap.fromTo(
        ".footer-line",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: ".footer-line", start: "top 95%" },
        }
      );
    }, wrap);

    return () => ctx.revert();
  }, []);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer ref={wrapRef} className="border-t border-white/[0.06] bg-[#0a0908]">
      {/* ── Editorial wordmark ───────────────────────────────────────────── */}
      <div className="overflow-hidden px-4 pt-8 sm:px-8 lg:px-12">
        <div ref={wordmarkRef} style={{ opacity: 0 }}>
          <p className="select-none font-display text-[clamp(2.25rem,6vw,4.5rem)] font-light leading-[0.9] tracking-tighter text-white/[0.06]">
            ASCEND
          </p>
        </div>
      </div>

      <div className="footer-content mx-auto max-w-[1600px] px-6 pb-7 pt-5 sm:px-8 lg:px-12">
        {/* ── Brand · Social ───────────────────────────────────────────── */}
        <div className="footer-row flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Link href="/" className="group inline-flex flex-col">
            <span className="inline-flex items-baseline gap-0.5">
              <span className="font-display text-lg font-light tracking-[0.1em] text-white transition-opacity group-hover:opacity-80">
                ASCEND
              </span>
              <span className="font-display text-lg text-gold">.</span>
            </span>
            <span className="label mt-1 text-[0.4375rem] tracking-[0.28em] text-gold/50">
              {siteConfig.tagline}
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-[0.5rem] tracking-[0.18em] text-white/30 transition-colors duration-300 hover:text-gold"
              >
                {s.label.toUpperCase()}
              </a>
            ))}
          </div>
        </div>

        {/* ── Divider ──────────────────────────────────────────────────── */}
        <div
          className="footer-line mt-6 h-px origin-left bg-white/[0.06]"
          style={{ transform: "scaleX(0)" }}
        />

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="footer-row mt-5 flex flex-col-reverse items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="label text-[0.5rem] tracking-[0.15em] text-white/20">
            © {new Date().getFullYear()} ASCEND DESIGNS. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center gap-6">
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-xs text-white/40 transition-colors duration-300 hover:text-gold"
            >
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.phoneHref}
              className="text-xs text-white/40 transition-colors duration-300 hover:text-gold"
            >
              {siteConfig.phone}
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="group flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition-colors duration-300 hover:border-gold/50 hover:text-gold"
            >
              <span
                aria-hidden
                className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5"
              >
                ↑
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
