import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";

const projects = [
  {
    location: "Andalusia, Spain",
    type: "Utility scale",
    title: "18 MW solar park with 12 MWh storage",
    result: "Evening output shifted to peak tariff hours, raising revenue per installed watt by 21%.",
  },
  {
    location: "Gauteng, South Africa",
    type: "Commercial",
    title: "Manufacturing site, 640 kW rooftop",
    result: "Production continues through scheduled grid outages; diesel consumption down 84%.",
  },
  {
    location: "Bavaria, Germany",
    type: "Residential programme",
    title: "1,200 homes with hybrid systems",
    result: "Average household self-consumption at 78%, monitored across the full portfolio.",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 md:py-1">
      <Container>
        <SectionHeading
          label="Projects"
          title="Installed, commissioned, measured"
          description="A selection of systems running today, with the outcome the owner actually cares about."
        />

        <div className="mt-14 border-t border-line">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 80}>
              <article className="grid grid-cols-1 gap-6 border-b border-line py-10 md:grid-cols-12 md:gap-10">
                <div className="md:col-span-3">
                  <p className="text-sm font-medium text-ink">{project.location}</p>
                  <p className="mt-2 text-xs uppercase tracking-[0.18em] text-accent">
                    {project.type}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <h3 className="text-lg font-semibold tracking-tight text-ink">
                    {project.title}
                  </h3>
                </div>
                <div className="md:col-span-4">
                  <p className="text-sm leading-relaxed text-muted">{project.result}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
