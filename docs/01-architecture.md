# Architecture & Page Map

Static marketing site for **Infinity Digital Solutions Pvt. Ltd.** — digital printing
machinery, inks, and spare parts (New Delhi, since 2006). Five hand-maintained HTML
pages, shared CSS/JS, no build step.

## Purpose & audience

- Sell and quote print production equipment: UV flatbed/hybrid/roll, eco-solvent &
  flex, textile/DTG/sublimation, plus CNC routers, laser cutters and finishing lines.
- Audience: print shops, sign makers, garment/textile printers, industrial buyers
  (Delhi NCR and wider India; prices shown in ₹ on the catalog cards).
- Primary conversion path: "Shortlist a machine. We'll price it today." CTA on
  `products.html` and the quote form on `contact.html` (`#quote-form`).
- Supporting trust content: `about.html` (story, testimonials, team) and
  `brands.html` (the six supplier lines the catalog sells: DOCAN, Mimaki, Konica,
  Xaar, Infiniti, IDS in-house).
- Contact details in page footers: 5/7, Kirti Nagar Industrial Area, New Delhi —
  110015; main +91 98112 14579, 24x7 service +91 11 45028796,
  marketing@infinitydigitalsolutions.com.

## Tech stack

| Layer | What |
|---|---|
| Markup | 5 plain HTML5 pages. Nav/footer markup is duplicated in every page — no templating, no framework, no modules. Edit the file, refresh. |
| CSS | Two handwritten files, no preprocessor: `css/style.css` (1724 lines; design tokens as `:root` custom properties, dark default plus `[data-theme="light"]` overrides) and `css/editorial-hero.css` (1024 lines, linked only from `index.html`). Cache-busting is by query string (`?v=fable5v1`, `?v=1`). |
| JS | Vanilla, no bundler: `js/data.js` (catalog/brand/testimonial data), `js/app.js` (runs on every page; renders catalog when `#grid` exists, brand grid when `#brand-grid` exists, hero carousel, mobile nav, form submit), `js/motion.js` (defer; Lenis inertia scroll, GSAP scroll reveals, native View Transitions between pages), `js/theme-toggle.js` (dark/light toggle). |
| CDNs | jsdelivr: gsap@3.13.0 + ScrollTrigger, lenis@1.3.5. Google Fonts: Inter + Space Mono. |
| Theming | `localStorage` key `infinity-theme` (default `"dark"`). An inline head script on every page sets `data-theme` before first paint to avoid a flash. |
| Motion | Respects `prefers-reduced-motion`; `?motion=1` on the URL forces motion on. |
| Contact form | `js/app.js` submits `#quote-form` via `fetch` to Formspree, but `FORM_ID` is still the placeholder `"YOUR_FORMSPREE_ID"` (js/app.js:295) — until a real id is pasted, submission falls back to opening a `mailto:` link and says so on screen. |

Because there is no build step, editing any HTML/CSS/JS file works immediately in the
browser; there is nothing to install, compile, or test-run. The only moving parts to
know: keep `js/data.js` arrays in sync with the counts hard-coded in markup (see
"Known inconsistencies"), and bump the CSS `?v=` query string when making visual
changes on a page whose CSS may be cached.

## Page/route table

All routes are flat files in the repo root; anchors are handled client-side.

| Page | Role | Key entry links |
|---|---|---|
| `index.html` | Landing. Editorial hero with a 4-slide JS carousel (6 s interval, `js/app.js`), "what we do" section, CTA. Includes the "machine dock" — `#dock-tech-select` whose options point at catalog filters. | Nav: `products.html` (Explore machines), `about.html` (Our story), `contact.html` (How it works). Dock options: `products.html`, `products.html#uv`, `#eco-solvent`, `#textile`, `#cnc`. |
| `products.html` | Catalog. `#grid` is rendered by `js/app.js` from `PRODUCTS` in `js/data.js` (30 entries) with search, sort, and category chips for 4 categories: UV, Eco-Solvent / Flex, T-Shirt / Textile, CNC / Laser / Finishing. An inline script maps the URL hash (`#uv`, `#eco-solvent`, `#textile`, `#cnc`) to the matching chip on load. | CTA to `contact.html`; footer links to all pages. |
| `brands.html` | Supplier-brand directory. `#brand-grid` rendered from `BRANDS` in `js/data.js` (DOCAN, Mimaki, Konica, Xaar, Infiniti, IDS). | Spec-sheet CTA to `contact.html`. |
| `about.html` | Company story ("Since 2006, New Delhi"), testimonials (from `TESTIMONIALS` in `js/data.js`), team. | Footer/CTA to `products.html`, `contact.html`. |
| `contact.html` | Quote & contact. `#quote-form` (name, phone, interest select, message) plus phone, service-line and email links. | CTA to `products.html`; footer links to all pages. |

Every page loads the same four local scripts in order: `js/data.js`, `js/app.js`,
then the CDN motion stack, `js/motion.js` (defer), `js/theme-toggle.js`. `app.js`
renders only where the target element exists, so the same files serve all pages.

## Directory layout

```
infinity/
├── index.html             # landing: hero carousel, what-we-do, machine dock
├── products.html         # catalog shell; #grid/#cats/#catalog-status filled by JS
├── brands.html           # brand directory shell; #brand-grid filled by JS
├── about.html            # static story / testimonials / team
├── contact.html          # quote form (#quote-form) + contact details
├── README.md             # placeholder: "# infinity" only
├── css/
│   ├── style.css         # all pages: tokens (:root), themes, components (~1724 lines)
│   └── editorial-hero.css # index only: framed hero, dock, ambient layers (~1024 lines)
├── js/
│   ├── data.js           # BRANDS (6), PRODUCTS (30), TESTIMONIALS; image-path constants O/P/C
│   ├── app.js            # runs everywhere: hero carousel, catalog render+search+sort,
│   │                    #   quick-spec cards, brand grid, reveal-on-scroll, form submit
│   ├── motion.js         # Lenis scroll + GSAP reveals + View Transitions (defer)
│   └── theme-toggle.js   # dark/light toggle, localStorage "infinity-theme"
├── assets/img/           # 98 images
│   ├── original/         # raw machine photos (DOCAN/YSR/Mimaki units, .png/.webp)
│   ├── products/         # catalog thumbnails: uv/, flex/, cnc/, text/ + a few top-level
│   ├── curated/          # facility/production/ink photography
│   ├── banner/          # hero carousel slides (hero1-hero4.jpg)
│   ├── about.jpg, logo.png, logo-square.jpg, hero_machine_dark.png
├── docs/
│   └── 01-architecture.md
└── .impeccable/         # local design-tool cache (hook.cache.json) — not part of the site
```

## Repository

| | |
|---|---|
| Remote | `https://github.com/ashh0413/infinity.git` (origin, fetch + push) |
| Branch | `main` (local and remote track each other) |
| Local HEAD | `63c0b56` — "fix(layout): resolve top-strip and header collision across viewports"; 25 commits |
| Deploys | **Unverified.** No `.github/` workflows, no host config, no `CNAME`, no `package.json` — nothing in the repo documents where or how the site ships. |
| Dev server | Plain static server over the root; project notes record port **8472** for local work (not recorded in the repo itself). |

### Known inconsistencies (verified against the code)

- `products.html` hard-codes "Showing all 30 machines" in `#catalog-status`; the live
  `PRODUCTS` array has **30** entries and `app.js` rewrites the text to
  "Showing N of 30 platforms" on load — the static fallback is stale.
- The index dock option label says "All Industrial Machines (24)" — also stale.
- Several `PRODUCTS` entries use `assets/img/original/` files whose filenames don't
  match the model (e.g., "DOCAN H1000" points at `mimaki-jfx200-1213ex.png`); the
  commit history ("apply original product images across catalog listings") suggests
  these are stand-in photography rather than per-model photos.

---

Last updated: 2026-11-15

**Sources:** `index.html`, `products.html`, `brands.html`, `about.html`,
`contact.html`, `css/style.css` (head/tokens), `css/editorial-hero.css`,
`js/data.js`, `js/app.js`, `js/motion.js`, `js/theme-toggle.js`, `README.md`,
`.git` config/logs (`git remote`, `git log`), repo file listing.
