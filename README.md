# I&N Energy — Website

Public website and (later) admin panel for **I&N Energy**, a solar and energy
company. One Next.js application serves both company domains
(`i&n-energy.com` and `zingenergy.com`) — there is no second website and no
second admin panel.

---

## Current status

| Part | Status |
| --- | --- |
| Layout (navbar + footer, Poppins font, design tokens) | Done |
| Landing page (hero, solutions, products, about us, projects, CTA) | Done |
| Products dropdown in the navbar (four categories) | Done |
| Products pages (`/products`, `/products/[slug]`) | Done |
| Datasheet and manual downloads | Done, against placeholder PDFs |
| Neon database connection | Not started |
| Admin panel (`/admin`) | Not started |

This file is updated at the end of every step, so it always describes what
actually exists.

---

## Running the project

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

Requires Node.js 20.9 or newer (Next.js 16 minimum).

---

## Tech stack

- **Next.js 16** (App Router, Turbopack by default)
- **React 19**
- **Tailwind CSS v4** — configured in CSS, there is no `tailwind.config.js`
- **Framer Motion** — enter animations (things appearing as you scroll to them)
- **GSAP + ScrollTrigger** — scroll-linked animations (things that move with the
  scrollbar)
- **Neon (PostgreSQL)** — planned, not connected yet

Dependencies are kept minimal on purpose. No UI kit, no state management
library. The two animation libraries have a clear split of responsibility —
see [Animation](#animation) — so the same effect is never built twice.

---

## Project structure

```text
src/
  app/
    layout.js          Root layout: font, navbar, footer, metadata
    page.js            Landing page — only composes sections
    globals.css        Design tokens (colours, font) and base styles
    products/
      page.js          The catalogue, one section per category
      [slug]/page.js   A single product: hero, overview, system,
                       specs, applications, documents, related
  components/
    Container.js       Page width + horizontal padding (used everywhere)
    Navbar.js          Full-width sticky header (client component)
    ProductsMenu.js    The products dropdown in the navbar (client
                       component)
    Footer.js          Full-width dark footer
    Logo.js            I&N wordmark, light and dark variant
    Button.js          The one button/link style used across the site
    SectionHeading.js  Label + title + intro block for sections
    ProductCard.js     Product tile used in listings
    ProductGallery.js  Main photo + thumbnails on a product page (client
                       component)
    ProductSpecifications.js  The name/value specifications table
    ProductHero.js     Dark opening section of a product page — name,
                       photo, first specifications (client component)
    ProductDocuments.js  Full-width datasheet / manual download band,
                       half the page each (client component)
    HeroSlides.js      The four-slide hero stage (client component)
    ImageStream.js     3D corridor of image cards used by ProductStream
                       (client component)
    Reveal.js          Rise + fade the first time something scrolls into
                       view — Framer Motion (client component)
    SplitLines.js      Headlines rising line by line out of a clipping
                       mask — GSAP SplitText (client component)
    Parallax.js        Drifts its children against the scroll — GSAP
                       ScrollTrigger (client component)
    StaggerGroup.js    Brings a group of elements in one after another
                       from a single trigger — GSAP ScrollTrigger
                       (client component)
    FaqAccordion.js    Chat-style question/answer accordion (client
                       component)
    sections/
      Hero.js
      Solutions.js
      Products.js
      About.js
      Projects.js
      Faq.js
      CallToAction.js
  lib/
    products.js        The only place product data is read from

public/
  assets/              Hero videos and product photography
  assets/battery/      The Zing battery studio shots
  docs/                Placeholder datasheet and manual PDFs
  main-logo.png        I&N Energy mark (parent company)
  zing.png             Zing Energy mark (the brand I&N owns)
  longi.png            LONGi wordmark, used in the About us section
```

The rule behind this structure: **`page.js` files stay short**. A page composes
sections, a section renders one part of the story, and small shared components
handle anything that appears more than once.

---

## Layout, spacing and width

Requested behaviour: the navbar and footer span the **full** browser width, but
their content — and every section's content — lines up in a centred column with
a comfortable gap on the left and right.

This is handled by a single component, `components/Container.js`:

```jsx
<div className="mx-auto w-full max-w-[1200px] px-6 md:px-10">
```

- `max-w-[1200px]` — the content column
- `mx-auto` — centres it
- `px-6 md:px-10` — 24px gutters on mobile, 40px from tablet up

Sections that need a full-width background (the dark technology section, the
grey solutions section, the footer) set the background on the `<section>` or
`<footer>` element and put a `<Container>` inside it. That way the colour runs
edge to edge while the text stays aligned with everything else.

**If you add a new section, wrap its content in `<Container>`.** Do not add
your own `max-w-*` or horizontal padding — that is how alignment drifts.

Vertical rhythm is equally standardised: sections use `py-20 md:py-28`.

The one deliberate exception is the hero, which is full-bleed by design: the
video covers the whole viewport width while the text, the product photo and the
controls on top of it still sit inside a `<Container>`.

---

## Typography

The whole website uses **Poppins**, loaded with `next/font/google` in
`src/app/layout.js`:

```js
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});
```

Poppins is not a variable font, so the weights used by the design are listed
explicitly. Next.js self-hosts the font files — nothing is requested from
Google at runtime.

The font variable is wired into Tailwind's `--font-sans` in `globals.css`, and
`body` uses it. That makes Poppins the default everywhere, so **no component
needs a font class**.

---

## Design system

All colours live in the `@theme` block in `src/app/globals.css`. Tailwind v4
turns each token into utilities automatically (`bg-surface`, `text-muted`,
`border-line`, …). Change a value there and it changes across the site.

| Token | Value | Used for |
| --- | --- | --- |
| `ink` | `#0b1219` | Primary text, dark sections, primary button |
| `ink-soft` | `#17232e` | Hover state of dark surfaces |
| `muted` | `#5b6b7a` | Secondary text |
| `line` | `#e3e8ec` | Borders and dividers |
| `surface` | `#f5f7f8` | Light section backgrounds |
| `accent` | `#e2761b` | Solar accent — used sparingly |

Visual direction: premium, minimal, spacious, technical. Structure comes from
**borders, whitespace and typography**, not from shadows. Deliberately avoided:
glassmorphism, large rounded cards, floating blobs and heavy shadows. Corners
are square throughout, which is what keeps it looking like an engineering
company rather than a template.

### Section gradients

Sections used to alternate between flat white and flat `surface`, which put a
hard colour edge at every boundary — the page read as a stack of coloured bands.
Three classes in `globals.css` replace that:

| Class | What it does | Used by |
| --- | --- | --- |
| `.section-tint` | Fades white → `surface` → white down the section | Solutions, About |
| `.section-tint-out` | Fades white → `surface` → slightly deeper, and stays there | Call to action |
| `.accent-wash` | One soft `accent` radial at 9% alpha, low on the section | Call to action |

The rule that makes it work: **a tinted section starts and ends on white.** Two
neighbours therefore always meet on the same colour, so there is no visible
seam, and an untinted section (Products) can sit between two tinted ones without
needing a background of its own.

`.section-tint-out` is the exception because it is the last section before the
dark footer — returning to white there would only make that final edge sharper.

Cards inside a tinted section stay `bg-white`, which is what separates them from
the gradient behind.

### Animation

Two libraries are installed, and each has one job. Before adding an effect,
decide which kind it is:

- **Framer Motion — a whole block appears.** The element is out of view, the
  visitor reaches it, it fades and rises into place once and stays. This is
  `Reveal`, and it is what most things use.
- **GSAP — anything that needs the text split apart, and anything tied to the
  scrollbar.** Splitting a heading into lines is a SplitText job, so headline
  animation is GSAP even though it also plays once. Scrubbed motion, where the
  element's position is a function of how far the page is scrolled the whole
  time it is on screen, is GSAP too.

Do not solve one with the other; that is how a project ends up with two
half-finished animation systems. The one rule that keeps them apart in
practice: **never put a `SplitLines` heading inside a `Reveal`.** The block
would be translating while the heading runs its own reveal inside it, which
reads as two competing animations and moves the ground under ScrollTrigger's
measurements. Wrap the heading's siblings instead.

What exists today:

| Motion | Built with | Where |
| --- | --- | --- |
| Rise + fade on entry | Framer Motion | `components/Reveal.js` |
| Headlines rising out of a mask | GSAP SplitText + ScrollTrigger | `components/SplitLines.js` |
| Parallax drift | GSAP ScrollTrigger | `components/Parallax.js` |
| A group arriving one item after another | GSAP ScrollTrigger | `components/StaggerGroup.js` |
| Product hero: entrance timeline + photo drift | GSAP timeline + ScrollTrigger | `components/ProductHero.js` |
| Download panels meeting in the middle | GSAP ScrollTrigger | `components/ProductDocuments.js` |
| Hero content falling behind on exit | GSAP ScrollTrigger | `HeroSlides.js` |
| Reading progress bar | Framer Motion `useScroll` | `Navbar.js` |
| Hero slide cross-fade | CSS (`.hero-fade`) | `globals.css` |
| Hover transitions | CSS | throughout |

**`Reveal`** is the one every section uses. It takes a `delay` in milliseconds,
which is how a grid staggers — each card passes `index * 90`, so the row arrives
one item after another:

```jsx
{products.map((product, index) => (
  <Reveal key={product.slug} delay={index * 90}>
    <ProductCard product={product} />
  </Reveal>
))}
```

`viewport={{ once: true }}` stops it replaying when the visitor scrolls back up.

**`StaggerGroup`** is the same idea for a whole group. `Reveal` animates one
block and each caller works out its own delay; `StaggerGroup` animates every
child of one element from a single trigger, so a grid stays in step however
many items it turns out to have — which matters for content that comes from the
database rather than from a hand-written list:

```jsx
<StaggerGroup className="grid grid-cols-1 gap-px sm:grid-cols-2 lg:grid-cols-4">
  {applications.map((application) => (
    <article key={application.title}>…</article>
  ))}
</StaggerGroup>
```

Pass `selector` when the elements to animate are rendered by another component
(the product page uses `selector="dl > div"` to stagger the rows of
`ProductSpecifications`).

Reduced motion in the GSAP components is handled by `gsap.matchMedia()`: the
tweens are only created while `(prefers-reduced-motion: no-preference)` matches,
so nothing is touched for a visitor who asked for less movement, and GSAP
reverts everything by itself if that setting changes while the page is open.

**`SplitLines`** is the headline animation. It splits a heading into lines,
wraps each line in a clipping mask and rises them out from behind it one after
another as the heading scrolls into view:

```jsx
<SplitLines>
  <h2 className="text-4xl …">One platform, three scales of energy</h2>
</SplitLines>
```

Four things about it are load-bearing:

- **It splits the heading, not the wrapper.** SplitText puts an `aria-label` on
  whatever it splits and hides the generated spans, so splitting the `<h2>`
  keeps the heading announced with its real text. Splitting the wrapper would
  leave an `<h2>` full of `aria-hidden` spans and no accessible name. Pass
  exactly one element as the child.
- **`autoSplit: true`.** Poppins arrives as a web font, so a first split can be
  measured against the fallback face and break in the wrong places. autoSplit
  re-splits once the real font lands, and again when the column width changes.
- **The animation is built inside `onSplit`.** autoSplit throws the old line
  elements away; anything created outside would be holding nodes that are no
  longer in the document. Returning the tween lets SplitText revert and rebuild
  it at the same playhead position.
- **Headings only.** A line-by-line reveal over a paragraph is tiring to read,
  so body copy uses `Reveal`.

`playOnMount` skips the ScrollTrigger for headings that are already on screen —
only the hero uses it, and because the hero slide is keyed, changing slide
remounts the component and the new title animates in by itself.

The mask wrappers are the one piece with a CSS dependency. SplitText names them
after the line class with `-mask` appended and gives them `overflow: clip`,
whose clip edge is the padding box — so `.split-line-mask` in `globals.css`
carries a small `padding-bottom` to stop descenders being sliced off, and an
equal negative margin so the line spacing does not change.

**`Parallax`** wraps anything that should drift against the scroll. It renders
two elements on purpose: the outer one is the ScrollTrigger trigger, the inner
one is what moves. Measuring an element that is also being transformed would
feed its own movement back into the trigger's start and end positions.

```jsx
<Parallax distance={18}>
  <Image src="/main-logo.png" … />
</Parallax>
```

Keep `distance` small (10–40px). Parallax on body text is unpleasant to read —
use it on logos, images and decorative layers.

**The hero exit** is in `HeroSlides.js`. The trigger is the stage, which is
stable; the element that moves is the content layer (`.hero-stage-content`).
The slide itself is keyed and remounts on every change, so anything inside it
would leave GSAP holding a node that is no longer in the document.

Everything here respects `prefers-reduced-motion`. `SplitLines` does not split
at all, so the heading is left exactly as the server rendered it; `Parallax`
and the hero exit never register a trigger; the CSS animations and `Reveal` are
switched off in `globals.css`.

`Reveal` is handled in CSS rather than in the component on purpose. It used to
return a plain `<div>` when `useReducedMotion()` was true, which meant the
server sent the div with `opacity: 0` and a reduced-motion browser hydrated it
without one — React reported the mismatch as a console error and refused to
patch it, leaving those blocks invisible. The component now renders the same
markup for everyone and `.reveal` is pinned to its finished state under the
reduced-motion media query.

---

## Landing page sections

`src/app/page.js` is intentionally just a list:

```jsx
<Hero />
<Solutions />
<Products />
<About />
<Ranges />
<Projects />
<Faq />
<CallToAction />
```

| Section | Purpose | Content source |
| --- | --- | --- |
| **Hero** | Four-slide stage: two videos, two product slides, plus a stat strip | `HeroSlides.js` |
| **Solutions** | Residential / commercial / utility — the three scales of project | In the component |
| **Products** | Featured product cards: photo on top, details below | `lib/products.js` → database later |
| **About** | Who we are and the LONGi distributorship, centred under the logo | In the component |
| **Ranges** | The four product ranges as a stack of cards that fans apart on hover | `lib/products.js` → database later |
| **ProductStream** | Dark band where product photos stream toward the viewer, directly under Ranges | `lib/products.js` → database later |
| **Projects** | Three reference projects with the measured outcome | In the component |
| **Faq** | Centred heading with a chat-style FAQ under it, directly above the call to action | In the component |
| **CallToAction** | "Request a proposal", anchors the `#contact` link | In the component |

### The Ranges section and the hover stack

`sections/Ranges.js` is a server component: it reads the product categories
with `getProductCategories()` and turns each one into a card, so a category
renamed in the data is renamed on the homepage without touching this section.

The cards themselves are drawn by `components/Hover.js` (`HoverStack`), a
client component adapted from a Hyperiux Vault demo. A card is:

```js
{ id, tag, text, href, bg, accent }
```

`bg` is any CSS colour and `accent` is the Tailwind text-colour class that
reads against it. The card colours are set in `Ranges.js` rather than in the
product data, because they are a decision about this one section — the same
categories appear as plain rows on the products page.

Three things are worth knowing about the component:

- **It renders nothing until it has mounted.** The layout depends on the
  pointer type and the reduced-motion setting, neither of which exists during
  SSR. `Ranges.js` passes a `md:min-h-[414px]` class to hold the space so the
  page does not jump when the cards appear.
- **It switches on pointer type, not width.** A touch device gets a plain
  vertical list, because there is no hover to fan the cards with. A narrow
  desktop window still gets the stack, clipped by the section's
  `overflow-hidden` — a hovered card is pushed sideways past the edge of the
  stack by design.
- **A card with an `href` renders as a link**, which is what makes the
  "Explore" footer work and lets the stack be tabbed through; focus fans the
  cards the same way hover does.

### The ProductStream section

`sections/ProductStream.js` is a server component. It collects every photo
(`image` and `images`) from `getAllProducts()`, removes duplicates and passes
them to `components/ImageStream.js`, so the photos follow the product data.

`ImageStream` is a JavaScript port of a TypeScript "image stream hero"
component. Two mirrored rails of cards fly from a vanishing point toward the
viewer. There is no animation library involved: the path is sampled once into
CSS `@keyframes`, and CSS 3D perspective turns that into the growing, outward
sweep. Worth knowing before editing it:

- **All lengths are `cqw`** (percent of the component's width, via
  `container-type: inline-size`), so the corridor keeps its shape from phone to
  large desktop. Change the height with the `className` passed in.
- **Density vs. speed.** `cards` is how many cards sit on each rail, `speed` is
  the seconds one card takes to cross. Lowering `cards` far below 9 tears gaps
  in the ribbon near the edges.
- **Card colours are CSS gradients, not images.** Each image entry can carry a
  `background`; `ProductStream.js` assigns one from its `cardBackgrounds`
  array. The colour only shows because the product photos are transparent
  PNGs. Three photos have the white baked in (`bt-1123.png`,
  `battery-chinease-1.png`, `battery-11.jpg`), so they are listed in
  `opaquePhotos` and left out of the stream — remove an entry once a
  transparent cut-out is supplied.
- **Reduced motion pauses the animation** instead of removing it. Each card is
  already placed mid-flight by a negative `animation-delay`, so the corridor
  freezes as a finished still.
- The corridor is `aria-hidden` and its images have empty `alt` — it is
  decoration; the heading, text and button on top carry the content.

### The FAQ section

`sections/Faq.js` holds the questions in the `faqItems` array and renders them
with `components/FaqAccordion.js`. The accordion is a JavaScript port of a
TypeScript "FAQ chat accordion": each question is a bubble, opening it slides
the answer in underneath as a dark reply bubble, and only one is open at a
time.

- **No new dependencies.** The original used Radix Accordion, lucide-react and
  a `cn()` helper. For a single-open list, native `<button>`s with
  `aria-expanded` give the same behaviour and keyboard support, the plus/minus
  icons are inline SVG, and Framer Motion (already installed) animates the
  height.
- **Closed answers stay mounted but `inert`**, so the height can animate both
  ways without hidden text being tabbable or read out.
- **Colours use the site tokens** instead of shadcn's `primary`/`muted`:
  `surface` for a closed question, `accent` for the open one, `ink` for the
  answer bubble. Override them with `questionClassName` / `answerClassName`.
- The rounded bubbles are a deliberate exception to the square corners used
  elsewhere — they are what makes it read as a chat.
- An item may carry an `icon` (a short string, usually an emoji) and
  `iconPosition` (`"left"` or `"right"`), pinned to the top corner of the
  question.
- The answers only repeat what the site already says. Do not add warranty
  terms, lead times or figures until the client supplies them.

### How a section's text is organised

Every section leads with the same three-step block, which is what gives the
page a consistent rhythm rather than a stack of unrelated headings:

```text
————  SOLUTIONS              a hairline rule and a small tracked label
One platform, three          the title, animated line by line
scales of energy
The same inverter …          a short intro
```

`components/SectionHeading.js` renders all three and is what Solutions and
Products use. The call to action builds the same shape by hand because it also
has a button sitting beside it. The label is a plain word for where the visitor
is — "Solutions", "Products", "Get in touch" — not a slogan.

The About section is the deliberate exception: it is centred and runs three of
these headings in sequence under the two company logos.

Those headings used to be `<p>` elements styled at heading size, which left the
whole section with no heading structure at all. They are `<h2>` now, so the
page reads `<h1>` (hero) → `<h2>` (section) → `<h3>` (cards).

### The hero slides

The hero (`src/components/HeroSlides.js`) is a stage of four slides. The
visitor moves through it with the arrow buttons in the bottom corners, and the
playback controls sit between them.

| # | Media | Layout |
| --- | --- | --- |
| 01 | `assets/main-vid-1.mp4` | Video behind centred text + both CTAs |
| 02 | `assets/main-vid-2.mp4` | Video behind centred text + both CTAs |
| 03 | `assets/battery/battery-11.jpg` | Heading + paragraph left, product photo right |
| 04 | `assets/battery/battery-chinease-1.png` | Heading + paragraph left, product photo right |

All four slides are defined in the `heroSlides` array at the top of
`HeroSlides.js`. Editing a headline, swapping a file or changing the order is a
change to that array and nothing else.

**Why the product slides are white.** Both battery photos were shot on pure
white — `#ffffff`, verified by sampling the files, and the PNG's transparent
areas are white too. So those slides paint the whole section white
(`tone: "light"`) and use dark text. The photo has no visible edge against that
background, which is what makes it look like part of the page instead of an
image dropped on top of it. Using the off-white `surface` token here would draw
a faint rectangle around every product. The video slides use `tone: "dark"`
with a dark scrim so white text stays readable over the footage, and the
control buttons read the active slide's tone and switch colour with it.

**Why the photo sits beside the text.** `object-contain` inside a half-width
box keeps each product at its own proportions — a wide range shot and a single
tall unit both fit without cropping. The leftover space around the photo is
invisible because the slide and the photo share the same white.

**Navigation, sound and playback.** The bottom bar is a single `justify-between`
row:

- **Previous / next** — arrow buttons in the two corners, no text labels.
- **Play / pause** — pauses the video *and* stops image slides from advancing,
  so it is a control for the whole hero, not just the videos.
- **Volume** — only shown on video slides, since image slides have no sound.

The video always starts muted because browsers refuse to autoplay a video with
sound; the visitor turns sound on with the volume button. If the browser
rejects playback anyway, the component logs it and flips to the paused state
rather than showing a play indicator that does not match reality.

The element deliberately has **no `autoPlay` attribute** — the effect starts
every clip, so there is only ever one thing asking the video to play. Changing
slide or pressing pause rejects whatever play() was still in flight with an
`AbortError` ("The play() request was interrupted…"); that is expected and is
ignored, because it means the hero moved on, not that playback failed. Only a
genuine refusal reaches the console and flips the controls to paused.

**Advancing.** A video slide moves on when the clip ends. Image slides have no
"ended" event, so they move on after 8 seconds (`IMAGE_SLIDE_DURATION_MS`).
The arrows and the timer both wrap around in either direction.

**Adding or removing a slide:** add an entry to `heroSlides` with a `type`
(`video` or `image`) and a `tone` (`dark` or `light`). The arrows, the timing
and the controls all follow from the array — there is no separate list to keep
in sync.

Marketing copy sits directly in its section component as a small array at the
top of the file. That is deliberate — this text changes rarely and is not
managed by the admin, so putting it in the database would add work with no
benefit. **Product data is the opposite and must never be hardcoded.**

### Navigation links

The navbar has three entries: **Solutions** and **Projects** are still homepage
anchors (`/#solutions`, `/#projects`), and **Products** is a dropdown — see
[The products dropdown](#the-products-dropdown). Footer entries are homepage
anchors too.

---

## The two brands

**I&N Energy is the parent company and Zing Energy is the brand it owns.**
Both marks are shown together, in two places:

| Where | What is shown |
| --- | --- |
| Header (`components/Navbar.js`) | `<Logo />` (I&N mark + wordmark), a thin divider, then the Zing mark |
| About us (`components/sections/About.js`) | The two marks side by side above the heading, with a caption naming the relationship |

The divider between them is the point: without it the two marks read as one
combined logo. Only the I&N half is a link to `/` — the Zing mark is a brand
mark, not navigation.

`components/Logo.js` is deliberately left as the **I&N wordmark alone**,
because the footer also uses it and the Zing mark is solid black — it would
disappear against the dark footer background. If Zing is ever needed there, a
white version of the artwork has to be supplied first; do not try to invert
`zing.png` in CSS.

**About the Zing logo file.** The supplied `public/zing.jpg` had the
transparency checkerboard flattened into it — the same problem as the LONGi
logo below — so dropping it in would have drawn a grey and white grid behind
the mark. `public/zing.png` is that artwork with a real alpha channel: the
mark sits entirely below luminance 130 and the checkerboard above 190, so the
two separate cleanly, and the file is then trimmed to the mark, squared with a
small margin and saved as a 640px palette PNG (81 KB, down from 384 KB as full
RGBA). The margin is what lets it sit next to `main-logo.png` at the same box
height without looking larger. `public/zing-logo.jpg` is an unused alternate
supplied by the client, on an off-white background.

This is the second logo to arrive with a baked-in checkerboard, so it is worth
stating plainly: **when a logo is supplied as a JPEG, it has no transparency.**
Ask for a PNG or SVG, or rebuild the alpha channel before using it.

---

## The About us section

About us is a section of the landing page (`src/components/sections/About.js`),
reached through the `/#about` anchor. It sits between Products and Projects,
which is also where "About us" sits in the navbar.

Everything in it is centred: the two company logos, the heading, the story, the
LONGi distributorship block and the services grid.
Each block is wrapped in `<Reveal>` with a staggered delay, so as the visitor
scrolls the section the pieces rise into place one after another instead of
appearing all at once. The two logos also sit in `<Parallax>`, which drifts them
slightly against the scroll and stops the centred column reading as flat.

The section opens with the I&N and Zing marks side by side inside a single
`<Parallax>`, so the pair drifts together rather than each drifting on its own.
Under them sits one small caption — "I&N Energy — parent company of the Zing
Energy brand" — which is the only place on the site that spells the
relationship out.

**The founding year is a placeholder.** `companyFacts` at the top of the file
holds it, and it is invented — replace it with the real year before the site
goes live. The LONGi distributorship claim came from the client, so it stands
as written; nothing else in the section asserts a number, a certification or a
named project.

**About the LONGi logo.** The supplied `public/longi.jpg` had the transparency
checkerboard flattened into it, so using it directly would have drawn a grey
and white grid behind the wordmark. `public/longi.png` is the same artwork with
a real alpha channel (the logo colour un-composited from the grey background),
and that is the file the section uses. If the logo is ever replaced, supply a
PNG or SVG with genuine transparency.

The Technology section that used to sit on the homepage was removed along with
its invented certification list.

---

## Products (how it is meant to work)

Products must never be hardcoded in components. Everything flows in one
direction:

```text
Neon database → lib/products.js → section/page components → visitor
```

Each product carries an `image` (the path to its photo) alongside its name,
category, description and highlights. `ProductCard.js` reads that field — it
never names a file itself, so changing a product photo later is a data change,
not a code change.

`src/lib/products.js` is the **only** file that knows where product data comes
from, and it exports `async` functions:

| Function | Used by |
| --- | --- |
| `getProductMenu()` | The navbar dropdown (`layout.js` passes it down) |
| `getCatalogue()` | `/products` — categories with their products |
| `getFeaturedProducts()` | The products section on the landing page |
| `getProductBySlug(slug)` | `/products/[slug]` |
| `getAllProducts()` | `generateStaticParams` for the product pages |
| `getRelatedProducts(product)` | "Also in this range" at the foot of a product page |
| `findCategory(slug)` | Breadcrumbs and headings (synchronous — it only reads the category list) |

Right now those functions read two arrays in the same file, so the website
could be built before the database exists. When Neon is connected, only the
function bodies change — no component and no page is touched. The arrays are
deleted at that point.

### Categories

There are four, and the order of the `productCategories` array is the order
they appear everywhere (menu, catalogue page, anchors):

```text
Lithium Batteries → Solar Inverters → Solar Panels → Solar Accessories
```

There is **no** `/products/category/[slug]` route. Each category is a section
with its slug as the `id` on `/products`, so a category link is just
`/products#solar-panels`. One page, four anchors, nothing to maintain.

A category holds its own copy as well as its name:

```text
slug, name, tagline, description   Menu, catalogue page, product page heading
systemIntro                        "Where it sits in an installation" paragraph
systemSteps                        Three numbered boxes next to it
applications                       Four boxes — where the range is typically used
```

The last three are what fill out a product page (see
[The product page](#the-product-page)).

### What a product holds

```text
slug            URL of the product page
name            Display name
categorySlug    Which of the four categories it belongs to
status          "published" or "draft" — only published ones are returned
isFeatured      Shown in the products section on the landing page
shortDescription  One or two sentences, used on cards and at the top of the page
description     The Overview paragraph on the product page
image           Main photo (cards, menu tiles, first gallery image)
images          Any extra photos, shown as gallery thumbnails
highlights      Two or three short figures ("5.12 kWh", "51.2 V")
features        Bullet list on the product page
specifications  [{ name, value }] — see below
datasheet       PDF URL
manual          PDF URL
isPlaceholder   Prints a "placeholder content" notice on the product page
```

### Specifications

Specifications are a **list of name/value pairs**, not database columns:

```js
specifications: [
  { name: "Nominal voltage", value: "51.2 V" },
  { name: "Rated capacity", value: "100 Ah" },
]
```

A battery, an inverter and a mounting kit have almost nothing in common, so a
fixed set of columns (`power`, `voltage`, `ip_rating`, …) would be wrong for
two products out of three. The admin decides which rows a product has, and
`ProductSpecifications.js` renders whatever it is given, in order.

### The product page

`/products/[slug]` is composed of seven sections, and the file that renders it
only arranges them — every word on the page comes from the product record or
from the category it belongs to:

| Section | Layout | Content from |
| --- | --- | --- |
| Hero (dark) | Name and photography side by side, first four specifications along the bottom | product |
| Overview | Text left, numbered features right | product |
| In the system | Numbered boxes left, text right | category |
| Specifications | Text left, full table right | product |
| Applications | Four boxes | category |
| Documents | Two panels, half the page each | product |
| Also in this range | Product cards | category |

The two-column sections alternate which side carries the text, so the eye moves
across the page instead of down one column. Each stacks to a single column
below `lg`, with the text first — the boxes illustrate what the paragraph says,
so the paragraph has to come first when they cannot sit side by side.

**Why three of those sections come from the category.** A product record holds
what is true of that unit; `systemIntro`, `systemSteps` and `applications` sit
on the category because they are true of the whole range. Writing them once per
category means a product added through the admin panel gets a full page without
anyone writing three more sections of copy for it, and it keeps the admin form
to the fields that actually differ between products.

### Datasheets and manuals

Every product has a `datasheet` and a `manual` URL, and the product page ends
with `ProductDocuments.js`: a full-width band split down the middle, the
datasheet on one half and the manual on the other. It is the only section that
does not sit inside `Container` — a visitor who scrolled that far usually came
for one of those two files, so they get the full width of the page rather than
a pair of small buttons. On a phone the two panels stack, because half a phone
screen is not a usable tap target. Both currently point at
`public/docs/placeholder-datasheet.pdf` and `public/docs/placeholder-manual.pdf`
— real one-page PDFs that say they are placeholders, so the buttons can be
tested end to end before any real document exists.

When the admin panel can upload files, the files go to object storage and only
the URL is saved on the product. **PDFs are never stored in a database row.**
A product with no document simply has `null` there, and that panel is not
rendered — with only one document the remaining panel takes the whole width
rather than leaving a hole next to it.

### The product card

`ProductCard.js` is a rounded card: a square photo panel on top and the text
underneath. Two things keep a row even however long the descriptions get — the
grid stretches every card to the tallest one, the square panel is therefore
identical in each, and `mt-auto` on the "View product" button pushes it to the
bottom of the card instead of letting it sit directly under the last line of
text.

The panel used to be 40% of the card height with a `min-h` to make that
percentage resolve. That is circular — the card's height comes from its
content, so the tallest card in a row resolved the 40% differently from its
neighbours, and the buttons ended up on three slightly different lines. A fixed
ratio has no such feedback loop.

The photo uses `object-contain` inside a `bg-surface` panel with padding. The
product photography is cut out against a plain background rather than being a
scene, so cropping it to fill the panel would cut the product itself in half.

### The products dropdown

`components/ProductsMenu.js` is the **Products** entry in the desktop navbar: a
link to `/products` that also opens a full-width panel underneath the header.

```text
┌─────────────────────────────────────────────────────────────┐
│ CATEGORIES              LITHIUM BATTERIES                   │
│ ▸ Lithium Batteries     ┌────┐ ┌────┐ ┌────┐                │
│   Solar Inverters       │img │ │img │ │img │                │
│   Solar Panels          └────┘ └────┘ └────┘                │
│   Solar Accessories     25Z-…  51Z-…  51Z-…                 │
│   All products →                                            │
└─────────────────────────────────────────────────────────────┘
```

Pointing at a category name swaps the right-hand side without navigating.
Clicking one goes to that category's anchor on `/products`; clicking a tile
goes to the product page.

Two details worth knowing before editing it:

- The panel is a **child** of the trigger's wrapper, and the wrapper is
  `self-stretch` so it fills the full height of the navbar row. That is what
  keeps the menu open while the pointer travels from the link down to the
  panel — there is no dead gap in between for it to fall through.
- `Navbar.js` is a client component, so it cannot fetch anything itself.
  `app/layout.js` calls `getProductMenu()` and passes the result down as a
  prop. `getProductMenu()` returns only the four fields the menu draws,
  because whatever it returns is serialised into every page of the site.

On mobile the same information is a section that opens in place inside the
mobile menu — a panel covering the screen would be the wrong shape for four
categories.

### Placeholder content

The three Zing batteries are real products; their specifications are taken from
the units themselves. Everything in the other three categories is marked
`isPlaceholder: true` and reuses the battery photography, because no real
inverter, panel or accessory material has been supplied yet. Those product
pages print a short notice saying so, so a placeholder figure is never mistaken
for a published specification. Removing the flag (and supplying real content)
removes the notice.

---

## Database — Neon (next step)

All schema work happens in the **Neon console SQL editor**. This repository
does not and will not contain `.sql` files, migration folders or an ORM schema.
The application only reads and writes through queries in `src/lib/`.

**What to do in the Neon console before the next step:**

1. Go to <https://console.neon.tech> and create a project — name it
   `in-energy`. Any region close to your users is fine.
2. Open **Connection Details** and copy the **pooled** connection string. It
   looks like:
   ```text
   postgresql://user:password@ep-xxxx-pooler.region.aws.neon.tech/neondb?sslmode=require
   ```
3. In the project root create `.env.local` (it is already gitignored) and add:
   ```bash
   DATABASE_URL="postgresql://...pooler...?sslmode=require"
   ```

Do not create any tables yet. In the next step you will be given the exact SQL
to paste into the Neon SQL editor, matching the queries written here, so the
schema and the code stay in sync.

---

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Next step | Neon PostgreSQL connection string (pooled) |

Further variables (admin login, file uploads) are documented here as those
features are built. `.env.local` is gitignored — never commit credentials.

---

## Two domains

Both `i&n-energy.com` and `zingenergy.com` point at this same deployment, with
the same database and the same `/admin`. There is nothing domain-specific in
the code; the second domain is configured as a redirect/alias at the hosting
level. Do not duplicate the project for the second brand.

---

## How to make common changes

| I want to… | Do this |
| --- | --- |
| Change a colour | Edit the `@theme` block in `src/app/globals.css` |
| Change the font | Edit the `Poppins(...)` import in `src/app/layout.js` |
| Change page width or side gaps | Edit `src/components/Container.js` (one place, whole site) |
| Edit headline or marketing copy | Edit the array at the top of the matching file in `src/components/sections/` |
| Add a landing page section | Create it in `src/components/sections/`, wrap content in `<Container>`, add it to `src/app/page.js` |
| Change navbar or footer links | Edit the links in `Navbar.js` / `footerColumns` in `Footer.js` |
| Add a product category | Add it to `productCategories` in `src/lib/products.js` — the menu, the catalogue page and the anchors all follow |
| Add or edit a product | Edit the `products` array in `src/lib/products.js` (the admin panel replaces this) |
| Replace a datasheet or manual | Put the PDF in `public/docs/` and point the product's `datasheet` / `manual` at it |
| Edit the About us section | Edit `src/components/sections/About.js` (text, logos, the `companyFacts` placeholders) |
| Replace the I&N or Zing logo | Drop a **PNG or SVG with real transparency** into `public/`, then update the `src` in `components/Logo.js` / `Navbar.js` / `sections/About.js` |
| Change the colours behind the streaming product cards | Edit `cardBackgrounds` in `src/components/sections/ProductStream.js` |
| Change a hero slide (text, video, photo, order) | Edit the `heroSlides` array in `src/components/HeroSlides.js` |
| Make a button bigger | Pass `size="lg"` to `<Button />` (sizes live in `Button.js`) |
| Animate a new heading | Wrap the single heading element in `<SplitLines>`, and do not also wrap it in `<Reveal>` |
| Animate a new grid or list | Make `<StaggerGroup>` the grid itself — it animates its children from one trigger |
| Edit the "In the system" or "Applications" copy on product pages | Edit `systemIntro` / `systemSteps` / `applications` on the category in `src/lib/products.js` |
| Edit the FAQ questions | Edit the `faqItems` array in `src/components/sections/Faq.js` |
| Change the eyebrow label on a section | Edit the `label` prop passed to `<SectionHeading />` in that section |
| Change a product photo | Edit the `image` path in `src/lib/products.js` (the admin panel replaces this) |
| Change product content | Through the admin panel once built — never in components |

---

## Conventions

- Components are small and named after what they represent, not after markup.
- Comments explain **why**, never what the line already says.
- Server components by default; `"use client"` only where interaction requires
  it (currently `Navbar.js`, `HeroSlides.js`, `Reveal.js` and `Parallax.js`).
- No global state library. Local state and server-side data fetching only.
- Every new section is responsive: tested at mobile, tablet, laptop and desktop.
