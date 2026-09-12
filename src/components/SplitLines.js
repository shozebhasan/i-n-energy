"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/*
  Headline animation: the text is split into lines, each line is wrapped in a
  clipping mask, and the lines rise out from behind that mask one after another
  as the heading scrolls into view.

  Wrap a single heading element:

      <SplitLines>
        <h2 className="text-4xl ...">One platform, three scales</h2>
      </SplitLines>

  The heading itself is what gets split, not this wrapper. That matters for
  screen readers: SplitText puts an `aria-label` on the element it splits and
  hides the generated line spans, so splitting the <h2> keeps the heading
  announced with its real text. Splitting the wrapper instead would leave an
  <h2> full of aria-hidden spans and no accessible name.

  Use it for headings only. Running a line-by-line reveal over a long paragraph
  is tiring to read — body copy uses <Reveal>, which fades the whole block in
  at once.
*/
export default function SplitLines({
  children,
  className = "",
  stagger = 0.09,
  delay = 0,
  // Hero headlines are already on screen at load, so there is nothing to
  // scroll into — they play as soon as they mount instead.
  playOnMount = false,
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reduced motion: leave the heading exactly as the server rendered it.
    // Not splitting at all is also the safest option here, because the split
    // rewrites the element's markup.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const heading = container.firstElementChild;
    if (!heading) return;

    let split;

    const context = gsap.context(() => {
      split = SplitText.create(heading, {
        type: "lines",
        mask: "lines",
        linesClass: "split-line",
        // Poppins is loaded as a web font, so the first split can be measured
        // against the fallback face and break in the wrong places. autoSplit
        // re-splits once the real font arrives, and again if the column width
        // changes and the line breaks move.
        autoSplit: true,
        onSplit(self) {
          // Must be built here: autoSplit throws the old line elements away,
          // so an animation created outside would be left holding nodes that
          // are no longer in the document. Returning it lets SplitText revert
          // and rebuild it at the same playhead position.
          return gsap.from(self.lines, {
            yPercent: 115,
            duration: 0.9,
            ease: "power3.out",
            stagger,
            delay,
            scrollTrigger: playOnMount
              ? undefined
              : {
                  trigger: heading,
                  start: "top 85%",
                  once: true,
                },
          });
        },
      });
    }, container);

    return () => {
      // Order matters: let the tweens pull their inline styles off the line
      // elements first, then hand the element its original markup back.
      context.revert();
      split?.revert();
    };
  }, [stagger, delay, playOnMount]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
