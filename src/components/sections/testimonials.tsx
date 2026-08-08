"use client";

import { useEffect, useState } from "react";
import { Reveal } from "@/components/motion/reveal";

export interface TestimonialItem {
  id: string;
  category: "Architectural Villa" | "Corporate Workspace" | "Luxury Penthouse" | "Interiors";
  quote: string;
  fullStory: string;
  author: string;
  initials: string;
  role: string;
  project: string;
  location: string;
  rating: number;
  year: string;
  highlights: string[];
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: "review-1",
    category: "Architectural Villa",
    quote:
      "Working with Ashish Prajapati transformed our raw site into an architectural masterpiece. From foundation layout to custom walnut joinery, their turnkey execution was handled with supreme precision.",
    fullStory:
      "We approached Ascend Designs with a 12,000 sq ft plot on SG Highway. Architect Ashish Prajapati created an architectural layout that maximized natural light while maintaining complete private courtyard zoning. Their turnkey team handled stone selection, structural engineering, and interior styling with zero delays.",
    author: "Rajesh & Meera Shah",
    initials: "RS",
    role: "Homeowners",
    project: "The Oakline Villa",
    location: "SG Highway, Ahmedabad",
    rating: 5,
    year: "2024",
    highlights: ["12,000 Sq Ft Built-up", "Custom Walnut Joinery", "Turnkey Handover"],
  },
  {
    id: "review-2",
    category: "Corporate Workspace",
    quote:
      "They understood exactly how we wanted to live and work in this space before we could put it into words. The acoustic balance, travertine accents, and natural light management are extraordinary.",
    fullStory:
      "For our corporate headquarters on Sindhu Bhavan Road, we needed an executive workspace that reflected international luxury without losing warmth. Ascend Designs delivered custom acoustics, Italian travertine panelling, and integrated ergonomic lighting.",
    author: "Vikram Patel",
    initials: "VP",
    role: "Managing Director",
    project: "Meridian Corporate Suite",
    location: "Sindhu Bhavan Road, Ahmedabad",
    rating: 5,
    year: "2024",
    highlights: ["Executive Suite", "Travertine Panelling", "Acoustic Balance"],
  },
  {
    id: "review-3",
    category: "Luxury Penthouse",
    quote:
      "A process that felt deeply considered at every single step. Having one unified studio handle both architectural blueprinting and turnkey contractor work saved us months of coordination.",
    fullStory:
      "Renovating our penthouse in Bodakdev was a complex challenge due to existing load-bearing limits. Ashish Prajapati reconfigured the entire floorplan to create open-plan living areas with panoramic city skyline views.",
    author: "Ananya & Devang Mehta",
    initials: "DM",
    role: "Homeowners",
    project: "Penthouse 402",
    location: "Bodakdev, Ahmedabad",
    rating: 5,
    year: "2023",
    highlights: ["4 BHK Sky Residence", "Panoramic Skylines", "Bespoke Millwork"],
  },
  {
    id: "review-4",
    category: "Interiors",
    quote:
      "AD Living custom furniture pieces elevated our entire living room. Every guest who visits asks about the bespoke marble dining setup and concealed wall panelling.",
    fullStory:
      "Instead of buying imported catalog furniture, Ascend Designs manufactured bespoke sofas, dining tables, and lighting for our home in Ambawadi through their AD Living arm. The craftsmanship is world-class.",
    author: "Dr. Siddharth Joshi",
    initials: "SJ",
    role: "Client",
    project: "Luxury Apartment Interior",
    location: "Ambawadi, Ahmedabad",
    rating: 5,
    year: "2024",
    highlights: ["AD Living Furniture", "Marble Inlay", "Custom Lighting"],
  },
];

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [modalItem, setModalItem] = useState<TestimonialItem | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const categories = ["All", "Architectural Villa", "Corporate Workspace", "Luxury Penthouse", "Interiors"];

  const filteredReviews =
    activeTab === "All"
      ? TESTIMONIALS
      : TESTIMONIALS.filter((item) => item.category === activeTab);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % filteredReviews.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredReviews.length]);

  const current = filteredReviews[index] || TESTIMONIALS[0];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-line bg-surface py-28 sm:py-36 lg:py-44 px-5 sm:px-8 lg:px-12"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Subtle Background Typography Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 font-display text-[20vw] font-bold text-ink/[0.02] select-none"
      >
        REVIEWS
      </div>

      <div className="mx-auto max-w-[1500px] relative z-10">
        {/* Header & Metrics */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
            <div>
              <div className="inline-flex items-center gap-3 border border-gold/40 px-4 py-1.5 mb-4">
                <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                <p className="label text-xs text-gold tracking-widest uppercase">
                  Verified Client Reviews
                </p>
              </div>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink max-w-2xl">
                Endorsements Of Architectural Precision
              </h2>
            </div>

            {/* Metrics Rating Badge */}
            <div className="flex items-center gap-8 border-l-2 border-gold pl-6 py-1">
              <div>
                <p className="font-display text-4xl text-ink font-semibold">4.95 ★</p>
                <p className="label text-xs text-gold mt-1">Average Client Rating</p>
              </div>
              <div className="border-l border-line pl-8">
                <p className="font-display text-4xl text-ink font-semibold">100%</p>
                <p className="label text-xs text-ink-soft mt-1">Turnkey Delivery Rate</p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Category Filters */}
        <Reveal delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-12 border-b border-line pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveTab(cat);
                  setIndex(0);
                }}
                className={`label text-xs px-4 py-2 border transition-all ${
                  activeTab === cat
                    ? "border-gold text-gold bg-gold/5 font-medium"
                    : "border-line text-ink-soft hover:border-line-strong hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Main Featured Testimonial Card */}
        <Reveal delay={0.15}>
          <div className="relative mx-auto max-w-5xl border border-line bg-surface-muted p-8 sm:p-14 md:p-16 shadow-2xl transition-all duration-700">
            {/* Classic Gold Corners */}
            <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-gold" />
            <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-gold" />
            <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-gold" />
            <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-gold" />

            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Category & Rating */}
              <div className="flex items-center gap-3 mb-6">
                <span className="label text-xs text-gold border border-gold/40 px-3 py-1 bg-gold/5">
                  {current.category}
                </span>
                <div className="flex gap-1 text-gold text-base" aria-label="5 out of 5 stars">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <span className="text-xs text-ink-faint border-l border-line pl-3">
                  {current.year}
                </span>
              </div>

              {/* Quote */}
              <blockquote className="min-h-[140px] sm:min-h-[150px] flex items-center justify-center">
                <p className="font-display text-[clamp(1.5rem,3.2vw,2.35rem)] italic leading-[1.38] text-ink transition-opacity duration-500">
                  &ldquo;{current.quote}&rdquo;
                </p>
              </blockquote>

              {/* Highlight Chips */}
              <div className="flex flex-wrap items-center justify-center gap-2 mt-6 mb-8">
                {current.highlights.map((h) => (
                  <span
                    key={h}
                    className="label text-[11px] text-ink-soft bg-surface border border-line px-3 py-1"
                  >
                    ✓ {h}
                  </span>
                ))}
              </div>

              {/* Client Info & Read Full Story Link */}
              <div className="pt-6 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                <div className="flex items-center gap-4 text-left">
                  <div className="h-12 w-12 rounded-full border border-gold/50 bg-gold/10 flex items-center justify-center font-display text-lg text-gold font-medium">
                    {current.initials}
                  </div>
                  <div>
                    <p className="font-display text-xl text-ink font-semibold">{current.author}</p>
                    <p className="label text-xs text-gold">{current.role} — {current.project}</p>
                    <p className="text-xs text-ink-faint">{current.location}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setModalItem(current)}
                  className="label text-xs text-gold hover:underline border border-gold/40 px-4 py-2 bg-gold/5"
                >
                  Read Full Case Story <span aria-hidden>→</span>
                </button>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="mt-10 pt-6 border-t border-line/40 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setIndex((index - 1 + filteredReviews.length) % filteredReviews.length)}
                aria-label="Previous review"
                className="label text-xs inline-flex items-center gap-2 text-ink-soft hover:text-gold transition-colors py-2 px-3 border border-transparent hover:border-line"
              >
                ← Previous
              </button>

              <div className="flex items-center gap-2.5">
                {filteredReviews.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2 transition-all duration-500 rounded-full ${
                      index === i ? "w-8 bg-gold" : "w-2 bg-line-strong hover:bg-ink-soft"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setIndex((index + 1) % filteredReviews.length)}
                aria-label="Next review"
                className="label text-xs inline-flex items-center gap-2 text-ink-soft hover:text-gold transition-colors py-2 px-3 border border-transparent hover:border-line"
              >
                Next →
              </button>
            </div>
          </div>
        </Reveal>

        {/* Grid of Interactive Review Cards */}
        <Reveal delay={0.2}>
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredReviews.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => setIndex(idx)}
                className={`p-6 text-left border cursor-pointer transition-all duration-300 transform hover:-translate-y-1 ${
                  index === idx
                    ? "border-gold bg-gold/5 shadow-lg"
                    : "border-line bg-surface hover:border-line-strong"
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="label text-[10px] text-gold">{item.category}</span>
                  <span className="text-gold text-xs">★★★★★</span>
                </div>
                <p className="text-xs text-ink-soft line-clamp-3 italic mb-4 font-display leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <div className="border-t border-line/50 pt-3 flex items-center justify-between">
                  <p className="text-xs text-ink font-medium">{item.author}</p>
                  <span className="text-[10px] text-ink-faint">{item.location}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Case Story Lightbox Modal */}
      {modalItem && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in"
          onClick={() => setModalItem(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-surface border border-gold/40 p-6 sm:p-10 rounded-sm shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setModalItem(null)}
              className="absolute top-4 right-4 h-8 w-8 border border-line flex items-center justify-center text-ink hover:text-gold hover:border-gold transition-colors text-sm"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <span className="label text-xs text-gold border border-gold/40 px-3 py-1 bg-gold/5">
                {modalItem.category}
              </span>
              <span className="text-xs text-gold">★★★★★</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl text-ink font-semibold mb-2">
              {modalItem.project}
            </h3>
            <p className="text-xs text-ink-faint mb-6">
              Client: {modalItem.author} ({modalItem.role}) • Location: {modalItem.location}
            </p>

            <div className="border-t border-b border-line py-6 mb-6">
              <p className="label text-xs text-gold mb-2">Detailed Case Experience</p>
              <p className="text-sm text-ink-soft leading-relaxed">
                {modalItem.fullStory}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {modalItem.highlights.map((h) => (
                <span key={h} className="label text-xs text-ink bg-surface-muted border border-line px-3 py-1">
                  ✓ {h}
                </span>
              ))}
            </div>

            <div className="text-right">
              <button
                type="button"
                onClick={() => setModalItem(null)}
                className="label bg-ink text-surface px-6 py-2.5 text-xs hover:bg-gold hover:text-black transition-colors"
              >
                Close Story
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
