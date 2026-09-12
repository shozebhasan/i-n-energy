import Hero from "@/components/sections/Hero";
import Solutions from "@/components/sections/Solutions";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import CallToAction from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Solutions />
      <Products />
      <About />
      {/* <Projects /> */}
      <CallToAction />
    </>
  );
}
