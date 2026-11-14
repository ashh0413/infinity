# Product Data & Catalog

Single source of truth: `js/data.js`, loaded by all five pages (`index.html`, `products.html`, `brands.html`, `about.html`, `contact.html`) and consumed by `js/app.js`. No build step, no API — the catalog is plain JS that the browser evaluates as-is.

## 1. Data file location and top-level variables

File: `js/data.js` (no imports; all variables are global `var`s).

| Variable | Size | Contents | Consumed by |
|---|---|---|---|
| `BRANDS` | 6 entries | DOCAN, Mimaki, Konica, Xaar, Infiniti, IDS — each `{ name, line, note }` | `brands.html` → `#brand-grid` via `app.js` (also shows a "N LINES STOCKED" count computed from `PRODUCTS`) |
| `PRODUCTS` | 30 entries | The machine catalog (schema below) | `products.html` → `#grid` via `app.js` |
| `TESTIMONIALS` | 3 entries | `{ name, topic }` rows (Preeti Malhotra, Rakesh Mehta, Satish Upadhyaya) | No references found — defined but unused as of this writing |
| `STATS` | 4 entries | `{ k, v, [sub] }` (EST. 2006, STAFF 51–100, IndiaMART 4.2/5, price range ₹ 3.5L–55L) | No references found — defined but unused |
| `WHY_US` | 5 strings | Selling-point lines | No references found — defined but unused |
| `O`, `P`, `C` | path constants | `O` = `assets/img/original/`, `P` = `assets/img/products/`, `C` = `assets/img/curated/` | Used to build `PRODUCTS[].img` paths |

Note: `data.js` has no cache-busting query string (only `css/style.css?v=fable5v1` is versioned in the HTML), so edits are live on next page load.

## 2. Product record schema

Each `PRODUCTS` entry is a flat object:

| Field | Type | Meaning |
|---|---|---|
| `name` | string | Machine/model name shown on the card and in the spec modal. |
| `cat` | string | Category. Drives the filter chips (chips are generated from the distinct `cat` values, first-occurrence order). Must be one of exactly: `UV`, `Eco-Solvent / Flex`, `T-Shirt / Textile`, `CNC / Laser / Finishing` (these strings also appear in the `#` deep links and in `contact.html`'s "Interested in" select). |
| `brand` | string | Vendor name, rendered as the brand pill. `brands.html` counts `PRODUCTS` per `BRANDS[].name` — a brand that matches no product shows `0 LINES STOCKED` (currently Xaar). |
| `blurb` | string | One-line description on the card; repeated in the modal with a boilerplate sentence appended. Also a search target. |
| `price` | string | Display string, Indian formatting, e.g. `₹ 24,00,000`. `app.js` sorts on it by stripping non-digits. Omit the field (or leave empty) and the card shows a "Quote on Request" chip instead. All 30 current entries have a price. |
| `img` | string | Image path, conventionally built from the `O`/`P`/`C` prefixes, e.g. `P + "uv/uv-a4.jpg"`. Rendered at 400x300, `loading="lazy"`. Missing file or missing field → grey "PHOTO PENDING" placeholder; the modal image falls back to `assets/img/curated/uv_flatbed.jpg` if `p.img` is empty. |

Search behavior: query matches `name`, `brand`, `cat`, and `blurb` (case-insensitive). Sort options: `featured` (catalog order), `price-asc`, `price-desc`, `name-asc`. The status line reads "Showing N of 30 platforms".

## 3. Full product table

30 products total: **UV 11 · Eco-Solvent / Flex 9 · T-Shirt / Textile 3 · CNC / Laser / Finishing 7** (verified counts from `js/data.js`). 26 distinct image files are referenced; every referenced file exists on disk. Image column shows the file relative to the `O` / `P` / `C` prefix.

| # | Name | Category | Image file |
|---|---|---|---|
| 1 | DOCAN H1000 | UV | O `mimaki-jfx200-1213ex.png` |
| 2 | DOCAN H1600M | UV | O `mimaki-jfx200-2513ex.png` |
| 3 | DOCAN H3000 / FR5000-5M | UV | O `mimaki-jfx600-2531.png` |
| 4 | DOCAN UV Flatbed 2513 | UV | O `mimaki-jfx200-2531.png` |
| 5 | DOCAN FR2010UV | UV | P `uv/uv-pvc.png` |
| 6 | DOCAN FR3210M Roll UV | UV | O `mimaki-ujv55-320.png` |
| 7 | UV Hybrid Industrial | UV | O `mimaki-uj330h-160.png` |
| 8 | UV Roll-to-Roll Production | UV | O `mimaki-ujv200-160.png` |
| 9 | UV DTF Crystal Sticker Line | UV | P `uv/uv-pvc.png` |
| 10 | A4 UV Mobile Cover Printer | UV | P `uv/uv-a4.jpg` |
| 11 | 6090 UV Desktop Flatbed | UV | P `uv/uv-small.jpg` |
| 12 | Mimaki Eco Solvent Roll | Eco-Solvent / Flex | C `mimaki_solvent_roll.jpg` |
| 13 | Hybrid Eco Printer | Eco-Solvent / Flex | P `flex/flex-large.png` |
| 14 | Konica 512i-8H Industrial | Eco-Solvent / Flex | O `mimaki-swj-320ea.png` |
| 15 | Mimaki 3200 AT PLUS | Eco-Solvent / Flex | C `solvent_roll.jpg` |
| 16 | Mimaki MINI 3200 | Eco-Solvent / Flex | P `flex/flex-print.png` |
| 17 | Qi Jet High-Speed Solvent | Eco-Solvent / Flex | P `Q-Jet-Plus-1024.png` |
| 18 | IDS-3300 Heavy Duty Flex | Eco-Solvent / Flex | P `VK-JET-3500.png` |
| 19 | Mimaki UCJV300-160 Print & Cut | Eco-Solvent / Flex | P `flex/flex-large.png` |
| 20 | Mimaki UJF-3042 / 6042 | Eco-Solvent / Flex | P `uv/uv-small.jpg` |
| 21 | Textile Direct Fabric Roll | T-Shirt / Textile | O `VKE-3208 TX.webp` |
| 22 | Direct-to-Garment T-Shirt Printer | T-Shirt / Textile | P `text/garment.jpg` |
| 23 | High-Speed Sublimation Line | T-Shirt / Textile | O `mimaki-ts100-160.png` |
| 24 | CNC Router · IDS 1325 (9kW) | CNC / Laser / Finishing | P `cnc/cnc-router.jpg` |
| 25 | Fiber Laser Metal Cutter 3015 | CNC / Laser / Finishing | P `cnc/cnc-metal.jpg` |
| 26 | Precision CO2 Laser 1390 | CNC / Laser / Finishing | P `cnc/cnc-laser.jpg` |
| 27 | Auto-Feeding Textile Laser | CNC / Laser / Finishing | C `laser_cutting.jpg` |
| 28 | Channel Letter Bender System | CNC / Laser / Finishing | P `cnc/cnc-metal.jpg` |
| 29 | Automatic UV Coating Line | CNC / Laser / Finishing | C `facility_clean.jpg` |
| 30 | Certified Print Heads & OEM Inks | CNC / Laser / Finishing | C `inks_cmyk.jpg` |

Watch-outs: several products reuse one image (e.g. `uv-pvc.png` on #5 and #9, `flex-large.png` on #13 and #19); product names are not always consistent with their image filenames (e.g. "Konica 512i-8H" uses a `mimaki-*` original photo). Extra image files not referenced by any product also exist in `assets/img/` (unused originals, banner/, curated extras) and are safe to ignore.

## 4. Deep-linking

| URL form | Page | Behavior |
|---|---|---|
| `products.html#uv` | `products.html` | Clicks the "UV" filter chip. |
| `products.html#eco-solvent` | `products.html` | Clicks the "Eco-Solvent / Flex" chip. |
| `products.html#textile` | `products.html` | Clicks the "T-Shirt / Textile" chip. |
| `products.html#cnc` | `products.html` | Clicks the "CNC / Laser / Finishing" chip. |
| `contact.html?interest=<machine name>` | `contact.html` | Set by the spec-modal "Request Quotation" button (`app.js`). Limitation: no script reads `location.search` to pre-fill the "Interested in" select — the param is written but currently inert (the select opens on its first option, "UV"). |
| `?motion=1` (any page) | all | Forces the Lenis/GSAP motion engine even when `prefers-reduced-motion` is set (`js/motion.js`). |

Hash details: the mapping lives in an inline script at the bottom of `products.html` (`{ uv, "eco-solvent", textile, cnc }` → exact category strings). Keys are lowercase, hyphenated; an unknown hash (e.g. `#laser`) does nothing. No other query params (`?m=`, `?machine=`) are read anywhere — verified by grep.

## 5. How to add, edit, or remove a product

**Add a product**

1. **Image first (unless reusing one).** Drop the photo into `assets/img/products/<category>/` (e.g. `assets/img/products/uv/uv-new.png`). Real photos live in `products/` and `curated/`; vendor screenshots live in `original/`. Card images render at 400x300, so anything 800px wide or larger is fine; keep files under ~300 KB where practical.
2. **Edit `js/data.js`.** Add the object to the correct `/* ---- <category> ---- */` block in `PRODUCTS`, keeping field order and quoting style:
   `{ name: "...", cat: "UV", brand: "DOCAN", blurb: "...", price: "₹ 12,00,000", img: P + "uv/uv-new.png" }`
   - `cat` must be one of the four exact category strings (it is also the deep-link target and a contact-form option).
   - `brand` should match a `BRANDS[].name` so the `brands.html` count picks it up; add a new `BRANDS` entry if you introduce a vendor.
   - `price`: Indian grouping (`₹ 12,00,000`). Drop the field to show "Quote on Request" instead.
3. **No version bump needed** — `data.js` is loaded without a query string, so a hard refresh is enough.
4. **Verify:** open `products.html` — chip counts and the "All (31)" total update automatically; run the search box and both price sorts; open the card's spec modal and confirm the image and price chip; check `brands.html` if the brand count matters.

**Edit a product:** change the field in place in `js/data.js`; the card, modal, search index, sort order and status counts all derive from it, so nothing else changes. If you swap the image, update only `img`.

**Remove a product:** delete the object from `PRODUCTS`. Chips, counts, search and the `brands.html` "LINES STOCKED" figures recompute automatically. The image file on disk is orphaned but harmless; delete it only if no other entry references it (grep `data.js` first — several images are shared).

**Do not touch:** `TESTIMONIALS`, `STATS`, `WHY_US` are currently dead data — unused by any page. Leave or prune at will.

Last updated: 2026-11-15

**Sources:** `js/data.js`, `js/app.js`, `products.html`, `contact.html`, `js/motion.js`, `assets/img/` file tree (counts and image existence verified by script against the files).
