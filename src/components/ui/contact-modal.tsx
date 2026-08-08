"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site-config";

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Check if user already dismissed modal during this session
    const hasBeenShown = sessionStorage.getItem("ascend_contact_modal_dismissed");
    if (hasBeenShown === "true") return;

    // Trigger popup after 10 seconds (10000 ms)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("ascend_contact_modal_dismissed", "true");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md transition-opacity duration-500 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="relative w-full max-w-lg bg-surface border border-gold/30 shadow-2xl p-6 sm:p-10 rounded-sm transition-all duration-300 transform scale-100">
        {/* Close Button */}
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close popup"
          className="absolute top-4 right-4 h-9 w-9 flex items-center justify-center border border-line text-ink-soft hover:text-gold hover:border-gold transition-colors text-lg"
        >
          ✕
        </button>

        {/* Content Header */}
        <div className="text-center mb-6">
          <p className="label text-gold text-xs tracking-widest uppercase mb-2">
            Complimentary Consultation
          </p>
          <h2 className="font-display text-2xl sm:text-3xl text-ink font-semibold">
            Start Your Design Journey
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-ink-soft leading-relaxed max-w-sm mx-auto">
            Discuss your villa, apartment interior, or commercial project directly with Principal Architect{" "}
            <span className="text-ink font-medium">{siteConfig.founder}</span>.
          </p>
        </div>

        {submitted ? (
          <div className="py-8 text-center bg-gold/10 border border-gold/40 p-6 rounded-sm">
            <p className="font-display text-xl text-ink font-medium mb-2">Thank You!</p>
            <p className="text-sm text-ink-soft mb-4">
              Your inquiry has been received. Our team will reach out to you shortly.
            </p>
            <button
              type="button"
              onClick={handleClose}
              className="label bg-ink text-surface px-6 py-2.5 hover:bg-gold hover:text-black transition-colors"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              sessionStorage.setItem("ascend_contact_modal_dismissed", "true");
            }}
            className="flex flex-col gap-4"
          >
            <div>
              <label htmlFor="modal-name" className="label text-[11px] text-ink-soft block mb-1">
                Your Name *
              </label>
              <input
                id="modal-name"
                type="text"
                required
                placeholder="e.g. Rajesh Shah"
                className="w-full bg-surface-muted border border-line px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-gold transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="modal-phone" className="label text-[11px] text-ink-soft block mb-1">
                  Phone Number *
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full bg-surface-muted border border-line px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-gold transition-colors"
                />
              </div>

              <div>
                <label htmlFor="modal-type" className="label text-[11px] text-ink-soft block mb-1">
                  Project Type
                </label>
                <select
                  id="modal-type"
                  className="w-full bg-surface-muted border border-line px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="architectural">Architectural Villa</option>
                  <option value="interiors">Luxury Interior Design</option>
                  <option value="turnkey">Turnkey Execution</option>
                  <option value="commercial">Commercial Space</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="modal-message" className="label text-[11px] text-ink-soft block mb-1">
                Message (Optional)
              </label>
              <textarea
                id="modal-message"
                rows={2}
                placeholder="Plot location, sq ft area, or key preferences..."
                className="w-full bg-surface-muted border border-line px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="label w-full bg-ink text-surface py-3 text-center hover:bg-gold hover:text-black transition-colors font-medium text-xs tracking-wider uppercase mt-1"
            >
              Request Call Back <span aria-hidden>→</span>
            </button>
          </form>
        )}

        {/* Quick Connect Divider & Buttons */}
        <div className="mt-6 pt-5 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <span className="label text-[10px] text-ink-faint">Or connect instantly:</span>
          <div className="flex items-center gap-3">
            <a
              href={siteConfig.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="label text-xs text-gold hover:underline flex items-center gap-1"
            >
              WhatsApp <span aria-hidden>↗</span>
            </a>
            <span className="text-line-strong">•</span>
            <a
              href={siteConfig.phoneHref}
              className="label text-xs text-ink-soft hover:text-gold transition-colors"
            >
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
