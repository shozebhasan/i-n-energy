"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/*
  A chat-style FAQ: each question is a small bubble, and opening it slides the
  answer in underneath as a reply bubble. Only one item is open at a time and
  clicking the open item closes it again.

  JavaScript port of a TypeScript component built on Radix Accordion and
  lucide-react. Neither package is in this project, and for a single-open list
  a pair of plain <button>s with aria-expanded gives the same behaviour and the
  same keyboard support (Tab to a question, Enter or Space to toggle), so no
  dependency was added for it.

  An item looks like:
    { id, question, answer, icon?, iconPosition? }
  `icon` is a short string (usually an emoji) pinned to the top corner of the
  question bubble; `iconPosition` is "left" (default) or "right".
*/
export default function FaqAccordion({
  data,
  className = "",
  timestamp = "Every day, 9:01 AM",
  questionClassName = "",
  answerClassName = "",
}) {
  const [openItemId, setOpenItemId] = useState(null);

  function toggleItem(itemId) {
    setOpenItemId((currentId) => (currentId === itemId ? null : itemId));
  }

  return (
    <div className={`p-4 ${className}`}>
      {timestamp ? <div className="mb-4 text-sm text-muted">{timestamp}</div> : null}

      {data.map((item) => {
        const isOpen = openItemId === item.id;
        const triggerId = `faq-question-${item.id}`;
        const answerId = `faq-answer-${item.id}`;

        return (
          <div key={item.id} className="mb-2">
            <h3>
              <button
                type="button"
                id={triggerId}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => toggleItem(item.id)}
                className="flex w-full items-center justify-start gap-x-4 text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink"
              >
                <span
                  className={`relative flex items-center rounded-xl p-2 transition-colors ${
                    isOpen ? "bg-accent/15 text-accent-dark" : "bg-surface text-ink hover:bg-accent/10"
                  } ${questionClassName}`}
                >
                  {item.icon ? (
                    <span
                      aria-hidden="true"
                      className={`absolute bottom-6 ${
                        item.iconPosition === "right" ? "right-0" : "left-0"
                      }`}
                      style={{
                        transform: item.iconPosition === "right" ? "rotate(7deg)" : "rotate(-4deg)",
                      }}
                    >
                      {item.icon}
                    </span>
                  ) : null}
                  <span className="font-medium">{item.question}</span>
                </span>

                <span className={isOpen ? "text-accent-dark" : "text-muted"} aria-hidden="true">
                  {isOpen ? <MinusIcon /> : <PlusIcon />}
                </span>
              </button>
            </h3>

            {/*
              The answer stays mounted so Framer Motion can animate its height
              both ways. While collapsed it is `inert`, which keeps the hidden
              text out of the tab order and away from screen readers.
            */}
            <motion.div
              id={answerId}
              role="region"
              aria-labelledby={triggerId}
              inert={!isOpen}
              initial="collapsed"
              animate={isOpen ? "open" : "collapsed"}
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="ml-7 mt-1 md:ml-16">
                <div
                  className={`relative max-w-xs rounded-2xl bg-ink px-4 py-2 text-white ${answerClassName}`}
                >
                  {item.answer}
                </div>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 12h14M12 5v14" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <path d="M5 12h14" />
    </svg>
  );
}
