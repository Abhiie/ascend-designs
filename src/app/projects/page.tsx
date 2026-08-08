import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Portfolio } from "@/components/sections/portfolio";
import { Architecture } from "@/components/sections/architecture";
import { Interiors } from "@/components/sections/interiors";
import { AdLiving } from "@/components/sections/ad-living";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Selected Projects | ${siteConfig.name}`,
  description:
    "Explore our portfolio of luxury residential villas, contemporary apartments, commercial spaces, and custom furniture crafted across Ahmedabad and Gujarat.",
};

export default function ProjectsPage() {
  return (
    <main className="flex-1 pt-24 sm:pt-32">
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28 bg-surface border-b border-line">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="label mb-4 text-gold">Selected Portfolio</p>
            <h1 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.05] text-ink max-w-4xl">
              Architectural forms & tailored interior landscapes.
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-ink-soft max-w-2xl leading-relaxed">
              Every project is an exploration of light, proportion, material depth, and seamless execution.
            </p>
          </Reveal>
        </div>
      </section>

      <Portfolio />
      <Architecture />
      <Interiors />
      <AdLiving />
      <FinalCta />
    </main>
  );
}
