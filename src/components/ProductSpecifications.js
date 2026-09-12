/*
  The specifications table on a product page.

  Specifications are a plain list of name/value pairs rather than fixed
  columns, because a battery, an inverter and a mounting kit have almost
  nothing in common. The admin decides which rows exist for each product.

  A description list is the right element here: every row is a term and its
  value, which is what a screen reader then announces.
*/
export default function ProductSpecifications({ specifications }) {
  if (!specifications?.length) {
    return null;
  }

  return (
    <dl className="border-t border-line">
      {specifications.map((specification) => (
        <div
          key={specification.name}
          className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[260px_1fr] sm:gap-8"
        >
          <dt className="text-sm text-muted">{specification.name}</dt>
          <dd className="text-sm font-medium text-ink">
            {specification.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
