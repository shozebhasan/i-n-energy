import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";
import Button from "@/components/Button";
import Reveal from "@/components/Reveal";
import { getFeaturedProducts } from "@/lib/products";

/*
  Server component: the products are fetched while the page is rendered, so the
  homepage always reflects what the admin has published.
*/
export default async function Products() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section id="products" className="py-2 md:py-1">
      <Container>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            title="Inverters and storage, built as one system"
            description="Each product is designed to work with the rest of the range, so a system can grow without replacing what is already installed."
          />
          <Button href="/products" variant="outline" className="self-start md:self-end">
            All products
          </Button>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {featuredProducts.map((product, index) => (
            <Reveal key={product.slug} delay={index * 90} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
