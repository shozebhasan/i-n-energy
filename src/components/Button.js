import Link from "next/link";

const variants = {
  primary:
    "bg-ink text-white hover:bg-ink-soft border border-ink hover:border-ink-soft",
  accent:
    "bg-accent text-white hover:bg-accent-dark border border-accent hover:border-accent-dark",
  outline:
    "bg-transparent text-ink border border-line hover:border-ink",
  // For dark backgrounds such as the hero video.
  light:
    "bg-white text-ink border border-white hover:bg-transparent hover:text-white",
  outlineLight:
    "bg-transparent text-white border border-white/50 hover:border-white hover:bg-white/10",
};

const sizes = {
  md: "px-7 py-3 text-sm",
  lg: "px-10 py-5 text-base md:px-12 md:py-6 md:text-lg",
};

/*
  One button used across the site. It renders a link because every call to
  action on the public website navigates somewhere.
*/
export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full font-medium tracking-wide transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </Link>
  );
}
