"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Container from "@/components/Container";
import ProductGallery from "@/components/ProductGallery";
import SplitLines from "@/components/SplitLines";

gsap.registerPlugin(ScrollTrigger);

/*
  The opening section of a product page: breadcrumb, name, what the product is,
  the photography, and the first few specifications along the bottom.

  It is the one dark section on the page. A product page is mostly white, and
  starting it on ink gives the product photograph something to sit against and
  separates the page from the listing the visitor arrived from.

  Two different animations run here, and they are deliberately kept apart:

  - a timeline that plays once on mount, because this content is already on
    screen when the page loads and there is nothing to scroll into;
  - a scrubbed tween that drifts the photograph as the hero scrolls away.

  Everything is created inside gsap.matchMedia() so that a visitor who asked
  for reduced motion gets the finished layout with nothing moving, and so GSAP
  reverts the whole lot by itself if that setting changes while the page is open.
*/
export default function ProductHero({ product, category, images }) {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);

  // Only the first few specifications belong up here. The rest of the table is
  // further down the page; this row is the "what is it" summary a visitor reads
  // before deciding whether to keep scrolling.
  const glanceSpecifications = product.specifications?.slice(0, 4) ?? [];

  useEffect(() => {
    const section = sectionRef.current;
    const gallery = galleryRef.current;
    if (!section) return;

    const mediaQueries = gsap.matchMedia();

    // The third argument scopes every selector below to this section, so
    // `[data-hero-body]` cannot reach into another component that happens to
    // use the same attribute.
    mediaQueries.add("(prefers-reduced-motion: no-preference)", () => {
      const timeline = gsap.timeline({
        defaults: { ease: "power3.out", duration: 0.8 },
      });

      // The heading is animated by SplitLines, which runs its own tween on
      // mount. These start just after it so the copy follows the name rather
      // than arriving on top of it.
      timeline
        .from("[data-hero-line]", { scaleY: 0, duration: 1.1, stagger: 0.08 }, 0)
        .from("[data-hero-intro]", { autoAlpha: 0, y: 16 }, 0.1)
        .from(
          gallery,
          { autoAlpha: 0, y: 40, scale: 0.94, duration: 1.1 },
          0.15
        )
        .from("[data-hero-body]", { autoAlpha: 0, y: 20, stagger: 0.12 }, 0.45)
        .from(
          "[data-hero-glance]",
          { autoAlpha: 0, y: 24, stagger: 0.08 },
          0.75
        );

      // The photograph lifts slightly as the hero leaves, which is what stops
      // the section from sliding away as one flat plate.
      if (gallery) {
        gsap.to(gallery, {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, section);

    return () => mediaQueries.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ink text-white"
    >
      {/*
        Two hairlines running the height of the section. They are the only
        decoration in the hero: enough structure to stop the dark area reading
        as an empty rectangle, and quiet enough not to compete with the product.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        <span
          data-hero-line
          className="absolute inset-y-0 left-1/3 w-px origin-top bg-white/[0.07]"
        />
        <span
          data-hero-line
          className="absolute inset-y-0 left-2/3 w-px origin-top bg-white/[0.07]"
        />
      </div>

      {/* A single warm glow behind the product, held at a low alpha. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_55%_at_75%_35%,rgba(226,118,27,0.16),transparent_70%)]"
      />

      <Container className="relative py-12 md:py-16">
        <nav aria-label="Breadcrumb" data-hero-intro>
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/45">
            <li>
              <Link href="/" className="transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/products"
                className="transition-colors hover:text-white"
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
                    className="transition-colors hover:text-white"
                  >
                    {category.name}
                  </Link>
                </li>
              </>
            ) : null}
            <li aria-hidden="true">/</li>
            <li className="text-white">{product.name}</li>
          </ol>
        </nav>

        <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:mt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <div>
            {category ? (
              <div data-hero-body className="flex items-center gap-4">
                
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/50">
                  {category.name}
                </span>
              </div>
            ) : null}

            <SplitLines playOnMount delay={0.15}>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
                {product.name}
              </h1>
            </SplitLines>

            <p
              data-hero-body
              className="mt-7 max-w-xl text-base leading-relaxed text-white/60 md:text-lg"
            >
              {product.shortDescription}
            </p>

            {product.highlights?.length ? (
              <ul data-hero-body className="mt-8 flex flex-wrap gap-2.5">
                {product.highlights.map((highlight) => (
                  <li
                    key={highlight}
                    className="rounded-full border border-white/15 px-4 py-2 text-sm text-white/85"
                  >
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}

            <div data-hero-body className="mt-10 flex flex-wrap gap-3">
              {/*
                Both links stay on this page: the product page ends with the
                same call to action the homepage uses, so there is no reason to
                send someone back to the homepage to ask a question about the
                product they are looking at.
              */}
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-accent-dark"
              >
                Request a quote
              </a>
              <a
                href="#specifications"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white transition-colors hover:border-white/60"
              >
                View specifications
              </a>
            </div>
          </div>

          <div ref={galleryRef}>
            <ProductGallery
              productName={product.name}
              images={images}
              tone="dark"
            />
          </div>
        </div>

        {glanceSpecifications.length ? (
          <dl className="mt-14 grid grid-cols-2 gap-px border-t border-white/10 pt-10 lg:grid-cols-4">
            {glanceSpecifications.map((specification) => (
              <div key={specification.name} data-hero-glance className="pr-6">
                <dt className="text-xs font-medium uppercase tracking-[0.18em] text-white/40">
                  {specification.name}
                </dt>
                <dd className="mt-3 text-xl font-semibold tracking-tight text-white md:text-2xl">
                  {specification.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}
      </Container>
    </section>
  );
}
