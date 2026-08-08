import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

export function Philosophy() {
  return (
    <section className="flex min-h-[85svh] flex-col items-center justify-center bg-surface-strong px-5 py-28 text-center sm:px-8">
      <Reveal>
        <p className="font-display text-[clamp(1.75rem,4.5vw,3.5rem)] italic leading-[1.25] text-ink">
          Good design is felt
          <br />
          before it is explained.
        </p>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="mt-14">
          <p className="label text-ink">{siteConfig.name}</p>
          <p className="label mt-3 text-gold">{siteConfig.tagline}</p>
        </div>
      </Reveal>
    </section>
  );
}
