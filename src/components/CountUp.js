"use client";

import { useEffect, useRef, useState } from "react";

/*
  Counts from `from` up to `to` the first time the element scrolls into view,
  then stops observing so it never replays. Numbers ease out — quick at the
  start, slow over the last few hundred milliseconds — which reads as
  deliberate rather than mechanical.

  <CountUp to={6000} />              -> 6000
  <CountUp to={300} suffix="+" />    -> 300+
  <CountUp to={100} suffix="GW+" />  -> 100GW+
  <CountUp to={99.9} decimals={1} suffix="%" /> -> 99.9%
*/

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export default function CountUp({
  to,
  from = 0,
  duration = 1600,
  delay = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
  separator = false,
  className = "",
}) {
  const ref = useRef(null);
  const [value, setValue] = useState(from);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    /* Anyone who asked their OS to calm animations down just gets the number. */
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setValue(to);
      return;
    }

    let frameId = 0;
    let timeoutId = 0;
    let startTime = null;

    const step = (now) => {
      if (startTime === null) startTime = now;
      const progress = Math.min((now - startTime) / duration, 1);
      setValue(from + (to - from) * easeOutExpo(progress));
      if (progress < 1) frameId = requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timeoutId = window.setTimeout(() => {
          frameId = requestAnimationFrame(step);
        }, delay);
      },
      /* Waits until the figure is properly on screen, not clipping the edge. */
      { threshold: 0.5 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      clearTimeout(timeoutId);
    };
  }, [to, from, duration, delay]);

  const rounded = decimals > 0 ? Number(value.toFixed(decimals)) : Math.round(value);

  const display = separator
    ? rounded.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : rounded.toFixed(decimals);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}