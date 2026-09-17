"use client";

import { motion } from "framer-motion";

// The grid fades in first, then reveals its cards one after another.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

/*
  A bento grid with six fixed slots. Each prop is the content for one slot:

      ┌─────────────┬─────────────┬─────────────┐
      │             │  trackers   │  statistic  │
      │ integration ├─────────────┼─────────────┤
      │   (tall)    │   focus     │ productivity│
      │             ├─────────────┴─────────────┤
      │             │     shortcuts (wide)      │
      └─────────────┴───────────────────────────┘

  On phones every slot stacks in a single column.

  The cards animate when the grid scrolls into view rather than on page load,
  because the section sits well below the fold.
*/
export default function FeaturedProducts({
  integration,
  trackers,
  statistic,
  focus,
  productivity,
  shortcuts,
  className = "",
}) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`grid w-full auto-rows-[minmax(180px,auto)] grid-cols-1 gap-6 md:grid-cols-3 md:grid-rows-3 ${className}`}
    >
      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-3">
        {integration}
      </motion.div>

      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
        {trackers}
      </motion.div>

      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
        {statistic}
      </motion.div>

      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
        {focus}
      </motion.div>

      <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
        {productivity}
      </motion.div>

      <motion.div variants={itemVariants} className="md:col-span-2 md:row-span-1">
        {shortcuts}
      </motion.div>
    </motion.div>
  );
}
