"use client";

import Link from "next/link";
import { navLinks, siteConfig, socialLinks } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-line bg-surface">
      {/* Top section */}
      <div className="mx-auto max-w-[1600px] px-6 py-20 sm:px-12 lg:px-20">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
          {/* Brand col */}
          <div className="lg:col-span-4">
            {/* Logo text */}
            <Link href="/" className="inline-flex items-baseline gap-1">
              <span className="font-display text-2xl font-light tracking-[0.12em] text-ink">
                ASCEND
              </span>
              <span className="font-display text-2xl font-light text-gold">.</span>
            </Link>

            <p className="label mt-2 text-[0.5625rem] tracking-[0.24em] text-gold/60">
              {siteConfig.tagline}
            </p>

            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ink-soft">
              An Ahmedabad-based architecture and interior design studio crafting
              luxury residential and commercial spaces with turnkey execution
              precision.
            </p>

            {/* Founder callout */}
            <div className="mt-8 border-l-2 border-gold/30 pl-5">
              <p className="label text-[0.5625rem] text-ink-faint">Principal Architect</p>
              <p className="font-display text-xl text-ink">{siteConfig.founder}</p>
            </div>
          </div>

          {/* Nav col */}
          <div className="lg:col-span-2 lg:col-start-6">
            <p className="label mb-6 text-ink-soft">Explore</p>
            <nav aria-label="Footer Navigation" className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="label text-[0.625rem] text-ink-faint transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Location col */}
          <div className="lg:col-span-3">
            <p className="label mb-6 text-ink-soft">Studio Location</p>
            <p className="text-sm leading-relaxed text-ink-soft">{siteConfig.location}</p>
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label mt-3 inline-flex items-center gap-1 text-gold/70 transition-colors hover:text-gold"
            >
              View on Maps <span aria-hidden>↗</span>
            </a>
            <div className="mt-6 border-t border-line pt-6">
              <p className="label text-[0.5625rem] text-ink-faint">Studio Hours</p>
              <p className="mt-1 text-sm text-ink-soft">{siteConfig.hours}</p>
            </div>
          </div>

          {/* Contact col */}
          <div className="lg:col-span-3">
            <p className="label mb-6 text-ink-soft">Connect</p>
            <div className="flex flex-col gap-2.5 text-sm text-ink-soft">
              <a href={siteConfig.phoneHref} className="transition-colors hover:text-gold">
                {siteConfig.phone}
              </a>
              <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-gold">
                {siteConfig.email}
              </a>
            </div>

            <p className="label mb-4 mt-8 text-[0.5625rem] text-ink-faint">Follow</p>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-[0.5625rem] text-ink-faint transition-colors hover:text-gold"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-12 lg:px-20">
          <p className="label text-[0.5625rem] text-ink-faint">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="label text-[0.5625rem] text-ink-faint">
            Architecture · Interior Design · Turnkey · Ahmedabad
          </p>
        </div>
      </div>
    </footer>
  );
}
