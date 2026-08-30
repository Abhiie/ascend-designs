import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { Parallax } from "@/components/motion/parallax";
import { ProjectImage } from "@/components/ui/project-image";
import { siteConfig } from "@/lib/site-config";
import { stockImages } from "@/lib/stock-images";

export function FinalCta() {
  return (
    <section className="relative overflow-hidden">
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
      {/* Dark cinematic overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(12,11,9,0.78) 0%, rgba(12,11,9,0.55) 60%, rgba(12,11,9,0.72) 100%)",
        }}
      />

      <div className="relative z-10 px-6 py-40 sm:px-12 sm:py-52 lg:px-20 lg:py-64">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            {/* Label */}
            <div className="mb-10 flex items-center gap-5">
              <span className="h-px w-10 bg-gold/50" />
              <p className="label text-gold/70">Start a Project</p>
            </div>

            {/* Heading */}
            <h2 className="max-w-4xl font-display text-[clamp(2.75rem,7vw,6.5rem)] font-light leading-[1.0] text-white">
              Let&rsquo;s design something{" "}
              <em className="italic text-gold">timeless.</em>
            </h2>

            {/* CTAs */}
            <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6">
              <a
                href="#contact-details"
                data-cursor="cta"
                className="btn-shimmer label inline-flex items-center gap-3 px-8 py-4 text-[#0c0b09] transition-opacity hover:opacity-90"
              >
                Start a Project <span aria-hidden>→</span>
              </a>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="cta"
                className="label text-white/70 underline underline-offset-4 transition-colors hover:text-gold"
              >
                WhatsApp Us
              </a>
            </div>
          </Reveal>

          {/* Contact details */}
          <Reveal delay={0.15}>
            <div
              id="contact-details"
              className="mt-24 border-t border-white/15 pt-12 sm:mt-28"
            >
              <div className="flex flex-col gap-1 text-white/70">
                <p className="font-display text-2xl text-white">{siteConfig.founder}</p>
                <p className="label text-gold/60">Founder &amp; Principal Architect</p>
              </div>
              <div className="mt-6 flex flex-col gap-2 text-sm sm:flex-row sm:gap-8">
                <a href={siteConfig.phoneHref} className="text-white/60 transition-colors hover:text-gold">
                  {siteConfig.phone}
                </a>
                <a href={`mailto:${siteConfig.email}`} className="text-white/60 transition-colors hover:text-gold">
                  {siteConfig.email}
                </a>
                <span className="text-white/40">{siteConfig.shortLocation}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
