import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Parallax } from "@/components/motion/parallax";
import { ProjectImage } from "@/components/ui/project-image";
import { siteConfig } from "@/lib/site-config";
import { stockImages } from "@/lib/stock-images";

export function FinalCta() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <ImageReveal className="absolute inset-0">
        <Parallax className="h-full w-full scale-110">
          <ProjectImage
            label="Ascend Designs — evening interior in warm light"
            tone={2}
            src={stockImages.finalCta}
            className="h-full w-full"
          />
        </Parallax>
      </ImageReveal>
      <div className="absolute inset-0 bg-[#12100c]/60" />

      <div className="relative z-10 px-5 py-32 sm:px-8 sm:py-44 lg:px-12 lg:py-56">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="label mb-8 text-[#F1EEE7]/70">Start a Project</p>
            <h2 className="max-w-3xl font-display text-[clamp(2.75rem,6vw,5.5rem)] leading-[1.03] text-[#F1EEE7]">
              Let&rsquo;s design something timeless.
            </h2>

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-6">
              <a
                href="#contact-details"
                data-cursor="cta"
                className="label flex items-center gap-2 border border-[#F1EEE7]/40 px-6 py-3.5 text-[#F1EEE7] transition-colors hover:border-gold hover:text-gold"
              >
                Start a Project <span aria-hidden>→</span>
              </a>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="cta"
                className="label text-[#F1EEE7]/80 underline underline-offset-4 transition-colors hover:text-gold"
              >
                WhatsApp Us
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div
              id="contact-details"
              className="mt-20 flex flex-col gap-2 border-t border-[#F1EEE7]/20 pt-10 text-[#F1EEE7]/80 sm:mt-24"
            >
              <p className="font-display text-xl text-[#F1EEE7]">
                {siteConfig.founder}
              </p>
              <p className="label text-[#F1EEE7]/60">Founder</p>
              <div className="mt-4 flex flex-col gap-1.5 text-sm sm:flex-row sm:gap-6">
                <a href={siteConfig.phoneHref} className="hover:text-gold">
                  {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="hover:text-gold">
                  {siteConfig.email}
                </a>
                <span>{siteConfig.location}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
