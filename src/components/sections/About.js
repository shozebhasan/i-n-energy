import Image from "next/image";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import Parallax from "@/components/Parallax";
import SplitLines from "@/components/SplitLines";

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
                  src="/main-logo.png"
                  alt="I&amp;N Energy"
                  width={128}
                  height={128}
                  className="h-16 w-16 shrink-0"
                />
                <span className="h-12 w-px bg-line" aria-hidden="true" />
                <Image
                  src="/zing.png"
                  alt="Zing Energy"
                  width={128}
                  height={128}
                  className="h-14 w-14 shrink-0"
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
            <p className="mt-8 text-base leading-relaxed text-muted md:text-lg">
              We are an energy company built by engineers. The business started
              in {companyFacts.foundedYear} with a small team assembling and
              testing power electronics, and it has grown around the same idea
              ever since: understand the product well enough to stand behind it
              without hedging.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              Today we work with installers, distributors and project developers
              across residential, commercial and utility projects. The systems
              differ in scale, but the expectation is identical everywhere — the
              equipment has to keep working, in real conditions, long after the
              installation team has left.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted md:text-lg">
              At I & N International, we are committed to excellence across textiles industry products,
               renewable energy products, commodities, steel product, and so on with decades of expertise,
                we blend innovation with reliability to deliver solutions that meet the evolving needs of our clients worldwide.
            </p>
          </Reveal>

          <div className="mt-14 border-t border-line pt-10">
            {/*
              Rebuilt from the supplied longi.jpg, which had the transparency
              checkerboard flattened into it. longi.png is the same artwork
              with a real alpha channel, so it sits on the section background
              instead of on a grey grid.
            */}
            <Reveal>
              <Parallax distance={14}>
                <Image
                  src="/longi.png"
                  alt="LONGi"
                  width={200}
                  height={90}
                  className="mx-auto h-10 w-auto"
                />
              </Parallax>
            </Reveal>

            <SplitLines>
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
            </Reveal>
          </div>

          <div className="mt-14 border-t border-line pt-10">
            <SplitLines>
              <h2 className="mt-4 text-5xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl">
                Our Services
              </h2>
            </SplitLines>

            <Reveal delay={220}>
              <p className="mt-8 text-lg leading-relaxed text-muted md:text-lg">
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
