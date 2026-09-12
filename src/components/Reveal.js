"use client";

import { motion, useReducedMotion } from "framer-motion";

/*
  The one enter animation on the site: children rise into place and fade in the
  first time they scroll into view.

  Framer Motion owns the viewport detection here. `once: true` keeps the
  animation from replaying while the visitor scrolls back up the page, and
  `amount` is how much of the element has to be on screen before it starts.

  `delay` is how a grid staggers — each card passes `index * 90` — so the row
  arrives one item after another rather than all at once.
*/
export default function Reveal({ children, delay = 0, className = "" }) {
  const prefersReducedMotion = useReducedMotion();

  // Nothing to animate away from: render the content in its final state.
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        // Fast out of the gate and a long settle, which reads calmer than ease-out.
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
