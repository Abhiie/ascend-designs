import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { ProjectImage } from "@/components/ui/project-image";
import { stockImages } from "@/lib/stock-images";
import { siteConfig } from "@/lib/site-config";
import { InstagramGlyph } from "@/components/ui/icons";

/**
 * A hand-curated grid standing in for the live feed. Swap `POSTS` for real
 * post data (and each `href` for its permalink) once the studio's Instagram
 * is wired up — the layout doesn't care where the images come from.
 */
const POSTS = [
  { caption: "Oak joinery, hand-finished", image: stockImages.adLivingJoinery, tone: 0 as const },
  { caption: "Travertine and morning light", image: stockImages.materialTravertine, tone: 2 as const },
  { caption: "Living room, Residence 01", image: stockImages.interiors, tone: 1 as const },
  { caption: "Facade study in progress", image: stockImages.architecture, tone: 3 as const },
  { caption: "Linen, wool, warm neutrals", image: stockImages.materialLinen, tone: 2 as const },
  { caption: "Detail — brass and stone", image: stockImages.adLivingDecor, tone: 0 as const },
  { caption: "Plaster wall, afternoon", image: stockImages.materialPlaster, tone: 3 as const },
  { caption: "Textiles for AD Living", image: stockImages.adLivingTextile, tone: 1 as const },
];

export function InstagramWall() {
  return (
    <section
      id="instagram"
      className="border-t border-line px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44"
    >
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="label mb-8 text-ink-faint">Instagram</p>
              <h2 className="max-w-2xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink">
                From the studio.
              </h2>
            </div>
            <a
              href={siteConfig.instagramHref}
              target="_blank"
              rel="noreferrer"
              data-cursor="cta"
              className="label group inline-flex shrink-0 items-center gap-3 border border-line-strong px-5 py-3 text-ink transition-colors hover:border-gold hover:text-gold"
            >
              <InstagramGlyph className="h-4 w-4" />
              {siteConfig.instagramHandle}
              <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {POSTS.map((post, i) => (
            <Reveal key={post.caption} y={20} delay={(i % 4) * 0.06}>
              <a
                href={siteConfig.instagramHref}
                target="_blank"
                rel="noreferrer"
                data-cursor="view"
                data-cursor-label="Open"
                className="group relative block"
              >
                <ImageReveal className="aspect-square w-full overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05]">
                    <ProjectImage
                      label={post.caption}
                      tone={post.tone}
                      src={post.image}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="h-full w-full"
                    />
                  </div>
                </ImageReveal>

                {/* Warm scrim + glyph, held back until hover so the grid reads
                    as photography first and a social feed second. */}
                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#14100c]/55 opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100">
                  <InstagramGlyph className="h-7 w-7 text-white" />
                  <span className="label px-4 text-center text-[0.5625rem] text-white/85">
                    {post.caption}
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
