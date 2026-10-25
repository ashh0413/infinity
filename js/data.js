/* Infinity Digital Solutions — catalog data.
   Prices are IndiaMART listing prices from the company's own profile.
   "req" = price not published, quote on request. */

var BRANDS = [
  { name: "DOCAN",    line: "UV flatbed · hybrid · roll-to-roll", note: "The core UV range — from A4 mobile-cover units to H3000-class production." },
  { name: "Mimaki",   line: "Eco-solvent · print & cut", note: "UCJV300-160, UJF-3042/6042, 3200 AT PLUS and MINI 3200 series." },
  { name: "Konica",   line: "Wide-format inkjet", note: "512i-8H platform." },
  { name: "Xaar",     line: "Print heads", note: "Replacement heads and print-shop spares." },
  { name: "Infiniti", line: "Printers & ink", note: "Full ink range across solvent, textile and UV." },
  { name: "IDS",      line: "In-house machines", note: "IDS-3300 heavy-duty flex, IDS 1325 CNC, Docan roll-to-roll hybrid." }
];

var PRODUCTS = [
  /* ---- UV ---- */
  { name: "DOCAN H1000", cat: "UV", brand: "DOCAN", blurb: "UV flatbed.", price: null },
  { name: "DOCAN H1600M", cat: "UV", brand: "DOCAN", blurb: "High-speed UV flatbed.", price: "₹ 33,00,000" },
  { name: "DOCAN H3000 / FR5000-5M", cat: "UV", brand: "DOCAN", blurb: "Fast-speed flatbed platform.", price: "₹ 55,00,000" },
  { name: "DOCAN UV Flatbed", cat: "UV", brand: "DOCAN", blurb: "Standard UV flatbed line.", price: "₹ 25,00,000" },
  { name: "DOCAN FR2010UV", cat: "UV", brand: "DOCAN", blurb: "Roll UV series.", price: "₹ 28,00,000" },
  { name: "DOCAN FR3210M / FR321OTM", cat: "UV", brand: "DOCAN", blurb: "Wide-format roll UV.", price: "₹ 45–52,00,000" },
  { name: "UV Hybrid", cat: "UV", brand: "IDS", blurb: "In-house Docan roll-to-roll hybrid.", price: null },
  { name: "UV Roll-to-Roll", cat: "UV", brand: "DOCAN", blurb: "Production roll-to-roll UV.", price: "₹ 40,00,000" },
  { name: "UV DTF", cat: "UV", brand: "DOCAN", blurb: "Direct-to-film UV line.", price: null },
  { name: "A4 UV · Mobile Cover Printer", cat: "UV", brand: "DOCAN", blurb: "Small-format UV for phone covers and small media.", price: null },
  { name: "6090 UV", cat: "UV", brand: "DOCAN", blurb: "Entry production UV.", price: "₹ 9,50,000" },

  /* ---- Eco-Solvent / Flex ---- */
  { name: "Eco Solvent Printer", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "Entry-level eco-solvent.", price: "₹ 3,50,000" },
  { name: "Hybrid Eco Printer", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "Hybrid eco-solvent / UV platform.", price: "₹ 13,00,000" },
  { name: "Konica 512i-8H", cat: "Eco-Solvent / Flex", brand: "Konica", blurb: "Wide-format inkjet, Konica platform.", price: null },
  { name: "Mimaki 3200 AT PLUS (6)", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "AT PLUS series, 6-inch class.", price: null },
  { name: "Mimaki MINI 3200 (4)", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "Mini 3200 series, 4-inch class.", price: null },
  { name: "Qi Jet Solvent", cat: "Eco-Solvent / Flex", brand: "Infiniti", blurb: "High-end solvent printer.", price: "₹ 10,00,000" },
  { name: "IDS-3300 Heavy Duty Flex", cat: "Eco-Solvent / Flex", brand: "IDS", blurb: "In-house heavy-duty flex printer.", price: "₹ 13,00,000" },
  { name: "Mimaki UCJV300-160 Print 'n' Cut", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "Eco-solvent with integrated cutter.", price: null },
  { name: "Mimaki UJF-3042 / 6042", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "UJF small-to-medium format series.", price: null },

  /* ---- T-Shirt / Textile ---- */
  { name: "T-Shirt Printer", cat: "T-Shirt / Textile", brand: "Infiniti", blurb: "Direct garment printing.", price: null },
  { name: "Sublimation Printer", cat: "T-Shirt / Textile", brand: "Infiniti", blurb: "Sublimation transfer line.", price: null },

  /* ---- CNC / Laser / Finishing ---- */
  { name: "CNC Engraving Cutting Laser", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "Engraving and cutting laser.", price: null },
  { name: "CNC Router · IDS 1325", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "In-house CNC router, 3 kW.", price: "₹ 4,50,000" },
  { name: "Auto-Feeding Cutting Laser", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "Auto-feeder cutting laser.", price: null },
  { name: "Metal Cutting Laser", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "Laser cutting for metal and non-metal.", price: null },
  { name: "Fiber Laser Cutting", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "Fiber laser cutting.", price: null },
  { name: "CO2 Laser", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "CO2 laser cutting.", price: "₹ 3,50,000" },
  { name: "UV Coating Line", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "UV curing / coating line.", price: null },
  { name: "Channel Letter Bender", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "Multi-function channel letter bending.", price: "₹ 25,00,000" }
];

var TESTIMONIALS = [
  { name: "Preeti Malhotra",   topic: "Signage printers, bulk pricing" },
  { name: "Rakesh Mehta",      topic: "Digital printers across Delhi NCR" },
  { name: "Satish Upadhyaya",  topic: "Solvent business guidance" }
];

var STATS = [
  { k: "EST.",           v: "2006" },
  { k: "STAFF",         v: "51–100" },
  { k: "INDIAMART",     v: "4.2 / 5", sub: "13 reviews · TrustSEAL" },
  { k: "PRICE RANGE",   v: "₹ 3.5L – 55L", sub: "IndiaMART listings" }
];

var WHY_US = [
  "Qualitative and expansive product line",
  "World renowned vendor base",
  "Team of expert professionals",
  "Customized products · industry leading prices",
  "Ethical business policies · on-time delivery · easy payment modes"
];
