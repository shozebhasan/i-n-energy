"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Brings a group of elements in one after another when the group scrolls into
  view — the boxes in a grid, the rows of a specifications table, the items of
  a feature list.

  <Reveal> animates one block at a time and each caller has to work out its own
  delay; this animates a whole group from a single trigger, so a grid stays in
  step no matter how many items it has.

  By default every direct child is animated, which means the wrapper can be the
  grid itself:

      <StaggerGroup className="grid grid-cols-3 gap-px">
        <Box /> <Box /> <Box />
      </StaggerGroup>

  Pass `selector` when the elements to animate are deeper than that, e.g. the
  rows inside a table this component does not render itself.

  gsap.matchMedia() is what handles reduced motion: the tween is only created
  while `(prefers-reduced-motion: no-preference)` matches, and GSAP reverts it
  by itself if the visitor changes that setting while the page is open. Nothing
  is touched for anyone who asked for less movement, so the markup the server
  sent is what stays on screen.
*/
export default function StaggerGroup({
  children,
  className = "",
  selector,
  y = 28,
  stagger = 0.09,
  duration = 0.8,
  start = "top 85%",
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const items = selector
      ? container.querySelectorAll(selector)
      : container.children;

    if (!items.length) return;

    const mediaQueries = gsap.matchMedia();

    mediaQueries.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(items, {
        autoAlpha: 0,
        y,
        duration,
        ease: "power3.out",
        stagger,
        scrollTrigger: {
          trigger: container,
          start,
          once: true,
        },
      });
    });

    return () => mediaQueries.revert();
  }, [selector, y, stagger, duration, start]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
