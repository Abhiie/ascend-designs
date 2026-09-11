import { ContactSection } from "@/components/sections/contact-section";
import { LocationMap } from "@/components/ui/location-map";

export const metadata = {
  title: "Contact | Ascend Designs – Get In Touch",
  description:
    "Reach out to Ascend Designs for project inquiries, consultations, and collaborations. Visit our studio in Ahmedabad or send us a message.",
};

export default function ContactPage() {
  return (
    <main className="flex-1">
      <ContactSection />
      <LocationMap />
    </main>
  );
}
