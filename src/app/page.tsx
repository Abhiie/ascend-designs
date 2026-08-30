import { Hero } from "@/components/sections/hero";
// import { RoomWalkthrough } from "@/components/sections/room-walkthrough"; // hidden until video is ready
import { ProjectWall } from "@/components/sections/photo-wall";
import { ArchitectSpotlight } from "@/components/sections/architect-spotlight";
import { Services } from "@/components/sections/services";
import { TurnkeyProcess } from "@/components/sections/turnkey-process";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { ContactSection } from "@/components/sections/contact-section";
import { LocationMap } from "@/components/ui/location-map";

export default function Home() {
  return (
    <main className="flex-1">
      {/* 1. Hero — cinematic dark intro */}
      <Hero />

      {/* 2. 3D Room Walkthrough — hidden until video is finalised */}
      {/* <RoomWalkthrough /> */}

      {/* 3. Project Wall — all real client work */}
      <ProjectWall />

      {/* 4. About — the architect */}
      <ArchitectSpotlight />

      {/* 5. Services — capabilities & process */}
      <Services />
      <TurnkeyProcess />

      {/* 6. Client voices */}
      <Testimonials />

      {/* 7. FAQ */}
      <Faq />

      {/* 8. Final CTA */}
      <FinalCta />

      {/* 9. Contact — form + studio location */}
      <ContactSection />
      <LocationMap />
    </main>
  );
}
