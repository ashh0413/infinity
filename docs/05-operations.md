# Local Dev, Deployment & Open Items

Infinity Digital Solutions — static site. No build step, no framework, no `package.json`, no CI. Everything below was verified against the files in this repo.

## Running locally

| Task | Command / note |
|---|---|
| View the site | Open `index.html` directly, or serve the folder |
| Local server | `python -m http.server 8472` from the site root — project notes record port **8472** for this site (8471 is the Vee Kay sibling); any free port works, no port is defined in the repo |
| Motion libraries | No install — GSAP 3.13.0 + Lenis 1.3.5 load from jsdelivr on all 5 pages |

- The 5 pages: `index.html`, `products.html`, `brands.html`, `about.html`, `contact.html`.
- Internet is needed for Google Fonts (Inter, Space Mono) and the CDN motion libraries. Without them the pages still work: `js/motion.js` polls for ~3.6s (retry loop in `tryBoot`, with a `ponytail:` comment noting the ceiling) then falls back to native scroll.
- `?motion=1` forces motion on even for users with `prefers-reduced-motion` (`js/motion.js` line 6).
- Theme defaults to dark; the choice persists in `localStorage` key `infinity-theme` (`js/theme-toggle.js`). Each page's `<head>` has an inline bootstrap script that applies the theme before first paint.
- `README.md` contains only the word "infinity" (UTF-16 encoded).

## Publishing: git workflow and what triggers the production deploy

| Fact | Verified value |
|---|---|
| Remote | `origin` = `https://github.com/ashh0413/infinity.git` (`.git/config`) |
| Branch | `main`, tracking `origin/main`; main and origin/main are at the same commit as of this doc |
| CI / host config | **None in the repo** — no `.github/workflows`, no Netlify/Vercel config, no `CNAME` file (checked `git ls-files`) |
| Expected production URL | `https://infinitydigitalsolutions.com` (`og:url`, `index.html` line 11) — whether that domain is actually deployed from this repo is **unverified** |

Workflow: edit → `git add` → `git commit` → `git push origin main`. What exactly triggers the production deploy is unverified from the repo: if a static host (GitHub Pages or similar) watches the branch, a push to `main` deploys, but no config in the repo confirms the host.

## Known open items and their exact locations

| # | Item | Exact location |
|---|---|---|
| 1 | Formspree ID placeholder — the contact form currently just opens a `mailto:` link | `js/app.js` line 295: `var FORM_ID = "YOUR_FORMSPREE_ID";` (mailto fallback from line 300) |
| 2 | Hero dock option says "All Industrial Machines (24)" but the catalog has 30 products | `index.html` line 119 vs 30 entries in `PRODUCTS` (`js/data.js`) |
| 3 | Stale hardcoded count "Showing all 30 machines" — correct today, but JS overwrites it on load | `products.html` line 68 (`#catalog-status`, driven by `renderCatalog` in `js/app.js`) |
| 4 | "PHOTO PENDING" placeholder card for products missing `img`; modal image falls back to a fixed file | `js/app.js` line 88; modal fallback `assets/img/curated/uv_flatbed.jpg` |
| 5 | Dead hero-carousel code — no `#hero-carousel` element exists in any page | `js/app.js` lines 8–52 (incl. the hardcoded `SLIDES` array) |
| 6 | Dead data arrays `TESTIMONIALS`, `STATS`, `WHY_US` (referenced by no other file) | `js/data.js` lines 57, 63, 70 |
| 7 | 66 unreferenced image files: 38 of 48 in `assets/img/original/`, 8 of 19 in `assets/img/products/`, all 4 in `assets/img/banner/`, 13 of 23 in `assets/img/curated/`, plus `assets/img/logo.png`, `logo-square.jpg`, `assets/img/about.jpg` | `assets/img/` — verified by grepping every full path against all HTML/JS/CSS, including the O/P/C concatenations in `js/data.js` |
| 8 | Invalid double `class` attribute — the browser ignores the second one | `contact.html` line 59: `<div class="form" class="contact-form-card">` |
| 9 | About-page copy says "A decade" while the company is est. 2006 ("since 2006" everywhere else) | `about.html` lines 40–41 vs `index.html` lines 7, 227 |
| 10 | No light-theme rules for the index hero: `css/editorial-hero.css` has 0 `[data-theme="light"]` rules; all 29 live at the end of `css/style.css` (from line 1573) | `css/editorial-hero.css` — the index hero is unstyled in light mode |
| 11 | `js/motion.js` references selectors that exist in no page: `data-reveal`, `hero-axis`, `cap-card`, `pedestal-block`, `brand-card`, `p-group`. Only `facility-card` (about.html), `why-card`/`.card`/`.brand`/`h1` match | `js/motion.js` `boot()` selector lists — dead until markup changes |

## Common edits and their blast radius

| Change | Where | Affects |
|---|---|---|
| Add / rename a product | `PRODUCTS` in `js/data.js` | `products.html` cards + category-chip counts, "LINES STOCKED" counts on `brands.html` (computed per brand in `js/app.js`), quick-spec modal, and the `contact.html?interest=` link built in `js/app.js` line 228 |
| Rename a category string (e.g. `"UV"`) | `js/data.js` | Breaks the hardcoded deep-link map in `products.html`'s inline script (`#uv` / `#eco-solvent` / `#textile` / `#cnc` → chip labels) and the hero-dock options in `index.html` that link to those hashes |
| Edit shared CSS | `css/style.css` | All 5 pages; the cache-buster is `?v=fable5v1` in each page's `<head>` — bump it on all 5 after CSS changes |
| Edit hero styles | `css/editorial-hero.css` | `index.html` only (`?v=1` cache-buster there) |
| Change phone / address / email | Duplicated footers on all 5 pages + the `<dl>` in `contact.html` + drawer footer in `index.html` | Repeat the edit in every copy — 3 phones, 1 email, 1 address are hardcoded in ~10 places |
| Add a page | New `.html` file | Must include: the theme bootstrap script, `js/data.js` + `js/app.js`, the 4 CDN script tags + `js/motion.js` + `js/theme-toggle.js`, and the duplicated header/footer markup; then add its nav link on every existing page |
| Add a brand | `BRANDS` in `js/data.js` | `brands.html` grid (`#brand-grid`); its stocked-lines count is computed from `PRODUCTS` |

## Content ownership: what is real company data vs sample data

| Kind | Content | Where it lives |
|---|---|---|
| Real company data (client-provided) | Phones `+91 98112 14579` (main) / `+91 11 45028796` (24×7 service) / WhatsApp `wa.me/917949369156`; `marketing@infinitydigitalsolutions.com`; `5/7, Kirti Nagar Industrial Area, New Delhi — 110015`; GST `07AABCI8584R1ZN`, IEC `0508023068` | Footers of all 5 pages, `contact.html` `<dl>`, `index.html` line 228 |
| Real but unverified from the repo | Est. 2006, "51–100 staff", IndiaMART 4.2/5 · 13 reviews · TrustSEAL, named testimonials (Preeti Malhotra, Rakesh Mehta, Satish Upadhyaya) | `about.html` stat row, quote grid + "SELECTED REVIEWS FROM THE INDIAMART PROFILE" footnote |
| Sample / marketing copy | All 30 product blurbs and prices, modal pills ("Industrial Precision / Production Ready / Full Warranty"), hero copy | `js/data.js` (catalog), dead `SLIDES` in `js/app.js` (item 5), `index.html` hero copy |
| Dead sample data | `TESTIMONIALS`, `STATS` (incl. "₹ 3.5L – 55L" range), `WHY_US` | `js/data.js` lines 57–74 |

The site explicitly frames prices as reference: the `products.html` footnote reads "PRICES ARE LISTING REFERENCE POINTS · FINAL PRICE ON QUOTATION", and its meta description claims IndiaMART-sourced price points.

---

Last updated: 2026-11-15

**Sources:** `index.html`, `products.html`, `brands.html`, `about.html`, `contact.html`, `js/app.js`, `js/data.js`, `js/motion.js`, `js/theme-toggle.js`, `css/style.css` (partial), `css/editorial-hero.css` (grep-only), `README.md`, `.git/config`, `git log`
