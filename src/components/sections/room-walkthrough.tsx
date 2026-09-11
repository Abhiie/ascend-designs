"use client";

import { useEffect, useRef } from "react";

/**
 * RoomWalkthrough — Vestry-style scroll-driven 3D video scrubber.
 *
 * Strategy: The <video> element IS visible (not hidden). We scrub
 * currentTime on each ScrollTrigger update. The "black flash" that
 * browsers show while decoding is masked by keeping a <canvas> on top
 * that holds the LAST successfully drawn frame — so the user always
 * sees something while the decoder catches up.
 */

const SCROLL_DURATION = 4500; // px of scroll space allocated to scrubbing

export function RoomWalkthrough() {
  const sectionRef  = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const labelRef    = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const loadBarRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let gsapCtx: gsap.Context | null = null;
    let rafId = 0;
    let lastDrawnTime = -1;

    async function init() {
      const { gsap }        = await import("@/lib/gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      const video   = videoRef.current;
      const canvas  = canvasRef.current;
      if (!section || !video || !canvas) return;

      const ctx2d = canvas.getContext("2d");
      if (!ctx2d) return;

      // ── Continuous RAF loop: copy video → canvas whenever a new frame arrives
      function renderLoop() {
        if (video && canvas && ctx2d && video.readyState >= 2) {
          // Only redraw if the timestamp actually changed
          if (video.currentTime !== lastDrawnTime) {
            lastDrawnTime = video.currentTime;
            canvas.width  = video.videoWidth  || canvas.offsetWidth;
            canvas.height = video.videoHeight || canvas.offsetHeight;
            ctx2d.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
        }
        rafId = requestAnimationFrame(renderLoop);
      }
      rafId = requestAnimationFrame(renderLoop);

      // ── Buffer progress ──────────────────────────────────────────────
      video.addEventListener("progress", () => {
        if (!video.duration || !loadBarRef.current) return;
        try {
          const end = video.buffered.end(video.buffered.length - 1);
          const pct = end / video.duration;
          loadBarRef.current.style.transform = `scaleX(${pct})`;
          if (pct > 0.98 && loadBarRef.current.parentElement) {
            loadBarRef.current.parentElement.style.opacity = "0";
          }
        } catch { /* buffered may be empty */ }
      });

      // ── Wait for metadata ────────────────────────────────────────────
      const duration = await new Promise<number>((resolve) => {
        if (video.readyState >= 1) resolve(video.duration);
        else video.addEventListener("loadedmetadata", () => resolve(video.duration), { once: true });
      });

      // ── GSAP ScrollTrigger ───────────────────────────────────────────
      gsapCtx = gsap.context(() => {
        // Label reveal
        gsap.fromTo(labelRef.current,
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );

        // Pin + scrub
        ScrollTrigger.create({
          trigger: section,
          start:   "top top",
          end:     `+=${SCROLL_DURATION}`,
          pin:     true,
          pinSpacing: true,
          scrub:   0.8,
          onUpdate(self) {
            // Seek video — RAF loop handles the canvas drawing
            const t = Math.max(0, Math.min(self.progress * duration, duration - 0.05));
            video.currentTime = t;

            // Progress bar
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
            // Fade "SCROLL TO EXPLORE" prompt
            if (overlayRef.current) {
              overlayRef.current.style.opacity = String(
                self.progress < 0.12 ? 1 - self.progress / 0.12 : 0
              );
            }
          },
        });
      }, section);
    }

    init();

    return () => {
      cancelAnimationFrame(rafId);
      gsapCtx?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="walkthrough"
      className="relative h-screen w-full overflow-hidden bg-[#0c0b09]"
    >
      {/* ── Offscreen video element — browsers decode but don't paint it ── */}
      <video
        ref={videoRef}
        src="/room-3d.mp4"
        className="absolute h-0 w-0 opacity-0"
        playsInline
        muted
        preload="auto"
      />

      {/* ── Canvas holds the last decoded frame — no black flashes ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ objectFit: "cover", width: "100%", height: "100%" }}
      />

      {/* ── Cinematic vignette ── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(12,11,9,0.5) 0%, transparent 18%, transparent 76%, rgba(12,11,9,0.65) 100%)",
        }}
      />

      {/* ── Buffer preload bar (top) ── */}
      <div className="absolute left-0 right-0 top-0 h-[2px] bg-white/10 transition-opacity duration-1000">
        <div
          ref={loadBarRef}
          className="h-full w-full origin-left bg-white/25"
          style={{ transform: "scaleX(0)", transition: "transform 0.4s linear" }}
        />
      </div>

      {/* ── Section badge ── */}
      <div ref={labelRef} className="absolute left-6 top-8 opacity-0 sm:left-12">
        <div className="flex items-center gap-4">
          <span className="h-px w-8 bg-gold/60" />
          <p className="label text-[0.5625rem] tracking-[0.2em] text-gold/70">
            3D Walkthrough
          </p>
        </div>
      </div>

      {/* ── Scroll-to-explore hint ── */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 flex flex-col items-center justify-end pb-16"
      >
        <div className="flex flex-col items-center gap-3">
          <p className="label text-[0.5rem] tracking-[0.3em] text-white/50">
            SCROLL TO EXPLORE
          </p>
          <div className="flex flex-col items-center gap-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-1.5 w-px rounded-full bg-white/30"
                style={{ animation: `wDot 1.8s ease-in-out ${i * 0.22}s infinite` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll progress bar (bottom) ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/10">
        <div
          ref={progressRef}
          className="h-full w-full origin-left bg-gold/80"
          style={{ transform: "scaleX(0)" }}
        />
      </div>

      {/* ── Bottom-left: project name ── */}
      <div className="absolute bottom-7 left-6 sm:left-12">
        <p className="font-display text-[clamp(0.9rem,1.8vw,1.35rem)] font-light text-white/75">
          Modern Residence — Ahmedabad
        </p>
      </div>

      {/* ── Bottom-right: credit ── */}
      <div className="absolute bottom-7 right-6 sm:right-12">
        <p className="label text-[0.5rem] tracking-widest text-white/25">ASCEND DESIGNS</p>
      </div>

      <style>{`
        @keyframes wDot {
          0%, 100% { opacity: 0.15; transform: translateY(-5px); }
          50%       { opacity: 0.7;  transform: translateY(5px); }
        }
      `}</style>
    </section>
  );
}
