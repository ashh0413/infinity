# Design System & Styling

Infinity Digital Solutions — static site (vanilla HTML/CSS/JS). No CSS framework, no build step.
All styling lives in two CSS files; motion is CDN GSAP/Lenis + custom JS.

## CSS file inventory and the order they load on each page

| File | Size | Scope |
|---|---|---|
| `css/style.css` | 1,724 lines | Global: tokens, strip, header/nav, buttons, hero, cards, grids, forms, footer, light theme, iOS touch overrides |
| `css/editorial-hero.css` | 1,024 lines | Only the homepage hero ("editorial" frame, machine photo, dock, drawer) |

Load order (identical pattern on all 5 pages):

1. Google Fonts (Inter 300–600, Space Mono) — `<link>` in `<head>`
2. `css/style.css` (cached-buster `?v=fable5v1`)
3. `css/editorial-hero.css` — **index.html only**
4. Inline theme-hydration `<script>` (one line, see theming section)
5. `js/data.js` → `js/app.js` (catalog/brand data + page logic)
6. CDN: gsap 3.13.0, ScrollTrigger, lenis 1.3.5
7. `js/motion.js` (`defer`) → `js/theme-toggle.js`

Fonts: `--display`/`--body` both resolve to Inter; `--mono` is Space Mono.

## Design tokens: key CSS custom properties

Defined in `:root` at the top of `css/style.css` (dark is the default):

| Token | Value | Used for |
|---|---|---|
| `--bg` | `#08090c` | Page background |
| `--surface` | `#101218` | Cards, stats, footer |
| `--surface-2` | `#141720` | Secondary surfaces |
| `--line` | `rgba(255,255,255,0.08)` | Hairline borders |
| `--line-strong` | `rgba(255,255,255,0.16)` | Stronger borders |
| `--ink` | `#ffffff` | Primary text |
| `--ink-soft` | `#9ba1ad` | Secondary text |
| `--dim` | `#888f9e` | Tertiary/meta text |
| `--red` | `#e23319` | Signal accent (CTAs, eyebrows, active dots) |
| `--red-deep` | `#ff5533` | Link/accent hover shade |
| `--ruby-rich` | `#c01e0d` | CTA gradient end stop |
| `--gold` | `#c8a762` | "Why us" numbering |
| `--gold-glow` | `rgba(200,167,98,.22)` | Gold accents |
| `--on-photo` | `#ffffff` | Text over imagery |
| `--obsidian` | `#0f1115` | Deep black |
| `--display` / `--body` | `"Inter","Helvetica Neue",Arial,sans-serif` | All text |
| `--mono` | `"Space Mono",ui-monospace,Menlo,monospace` | Eyebrows, specs, labels, footer |
| `--t-hero` | `clamp(40px,5.6vw,84px)` | H1 scale |
| `--t-h2` | `clamp(30px,3.8vw,52px)` | Section heads |
| `--t-h3` | `clamp(19px,2.2vw,26px)` | Card titles (referenced in token) |
| `--t-lead` | `clamp(16px,1.4vw,19px)` | Lead paragraphs |
| `--t-body` | `15px` | Base body size |

Light theme re-declares the palette tokens under `[data-theme="light"]` (bottom of `css/style.css`): `--bg: #f8f9fa`, `--surface: #ffffff`, `--surface-2: #f1f3f6`, `--ink: #11141a`, `--ink-soft: #4b5262`, `--dim: #6c757d`, `--obsidian: #ffffff` (accents `--red`/`--gold` are NOT re-declared and stay the same).

## Dark/light theming

Three parts:

1. **Hydration** — a one-line inline script in `<head>` of every page, before the CSS renders, sets the attribute from storage:
   ```js
   var t=localStorage.getItem("infinity-theme")||"dark";
   document.documentElement.setAttribute("data-theme",t);
   ```
2. **Toggle logic** — `js/theme-toggle.js` (loaded last, on all pages):
   - `localStorage` key: `infinity-theme` (values `dark`/`light`; default `dark`, no system-preference check)
   - Applies `data-theme` on `<html>`, re-applies on `DOMContentLoaded`, and swaps the SVG icon + aria-label on every `.infinity-theme-toggle` button
   - The toggle button lives in the homepage editorial nav-bar (one per page, in the strip/header area of inner pages — 1 occurrence per page verified)
3. **CSS** — light overrides are scoped as `[data-theme="light"] …` blocks at the end of `css/style.css` (~150 lines): token redeclaration plus component-specific fixes for header, `.strip`, `.hero-flat`, `.editorial-nav-bar`, `.bento-card`, `.why-card`, `.brand`, `.quote`, `.field` inputs, footer, drawer, and the toggle button itself.

Note: some dark-only rules use `!important` (e.g. `.strip`), so light mode is patch-over-dark rather than a full token swap.

## Breakpoints and responsive behavior

All media queries found (grep of both CSS files):

| File | Query | Effect |
|---|---|---|
| `css/style.css:6` | `prefers-reduced-motion:reduce` | Kills all transitions/animations site-wide |
| `css/style.css:88` | `max-width: 768px` | `.strip` stacks vertically |
| `css/style.css:437` | `max-width: 768px` | `.spec-card` modal → single column; `.cats` filter bar full-width |
| `css/style.css:514` | `max-width: 900px` | Facility grid 1-col; featured card height 280px |
| `css/style.css:539` | `max-width: 900px` | `.grid`/`.brand-grid`/`.quote-grid`/`.why-grid` → 2-col; `.stat-row` 2-col; `.bm-grid`/`.contact-grid` → 1-col; footer 2-col |
| `css/style.css:547` | `max-width: 960px` | Nav becomes fixed dropdown; `.burger` button appears |
| `css/style.css:597` | `max-width: 640px` | Hero taller; `.catalog .card` stacks; all grids → 1-col; light-styled mobile nav override |
| `css/style.css:1539` | `max-width: 768px` | iOS touch: form controls 16px (no zoom), 44px min tap targets |
| `css/editorial-hero.css:626` | `max-width: 1080px` | Homepage: bottom grid 1-col; machine image shrinks/fades |
| `css/editorial-hero.css:642` | `max-width: 768px` | Homepage: card 88vh; dock becomes pill; nested `max-width: 520px` (line 663) — dock stacks |
| `css/editorial-hero.css:922, 969, 998, 1007, 1020` | `1080px` / `768px` | Later machine-image and nav-center overrides (center nav hidden ≤768px; machine image becomes static and centered ≤768px) |

Effective column counts: ≥901px → 3-col grids; ≤900px → 2-col; ≤640px → 1-col.

## Shared visual components

| Component | Defined in | Used on |
|---|---|---|
| Top strip `.strip` | `css/style.css` | about, products, brands, contact (homepage uses `.editorial-nav-bar` instead) |
| Sticky glass header + `nav` + `.burger` | `css/style.css` | all inner pages; burger/nav wiring in `js/app.js` (`.burger` toggles `nav.open`) |
| Buttons `.btn`, `.btn.ghost`, `.btn.on-photo`, `.arrow-link` | `css/style.css` | all pages; "Tactile Press Engine" active-state block near end of file |
| Homepage hero (editorial frame, machine photo, dock, drawer) | `css/editorial-hero.css` | index.html only; drawer logic in inline script in index.html (`#editorial-drawer`) |
| Inner hero `.hero-flat` + stat row | `css/style.css` | about, products, brands, contact |
| Carousel hero `.hc-slide` / dots | `css/style.css` | index.html (classic hero markup) — slides auto-rotate in `js/app.js` (6s, hover-pause, reduced-motion guard) |
| Catalog cards `.catalog .card`, filters `.cats`/`.cat-chip`, quick-spec modal `.spec-modal` | `css/style.css` | products.html (rendered from `PRODUCTS` in `js/data.js`) |
| 3-tile bento `.bento-card` | `css/style.css` | index.html |
| Brand grid `.brand-grid` | `css/style.css` | brands.html (rendered from `BRANDS` in `js/data.js`) |
| Why cards `.why-grid`/`.why-card` (gold `.why-num` pills) | `css/style.css` | index.html |
| Testimonials `.quote-grid` | `css/style.css` | about.html |
| CTA band `.cta` | `css/style.css` | all pages |
| Forms `.field`, definition list `.dl`, contact layout `.contact-grid` | `css/style.css` | contact.html |
| Facility photos `.facility-grid`/`.photo-band` | `css/style.css` | about.html |
| Footer `footer .top/.bottom` | `css/style.css` | all pages |
| Reveal-on-scroll `.reveal` (+ `.sl-line`/`.sl-char` split-text) | `css/style.css` | all; animated by `js/motion.js` (GSAP + Lenis, CDN) |

## Typography and color palette summary

**Type system** (three families, both CSS files):

| Role | Family | Sizes |
|---|---|---|
| Display/headings | Inter, weight 800, `letter-spacing:-.02em` — note: Google Fonts loads only Inter 300–600, so 800 renders as synthesized bold (unflagged by the CSS) | `--t-hero` (clamp 40–84px), `--t-h2` (clamp 30–52px), card h3 18–22px |
| Body | Inter, weight 400/500, line-height 1.6 | base 15px (`--t-body`), lead clamp 16–19px, cards 13.5–14.5px |
| Meta/labels | Space Mono, uppercase, `letter-spacing:.08–.16em` | 9.5–12px — eyebrows, `.dl dt`, spec pills, footer, status counters |

**Palette**: near-black canvas (`#08090c`/`#0f1115`) with white type; a single vivid signal red (`#e23319`, deep `#ff5533`, ruby `#c01e0d`) for CTAs/accents; muted gold (`#c8a762`) as a secondary accent; hairline white-alpha borders (`rgba(255,255,255,.08/.16)`) and heavy frosted-glass surfaces (`backdrop-filter: blur()` on header, chips, modals, why-cards). Light mode flips to `#f8f9fa` canvas / `#11141a` ink while keeping the red accent. Direction: "premium industrial — Roland/Mimaki benchmark" per the comment at the top of `css/style.css`.

**Motion**: `js/motion.js` — Lenis smooth scroll, GSAP ScrollTrigger reveals, native View Transitions for page fades; all respect `prefers-reduced-motion` (kill-switch in `css/style.css` + JS guards, `?motion=1` override flag).

---

Last updated: 2026-11-15

**Sources:** `css/style.css`, `css/editorial-hero.css`, `js/app.js`, `js/data.js`, `js/motion.js`, `js/theme-toggle.js`, `index.html`, `about.html`, `products.html`, `brands.html`, `contact.html` (read via Read/Grep/Bash; all selectors, tokens, breakpoints and line numbers verified against current file contents).
