import ImageStream from "@/components/ImageStream";
import Button from "@/components/Button";
import SplitLines from "@/components/SplitLines";
import Reveal from "@/components/Reveal";
/*
  The photos shown in the stream. This section is a visual showcase, so it uses
  a hand-picked set of inverter photos rather than every product photo. The
  product pages themselves still come from the product data.

  These are finished photos with their own backgrounds, so they are shown whole
  and uncropped, with nothing drawn behind them.
*/
const inverterFolder = "/assets/ZING/Invertors";

const images = [
  { src: `${inverterFolder}/ZING-SP54-6KW-FRONT.jpeg` },
  { src: `${inverterFolder}/ZING-SP54-10KW.jpeg` },
  { src: `${inverterFolder}/ZING-SP66-6KW.jpeg` },
  { src: `${inverterFolder}/ZING-SP66-8KW.jpeg` },
  { src: `${inverterFolder}/ZING-SP66-10KW.jpeg` },
  { src: `${inverterFolder}/ZING-TP66-12KW.jpeg` },
  { src: `${inverterFolder}/ZING-TP66-15KW.jpeg` },
];

/*
  A dark, full-bleed band where product photography streams toward the viewer.
*/
export default function ProductStream() {
  return (
    <section id="product-stream" className="bg-ink">
      {/*
        Seven cards per rail, one for each photo, so every inverter is on
        screen at once and none of them repeats on the same rail.
      */}
      <ImageStream
        images={images}
        cards={7}
        className="h-[520px] w-full md:h-[680px]"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 py-12 text-center md:py-16">
          <SplitLines>
            <h2 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl">
              Energy That Never 
              <br />
              Misses a Beat.
            </h2>
          </SplitLines>

          <Reveal delay={220}>
            <div className="flex flex-col items-center gap-6">
              <p className="max-w-md text-balance text-sm leading-relaxed text-white/70 md:text-base">
                Zing lithium batteries, Solar Panels, and Inverters are engineered for long service life and measurable performance.
              </p>
              <Button href="/products" variant="light">
                View all products
              </Button>
            </div>
          </Reveal>
        </div>
      </ImageStream>
    </section>
  );
}
