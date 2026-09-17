import Link from "next/link";
import Container from "./Container";
import Logo from "./Logo";
import { PhoneIcon, MailIcon } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import Image from "next/image";

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "Inverters", href: "/#solutions" },
      { label: "lithium batteries", href: "/#solutions" },
      { label: "Solar Panels", href: "/#solutions" },
      { label: "Accessories", href: "/#solutions" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/#about" },
      { label: "Projects", href: "/#projects" },
      { label: "Products", href: "/#products" },
      { label: "Contact", href: "/#contact" },
    ],
  },
];

// PLACEHOLDER: the real social profiles and phone number have not been
// supplied yet. Replace these hrefs with I&N Energy's own before launch.
// The email address is the real one used above.
const contactLinks = [
  { label: "Facebook", href: "https://www.facebook.com/", Icon: FaFacebook },
  { label: "Instagram", href: "https://www.instagram.com/", Icon: FaInstagram },
  { label: "X (Twitter)", href: "https://x.com/", Icon: FaXTwitter },
  {
    label: "Email us",
    href: "mailto:info@iandninternational.com",
    Icon: MailIcon,
  },
  { label: "Call us", href: "tel:+000000000000", Icon: PhoneIcon },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/i-n-energy",
    Icon: FaLinkedin,
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <Container>
        <div className="grid grid-cols-1 gap-12 py-16 md:grid-cols-12 md:py-20">
          <div className="md:col-span-5">
            <Image
              src="/zinf-logo-white.png"
              alt="Zing Energy"
              width={128}
              height={128}
              priority
              className="h-8 w-18 shrink-0"
            />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/55">
              Zing Energy builds solar, storage and smart energy systems for
              homes, businesses and utilities, engineered for long service life
              and measurable performance.
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
                <a
                  href="mailto:info@iandninternational.com"
                  className="transition-colors hover:text-white"
                >
                  info@iandninternational.com
                </a>
              </li>
              <li>Mon – Fri, 09:00 – 18:00</li>
              <li className="pt-2 text-white/55">
                Sales and technical support for all regions.
              </li>
              <li>
                <div className="flex items-center gap-4 pt-2">
                  {contactLinks.map(({ label, href, Icon }) => {
                    // Social profiles open in a new tab so visitors keep the site
                    // open; mailto: and tel: hand off to the device's own apps.
                    const isWebLink = href.startsWith("http");
                    return (
                      <a
                        key={label}
                        href={href}
                        aria-label={label}
                        title={label}
                        target={isWebLink ? "_blank" : undefined}
                        rel={isWebLink ? "noopener noreferrer" : undefined}
                        className="text-white/70 transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                      >
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 text-xs text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} I&amp;N Energy. All rights reserved.
          </p>
          <p className="tracking-wide">iandn-energy.com | zingenergy.com</p>
        </div>
      </Container>
    </footer>
  );
}
