import Link from "next/link";

/*
  Wordmark used in the navbar and the footer. `tone` switches it between the
  light header and the dark footer.
*/
export default function Logo({ tone = "dark" }) {
  const textColor = tone === "dark" ? "text-ink" : "text-white";
  const subColor = tone === "dark" ? "text-muted" : "text-white/50";

  return (
    <Link href="/" className="inline-flex items-baseline gap-2">
      <span className={`text-xl font-semibold tracking-tight ${textColor}`}>
        I<span className="text-accent">&amp;</span>N
      </span>
      <span className={`text-[11px] font-medium uppercase tracking-[0.22em] ${subColor}`}>
        Energy
      </span>
    </Link>
  );
}
