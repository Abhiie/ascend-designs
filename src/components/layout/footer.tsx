"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { navLinks, siteConfig, socialLinks } from "@/lib/site-config";

const FOOTER_NAV = [
  { label: "Home",     href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/about" },
  { label: "FAQ",      href: "/faq" },
  { label: "Contact",  href: "/contact" },
];

const SERVICES_LIST = [
  "Architecture",
  "Interior Design",
  "3D Visualisation",
  "Turnkey Projects",
  "AD Living",
  "Renovation",
];

export function Footer() {
  const wrapRef    = useRef<HTMLElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx: any;
    (async () => {
      const { gsap }          = await import("@/lib/gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);
      if (!wrapRef.current || !wordmarkRef.current) return;

      ctx = gsap.context(() => {
        // ── Wordmark reveal ──────────────────────────────────────────
        gsap.fromTo(wordmarkRef.current,
          { yPercent: 60, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: {
              trigger: wordmarkRef.current,
              start: "top 90%",
            },
          }
        );

        // ── Staggered column reveal ──────────────────────────────────
        gsap.fromTo(".footer-col",
          { y: 32, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: ".footer-col-grid",
              start: "top 88%",
            },
          }
        );

        // ── Divider line draw ─────────────────────────────────────────
        gsap.fromTo(".footer-line",
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.4,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: ".footer-line",
              start: "top 92%",
            },
          }
        );
      }, wrapRef.current);
    })();
    return () => ctx?.revert();
  }, []);

  return (
    <footer ref={wrapRef} className="bg-[#0a0908]">

      {/* ── Giant editorial wordmark ─────────────────────────────────────── */}
      <div className="overflow-hidden border-t border-white/[0.06] px-4 pt-16 sm:px-8 lg:px-12">
        <div ref={wordmarkRef} style={{ opacity: 0 }}>
          <p className="font-display text-[clamp(4.5rem,13vw,16rem)] font-light leading-[0.9] tracking-tighter text-white/[0.06] select-none">
            ASCEND
          </p>
        </div>
      </div>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[1600px] px-6 pb-20 pt-16 sm:px-8 lg:px-12">
        <div className="footer-col-grid grid grid-cols-1 gap-14 sm:grid-cols-2 lg:grid-cols-12">

          {/* ── Brand col ───────────────────────────────────────────── */}
          <div className="footer-col lg:col-span-4">
            <Link href="/" className="group inline-flex items-baseline gap-0.5">
              <span className="font-display text-[1.75rem] font-light tracking-[0.1em] text-white transition-opacity group-hover:opacity-80">
                ASCEND
              </span>
              <span className="font-display text-[1.75rem] text-gold">.</span>
            </Link>

            <p className="label mt-2 text-[0.5rem] tracking-[0.28em] text-gold/50">
              {siteConfig.tagline}
            </p>

            <p className="mt-7 max-w-[260px] text-sm leading-[1.8] text-white/40">
              An Ahmedabad-based architecture and interior design studio crafting
              luxury spaces with turnkey execution precision.
            </p>

            {/* Founder */}
            <div className="mt-10 flex items-start gap-4 border-l border-gold/25 pl-5">
              <div>
                <p className="label text-[0.5rem] tracking-widest text-white/25">
                  PRINCIPAL ARCHITECT
                </p>
                <p className="mt-1 font-display text-xl font-light text-white/80">
                  {siteConfig.founder}
                </p>
              </div>
            </div>
          </div>

          {/* ── Spacer ──────────────────────────────────────────────── */}
          <div className="hidden lg:col-span-1 lg:block" />

          {/* ── Explore ─────────────────────────────────────────────── */}
          <div className="footer-col lg:col-span-2">
            <p className="label mb-7 text-[0.5rem] tracking-[0.22em] text-white/30">
              EXPLORE
            </p>
            <nav className="flex flex-col gap-3.5">
              {FOOTER_NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center gap-2 text-sm text-white/45 transition-colors duration-300 hover:text-gold"
                >
                  <span className="h-px w-0 bg-gold/60 transition-all duration-300 group-hover:w-4" />
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* ── Services ────────────────────────────────────────────── */}
          <div className="footer-col lg:col-span-2">
            <p className="label mb-7 text-[0.5rem] tracking-[0.22em] text-white/30">
              SERVICES
            </p>
            <ul className="flex flex-col gap-3.5">
              {SERVICES_LIST.map((s) => (
                <li
                  key={s}
                  className="text-sm text-white/40 transition-colors duration-300 hover:text-white/70"
                >
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact ─────────────────────────────────────────────── */}
          <div className="footer-col lg:col-span-3">
            <p className="label mb-7 text-[0.5rem] tracking-[0.22em] text-white/30">
              GET IN TOUCH
            </p>

            <div className="flex flex-col gap-4">
              <a
                href={siteConfig.phoneHref}
                className="group flex items-center gap-3 text-sm text-white/50 transition-colors duration-300 hover:text-gold"
              >
                <span className="label flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 text-[0.5rem] text-white/30 transition-all duration-300 group-hover:border-gold/40 group-hover:text-gold">
                  TEL
                </span>
                {siteConfig.phone}
              </a>

              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-3 text-sm text-white/50 transition-colors duration-300 hover:text-gold"
              >
                <span className="label flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 text-[0.5rem] text-white/30 transition-all duration-300 group-hover:border-gold/40 group-hover:text-gold">
                  ✉
                </span>
                {siteConfig.email}
              </a>

              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-sm text-white/50 transition-colors duration-300 hover:text-gold"
              >
                <span className="label flex h-8 w-8 shrink-0 items-center justify-center border border-white/10 text-[0.5rem] text-white/30 transition-all duration-300 group-hover:border-gold/40 group-hover:text-gold">
                  WA
                </span>
                WhatsApp Us
              </a>
            </div>

            {/* Studio hours */}
            <div className="mt-10 border-t border-white/[0.06] pt-7">
              <p className="label text-[0.5rem] tracking-widest text-white/25">
                STUDIO HOURS
              </p>
              <p className="mt-2 text-sm text-white/45">{siteConfig.hours}</p>
              <p className="mt-0.5 text-sm text-white/30">{siteConfig.shortLocation ?? "Ahmedabad, Gujarat"}</p>
            </div>
          </div>
        </div>

        {/* ── Divider ─────────────────────────────────────────────────────── */}
        <div
          className="footer-line mt-16 h-px origin-left bg-white/[0.06]"
          style={{ scaleX: 0 }}
        />

        {/* ── Bottom bar ──────────────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="label text-[0.5rem] tracking-[0.15em] text-white/20">
            © {new Date().getFullYear()} ASCEND DESIGNS. ALL RIGHTS RESERVED.
          </p>

          {/* Social links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label text-[0.5rem] tracking-[0.18em] text-white/25 transition-colors duration-300 hover:text-gold"
              >
                {s.label.toUpperCase()}
              </a>
            ))}
          </div>

          {/* Tags */}
          <p className="label text-[0.5rem] tracking-[0.12em] text-white/15 hidden sm:block">
            ARCHITECTURE · INTERIORS · TURNKEY
          </p>
        </div>
      </div>
    </footer>
  );
}
