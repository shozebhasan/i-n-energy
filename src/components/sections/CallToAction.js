import Container from "@/components/Container";
import Button from "@/components/Button";

export default function CallToAction() {
  return (
    <section id="contact" className="accent-wash section-tint-out py-20 md:py-28">
      <Container>
        <div className="grid grid-cols-1 items-center gap-10 border border-line bg-white p-10 md:grid-cols-12 md:p-16">
          <div className="md:col-span-8">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-ink md:text-4xl">
              Planning a solar or storage project?
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              Send us the site details and load profile. Our engineers will come back
              with a system layout, expected yield and a full component list.
            </p>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Button href="mailto:info@zingenergy.com" variant="accent">
              Request a proposal
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
