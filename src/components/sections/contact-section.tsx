import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig } from "@/lib/site-config";

export function ContactSection() {
  return (
    <section
      id="contact"
      className="border-t border-line bg-surface px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: Contact information & direct actions */}
          <div className="lg:col-span-5">
            <Reveal>
              <p className="label mb-3 text-gold">Get In Touch</p>
              <h2 className="mb-6 font-display text-3xl text-ink sm:text-4xl">
                Let&rsquo;s discuss your space and vision.
              </h2>
              <p className="mb-8 text-base leading-relaxed text-ink-soft">
                Whether you are planning a new architectural build or
                redesigning an existing space, we would love to learn more
                about your project requirements.
              </p>
            </Reveal>

            <div className="mb-8 flex flex-col border-t border-line">
              {[
                { label: "Studio Address", content: <p className="text-base font-medium leading-snug text-ink">{siteConfig.location}</p> },
                { label: "Phone Inquiry", content: <a href={siteConfig.phoneHref} className="font-display text-lg text-ink transition-colors hover:text-gold">{siteConfig.phone}</a> },
                { label: "Email Inquiry", content: <a href={`mailto:${siteConfig.email}`} className="text-base text-ink transition-colors hover:text-gold">{siteConfig.email}</a> },
                { label: "Instagram", content: <a href={siteConfig.instagramHref} target="_blank" rel="noopener noreferrer" className="text-base text-gold hover:underline">{siteConfig.instagramHandle}</a> },
              ].map((row, i) => (
                <Reveal key={row.label} delay={0.1 + i * 0.06}>
                  <div className="group relative border-b border-line py-4 pl-4">
                    <span className="pointer-events-none absolute inset-y-0 left-0 w-[2px] scale-y-0 bg-gold transition-transform duration-300 group-hover:scale-y-100" />
                    <p className="label mb-1 text-xs text-ink-faint">{row.label}</p>
                    {row.content}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.36}>
              <div className="flex flex-wrap gap-4">
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group label inline-flex items-center gap-2 border border-gold bg-gold/10 px-6 py-3.5 text-gold transition-all hover:bg-gold hover:text-black"
                >
                  Chat on WhatsApp{" "}
                  <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </a>
                <a
                  href={siteConfig.phoneHref}
                  className="label inline-flex items-center gap-2 border border-line-strong px-6 py-3.5 text-ink transition-colors hover:border-gold hover:text-gold"
                >
                  Call Office
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right: Contact form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
