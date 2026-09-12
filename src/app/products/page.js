import Container from "@/components/Container";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import SplitLines from "@/components/SplitLines";
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
      <section className="border-b border-line py-16 md:py-24">
        <Container>
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-line" aria-hidden="true" />
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                Products
              </span>
            </div>
          </Reveal>

          <SplitLines>
            <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">
              Everything an energy system needs, from one range
            </h1>
          </SplitLines>

          <Reveal delay={220}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
              Storage, conversion, generation and the parts that hold it all
              together. Every product is designed to work with the rest of the
              range, so a system can grow without replacing what is already
              installed.
            </p>
          </Reveal>

          <Reveal delay={320}>
            <nav
              aria-label="Product categories"
              className="mt-10 flex flex-wrap gap-3"
            >
              {catalogue.map((category) => (
                <a
                  key={category.slug}
                  href={`#${category.slug}`}
                  className="rounded-full border border-line px-5 py-2.5 text-sm text-ink transition-colors hover:border-ink"
                >
                  {category.name}
                </a>
              ))}
            </nav>
          </Reveal>
        </Container>
      </section>

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
