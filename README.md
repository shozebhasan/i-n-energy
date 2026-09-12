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
| Neon database connection | Not started |
| Products pages (`/products`, `/products/[slug]`) | Not started |
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
  components/
    Container.js       Page width + horizontal padding (used everywhere)
    Navbar.js          Full-width sticky header (client component)
    Footer.js          Full-width dark footer
    Logo.js            Wordmark, light and dark variant
    Button.js          The one button/link style used across the site
    SectionHeading.js  Label + title + intro block for sections
    ProductCard.js     Product tile used in listings
    HeroSlides.js      The four-slide hero stage (client component)
    Reveal.js          Rise + fade the first time something scrolls into
                       view — Framer Motion (client component)
    Parallax.js        Drifts its children against the scroll — GSAP
                       ScrollTrigger (client component)
    sections/
      Hero.js
      Solutions.js
      Products.js
      About.js
      Projects.js
      CallToAction.js
  lib/
    products.js        The only place product data is read from

public/
  assets/              Hero videos and product photography
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

- **Framer Motion — plays once, on entry.** The element is out of view, the
  visitor reaches it, it animates in and stays.
- **GSAP ScrollTrigger — tied to the scrollbar.** The element's position is a
  function of how far the page is scrolled, forwards and backwards, the whole
  time it is on screen (`scrub`).

Do not solve one with the other; that is how a project ends up with two
half-finished animation systems.

What exists today:

| Motion | Built with | Where |
| --- | --- | --- |
| Rise + fade on entry | Framer Motion | `components/Reveal.js` |
| Parallax drift | GSAP ScrollTrigger | `components/Parallax.js` |
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

Everything here respects `prefers-reduced-motion`: `Reveal` renders its children
in their final state, `Parallax` and the hero exit never register a trigger, and
the CSS animations are switched off in `globals.css`.

---

## Landing page sections

`src/app/page.js` is intentionally just a list:

```jsx
<Hero />
<Solutions />
<Products />
<About />
<Projects />
<CallToAction />
```

| Section | Purpose | Content source |
| --- | --- | --- |
| **Hero** | Four-slide stage: two videos, two product slides, plus a stat strip | `HeroSlides.js` |
| **Solutions** | Residential / commercial / utility — the three scales of project | In the component |
| **Products** | Featured product cards: photo on top, details below | `lib/products.js` → database later |
| **About** | Who we are and the LONGi distributorship, centred under the logo | In the component |
| **Projects** | Three reference projects with the measured outcome | In the component |
| **CallToAction** | "Request a proposal", anchors the `#contact` link | In the component |

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

Every navbar and footer entry is a homepage anchor (`/#solutions`,
`/#products`, `/#about`, …) because no sub-pages exist yet. When `/products` is
built, change the `navLinks` array at the top of `components/Navbar.js` — the
`href` is the only thing that needs editing.

---

## The About us section

About us is a section of the landing page (`src/components/sections/About.js`),
reached through the `/#about` anchor. It sits between Products and Projects,
which is also where "About us" sits in the navbar.

Everything in it is centred: the company logo (`public/main-logo.png`), the
heading, the story, the LONGi distributorship block and the three things we do.
Each block is wrapped in `<Reveal>` with a staggered delay, so as the visitor
scrolls the section the pieces rise into place one after another instead of
appearing all at once. The two logos also sit in `<Parallax>`, which drifts them
slightly against the scroll and stops the centred column reading as flat.

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

```js
export async function getFeaturedProducts() { ... }
```

Right now those functions return a placeholder array so the landing page could
be built before the database exists. When Neon is connected, only the function
bodies change — `Products.js`, `ProductCard.js` and every future product page
stay exactly as they are. The placeholder array is deleted at that point.

### The product card

`ProductCard.js` is a rounded card: the photo fills the top 40% and the text
sits underneath. The 40% is a real percentage of the card height, which only
resolves because the card sets `min-h-[560px]` — the grid then stretches every
card to the tallest one and the photo keeps its share of that height, so all
three cards line up however long the descriptions get.

The photo uses `object-cover`, so it fills the band edge to edge with no
letterboxing. The supplied product shots have full-bleed coloured backgrounds
rather than a flat colour, so `object-contain` would have left a visible seam
between the photo and the card.

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
| Change navbar or footer links | Edit `navLinks` in `Navbar.js` / `footerColumns` in `Footer.js` |
| Edit the About us section | Edit `src/components/sections/About.js` (text, logo, the `companyFacts` placeholders) |
| Change a hero slide (text, video, photo, order) | Edit the `heroSlides` array in `src/components/HeroSlides.js` |
| Make a button bigger | Pass `size="lg"` to `<Button />` (sizes live in `Button.js`) |
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
