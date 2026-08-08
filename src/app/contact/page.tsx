import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { LocationMap } from "@/components/ui/location-map";
import { InstagramWall } from "@/components/sections/instagram-wall";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: `Contact & Studio Location | ${siteConfig.name}`,
  description:
    `Get in touch with Principal Architect Ashish Prajapati at Ascend Designs. Visit our studio at B-545, Money Plant High Street, Sarkhej, Ahmedabad, Gujarat 382470.`,
};

export default function ContactPage() {
  return (
    <main className="flex-1 pt-24 sm:pt-32">
      {/* Header Banner */}
      <section className="px-5 py-16 sm:px-8 sm:py-24 lg:px-12 lg:py-28 bg-surface border-b border-line">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="label mb-4 text-gold">Get In Touch</p>
            <h1 className="font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.05] text-ink max-w-4xl">
              Let&rsquo;s discuss your space and vision.
            </h1>
            <p className="mt-8 text-lg sm:text-xl text-ink-soft max-w-2xl leading-relaxed">
              We welcome inquiries for luxury architectural design, residential & commercial interiors, and full turnkey execution across Ahmedabad and Gujarat.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact Form & Quick Actions Section */}
      <section className="px-5 py-20 sm:px-8 sm:py-28 lg:px-12 lg:py-32 bg-surface">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* Left: Contact Information & Direct Buttons */}
            <div className="lg:col-span-5">
              <Reveal>
                <p className="label text-gold mb-3">Direct Connect</p>
                <h2 className="font-display text-3xl sm:text-4xl text-ink mb-6">
                  Speak Directly With The Studio
                </h2>
                <p className="text-base text-ink-soft leading-relaxed mb-8">
                  Whether you are planning a new architectural build or redesigning an existing space, we would love to learn more about your project requirements.
                </p>

                <div className="flex flex-col gap-5 border-t border-b border-line py-8 mb-8">
                  <div>
                    <p className="label text-xs text-ink-faint mb-1">Studio Address</p>
                    <p className="text-base text-ink font-medium leading-snug">
                      {siteConfig.location}
                    </p>
                  </div>

                  <div>
                    <p className="label text-xs text-ink-faint mb-1">Phone Inquiry</p>
                    <a
                      href={siteConfig.phoneHref}
                      className="text-lg text-ink font-display hover:text-gold transition-colors"
                    >
                      {siteConfig.phone}
                    </a>
                  </div>

                  <div>
                    <p className="label text-xs text-ink-faint mb-1">Email Inquiry</p>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-base text-ink hover:text-gold transition-colors"
                    >
                      {siteConfig.email}
                    </a>
                  </div>

                  <div>
                    <p className="label text-xs text-ink-faint mb-1">Instagram</p>
                    <a
                      href={siteConfig.instagramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base text-gold hover:underline"
                    >
                      {siteConfig.instagramHandle}
                    </a>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <a
                    href={siteConfig.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label inline-flex items-center gap-2 bg-gold/10 border border-gold px-6 py-3.5 text-gold hover:bg-gold hover:text-black transition-all"
                  >
                    Chat on WhatsApp <span aria-hidden>→</span>
                  </a>
                  <a
                    href={siteConfig.phoneHref}
                    className="label inline-flex items-center gap-2 border border-line-strong px-6 py-3.5 text-ink hover:border-gold hover:text-gold transition-colors"
                  >
                    Call Office
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Right: Contact Form Client Component */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Location Map Section */}
      <LocationMap />

      {/* Instagram Feed */}
      <InstagramWall />
    </main>
  );
}
