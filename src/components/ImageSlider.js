"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

/*
  A "cover flow" slider: the active picture sits in the middle at full size and
  its neighbours fan out to each side, turned away in 3D.

  The side positions are written as percentages of the card's own width, so the
  whole arrangement scales with the card. The card is sized by screen height
  (its width follows from the 2:3 ratio), so the slider, its caption and the
  hero controls below it always fit on one screen.
*/
const cardPositions = {
  center: { transform: "translateX(0) scale(1) rotateY(0deg)", opacity: 1, zIndex: 30 },
  right1: { transform: "translateX(86%) scale(0.84) rotateY(-24deg)", opacity: 0.7, zIndex: 20 },
  right2: { transform: "translateX(155%) scale(0.68) rotateY(-38deg)", opacity: 0.4, zIndex: 10 },
  left1: { transform: "translateX(-86%) scale(0.84) rotateY(24deg)", opacity: 0.7, zIndex: 20 },
  left2: { transform: "translateX(-155%) scale(0.68) rotateY(38deg)", opacity: 0.4, zIndex: 10 },
  hidden: { transform: "translateX(0) scale(0.4) rotateY(0deg)", opacity: 0, zIndex: 0 },
};

function getCardPosition(offset, total) {
  if (offset === 0) return cardPositions.center;
  if (offset === 1) return cardPositions.right1;
  if (offset === 2) return cardPositions.right2;
  if (offset === total - 1) return cardPositions.left1;
  if (offset === total - 2) return cardPositions.left2;
  return cardPositions.hidden;
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function ImageSlider({ items, autoplay = true, autoplayDelay = 3000, className = "" }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef(0);
  const total = items.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((index) => (index + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((index) => (index - 1 + total) % total);
  }, [total]);

  // Hovering pauses the rotation so a visitor can read the card they are on.
  useEffect(() => {
    if (!autoplay || isHovered || total <= 1) return;
    const interval = setInterval(nextSlide, autoplayDelay);
    return () => clearInterval(interval);
  }, [autoplay, autoplayDelay, isHovered, nextSlide, total]);

  // Arrow keys only work while the slider has focus. A listener on the window
  // would also fire while the visitor uses the keys for something else.
  function handleKeyDown(event) {
    if (event.key === "ArrowLeft") prevSlide();
    if (event.key === "ArrowRight") nextSlide();
  }

  function handleTouchStart(event) {
    touchStartX.current = event.touches[0].clientX;
  }

  // A short threshold, so a swipe changes the slide but a tap does not.
  function handleTouchEnd(event) {
    const distance = event.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(distance) < 45) return;
    if (distance < 0) nextSlide();
    else prevSlide();
  }

  if (total === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Product gallery"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative flex w-full select-none flex-col items-center outline-none ${className}`}
    >
      <div
        className="relative flex h-[min(46vh,520px)] w-full items-center justify-center"
        style={{ perspective: "1400px" }}
      >
        {items.map((item, index) => {
          const offset = (index - currentIndex + total) % total;
          const position = getCardPosition(offset, total);
          const isCenter = offset === 0;

          return (
            <div
              key={item.img}
              onClick={() => !isCenter && setCurrentIndex(index)}
              aria-hidden={!isCenter}
              className={`absolute aspect-[2/3] h-[min(43vh,500px)] overflow-hidden rounded-lg border border-white/10 bg-ink-soft transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                isCenter ? "shadow-2xl" : "cursor-pointer"
              }`}
              style={position}
            >
              <Image
                src={item.img}
                alt={isCenter ? item.alt : ""}
                fill
                sizes="(max-width: 640px) 70vw, 340px"
                className="object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* The pictures already show the model name, so the caption stays small. */}
      <div aria-live="polite" className="mt-3 flex flex-col items-center gap-1 text-center">
        {/* <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/60">{currentItem.category}</p> */}
        <p className="text-lg font-semibold text-white">{currentItem.name}</p>
        {currentItem.href ? (
          <Link
            href={currentItem.href}
            className="mt-1 text-sm text-white/80 underline-offset-4 hover:text-white hover:underline"
          >
            View product
          </Link>
        ) : null}
      </div>

      <div className="mt-3 flex items-center gap-4">
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous product"
          className="flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
        >
          <ChevronLeftIcon />
        </button>

        <div className="flex items-center gap-1.5">
          {items.map((item, index) => (
            <button
              key={item.img}
              type="button"
              onClick={() => setCurrentIndex(index)}
              aria-label={`Show ${item.name}`}
              aria-current={index === currentIndex}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-6 bg-accent" : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next product"
          className="flex h-9 w-9 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}
