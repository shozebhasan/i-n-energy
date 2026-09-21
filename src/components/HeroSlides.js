"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Container from "./Container";
import Button from "./Button";
import SplitLines from "./SplitLines";
import ImageSlider from "./ImageSlider";
import SplitHero from "./SplitHero";

gsap.registerPlugin(ScrollTrigger);

/*
  The hero is a four-slide stage. The visitor moves through it with the arrows
  in the bottom corners.

  Five kinds of slide exist:

  - "video"  full-bleed footage with the text centred on top of a dark scrim.
             The bar at the bottom carries a volume control unless the slide
             sets "hasSound: false". A slide with "overlay: false" shows the
             footage clean, keeping its text for screen readers only. A short
             clip sets "duration": it loops, and the slide moves on when that
             time is up rather than when the clip ends.
  - "image"  a product photo beside the text, with an optional "button"
             linking to the product.
  - "poster" a finished design with its text already in the picture. On
             large screens the picture itself fills the stage edge to edge.
             Below that its text would be too small to read, so the same
             content is laid out as real text with one picture cut from the
             design ("mobileSrc"). A design that is not 16:9 sets "backdrop"
             so the empty stage beside it is filled rather than left bare.

  - "split"  the SplitHero layout: a photo on the left and the message on
             the right, filling the whole stage. Its content lives in
             SplitHero.js, not in this array.
  - "slider" a 3D product slider (ImageSlider) with its own arrows, on a
             dark stage. It stays up for "duration" so the slider can turn
             through its products before the hero moves on.

  Image slides put white behind the whole section. A poster slide
  sets "background" to the exact colour around its design for the same reason:
  when the screen is taller than 16:9 the stage shows above and below it.

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
    id: "split",
    type: "split",
    // Light tone gives the arrows a white fill, so they stay visible over both
    // the photo and the white text column.
    tone: "light",
  },
  {
    id: "about-zing",
    type: "poster",
    src: "/main-slide-3.png",
    mobileSrc: "/assets/main-slide-3-mobile.jpg",
    mobileWidth: 658,
    mobileHeight: 512,
    alt: "Engineers inspecting solar panels at a ZING Energy installation",
    tone: "light",
    background: "#ffffff",
    eyebrow: "Powered by I&N Energy",
    title: "ZING Energy",
    // Keep this in step with the text inside the picture. It is what phones,
    // tablets and screen readers get instead of the picture.
    description: [
      "ZING was created for this new energy era.",
      "Backed by I & N Energy Solutions Pvt. Ltd., ZING brings together solar power conversion, energy storage and global solar technologies under one growing international brand.",
      "We work with specialized manufacturing partners to develop and source solar inverters, LiFePO₄ batteries, energy-storage systems and other renewable-energy products. We also provide access to solar modules from internationally recognized Tier-1 manufacturers.",
    ],
  },
  {
    id: "product-showcase",
    type: "slider",
    tone: "dark",
    title: "All you need for your solar energy system",
    // One turn through every product: twelve cards at three seconds each.
    duration: 36000,
    items: [
      { name: "ZING-SP66-8KW", category: "Solar inverter", img: "/assets/ZING/Invertors/ZING-SP66-8KW.jpeg", href: "/products#solar-inverters" },
      { name: "ZING-SP54-10KW", category: "Solar inverter", img: "/assets/ZING/Invertors/ZING-SP54-10KW.jpeg", href: "/products#solar-inverters" },
      { name: "ZING-SP66-10KW", category: "Solar inverter", img: "/assets/ZING/Invertors/ZING-SP66-10KW.jpeg", href: "/products#solar-inverters" },
      { name: "ZING-TP66-12KW", category: "Solar inverter", img: "/assets/ZING/Invertors/ZING-TP66-12KW.jpeg", href: "/products#solar-inverters" },
      { name: "ZING-TP66-15KW", category: "Solar inverter", img: "/assets/ZING/Invertors/ZING-TP66-15KW.jpeg", href: "/products#solar-inverters" },
      { name: "ZING Energy Storage", category: "Battery", img: "/assets/ZING/batteries/big-battery.jpeg", href: "/products#lithium-batteries" },
      { name: "ZING LiFePO₄ Battery", category: "Battery", img: "/assets/ZING/batteries/Life-PO4.jpeg", href: "/products#lithium-batteries" },
      { name: "ZING Powerwall", category: "Battery", img: "/assets/ZING/batteries/POWERWALL.jpeg", href: "/products#lithium-batteries" },
      { name: "25Z-IN-G100", category: "LiFePO₄ battery", img: "/assets/ZING/batteries/ZING-25Z-IN-G100.jpeg", href: "/products/zing-25z-in-g100" },
      { name: "51Z-IN-G100", category: "LiFePO₄ battery", img: "/assets/ZING/batteries/ZING-51Z-IN-G100.jpeg", href: "/products/zing-51z-in-g100" },
      { name: "51Z-IN-G200", category: "LiFePO₄ battery", img: "/assets/ZING/batteries/ZING-51Z-IN-G200.jpeg", href: "/products/zing-51z-in-g200" },
      { name: "51Z-IN-G314", category: "LiFePO₄ battery", img: "/assets/ZING/batteries/ZING-51Z-IN-G314.jpeg", href: "/products#lithium-batteries" },
    ].map((item) => ({ ...item, alt: `${item.name}, ${item.category.toLowerCase()} by ZING` })),
  },
];

// How long an image or poster slide stays on screen. Video slides move on when the clip
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
  const isSliderSlide = activeSlide.type === "slider";

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

  // Image and poster slides have no "ended" event, and looping videos never
  // end, so a timer moves them along. It stops while playback is paused, which
  // makes the pause button work for the whole hero and not just for the videos.
  useEffect(() => {
    if (!isPlaying) return;
    if (heroSlides[activeIndex].type === "video" && !heroSlides[activeIndex].duration) return;

    const duration = heroSlides[activeIndex].duration || IMAGE_SLIDE_DURATION_MS;
    const timer = setTimeout(goToNextSlide, duration);
    return () => clearTimeout(timer);
  }, [activeIndex, isPlaying]);

  const controlButtonStyles = isDarkSlide
    ? "border-white/30 text-white hover:border-white hover:bg-white/10"
    // The white fill keeps the arrows visible where a light slide's picture
    // has dark areas underneath them.
    : "border-line bg-white text-ink hover:border-ink hover:bg-surface";

  return (
    <div
      ref={stageRef}
      className={`relative w-full overflow-hidden ${isDarkSlide ? "bg-ink" : "bg-white"}`}
      style={activeSlide.background ? { backgroundColor: activeSlide.background } : undefined}
    >
      {/* The key restarts the fade whenever the slide changes. */}
      {activeSlide.type === "video" ? (
        <video
          key={activeSlide.id}
          ref={videoRef}
          src={activeSlide.src}
          onEnded={goToNextSlide}
          loop={Boolean(activeSlide.duration)}
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="hero-fade absolute inset-0 h-full w-full object-cover"
        />
      ) : null}

      {/*
        On large screens the design is scaled down to fit the stage with
        object-contain, so none of its text is cropped. Where the stage is wider
        than the design, the slide's "background" colour fills the sides.
      */}
      {activeSlide.type === "poster" ? (
        <div key={activeSlide.id} className="hero-fade absolute inset-0 hidden lg:block">
          {/*
            A design that is squarer than the stage would otherwise sit on a
            bare band at each side. The same picture, cropped and blurred
            behind it, carries its own backdrop out to the edges so the slide
            still reads as one image and nothing in the design is cut off.
            It is scaled up because a blur of this size softens the edges of
            the picture itself.
          */}
          {activeSlide.backdrop ? (
            <Image
              src={activeSlide.src}
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
              className="scale-110 object-cover blur-2xl"
            />
          ) : null}
          <Image
            src={activeSlide.src}
            alt=""
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>
      ) : null}

      {activeSlide.type === "split" ? (
        <div key={activeSlide.id} className="hero-fade absolute inset-0">
          <SplitHero />
        </div>
      ) : null}

      {/* Scrim, so white text stays readable over the footage. */}
      {activeSlide.type === "video" && activeSlide.overlay !== false ? (
        <div className="absolute inset-0 bg-ink/65" />
      ) : null}

      {/*
        On a split slide this layer holds only the arrows, but it still covers
        the whole stage. Letting clicks pass through it keeps the slide's own
        button and links usable; the control row switches them back on.
      */}
      <Container
        className={`hero-stage-content relative z-10 ${
          activeSlide.type === "split" ? "pointer-events-none" : ""
        }`}
      >
        {/*
          Every slide fills the screen below the marquee and navbar (about
          104px), so the slide and its arrows are visible together without
          scrolling. svh keeps mobile browser toolbars from hiding the arrows.
        */}
        <div className="flex min-h-[calc(100svh-104px)] flex-col">
          <div
            key={activeSlide.id}
            className={`hero-fade flex flex-1 items-center ${isSliderSlide ? "py-6 md:py-8" : "py-10 md:py-12"}`}
          >
            {activeSlide.type === "slider" ? (
              <div className="w-full">
                <h1 className="mb-4 text-center text-2xl font-semibold uppercase tracking-tight text-white sm:text-3xl">
                  {activeSlide.title}
                </h1>
                {/* The hero's pause button pauses the slider too. */}
                <ImageSlider items={activeSlide.items} autoplay={isPlaying} />
              </div>
            ) : activeSlide.type === "poster" ? (
              // On large screens the headline is in the picture, so the text
              // version stays available to screen readers only.
              <div className="w-full lg:sr-only">
                {activeSlide.eyebrow ? (
                  <p
                    className={`mb-4 text-xs font-medium uppercase tracking-[0.2em] sm:text-sm ${
                      isDarkSlide ? "text-white" : "text-ink"
                    }`}
                  >
                    {activeSlide.eyebrow}
                  </p>
                ) : null}
                <SplitLines playOnMount delay={0.25}>
                  <h1
                    className={`text-5xl font-semibold uppercase leading-[1.05] tracking-tight sm:text-7xl ${
                      isDarkSlide ? "text-white" : "text-ink"
                    }`}
                  >
                    {activeSlide.title}
                  </h1>
                </SplitLines>
                <div className="mt-10 grid grid-cols-1 items-center gap-10 md:grid-cols-2">
                  <Image
                    src={activeSlide.mobileSrc}
                    alt={activeSlide.alt}
                    width={activeSlide.mobileWidth}
                    height={activeSlide.mobileHeight}
                    sizes="(max-width: 768px) 90vw, 45vw"
                    className="h-auto w-full rounded-2xl"
                  />
                  <div
                    className={`space-y-3 border-b pb-6 text-base leading-relaxed ${
                      isDarkSlide ? "border-white/40 text-white" : "border-ink text-ink"
                    }`}
                  >
                    {activeSlide.description.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                </div>
                {activeSlide.button ? (
                  <Button href={activeSlide.button.href} size="lg" className="mt-10 w-full sm:w-auto">
                    {activeSlide.button.label}
                  </Button>
                ) : null}
              </div>
            ) : activeSlide.type === "image" ? (
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
                  {activeSlide.button ? (
                    <Button href={activeSlide.button.href} size="lg" className="mt-10 w-full sm:w-auto">
                      {activeSlide.button.label}
                    </Button>
                  ) : null}
                </div>

                {/*
                  The photo has its own studio backdrop rather than pure white,
                  so it is shown at its natural proportions with soft corners
                  instead of blending into the slide.
                */}
                <Image
                  src={activeSlide.src}
                  alt={activeSlide.alt}
                  width={activeSlide.width}
                  height={activeSlide.height}
                  sizes="(max-width: 768px) 90vw, 50vw"
                  className="h-auto w-full rounded-2xl"
                />
              </div>
            ) : activeSlide.type === "split" ? null : (
              <div
                className={`flex w-full flex-col items-center text-center ${
                  activeSlide.overlay === false ? "sr-only" : ""
                }`}
              >
                <SplitLines playOnMount delay={0.25} className="max-w-5xl">
                  <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-6xl">
                    {activeSlide.title}
                  </h1>
                </SplitLines>

                <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-xl">
                  {activeSlide.description}
                </p>

                {activeSlide.showButtons ? (
                  <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row sm:gap-5">
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
          <div className="pointer-events-auto flex items-center justify-between pb-8">
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

              {activeSlide.type === "video" && activeSlide.hasSound !== false ? (
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
