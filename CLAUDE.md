# CLAUDE.md — I&N Energy Website

## 1. Project Goal

This project is the frontend and admin system for **I&N Energy**, a modern solar and energy company.

The public website should feel premium, modern, clean, trustworthy, and technology-focused.

Use the Huawei residential solar website as a **visual and UX reference**:

https://solar.huawei.com/en/residential/

Also use the provided iTel Energy product page as inspiration for product-detail presentation:

https://energy.itel-life.com/

These are references only. Do **not** copy their branding, text, images, layouts, or proprietary design.

Create an original I&N Energy experience.

You can use GSAP components as well, and make smooth triggers animations.

# 2. Most Important Rule: Keep It Simple

Do not over-engineer this project.

The goal is a production-quality website with an admin panel, but the architecture should remain simple enough that another developer can open the project later and easily understand and modify it.

Prefer:

- Simple architecture
- Clear folders
- Small components
- Straightforward API calls
- Simple database structure
- Reusable components where they actually help
- Easy-to-edit code
- Minimal dependencies

Avoid:

- Unnecessary design patterns
- Complex abstractions
- Microservices
- Event-driven architecture unless genuinely required
- Complicated state management
- Excessive custom hooks
- Excessive TypeScript abstractions
- Multiple frontend applications without a real need
- Multiple admin roles
- Complicated permission systems
- Building a CMS framework from scratch
- Adding libraries just because they are popular

**Simple and maintainable is more important than clever.**

# 3. Code Like a Human

Write code like a professional human developer would write it.

The code should be understandable six months from now.

Prefer clear names:

```js
const products = [...]
const selectedProduct = ...
const productSpecifications = ...
```

Avoid unclear names:

```js
const x = ...
const d = ...
const arr = ...
const temp = ...
```

Avoid clever one-liners when they make the code harder to understand.

Do not create abstractions just to reduce a few lines of code.

If a simple function solves the problem, use the simple function.

# 4. Explain Important Code

When implementing a meaningful feature, explain the important parts in documentation.

Do not add comments to obvious code.

Comments should explain **why something is done**, not simply repeat what the code says.

Bad:

```js
// Set loading to true
setLoading(true)
```

Good:

```js
// Show the loading state while the product details are being fetched.
// This prevents the user from seeing an empty product section.
setLoading(true)
```

Keep comments useful and limited.

# 5. README.md Is Required

Maintain a simple, human-readable:

```text
README.md
```

The README should explain:

- What the project is
- How to run it
- Project structure
- Main public website sections
- Admin panel structure
- How products are managed
- How product specifications work
- How datasheets are uploaded
- How authentication works
- Environment variables
- Important technical decisions
- How to make common changes

The README should be useful to a developer who has never worked on this project.

Do not write documentation that simply repeats the code.

Explain the purpose of the system and important decisions.

# 6. Public Website

The public website is what normal visitors see.

The website should include the appropriate sections for a premium solar company, such as:

- Navbar
- Hero
- Company/value proposition
- Solar solutions
- Products
- Product details
- Technology/innovation
- Benefits
- Projects/case studies
- Trust/reliability
- CTA
- Footer

The exact sections can change as the design develops.

Do not blindly copy the reference websites.

Build a coherent story for I&N Energy.

# 7. Product System

Products must NOT be hardcoded throughout the frontend.

The public website should receive product information from the backend/database.

Conceptually:

```text
Database
    ↓
Backend/API
    ↓
Next.js
    ↓
Public website
```

This allows an admin to change products without changing frontend code.

For example:

```text
Admin changes:

Product name
Description
Image
Specifications
Datasheet
Status

        ↓

Database updated

        ↓

Public website shows the updated information
```

# 8. Product Details

A product should support information such as:

- Product name
- Slug
- Category
- Short description
- Full description
- Main image
- Additional images if needed
- Features
- Specifications
- Datasheet
- Published/draft status

Do not create unnecessary fields.

Only add fields when the website actually needs them.

# 9. Product Specifications

Specifications should be flexible.

Do NOT create a database column for every possible specification.

For example, avoid designing the database around only:

```text
power
voltage
efficiency
ip_rating
temperature
```

because different products may have completely different specifications.

Instead, a product can have a list of specifications:

```text
Product
    ↓
Specifications
    ↓
Rated Power → 10 kW
Battery Capacity → 20 kWh
Efficiency → 98%
IP Rating → IP65
Operating Temperature → -25°C to 60°C
```

The admin should be able to:

- Add a specification
- Edit a specification
- Remove a specification
- Change its order

Keep this implementation simple.

A basic name/value structure is enough unless the actual requirements later demand something more advanced.

# 10. Datasheets

Datasheets are files associated with products.

The admin should be able to:

- Upload a datasheet
- Replace a datasheet
- Remove a datasheet

The public product page should show:

```text
Download Datasheet
```

Do not store large PDF files directly inside normal database records.

Store the uploaded file in appropriate file/object storage and save its URL/reference with the product.

Keep the implementation simple.

Do not build a complicated document-management system.

# 11. Admin Panel

There will be **ONE admin system and ONE admin account**.

Do NOT build:

- Multiple admin roles
- Super admin
- Content manager
- Editor
- Permission matrices
- Team management

The single admin should be able to manage everything needed by the website.

The admin panel should be accessible through:

```text
/admin
```

If the admin is not logged in:

```text
/admin
    ↓
/admin/login
```

After login:

```text
/admin
```

opens the dashboard.

# 12. Admin Dashboard

Keep the dashboard simple.

It should provide access to:

```text
Dashboard
Products
Add Product
Edit Product
```

Only add more sections when the website actually needs them.

The main purpose of the admin panel is to manage the content that changes regularly.

# 13. Product Management

The admin should be able to:

### Create

Create a new product.

### Read

View existing products.

### Update

Edit:

- Name
- Description
- Category
- Images
- Specifications
- Datasheet
- Status

### Delete

Delete a product when necessary.

### Publish / Draft

Products should support a simple status:

```text
Draft
Published
```

Only published products should appear on the public website.

# 14. Admin Product Editor

The product editor should be simple and understandable.

Conceptually:

```text
Edit Product

Product Name
[....................]

Category
[....................]

Short Description
[....................]

Description
[....................]

Product Image
[ Upload ]

Specifications
-------------------------
Rated Power     10 kW
Efficiency      98%
IP Rating       IP65
[ Add Specification ]

Datasheet
[ Upload PDF ]

Status
[ Published ]

[ Save Product ]
```

Do not build a complicated page builder.

The admin is for managing structured product data, not designing arbitrary web pages.

# 15. Authentication and Security

The admin area must be protected.

Do not rely only on hiding `/admin`.

The backend/API must also verify that the request is authenticated before allowing product changes.

Use a proper authentication/session approach appropriate for the project's stack.

Do NOT invent custom cryptography or password hashing.

Do NOT store passwords in plain text.

Keep authentication simple because there is only one admin account.

# 16. Admin URL

Use:

```text
/admin
```

for the admin system.

Public website:

```text
/
```

Product pages:

```text
/products/[slug]
```

Admin:

```text
/admin
/admin/login
/admin/products
/admin/products/new
/admin/products/[id]
```

Adjust routes if the existing project structure requires something different, but keep the routing easy to understand.

# 17. Two Domains

The same website must work on both:

```text
i&n-energy.com
```

and:

```text
zingenergy.com
```

There should NOT be two separate websites.

There should be:

```text
One Next.js application
        ↓
Two domains
        ↓
Same website
        ↓
Same backend
        ↓
Same database
        ↓
Same products
```

If a domain configuration requires a primary/canonical domain, choose one as the primary domain and configure the second domain appropriately.

Do not duplicate the project just because there are two domains.

# 18. Do Not Build Two Admin Panels

There is only one admin panel.

It should work through the same application/backend regardless of which domain is being used.

The admin should not have separate data for each domain unless a future business requirement explicitly asks for domain-specific content.

For now:

```text
i&n-energy.com
        │
        ├── Public website
        │
        └── /admin

zingenergy.com
        │
        ├── Same public website
        │
        └── Same /admin
```

# 19. Database Philosophy

Use a simple relational database.

The initial system should only have the tables/entities actually needed.

A reasonable starting structure is conceptually:

```text
Admin
Product
ProductSpecification
ProductCategory
```

and references for uploaded files where appropriate.

Do not create dozens of tables before they are needed.

Do not build a complex CMS database.

The database should be easy to understand.

# 20. Backend Philosophy

Keep the API straightforward.

For example:

```text
GET    /products
GET    /products/:slug

POST   /admin/products
PUT    /admin/products/:id
DELETE /admin/products/:id
```

The exact API structure should match the actual backend technology.

Do not create unnecessary service layers for every endpoint.

If a simple route handler and small helper are enough, use them.

# 21. Frontend Architecture

Use meaningful components.

For example:

```text
components/
    Navbar
    Footer
    Button
    ProductCard
    ProductSpecifications
    DatasheetButton
```

And meaningful page sections:

```text
sections/
    Hero
    Solutions
    Products
    Technology
    Projects
    CTA
```

Do not create a component for every `<div>`.

A component should exist because it represents a meaningful UI concept or is reused.

# 22. Keep Pages Readable

The main homepage should be easy to understand.

Prefer:

```jsx
<HomePage>
    <Navbar />
    <Hero />
    <SolutionsSection />
    <ProductsSection />
    <TechnologySection />
    <ProjectsSection />
    <CTASection />
    <Footer />
</HomePage>
```

rather than putting hundreds or thousands of lines into one page file.

# 23. Avoid Unnecessary State Management

Do not introduce Redux, Zustand, or another global state library unless the application genuinely needs it.

For normal product fetching and admin forms:

- Local component state
- Server-side fetching
- Simple API utilities

are preferable where sufficient.

Keep data flow easy to follow.

# 24. Styling

The design should feel:

- Premium
- Minimal
- Modern
- Clean
- Spacious
- Technology-focused
- Trustworthy

Avoid generic AI-generated website styling.

Do not overuse:

- Gradients
- Glassmorphism
- Glow effects
- Huge rounded cards
- Floating blobs
- Excessive shadows
- Excessive animations

The website should feel like a real international energy company.

# 25. Animation

Animations should improve the experience.

Use subtle:

- Fade-ins
- Scroll reveals
- Image transitions
- Hover states
- Section transitions
- Product interactions

Do not animate everything.

Avoid animations that make the website feel like a template or hurt performance.

# 26. Responsive Design

The website must work properly on:

```text
Mobile
Tablet
Laptop
Desktop
Large desktop
```

Do not simply shrink the desktop design.

Mobile layouts should be intentionally designed.

Pay particular attention to:

- Navbar
- Hero
- Product cards
- Product details
- Images
- Buttons
- Typography
- Spacing
- Admin forms

# 27. Images and Assets

Use high-quality imagery appropriate for a solar/energy company.

Prefer:

- Solar installations
- Modern homes
- Solar panels
- Batteries
- Inverters
- Energy storage
- Engineering
- Architecture
- Nature
- Real company projects

Do not use poor-quality placeholder imagery just to fill a section.

Do not invent company projects, statistics, certifications, or claims.

If real content is not available, use clearly identifiable placeholders until the real content is supplied.

# 28. Performance

Keep the website fast.

Pay attention to:

- Image optimization
- Image dimensions
- Lazy loading
- Video size
- JavaScript bundle size
- Animation performance
- Layout shifts

Do not install a large library for a small visual effect.

# 29. Accessibility

Use:

- Semantic HTML
- Correct heading hierarchy
- Alt text
- Keyboard-accessible controls
- Proper buttons and links
- Visible focus states
- Good color contrast

Do not sacrifice accessibility for appearance.

# 30. Before Changing Existing Code

Before modifying an existing file:

1. Read the file.
2. Understand what it currently does.
3. Check related components.
4. Check existing dependencies.
5. Reuse existing patterns where appropriate.
6. Make the smallest clean change that solves the problem.

Do not rewrite working code unnecessarily.

Do not delete existing functionality without a reason.

# 31. Before Installing a Package

Ask:

> Do we actually need another dependency?

First check whether the existing project can solve the problem.

Only add a package when it provides clear value.

Avoid dependency bloat.

# 32. Do Not Over-Abstract

If something is only used once, it usually does not need a generic abstraction.

Do not create:

```text
UniversalDataManager
GenericContentEngine
DynamicSectionRenderer
AbstractProductRepositoryFactory
```

just because they sound architectural.

Use simple code.

The project should be understandable by a developer with normal frontend/backend experience.

# 33. Error Handling

Do not silently swallow errors.

Bad:

```js
try {
    await saveProduct()
} catch {}
```

Prefer:

```js
try {
    await saveProduct()
} catch (error) {
    console.error("Failed to save product:", error)
}
```

User-facing operations should show a useful error state.

# 34. Testing and Verification

Before considering a feature finished:

### Public website

Check:

- Desktop
- Mobile
- Product listing
- Product detail
- Datasheet download
- Navigation
- Images
- Links

### Admin

Check:

- Login
- Product creation
- Product editing
- Product deletion
- Specification editing
- Datasheet upload/replacement
- Publish/draft behavior
- Logout

### Code

Check:

- Console errors
- Broken links
- Failed API requests
- Obvious duplication
- Unused code
- Unnecessary dependencies

# 35. README Updates

Whenever a major architectural feature is added, update:

```text
README.md
```

For example, if you add:

- Product management
- Datasheet uploads
- Admin authentication
- New backend structure

explain it in the README.

Do not let the documentation become outdated.

# 36. Development Workflow

For significant work:

1. Inspect the current project.
2. Understand the existing implementation.
3. Explain the approach briefly.
4. Implement the simplest suitable solution.
5. Test it.
6. Fix obvious issues.
7. Update README when appropriate.

Do not immediately create a large architecture before understanding the requirement.

# 37. When Requirements Are Unclear

Do not invent complicated requirements.

If something is unclear and does not block implementation, make the simplest reasonable assumption and continue.

If the decision could significantly affect the architecture or user experience, ask before building a complicated solution.
