"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useTheme } from "@/components/providers/theme-provider";
import { siteConfig } from "@/lib/site-config";

const TAGLINE_WORDS = siteConfig.tagline.split("|").map((word) => word.trim());

/**
 * Runs before the first paint. Two jobs:
 *
 * 1. Pins the page to the top. Browsers restore the previous scroll offset on
 *    reload, so refreshing mid-page put you back mid-page — the doors would
 *    open onto the middle of the hero. A deep link with a hash is left alone.
 * 2. Locks scrolling, so no scrollbar shows behind the closed doors. The
 *    effect below re-applies this and `finish()` releases it; the failsafe
 *    there guarantees release even if the intro never runs.
 */
export const bootScript = `
(function () {
  try {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (!location.hash) window.scrollTo(0, 0);
  } catch (e) {}
  document.documentElement.style.overflow = "hidden";
  try {
    var style = document.createElement("style");
    style.id = "ascend-hero-hide";
    style.textContent = "[data-hero-eyebrow],[data-hero-char],[data-hero-sub],[data-hero-cta],[data-hero-flap],[data-hero-scroll],[data-hero-frame]{opacity:0 !important;}";
    document.head.appendChild(style);
  } catch (e) {}
})();
`;

const ReadyContext = createContext(false);
const SettledContext = createContext(false);

/** True once the hero may enter — fires while the doors are still swinging. */
export function useIsReady() {
  return useContext(ReadyContext);
}

/**
 * True once the intro is completely over. Anything that costs work on every
 * frame forever after — smooth scroll, the blend-mode cursor — waits for this
 * rather than `useIsReady`, so mounting it doesn't land mid-swing.
 */
export function useIsSettled() {
  return useContext(SettledContext);
}

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [settled, setSettled] = useState(false);

  return (
    <ReadyContext.Provider value={ready}>
      <SettledContext.Provider value={settled}>
        <Loader onDone={() => setReady(true)} onSettled={() => setSettled(true)} />
        {children}
      </SettledContext.Provider>
    </ReadyContext.Provider>
  );
}

/**
 * One half of the doorway that covers the screen while the site loads. The
 * face echoes the Ascend mark — a recessed rectangular panel inside a frame —
 * with a brass pull and a shadow gathered along the inner edge so the closed
 * seam reads as a real gap rather than a CSS join.
 */
function DoorLeaf({ side }: { side: "left" | "right" }) {
  const innerEdge = side === "left" ? "right" : "left";

  return (
    <div
      data-door
      data-door-side={side}
      className="relative h-full w-1/2 will-change-transform bg-[#0c0b09]"
      style={{
        transformOrigin: side === "left" ? "left center" : "right center",
        backfaceVisibility: "hidden",
        backgroundColor: "#0c0b09",
        background: `linear-gradient(${
          side === "left" ? "100deg" : "260deg"
        }, rgba(201,169,110,0.08) 0%, rgba(201,169,110,0) 60%), #0c0b09`,
      }}
    >
      {/* Recessed panels. */}
      <div className="absolute inset-x-[13%] inset-y-[7%] border border-line" />
      <div className="absolute inset-x-[18%] inset-y-[11%] border border-line/60" />

      {/* Brass pull, set just in from the closing edge. Hidden until Act III:
          while the mark is on screen this is simply a surface, and a pair of
          gold bars sitting there from the first frame gives the ending away. */}
      <div
        data-door-handle
        className={`absolute top-1/2 h-24 w-[3px] -translate-y-1/2 rounded-full opacity-0 sm:h-32 ${
          innerEdge === "right" ? "right-[6%]" : "left-[6%]"
        }`}
        style={{
          background:
            "linear-gradient(180deg, rgba(201,169,110,0.15) 0%, var(--accent-gold) 45%, rgba(201,169,110,0.15) 100%)",
        }}
      />

      {/* Shadow pooling at the seam. */}
      <div
        className={`absolute inset-y-0 w-32 ${innerEdge === "right" ? "right-0" : "left-0"}`}
        style={{
          background: `linear-gradient(to ${innerEdge === "right" ? "left" : "right"}, rgba(0,0,0,0.14), transparent)`,
        }}
      />

      {/* Light falls off the face as the leaf swings toward the viewer. */}
      <div data-door-shade className="absolute inset-0 bg-black opacity-0" />
    </div>
  );
}

function Loader({ onDone, onSettled }: { onDone: () => void; onSettled: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const onDoneRef = useRef(onDone);
  const onSettledRef = useRef(onSettled);
  const { theme } = useTheme();

  useEffect(() => {
    onDoneRef.current = onDone;
    onSettledRef.current = onSettled;
  });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    document.documentElement.style.overflow = "hidden";

    /** Hands the page over to the hero, while the doors are still swinging. */
    function finish() {
      if (!window.location.hash) window.scrollTo(0, 0);
      document.documentElement.style.overflow = "";
      try {
        var h = document.getElementById("ascend-hero-hide");
        if (h) h.remove();
      } catch (e) {}
      onDoneRef.current();
    }

    /** Releases the per-frame layers (smooth scroll, cursor) once it's over. */
    function settle() {
      onSettledRef.current();
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(
        "[data-loader-lockup], [data-loader-meter], [data-loader-diamond], [data-door-handle]",
        { opacity: 1 }
      );
      gsap.set("[data-loader-mark], [data-loader-word]", { yPercent: 0 });
      gsap.set("[data-loader-rule], [data-loader-bar]", { scaleX: 1 });
      gsap.to(root, {
        opacity: 0,
        duration: 0.35,
        delay: 0.5,
        onComplete: () => {
          gsap.set(root, { display: "none" });
          finish();
          settle();
        },
      });
      return;
    }

    let timeline: gsap.core.Timeline | undefined;

    const ctx = gsap.context(() => {
      const countEl = countRef.current;
      const counter = { value: 0 };
      let lastShown = -1;

      gsap.set("[data-loader-bar]", { scaleX: 0, transformOrigin: "left center" });
      gsap.set("[data-loader-seam]", { scaleY: 0, transformOrigin: "center center" });

      // The markup hides these with an inline `translateY(110%)` so there is
      // no flash before JS runs — but getComputedStyle hands that back as a
      // pixel matrix, so GSAP banks it as `y: 48.4px` and then animates a
      // *separate* yPercent on top. Zeroing `y` here hands the offset over to
      // yPercent alone; without it the mark animates back to exactly where it
      // started and never leaves its mask.
      gsap.set("[data-loader-mark], [data-loader-word]", { y: 0, yPercent: 110 });

      // The opening beat is held back a third of a second so it does not play
      // into React's hydration burst — every section mounting, every
      // ScrollTrigger measuring, both webfonts swapping in. A GSAP `delay`
      // rides the ticker that is already running, unlike a rAF/promise gate,
      // so there is no way for the timeline to never get started.
      const tl = gsap.timeline({
        delay: 0.3,
        defaults: { ease: "power3.out" },
        onComplete: () => {
          gsap.set(root, { display: "none" });
          settle();
        },
      });
      timeline = tl;

      // ── Act I — the mark settles into place ────────────────────────────
      // Transform and opacity only: a blur filter here looked lovely and cost
      // a full re-raster of the lockup on every frame.
      tl.to("[data-loader-mark]", { yPercent: 0, duration: 1.0, ease: "power4.out" })
        .fromTo(
          "[data-loader-rule]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.inOut" },
          "-=0.5"
        )
        .to(
          "[data-loader-word]",
          { yPercent: 0, duration: 0.75, stagger: 0.12, ease: "power4.out" },
          "-=0.45"
        )
        .fromTo(
          "[data-loader-diamond]",
          { opacity: 0, scale: 0.3 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.12, ease: "power2.out" },
          "<+=0.2"
        )
        // A single pass of gold light travels across the finished wordmark.
        // It starts fully clipped off the left edge, so it can carry full
        // opacity from the first frame without popping into view.
        .fromTo(
          "[data-loader-sheen]",
          { xPercent: -100, opacity: 1 },
          { xPercent: 100, duration: 1.15, ease: "power2.inOut" },
          "-=0.45"
        )

        // ── Act II — the count ───────────────────────────────────────────
        .fromTo(
          "[data-loader-meter]",
          { opacity: 0 },
          { opacity: 1, duration: 0.4 },
          "-=0.95"
        )
        .to("[data-loader-bar]", { scaleX: 1, duration: 1.05, ease: "power1.inOut" }, "<")
        .to(
          counter,
          {
            value: 100,
            duration: 1.05,
            ease: "power1.inOut",
            onUpdate: () => {
              const next = Math.round(counter.value);
              if (!countEl || next === lastShown) return;
              lastShown = next;
              countEl.textContent = String(next).padStart(2, "0");
            },
          },
          "<"
        )

        // ── Act III — the doors open ─────────────────────────────────────
        .to(
          "[data-loader-lockup]",
          { opacity: 0, y: -18, duration: 0.4, ease: "power2.in" },
          "+=0.1"
        )
        // The seam wakes first: a hairline of light down the join, then a
        // warm spill from behind before either leaf actually moves.
        .fromTo(
          "[data-loader-seam]",
          { opacity: 0, scaleY: 0 },
          { opacity: 1, scaleY: 1, duration: 0.5, ease: "power2.out" },
          "-=0.3"
        )
        // The pulls surface at the same moment — the surface becomes a door.
        .fromTo(
          "[data-door-handle]",
          { opacity: 0 },
          { opacity: 1, duration: 0.55, ease: "power2.out" },
          "<"
        )
        .fromTo(
          "[data-loader-halo]",
          { opacity: 0 },
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          "<"
        )
        // Opacity only — the glow is a viewport-sized radial gradient, and
        // scaling it would repaint that gradient every frame.
        .fromTo(
          "[data-loader-glow]",
          { opacity: 0 },
          { opacity: 1, duration: 0.65, ease: "power2.out" },
          "-=0.25"
        )
        .to(
          "[data-door-side='left']",
          { rotateY: -104, xPercent: -8, duration: 1.25, ease: "power3.inOut" },
          "-=0.15"
        )
        .to(
          "[data-door-side='right']",
          { rotateY: 104, xPercent: 8, duration: 1.25, ease: "power3.inOut" },
          "<"
        )
        .to("[data-door-shade]", { opacity: 0.55, duration: 0.9, ease: "power2.in" }, "<")
        .to("[data-loader-seam], [data-loader-halo]", { opacity: 0, duration: 0.45 }, "<")
        .to("[data-loader-glow]", { opacity: 0, duration: 0.9, ease: "power2.in" }, "<+=0.35")
        // Hand off early so the hero rises into the widening gap rather than
        // waiting for the leaves to finish clearing the frame.
        .call(finish, undefined, "-=0.95");
    }, root);

    // The loader is a full-screen overlay that locks scrolling, so it must
    // never be able to strand the page. If the timeline hasn't even started
    // well past its natural length, tear the whole thing down by hand.
    const failsafe = window.setTimeout(() => {
      if (timeline && timeline.progress() > 0) return;
      timeline?.kill();
      gsap.set(root, { display: "none" });
      finish();
      settle();
    }, 8000);

    return () => {
      window.clearTimeout(failsafe);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[200] overflow-hidden"
    >
      {/* Warm light waiting behind the doors. */}
      <div
        data-loader-glow
        className="absolute inset-0 opacity-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 75% at 50% 50%, rgba(201,169,110,0.45) 0%, rgba(160,120,80,0.18) 40%, transparent 72%)",
        }}
      />

      <div className="absolute inset-0 flex" style={{ perspective: "2200px" }}>
        <DoorLeaf side="left" />
        <DoorLeaf side="right" />
      </div>

      {/* The join itself, lit from behind. The halo is a separate gradient
          rather than a box-shadow on the hairline — a blurred shadow would
          have to be re-rasterised on every frame the hairline scales. */}
      <div
        data-loader-halo
        className="absolute inset-y-0 left-1/2 w-40 -translate-x-1/2 opacity-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(201,169,110,0.35) 50%, transparent 100%)",
        }}
      />
      <div
        data-loader-seam
        className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 opacity-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, var(--accent-gold) 18%, #e8c98a 50%, var(--accent-gold) 82%, transparent 100%)",
        }}
      />

      <div
        data-loader-lockup
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6"
      >
        <div className="relative flex flex-col items-center gap-7">
          {/* The mark rises out of its own frame rather than fading in — a
              wordmark that dissolves into place reads cheap at this size. */}
          <div className="relative h-9 w-[168px] overflow-hidden sm:h-11 sm:w-[208px]">
            <div
              data-loader-mark
              className="absolute inset-0"
              style={{ transform: "translateY(110%)" }}
            >
              <Image
                src={theme === "dark" ? "/ascend-logo-dark.png" : "/ascend-logo.png"}
                alt=""
                fill
                priority
                sizes="208px"
                className="object-contain"
              />
              {/* Full-width band with the highlight held in its middle third,
                  so a -100% → 100% sweep carries it cleanly off one edge and
                  out the other. Sizing this narrower and travelling further
                  is the same effect on paper, but xPercent is a share of the
                  element's OWN width — a third-width band never crosses. */}
              <span
                data-loader-sheen
                className="pointer-events-none absolute inset-y-0 left-0 w-full opacity-0"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 34%, rgba(201,169,110,0.75) 50%, transparent 66%)",
                }}
              />
            </div>
          </div>

          <span
            data-loader-rule
            className="h-px w-28 origin-center bg-gold"
            style={{ transform: "scaleX(0)" }}
          />

          {/* Each word climbs out of its own mask, so the line assembles left
              to right instead of appearing all at once. */}
          {/* Tighter type and gaps below `sm`: at the full 0.22em tracking the
              three words plus separators run to ~330px, which overflows a
              360px phone once the lockup's own padding is taken off. */}
          <p className="flex items-center gap-2 sm:gap-4">
            {TAGLINE_WORDS.map((word, i) => (
              <span key={word} className="flex items-center gap-2 sm:gap-4">
                {i > 0 && (
                  <span
                    data-loader-diamond
                    aria-hidden
                    className="text-[0.4rem] text-gold opacity-0 sm:text-[0.5rem]"
                  >
                    ◆
                  </span>
                )}
                <span className="block overflow-hidden pb-[0.2em]">
                  <span
                    data-loader-word
                    className="label block text-[0.5625rem] tracking-[0.15em] text-ink-faint sm:text-[0.6875rem] sm:tracking-[0.22em]"
                    style={{ transform: "translateY(110%)" }}
                  >
                    {word}
                  </span>
                </span>
              </span>
            ))}
          </p>
        </div>

        <div
          data-loader-meter
          className="absolute bottom-16 flex flex-col items-center gap-4 opacity-0 sm:bottom-20"
        >
          <span className="relative block h-px w-44 bg-line-strong sm:w-60">
            <span data-loader-bar className="absolute inset-0 block bg-gold" />
          </span>
          {/* Fixed-width tabular figures: without them the row re-lays-out on
              every frame as the count crosses 9 and 99. */}
          <span className="label flex items-baseline gap-1 text-ink-faint">
            <span ref={countRef} className="inline-block w-[3ch] text-right tabular-nums">
              00
            </span>
            <span className="text-[0.5625rem] text-gold">%</span>
          </span>
        </div>
      </div>
    </div>
  );
}
