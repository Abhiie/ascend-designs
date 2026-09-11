import { Services } from "@/components/sections/services";
import { TurnkeyProcess } from "@/components/sections/turnkey-process";

export const metadata = {
  title: "Services | Ascend Designs – Architecture, Interiors & Turnkey",
  description:
    "Explore our comprehensive design services including architectural design, luxury interiors, turnkey execution, commercial spaces, and renovation projects.",
};

export default function ServicesPage() {
  return (
    <main className="flex-1">
      <Services />
      <TurnkeyProcess />
    </main>
  );
}
