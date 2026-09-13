import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import SplitLines from "@/components/SplitLines";
import TestimonialCapsules from "@/components/TestimonialCapsules";

/*
  PLACEHOLDER: no real customer testimonials have been supplied. The names,
  roles, quotes and photos below come from the demo this component was adapted
  from (photos are hosted on that demo's Cloudinary account). Replace every
  entry with a real, approved customer quote and a photo in public/assets/
  before the site goes live, then remove the placeholder notice below.

  The rows show three people each, so up to nine entries are displayed.
*/
const testimonials = [
  {
    id: "1",
    name: "Shozeb Hasan",
    role: "Developer",
    image:
      "/assets/testimonials/me.jpeg",
    quote: "Placeholder testimonial — replace with a real customer quote.",
  },
  {
    id: "2",
    name: "Markus Lee",
    role: "Facility manager",
    image:
      "/assets/testimonials/testi-1.jpg",
    quote: "Placeholder testimonial — replace with a real customer quote.",
  },
  {
    id: "3",
    name: "Olivia Koe",
    role: "Installer",

    image:
      "/assets/testimonials/testi-3.jpg",
    quote: "Placeholder testimonial — replace with a real customer quote.",
  },
  {
    id: "4",
    name: "David Kim",
    role: "Business owner",
    image:
      "/assets/testimonials/testi-2.jpg",
    quote: "Placeholder testimonial — replace with a real customer quote.",
  },
  {
    id: "5",
    name: "Jacob Okonkwo",
    role: "Project engineer",
    image:
      "/assets/testimonials/testi-5.jpg",
    quote: "Placeholder testimonial — replace with a real customer quote.",
  },
  {
    id: "6",
    name: "Ahmad Faheem",
    role: "Distribution partner",
    image:
      "/assets/testimonials/testi-4.jpg",
    quote: "Placeholder testimonial — replace with a real customer quote.",
  },
  //
  {
    id: "7",
    name: "Elena Rodriguez",
    role: "Homeowner",
    image:
      "/assets/testimonials/testi-7.jpg",
    quote: "Placeholder testimonial — replace with a real customer quote.",
  },
  {
    id: "8",
    name: "Hamza khan",
    role: "Operations lead",
    image:
      "/assets/testimonials/testi-6.jpg",
    quote: "Placeholder testimonial — replace with a real customer quote.",
  },
  //
  {
    id: "9",
    name: "Jacob Weber",
    role: "Architect",
    image:
      "/assets/testimonials/testi-8.jpg",
    quote: "Placeholder testimonial — replace with a real customer quote.",
  },
];

export default function Testimonials() {
  return (
    // No <Container> around the rows: they run edge to edge by design, and
    // the section's overflow-hidden keeps the moving track from widening the page.
    <section id="testimonials" className="overflow-hidden py-2 md:py-1">
      <Container className="mb-10 text-center md:mb-12">
        <SplitLines>
          <h2 className="text-5xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
            Our Satisfied Customers
          </h2>
        </SplitLines>

        
      </Container>

      <TestimonialCapsules testimonials={testimonials} />
    </section>
  );
}
