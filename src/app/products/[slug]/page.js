import Link from "next/link";
import { notFound } from "next/navigation";
import Container from "@/components/Container";
import DocumentDownload from "@/components/DocumentDownload";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import ProductSpecifications from "@/components/ProductSpecifications";
import Reveal from "@/components/Reveal";
import SplitLines from "@/components/SplitLines";
import {
  findCategory,
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";

/*
  Pre-render a page for every published product at build time. When the data
  comes from the database this keeps working — Next calls the same function,
  it just runs a query instead of reading an array.
*/
export async function generateStaticParams() {
  const products = await getAllProducts();

  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return { title: "Product not found — I&N Energy" };
  }

  return {
    title: `${product.name} — I&N Energy`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const category = findCategory(product.categorySlug);
  const relatedProducts = await getRelatedProducts(product);

  // The gallery takes one list, with the main image first. Keeping the main
  // image separate in the data is what lets a card show a product without
  // having to know anything about the rest of its photography.
  const galleryImages = [product.image, ...(product.images ?? [])];

  return (
    <>
      <section className="py-10 md:py-14">
        <Container>
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-ink">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/products"
                  className="transition-colors hover:text-ink"
                >
                  Products
                </Link>
              </li>
              {category ? (
                <>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link
                      href={`/products#${category.slug}`}
                      className="transition-colors hover:text-ink"
                    >
                      {category.name}
                    </Link>
                  </li>
                </>
              ) : null}
              <li aria-hidden="true">/</li>
              <li className="text-ink">{product.name}</li>
            </ol>
          </nav>

          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <ProductGallery
              productName={product.name}
              images={galleryImages}
            />

            <div className="flex flex-col">
              {category ? (
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                  {category.name}
                </span>
              ) : null}

              <SplitLines>
                <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-ink md:text-5xl">
                  {product.name}
                </h1>
              </SplitLines>

              <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
                {product.shortDescription}
              </p>

              {product.highlights?.length ? (
                <ul className="mt-8 flex flex-wrap gap-2">
                  {product.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-full border border-line px-4 py-2 text-sm text-ink"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              ) : null}

              <div className="mt-10 border-t border-line pt-8">
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                  Documents
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {product.datasheet ? (
                    <DocumentDownload
                      href={product.datasheet}
                      label="Download datasheet"
                    />
                  ) : null}
                  {product.manual ? (
                    <DocumentDownload
                      href={product.manual}
                      label="Download product manual"
                    />
                  ) : null}
                </div>
              </div>

              <div className="mt-10">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-full bg-ink px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-ink-soft"
                >
                  Talk to us about this product
                </Link>
              </div>

              {/*
                Everything outside the battery range is stand-in content while
                the real material is being prepared. Saying so on the page is
                the honest way to show the design without a visitor taking a
                placeholder figure for a published specification.
              */}
              {product.isPlaceholder ? (
                <p className="mt-8 border-l-2 border-accent pl-4 text-sm leading-relaxed text-muted">
                  Placeholder content. The photography and the figures on this
                  page are stand-ins until the final product material is
                  supplied.
                </p>
              ) : null}
            </div>
          </div>
        </Container>
      </section>

      <section className="section-tint py-16 md:py-24">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                  Overview
                </h2>
                <p className="mt-6 text-base leading-relaxed text-muted">
                  {product.description}
                </p>
              </div>
            </Reveal>

            {product.features?.length ? (
              <Reveal delay={120}>
                <div>
                  <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                    Features
                  </h2>
                  <ul className="mt-6 flex flex-col gap-4">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex gap-4 text-base leading-relaxed text-muted"
                      >
                        <span
                          className="mt-3 h-px w-5 shrink-0 bg-accent"
                          aria-hidden="true"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ) : null}
          </div>
        </Container>
      </section>

      {product.specifications?.length ? (
        <section className="py-16 md:py-24">
          <Container>
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                Specifications
              </h2>
            </Reveal>

            <Reveal delay={120}>
              <div className="mt-10">
                <ProductSpecifications
                  specifications={product.specifications}
                />
              </div>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {relatedProducts.length ? (
        <section className="border-t border-line py-16 md:py-24">
          <Container>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <h2 className="text-2xl font-semibold tracking-tight text-ink md:text-3xl">
                  Also in {category?.name ?? "this range"}
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-accent"
                >
                  All products
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </Reveal>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
              {relatedProducts.map((relatedProduct, index) => (
                <Reveal
                  key={relatedProduct.slug}
                  delay={index * 90}
                  className="h-full"
                >
                  <ProductCard product={relatedProduct} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
