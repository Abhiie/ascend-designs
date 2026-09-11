"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface ProjectInquiryModalProps {
  open: boolean;
  onClose: () => void;
}

export function ProjectInquiryModal({ open, onClose }: ProjectInquiryModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Lock body scroll when open */
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Close on Escape key */
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  /* Close when clicking the backdrop */
  function handleBackdropClick(e: React.MouseEvent) {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      onClose();
    }
  }

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Start a Project Inquiry"
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-500 ${
        open
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      }`}
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div
        aria-hidden
        className={`absolute inset-0 bg-black/70 backdrop-blur-xl transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        className={`relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-sm border border-gold/20 shadow-[0_25px_80px_rgba(0,0,0,0.6),0_0_40px_rgba(201,169,110,0.08)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-8 scale-95 opacity-0"
        }`}
        style={{ background: "#1c1a16" }}
      >
        {/* Gold accent top edge */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />

        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close inquiry form"
          className="absolute top-5 right-5 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all duration-300 hover:border-gold hover:text-gold hover:bg-gold/10 cursor-pointer"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M1 1l12 12M13 1L1 13" />
          </svg>
        </button>

        {/* Form content */}
        <div className="p-8 sm:p-10">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-3 flex items-center gap-3">
              <span className="block h-px w-8 bg-gold/70" />
              <span className="label text-[0.625rem] tracking-[0.22em] text-gold">
                Start a Project
              </span>
            </div>
            <h3 className="font-display text-2xl text-white sm:text-3xl">
              Send a Project Inquiry
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-white/60">
              Fill out the details below and Principal Architect Ashish Prajapati
              will get back to you within 24 hours.
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you! Your message has been sent to Ascend Designs.");
              onClose();
            }}
            className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="modal-name" className="label text-xs text-white/50 block mb-2">
                  Your Name *
                </label>
                <input
                  id="modal-name"
                  type="text"
                  required
                  placeholder="e.g. Rajesh Shah"
                  className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label htmlFor="modal-phone" className="label text-xs text-white/50 block mb-2">
                  Phone Number *
                </label>
                <input
                  id="modal-phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="modal-email" className="label text-xs text-white/50 block mb-2">
                  Email Address *
                </label>
                <input
                  id="modal-email"
                  type="email"
                  required
                  placeholder="rajesh@example.com"
                  className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors"
                />
              </div>
              <div>
                <label htmlFor="modal-project-type" className="label text-xs text-white/50 block mb-2">
                  Project Type
                </label>
                <select
                  id="modal-project-type"
                  className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white focus:outline-none focus:border-gold transition-colors"
                >
                  <option value="architectural">Architectural Villa / Residence</option>
                  <option value="interiors">Luxury Interior Design</option>
                  <option value="turnkey">Turnkey Execution</option>
                  <option value="commercial">Commercial / Workspace</option>
                  <option value="renovation">Renovation &amp; Restructuring</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="modal-message" className="label text-xs text-white/50 block mb-2">
                Project Details / Message *
              </label>
              <textarea
                id="modal-message"
                required
                rows={4}
                placeholder="Tell us about your plot location, space dimensions, timeline, or key preferences..."
                className="w-full border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-gold transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="label w-full py-4 text-center font-medium transition-colors duration-300 bg-gold text-black hover:bg-[#dbb878] cursor-pointer"
            >
              Submit Inquiry <span aria-hidden>→</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  if (!mounted) return null;
  return createPortal(modal, document.body);
}
