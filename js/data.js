/* Infinity Digital Solutions — catalog data.
   Curated authentic HD photography across all platforms. */

var BRANDS = [
  { name: "DOCAN",    line: "UV flatbed · hybrid · roll-to-roll", note: "The core UV range — from A4 mobile-cover units to H3000-class production." },
  { name: "Mimaki",   line: "Eco-solvent · print & cut", note: "UCJV300-160, UJF-3042/6042, 3200 AT PLUS and MINI 3200 series." },
  { name: "Konica",   line: "Wide-format inkjet", note: "512i-8H platform." },
  { name: "Xaar",     line: "Print heads", note: "Replacement heads and print-shop spares." },
  { name: "Infiniti", line: "Printers & ink", note: "Full ink range across solvent, textile and UV." },
  { name: "IDS",      line: "In-house machines", note: "IDS-3300 heavy-duty flex, IDS 1325 CNC, Docan roll-to-roll hybrid." }
];

var P = "assets/img/products/";
var C = "assets/img/curated/";

var PRODUCTS = [
  /* ---- UV ---- */
  { name: "DOCAN H1000", cat: "UV", brand: "DOCAN", blurb: "UV flatbed 8×4 format with Ricoh Gen5 print heads.", price: "₹ 24,00,000", img: C + "uv_flatbed.jpg" },
  { name: "DOCAN H1600M", cat: "UV", brand: "DOCAN", blurb: "High-speed UV hybrid platform for acrylic, glass and ACP.", price: "₹ 33,00,000", img: C + "uv_acrylic.jpg" },
  { name: "DOCAN H3000 / FR5000-5M", cat: "UV", brand: "DOCAN", blurb: "Fast-speed 3.2m large format UV inkjet line.", price: "₹ 55,00,000", img: C + "uv_signage.jpg" },
  { name: "DOCAN UV Flatbed 2513", cat: "UV", brand: "DOCAN", blurb: "Standard 2.5m × 1.3m vacuum bed UV flatbed line.", price: "₹ 25,00,000", img: P + "uv/uv-flatbed.jpg" },
  { name: "DOCAN FR2010UV", cat: "UV", brand: "DOCAN", blurb: "High-speed continuous roll UV production series.", price: "₹ 28,00,000", img: P + "uv/uv-pvc.png" },
  { name: "DOCAN FR3210M Roll UV", cat: "UV", brand: "DOCAN", blurb: "Wide-format 3.2m roll-to-roll UV platform.", price: "₹ 45,00,000", img: C + "uv_signage.jpg" },
  { name: "UV Hybrid Industrial", cat: "UV", brand: "IDS", blurb: "In-house Docan roll-to-roll hybrid with extension tables.", price: "₹ 38,00,000", img: C + "uv_flatbed.jpg" },
  { name: "UV Roll-to-Roll Production", cat: "UV", brand: "DOCAN", blurb: "Heavy production roll-to-roll UV with water-cooled LED lamps.", price: "₹ 40,00,000", img: C + "uv_acrylic.jpg" },
  { name: "UV DTF Crystal Sticker Line", cat: "UV", brand: "DOCAN", blurb: "Direct-to-film UV transfer printer with automatic laminator.", price: "₹ 11,50,000", img: C + "uv_signage.jpg" },
  { name: "A4 UV Mobile Cover Printer", cat: "UV", brand: "DOCAN", blurb: "Small-format benchtop UV for phone covers, pens, and gifts.", price: "₹ 4,50,000", img: P + "uv/uv-a4.jpg" },
  { name: "6090 UV Desktop Flatbed", cat: "UV", brand: "DOCAN", blurb: "Entry production 600×900 mm UV flatbed for custom items.", price: "₹ 9,50,000", img: P + "uv/uv-small.jpg" },

  /* ---- Eco-Solvent / Flex ---- */
  { name: "Mimaki Eco Solvent Roll", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "High-resolution eco-solvent for indoor vinyl and photo prints.", price: "₹ 6,50,000", img: C + "mimaki_solvent_roll.jpg" },
  { name: "Hybrid Eco Printer", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "Hybrid eco-solvent / UV platform with dual curing.", price: "₹ 13,00,000", img: P + "flex/flex-large.png" },
  { name: "Konica 512i-8H Industrial", cat: "Eco-Solvent / Flex", brand: "Konica", blurb: "High-speed outdoor billboard flex line with 8 Konica heads.", price: "₹ 15,50,000", img: C + "solvent_main.jpg" },
  { name: "Mimaki 3200 AT PLUS", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "AT PLUS series 3.2m flex and banner line.", price: "₹ 12,00,000", img: C + "solvent_roll.jpg" },
  { name: "Mimaki MINI 3200", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "Mini 3200 series 4-inch class for sign shops.", price: "₹ 8,50,000", img: P + "flex/flex-print.png" },
  { name: "Qi Jet High-Speed Solvent", cat: "Eco-Solvent / Flex", brand: "Infiniti", blurb: "High-end industrial solvent printer for heavy volume.", price: "₹ 10,00,000", img: C + "solvent_machine_roll.jpg" },
  { name: "IDS-3300 Heavy Duty Flex", cat: "Eco-Solvent / Flex", brand: "IDS", blurb: "In-house heavy-duty monolithic flex printer with take-up.", price: "₹ 13,00,000", img: C + "solvent_detail.jpg" },
  { name: "Mimaki UCJV300-160 Print & Cut", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "Integrated printing and precision contour cutting in one pass.", price: "₹ 18,50,000", img: P + "flex/flex-large.png" },
  { name: "Mimaki UJF-3042 / 6042", cat: "Eco-Solvent / Flex", brand: "Mimaki", blurb: "UJF high-precision small-to-medium format series.", price: "₹ 16,00,000", img: C + "uv_flatbed.jpg" },

  /* ---- T-Shirt / Textile ---- */
  { name: "Textile Direct Fabric Roll", cat: "T-Shirt / Textile", brand: "Infiniti", blurb: "Continuous direct textile printing on fashion fabrics and sarees.", price: "₹ 22,00,000", img: C + "textile_roll.jpg" },
  { name: "Direct-to-Garment T-Shirt Printer", cat: "T-Shirt / Textile", brand: "Infiniti", blurb: "High-speed DTG printing for cotton T-shirts and hoodies.", price: "₹ 7,50,000", img: P + "text/combo.jpg" },
  { name: "High-Speed Sublimation Line", cat: "T-Shirt / Textile", brand: "Infiniti", blurb: "High-speed dye-sublimation transfer line for sportswear.", price: "₹ 8,50,000", img: C + "sublimation_main.jpg" },

  /* ---- CNC / Laser / Finishing ---- */
  { name: "CNC Router · IDS 1325 (9kW)", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "Monolithic steel frame CNC router with 9kW spindle and vacuum table.", price: "₹ 6,50,000", img: C + "cnc_router_hd.jpg" },
  { name: "Fiber Laser Metal Cutter 3015", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "Raycus 3kW fiber laser cutting platform for sheet metals.", price: "₹ 28,00,000", img: C + "laser_metal.jpg" },
  { name: "Precision CO2 Laser 1390", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "150W RECI CO2 laser for acrylic sheets, wood and crafts.", price: "₹ 3,80,000", img: C + "laser_cutting.jpg" },
  { name: "Auto-Feeding Textile Laser", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "Conveyor bed laser cutter with auto-feeding for fabrics.", price: "₹ 5,50,000", img: C + "laser_cutting.jpg" },
  { name: "Channel Letter Bender System", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "Multi-function CNC bender for stainless steel and aluminum 3D letters.", price: "₹ 14,00,000", img: P + "cnc/cnc-metal.jpg" },
  { name: "Automatic UV Coating Line", cat: "CNC / Laser / Finishing", brand: "IDS", blurb: "Protective liquid UV roller coater for prints and wooden panels.", price: "₹ 4,80,000", img: C + "facility_clean.jpg" },
  { name: "Certified Print Heads & OEM Inks", cat: "CNC / Laser / Finishing", brand: "Infiniti", blurb: "Original factory-certified Xaar, Konica, and Mimaki consumables.", price: "₹ 45,000", img: C + "inks_cmyk.jpg" }
];

var TESTIMONIALS = [
  { name: "Preeti Malhotra", topic: "Signage printers, bulk pricing" },
  { name: "Rakesh Mehta", topic: "Digital printers across Delhi NCR" },
  { name: "Satish Upadhyaya", topic: "Solvent business guidance" }
];

var STATS = [
  { k: "EST.", v: "2006" },
  { k: "STAFF", v: "51–100" },
  { k: "INDIAMART", v: "4.2 / 5", sub: "13 reviews · TrustSEAL" },
  { k: "PRICE RANGE", v: "₹ 3.5L – 55L", sub: "IndiaMART listings" }
];

var WHY_US = [
  "Qualitative and expansive product line",
  "World renowned vendor base",
  "Team of expert professionals",
  "Customized products · industry leading prices",
  "Ethical business policies · on-time delivery · easy payment modes"
];
