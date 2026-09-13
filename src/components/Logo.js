import Link from "next/link";
import Image from "next/image";

/*
  Wordmark used in the navbar and the footer. `tone` switches it between the
  light header and the dark footer.

  `priority` is for the header copy only: it is the first image on the page and
  Chrome reports it as the Largest Contentful Paint, so it must not be lazy
  loaded. The footer copy is far below the fold and stays lazy.
*/
export default function Logo({ tone = "dark", priority = false }) {
  const textColor = tone === "dark" ? "text-ink" : "text-white";
  const subColor = tone === "dark" ? "text-muted" : "text-white/50";

  return (
    <Link href="/" className="inline-flex items-center gap-2.5">
      <Image 
        src="/main-logo.png" 
        alt="I&N Energy" 
        width={40} 
        height={40} 
        priority={priority}
        className="shrink-0"
      />
      {/* <div className="flex items-baseline gap-1.5 leading-none">
        <span className={`text-xl font-semibold tracking-tight ${textColor}`}>
          I<span className="text-accent">&amp;</span>N
        </span>
        <span className={`text-[11px] font-medium uppercase tracking-[0.22em] ${subColor}`}>
          Energy
        </span>
      </div> */}
    </Link>
  );
}