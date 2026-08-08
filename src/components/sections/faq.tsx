"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site-config";

const FAQS = [
  {
    question: "What services does Ascend Designs offer?",
    answer:
      "Four, and they're designed to overlap: architectural design, interior design, turnkey execution, and AD Living — our custom furniture and decor arm. Most clients come to us for one and end up using two or three, because handing the whole chain to a single studio is what keeps the original idea intact on site.",
  },
  {
    question: "What exactly does a turnkey project include?",
    answer:
      "Everything between the first sketch and the day you walk in with your keys — drawings, material selection, procurement, vendor coordination, site supervision and handover. You hold one conversation with one team rather than refereeing between an architect, a contractor and five suppliers.",
  },
  {
    question: "Do you take on projects outside Ahmedabad?",
    answer:
      `We're based in ${siteConfig.location} and most of our work sits within the city, but we regularly take projects across Gujarat and beyond. For sites further out we agree a site-visit and supervision schedule up front, so execution oversight is written into the plan rather than improvised later.`,
  },
  {
    question: "How long does a project usually take?",
    answer:
      "An interiors-only apartment typically runs three to five months from brief to handover. A full architectural project with turnkey execution is more often nine to eighteen. We give you a phase-by-phase timeline after the first site visit, once we know the scope and the condition of the space.",
  },
  {
    question: "Can you work with an existing home or a renovation?",
    answer:
      "Often the most interesting work. We start by surveying what's already there and deciding honestly what's worth keeping — good structure, good light, good proportion — and what should go. Renovations are costed and phased the same way as new builds.",
  },
  {
    question: "How do you charge?",
    answer:
      "Design work is quoted as a fee against a defined scope; turnkey projects are quoted as design plus execution, with the execution costs itemised so you can see exactly what sits where. The first consultation is free — we'd rather understand the brief properly before either of us commits to numbers.",
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1600px]">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Reveal>
              <p className="label mb-8 text-ink-faint">Questions</p>
              <h2 className="font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink">
                Good to know.
              </h2>
              <p className="mt-8 max-w-sm text-base leading-relaxed text-ink-soft">
                The things people ask before they start. If yours isn&rsquo;t here,
                ask us directly — we answer every enquiry ourselves.
              </p>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="label mt-8 inline-flex items-center gap-2 border-b border-line-strong pb-1 text-ink transition-colors hover:border-gold hover:text-gold"
              >
                Ask a Question <span aria-hidden>→</span>
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <div className="border-t border-line">
              {FAQS.map((faq, i) => {
                const open = openIndex === i;
                return (
                  <Reveal key={faq.question} y={18}>
                    <div className="border-b border-line">
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpenIndex(open ? null : i)}
                          aria-expanded={open}
                          aria-controls={`faq-panel-${i}`}
                          className="group flex w-full items-start justify-between gap-6 py-7 text-left"
                        >
                          <span
                            className={`font-display text-xl leading-snug transition-colors duration-300 sm:text-2xl ${
                              open ? "text-gold" : "text-ink group-hover:text-gold"
                            }`}
                          >
                            {faq.question}
                          </span>
                          {/* Two strokes; the vertical one folds away to make a minus. */}
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

                      {/* 0fr → 1fr animates to the content's natural height
                          without measuring it in JS or capping it with a
                          max-height guess that clips longer answers. */}
                      <div
                        id={`faq-panel-${i}`}
                        className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p
                            className={`max-w-2xl pb-8 text-base leading-relaxed text-ink-soft transition-opacity duration-500 sm:pr-8 ${
                              open ? "opacity-100" : "opacity-0"
                            }`}
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
          </div>
        </div>
      </div>
    </section>
  );
}
