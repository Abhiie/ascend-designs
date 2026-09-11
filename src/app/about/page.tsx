import { ArchitectSpotlight } from "@/components/sections/architect-spotlight";

export const metadata = {
  title: "About | Ascend Designs – Architecture & Interior Design Studio",
  description:
    "Meet Ashish Prajapati, Principal Architect & Founder of Ascend Designs. Learn about our design philosophy, values, and commitment to crafting meaningful spaces.",
};

export default function AboutPage() {
  return (
    <main className="flex-1">
      <ArchitectSpotlight />
    </main>
  );
}
