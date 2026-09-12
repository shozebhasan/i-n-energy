import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const capabilities = [
  {
    number: "01",
    title: "Grid-forming control",
    description:
      "Our inverters can hold voltage and frequency on their own, so a site keeps running when the grid is weak or completely down.",
  },
  {
    number: "02",
    title: "Cell-level battery management",
    description:
      "Every cell is measured and balanced individually. Weak cells are identified early instead of quietly shortening the life of the pack.",
  },
  {
    number: "03",
    title: "Thermal design without compromise",
    description:
      "Sealed IP65 enclosures with passive cooling paths. No filters to clean, no fans to replace, full output at 45 °C ambient.",
  },
  {
    number: "04",
    title: "Monitoring and remote updates",
    description:
      "Live production and consumption data, fault alerts, and firmware delivered over the air — no site visit required for most issues.",
  },
];

export default function Technology() {
  return (
    <section id="technology" className="bg-ink py-20 md:py-28">
      <Container>
        <SectionHeading
          tone="dark"
          label="Technology"
          title="The engineering behind the numbers"
          description="Performance claims only matter if they hold after ten years on a roof. These are the design decisions that make that possible."
        />

        <div className="mt-14 grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
          {capabilities.map((capability, index) => (
            <Reveal key={capability.title} delay={index * 80}>
              <article className="h-full bg-ink p-8 md:p-10">
                <p className="text-xs font-semibold tracking-[0.18em] text-accent">
                  {capability.number}
                </p>
                <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">
                  {capability.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/60">
                  {capability.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 border-t border-white/10 pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
            Certified and tested to
          </p>
          <ul className="mt-6 flex flex-wrap gap-x-10 gap-y-4 text-sm text-white/70">
            {["IEC 62109", "IEC 62619", "CE", "TÜV Rheinland", "ISO 9001", "VDE-AR-N 4105"].map(
              (certification) => (
                <li key={certification}>{certification}</li>
              )
            )}
          </ul>
        </div>
      </Container>
    </section>
  );
}
