/*
  Every product shown on the public website is read through this file.

  Components never hold product data themselves, so when the Neon database is
  connected only the bodies of these functions change — the homepage, the
  product grid and the product pages stay exactly as they are.

  TEMPORARY: the list below is placeholder content used while the database is
  being set up. It is replaced by a query against Neon in the next step and
  this constant is deleted.
*/
const placeholderProducts = [
  {
    slug: "in-hybrid-10k",
    image: "/assets/product-25Z-IN-G100.jpg",
    name: "IN-Hybrid 10K",
    category: "Hybrid inverter",
    shortDescription:
      "Single-phase hybrid inverter for homes, with battery backup that takes over within 10 milliseconds of an outage.",
    highlights: ["10 kW output", "98.6% efficiency", "IP65"],
  },
  {
    slug: "in-store-20",
    image: "/assets/product-51Z-IN-G100.jpg",
    name: "IN-Store 20",
    category: "Battery storage",
    shortDescription:
      "Stackable LFP battery system that scales from 10 to 40 kWh, with cell-level management and a 10-year warranty.Worth buying",
    highlights: ["10 – 40 kWh", "LFP cells", "6000 cycles"],
  },
  {
    slug: "in-tri-60k",
    image: "/assets/product-51Z-IN-G200.jpg",
    name: "IN-Tri 60K",
    category: "Commercial inverter",
    shortDescription:
      "Three-phase commercial inverter with peak shaving and load control for factories, warehouses and office buildings.",
    highlights: ["60 kW output", "Three-phase", "Peak shaving"],
  },
];

/**
 * Products shown in the "Products" section of the homepage.
 */
export async function getFeaturedProducts() {
  return placeholderProducts;
}
