import { Faq } from "@/components/sections/faq";

export const metadata = {
  title: "FAQ | Ascend Designs – Frequently Asked Questions",
  description:
    "Find answers to common questions about Ascend Designs' architectural services, turnkey process, pricing, timelines, and more.",
};

export default function FaqPage() {
  return (
    <main className="flex-1">
      <Faq />
    </main>
  );
}
