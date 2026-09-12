"use client";

import { useEffect, useRef } from "react";

/*
  Fades its children in the first time they scroll into view.

  The observer is disconnected after the element is revealed so the animation
  never replays while the visitor scrolls up and down the page.
*/
export default function Reveal({ children, delay = 0, className = "" }) {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={elementRef} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}
