import Hero from "@/components/sections/Hero";
import Solutions from "@/components/sections/Solutions";
import Products from "@/components/sections/Products";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Ranges from "@/components/sections/Ranges";
import ProductStream from "@/components/sections/ProductStream";
import Projects from "@/components/sections/Projects";
import Faq from "@/components/sections/Faq";
import CallToAction from "@/components/sections/CallToAction";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ranges />
      <ProductStream />
      <Solutions />
      <Products />
      
      <About />
      <Testimonials />
      {/* <Projects /> */}
      <Faq />
      <CallToAction />
    </>
  );
}
