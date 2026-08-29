"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { ThemeSwitch } from "@/components/ui/theme-switch";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  // On the home page at the very top we float over the dark hero — always
  // treat the bar as "on dark" since the site is now dark-first.
  const onDark = true;

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500"
      style={{
        borderBottom: scrolled || !isHomePage ? "1px solid var(--line)" : "1px solid transparent",
        backgroundColor:
          scrolled || !isHomePage
            ? "rgba(12,11,9,0.88)"
            : "transparent",
        backdropFilter: scrolled || !isHomePage ? "blur(12px)" : "none",
      }}
    >
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-[padding] duration-500 sm:px-10 lg:px-16 ${
          scrolled ? "py-3" : "py-5 sm:py-6"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-baseline gap-1">
          <span className="font-display text-xl font-light tracking-[0.12em] text-ink sm:text-2xl">
            ASCEND
          </span>
          <span className="font-display text-xl font-light text-gold sm:text-2xl">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`label text-[0.625rem] tracking-[0.2em] transition-colors hover:text-gold ${
                  isActive ? "text-gold" : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-8 lg:flex">
          <ThemeSwitch tone="light" />
          <Link
            href="/contact"
            className="label inline-flex items-center gap-2 border border-white/20 px-5 py-2.5 text-ink transition-colors hover:border-gold/60 hover:text-gold"
          >
            Start a Project <span aria-hidden>→</span>
          </Link>
        </div>

        {/* Hamburger */}
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-px w-5 bg-ink transition-transform duration-300 ${
              menuOpen ? "translate-y-[3px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-5 bg-ink transition-transform duration-300 ${
              menuOpen ? "-translate-y-[3px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile fullscreen overlay */}
      <div
        className={`fixed inset-0 z-0 flex flex-col justify-between bg-surface px-8 pt-28 pb-12 transition-opacity duration-400 lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col" aria-label="Mobile">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-line py-5 font-display text-[2.5rem] font-light leading-tight transition-colors ${
                  isActive ? "text-gold" : "text-ink hover:text-gold"
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 45}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center justify-between">
          <ThemeSwitch tone="light" />
          <a href={siteConfig.phoneHref} className="label text-ink-faint">
            {siteConfig.phone}
          </a>
        </div>
      </div>
    </header>
  );
}
