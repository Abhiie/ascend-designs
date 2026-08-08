import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { ProjectImage } from "@/components/ui/project-image";
import { stockImages } from "@/lib/stock-images";

const ARTICLES = [
  {
    category: "Materials",
    title: "The Art of Materials",
    tone: 0 as const,
    image: stockImages.materialOak,
  },
  {
    category: "Light",
    title: "Designing with Natural Light",
    tone: 2 as const,
    image: stockImages.adLivingTextile,
  },
  {
    category: "Texture",
    title: "The Role of Texture",
    tone: 3 as const,
    image: stockImages.materialLinen,
  },
  {
    category: "Design",
    title: "Space and Function",
    tone: 1 as const,
    image: stockImages.interiors,
  },
];

export function Journal() {
  return (
    <section id="journal" className="px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="label mb-8 text-ink-faint">The Journal</p>
          <h2 className="max-w-2xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink">
            Notes on design.
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-line">
          {ARTICLES.map((article, i) => {
            const reversed = i % 2 === 1;
            return (
              <Reveal key={article.title}>
                <article
                  data-cursor="view"
                  data-cursor-label="Read"
                  className="group grid grid-cols-1 gap-6 border-b border-line py-10 sm:py-12 lg:grid-cols-12 lg:items-center lg:gap-10"
                >
                  <div
                    className={`lg:col-span-5 ${
                      reversed ? "lg:order-2 lg:col-start-8" : "lg:col-start-1"
                    }`}
                  >
                    <ImageReveal className="aspect-[16/10] w-full overflow-hidden">
                      <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.025]">
                        <ProjectImage
                          label={`${article.title} — journal feature`}
                          tone={article.tone}
                          src={article.image}
                          className="h-full w-full"
                        />
                      </div>
                    </ImageReveal>
                  </div>

                  <div
                    className={`lg:col-span-6 ${
                      reversed ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"
                    }`}
                  >
                    <p className="label text-ink-faint">
                      {String(i + 1).padStart(2, "0")} — {article.category}
                    </p>
                    <h3 className="mt-4 font-display text-3xl text-ink transition-colors duration-300 group-hover:text-gold sm:text-4xl">
                      {article.title}
                    </h3>
                    <span className="label mt-6 inline-flex items-center gap-2 text-ink transition-transform duration-300 group-hover:translate-x-1">
                      Read <span aria-hidden>→</span>
                    </span>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
