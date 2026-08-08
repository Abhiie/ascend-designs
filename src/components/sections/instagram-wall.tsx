"use client";

import { useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { ImageReveal } from "@/components/motion/image-reveal";
import { ProjectImage } from "@/components/ui/project-image";
import { stockImages } from "@/lib/stock-images";
import { siteConfig } from "@/lib/site-config";
import { InstagramGlyph } from "@/components/ui/icons";

export interface InstagramPost {
  id: string;
  caption: string;
  category: "Architecture" | "Interiors" | "AD Living" | "Materials";
  image: string;
  tone: 0 | 1 | 2 | 3;
  likes: number;
  comments: number;
  date: string;
  featured?: boolean;
}

const POSTS: InstagramPost[] = [
  {
    id: "post-1",
    category: "Interiors",
    caption: "Living room sanctuary at Residence 01 — double-height volume framed in textured limestone.",
    image: stockImages.interiors,
    tone: 1,
    likes: 412,
    comments: 28,
    date: "2 DAYS AGO",
    featured: true,
  },
  {
    id: "post-2",
    category: "Architecture",
    caption: "Facade study in progress — brutalist geometry meets warm timber screening on SG Highway.",
    image: stockImages.architecture,
    tone: 3,
    likes: 389,
    comments: 19,
    date: "4 DAYS AGO",
  },
  {
    id: "post-3",
    category: "AD Living",
    caption: "Oak joinery hand-finished in our AD Living workshop for The Oakline Residence.",
    image: stockImages.adLivingJoinery,
    tone: 0,
    likes: 295,
    comments: 14,
    date: "1 WEEK AGO",
  },
  {
    id: "post-4",
    category: "Materials",
    caption: "Travertine and morning light — selecting stone slabs at the quarry site.",
    image: stockImages.materialTravertine,
    tone: 2,
    likes: 512,
    comments: 42,
    date: "1 WEEK AGO",
  },
  {
    id: "post-5",
    category: "Materials",
    caption: "Linen, wool, and warm neutral textiles curated for penthouse master suite.",
    image: stockImages.materialLinen,
    tone: 2,
    likes: 230,
    comments: 11,
    date: "2 WEEKS AGO",
  },
  {
    id: "post-6",
    category: "AD Living",
    caption: "Detail study — brushed brass inlay seamlessly fitted into honed black granite.",
    image: stockImages.adLivingDecor,
    tone: 0,
    likes: 367,
    comments: 22,
    date: "2 WEEKS AGO",
  },
  {
    id: "post-7",
    category: "Materials",
    caption: "Hand-troweled lime plaster wall reflecting soft afternoon sunlight.",
    image: stockImages.materialPlaster,
    tone: 3,
    likes: 440,
    comments: 31,
    date: "3 WEEKS AGO",
  },
  {
    id: "post-8",
    category: "AD Living",
    caption: "Custom woven textiles and leather details for bespoke lounge seating.",
    image: stockImages.adLivingTextile,
    tone: 1,
    likes: 278,
    comments: 16,
    date: "3 WEEKS AGO",
  },
];

export function InstagramWall() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);

  const categories = ["All", "Architecture", "Interiors", "AD Living", "Materials"];

  const filteredPosts =
    activeCategory === "All"
      ? POSTS
      : POSTS.filter((post) => post.category === activeCategory);

  return (
    <section
      id="instagram"
      className="border-t border-line bg-surface px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36"
    >
      <div className="mx-auto max-w-[1600px]">
        {/* Header & Instagram Profile Info */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-2 w-2 rounded-full bg-gold animate-ping" />
                <p className="label text-gold text-xs tracking-widest uppercase">
                  Live Studio Feed
                </p>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink">
                From The Studio Journal
              </h2>
            </div>

            {/* Profile Badge */}
            <div className="flex items-center gap-4 bg-surface-muted border border-line p-4 sm:p-5 rounded-sm shrink-0">
              <div className="relative h-12 w-12 rounded-full overflow-hidden border border-gold p-0.5">
                <div className="relative h-full w-full rounded-full overflow-hidden">
                  <Image
                    src="/ascend-logo-dark.png"
                    alt="Ascend Designs Instagram"
                    fill
                    className="object-cover bg-black p-1"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <a
                    href={siteConfig.instagramHref}
                    target="_blank"
                    rel="noreferrer"
                    className="font-display text-lg text-ink font-semibold hover:text-gold transition-colors"
                  >
                    {siteConfig.instagramHandle}
                  </a>
                  <span className="text-gold text-xs">✓</span>
                </div>
                <p className="text-xs text-ink-soft">
                  14.8K Followers • 420+ Design Posts
                </p>
              </div>

              <a
                href={siteConfig.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="label ml-2 hidden sm:inline-flex items-center gap-2 bg-ink text-surface px-4 py-2 text-xs hover:bg-gold hover:text-black transition-colors"
              >
                <InstagramGlyph className="h-3.5 w-3.5" />
                Follow
              </a>
            </div>
          </div>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10 border-b border-line pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`label text-xs px-4 py-2 border transition-all ${
                  activeCategory === cat
                    ? "border-gold text-gold bg-gold/5 font-medium"
                    : "border-line text-ink-soft hover:border-line-strong hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPosts.map((post, i) => (
            <Reveal key={post.id} y={24} delay={(i % 4) * 0.06}>
              <div
                onClick={() => setSelectedPost(post)}
                className={`group relative block cursor-pointer overflow-hidden border border-line bg-surface-muted transition-all duration-500 hover:border-gold hover:shadow-xl ${
                  post.featured && activeCategory === "All" ? "sm:col-span-2 sm:row-span-2" : ""
                }`}
              >
                <ImageReveal className="h-full min-h-[300px] sm:min-h-[340px] w-full overflow-hidden">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-105">
                    <ProjectImage
                      label={post.caption}
                      tone={post.tone}
                      src={post.image}
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </ImageReveal>

                {/* Hover Scrim Overlay */}
                <div className="absolute inset-0 flex flex-col justify-between p-6 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 transition-opacity duration-400 ease-out group-hover:opacity-100">
                  <div className="flex items-center justify-between">
                    <span className="label text-[10px] text-gold bg-black/60 px-2.5 py-1 border border-gold/40">
                      {post.category}
                    </span>
                    <InstagramGlyph className="h-5 w-5 text-white" />
                  </div>

                  <div>
                    <p className="text-sm font-display text-white line-clamp-2 leading-snug mb-3">
                      &ldquo;{post.caption}&rdquo;
                    </p>
                    <div className="flex items-center justify-between text-xs text-white/80 border-t border-white/20 pt-3">
                      <span>❤️ {post.likes}</span>
                      <span>💬 {post.comments}</span>
                      <span className="text-[10px] text-gold font-mono">{post.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Bottom Callout */}
        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <a
              href={siteConfig.instagramHref}
              target="_blank"
              rel="noreferrer"
              className="label inline-flex items-center gap-3 border border-line-strong px-6 py-3.5 text-ink hover:border-gold hover:text-gold transition-colors text-xs tracking-wider"
            >
              <InstagramGlyph className="h-4 w-4" />
              Explore All Studio Works On Instagram ({siteConfig.instagramHandle}) <span aria-hidden>↗</span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Lightbox Modal */}
      {selectedPost && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setSelectedPost(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-surface border border-gold/40 p-6 sm:p-8 rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 h-8 w-8 border border-line flex items-center justify-center text-ink hover:text-gold hover:border-gold transition-colors text-sm"
            >
              ✕
            </button>

            <div className="relative aspect-video w-full overflow-hidden border border-line mb-6">
              <ProjectImage
                label={selectedPost.caption}
                tone={selectedPost.tone}
                src={selectedPost.image}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between mb-3">
              <span className="label text-xs text-gold">{selectedPost.category}</span>
              <span className="text-xs text-ink-faint font-mono">{selectedPost.date}</span>
            </div>

            <p className="font-display text-xl text-ink leading-relaxed mb-6">
              &ldquo;{selectedPost.caption}&rdquo;
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-line">
              <div className="flex gap-4 text-xs text-ink-soft">
                <span>❤️ {selectedPost.likes} Likes</span>
                <span>💬 {selectedPost.comments} Comments</span>
              </div>

              <a
                href={siteConfig.instagramHref}
                target="_blank"
                rel="noreferrer"
                className="label text-xs text-gold hover:underline flex items-center gap-1"
              >
                View on Instagram <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
