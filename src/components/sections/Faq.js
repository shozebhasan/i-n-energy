import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import SplitLines from "@/components/SplitLines";

/*
  Answers only restate what the rest of the site already says (product ranges,
  the Zing brand, the documents on product pages, the proposal request). Do not
  add warranty terms, lead times or figures here until the client supplies them.
*/
const faqItems = [
  {
    id: 1,
    question: "What does I&N Energy supply?",
    answer:
      "Lithium batteries, solar inverters, solar panels and the accessories that connect them into one system.",
    icon: "☀️",
    iconPosition: "right",
  },
  {
    id: 2,
    question: "How are I&N Energy and Zing Energy related?",
    answer:
      "I&N Energy is the parent company, and Zing Energy is the brand it owns.",
  },
  {
    id: 3,
    question: "Where can I find full specifications?",
    answer:
      "Every product page lists its complete specifications and has the datasheet and manual ready to download.",
  },
  {
    id: 4,
    question: "Can you help size a system for my site?",
    answer:
      "Yes. Send us the site details and load profile, and our engineers will come back with a system layout and component list.",
    icon: "⚡",
    iconPosition: "left",
  },
  {
    id: 5,
    question: "Do you work on commercial projects?",
    answer:
      "Yes — from single homes to commercial, industrial and utility-scale installations.",
  },
];

export default function Faq() {
  return (
    <section id="faq" className="py-2 md:py-1">
      <Container>
        <SplitLines>
          <h2 className="mt-8 text-5xl font-semibold leading-[1.1] tracking-tight text-ink md:text-6xl text-center">
            Questions We Hear The Most
          </h2>
        </SplitLines>

        <Reveal delay={180}>
          <p className="mt-8 text-base leading-relaxed text-muted md:text-lg">
            Have questions about our company, products, or services? Find clear answers to the things our clients and partners ask us most.
            All answers are based on the information already available on this site, so you can be confident that they are accurate and up to date.
            If you want to know something else contact us directly on our mail.

          </p>
        </Reveal>

        {/*
          The chat bubbles are narrow by design, so beside the heading they
          left most of the row empty. Stacked and centred under the heading,
          the conversation reads as the middle of the section instead.
        */}
        <Reveal delay={120} className="mt-12 md:mt-14">
          <FaqAccordion
            data={faqItems}
            timestamp="Answered by the I&N Energy team"
            className="mx-auto max-w-md"
          />
        </Reveal>
      </Container>
    </section>
  );
}
