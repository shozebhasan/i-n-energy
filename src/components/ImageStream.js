"use client";

import Image from "next/image";
import { useId, useMemo } from "react";

/*
  A corridor of image cards rushing from a vanishing point toward the viewer,
  on two mirrored rails. JavaScript port of the image-stream-hero component.

  Only CSS 3D perspective does the work: as a card's z grows, the projection
  makes it bigger *and* sweeps it outward from the centre, so one keyframe
  animation reads as two.

  Three decisions shape the path, each fixing a visible artefact:

  1. Depth is authored as apparent size, growing by a constant ratio. Spacing z
     evenly instead makes the near cards tear apart as the projection blows up.
  2. The rails open hard early and then hold (`fan` > 1), so the ribbon leaves
     the centre flat, bends once, then runs out on the diagonal.
  3. A card is born slightly across the axis (`railBirth` is negative), so the
     centre is always covered and never blinks open once per cycle.

  Every length is in `cqw` (a percentage of the container's width), so the
  corridor keeps its proportions at any screen size.
*/
const DEFAULT_PATH = {
  perspective: 30, // lower = wider-angle, more dramatic rush
  cardWidth: 18,
  cardHeight: 25,
  cardRadius: 0, // the site uses square corners throughout
  birthHeight: 2.6, // on-screen card height where a card is born
  exitHeight: 46, // on-screen card height as it leaves the frame
  railBirth: -11,
  railExit: 44,
  fan: 3.3,
  turnBirth: 6, // Y-rotation in degrees
  turnExit: 28,
  stops: 24, // keyframe stops used to trace the curve
};

/*
  Samples the path into CSS keyframes. `direction` is 1 for the right rail and
  -1 for the left one, which mirrors both the offset and the rotation.
*/
function buildKeyframes(direction, animationName, path) {
  const steps = [];

  for (let step = 0; step <= path.stops; step++) {
    const progress = step / path.stops;

    const scale =
      (path.birthHeight / path.cardHeight) *
      Math.pow(path.exitHeight / path.birthHeight, progress);
    const depth = path.perspective * (1 - 1 / scale);
    const rail =
      path.railExit -
      (path.railExit - path.railBirth) * Math.pow(1 - progress, path.fan);
    const turn = path.turnBirth + (path.turnExit - path.turnBirth) * progress;

    const x = (direction * rail).toFixed(2);
    const z = depth.toFixed(2);
    const rotation = (-direction * turn).toFixed(2);

    steps.push(
      `${(progress * 100).toFixed(2)}%{transform:translate3d(${x}cqw,0,${z}cqw) rotateY(${rotation}deg)}`
    );
  }

  return `@keyframes ${animationName}{${steps.join("")}}`;
}

/**
 * images    [{ src, background }] cycled onto both rails; fewer than `cards`
 *           repeat. `background` is any CSS background drawn behind the photo
 * cards     cards per rail at once — a denser corridor, not a faster one
 * speed     seconds for one card to travel the whole corridor
 * axis      vertical position of the vanishing point, % of the height
 * path      overrides for any value in DEFAULT_PATH
 * children  content rendered on top of the corridor
 */
export default function ImageStream({
  images,
  cards = 9,
  speed = 18,
  axis = 55,
  path,
  children,
  className = "",
}) {
  // useId keeps the keyframe names unique if the component is used twice.
  const id = useId().replace(/[^a-zA-Z0-9]/g, "");
  const rightRail = `stream-right-${id}`;
  const leftRail = `stream-left-${id}`;
  const cardClass = `stream-card-${id}`;

  const corridor = useMemo(() => ({ ...DEFAULT_PATH, ...path }), [path]);

  const css = useMemo(
    () =>
      buildKeyframes(1, rightRail, corridor) +
      buildKeyframes(-1, leftRail, corridor) +
      // Pausing rather than removing the animation keeps the corridor whole:
      // every card has already been placed mid-flight by its negative delay,
      // so it freezes as a finished still instead of collapsing to the centre.
      `@media(prefers-reduced-motion:reduce){.${cardClass}{animation-play-state:paused}}`,
    [rightRail, leftRail, cardClass, corridor]
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ containerType: "inline-size" }}
    >
      <style>{css}</style>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          perspective: `${corridor.perspective}cqw`,
          perspectiveOrigin: `50% ${axis}%`,
        }}
      >
        <div className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
          {[rightRail, leftRail].map((railName) =>
            Array.from({ length: cards }, (_, index) => {
              // Both rails walk the same sequence, so the left side mirrors
              // the right at every depth.
              const image = images.length > 0 ? images[index % images.length] : null;

              return (
                <div
                  key={`${railName}-${index}`}
                  className={`${cardClass} absolute overflow-hidden`}
                  style={{
                    // Transparent product photos let this colour show around
                    // the product; white is the fallback when none is given.
                    background: image?.background ?? "#ffffff",
                    left: "50%",
                    top: `${axis}%`,
                    width: `${corridor.cardWidth}cqw`,
                    height: `${corridor.cardHeight}cqw`,
                    marginLeft: `${-corridor.cardWidth / 2}cqw`,
                    marginTop: `${-corridor.cardHeight / 2}cqw`,
                    borderRadius: `${corridor.cardRadius}cqw`,
                    animation: `${railName} ${speed}s linear infinite`,
                    // A negative delay drops each card mid-flight, so the
                    // corridor is already full on the first frame.
                    animationDelay: `${-(index * speed) / cards}s`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {image ? (
                    <Image
                      src={image.src}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 30vw, 50vw"
                      className="object-contain p-[4%]"
                      draggable={false}
                    />
                  ) : null}
                </div>
              );
            })
          )}
        </div>
      </div>

      {children}
    </div>
  );
}
