import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/*
  A split hero slide: a full-height picture on the left, the message on the
  right. It fills whatever box it is placed in, because the hero stage
  (HeroSlides.js) decides the height.
*/

// PLACEHOLDER: demo picture from the component library. Replace it with a real
// ZING photo in /public and remove cdn.21st.dev from next.config.mjs.
const heroImage =
  "https://cdn.21st.dev/assets/mirror/0d/0dcef67a9a4911ba1b860dd16a39755058dcabf707463ec54ba654a649d10b16.jpg";

// PLACEHOLDER: stock avatars and an invented figure from the demo. Replace
// them with real customers and a real number before launch, or remove them.
const placeholderAvatars = [1, 2, 3, 4].map(
  (number) => `https://images.cnippet.dev/image/upload/v1770400411/a${number}.jpg`
);
const placeholderStat = { value: "15,000+", label: "Teams Connected" };

// The two brand marks that alternate in the looping strip under the button.
const marqueeLogos = [
  { src: "/zing-w-bg.png", alt: "ZING", width: 718, height: 347 },
  { src: "/main-logo.png", alt: "I&N Energy", width: 1254, height: 1254 },
];

export default function SplitHero() {
  return (
    <div className="grid h-full w-full grid-cols-1 grid-rows-[minmax(0,36fr)_minmax(0,50fr)] bg-white text-ink md:grid-cols-12 md:grid-rows-1">
      <div className="relative md:col-span-6">
        <Image
          src={heroImage}
          alt="Solar installation"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
      </div>

      {/*
        On phones the photo takes the top 46% of the slide, so the text is set
        tighter there and starts right under the photo. The bottom padding keeps
        the hero's arrows clear of the logo strip.
      */}
      <div className="flex min-w-0 items-start px-6 pt-4 pb-20 md:items-center md:col-span-6 md:pl-10 md:pr-6 md:pt-6 md:pb-24">
        <div className="w-full max-w-3xl space-y-3 md:space-y-8 lg:space-y-10">
          <h1 className="text-3xl font-normal tracking-tighter sm:text-4xl md:text-6xl lg:text-7xl">
            Energy Is Changing. ZING Is Ready.
          </h1>

          <p className="max-w-2xl text-md font-light sm:text-base md:text-lg">
            The way the world generates, stores and uses energy is changing.
            ZING combines solar power conversion, energy storage and global solar
            technologies to create smarter and more reliable energy solutions for
            homes, businesses and industries.
          </p>

          {/* <div className="flex flex-wrap items-center gap-3">
            <div className="flex -space-x-3">
              {placeholderAvatars.map((avatar) => (
                <span
                  key={avatar}
                  className="relative size-9 overflow-hidden md:size-11 rounded-full border-2 border-white bg-surface"
                >
                  <Image src={avatar} alt="" fill sizes="(max-width: 768px) 36px, 44px" className="object-cover" />
                </span>
              ))}
            </div>
            <div className="flex flex-col text-sm">
              <span className="text-base sm:text-lg">{placeholderStat.value}</span>
              <span>{placeholderStat.label}</span>
            </div>
          </div> */}

          {/*
            The pill and the circle change colour together on hover, while the
            arrow slides out to the right and a second arrow slides in from the
            left to take its place.
          */}
          <Link href="/#contact" className="group inline-flex items-center">
            <span className="rounded-full bg-accent px-6 py-3 text-white transition-colors duration-500 group-hover:bg-ink">
              Start a Project
            </span>
            <span className="relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-accent text-white transition-colors duration-500 group-hover:bg-ink">
              <ArrowUpRight
                aria-hidden="true"
                className="absolute size-5 transition-transform duration-500 group-hover:translate-x-10"
              />
              <ArrowUpRight
                aria-hidden="true"
                className="absolute size-5 -translate-x-10 transition-transform duration-500 group-hover:translate-x-0"
              />
            </span>
          </Link>

          {/*
            Same looping technique as the announcement bar (Marquee.js): two
            identical groups, moved by -50%. Each group repeats the logo pair
            so it is always wider than the column and no gap shows while it
            loops.
          */}
          <div className="relative -mx-6 overflow-hidden md:-mx-10">
            <div className="pointer-events-none absolute left-0 z-10 h-full w-16 bg-linear-to-r from-white md:w-20" />
            <div className="pointer-events-none absolute right-0 z-10 h-full w-16 bg-linear-to-l from-white md:w-20" />

            <div className="flex w-max animate-marquee [animation-duration:25s]">
              {[0, 1].map((group) => (
                <div key={group} className="flex shrink-0 items-center" aria-hidden={group === 1}>
                  {[0, 1, 2].flatMap((repeat) =>
                    marqueeLogos.map((logo) => (
                      <div key={`${repeat}-${logo.src}`} className="px-4 md:px-6">
                        <Image
                          src={logo.src}
                          alt={group === 0 && repeat === 0 ? logo.alt : ""}
                          width={logo.width}
                          height={logo.height}
                          className="h-8 w-auto md:h-11"
                        />
                      </div>
                    ))
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
