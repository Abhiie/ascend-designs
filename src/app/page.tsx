import { Hero } from "@/components/sections/hero";
import { StudioIntro } from "@/components/sections/studio-intro";
import { ArchitectSpotlight } from "@/components/sections/architect-spotlight";
import { FeaturedProject } from "@/components/sections/featured-project";
import { Portfolio } from "@/components/sections/portfolio";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { LocationMap } from "@/components/ui/location-map";
import { InstagramWall } from "@/components/sections/instagram-wall";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <StudioIntro />
      <ArchitectSpotlight />
      <FeaturedProject />
      <Portfolio />
      <Services />
      <Testimonials />
      <Faq limit={4} />
      <LocationMap />
      <InstagramWall />
      <FinalCta />
    </main>
  );
}
