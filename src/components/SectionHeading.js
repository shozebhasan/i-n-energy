/*
  Shared heading block for page sections: a small label, a title and an
  optional short intro. Using one component keeps the vertical rhythm and
  typography identical in every section.
*/
export default function SectionHeading({ label, title, description, align = "left", tone = "light" }) {
  const isDark = tone === "dark";

  return (
    <div className={align === "center" ? "max-w-2xl mx-auto text-center" : "max-w-2xl"}>
      <h2
        className={`mt-4 text-3xl md:text-4xl font-semibold leading-tight tracking-tight ${
          isDark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p className={`mt-5 text-base leading-relaxed ${isDark ? "text-white/60" : "text-muted"}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
