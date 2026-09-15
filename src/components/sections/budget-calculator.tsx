"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { CountUp } from "@/components/motion/count-up";
import {
  finishTiers,
  AREA_MIN,
  AREA_MAX,
  AREA_DEFAULT,
  AREA_STEP,
} from "@/data/budget-calculator";

const inr = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

// Rounds to the nearest ₹5,000 so the figure reads as an estimate,
// not a falsely precise quote.
function roundEstimate(value: number) {
  return Math.round(value / 5000) * 5000;
}

export function BudgetCalculator() {
  const [area, setArea] = useState(AREA_DEFAULT);
  const [tierId, setTierId] = useState(finishTiers[1].id);

  const tier = finishTiers.find((t) => t.id === tierId) ?? finishTiers[0];
  const minEstimate = useMemo(() => roundEstimate(area * tier.minRatePerSqft), [area, tier]);
  const maxEstimate = useMemo(() => roundEstimate(area * tier.maxRatePerSqft), [area, tier]);

  return (
    <>
      <Reveal>
        <p className="label mb-8 text-ink-faint">Turnkey Budget Calculator</p>
        <h1 className="max-w-2xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink">
          Estimate your investment.
        </h1>
        <p className="mt-5 max-w-xl text-ink-soft">
          Set your area and finish level for an instant, indicative range — then get an exact,
          itemized quote from our team.
        </p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Inputs */}
          <div className="flex flex-col gap-10">
            {/* Area */}
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="area" className="label text-ink-soft">
                  Built-up Area
                </label>
                <span className="font-display text-2xl text-ink">
                  {area.toLocaleString("en-IN")}
                  <span className="ml-1 text-sm text-ink-faint">sq.ft.</span>
                </span>
              </div>
              <input
                id="area"
                type="range"
                min={AREA_MIN}
                max={AREA_MAX}
                step={AREA_STEP}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="mt-4 h-1.5 w-full cursor-pointer accent-gold"
              />
              <div className="mt-2 flex justify-between text-xs text-ink-faint">
                <span>{AREA_MIN.toLocaleString("en-IN")} sq.ft.</span>
                <span>{AREA_MAX.toLocaleString("en-IN")} sq.ft.</span>
              </div>
            </div>

            {/* Finish tier */}
            <div>
              <p className="label text-ink-soft">Finish Level</p>
              <div className="mt-4 flex flex-col gap-3">
                {finishTiers.map((t) => {
                  const active = t.id === tierId;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setTierId(t.id)}
                      className={`relative border px-5 py-4 text-left transition-colors duration-300 ${
                        active ? "border-gold bg-surface-muted" : "border-line hover:border-line-strong"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className={`font-display text-lg ${active ? "text-gold" : "text-ink"}`}>
                            {t.label}
                          </p>
                          <p className="mt-1 text-xs text-ink-faint">{t.tagline}</p>
                        </div>
                        <p className="label shrink-0 text-right text-ink-soft">
                          ₹{t.minRatePerSqft.toLocaleString("en-IN")}–{t.maxRatePerSqft.toLocaleString("en-IN")}
                          <span className="mt-0.5 block text-[0.5625rem] text-ink-faint">/ sq.ft.</span>
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Output */}
          <div className="h-fit border border-gold/30 bg-surface p-8 sm:p-10">
            <p className="label text-gold/80">Estimated Turnkey Investment</p>
            <p className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">
              <CountUp value={minEstimate} duration={0.6} format={(n) => `₹${inr.format(n)}`} />
              <span className="text-ink-faint"> – </span>
              <CountUp value={maxEstimate} duration={0.6} format={(n) => `₹${inr.format(n)}`} />
            </p>
            <p className="mt-6 text-sm leading-relaxed text-ink-soft">
              Indicative only, based on typical {tier.label.toLowerCase()}-tier turnkey execution
              for {area.toLocaleString("en-IN")} sq.ft. Final pricing depends on site conditions,
              material selection and design complexity — get a precise, itemized quote from our
              team.
            </p>
            <Link
              href="/contact"
              className="label mt-8 flex w-full items-center justify-center gap-2 bg-ink py-4 text-center text-surface transition-colors duration-300 hover:bg-gold hover:text-black"
            >
              Get an Exact Quote <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
