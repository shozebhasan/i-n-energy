import Link from "next/link";
import Image from "next/image";

/*
  Card used wherever a product is listed. It only shows the fields the listing
  needs — the full specifications live on the product page.

  The photo occupies the top 40% of the card. That percentage only resolves if
  the card itself has a definite height, which is why `min-h-[560px]` is here:
  the grid stretches every card to the tallest one, and the image keeps its
  share of whatever that turns out to be.
*/
export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full min-h-[660px] flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-ink"
    >
      {product.image ? (
        <div className="relative h-[40%] min-h-[200px] shrink-0 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-8 md:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          {product.category}
        </p>
        <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">
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

        <span className="mt-5 text-md text-center rounded-full py-4 font-medium text-white bg-ink">
          View product
        </span>
      </div>
    </Link>
  );
}
