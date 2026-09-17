import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import HoverStack from "@/components/Hover";
import { getProductCategories } from "@/lib/products";

/*
  The four ranges, shown as a stack of cards that fans apart on hover.

  The colours live here rather than in the product data because they are a
  choice about this one section — the same categories are drawn as plain rows
  on the products page and should not inherit a card colour from the database.
*/
const cardColours = {
  "lithium-batteries": { bg: "#0b1219", accent: "text-white" },
  "solar-inverters": { bg: "#17232e", accent: "text-white" },
  "solar-panels": { bg: "#e2761b", accent: "text-white" },
  "solar-accessories": { bg: "#f5f7f8", accent: "text-ink" },
  
};

const fallbackColour = { bg: "#f5f7f8", accent: "text-ink" };

export default async function Ranges() {
  const categories = await getProductCategories();

  const cards = categories.map((category) => ({
    id: category.slug,
    tag: category.name,
    text: category.tagline,
    href: `/products#${category.slug}`,
    ...(cardColours[category.slug] ?? fallbackColour),
  }));

  return (
    <section id="ranges" className="overflow-hidden py-8 md:py-8">
      <Container>
        <SectionHeading
          
          title="Everything You Need to Power What Matters"
          description="Lithium Batteries, Solar inverters, Solar panels and the pv modules that connect them, sold as four ranges that are specified to work together."
        />
      </Container>

      {/*
        A hovered card is pushed sideways past the edge of the stack, so the
        section clips the overflow rather than letting the page scroll wider.
        The min-height matches the stack (card height + hover lift + 24px) and
        holds the space while the component waits to mount on the client.
      */}
      <div className="mt-14 md:mt-16">
        <HoverStack cards={cards} className="md:min-h-[414px]" />
      </div>
    </section>
  );
}
