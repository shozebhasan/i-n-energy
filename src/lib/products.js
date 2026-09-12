/*
  Every product shown on the public website is read through this file.

  Components never hold product data themselves, so when the Neon database is
  connected only the bodies of the exported functions change — the navigation
  menu, the products page and the product pages stay exactly as they are.

  TEMPORARY: the two lists below are placeholder content used while the
  database is being set up. They are replaced by queries against Neon in the
  next step and the constants are deleted.

  Content status: the three Zing batteries are real products and their
  specifications are taken from the units themselves. Everything in the other
  three categories is marked `isPlaceholder: true` — the shape of the content
  is right, but the wording, the numbers and the photos are stand-ins until
  I&N Energy supplies the real material. The product page prints a short
  notice for those, so a placeholder is never mistaken for a published spec.
*/

/*
  The four ranges I&N Energy sells.

  The order of this list is the order the categories appear in the navigation
  menu and on the products page, so it is deliberate rather than alphabetical:
  storage comes first, because it is what the company leads with.
*/
const productCategories = [
  {
    slug: "lithium-batteries",
    name: "Lithium Batteries",
    tagline: "LiFePO4 storage for homes and businesses",
    description:
      "Wall-mounted and floor-standing lithium iron phosphate batteries, each with its own battery management system and touch display.",
  },
  {
    slug: "solar-inverters",
    name: "Solar Inverters",
    tagline: "Hybrid and grid-tied conversion",
    description:
      "Single-phase and three-phase inverters that run solar generation, battery charging and the grid connection from one device.",
  },
  {
    slug: "solar-panels",
    name: "Solar Panels",
    tagline: "Monocrystalline and bifacial modules",
    description:
      "High-efficiency modules for pitched roofs, flat commercial roofs and ground-mounted arrays.",
  },
  {
    slug: "solar-accessories",
    name: "Solar Accessories",
    tagline: "Controllers, protection and mounting",
    description:
      "The parts that complete an installation: charge controllers, DC protection and mounting hardware.",
  },
];

/*
  Placeholder documents.

  Every product links to the same two files at the moment. Once the admin panel
  can upload files, each product carries its own URL and these constants go.
*/
const placeholderDatasheet = "/docs/placeholder-datasheet.pdf";
const placeholderManual = "/docs/placeholder-manual.pdf";

const products = [
  // --------------------------------------------------------------- batteries
  {
    slug: "zing-25z-in-g100",
    name: "Zing 25Z-IN-G100",
    categorySlug: "lithium-batteries",
    status: "published",
    isFeatured: true,
    shortDescription:
      "A compact 2.56 kWh wall battery for small backup systems, with the battery management system and the display built into the unit.",
    description:
      "The 25Z-IN-G100 is the smallest battery in the Zing range. It runs at 25.6 V, which suits low-voltage inverters and small off-grid installations, and it mounts flat against a wall, so it fits in a plant room or a garage without a floor stand. The display on the front reports pack voltage, current, cell voltage and cell temperature without any additional hardware, and the terminals, the communication ports and the isolator all sit in a single recess along the top edge.",
    image: "/assets/battery/bt-1123.png",
    images: ["/assets/battery/bt-1-45.png", "/assets/battery/bt-3.png"],
    highlights: ["2.56 kWh", "25.6 V", "LiFePO4"],
    features: [
      "Lithium iron phosphate cells, chosen for thermal stability rather than peak energy density",
      "Battery management system built into the enclosure, monitoring voltage and temperature cell by cell",
      "Colour touch display showing state of charge, pack voltage, current and cell data",
      "RS485 and CAN ports for the inverter, and a Wi-Fi antenna for remote monitoring",
      "Wall-mounted enclosure with recessed terminals and an isolator switch",
    ],
    specifications: [
      { name: "Cell chemistry", value: "LiFePO4" },
      { name: "Nominal voltage", value: "25.6 V" },
      { name: "Rated capacity", value: "100 Ah" },
      { name: "Energy", value: "2.56 kWh" },
      { name: "Display", value: "Colour touch screen" },
      { name: "Communication", value: "RS485 / CAN, Wi-Fi module" },
      { name: "Installation", value: "Wall mounted" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },
  {
    slug: "zing-51z-in-g100",
    name: "Zing 51Z-IN-G100",
    categorySlug: "lithium-batteries",
    status: "published",
    isFeatured: true,
    shortDescription:
      "The 5.12 kWh wall battery most homes start with, at the 51.2 V that standard hybrid inverters expect.",
    description:
      "The 51Z-IN-G100 sits in the middle of the Zing range and is the usual starting point for a home. It runs at 51.2 V, the voltage almost every residential hybrid inverter is built around, so it pairs with an existing inverter without a converter in between. Units are wired in parallel to add capacity, and the display on each one reports how many packs are running together, which lets an installer check a multi-battery system by eye.",
    image: "/assets/battery/battery-chinease-1.png",
    images: [
      "/assets/battery/battery-5-2.png",
      "/assets/battery/battery-chin-1.png",
      "/assets/battery/battery-chin-2.png",
    ],
    highlights: ["5.12 kWh", "51.2 V", "LiFePO4"],
    features: [
      "Lithium iron phosphate cells, chosen for thermal stability rather than peak energy density",
      "51.2 V nominal, matching standard residential hybrid inverters",
      "Units run in parallel to add capacity, and the display shows how many are connected",
      "Battery management system built into the enclosure, monitoring voltage and temperature cell by cell",
      "RS485 and CAN ports for the inverter, and a Wi-Fi antenna for remote monitoring",
    ],
    specifications: [
      { name: "Cell chemistry", value: "LiFePO4" },
      { name: "Nominal voltage", value: "51.2 V" },
      { name: "Rated capacity", value: "100 Ah" },
      { name: "Energy", value: "5.12 kWh" },
      { name: "Display", value: "Colour touch screen" },
      { name: "Communication", value: "RS485 / CAN, Wi-Fi module" },
      { name: "Installation", value: "Wall mounted" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },
  {
    slug: "zing-51z-in-g200",
    name: "Zing 51Z-IN-G200",
    categorySlug: "lithium-batteries",
    status: "published",
    isFeatured: true,
    shortDescription:
      "10.24 kWh in one floor-standing enclosure, for a house that wants a full day of backup from a single unit.",
    description:
      "The 51Z-IN-G200 holds twice the capacity of the G100 in one enclosure, which keeps the wiring and the commissioning of a large system down to a single unit. It stands on its own feet rather than hanging off a wall, so the weight goes into the floor. Terminals, communication ports, the isolator and the Wi-Fi antenna sit in a recess along the top edge, clear of anything leaning against the case.",
    image: "/assets/battery/battery-chin-3.png",
    images: ["/assets/battery/battery-chin-123.png", "/assets/battery/bt-4.png"],
    highlights: ["10.24 kWh", "51.2 V", "Floor standing"],
    features: [
      "Lithium iron phosphate cells, chosen for thermal stability rather than peak energy density",
      "Twice the capacity of the G100 in a single enclosure, with one set of connections",
      "Floor-standing case on its own feet, so the weight is carried by the floor",
      "Battery management system built into the enclosure, monitoring voltage and temperature cell by cell",
      "RS485 and CAN ports for the inverter, and a Wi-Fi antenna for remote monitoring",
    ],
    specifications: [
      { name: "Cell chemistry", value: "LiFePO4" },
      { name: "Nominal voltage", value: "51.2 V" },
      { name: "Rated capacity", value: "200 Ah" },
      { name: "Energy", value: "10.24 kWh" },
      { name: "Display", value: "Colour touch screen" },
      { name: "Communication", value: "RS485 / CAN, Wi-Fi module" },
      { name: "Installation", value: "Floor standing" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },

  // --------------------------------------------------------------- inverters
  {
    slug: "in-hb5-hybrid-inverter",
    name: "IN-HB5 Hybrid Inverter",
    categorySlug: "solar-inverters",
    status: "published",
    isPlaceholder: true,
    shortDescription:
      "Single-phase hybrid inverter for a typical home, running the array, the battery and the grid connection from one unit.",
    description:
      "The IN-HB5 is the entry point of the hybrid range. It takes the output of a residential array, charges a 51.2 V battery and supplies the house, switching to the battery when the grid drops. One unit replaces a separate solar inverter and battery charger, which means fewer boxes on the wall and one place to look when something needs checking.",
    image: "/assets/battery/battery-22.png",
    images: [],
    highlights: ["5 kW", "Single phase", "Battery ready"],
    features: [
      "Runs solar, battery and grid from a single unit",
      "Switches to battery supply when the grid goes down",
      "Works with 51.2 V lithium batteries over CAN or RS485",
      "Monitored through the same app as the battery",
    ],
    specifications: [
      { name: "Rated AC output", value: "5 kW" },
      { name: "Phases", value: "Single phase" },
      { name: "Battery voltage", value: "51.2 V" },
      { name: "MPP trackers", value: "2" },
      { name: "Enclosure rating", value: "IP65" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },
  {
    slug: "in-hb10-hybrid-inverter",
    name: "IN-HB10 Hybrid Inverter",
    categorySlug: "solar-inverters",
    status: "published",
    isPlaceholder: true,
    shortDescription:
      "The larger single-phase hybrid, for houses with a bigger array or several batteries in parallel.",
    description:
      "The IN-HB10 is the same system as the HB5 with twice the output. It suits a larger roof, a home running a heat pump or charging an electric vehicle, and installations where more than one battery is wired in parallel.",
    image: "/assets/battery/battery-11.jpg",
    images: [],
    highlights: ["10 kW", "Single phase", "Parallel batteries"],
    features: [
      "Runs solar, battery and grid from a single unit",
      "Supports several batteries wired in parallel",
      "Switches to battery supply when the grid goes down",
      "Monitored through the same app as the battery",
    ],
    specifications: [
      { name: "Rated AC output", value: "10 kW" },
      { name: "Phases", value: "Single phase" },
      { name: "Battery voltage", value: "51.2 V" },
      { name: "MPP trackers", value: "2" },
      { name: "Enclosure rating", value: "IP65" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },
  {
    slug: "in-tp30-three-phase-inverter",
    name: "IN-TP30 Three-Phase Inverter",
    categorySlug: "solar-inverters",
    status: "published",
    isPlaceholder: true,
    shortDescription:
      "Three-phase inverter for commercial roofs, with load control for sites that pay for peak demand.",
    description:
      "The IN-TP30 is built for factories, warehouses and office buildings on a three-phase supply. It handles a commercial array and can hold the site below a demand threshold, which is where most of the saving comes from on a commercial tariff.",
    image: "/assets/battery/battery-5-2.png",
    images: [],
    highlights: ["30 kW", "Three phase", "Peak shaving"],
    features: [
      "Three-phase output for commercial and light industrial sites",
      "Load control to hold the site below a demand threshold",
      "Several units run together on larger arrays",
      "Remote monitoring and fault reporting",
    ],
    specifications: [
      { name: "Rated AC output", value: "30 kW" },
      { name: "Phases", value: "Three phase" },
      { name: "MPP trackers", value: "3" },
      { name: "Enclosure rating", value: "IP65" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },

  // ------------------------------------------------------------------ panels
  {
    slug: "in-m430-residential-module",
    name: "IN-M430 Residential Module",
    categorySlug: "solar-panels",
    status: "published",
    isPlaceholder: true,
    shortDescription:
      "A 430 W monocrystalline module sized for pitched domestic roofs.",
    description:
      "The IN-M430 is the residential module in the range. Its size and weight are chosen so that two people can handle it on a pitched roof, and the frame works with standard rail mounting systems.",
    image: "/assets/battery/bt-1-45.png",
    images: [],
    highlights: ["430 W", "Monocrystalline", "Black frame"],
    features: [
      "Monocrystalline cells",
      "Sized and weighted for handling on a pitched roof",
      "Fits standard rail mounting systems",
      "Anodised aluminium frame",
    ],
    specifications: [
      { name: "Rated power", value: "430 W" },
      { name: "Cell type", value: "Monocrystalline" },
      { name: "Frame", value: "Anodised aluminium" },
      { name: "Application", value: "Pitched residential roofs" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },
  {
    slug: "in-m540-commercial-module",
    name: "IN-M540 Commercial Module",
    categorySlug: "solar-panels",
    status: "published",
    isPlaceholder: true,
    shortDescription:
      "A 540 W module for commercial roofs, where the number of mounting points matters more than the size of a panel.",
    description:
      "The IN-M540 is the commercial module: larger and higher output, so a given roof area needs fewer modules, fewer mounting points and less cable than the same array built from residential panels.",
    image: "/assets/battery/battery-5-3.png",
    images: [],
    highlights: ["540 W", "Monocrystalline", "Commercial"],
    features: [
      "Monocrystalline cells",
      "Fewer modules and mounting points for a given roof area",
      "Suited to flat commercial roofs and ground mounts",
      "Anodised aluminium frame",
    ],
    specifications: [
      { name: "Rated power", value: "540 W" },
      { name: "Cell type", value: "Monocrystalline" },
      { name: "Frame", value: "Anodised aluminium" },
      { name: "Application", value: "Commercial roofs and ground mounts" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },
  {
    slug: "in-m580-bifacial-module",
    name: "IN-M580 Bifacial Module",
    categorySlug: "solar-panels",
    status: "published",
    isPlaceholder: true,
    shortDescription:
      "A bifacial module that also generates from light reflected onto its back face.",
    description:
      "The IN-M580 generates from both faces, so it earns its extra cost on installations with a reflective surface underneath: a white flat roof, light gravel, or a ground mount raised clear of the ground.",
    image: "/assets/battery/bt-3.png",
    images: [],
    highlights: ["580 W", "Bifacial", "Ground mount"],
    features: [
      "Generates from the front and the back face",
      "Best on reflective surfaces and raised ground mounts",
      "Glass-glass construction",
      "Anodised aluminium frame",
    ],
    specifications: [
      { name: "Rated power", value: "580 W" },
      { name: "Cell type", value: "Monocrystalline bifacial" },
      { name: "Construction", value: "Glass-glass" },
      { name: "Application", value: "Ground mounts and flat roofs" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },

  // ------------------------------------------------------------- accessories
  {
    slug: "in-sc60-charge-controller",
    name: "IN-SC60 MPPT Charge Controller",
    categorySlug: "solar-accessories",
    status: "published",
    isPlaceholder: true,
    shortDescription:
      "MPPT charge controller for off-grid systems that charge a battery directly from the array.",
    description:
      "The IN-SC60 sits between the array and the battery on an off-grid system, tracking the maximum power point of the array as light conditions change and holding the battery to the right charge profile.",
    image: "/assets/battery/battery-5-4.png",
    images: [],
    highlights: ["60 A", "MPPT", "Off-grid"],
    features: [
      "Maximum power point tracking across changing light conditions",
      "Charge profiles for lithium and lead-acid batteries",
      "Front display for charge current and battery voltage",
      "Wall mounted",
    ],
    specifications: [
      { name: "Charge current", value: "60 A" },
      { name: "Tracking", value: "MPPT" },
      { name: "Battery types", value: "Lithium, lead-acid" },
      { name: "Installation", value: "Wall mounted" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },
  {
    slug: "in-dcb6-combiner-box",
    name: "IN-DCB6 DC Combiner Box",
    categorySlug: "solar-accessories",
    status: "published",
    isPlaceholder: true,
    shortDescription:
      "Six-string DC combiner with per-string fusing and surge protection, for arrays wired in several strings.",
    description:
      "The IN-DCB6 brings up to six strings together into one DC feed, with a fuse on each string and surge protection on the combined output, so a fault or a strike on one string does not take the array with it.",
    image: "/assets/battery/bt-4.png",
    images: [],
    highlights: ["6 strings", "Surge protection", "IP65"],
    features: [
      "Up to six strings combined into one DC feed",
      "A fuse on every string",
      "Surge protection on the combined output",
      "Outdoor-rated enclosure",
    ],
    specifications: [
      { name: "Inputs", value: "6 strings" },
      { name: "Protection", value: "Per-string fusing, surge protection" },
      { name: "Enclosure rating", value: "IP65" },
      { name: "Installation", value: "Wall mounted, outdoor" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },
  {
    slug: "in-mnt-pitched-roof-kit",
    name: "IN-MNT Pitched Roof Mounting Kit",
    categorySlug: "solar-accessories",
    status: "published",
    isPlaceholder: true,
    shortDescription:
      "Rail, clamp and roof hook set for mounting modules on a tiled pitched roof.",
    description:
      "The IN-MNT kit is the hardware that holds an array to a tiled roof: hooks that fix to the rafters and sit under the tiles, rails across them, and clamps that take the module frames. It is ordered by roof area rather than part by part, so an installation is a single line on a quote.",
    image: "/assets/battery/battery-chin-2.png",
    images: [],
    highlights: ["Tiled roofs", "Anodised aluminium", "Stainless fixings"],
    features: [
      "Roof hooks that fix to the rafters and sit under the tile",
      "Anodised aluminium rail",
      "End and mid clamps for standard module frames",
      "Stainless steel fixings",
    ],
    specifications: [
      { name: "Roof type", value: "Tiled, pitched" },
      { name: "Rail material", value: "Anodised aluminium" },
      { name: "Fixings", value: "Stainless steel" },
    ],
    datasheet: placeholderDatasheet,
    manual: placeholderManual,
  },
];

/*
  Only published products are ever returned to the public website. Every
  function below starts here, so a draft cannot reach a listing by accident.
*/
function getPublishedProducts() {
  return products.filter((product) => product.status === "published");
}

/**
 * The four product categories, in the order they should be displayed.
 */
export async function getProductCategories() {
  return productCategories;
}

/**
 * Categories with all of their products, used by the products page.
 */
export async function getCatalogue() {
  const publishedProducts = getPublishedProducts();

  return productCategories.map((category) => ({
    ...category,
    products: publishedProducts.filter(
      (product) => product.categorySlug === category.slug
    ),
  }));
}

/**
 * Categories with a few products each, for the navigation dropdown.
 *
 * The menu is passed from the server layout into the Navbar, which is a client
 * component, so whatever this returns is serialised into every page of the
 * site. That is why it returns only the four fields the menu draws, instead of
 * whole product records with their descriptions and specifications.
 */
export async function getProductMenu() {
  const publishedProducts = getPublishedProducts();

  return productCategories.map((category) => ({
    slug: category.slug,
    name: category.name,
    tagline: category.tagline,
    products: publishedProducts
      .filter((product) => product.categorySlug === category.slug)
      .slice(0, 4)
      .map((product) => ({
        slug: product.slug,
        name: product.name,
        image: product.image,
        highlight: product.highlights?.[0] ?? "",
      })),
  }));
}

/**
 * Products shown in the "Products" section of the homepage.
 */
export async function getFeaturedProducts() {
  return getPublishedProducts().filter((product) => product.isFeatured);
}

/**
 * A single product page. Returns null when the slug does not exist, so the
 * page can render a 404 instead of throwing.
 */
export async function getProductBySlug(slug) {
  return getPublishedProducts().find((product) => product.slug === slug) ?? null;
}

/**
 * Every published product, used to pre-render the product pages at build time.
 */
export async function getAllProducts() {
  return getPublishedProducts();
}

/**
 * The other products in the same category, shown at the bottom of a product
 * page so a visitor can compare sizes without going back to the listing.
 */
export async function getRelatedProducts(product, limit = 3) {
  return getPublishedProducts()
    .filter(
      (candidate) =>
        candidate.categorySlug === product.categorySlug &&
        candidate.slug !== product.slug
    )
    .slice(0, limit);
}

/**
 * Looks up a category by its slug. Used for breadcrumbs and page headings.
 */
export function findCategory(categorySlug) {
  return productCategories.find((category) => category.slug === categorySlug);
}
