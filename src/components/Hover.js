// Built using Hyperiux Vault: https://vault.hyperiux.com

"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

/*
  A stack of cards that overlap each other and fan apart when one is hovered.

  A card is: { id?, tag?, text, href?, bg, accent? }

    tag     small label at the top of the card
    text    the display line, set large
    href    optional — a card with one renders as a link, so it can be reached
            with the keyboard and opened like any other link on the site
    bg      any CSS colour
    accent  Tailwind text-colour class that reads against `bg`

  On touch screens the fan makes no sense (there is no hover), so the cards are
  laid out as a plain vertical list instead.
*/
const DEFAULT_CARDS = [
  { tag: "Efficiency", text: "A must-have for anyone looking to save time.", bg: "#E4FF1A", accent: "text-[#1A1A1A]" },
  { tag: "Workflow", text: "This tech has completely streamlined my daily tasks.", bg: "#DD1155", accent: "text-white" },
  { tag: "Simplicity", text: "Innovative and powerful, yet so easy to use!", bg: "#FF5714", accent: "text-[#1A1A1A]" },
  { tag: "Reliability", text: "It made everything smoother. Highly recommend!", bg: "#E980FC", accent: "text-[#1A1A1A]" },
  { tag: "Speed", text: "Fast, reliable, and user-friendly.", bg: "#67D6A3", accent: "text-[#1A1A1A]" },
];

const PRESET_ROTATIONS = [-8, 4, -3, 5, -4, 6, 3, -6, 2, -5];

function ArrowUpRight({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.25}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

/*
  The inside of a card, shared by the hover stack and the touch list so the two
  layouts cannot drift apart. Everything is drawn in currentColor, which the
  card's `accent` class sets, so one markup works on light and dark cards.
*/
function CardContent({ card, index, textClassName }) {
  return (
    <>
      <div className="relative z-2 flex items-center justify-between gap-3">
        {card.tag ? (
          <span className="text-lg font-semibold uppercase tracking-[0.18em] opacity-70">
            {card.tag}
          </span>
        ) : null}
      </div>

      <div className="relative z-2 flex flex-1 items-center">
        <p className={`m-0 tracking-[-0.03em] ${textClassName}`}>{card.text}</p>
      </div>

      <div className="relative z-2 flex flex-col gap-4">
        <div className="h-px w-full bg-current/15" />
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-current/30">
              <ArrowUpRight className="size-3.75" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.16em]">
              Explore
            </span>
          </div>
          <span className="text-[11px] font-medium uppercase tabular-nums tracking-[0.16em] opacity-55">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </div>
    </>
  );
}

function HoverStack({
  cards = DEFAULT_CARDS,
  cardWidth = 280,
  cardHeight = 360,
  overlap = 96,
  hoverLift = 30,
  pushDistance = 235,
  spread = 24,
  rotation = 7,
  duration = 0.5,
  accentColor = "transparent",
  className = "",
}) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false)
  );

  useEffect(() => {
    setHasMounted(true);
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => setIsTouch(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;

    const onChange = (event) => {
      setReduceMotion(event.matches);
      if (event.matches) setActiveIndex(null);
    };

    setReduceMotion(mq.matches);
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  const preparedCards = useMemo(() => {
    const rotationScale = rotation / 7;

    return cards.map((card, index) => {
      const presetRotation =
        PRESET_ROTATIONS[index % PRESET_ROTATIONS.length] +
        (index % 2 === 0 ? 0 : 1);

      const baseX = index * overlap;

      return {
        ...card,
        _rotation: presetRotation * rotationScale,
        _baseX: baseX,
        _baseZ: index + 1,
      };
    });
  }, [cards, overlap, rotation]);

  const getCardStyle = (card, index) => {
    const isActive = activeIndex === index;
    const hasActive = activeIndex !== null;

    let x = card._baseX;
    let y = 0;
    let rotate = card._rotation;
    let zIndex = card._baseZ;
    let scale = 1;

    if (reduceMotion) {
      // No lift / push / rotate snap — only raise z-index so the card is readable.
      if (isActive) zIndex = 999;

      return {
        "--card-width": `${cardWidth}px`,
        "--card-height": `${cardHeight}px`,
        transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(1)`,
        zIndex,
        transition: "none",
        background: card.bg,
      };
    }

    let boxShadow;

    if (hasActive) {
      if (index < activeIndex) {
        x -= pushDistance;
        y -= spread * 0.4;
      } else if (index > activeIndex) {
        x += pushDistance;
        y += spread * 0.4;
      }

      if (isActive) {
        x = card._baseX;
        y = -hoverLift;
        rotate = 0;
        zIndex = 999;
        scale = 1.035;
        boxShadow = `0 0 0 3px ${accentColor}`;
      }
    }

    const activeMs = Math.max(0, duration) * 1000;
    const transition = isActive
      ? `transform ${activeMs}ms cubic-bezier(0.22, 1.6, 0.32, 1), box-shadow ${activeMs * (900 / 700)}ms cubic-bezier(0.22, 1.6, 0.32, 1)`
      : hasActive
        ? `transform ${activeMs}ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow ${activeMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
        : `transform ${activeMs * (480 / 700)}ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow ${activeMs * (380 / 700)}ms cubic-bezier(0.4, 0, 0.2, 1)`;

    return {
      "--card-width": `${cardWidth}px`,
      "--card-height": `${cardHeight}px`,
      transform: `translate3d(${x}px, ${y}px, 0) rotate(${rotate}deg) scale(${scale})`,
      zIndex,
      transition,
      background: card.bg,
      boxShadow,
    };
  };

  const totalWidth =
    preparedCards.length > 0
      ? preparedCards.at(-1)._baseX + cardWidth
      : cardWidth;

  // The layout depends on the pointer type and the reduced-motion setting,
  // neither of which is known during SSR, so render nothing until mounted.
  if (!hasMounted) {
    return null;
  }

  return (
    <div className={`relative w-full px-[7vw] ${className}`}>
      {isTouch ? (
        <div className="flex flex-col gap-8">
          {cards.map((card, index) => {
            const Card = card.href ? Link : "div";

            return (
              <Card
                key={card.id ?? index}
                href={card.href}
                className={`relative flex min-h-[62vw] w-full select-none flex-col justify-between overflow-hidden rounded-3xl border border-black/10 p-6 ${card.accent || ""}`}
                style={{ background: card.bg }}
              >
                <CardContent
                  card={card}
                  index={index}
                  textClassName="max-w-full text-2xl leading-[1.05] max-md:text-xl"
                />
              </Card>
            );
          })}
        </div>
      ) : (
        <div
          className="relative mx-auto"
          style={{
            "--stack-width": `${totalWidth}px`,
            "--stack-height": `${cardHeight + (reduceMotion ? 0 : hoverLift) + 24}px`,
            width: "var(--stack-width)",
            height: "var(--stack-height)",
          }}
        >
          {preparedCards.map((card, index) => {
            const Card = card.href ? Link : "div";

            // Focus fans the stack the same way hover does, so the cards can be
            // tabbed through rather than only reached with a mouse.
            const activate = () => setActiveIndex(index);
            const deactivate = () => setActiveIndex(null);

            return (
              <Card
                key={card.id ?? index}
                href={card.href}
                className={`absolute left-0 top-0 flex h-(--card-height) w-(--card-width) origin-[center_center] select-none flex-col justify-between overflow-hidden rounded-2xl border border-black/10 p-6 will-change-transform ${
                  card.href ? "cursor-pointer" : "cursor-default"
                } ${card.accent || ""}`}
                style={getCardStyle(card, index)}
                onMouseEnter={activate}
                onMouseLeave={deactivate}
                onFocus={activate}
                onBlur={deactivate}
              >
                <CardContent
                  card={card}
                  index={index}
                  textClassName="max-w-[95%] text-[1.75rem] leading-none"
                />
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default HoverStack;
