import { Hero } from "@/components/sections/hero";
import { PhotoWall } from "@/components/sections/photo-wall";
import { StudioIntro } from "@/components/sections/studio-intro";
import { FeaturedProject } from "@/components/sections/featured-project";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { InstagramWall } from "@/components/sections/instagram-wall";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main className="flex-1">
      {/* 1. Hero — cinematic intro */}
      <Hero />

      {/* 2. Photo Wall — CLIENT WORK IS THE PRIORITY */}
      <PhotoWall />

      {/* 3. Brief studio intro — keep it short */}
      <StudioIntro />

      {/* 4. Featured project — one deep-dive */}
      <FeaturedProject />

      {/* 5. Services — what we do */}
      <Services />

      {/* 6. Client voices */}
      <Testimonials />

      {/* 7. Instagram live feed */}
      <InstagramWall />

      {/* 8. CTA */}
      <FinalCta />
    </main>
  );
}
