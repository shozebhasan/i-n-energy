import Link from "next/link";

/*
  Card used wherever a product is listed. It only shows the fields the listing
  needs — the full specifications live on the product page.
*/
export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col border border-line bg-white p-8 transition-colors hover:border-ink md:p-10"
    >
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

      <span className="mt-auto text-md text-center rounded-full py-4 font-medium text-white bg-ink">
        View product
        
      </span>
    </Link>
  );
}
