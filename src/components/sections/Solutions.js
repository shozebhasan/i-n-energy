import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";

const solutions = [
  {
    number: "01",
    title: "Residential",
    description:
      "Rooftop solar with hybrid inverters and battery backup, sized for a single home and simple enough for an installer to commission in a day.",
    points: ["3 – 12 kW hybrid inverters", "Expandable battery modules", "Backup power during outages"],
  },
  {
    number: "02",
    title: "Commercial & industrial",
    description:
      "Three-phase systems that cut energy costs for factories, warehouses and offices, with load management and detailed consumption reporting.",
    points: ["15 – 125 kW three-phase", "Peak shaving and load control", "Multi-site monitoring"],
  },
  {
    number: "03",
    title: "Utility scale",
    description:
      "Grid-forming inverters and containerised storage for solar farms and grid operators, designed around grid codes and long maintenance cycles.",
    points: ["Grid-forming control", "Containerised storage", "Remote diagnostics and OTA"],
  },
];

export default function Solutions() {
  return (
    <section id="solutions" className="section-tint py-8 md:py-8">
      <Container>
        <SectionHeading
          title="One platform, three scales of energy"
          description="The same inverter architecture, battery chemistry and monitoring software runs across every project size, so what works on a rooftop also works on a grid."
        />

        <div className="mt-14 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
          {solutions.map((solution, index) => (
            <Reveal key={solution.title} delay={index * 90} className="h-full">
              <article className="flex h-full flex-col bg-white p-8 md:p-10">
                {/*
                  The index drifts against the scroll, which is the one bit of
                  movement in this grid — the cards themselves stay still so
                  the text is never moving while it is being read.
                */}
                <Parallax distance={10}>
                  <span
                    className="block text-6xl font-semibold leading-none tabular-nums text-line"
                    aria-hidden="true"
                  >
                    {solution.number}
                  </span>
                </Parallax>

                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-ink">
                  {solution.title}
                </h3>
                <p className="mt-4 text-md leading-relaxed text-muted">
                  {solution.description}
                </p>

                <ul className="mt-auto space-y-3 pt-8">
                  {solution.points.map((point) => (
                    <li key={point} className="flex items-baseline gap-3 text-md text-ink">
                      <span className="h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
