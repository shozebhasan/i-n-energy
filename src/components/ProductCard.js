import Link from "next/link";
import Image from "next/image";

/*
  Card used wherever a product is listed. It only shows the fields the listing
  needs — the full specifications live on the product page.

  The photo panel is a square, so it is the same height in every card of a row
  whatever the card ends up being. It used to be 40% of the card height with a
  minimum, but a percentage of a height that is itself decided by the content
  is circular: the tallest card in a row resolved it differently from its
  neighbours, the text below started at a different point in each card, and the
  "View product" buttons ended up on three slightly different lines. A fixed
  ratio plus `mt-auto` on the button is what keeps a row even.
*/
export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-ink"
    >
      {/*
        The product photography is cut out against a plain background rather
        than being a scene, so the image is contained inside a tinted panel
        with room around it. Cropping it to fill the panel, the way a
        photograph would be, would cut the product itself in half.
      */}
      {product.image ? (
        <div className="relative aspect-square w-full shrink-0 overflow-hidden bg-surface">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-contain p-8 transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-8 md:p-10">
        
        <h3 className=" text-xl font-semibold tracking-tight text-ink">
          {product.name}
        </h3>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>

        {product.highlights?.length ? (
          <ul className="mt-7 flex flex-wrap gap-2">
            {product.highlights.map((highlight) => (
              <li
                key={highlight}
                className="border border-line px-3 py-1.5 text-xs text-ink"
              >
                {highlight}
              </li>
            ))}
          </ul>
        ) : null}

        {/*
          mt-auto is what keeps the button on the same line across a row of
          cards. The grid already stretches every card to the tallest one, but
          without this the button sits directly under the text, so a product
          with a shorter description or one fewer highlight would show its
          button higher than the card beside it.
        */}
        <div className="mt-auto pt-8">
          <span className="block rounded-full bg-ink py-4 text-center text-md font-medium text-white">
            View product
          </span>
        </div>
      </div>
    </Link>
  );
}
