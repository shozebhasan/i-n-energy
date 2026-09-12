import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";

const footerColumns = [
  {
    title: "Solutions",
    links: [
      { label: "Residential solar", href: "/#solutions" },
      { label: "Commercial & industrial", href: "/#solutions" },
      { label: "Utility scale", href: "/#solutions" },
      { label: "Energy storage", href: "/#solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Technology", href: "/#technology" },
      { label: "Projects", href: "/#projects" },
      { label: "Products", href: "/#products" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-ink text-white">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
              I&amp;N Energy builds solar, storage and smart energy systems for homes,
              businesses and utilities — engineered for long service life and
              measurable performance.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="md:col-span-2">
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                {column.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Get in touch
            </h3>
            <ul className="mt-6 space-y-3 text-sm text-white/70">
              <li>
                <a href="mailto:info@zingenergy.com" className="transition-colors hover:text-white">
                  info@zingenergy.com
                </a>
              </li>
              <li>Mon – Fri, 09:00 – 18:00</li>
              <li className="pt-2 text-white/55">
                Sales and technical support for all regions.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} I&amp;N Energy. All rights reserved.</p>
          <p className="tracking-wide">i&amp;n-energy.com · zingenergy.com</p>
        </div>
      </Container>
    </footer>
  );
}
