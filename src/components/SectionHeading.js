import Reveal from "@/components/Reveal";
import SplitLines from "@/components/SplitLines";

/*
  Shared heading block for page sections. Using one component keeps the
  vertical rhythm and typography identical in every section.

  The text is organised in three steps, smallest to largest on the page:

      ————  SOLUTIONS           a rule and a label
      One platform, three       the title, animated line by line
      scales of energy
      The same inverter ...     a short intro

  The eyebrow row is what gives the page its structure — it tells the visitor
  where they are before they read anything else.
*/
export default function SectionHeading({
  label,
  title,
  description,
  align = "left",
  tone = "light",
}) {
  const isDark = tone === "dark";
  const isCentered = align === "center";

  return (
    <div className={isCentered ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {label ? (
        <Reveal>
          <div
            className={`flex items-center gap-4 ${isCentered ? "justify-center" : ""}`}
          >
            <span
              className={`h-px w-10 ${isDark ? "bg-white/25" : "bg-line"}`}
              aria-hidden="true"
            />
            <span
              className={`text-xs font-medium uppercase tracking-[0.22em] ${
                isDark ? "text-white/50" : "text-muted"
              }`}
            >
              {label}
            </span>
          </div>
        </Reveal>
      ) : null}

      <SplitLines>
        <h2
          className={`mt-6 text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl ${
            isDark ? "text-white" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </SplitLines>

      {description ? (
        <Reveal delay={220}>
          <p
            className={`mt-6 max-w-2xl text-base leading-relaxed md:text-lg ${
              isCentered ? "mx-auto" : ""
            } ${isDark ? "text-white/60" : "text-muted"}`}
          >
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
