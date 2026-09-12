"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Drifts its children against the scroll while the element crosses the viewport,
  which gives a flat section some depth.

  GSAP handles this instead of Framer Motion because the movement is tied to the
  scrollbar position the whole way through (`scrub`), not played once on entry.
  Reveal covers the play-once case, so the two libraries never overlap.

  The outer element is the trigger and the inner one is what moves: measuring an
  element that is also being transformed would feed its own movement back into
  the trigger's start and end positions.
*/
export default function Parallax({ children, distance = 40, className = "" }) {
  const triggerRef = useRef(null);
  const movingRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    const moving = movingRef.current;
    if (!trigger || !moving) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.fromTo(
        moving,
        { y: distance },
        {
          y: -distance,
          ease: "none",
          scrollTrigger: {
            trigger,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    });

    return () => context.revert();
  }, [distance]);

  return (
    <div ref={triggerRef} className={className}>
      <div ref={movingRef}>{children}</div>
    </div>
  );
}
