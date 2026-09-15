"use client";

import { useState } from "react";
import { siteConfig, offices } from "@/lib/site-config";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";

export function LocationMap() {
  const [activeOffice, setActiveOffice] = useState(0);
  const office = offices[activeOffice];

  const mapEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    office.address
  )}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32 bg-surface">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 border-b border-line pb-8">
            <div>
              <p className="label text-gold mb-3">Visit Our Studio</p>
              <h2 className="font-display text-[clamp(2.25rem,4vw,3.75rem)] text-ink">
                Studio Location
              </h2>
            </div>
            <a
              href={office.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group label inline-flex shrink-0 items-center gap-2 border border-line-strong px-5 py-2.5 text-ink transition-colors hover:border-gold hover:text-gold"
            >
              Open in Google Maps{" "}
              <span aria-hidden className="inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                ↗
              </span>
            </a>
          </div>
        </Reveal>

        {/* Office switcher */}
        <Reveal delay={0.04}>
          <div className="mb-10 flex flex-wrap gap-2">
            {offices.map((o, i) => (
              <button
                key={o.id}
                type="button"
                onClick={() => setActiveOffice(i)}
                aria-pressed={activeOffice === i}
                className={`label border px-5 py-2.5 transition-colors duration-300 ${
                  activeOffice === i
                    ? "border-gold text-gold"
                    : "border-line-strong text-ink-soft hover:border-line-strong hover:text-ink"
                }`}
              >
                {o.shortLabel}
              </button>
            ))}
          </div>
        </Reveal>

        <div key={office.id} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          {/* Map Frame */}
          <ImageReveal className="lg:col-span-8 rounded-lg overflow-hidden border border-line min-h-[360px] sm:min-h-[420px] bg-surface-muted relative">
            <iframe
              title={`Ascend Designs — ${office.label}`}
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "360px", filter: "contrast(0.95) saturate(0.9)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </ImageReveal>

          {/* Address Details Box */}
          <div className="lg:col-span-4 flex flex-col justify-between border border-line p-8 sm:p-10 bg-surface">
            <div>
              <Reveal delay={0.1}>
                <p className="label text-gold mb-4">{office.label}</p>
              </Reveal>

              <Reveal delay={0.16}>
                <div className="mb-8">
                  <p className="label text-ink-faint mb-1.5">Full Address</p>
                  <p className="text-base text-ink leading-relaxed font-medium">
                    {office.address}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.22}>
                <div className="mb-8 border-t border-line/60 pt-6">
                  <p className="label text-ink-faint mb-1.5">Direct Contact</p>
                  <p className="text-base text-ink mb-1">
                    Phone:{" "}
                    <a href={siteConfig.phoneHref} className="text-gold hover:underline">
                      {siteConfig.phone}
                    </a>
                  </p>
                  <p className="text-base text-ink">
                    Email:{" "}
                    <a href={`mailto:${siteConfig.email}`} className="text-gold hover:underline">
                      {siteConfig.email}
                    </a>
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.28}>
                <div className="border-t border-line/60 pt-6">
                  <p className="label text-ink-faint mb-1.5">Studio Hours</p>
                  <p className="text-base text-ink">{siteConfig.hours}</p>
                  <p className="text-xs text-ink-soft mt-1">Sundays by prior appointment only</p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.34}>
              <div className="mt-10 border-t border-line pt-6 flex items-center justify-between">
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group label flex items-center gap-2 text-gold hover:underline"
                >
                  Chat on WhatsApp{" "}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href={siteConfig.instagramHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label text-ink-soft transition-colors hover:text-gold"
                >
                  {siteConfig.instagramHandle}
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
