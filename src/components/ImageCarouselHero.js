"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";

// Distance in pixels from the centre of the ring to the centre of each card.
const RING_RADIUS = 200;

/*
  Page header with the text on the left and a ring of product cards on the
  right that slowly orbits and tilts with the mouse.

  All cards share one rotation offset and are spaced evenly around the ring,
  so there is a single number to animate rather than one angle per card.

  `children` sits under the text on desktop and under the card ring on mobile.
  The products page uses it for the category links, which keeps this component
  free of product logic.
*/
export default function ImageCarouselHero({
  eyebrow,
  title,
  description,
  images,
  children,
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [rotationOffset, setRotationOffset] = useState(0);

  useEffect(() => {
    // Visitors who ask for reduced motion get a still ring.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // requestAnimationFrame pauses in background tabs and keeps the orbit in
    // step with the display, unlike a fixed setInterval.
    let frameId;
    let lastTime = performance.now();

    function tick(now) {
      const degreesPerSecond = 8;
      const elapsedSeconds = (now - lastTime) / 1000;
      lastTime = now;
      setRotationOffset((offset) => (offset + elapsedSeconds * degreesPerSecond) % 360);
      frameId = requestAnimationFrame(tick);
    }

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, []);

  function handleMouseMove(event) {
    const bounds = event.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: (event.clientX - bounds.left) / bounds.width,
      y: (event.clientY - bounds.top) / bounds.height,
    });
  }

  // Tilt at most 10 degrees either way from the centre of the ring.
  const tiltY = (mousePosition.x - 0.5) * 20;
  const tiltX = (mousePosition.y - 0.5) * 20;

  return (
    <section className="relative overflow-hidden border-b border-line py-12 md:py-20">
      {/*
        One grid for both layouts. On mobile the three blocks stack in source
        order: text, card ring, then the links. On desktop the text and links
        share the left column and the card ring spans both rows on the right.
      */}
      <Container className="grid gap-10 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-16">
        <div className="lg:col-start-1 lg:row-start-1">
          {eyebrow && (
            <Reveal>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-orange-400" />
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
                  {eyebrow}
                </span>
              </div>
            </Reveal>
          )}

          <Reveal delay={120}>
            <h1 className="mt-6 text-4xl font-semibold leading-[1.1] tracking-tight text-balance text-ink md:text-5xl">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={220}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
              {description}
            </p>
          </Reveal>
        </div>

        <div
          className="relative h-[400px] sm:h-[600px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-full lg:min-h-[600px]"
          style={{ perspective: "1000px" }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePosition({ x: 0.5, y: 0.5 })}
          aria-hidden="true"
        >
          {/* The ring is sized for desktop and scaled down on small screens so it never overflows. */}
          <div className="absolute inset-0 flex scale-[0.62] items-center justify-center sm:scale-100">
            {images.map((image, index) => {
              const angleInDegrees = rotationOffset + index * (360 / images.length);
              const angle = angleInDegrees * (Math.PI / 180);
              // Rounded because the browser shortens long decimals in inline styles,
              // which would otherwise make the server and client HTML disagree.
              const x = Math.round(Math.cos(angle) * RING_RADIUS * 100) / 100;
              const y = Math.round(Math.sin(angle) * RING_RADIUS * 100) / 100;

              return (
                <div
                  key={image.id}
                  className="absolute h-44 w-36"
                  style={{
                    transform: `translate(${x}px, ${y}px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) rotateZ(${image.rotation}deg)`,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-br from-orange-200 via-orange-50 to-white shadow-xl transition-transform duration-300 hover:scale-110">
                    {/*
                      The product photos are mostly transparent padding and several are
                      landscape. object-cover fills the frame height and only crops the
                      empty sides, so the product stays large while the inset leaves a
                      border of the orange background showing around it.
                    */}
                    <div className="absolute inset-2">
                      <Image
                        src={image.src}
                        alt=""
                        fill
                        sizes="160px"
                        className="object-cover"
                        priority={index < 3}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {children && (
          <div className="lg:col-start-1 lg:row-start-2 lg:self-end">
            <Reveal delay={320}>{children}</Reveal>
          </div>
        )}
      </Container>
    </section>
  );
}
