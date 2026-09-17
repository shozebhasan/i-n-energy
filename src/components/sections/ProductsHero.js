import { ArrowUpRight } from "lucide-react";
import ImageCarouselHero from "@/components/ImageCarouselHero";

/*
  The product photos that orbit in the header. Each is used twice so the ring
  looks full; the tilts give it a loose, hand-placed look.
*/
const cardImages = [
  "/assets/battery/battery-5-2.png",
  "/assets/battery/battery-chin-123.png",
  "/assets/battery/battery-chin-3.png",
  "/assets/invertors/sp-54-10k.png",
];
const cardRotations = [-12, 6, -4, 10, -8, 4, -6, 8];

/*
  Top of the /products page.

  The category tiles are built from the catalogue, so they stay correct when
  products are added or unpublished in the admin.
*/
export default function ProductsHero({ catalogue }) {
  const images = cardRotations.map((rotation, index) => ({
    id: `card-${index}`,
    src: cardImages[index % cardImages.length],
    rotation,
  }));

  return (
    <ImageCarouselHero
      
      title={
        <>
          Everything an energy system needs, ZING Provides {" "}
          
        </>
      }
      description="Storage, conversion, generation and the parts that hold it all together. Every product is designed to work with the rest of the range, so a system can grow without replacing what is already installed."
      images={images}
    >
      <nav
        aria-label="Product categories"
        className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2"
      >
        {catalogue.map((category, index) => (
          <a
            key={category.slug}
            href={`#${category.slug}`}
            className="group flex flex-col bg-white p-5 transition-colors hover:bg-lime-50 focus-visible:relative focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink"
          >
            <span className="flex items-center justify-between text-xs text-muted">
              {String(index + 1).padStart(2, "0")}
              <ArrowUpRight className="h-4 w-4 text-ink transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
            <span className="mt-3 font-medium text-ink">{category.name}</span>
            <span className="mt-1 text-sm text-muted">{category.tagline}</span>
            <span className="mt-4 flex items-center gap-2 text-xs text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-lime-500" />
              {category.products.length}{" "}
              {category.products.length === 1 ? "product" : "products"}
            </span>
          </a>
        ))}
      </nav>
    </ImageCarouselHero>
  );
}
