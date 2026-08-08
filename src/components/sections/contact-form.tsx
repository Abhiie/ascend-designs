"use client";

import { Reveal } from "@/components/motion/reveal";

export function ContactForm() {
  return (
    <Reveal delay={0.1}>
      <div className="border border-line bg-surface-muted p-8 sm:p-12">
        <h3 className="font-display text-2xl text-ink mb-2">Send a Project Inquiry</h3>
        <p className="text-sm text-ink-soft mb-8">
          Fill out the details below and Principal Architect Ashish Prajapati will get back to you within 24 hours.
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you! Your message has been sent to Ascend Designs.");
          }}
          className="flex flex-col gap-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="label text-xs text-ink-soft block mb-2">
                Your Name *
              </label>
              <input
                id="name"
                type="text"
                required
                placeholder="e.g. Rajesh Shah"
                className="w-full bg-surface border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label htmlFor="phone" className="label text-xs text-ink-soft block mb-2">
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                required
                placeholder="+91 98765 43210"
                className="w-full bg-surface border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="label text-xs text-ink-soft block mb-2">
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="rajesh@example.com"
                className="w-full bg-surface border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold transition-colors"
              />
            </div>
            <div>
              <label htmlFor="project-type" className="label text-xs text-ink-soft block mb-2">
                Project Type
              </label>
              <select
                id="project-type"
                className="w-full bg-surface border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold transition-colors"
              >
                <option value="architectural">Architectural Villa / Residence</option>
                <option value="interiors">Luxury Interior Design</option>
                <option value="turnkey">Turnkey Execution</option>
                <option value="commercial">Commercial / Workspace</option>
                <option value="renovation">Renovation & Restructuring</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="label text-xs text-ink-soft block mb-2">
              Project Details / Message *
            </label>
            <textarea
              id="message"
              required
              rows={4}
              placeholder="Tell us about your plot location, space dimensions, timeline, or key preferences..."
              className="w-full bg-surface border border-line px-4 py-3 text-sm text-ink focus:outline-none focus:border-gold transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="label w-full bg-ink text-surface py-4 text-center hover:bg-gold hover:text-black transition-colors duration-300 font-medium"
          >
            Submit Inquiry <span aria-hidden>→</span>
          </button>
        </form>
      </div>
    </Reveal>
  );
}
