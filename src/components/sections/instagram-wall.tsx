"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { ProjectImage } from "@/components/ui/project-image";
import { stockImages } from "@/lib/stock-images";
import { siteConfig } from "@/lib/site-config";
import { InstagramGlyph } from "@/components/ui/icons";
import type { InstagramPost } from "@/app/api/instagram/route";

/* ── Static fallback posts (shown while loading or if API is not configured) ── */
const STATIC_POSTS: {
  caption: string;
  image: string;
  tone: 0 | 1 | 2 | 3;
}[] = [
  { caption: "Oak joinery, hand-finished", image: stockImages.adLivingJoinery, tone: 0 },
  { caption: "Travertine and morning light", image: stockImages.materialTravertine, tone: 2 },
  { caption: "Living room, Residence 01", image: stockImages.interiors, tone: 1 },
  { caption: "Facade study in progress", image: stockImages.architecture, tone: 3 },
  { caption: "Linen, wool, warm neutrals", image: stockImages.materialLinen, tone: 2 },
  { caption: "Detail — brass and stone", image: stockImages.adLivingDecor, tone: 0 },
  { caption: "Plaster wall, afternoon", image: stockImages.materialPlaster, tone: 3 },
  { caption: "Textiles for AD Living", image: stockImages.adLivingTextile, tone: 1 },
];

/* ── Skeleton card shown while loading ── */
function SkeletonCard() {
  return (
    <div className="aspect-square w-full animate-pulse bg-surface-strong" />
  );
}

export function InstagramWall() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingLive, setUsingLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/instagram")
      .then((r) => r.json())
      .then((data: { posts: InstagramPost[] }) => {
        if (cancelled) return;
        if (data.posts && data.posts.length > 0) {
          setPosts(data.posts.slice(0, 8));
          setUsingLive(true);
        }
      })
      .catch(() => {
        // silently fall back to static
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <section
      id="instagram"
      className="border-t border-line px-6 py-28 sm:px-12 sm:py-36 lg:px-20 lg:py-44"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Header */}
        <Reveal>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-8 flex items-center gap-5">
                <span className="h-px w-10 bg-gold/50" />
                <p className="label text-gold/80">Instagram</p>
              </div>
              <h2 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.05] text-ink">
                From the studio.
              </h2>
              {usingLive && (
                <p className="label mt-2 text-[0.5625rem] text-ink-faint">
                  Live feed · {siteConfig.instagramHandle}
                </p>
              )}
            </div>
            <a
              href={siteConfig.instagramHref}
              target="_blank"
              rel="noreferrer"
              data-cursor="cta"
              className="label group inline-flex shrink-0 items-center gap-3 border border-line-strong px-5 py-3 text-ink-soft transition-colors hover:border-gold/50 hover:text-gold"
            >
              <InstagramGlyph className="h-4 w-4" />
              {siteConfig.instagramHandle}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="mt-16 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {loading
            ? /* Skeleton loading state */
              Array.from({ length: 8 }).map((_, i) => (
                <Reveal key={i} y={16} delay={i * 0.04}>
                  <SkeletonCard />
                </Reveal>
              ))
            : usingLive
            ? /* Live Instagram posts */
              posts.map((post, i) => (
                <Reveal key={post.id} y={20} delay={(i % 4) * 0.06}>
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="view"
                    data-cursor-label="Open"
                    className="group relative block"
                    aria-label={post.caption ?? `Instagram post ${i + 1}`}
                  >
                    <ImageReveal className="aspect-square w-full overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={
                          post.media_type === "VIDEO"
                            ? post.thumbnail_url!
                            : post.media_url
                        }
                        alt={post.caption ?? `Post ${i + 1}`}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                        loading="lazy"
                      />
                    </ImageReveal>

                    {/* Hover overlay */}
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0c0b09]/65 opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100">
                      <InstagramGlyph className="h-7 w-7 text-gold" />
                      {post.caption && (
                        <span className="label px-4 text-center text-[0.5625rem] text-ink/80 line-clamp-2">
                          {post.caption}
                        </span>
                      )}
                      {post.media_type === "VIDEO" && (
                        <span className="label text-[0.5rem] text-gold/70">▶ Video</span>
                      )}
                    </div>
                  </a>
                </Reveal>
              ))
            : /* Static fallback */
              STATIC_POSTS.map((post, i) => (
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
                    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0c0b09]/65 opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100">
                      <InstagramGlyph className="h-7 w-7 text-gold" />
                      <span className="label px-4 text-center text-[0.5625rem] text-ink/80">
                        {post.caption}
                      </span>
                    </div>
                  </a>
                </Reveal>
              ))}
        </div>

        {/* Configure notice (only visible in dev when API not set up) */}
        {!loading && !usingLive && (
          <Reveal delay={0.2}>
            <div className="mt-8 border border-dashed border-line p-6 text-center">
              <p className="label text-ink-faint">
                Configure{" "}
                <code className="text-gold">INSTAGRAM_ACCESS_TOKEN</code> or{" "}
                <code className="text-gold">BEHOLD_FEED_ID</code> in{" "}
                <code className="text-gold">.env.local</code> to show the live
                feed.
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
