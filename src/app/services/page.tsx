import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { Services } from "@/components/sections/services";
import { TurnkeyProcess } from "@/components/sections/turnkey-process";
import { MaterialMoment } from "@/components/sections/material-moment";
import { AdLiving } from "@/components/sections/ad-living";
import { InstagramWall } from "@/components/sections/instagram-wall";
import { FinalCta } from "@/components/sections/final-cta";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Services & Turnkey Execution | ${siteConfig.name}`,
  description:
    "Discover our end-to-end architectural, interior design, turnkey execution, and bespoke furniture services delivered with white-glove precision in Ahmedabad.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1 pt-24 sm:pt-32">
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28 bg-surface border-b border-line">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="label mb-4 text-gold">Capabilities & Execution</p>
            <h1 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.05] text-ink max-w-4xl">
              End-to-end architectural rigor and turnkey mastery.
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-ink-soft max-w-2xl leading-relaxed">
              We merge four overlapping disciplines to keep your project&rsquo;s vision intact from conceptual sketches to the day you move in.
            </p>
          </Reveal>
        </div>
      </section>

      <Services />
      <TurnkeyProcess />
      <MaterialMoment />
      <AdLiving />
      <InstagramWall />
      <FinalCta />
    </main>
  );
}
