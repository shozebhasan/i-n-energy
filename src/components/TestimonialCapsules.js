"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/*
  Three rows of testimonial "capsules" drifting sideways in opposite
  directions. Clicking a capsule opens the full quote in a dialog.

  JavaScript port of a TypeScript "testimonial section" component. Changes from
  the original:

  - The row movement is the CSS `animate-marquee` animation (globals.css), not
    an infinite Framer Motion tween. It is the same loop the announcement bar
    uses, it costs no JavaScript per frame, and the existing reduced-motion
    rule already switches it off.
  - Colours use the site tokens (`accent`, `ink`, `line`) instead of the
    original blue, and the dark-mode classes are gone because the site has no
    dark mode.
  - lucide-react is replaced by an inline SVG, so no dependency was added.
  - Capsules are real <button>s and the dialog closes on Escape, so the whole
    thing works from the keyboard.
*/

// The track moves by -50% and then restarts, so the loop is only seamless if
// half the track is at least as wide as the screen — otherwise the row runs
// out before it restarts and leaves an empty gap. Eight copies of three
// capsules gives roughly 2900px per half, enough for 2560px screens. Keep the
// number even so -50% always lands exactly on a copy boundary.
const COPIES_PER_ROW = 8;

export default function TestimonialCapsules({ testimonials }) {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const rows = [
    testimonials.slice(0, 3),
    testimonials.slice(3, 6),
    testimonials.slice(6, 9),
  ].filter((row) => row.length > 0);

  return (
    <>
      <div className="relative w-full">
        {/* Diagonal hatching behind the rows, drawn in the text colour at low opacity. */}
        <div
          className="pointer-events-none absolute inset-0 z-0 border-y border-ink bg-[repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)] bg-[length:10px_10px] text-ink opacity-10"
          aria-hidden="true"
        />

        {/* Edge fades so capsules dissolve into the page instead of being cut off. */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-white to-transparent md:w-40"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-white to-transparent md:w-40"
          aria-hidden="true"
        />

        {/*
          items-start, not items-center: each row is wider than the screen, and
          centring it would push its start off the left edge. Shifted by a
          further -50%, the row's end then reaches the middle of the screen
          and the right half goes empty before the loop jumps back.
        */}
        <div className="relative z-10 flex flex-col items-start gap-6 overflow-hidden py-10 md:gap-8 md:py-12">
          {rows.map((row, rowIndex) => (
            <div
              key={rowIndex}
              // Alternate rows run backwards so neighbouring rows move apart.
              className={`flex min-w-max animate-marquee ${
                rowIndex % 2 === 1 ? "[animation-direction:reverse]" : ""
              }`}
              // The track is twice as long as the announcement bar's, so it
              // gets twice the duration to drift at a calm speed.
              style={{ animationDuration: "80s" }}
            >
              {Array.from({ length: COPIES_PER_ROW }, (_, copyIndex) => (
                <div
                  key={copyIndex}
                  className="flex shrink-0 items-center gap-6 pr-6"
                  // The extra copies only fill the loop. Hiding them keeps
                  // screen readers and the Tab key to one capsule per person.
                  aria-hidden={copyIndex > 0}
                  inert={copyIndex > 0}
                >
                  {row.map((testimonial) => (
                    <Capsule
                      key={testimonial.id}
                      testimonial={testimonial}
                      onClick={() => setSelectedTestimonial(testimonial)}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedTestimonial ? (
          <TestimonialDialog
            testimonial={selectedTestimonial}
            onClose={() => setSelectedTestimonial(null)}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}

function Capsule({ testimonial, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-4 rounded-full border border-line bg-white p-2 pr-8 text-left shadow-sm transition hover:scale-105 hover:border-dashed hover:border-accent hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-95"
    >
      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-ink transition-colors group-hover:border-accent">
        <Image
          src={testimonial.image}
          alt=""
          fill
          sizes="56px"
          className="object-cover object-top"
        />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold text-ink">
          {testimonial.name}
        </span>
        <span className="text-xs text-muted">{testimonial.role}</span>
      </span>
    </button>
  );
}

function TestimonialDialog({ testimonial, onClose }) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    // Move focus into the dialog so keyboard users land on it, and give it
    // back to the capsule they came from when the dialog closes.
    const previouslyFocused = document.activeElement;
    closeButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
        aria-hidden="true"
      />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="testimonial-dialog-name"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10, transition: { duration: 0.15 } }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative z-50 w-full max-w-lg rounded-2xl border-2 border-accent bg-ink p-8 text-white shadow-2xl md:p-12"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close testimonial"
          className="absolute right-4 top-4 p-2 text-white/50 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-accent"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-center text-center">
          <p className="mb-8 text-xl font-medium leading-relaxed md:text-2xl">
            &ldquo;{testimonial.quote}&rdquo;
          </p>

          <div className="flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-accent">
              <Image
                src={testimonial.image}
                alt=""
                fill
                sizes="48px"
                className="object-cover object-top"
              />
            </div>
            <div className="text-left">
              <p id="testimonial-dialog-name" className="text-base font-semibold">
                {testimonial.name}
              </p>
              <p className="text-sm text-white/60">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
