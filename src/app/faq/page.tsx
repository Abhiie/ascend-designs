import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Faq } from "@/components/sections/faq";
import { LocationMap } from "@/components/ui/location-map";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Frequently Asked Questions | ${siteConfig.name}`,
  description:
    "Find clear answers regarding architectural design fees, turnkey project timelines, site supervision, renovations, and studio location in Ahmedabad.",
};

export default function FaqPage() {
  return (
    <main className="flex-1 pt-24 sm:pt-32">
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28 bg-surface border-b border-line">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="label mb-4 text-gold">Clear Transparency</p>
            <h1 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.05] text-ink max-w-4xl">
              Everything you need to know before we begin.
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-ink-soft max-w-2xl leading-relaxed">
              Clear answers regarding design process, turnkey contracts, material specifications, fees, and site supervision.
            </p>
          </Reveal>
        </div>
      </section>

      <Faq />
      <LocationMap />
      <FinalCta />
    </main>
  );
}
