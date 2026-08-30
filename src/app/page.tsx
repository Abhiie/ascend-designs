import { Hero } from "@/components/sections/hero";
// import { RoomWalkthrough } from "@/components/sections/room-walkthrough"; // hidden until video is ready
import { ProjectWall } from "@/components/sections/photo-wall";
import { StudioIntro } from "@/components/sections/studio-intro";
import { FeaturedProject } from "@/components/sections/featured-project";
import { Services } from "@/components/sections/services";
import { Testimonials } from "@/components/sections/testimonials";
import { InstagramWall } from "@/components/sections/instagram-wall";
import { FinalCta } from "@/components/sections/final-cta";

export default function Home() {
  return (
    <main className="flex-1">
      {/* 1. Hero — cinematic dark intro */}
      <Hero />

      {/* 2. 3D Room Walkthrough — hidden until video is finalised */}
      {/* <RoomWalkthrough /> */}

      {/* 3. Project Wall — all real client work */}
      <ProjectWall />

      {/* 4. Brief studio intro */}
      <StudioIntro />

      {/* 5. Featured project */}
      <FeaturedProject />

      {/* 6. What we do */}
      <Services />

      {/* 7. Client voices */}
      <Testimonials />

      {/* 8. Instagram live feed */}
      <InstagramWall />

      {/* 9. Final CTA */}
      <FinalCta />
    </main>
  );
}
