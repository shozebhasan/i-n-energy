/*
  Container keeps every section's content at the same width and gives it the
  same left/right padding. Navbar and Footer stretch full width, but their
  inner content uses this component so everything lines up vertically.
*/
export default function Container({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1200px] px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
