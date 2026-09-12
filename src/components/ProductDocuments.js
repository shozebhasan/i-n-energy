"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  The download band at the bottom of a product page.

  It is deliberately the widest thing on the page: two panels, each taking half
  the screen, one for the datasheet and one for the product manual. A visitor
  who scrolled this far is usually looking for exactly one of those two files,
  so they are given the full width rather than a pair of small buttons.

  There is no <Container> here — that is the point. The band runs edge to edge
  and the split falls on the middle of the viewport. On a phone the two panels
  stack, because half a phone screen is not a usable tap target.

  When a product has only one of the two documents the remaining panel takes
  the whole width instead of leaving a hole next to it.
*/
export default function ProductDocuments({ productName, datasheet, manual }) {
  const sectionRef = useRef(null);

  const documents = [
    {
      href: datasheet,
      label: "Download datasheet",
      description: `Electrical and mechanical specifications for the ${productName}, in full.`,
    },
    {
      href: manual,
      label: "Download product manual",
      description: `Installation, commissioning and maintenance instructions for the ${productName}.`,
    },
  ].filter((file) => Boolean(file.href));

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !documents.length) return;

    const mediaQueries = gsap.matchMedia();

    mediaQueries.add("(prefers-reduced-motion: no-preference)", () => {
      // The panels arrive from the outside edges and meet in the middle, which
      // is the same movement as the split the band is built on.
      gsap.from("[data-document-panel]", {
        autoAlpha: 0,
        xPercent: (index) => (index === 0 ? -6 : 6),
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          once: true,
        },
      });
    }, section);

    return () => mediaQueries.revert();
  }, [documents.length]);

  if (!documents.length) {
    return null;
  }

  /*
    overflow-hidden because the panels animate in from outside their own edges:
    without it the right-hand panel's start position widens the document and
    the page shows a horizontal scrollbar while the animation plays.
  */
  return (
    <section ref={sectionRef} className="overflow-hidden bg-ink text-white">
      <h2 className="sr-only">Documents</h2>

      <div
        className={`grid grid-cols-1 ${
          documents.length > 1 ? "md:grid-cols-2" : ""
        }`}
      >
        {documents.map((file, index) => (
          <a
            key={file.href + file.label}
            href={file.href}
            download
            data-document-panel
            className={`group relative flex min-h-75 flex-col justify-between overflow-hidden px-8 py-14 transition-colors hover:bg-white/4 md:px-14 md:py-20 ${
              index === 0
                ? "border-b border-white/10 md:border-b-0 md:border-r"
                : ""
            }`}
          >

            <div className="mt-8">
              <span className="block text-3xl font-semibold leading-tight tracking-tight text-white md:text-4xl">
                {file.label}
              </span>
              <span className="mt-4 block max-w-md text-sm leading-relaxed text-white/55 md:text-base">
                {file.description}
              </span>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-accent group-hover:bg-accent"
              >
                <svg
                  viewBox="0 0 16 16"
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                >
                  <path d="M8 1v10m0 0L4 7m4 4 4-4" />
                  <path d="M2 13.5h12" />
                </svg>
              </span>
              <span className="text-sm text-white/55">Save the file</span>
            </div>

            {/* Accent rule that draws itself across the panel on hover. */}
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-accent transition-transform duration-500 group-hover:scale-x-100"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
