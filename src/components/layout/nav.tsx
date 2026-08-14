"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navLinks, siteConfig } from "@/lib/site-config";
import { useTheme } from "@/components/providers/theme-provider";
import { useDesign } from "@/components/providers/design-provider";
import { ThemeSwitch } from "@/components/ui/theme-switch";
import { DesignSwitch } from "@/components/ui/design-switch";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme } = useTheme();
  const { design } = useDesign();

  const isHomePage = pathname === "/";
  // At the top of the Home page the bar floats over the dark hero photograph.
  // The editorial hero has no photograph behind it, so light-on-dark would put
  // white text on a white ground — it only applies to the classic design.
  const onDark = isHomePage && design === "classic" && !scrolled && !menuOpen;

  useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b transition-[padding,background-color] duration-500"
      style={{
        borderColor: onDark ? "rgba(255,255,255,0.14)" : "var(--line)",
        backgroundColor: onDark ? "transparent" : "var(--surface)",
        backdropFilter: onDark ? "none" : "blur(8px)",
      }}
    >
      <div
        className={`mx-auto flex max-w-[1600px] items-center justify-between px-5 transition-[padding] duration-500 sm:px-8 lg:px-12 ${
          scrolled ? "py-3" : "py-5 sm:py-7"
        }`}
      >
        <Link href="/" className="relative z-10 block h-8 w-[132px] sm:h-9 sm:w-[148px]">
          <Image
            src={
              onDark || theme === "dark" ? "/ascend-logo-dark.png" : "/ascend-logo.png"
            }
            alt="Ascend Designs"
            fill
            priority
            sizes="148px"
            className="object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`label transition-colors hover:text-gold ${
                  isActive
                    ? "text-gold font-medium"
                    : onDark
                    ? "text-white/80"
                    : "text-ink-soft"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <DesignSwitch tone={onDark ? "light" : "default"} />
          <ThemeSwitch tone={onDark ? "light" : "default"} />
          <Link
            href="/contact"
            className={`label flex items-center gap-2 border px-4 py-2.5 transition-colors hover:border-gold hover:text-gold ${
              onDark ? "border-white/35 text-white" : "border-line-strong text-ink"
            }`}
          >
            Start a Project <span aria-hidden>→</span>
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[5px] lg:hidden"
        >
          <span
            className={`h-px w-6 transition-transform duration-300 ${
              onDark ? "bg-white" : "bg-ink"
            } ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-6 transition-transform duration-300 ${
              onDark ? "bg-white" : "bg-ink"
            } ${menuOpen ? "-translate-y-[3px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-0 flex flex-col justify-between bg-surface px-6 pt-24 pb-10 transition-opacity duration-400 lg:hidden ${
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {navLinks.map((link, i) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-line py-5 font-display text-4xl transition-colors ${
                  isActive ? "text-gold" : "text-ink hover:text-gold"
                }`}
                style={{ transitionDelay: menuOpen ? `${i * 40}ms` : "0ms" }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex flex-col gap-6">
          <DesignSwitch />
          <div className="flex items-center justify-between">
            <ThemeSwitch />
            <a href={siteConfig.phoneHref} className="label text-ink-soft">
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

