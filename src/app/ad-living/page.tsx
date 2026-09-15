import type { Metadata } from "next";
import { AdLivingGallery } from "@/components/sections/ad-living-gallery";
import { BackLink } from "@/components/ui/back-link";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `AD Living | ${siteConfig.name}`,
  description:
    "AD Living — bespoke furniture and curated decor from Ascend Designs, designed and selected to complete a space.",
};

export default function AdLivingPage() {
  return (
    <main className="flex-1 px-5 pb-28 pt-28 sm:px-8 sm:pt-36 lg:px-12 lg:pt-44">
      <div className="mx-auto max-w-[1600px]">
        <BackLink href="/#services" label="Back to Services" />
        <div className="mb-10 flex items-center gap-5">
          <span className="h-px w-10 bg-gold/50" />
          <p className="label text-gold/80">AD Living</p>
        </div>
        <h1 className="mb-14 max-w-2xl font-display text-[clamp(2rem,4.5vw,4rem)] font-light leading-[1.05] text-ink">
          Furniture &amp; Décor
        </h1>
        <AdLivingGallery />
      </div>
    </main>
  );
}
