import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ArchitectSpotlight } from "@/components/sections/architect-spotlight";
import { Philosophy } from "@/components/sections/philosophy";
import { WhyAscend } from "@/components/sections/why-ascend";
import { TurnkeyProcess } from "@/components/sections/turnkey-process";
import { LocationMap } from "@/components/ui/location-map";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `About Architect Ashish Prajapati | ${siteConfig.name}`,
  description:
    "Learn more about Principal Architect Ashish Prajapati, the studio philosophy, turnkey execution standards, and architectural design practice at Ascend Designs in Ahmedabad.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-24 sm:pt-32">
      {/* Header Banner */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28 bg-surface border-b border-line">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="label mb-4 text-gold">The Practice & Leadership</p>
            <h1 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.05] text-ink max-w-4xl">
              Architecture rooted in intention, clarity, and human experience.
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-ink-soft max-w-2xl leading-relaxed">
              Founded by Principal Architect {siteConfig.founder}, Ascend Designs combines architectural discipline, bespoke interior design, and turnkey execution precision.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Architect Spotlight */}
      <ArchitectSpotlight />

      {/* Philosophy */}
      <Philosophy />

      {/* Why Ascend */}
      <WhyAscend />

      {/* Turnkey Process */}
      <TurnkeyProcess />

      {/* Location */}
      <LocationMap />

      {/* Final CTA */}
      <FinalCta />
    </main>
  );
}
