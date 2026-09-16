"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Container from "./Container";
import Button from "./Button";
import SplitLines from "./SplitLines";

gsap.registerPlugin(ScrollTrigger);

/*
  The hero is a four-slide stage. The visitor moves through it with the arrows
  in the bottom corners.

  Two kinds of slide exist:

  - "video"  full-bleed footage with the text centred on top of a dark scrim.
             These clips have sound, so the bar at the bottom also carries a
             volume and a play/pause control.
  - "image"  a product photo beside the text.

  Both battery photos were shot on pure white (#ffffff, checked in the files
  themselves), so those slides put white behind the whole section. The photo
  then has no visible edge and reads as part of the page rather than a picture
  pasted onto it.

  Everything a marketer would want to change lives in this array.
*/
const heroSlides = [
  {
    id: "systems",
    type: "video",
    src: "/assets/main-vid-1.mp4",
    tone: "dark",
    title: "Energy systems engineered to perform for decades",
    description:
      "As energy needs continue to evolve, ZING is committed to making reliable, intelligent and sustainable renewable energy solutions more accessible.",
    showButtons: true,
  },
  {
    id: "manufacturing",
    type: "video",
    src: "/assets/main-vid-2.mp4",
    tone: "dark",
    title: "Built to Standards, And Tested",
    description:
      "Every unit is produced, assembled and inspected on the same production line, so what arrives on site performs exactly as expected.",
    showButtons: true,
  },
  {
    id: "battery-range",
    type: "image",
    src: "/assets/battery/battery-11.jpg",
    alt: "The Zing LiFePO4 battery range, from the smallest wall unit to the largest",
    tone: "light",
    title: "Storage that scales with the home",
    description:
      "One LiFePO₄ platform across the range, so a system can start small and grow without replacing what is already on the wall.",
  },
  {
    id: "battery-g100",
    type: "image",
    src: "/assets/battery/battery-chinease-1.png",
    alt: "Zing 51Z-IN-G100 LiFePO4 battery with integrated status display",
    tone: "light",
    title: "LiFePO₄ Battery 51Z-IN-G100",
    description:
      "Wall-mounted storage with the battery management system built in. The integrated display shows voltage, current, capacity and cell temperature without any extra hardware.Its integrated digital display provides convenient monitoring of key battery information, while the compact design makes it suitable for residential and commercial solar energy systems, backup power, and other energy-storage applications.",
  },
];

// How long an image slide stays on screen. Video slides move on when the clip
// ends instead.
const IMAGE_SLIDE_DURATION_MS = 8000;

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M6 4l14 8-14 8z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M7 4h3v16H7zM14 4h3v16h-3z" />
    </svg>
  );
}

function SoundOnIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M16.5 8.5a5 5 0 010 7" />
      <path d="M19 6a8.5 8.5 0 010 12" />
    </svg>
  );
}

function SoundOffIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M4 9v6h4l5 4V5L8 9H4z" />
      <path d="M17 10l4 4M21 10l-4 4" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M15 5l-7 7 7 7" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <path d="M9 5l7 7-7 7" />
    </svg>
  );
}

export default function HeroSlides() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const stageRef = useRef(null);

  const activeSlide = heroSlides[activeIndex];
  const isDarkSlide = activeSlide.tone === "dark";

  function goToNextSlide() {
    setActiveIndex((index) => (index + 1) % heroSlides.length);
  }

  function goToPreviousSlide() {
    setActiveIndex((index) => (index - 1 + heroSlides.length) % heroSlides.length);
  }

  /*
    As the hero scrolls away, its text and controls fall behind the page instead
    of leaving with it, and fade out on the way. The footage underneath stays
    put, which is what gives the section its depth.

    The trigger is the stage, which is stable, while the element that moves is
    the content layer. The slide itself is keyed and remounts on every change,
    so anything inside it would leave GSAP holding a node that is no longer in
    the document.
  */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.to(".hero-stage-content", {
        y: 90,
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: stage,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, stage);

    return () => context.revert();
  }, []);

  /*
    Browsers only allow a video to autoplay while it is muted, so the hero
    starts silent and the visitor turns the sound on themselves. The flag is
    applied through the element because React does not update `muted` on an
    already mounted video.

    There is no `autoPlay` attribute on the element: the effect below starts
    every clip, so playback has one owner and two competing play requests can
    never race each other.
  */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
  }, [isMuted, activeIndex]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isPlaying) {
      video.pause();
      return;
    }

    let isCurrentSlide = true;

    video.play().catch((error) => {
      /*
        Moving to the next slide takes this <video> out of the page, and
        pausing stops it, and both reject any play() that is still in flight
        with an AbortError. That is the hero working as intended, so it must
        not flip the controls to paused — only a real refusal should, which is
        normally the autoplay policy blocking a clip that has its sound on.
      */
      if (!isCurrentSlide || error.name === "AbortError") return;

      console.error("Hero video could not play:", error);
      setIsPlaying(false);
    });

    return () => {
      isCurrentSlide = false;
    };
  }, [isPlaying, activeIndex]);

  // Image slides have no "ended" event, so a timer moves them along. It stops
  // while playback is paused, which makes the pause button work for the whole
  // hero and not just for the videos.
  useEffect(() => {
    if (!isPlaying) return;
    if (heroSlides[activeIndex].type !== "image") return;

    const timer = setTimeout(goToNextSlide, IMAGE_SLIDE_DURATION_MS);
    return () => clearTimeout(timer);
  }, [activeIndex, isPlaying]);

  const controlButtonStyles = isDarkSlide
    ? "border-white/30 text-white hover:border-white hover:bg-white/10"
    : "border-line text-ink hover:border-ink hover:bg-ink/5";

  return (
    <div
      ref={stageRef}
      className={`relative w-full overflow-hidden ${isDarkSlide ? "bg-ink" : "bg-white"}`}
    >
      {/* The key restarts the fade whenever the slide changes. */}
      {activeSlide.type === "video" ? (
        <video
          key={activeSlide.id}
          ref={videoRef}
          src={activeSlide.src}
          onEnded={goToNextSlide}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="hero-fade absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {/* Scrim, so white text stays readable over the footage. */}
      {activeSlide.type === "video" ? <div className="absolute inset-0 bg-ink/65" /> : null}

      <Container className="hero-stage-content relative z-10">
        <div className="flex min-h-[78vh] flex-col md:min-h-[86vh]">
          <div key={activeSlide.id} className="hero-fade flex flex-1 items-center py-20 md:py-24">
            {activeSlide.type === "image" ? (
              <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                <div>
                  {/*
                    The hero is already on screen, so the headline plays on
                    mount. The slide is keyed, so changing slide remounts this
                    and the lines run again for the new title. The delay lets
                    the hero-fade settle first — otherwise the lines would be
                    rising while the whole block is still fading up.
                  */}
                  <SplitLines playOnMount delay={0.25}>
                    <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl md:text-6xl">
                      {activeSlide.title}
                    </h1>
                  </SplitLines>
                  <p className="mt-8 max-w-xl text-base leading-relaxed text-muted md:text-lg">
                    {activeSlide.description}
                  </p>
                </div>

                {/*
                  object-contain keeps each product at its own proportions. The
                  empty space left around it is invisible because the slide and
                  the photo share the same white.
                */}
                <div className="relative h-[300px] w-full md:h-[480px] lg:h-[540px]">
                  <Image
                    src={activeSlide.src}
                    alt={activeSlide.alt}
                    fill
                    sizes="(max-width: 768px) 90vw, 50vw"
                    className="object-contain"
                  />
                </div>
              </div>
            ) : (
              <div className="flex w-full flex-col items-center text-center">
                <SplitLines playOnMount delay={0.25} className="max-w-5xl">
                  <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-[5.25rem]">
                    {activeSlide.title}
                  </h1>
                </SplitLines>

                <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-xl">
                  {activeSlide.description}
                </p>

                {activeSlide.showButtons ? (
                  <div className="mt-12 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5">
                    <Button href="/#products" variant="light" size="lg" className="w-full sm:w-auto">
                      Explore products
                    </Button>
                    <Button
                      href="/#contact"
                      variant="outlineLight"
                      size="lg"
                      className="w-full sm:w-auto"
                    >
                      Talk to our team
                    </Button>
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {/*
            Previous and next sit in opposite corners. The playback controls
            stay between them, and the volume button only appears while a clip
            with sound is on screen.
          */}
          <div className="flex items-center justify-between pb-8">
            <button
              type="button"
              onClick={goToPreviousSlide}
              aria-label="Previous slide"
              className={`flex h-11 w-11 items-center justify-center border transition-colors ${controlButtonStyles}`}
            >
              <ArrowLeftIcon />
            </button>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsPlaying((playing) => !playing)}
                aria-label={isPlaying ? "Pause" : "Play"}
                className={`flex h-11 w-11 items-center justify-center border transition-colors ${controlButtonStyles}`}
              >
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>

              {activeSlide.type === "video" ? (
                <button
                  type="button"
                  onClick={() => setIsMuted((muted) => !muted)}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className={`flex h-11 w-11 items-center justify-center border transition-colors ${controlButtonStyles}`}
                >
                  {isMuted ? <SoundOffIcon /> : <SoundOnIcon />}
                </button>
              ) : null}
            </div>

            <button
              type="button"
              onClick={goToNextSlide}
              aria-label="Next slide"
              className={`flex h-11 w-11 items-center justify-center border transition-colors ${controlButtonStyles}`}
            >
              <ArrowRightIcon />
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
}
