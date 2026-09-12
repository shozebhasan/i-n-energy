import Container from "@/components/Container";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import SplitLines from "@/components/SplitLines";

export default function CallToAction() {
  return (
    <section id="contact" className="accent-wash section-tint-out py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 border border-line bg-white p-10 md:grid-cols-12 md:p-16">
          <div className="md:col-span-8">
            <Reveal>
              <div className="flex items-center gap-4">
               
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                  Get in touch
                </span>
              </div>
            </Reveal>

            <SplitLines>
              <h2 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">
                Planning a solar or storage project?
              </h2>
            </SplitLines>

            <Reveal delay={220}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                Send us the site details and load profile. Our engineers will come back
                with a system layout, expected yield and a full component list.
              </p>
            </Reveal>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Reveal delay={340}>
              <Button href="mailto:info@zingenergy.com" variant="accent">
                Request a proposal
              </Button>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
