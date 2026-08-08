import { Reveal } from "@/components/motion/reveal";

const PRINCIPLES = [
  {
    title: "Bespoke Design",
    description:
      "Every space is designed around the people who will use it — no templates, no repetition.",
  },
  {
    title: "Quality Assurance",
    description:
      "Materials and execution are held to the same standard from first sketch to final handover.",
  },
  {
    title: "Experienced Team",
    description:
      "A close, hands-on team overseeing design and execution at every stage.",
  },
  {
    title: "On-Time Delivery",
    description:
      "Timelines are planned and tracked so projects are delivered when we say they will be.",
  },
  {
    title: "Transparent Process",
    description:
      "Clear communication and honest budgeting from proposal to final walkthrough.",
  },
];

export function WhyAscend() {
  return (
    <section className="px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-44">
      <div className="mx-auto max-w-[1600px]">
        <Reveal>
          <p className="label mb-8 text-ink-faint">Why Ascend</p>
          <h2 className="max-w-2xl font-display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.05] text-ink">
            Why Ascend.
          </h2>
        </Reveal>

        <div className="mt-16 border-t border-line">
          {PRINCIPLES.map((principle, i) => (
            <Reveal key={principle.title} delay={i * 0.05}>
              <div className="grid grid-cols-1 gap-3 border-b border-line py-9 sm:py-10 lg:grid-cols-12 lg:items-center lg:gap-6">
                <span className="font-display text-3xl text-ink-faint lg:col-span-2 lg:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl text-ink lg:col-span-4 lg:text-3xl">
                  {principle.title}
                </h3>
                <p className="max-w-md text-ink-soft lg:col-span-6">
                  {principle.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
