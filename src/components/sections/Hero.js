import Container from "@/components/Container";
import HeroSlides from "@/components/HeroSlides";

const heroStats = [
  { value: "2.4 GW", label: "Capacity shipped" },
  { value: "40+", label: "Countries served" },
  { value: "98.6%", label: "Peak inverter efficiency" },
  { value: "25 yr", label: "System design life" },
];

export default function Hero() {
  return (
    <section className="border-b border-line">
      <HeroSlides />

      
    </section>
  );
}
