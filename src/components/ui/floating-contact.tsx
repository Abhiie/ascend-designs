"use client";

import { siteConfig } from "@/lib/site-config";
import { useIsReady } from "@/components/loader/loader";
import { InstagramGlyph, WhatsAppGlyph } from "@/components/ui/icons";

const ACTIONS = [
  {
    label: "Chat on WhatsApp",
    short: "WhatsApp",
    href: siteConfig.whatsappHref,
    Glyph: WhatsAppGlyph,
    // Brand colour is held back until hover, so at rest the pair reads as
    // part of the studio's palette rather than two pasted-on social badges.
    hoverBg: "#25D366",
    hoverFg: "#0b2e18",
  },
  {
    label: `Follow ${siteConfig.instagramHandle} on Instagram`,
    short: "Instagram",
    href: siteConfig.instagramHref,
    Glyph: InstagramGlyph,
    hoverBg: "#C1358B",
    hoverFg: "#ffffff",
  },
] as const;

export function FloatingContact() {
  // Held back through the intro — these sit above the page, and sliding them
  // in only once the doors are open keeps the reveal clean.
  const isReady = useIsReady();

  return (
    <div
      className={`fixed bottom-5 right-4 z-40 flex flex-col gap-3 transition-[opacity,transform] duration-700 ease-out sm:bottom-8 sm:right-6 ${
        isReady
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      {ACTIONS.map(({ label, short, href, Glyph, hoverBg, hoverFg }) => (
        <a
          key={short}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={label}
          data-cursor="cta"
          className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-line-strong bg-surface-strong text-ink shadow-[0_6px_24px_rgba(20,16,12,0.18)] transition-colors duration-300 hover:border-[var(--hover-bg)] hover:bg-[var(--hover-bg)] hover:text-[var(--hover-fg)] sm:h-[52px] sm:w-[52px]"
          style={
            {
              "--hover-bg": hoverBg,
              "--hover-fg": hoverFg,
            } as React.CSSProperties
          }
        >
          <Glyph className="h-[22px] w-[22px]" />

          {/* Desktop-only label; on touch the icon and aria-label carry it. */}
          <span className="label pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-sm border border-line-strong bg-surface-strong px-3 py-2 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:block">
            {short}
          </span>
        </a>
      ))}
    </div>
  );
}
