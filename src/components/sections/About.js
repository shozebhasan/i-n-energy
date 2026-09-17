import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import SplitLines from "@/components/SplitLines";
import CountUp from "@/components/CountUp";

/*
  PLACEHOLDER: the founding year is invented. Replace it with the real one
  before the site goes live.
*/
const companyFacts = {
  foundedYear: "2009",
};

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
  { value: 15, suffix: "+", label: "Years in business", Icon: IconBuilding },
  { value: 40, suffix: "+", label: "Countries supplied", Icon: IconGlobe },
  { value: 500, suffix: "+", label: "Projects delivered", Icon: IconPanel },
  
];

/*
  Everything here is centred, and each block is wrapped in Reveal so it rises
  into place as the visitor reaches it. The delays are staggered so the logo,
  the heading and the text arrive one after another rather than together.
*/
export default function About() {
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
              I & N International is more than just a company – we are a multi-dimensional
              enterprise shaping industries with innovation and trust. Our business areas
              span from premium textile products, renewable energy products, steel products,
              commodities to international trade and real estate development, each built on
              a foundation of excellence and integrity. With a strong presence in both local
              and global markets, we continuously evolve to meet the needs of our partners
              and clients. Whether it’s world-class textile products, renewable energy products,
              commodities, facilitating trade across borders, or developing modern properties,
              our goal is to create lasting value and sustainable growth for every stakeholder we serve.
            </p>
            
            <p className="mt-6 text-base leading-relaxed text-muted md:text-xl">
              We are an energy company built by engineers. The business started
              in {companyFacts.foundedYear} with a small team assembling and
              testing power electronics, and it has grown around the same idea
              ever since: understand the product well enough to stand behind it
              without hedging.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-xl">
              Today we work with installers, distributors and project developers
              across residential, commercial and utility projects. The systems
              differ in scale, but the expectation is identical everywhere — the
              equipment has to keep working, in real conditions, long after the
              installation team has left.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-xl">
              At I & N International, we are committed to excellence across textiles industry products,
               renewable energy products, commodities, steel product, and so on with decades of expertise,
                we blend innovation with reliability to deliver solutions that meet the evolving needs of our clients worldwide.
            </p>
          </Reveal>

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
                Our Services
              </h2>
            </SplitLines>

            <Reveal delay={220}>
              <p className="mt-8 text-lg leading-relaxed text-muted md:text-xl">
                We deliver excellence through premium textiles products, steel
                products, renewable energy products, commodities, global trade,
                and real estate solutions — all built on quality, trust, and
                innovation.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-px border border-line bg-line md:grid-cols-3">
          {whatWeDo.map((item, index) => (
            <Reveal key={item.title} delay={index * 90} className="h-full">
              <article className="h-full bg-white p-8 text-center md:p-10">
                <h3 className="text-3xl font-semibold tracking-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-muted">
                  {item.description}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}