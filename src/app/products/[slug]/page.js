import Link from "next/link";
import { notFound } from "next/navigation";
import CallToAction from "@/components/sections/CallToAction";
import Container from "@/components/Container";
import Parallax from "@/components/Parallax";
import ProductCard from "@/components/ProductCard";
import ProductDocuments from "@/components/ProductDocuments";
import ProductHero from "@/components/ProductHero";
import ProductSpecifications from "@/components/ProductSpecifications";
import Reveal from "@/components/Reveal";
import SplitLines from "@/components/SplitLines";
import StaggerGroup from "@/components/StaggerGroup";
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

/*
  The product page, top to bottom:

      Hero               name, photography, first specifications   (dark)
      Overview           what it is, and what it does              text / features
      In the system      where it sits in an installation          boxes / text
      Specifications     the full table                            text / table
      Applications       where the range is typically used         four boxes
      Documents          datasheet and manual, half the page each  (dark, full width)
      Also in this range the other products in the category
      Contact            the shared call to action

  The two-column sections deliberately alternate which side carries the text,
  so the eye moves across the page rather than down a single column. Each one
  stacks to a single column below `lg`, with the text first.

  Everything below the hero comes from one of two places: the product record,
  or the category record it belongs to. Nothing is written into this file, so
  a product added through the admin panel gets a complete page without anyone
  editing the layout.
*/
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
      <ProductHero
        product={product}
        category={category}
        images={galleryImages}
      />

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              {/*
                The heading is the promise of the whole range, and the
                paragraph under it is this particular product. Reading them in
                that order is how a visitor places the product in the range.
              */}
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                    Overview
                  </span>
                </div>
              </Reveal>

              <SplitLines>
                <h2 className="mt-6 text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-4xl">
                  {category?.tagline ?? "Built for the whole system"}
                </h2>
              </SplitLines>

              <Reveal delay={180}>
                <p className="mt-7 text-base leading-relaxed text-muted md:text-lg">
                  {product.description}
                </p>
              </Reveal>

              {category?.description ? (
                <Reveal delay={260}>
                  <p className="mt-5 text-base leading-relaxed text-muted">
                    {category.description}
                  </p>
                </Reveal>
              ) : null}

              {/*
                Everything outside the battery range is stand-in content while
                the real material is being prepared. Saying so on the page is
                the honest way to show the design without a visitor taking a
                placeholder figure for a published specification.
              */}
              {product.isPlaceholder ? (
                <Reveal delay={320}>
                  <p className="mt-8 border-l-2 border-accent pl-5 text-sm leading-relaxed text-muted">
                    Placeholder content. The photography and the figures on this
                    page are stand-ins until the final product material is
                    supplied.
                  </p>
                </Reveal>
              ) : null}
            </div>

            {product.features?.length ? (
              <div>
                <Reveal>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                      Features
                    </span>
                  </div>
                </Reveal>

                {/*
                  One trigger for the whole list rather than a delay on each
                  row, so the numbers count in at an even pace however many
                  features a product turns out to have.
                */}
                <StaggerGroup className="mt-8 border-t border-line">
                  {product.features.map((feature, index) => (
                    <div
                      key={feature}
                      className="flex gap-6 border-b border-line py-6"
                    >
                      <span
                        className="shrink-0 pt-0.5 text-sm font-medium tabular-nums text-accent"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className="text-base leading-relaxed text-ink">
                        {feature}
                      </p>
                    </div>
                  ))}
                </StaggerGroup>
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      {category?.systemSteps?.length ? (
        <section className="section-tint py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
              {/*
                Text on the right on a wide screen, first on a narrow one. The
                boxes are the illustration of what the paragraph describes, so
                the paragraph has to be read first when they cannot sit
                side by side.
              */}
              <div className="lg:order-2">
                <Reveal>
                  <div className="flex items-center gap-4">
                    
                    <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                      In the system
                    </span>
                  </div>
                </Reveal>

                <SplitLines>
                  <h2 className="mt-6 text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-4xl">
                    Where it sits in an installation
                  </h2>
                </SplitLines>

                {category.systemIntro ? (
                  <Reveal delay={180}>
                    <p className="mt-7 text-base leading-relaxed text-muted md:text-lg">
                      {category.systemIntro}
                    </p>
                  </Reveal>
                ) : null}

                <Reveal delay={260}>
                  <Link
                    href={`/products#${category.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                  >
                    See the rest of the {category.name.toLowerCase()}
                    <span aria-hidden="true">→</span>
                  </Link>
                </Reveal>
              </div>

              <StaggerGroup className="flex flex-col gap-px bg-line lg:order-1">
                {category.systemSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className="flex gap-6 bg-white p-8 md:gap-8 md:p-10"
                  >
                    {/*
                      The step number drifts against the scroll, which is the
                      only movement inside these boxes — the text they hold
                      stays still while it is being read.
                    */}
                    <Parallax distance={8}>
                      <span
                        className="block text-4xl font-semibold leading-none tabular-nums text-line md:text-5xl"
                        aria-hidden="true"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Parallax>

                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-ink">
                        {step.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                        {step.description}
                      </p>
                    </div>
                  </article>
                ))}
              </StaggerGroup>
            </div>
          </Container>
        </section>
      ) : null}

      {product.specifications?.length ? (
        <section id="specifications" className="scroll-mt-24 py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <Reveal>
                  <div className="flex items-center gap-4">
                    
                    <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                      Specifications
                    </span>
                  </div>
                </Reveal>

                <SplitLines>
                  <h2 className="mt-6 text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-4xl">
                    The full specification
                  </h2>
                </SplitLines>

                <Reveal delay={180}>
                  <p className="mt-7 text-base leading-relaxed text-muted">
                    What the unit is rated at, in the order an installer needs
                    it. The datasheet at the bottom of this page carries the
                    complete set of figures, tolerances and dimensions.
                  </p>
                </Reveal>
              </div>

              {/*
                The rows are rendered by ProductSpecifications, so the selector
                is how this reaches them: they belong to the table, not to the
                animation.
              */}
              <StaggerGroup selector="dl > div" y={18} stagger={0.05}>
                <ProductSpecifications
                  specifications={product.specifications}
                />
              </StaggerGroup>
            </div>
          </Container>
        </section>
      ) : null}

      {category?.applications?.length ? (
        <section className="section-tint py-20 md:py-28">
          <Container>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Reveal>
                  <div className="flex items-center gap-4">
                  
                    <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                      Applications
                    </span>
                  </div>
                </Reveal>

                <SplitLines>
                  <h2 className="mt-6 text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-4xl">
                    Where the range is used
                  </h2>
                </SplitLines>
              </div>

              <Reveal delay={160}>
                <p className="max-w-sm text-sm leading-relaxed text-muted">
                  Typical installations for {category.name.toLowerCase()}. Send
                  us a site and a load profile and we will say which unit fits
                  it.
                </p>
              </Reveal>
            </div>

            <StaggerGroup className="mt-14 grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {category.applications.map((application) => (
                <article
                  key={application.title}
                  className="flex h-full flex-col bg-white p-8 transition-colors hover:bg-surface"
                >
                  <span
                    className="h-px w-8 bg-accent"
                    aria-hidden="true"
                  />
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-ink">
                    {application.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {application.description}
                  </p>
                </article>
              ))}
            </StaggerGroup>
          </Container>
        </section>
      ) : null}

      <ProductDocuments
        productName={product.name}
        datasheet={product.datasheet}
        manual={product.manual}
      />

      {relatedProducts.length ? (
        <section className="py-20 md:py-28">
          <Container>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <Reveal>
                <h2 className="text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  Also in {category?.name ?? "this range"}
                </h2>
              </Reveal>

              <Reveal delay={80}>
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent"
                >
                  All products
                  <span aria-hidden="true">→</span>
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

      <CallToAction />
    </>
  );
}
