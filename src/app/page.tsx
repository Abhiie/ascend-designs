import { Hero } from "@/components/sections/hero";
import { StudioIntro } from "@/components/sections/studio-intro";
import { MaterialMoment } from "@/components/sections/material-moment";
import { FeaturedProject } from "@/components/sections/featured-project";
import { Portfolio } from "@/components/sections/portfolio";
import { Architecture } from "@/components/sections/architecture";
import { Interiors } from "@/components/sections/interiors";
import { Services } from "@/components/sections/services";
import { TurnkeyProcess } from "@/components/sections/turnkey-process";
import { AdLiving } from "@/components/sections/ad-living";
import { WhyAscend } from "@/components/sections/why-ascend";
import { Philosophy } from "@/components/sections/philosophy";
import { Testimonials } from "@/components/sections/testimonials";
import { Journal } from "@/components/sections/journal";
import { Faq } from "@/components/sections/faq";
import { InstagramWall } from "@/components/sections/instagram-wall";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <StudioIntro />
      <MaterialMoment />
      <FeaturedProject />
      <Portfolio />
      <Architecture />
      <Interiors />
      <Services />
      <TurnkeyProcess />
      <AdLiving />
      <WhyAscend />
      <Philosophy />
      <Testimonials />
      <Journal />
      <Faq />
      <InstagramWall />
      <FinalCta />
    </main>
  );
}
