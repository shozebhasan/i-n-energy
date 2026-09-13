import ImageStream from "@/components/ImageStream";
import Button from "@/components/Button";
import SplitLines from "@/components/SplitLines";
import Reveal from "@/components/Reveal";
import { getAllProducts } from "@/lib/products";

/*
  The colours drawn behind each product card. They are a styling choice for
  this one section, not product data, so they live here. Cards cycle through
  the list in order.
*/
const cardBackgrounds = [
  "linear-gradient(160deg, #ff5f6d, #b3122e 55%, #3a0a24)",
  "linear-gradient(135deg, #ff7a18, #af002d 50%, #319197)",
  "linear-gradient(160deg, #1e3c72, #6a5acd 55%, #e0c3fc)",
  "linear-gradient(150deg, #f9d423, #ff4e50)",
  "linear-gradient(140deg, #8e2de2, #4a00e0)",
  "linear-gradient(150deg, #43cea2, #185a9d)",
];

/*
  These photos have their white background baked in (no transparency), so the
  colour behind them would be hidden and they would show up as white boxes.
  Remove an entry once a transparent cut-out of that photo is supplied.
*/
const opaquePhotos = new Set([
  "/assets/battery/bt-1123.png",
  "/assets/battery/battery-chinease-1.png",
  "/assets/battery/battery-11.jpg",
]);

/*
  A dark, full-bleed band where product photography streams toward the viewer.

  The photos come from the product data rather than a hardcoded list, so a
  product added (or unpublished) later shows up here, or disappears, without
  touching this file. Several products share photos, hence the de-duplication.
*/
export default async function ProductStream() {
  const products = await getAllProducts();

  const imageSources = new Set(
    products.flatMap((product) => [product.image, ...(product.images ?? [])])
  );
  const images = [...imageSources]
    .filter((src) => src && !opaquePhotos.has(src))
    .map((src, index) => ({
      src,
      background: cardBackgrounds[index % cardBackgrounds.length],
    }));

  return (
    <section id="product-stream" className="bg-ink">
      {/* The corridor only shows `cards` images per rail, so it grows with the
          photo list to make sure every photo gets a card. */}
      <ImageStream
        images={images}
        cards={Math.max(9, images.length)}
        className="h-[520px] w-full md:h-[680px]"
      >
        <div className="relative z-10 flex h-full flex-col items-center justify-between px-6 py-12 text-center md:py-16">
          <SplitLines>
            <h2 className="text-balance text-4xl font-semibold leading-[1.1] tracking-tight text-white md:text-5xl">
              Energy storage,
              <br />
              front and centre.
            </h2>
          </SplitLines>

          <Reveal delay={220}>
            <div className="flex flex-col items-center gap-6">
              <p className="max-w-md text-balance text-sm leading-relaxed text-white/70 md:text-base">
                Zing lithium batteries and the equipment around them, supplied
                by I&amp;N Energy.
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
