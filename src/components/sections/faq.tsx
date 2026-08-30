"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

export interface FaqItem {
  question: string;
  answer: string;
  category: "Services" | "Turnkey" | "Process" | "Pricing & Location";
}

export const FAQS: FaqItem[] = [
  {
    category: "Services",
    question: "What core services does Ascend Designs offer?",
    answer:
      "We specialize in four key pillars: Architectural Planning, Luxury Interior Design, Turnkey Project Execution, and AD Living (custom bespoke furniture & decor). Whether you require a ground-up architectural build or a complete luxury apartment interior, we manage the entire spectrum under one roof.",
  },
  {
    category: "Turnkey",
    question: "What is included in your Turnkey Execution service?",
    answer:
      "Our turnkey model handles everything between the initial 3D visualization and handing you the keys. This includes complete working drawings, structural coordination, material sourcing (marbles, wood, metals), vendor management, site supervision, quality audits, and white-glove installation.",
  },
  {
    category: "Pricing & Location",
    question: "Where is Ascend Designs located, and do you take projects outside Ahmedabad?",
    answer:
      `Our main studio is located at ${siteConfig.location}. While the majority of our projects are based in Ahmedabad, Gandhinagar, and surrounding hubs across Gujarat, we regularly accept select high-end residential and commercial assignments across India.`,
  },
  {
    category: "Process",
    question: "Who leads the architectural design and site supervision?",
    answer:
      `All architectural concepts and master layouts are directly spearheaded by Principal Architect ${siteConfig.founder}. Our dedicated project managers and site engineers ensure that every detail envisioned on paper is translated accurately on site.`,
  },
  {
    category: "Turnkey",
    question: "How long does a typical interior or architectural project take?",
    answer:
      "A complete interior transformation for a 3–4 BHK residence typically requires 3 to 5 months. Full-scale architectural construction with turnkey interior completion ranges between 10 to 16 months depending on built-up area and site complexity.",
  },
  {
    category: "Pricing & Location",
    question: "How does Ascend Designs structure project fees?",
    answer:
      "Design services are billed as a fixed transparent fee based on project scope and sq. ft. area. For Turnkey projects, execution estimates are fully itemized with open specification sheets—giving you total clarity on material grades and labour costs prior to sign-off.",
  },
  {
    category: "Process",
    question: "Can we consult with you for renovations or spatial redesigns?",
    answer:
      "Yes. Renovation projects often reveal unique character. We assess structural safety, reconfigure floorplans for optimal light and airflow, and upgrade existing spaces into contemporary architectural statements.",
  },
  {
    category: "Services",
    question: "What is AD Living?",
    answer:
      "AD Living is our custom furniture and decor design division. Rather than using off-the-shelf catalog pieces, we design and manufacture custom sofas, dining tables, panelling, and lighting fixtures tailored specifically to your home's spatial dimensions.",
  },
];

export function Faq({ limit }: { limit?: number }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = ["All", "Services", "Turnkey", "Process", "Pricing & Location"];

  const filteredFaqs = FAQS.filter((item) => {
    const matchesCategory = activeCategory === "All" || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedFaqs = limit ? filteredFaqs.slice(0, limit) : filteredFaqs;

  return (
    <section id="faq" className="px-5 py-24 sm:px-8 sm:py-32 lg:px-12 lg:py-36 bg-surface">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Header & Filter Controls */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label mb-4 text-gold">Clear Answers</p>
              <h2 className="font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.08] text-ink">
                Frequently Asked Questions
              </h2>
              <p className="mt-6 text-base leading-relaxed text-ink-soft max-w-sm">
                Have questions before starting your project? Explore common inquiries below or connect directly with our team.
              </p>
            </Reveal>

            {/* Search Box */}
            <Reveal delay={0.1}>
              <div className="mt-8">
                <label htmlFor="faq-search" className="sr-only">
                  Search questions
                </label>
                <input
                  id="faq-search"
                  type="text"
                  placeholder="Search questions (e.g. Turnkey, Fees, Address)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-surface-muted border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </Reveal>

            {/* Category Filter Pills */}
            {!limit && (
              <Reveal delay={0.15}>
                <div className="mt-6 flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setActiveCategory(cat);
                        setOpenIndex(0);
                      }}
                      className={`label text-xs px-3.5 py-2 border transition-colors ${
                        activeCategory === cat
                          ? "border-gold text-gold bg-gold/5"
                          : "border-line text-ink-soft hover:border-line-strong hover:text-ink"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.2}>
              <div className="mt-10 pt-8 border-t border-line">
                <p className="label text-ink-faint mb-2">Still have questions?</p>
                <a
                  href={siteConfig.whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  className="label inline-flex items-center gap-2 border-b border-line-strong pb-1 text-ink transition-colors hover:border-gold hover:text-gold"
                >
                  Ask Principal Architect Ashish Prajapati <span aria-hidden>→</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Accordion Questions */}
          <div className="lg:col-span-7 lg:col-start-6">
            {displayedFaqs.length === 0 ? (
              <div className="py-12 border-t border-b border-line text-center">
                <p className="text-ink-soft">No questions matched &ldquo;{searchQuery}&rdquo;.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("All");
                  }}
                  className="label mt-4 text-gold underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {displayedFaqs.map((faq, i) => {
                  const open = openIndex === i;
                  return (
                    <Reveal key={faq.question} y={18}>
                      <div
                        className={`relative overflow-hidden rounded-sm border bg-surface transition-colors duration-500 ${
                          open ? "border-gold/40 bg-surface-muted" : "border-line hover:border-line-strong"
                        }`}
                      >
                        {/* Accent edge, matching the panel treatment elsewhere on the page */}
                        <span
                          className="pointer-events-none absolute inset-y-0 left-0 w-[3px] bg-gold transition-opacity duration-500"
                          style={{ opacity: open ? 1 : 0 }}
                        />

                        <h3>
                          <button
                            type="button"
                            onClick={() => setOpenIndex(open ? null : i)}
                            aria-expanded={open}
                            aria-controls={`faq-panel-${i}`}
                            className="group flex w-full items-start justify-between gap-6 px-6 py-6 text-left"
                          >
                            <span
                              className={`font-display text-xl leading-snug transition-colors duration-300 sm:text-2xl ${
                                open ? "text-gold" : "text-ink group-hover:text-gold"
                              }`}
                            >
                              {faq.question}
                            </span>
                            <span
                              aria-hidden
                              className="relative mt-2 h-3 w-3 shrink-0"
                            >
                              <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-gold" />
                              <span
                                className={`absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gold transition-transform duration-400 ease-out ${
                                  open ? "scale-y-0" : "scale-y-100"
                                }`}
                              />
                            </span>
                          </button>
                        </h3>

                        <div
                          id={`faq-panel-${i}`}
                          className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                          }`}
                        >
                          <div className="overflow-hidden">
                            <p
                              className="max-w-2xl px-6 pb-6 text-base leading-relaxed text-ink-soft transition-all duration-500 sm:pr-8"
                              style={{
                                opacity: open ? 1 : 0,
                                transform: open ? "translateY(0)" : "translateY(6px)",
                                transitionDelay: open ? "150ms" : "0ms",
                              }}
                            >
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
