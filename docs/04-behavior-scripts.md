# Client Behavior & Scripts

Infinity Digital Solutions static site. All scripts are vanilla ES5/ES6 IIFE modules with no build step. Third-party libraries come from `cdn.jsdelivr.net`. No backend, no framework, no WebGL.

## 1. JS file inventory

| File | Purpose | Loaded on |
|------|---------|-----------|
| `js/data.js` | Data arrays: `BRANDS` (6), `PRODUCTS` (30), `TESTIMONIALS` (3), `STATS` (4), `WHY_US` (5). No DOM code. | all 5 pages |
| `js/app.js` | Main app logic: hero carousel, mobile nav, catalog render/filter/sort, quick-spec modal, brand grid, scroll reveal, enquiry form, footer year, tactile press animation. | all 5 pages |
| `js/motion.js` | Lenis inertia scroll + GSAP reveals + hero parallax + native View Transitions page fade. Defers boot until `gsap` and `Lenis` are defined. | all 5 pages (`defer`) |
| `js/theme-toggle.js` | Dark/light theme controller; persists `data-theme` on `<html>` and writes `infinity-theme` to `localStorage`. | all 5 pages |
| inline `<head>` snippet | Reads `localStorage["infinity-theme"]` (default `dark`) and sets `data-theme` before paint. | all 5 pages |

Per-page extras:

| Page | Additional inline scripts |
|------|---------------------------|
| `index.html` | Editorial menu drawer toggle (`#editorial-menu-toggle` to `#editorial-drawer`), machine dock navigation (`#dock-tech-select` changes `#dock-submit-btn` href) |
| `products.html` | Deep-link hash to category chip click (`#uv`, `#eco-solvent`, `#textile`, `#cnc`) |

All pages load in this order: `js/data.js` to `js/app.js` to (optional inline) to `gsap@3.13.0` to `ScrollTrigger@3.13.0` to `lenis@1.3.5` to `js/motion.js` (deferred) to `js/theme-toggle.js`.

## 2. Navigation controller

| Behavior | Implementation |
|----------|----------------|
| Hover flyout | **None.** No dropdown flyout logic exists. Sub-page links are direct anchors in `<nav>`. |
| Mobile drawer | `app.js`: `.burger` click toggles the `open` class on `nav`. `style.css @media (max-width:960px)` makes `nav` fixed and shifted off-screen; `.nav.open` brings it back with a 0.3s transition. |
| Editorial drawer (index) | Inline script toggles `.open` on `#editorial-drawer`; overlay click and `#editorial-drawer-close` remove it. |
| Debounce / timers | No debounce timers anywhere. Only timer: hero carousel `setInterval(tick, 6000)` in `app.js` — cleared on `mouseenter`, restarted on `mouseleave` (skipped entirely when `prefers-reduced-motion`). |
| Page transitions | `motion.js`: native View Transitions — on same-origin link click, intercepts and calls `document.startViewTransition()` which assigns the URL. Skips hashes, `tel:`/`mailto:`, cross-origin links, and same-URL. |
| Anchor scrolling | `motion.js`: `a[href^="#"]` uses `lenis.scrollTo("#id", {offset:-76, duration:1.2})`. |
| Machine dock (index) | `#dock-tech-select` change sets `#dock-submit-btn` href to the selected value or `'products.html'`. |

## 3. Catalog engine

`app.js` runs the catalog only when `#grid` and `PRODUCTS` are present (`products.html`).

**State variables:**

| Variable | Default | Notes |
|----------|---------|-------|
| `activeCat` | `"all"` | Set by `.cat-chip` click (event delegation) |
| `activeQuery` | `""` | Set on `#catalog-search` `input` (no debounce) |
| `activeSort` | `"featured"` | Set on `#catalog-sort` `change`; values: `price-asc`, `price-desc`, `name-asc` |

**Filter + sort logic:**

- `parsePrice(p)` strips non-digits from `p.price` (Indian-format rupee strings); missing price returns the `999999999` sentinel so unpriced items sort last on asc.
- `renderCatalog()` maps `PRODUCTS` with their original index, filters on `activeCat` AND a case-insensitive substring of `activeQuery` against `name`, `brand`, `cat` and `blurb`, then sorts by `activeSort` (name uses `localeCompare`).
- Category chips are auto-derived from unique `cat` values: an `"all"` chip (30) plus the 4 category chips with counts.
- Empty result renders a "No matching machines" message with a "Reset Filters" button that clears all three state vars and re-renders.
- Status line: `Showing N of 30 platforms` written to `#catalog-status`.

**Quick Spec modal:**

- Card click or `Enter`/`Space` (cards have `tabindex=0`, `role=button`, `aria-label`) calls `openModal(p)` with the product looked up by `data-idx`.
- Modal is a `div.spec-modal` with `role="dialog"` and `aria-modal="true"`.
- Opening sets `body.style.overflow = "hidden"` and dispatches the `site:lock-scroll` event (Lenis pause in `motion.js`); closing does the inverse with `site:unlock-scroll`.
- Close paths: backdrop click, the close button, or `Escape` key.
- "Request Quotation" link in the modal points to `contact.html?interest=<URL-encoded product name>`.

**Comparison:** No comparison, multi-select, or side-by-side logic exists in the code (confirmed absent from `app.js` and `data.js`).

**Deep-link categories:** an inline script on `products.html` maps the hashes `#uv`, `#eco-solvent`, `#textile`, `#cnc` to the matching `.cat-chip` and clicks it.

## 4. Enquiry / form handling

`#quote-form` on `contact.html` (fields: `name`, `phone`, `interest`, `msg`). Submit always calls `e.preventDefault()`.

| Path | Trigger | Behavior |
|------|---------|----------|
| Formspree | `FORM_ID` differs from the placeholder `"YOUR_FORMSPREE_ID"` | `POST` via `fetch` to `https://formspree.io/f/<FORM_ID>` with the `FormData` and `Accept: application/json`. Status note: `SENT — REPLY WITHIN ONE WORKING DAY` on success, `SEND FAILED — CALL THE HOTLINE` otherwise, `NETWORK ERROR — CALL THE HOTLINE` on catch. |
| Mailto fallback (current state) | `FORM_ID` still equals the placeholder | Builds `mailto:marketing@infinitydigitalsolutions.com` with a subject and body assembled from the four fields, then navigates to it — the email client opens. Note text: `OPENS YOUR EMAIL CLIENT — SET FORM_ID IN js/app.js FOR SERVER-SIDE SUBMIT`. |

No AJAX in the fallback path. The `?interest=` query param produced by the modal is not read anywhere in `contact.html` or `app.js` (no `URLSearchParams`/`location.search` consumption found) — unverified whether that was intended.

## 5. WebGL / 3D / animation engine

No WebGL, Three.js, or any 3D library.

| Engine | Source | How it initializes |
|--------|--------|--------------------|
| GSAP 3.13.0 + ScrollTrigger | `cdn.jsdelivr.net` | Loaded synchronously before `motion.js`, which registers the `ScrollTrigger` plugin. |
| Lenis 1.3.5 | `cdn.jsdelivr.net` | `motion.js` polls up to 60 times every 60ms (about 3.6s) for `window.gsap && window.Lenis`; if still missing, it bails and native scroll remains (marked in a `ponytail:` comment). |
| SplitText | Not loaded. `motion.js`'s header comment mentions a SplitText hero, but no SplitText script tag exists; the `.sl-line`/`.sl-char` CSS in `style.css` is inert. Unverified whether it was planned. |

**`motion.js` behavior:**

- `prefers-reduced-motion: reduce` causes an early return (no Lenis, no reveals, no parallax, no View Transitions) unless the `?motion=1` query param forces motion on.
- Hero h1: `gsap.from` with `y:32, opacity:0, duration:0.9, ease:"power3.out", clearProps:"all"`.
- `[data-reveal]` elements: `gsap.from` with a `ScrollTrigger` of `start:"top 87%", once:true`.
- Card grids (`.cap-card`, `.card`, `.facility-card`, `.pedestal-block`, `.why-card`, `.brand-card`, `.p-group`): staggered reveal with `delay:(i % 4) * 0.07`.
- Hero machine parallax: `gsap.to` on `.hero-axis-visual img` with `y:90` and `scrub:true`.
- Modal scroll lock: listens for the `site:lock-scroll` / `site:unlock-scroll` custom events and calls `lenis.stop()` / `lenis.start()`.

**`app.js` scroll reveal (separate from `motion.js`):**

- `IntersectionObserver` with `threshold: 0.08` on `.reveal` elements: adds `.arm` to all, adds `.in` on intersect and unobserves.
- Safety: a 2600ms `setTimeout` force-adds `.in` to everything so content is never left hidden.

**Tactile press (`app.js`):**

- A global `pointerdown` handler (passive) scales `0.96 / translateY(1px)` on buttons, chips, cards and nav links, and clears it on `pointerup`/`pointercancel` after 180ms.

## 6. Touch / accessibility safeguards

| Safeguard | Where |
|-----------|-------|
| `prefers-reduced-motion: reduce` CSS kill switch | `style.css` top: all transitions, animations and smooth scrolling disabled. |
| JS reduced-motion guards | `app.js` carousel skips auto-advance; `motion.js` skips the whole engine unless `?motion=1`. |
| `:focus-visible` outline | `style.css`: `2px solid var(--red)` with a 3px offset on all focusable elements. |
| Minimum touch targets | `style.css` defines `--touch-target-min: 44px`; `nav a`, `.cat-chip`, `.btn`, `.arrow-link`, `.dock-action-btn`, `.nav-circle-btn`, `.burger` get `min-height: 44px`; `.drawer-phone`, `.drawer-email`, `.dock-select` and the footer logo link match; footer list links are 38px. |
| Modal dialog semantics | `role="dialog"`, `aria-modal="true"`, `Escape` closes, backdrop click closes, labeled close button. |
| Card keyboard access | `tabindex=0`, `role="button"`, `aria-label` per product; `Enter`/`Space` opens the modal. |
| Form labels | Every `#quote-form` field has a `<label for>`; `name`/`phone` are `required`. |
| Theme toggle | `.infinity-theme-toggle` buttons get `aria-label` and `title` updated on every theme change by `theme-toggle.js`. |

---

Last updated: 2026-11-15

**Sources:**
`js/app.js`, `js/data.js`, `js/motion.js`, `js/theme-toggle.js`, `css/style.css`, `css/editorial-hero.css`, `index.html`, `products.html`, `contact.html`, `about.html`, `brands.html`
