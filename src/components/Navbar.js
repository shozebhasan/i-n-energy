"use client";

import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import ProductsMenu from "./ProductsMenu";

export default function Navbar({ productMenu = [] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);

  // How far down the page the visitor is, 0 to 1. Framer Motion keeps this
  // outside React state, so scrolling does not re-render the navbar.
  const { scrollYProgress } = useScroll();

  return (
    <header className="relative w-full border-b border-line bg-white/95 backdrop-blur-sm">
      <Container>
        
        <div className="flex h-20 items-center justify-between">
          {/*
            I&N Energy is the parent company and Zing Energy is its brand, so
            both marks sit in the header. The divider is what keeps them
            reading as two companies rather than one combined logo.
          */}
          <div className="flex items-center gap-4">
            <Logo priority />
            <span className="h-8 w-px bg-line" aria-hidden="true" />
            <Image
              src="/zing.png"
              alt="Zing Energy"
              width={128}
              height={128}
              priority
              className="h-8 w-8 shrink-0"
            />
          </div>

          {/*
            self-stretch makes the nav as tall as the header row, which is what
            gives the products dropdown a hover area that reaches all the way
            down to the panel it opens.
          */}
          <nav className="hidden items-center gap-9 self-stretch md:flex">
            <Link
              href="/#solutions"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              Solutions
            </Link>

            <ProductsMenu categories={productMenu} />

            {/* <Link
              href="/#projects"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              Projects
            </Link> */}

            <Link
              href="/#projects"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              Contact
            </Link>

            <Link
              href="/#projects"
              className="text-sm text-muted transition-colors hover:text-ink"
            >
              Supports
            </Link>
          </nav>

          {/* <div className="hidden md:block">
            <Link
              href="/#contact"
              className="inline-flex items-center border border-ink px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Contact us
            </Link>
          </div> */}

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center md:hidden"
          >
            <span className="relative block h-4 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-200 ${
                  isMobileMenuOpen ? "top-2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-2 block h-px w-6 bg-ink transition-opacity duration-200 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-ink transition-transform duration-200 ${
                  isMobileMenuOpen ? "top-2 -rotate-45" : "top-4"
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      {isMobileMenuOpen ? (
        <div className="border-t border-line bg-white md:hidden">
          <Container>
            <nav className="flex flex-col py-4">
              <Link
                href="/#solutions"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-line py-4 text-sm text-ink"
              >
                Solutions
              </Link>

              {/*
                Products is a dropdown on desktop, so on mobile it is the same
                information as a section that opens in place. A panel that
                covers the screen would be the wrong shape for four categories.
              */}
              <div className="border-b border-line">
                <button
                  type="button"
                  aria-expanded={isMobileProductsOpen}
                  onClick={() => setIsMobileProductsOpen((open) => !open)}
                  className="flex w-full items-center justify-between py-4 text-sm text-ink"
                >
                  Products
                  <svg
                    viewBox="0 0 10 6"
                    aria-hidden="true"
                    className={`h-1.5 w-2.5 transition-transform duration-200 ${
                      isMobileProductsOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>

                {isMobileProductsOpen ? (
                  <ul className="pb-3">
                    {productMenu.map((category) => (
                      <li key={category.slug}>
                        <Link
                          href={`/products#${category.slug}`}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2.5 pl-4 text-sm text-muted"
                        >
                          {category.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href="/products"
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2.5 pl-4 text-sm font-medium text-ink"
                      >
                        All products
                      </Link>
                    </li>
                  </ul>
                ) : null}
              </div>

              <Link
                href="/#projects"
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-4 text-sm text-ink"
              >
                Projects
              </Link>

              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 mb-2 inline-flex items-center justify-center bg-ink px-6 py-3 text-sm font-medium text-white"
              >
                Contact us
              </Link>
            </nav>
          </Container>
        </div>
      ) : null}

      {/* Reading progress, drawn on the navbar's own bottom border. */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-[-1px] left-0 h-0.5 w-full origin-left bg-accent"
        aria-hidden="true"
      />
    </header>
  );
}
