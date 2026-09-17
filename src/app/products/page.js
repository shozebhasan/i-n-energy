import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import ProductsHero from "@/components/sections/ProductsHero";
import { getCatalogue } from "@/lib/products";

export const metadata = {
  title: "Products — I&N Energy",
  description:
    "Lithium batteries, solar inverters, solar panels and accessories from I&N Energy and Zing Energy.",
};

/*
  The full catalogue, one section per category.

  Each section carries the category slug as its id, which is what the
  "Lithium Batteries", "Solar Inverters" and other entries in the navigation
  dropdown link to. Keeping the categories as anchors on one page means there
  is no separate category route to build and maintain.
*/
export default async function ProductsPage() {
  const catalogue = await getCatalogue();

  return (
    <>
      <ProductsHero catalogue={catalogue} />

      {catalogue.map((category) => (
        <section
          key={category.slug}
          id={category.slug}
          className="scroll-mt-24 border-b border-line py-16 md:py-24"
        >
          <Container>
            <Reveal>
              <div className="max-w-3xl">
                <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  {category.name}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {category.description}
                </p>
              </div>
            </Reveal>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {category.products.map((product, index) => (
                <Reveal
                  key={product.slug}
                  delay={index * 90}
                  className="h-full"
                >
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
