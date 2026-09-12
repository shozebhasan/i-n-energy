"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Container from "./Container";

/*
  The "Products" entry in the desktop navbar.

  It is a link to /products that also opens a full-width panel: the four
  categories on the left, the products of whichever category is hovered on the
  right. Pointing at a category name swaps the right-hand side without
  navigating, so a visitor can see the whole range before deciding where to go.

  The panel is a child of the wrapper rather than a sibling, and the wrapper
  fills the height of the navbar row. That combination is what keeps the menu
  open while the pointer travels from the link down into the panel — there is
  no gap between the two for the pointer to fall through.

  The categories come from the server (see lib/products.js), so adding a
  category or a product changes this menu without touching this file.
*/
export default function ProductsMenu({ categories }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategorySlug, setActiveCategorySlug] = useState(
    categories[0]?.slug
  );

  const activeCategory =
    categories.find((category) => category.slug === activeCategorySlug) ??
    categories[0];

  if (!activeCategory) {
    return null;
  }

  // Tab moving out of the menu should close it, but tab moving between the
  // links inside it should not, so the new focus target is checked first.
  function handleBlur(event) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setIsOpen(false);
    }
  }

  return (
    <div
      className="flex items-center self-stretch"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={handleBlur}
      onKeyDown={(event) => {
        if (event.key === "Escape") setIsOpen(false);
      }}
    >
      <Link
        href="/products"
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
          isOpen ? "text-ink" : "text-muted hover:text-ink"
        }`}
      >
        Products
        <svg
          viewBox="0 0 10 6"
          aria-hidden="true"
          className={`h-1.5 w-2.5 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <path
            d="M1 1l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>
      </Link>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full w-full border-t border-line bg-white shadow-[0_24px_48px_-32px_rgba(11,18,25,0.35)]"
          >
            <Container>
              <div className="grid grid-cols-[240px_1fr] gap-14 py-10">
                <div>
                  <p className="text-lg font-medium uppercase tracking-wider text-muted">
                    Categories
                  </p>

                  <ul className="mt-6 flex flex-col">
                    {categories.map((category) => {
                      const isActive = category.slug === activeCategory.slug;

                      return (
                        <li key={category.slug}>
                          <Link
                            href={`/products#${category.slug}`}
                            onMouseEnter={() =>
                              setActiveCategorySlug(category.slug)
                            }
                            onFocus={() => setActiveCategorySlug(category.slug)}
                            onClick={() => setIsOpen(false)}
                            className={`block border-l-2 py-3 pl-4 transition-colors ${
                              isActive
                                ? "border-accent text-ink"
                                : "border-transparent text-muted hover:text-ink"
                            }`}
                          >
                            <span className="block text-sm font-medium">
                              {category.name}
                            </span>
                            <span className="mt-0.5 block text-xs text-muted">
                              {category.tagline}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>

                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="mt-6 inline-flex items-center gap-2 pl-4 text-sm font-medium text-ink hover:text-accent"
                  >
                    All products
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>

                <div>
                  <p className="text-lg font-medium uppercase tracking-widest text-muted">
                    {activeCategory.name}
                  </p>

                  {/*
                    A fixed tile width rather than a four-column grid: a
                    category with three products then fills the row from the
                    left instead of leaving an empty cell, and the tiles stay
                    the same size as the visitor moves between categories.
                  */}
                  <div className="mt-6 flex flex-wrap gap-6">
                    {activeCategory.products.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="group w-44"
                      >
                        <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-line bg-surface transition-colors group-hover:border-ink">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="176px"
                            className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        </div>
                        <p className="mt-3 text-sm font-medium text-ink">
                          {product.name}
                        </p>
                        {product.highlight ? (
                          <p className="mt-0.5 text-xs text-muted">
                            {product.highlight}
                          </p>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
