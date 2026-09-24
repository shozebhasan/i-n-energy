import Image from "next/image";
import Link from "next/link";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import SplitLines from "@/components/SplitLines";
import CountUp from "@/components/CountUp";
import { getProductCategories } from "@/lib/products";

/*
  PLACEHOLDER: the founding year is invented. Replace it with the real one
  before the site goes live.
*/
const companyFacts = {
  foundedYear: "2009",
};

/*
  Kept deliberately, though nothing renders it at the moment. The "Our
  Solutions" grid below used to be built from this list and was replaced by the
  four product-category cards; the copy is still wanted, so it stays here ready
  for whichever section ends up carrying it.
*/
// eslint-disable-next-line no-unused-vars
const whatWeDo = [
  {
    title: "Client Facilitation Services",
    description:
      "We, at I&N International, do market research and keep an eye over changing market to facilitate our clients to take timely decisions of their sales and purchases.",
  },
  {
    title: "Warehousing Services",
    description:
      "A key element in our philosophy is to truly understand your business and logistic needs. This way, we can provide you service solutions that will help you.",
  },
  {
    title: "Our Financial Services",
    description:
      "Every demand for imports is increasing in China and more clients are interested in direct imports for which they need financial companies to open LC.",
  },
  {
    title: "Quality Assurance Services",
    description:
      "Quality assurance is a way for preventing mistakes and defects on manufactured products and avoiding problems while delivering solutions.",
  },
  {
    title: "Quality Inspection Services",
    description:
      "Factory Audits, Laboratory Testing Certificates, Comprehensive Testing of Products. Container Loading Inspection",
  },
  {
    title: "Insuring Customer Satisfaction",
    description:
      "To make sure our customers are satisfied with our services, we have a dedicated customer service team that is available to address any concerns or issues that may arise.",
  },
];

/*
  A photograph for each of the four product ranges.

  The categories themselves come from the product data, so only the artwork is
  listed here — keyed by category slug, which is also what the cards link to on
  the products page.
*/
const solutionImages = {
  "lithium-batteries": "/assets/solution/battery-solution-page.jpg",
  "solar-inverters": "/assets/solution/invertors-solutions-page.jpg",
  "solar-panels": "/assets/solution/panels-solution-page.jpg",
  "solar-accessories": "/assets/solution/accessories-solution-page.jpg",
};

/*
  Small line-drawn marks, kept deliberately plain so they read as punctuation
  above each figure rather than as illustrations competing with it. Swap any of
  them for a real asset with <Image src="/icons/…" /> if you have artwork.
*/
function IconBuilding(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16" />
      <path d="M15 21V10h2a2 2 0 0 1 2 2v9" />
      <path d="M9 7h2M9 11h2M9 15h2" />
    </svg>
  );
}

function IconGlobe(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
    </svg>
  );
}

function IconPanel(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 4h16v10H4z" />
      <path d="M4 9h16M9.5 4v10M14.5 4v10" />
      <path d="M12 14v6M9 20h6" />
    </svg>
  );
}

function IconBolt(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}

/*
  PLACEHOLDER: every figure below is invented. Replace with real numbers before
  launch — these are the kind of claims a visitor will check.

  `value` is the number that gets counted to, `suffix` is anything that should
  sit after it untouched (a plus sign, a unit).
*/
const stats = [
  { value: 6000, suffix: "+", label: "Battery Lifecycle", Icon: IconBuilding },
  { value: 98.5, suffix: "%", label: "Peak Inverter Efficiency", Icon: IconGlobe },
  { value: 10, suffix: "Yrs", label: "Equipment Warranty", Icon: IconPanel },
  
];

/*
  Everything here is centred, and each block is wrapped in Reveal so it rises
  into place as the visitor reaches it. The delays are staggered so the logo,
  the heading and the text arrive one after another rather than together.
*/
export default async function About() {
  const productCategories = await getProductCategories();

  return (
    <section id="about" className="section-tint py-20 md:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            {/*
              The two marks side by side: I&N Energy is the parent company and
              Zing Energy is the brand it owns. The caption states that outright
              so a visitor who only knows one of the two names understands how
              they relate.
            */}
            <Parallax distance={18}>
              <div className="flex items-center justify-center gap-6 md:gap-8">
                
                
                <Image
                  src="/zing-w-bg.png"
                  alt="Zing Energy"
                  width={128}
                  height={128}
                  className="h-16 w-35 shrink-0"
                />

                <span className="h-12 w-px bg-line" aria-hidden="true" />

                <Image
                  src="/main-logo.png"
                  alt="I&amp;N Energy"
                  width={128}
                  height={128}
                  className="h-12 w-12 shrink-0"
                />
              </div>
            </Parallax>
          </Reveal>

          <SplitLines>
            <h2 className="mt-8 text-5xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
              Who Are We ?
            </h2>
          </SplitLines>

          <Reveal delay={180}>
            <p className="mt-8 text-base leading-relaxed text-muted md:text-xl">
              ZING Energy is focused on making solar power more accessible, reliable, and practical for homes and businesses.
              Our portfolio brings together high-performance solar panels, lithium battery storage, solar inverters, and essential
              solar accessories, the key technologies needed to build modern energy systems.
              
            </p>
            
            <p className="mt-6 text-base leading-relaxed text-muted md:text-xl">
              Backed by I & N Energy Solutions Pvt. Ltd., we combine trusted products,
              international manufacturing partnerships, and an engineering-focused approach
              with a clear understanding of real-world energy needs. From residential installations
              to demanding commercial and industrial projects, our goal is simple: to deliver
              dependable energy solutions that create lasting value, greater energy independence, and a more sustainable future.
            </p>
            
          </Reveal>

          <SplitLines>
            <h2 className="mt-8 text-5xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
              Built on Experience.
            </h2>
          </SplitLines>

          <Reveal delay={180}>
            <p className="mt-8 text-base leading-relaxed text-muted md:text-xl">
              Our journey in the solar and energy sector began in 2023, with a focused team working
              to bring reliable solar technologies and energy solutions to the market. From the beginning,
              our approach has been grounded in a simple principle: understand the technology, know the product,
              and stand behind what we deliver.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted md:text-xl">
              Since then, we have developed relationships with specialized manufacturing partners and expanded 
              our portfolio across solar inverters, lithium battery storage, solar panels, and related energy products.
              his has enabled us to build a flexible product portfolio that combines ZING-branded solutions with internationally
              sourced solar technologies from established manufacturers.
            </p>
            <p className="mt-8 text-base leading-relaxed text-muted md:text-xl">
              Today, ZING Energy serves homeowners, installers, businesses, distributors, and
              project developers with solar and energy-storage solutions designed for different applications and energy requirements.
              Every system may differ in size, configuration, and purpose. The expectation, however, remains the same,
              reliable equipment, consistent performance, and support that continues long after installation.
              By combining quality-focused product selection, international manufacturing partnerships, and engineering-led thinking,
              we are building ZING into a trusted energy brand, delivering solutions designed to perform today and help create a cleaner,
              smarter, and more energy-independent tomorrow.
            </p>
          </Reveal>

          <SplitLines>
            <h2 className="mt-8 text-3xl font-semibold leading-[1.1] tracking-tight text-ink md:text-3xl italic">
              GET YOUR ZING ON
            </h2>
          </SplitLines>

          {/*
            The figures. Each one is its own Reveal so the four columns arrive
            left to right, and the counter itself only starts once the number is
            properly on screen — so a visitor who scrolls past quickly still
            sees it run rather than landing on a finished total.
          */}
          <div className="mt-16 border-t border-line pt-12">
            <div className="grid grid-cols-3 gap-y-12 sm:grid-cols-3 sm:divide-x sm:divide-line">
              {stats.map(({ value, suffix, label, Icon }, index) => (
                <Reveal key={label} delay={index * 120} className="h-full">
                  <div className="flex h-full flex-col items-center px-2 sm:px-4">
                    <Icon className="h-8 w-8 text-ink/70" aria-hidden="true" />
                    <p className="mt-5 text-4xl font-semibold tracking-tight text-ink md:text-5xl">
                      <CountUp
                        to={value}
                        suffix={suffix}
                        delay={index * 120}
                      />
                    </p>
                    <p className="mt-2 text-sm leading-snug text-muted md:text-base">
                      {label}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* <div className="mt-14 border-t border-line pt-10"> */}
            {/*
              Rebuilt from the supplied longi.jpg, which had the transparency
              checkerboard flattened into it. longi.png is the same artwork
              with a real alpha channel, so it sits on the section background
              instead of on a grey grid.
            */}
            {/* <Reveal>
              <Parallax distance={14}>
                <Image
                  src="/longi.png"
                  alt="LONGi"
                  width={200}
                  height={90}
                  className="mx-auto h-10 w-auto"
                />
              </Parallax>
            </Reveal> */}

            {/* <SplitLines>
              <h2 className="mt-6 text-5xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
                Largest Longi Distributer in Pakistan
              </h2>
            </SplitLines>

            <Reveal delay={220}>
              <p className="mx-auto mt-6 max-w-xl text-xl leading-relaxed text-muted">
                LONGi is one of the world&apos;s largest solar module
                manufacturers, and we move more of their product here than any
                other distributor in the country. That volume is what lets us
                hold real stock, quote a serious price and supply the same panel
                from the first roof of a project to the last, instead of
                substituting a different module halfway through.
              </p>
            </Reveal> */}
          {/* </div> */}

          <div className="mt-14 border-t border-line pt-10">
            <SplitLines>
              <h2 className="mt-4 text-5xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
                Our Solutions
              </h2>
            </SplitLines>

            <Reveal delay={220}>
              <p className="mt-8 text-lg leading-relaxed text-muted md:text-xl">
                From solar inverters and LiFePO4 energy storage to high-performance solar panels and essential accessories,
                we bring together trusted technologies and global manufacturing partnerships to deliver reliable energy
                solutions for homes, businesses, and industries.
              </p>
            </Reveal>
          </div>
        </div>

        {/*
          The four ranges, one card each. The whole card is the link — the
          "See more" label below the description is a span rather than a second
          anchor, because a link inside a link is invalid and would give a
          keyboard user two stops for the same destination.

          Each card points at /products#<category slug>, which is the id the
          products page puts on that category's section, so tapping a card
          lands the visitor on those products rather than the top of the page.
        */}
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {productCategories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 90} className="h-full">
              <Link
                href={`/products#${category.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition-colors hover:border-ink"
              >
                <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden bg-surface">
                  <Image
                    src={solutionImages[category.slug]}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6 text-left md:p-8">
                  <h3 className="text-xl font-semibold tracking-tight text-ink">
                    {category.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {category.description}
                  </p>

                  {/* mt-auto keeps the button on one line across the row. */}
                  <div className="mt-auto pt-6">
                    <span className="block rounded-full bg-ink py-3 text-center text-sm font-medium text-white">
                      See more
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}