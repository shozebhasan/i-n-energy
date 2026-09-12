"use client";

import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";

/*
  Navigation links.

  These point at homepage sections for now. When the products pages are built
  the "Products" entry becomes a real route (/products).
*/
const navLinks = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Products", href: "/#products" },
  { label: "Projects", href: "/#projects" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // How far down the page the visitor is, 0 to 1. Framer Motion keeps this
  // outside React state, so scrolling does not re-render the navbar.
  const { scrollYProgress } = useScroll();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white/95 backdrop-blur-sm">
      <Container>
        
        <div className="flex h-20 items-center justify-between">
          <Logo />

          <nav className="hidden items-center gap-9 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/#contact"
              className="inline-flex items-center border border-ink px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-white"
            >
              Contact us
            </Link>
          </div>

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
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="border-b border-line py-4 text-sm text-ink last:border-b-0"
                >
                  {link.label}
                </Link>
              ))}
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
