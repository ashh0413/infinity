# Infinity Digital Solutions — Documentation Index

## Overview

Static marketing site for Infinity Digital Solutions Pvt. Ltd., a New Delhi digital printing machinery trader, supplier, and manufacturer (est. 2006) covering UV, eco-solvent, textile, CNC, laser, and finishing lines plus inks and parts.
Five vanilla HTML pages (`index`, `products`, `brands`, `about`, `contact`) with a shared `css/style.css`, a shared catalog in `js/data.js`, and motion via GSAP + Lenis from jsDelivr — no framework, no build step, no backend.
Production target: `https://infinitydigitalsolutions.com` (per `og:url`); repo is `github.com/ashh0413/infinity` on `main`.

## Quick start

- **View locally:** open `index.html` in a browser, or run `python -m http.server 8472` from the site root (project notes record 8472 for this site — 8471 belongs to the Vee Kay sibling; any free port works, no port is defined in the repo). Internet is needed for Google Fonts and the motion libraries; without it the pages still render.
- **Theme:** dark by default; the toggle persists in `localStorage` key `infinity-theme`.
- **Where to make common edits:**

| Edit | Where |
|---|---|
| Add / rename / remove a product | `PRODUCTS` array in `js/data.js` (+ image in `assets/img/` — see `03-data-catalog.md`) |
| Add / rename a brand | `BRANDS` array in `js/data.js` |
| Shared layout / colors / tokens | `css/style.css` — then bump `?v=fable5v1` cache-buster in the `<head>` of all 5 pages |
| Homepage hero styling | `css/editorial-hero.css` (index only; bump `?v=1` there) |
| Contact form backend | `FORM_ID` in `js/app.js` (currently a Formspree placeholder) |
| Phone / address / email | Duplicated in the footers of all 5 pages + `contact.html` + the index drawer footer — edit every copy |

Full blast-radius table: `05-operations.md`.

## Documentation

| File | Title | Summary |
|---|---|---|
| [01-architecture.md](01-architecture.md) | Architecture & Page Map | Purpose, tech stack, page/route table, directory layout, and repo facts — with caveats on the unverified deploy target and the Formspree placeholder. |
| [02-design-system.md](02-design-system.md) | Design System & Styling | CSS file inventory and load order, design tokens, dark/light theming, breakpoints, and shared components — all claims verified against the files. |
| [03-data-catalog.md](03-data-catalog.md) | Product Data & Catalog | `js/data.js` schema and full product table (30 products, 6 brands, 26 images), deep-link rules, and a step-by-step add/edit/remove guide. |
| [04-behavior-scripts.md](04-behavior-scripts.md) | Client Behavior & Scripts | What each JS file does and which pages load it, nav/drawer behavior, catalog engine, form fallback behavior, motion init, and accessibility safeguards. |
| [05-operations.md](05-operations.md) | Local Dev, Deployment & Open Items | Running locally, the git publish workflow, the 11-item open-items list with exact file/line locations, common-edit blast radius, and real-vs-sample data ownership. |

## Known open items (top three)

See the full 11-item list in `05-operations.md`. Most actionable right now:

1. **Contact form doesn't submit anywhere.** `FORM_ID` in `js/app.js` line 295 is still `"YOUR_FORMSPREE_ID"` — submissions currently open a `mailto:` to `marketing@infinitydigitalsolutions.com`. Add a real Formspree ID to fix.
2. **Stale count on the homepage.** The hero dock says "All Industrial Machines (24)" (`index.html` line 119) but the catalog has 30 products — update the label.
3. **Invalid double `class` attribute** in `contact.html` line 59 (`<div class="form" class="contact-form-card">`) — the browser drops the second attribute; merge into one.

Last updated: 2026-11-15.
