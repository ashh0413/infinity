/* Infinity Digital Solutions — app.js
   Runs on every page. Renders catalog/filters where #grid exists,
   brands where #brand-grid exists, reveals on scroll, mobile nav. */

(function () {
  "use strict";

  /* ---- hero carousel (index.html) ---- */
  var hc = document.getElementById("hero-carousel");
  if (hc) {
    var SLIDES = [
      { e: "Since 2006 · New Delhi", h: "Every machine <em>your print floor</em> can run on.", s: "From entry-level solvent printers to high-end UV and soft-signage platforms — with inks, print heads and spares to keep them running." },
      { e: "Authorized DOCAN partner", h: "High-speed <em>UV flatbed</em> printing, in-house.", s: "The DOCAN H1600M — direct printing on glass, metal, tile and acrylic at production speed. Installation and support included." },
      { e: "Textile · DTG", h: "Textile and DTG, <em>direct to fabric.</em>", s: "Direct-to-garment and sublimation platforms for apparel, soft furnishings and short-run sportswear — no screens, no minimums." },
      { e: "Inks · heads · spares", h: "Inks and heads <em>for every brand.</em>", s: "Infiniti ink across the range, Xaar print heads, and spares for every machine we supply — matched, tested, on time." }
    ];
    var slides = hc.querySelectorAll(".hc-slide");
    var dots = hc.querySelectorAll(".hc-dot");
    var e = document.getElementById("hc-eyebrow");
    var h = document.getElementById("hc-h1");
    var s = document.getElementById("hc-sub");
    var count = document.getElementById("hc-count");
    var i = 0, timer;

    function show(n) {
      i = n;
      slides.forEach(function (sl, k) { sl.classList.toggle("on", k === n); });
      dots.forEach(function (d, k) { d.classList.toggle("on", k === n); });
      e.textContent = SLIDES[n].e;
      h.innerHTML = SLIDES[n].h;
      s.textContent = SLIDES[n].s;
      count.textContent = String(n + 1).padStart(2, "0") + " / " + String(SLIDES.length).padStart(2, "0");
    }
    function tick() { show((i + 1) % SLIDES.length); }
    function start() { stop(); timer = setInterval(tick, 6000); }
    function stop() { if (timer) clearInterval(timer); }

    dots.forEach(function (d) {
      d.addEventListener("click", function () {
        show(Number(d.getAttribute("data-i")));
        start();
      });
    });
    var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduced) {
      hc.addEventListener("mouseenter", stop);
      hc.addEventListener("mouseleave", start);
    }
    show(0);
    if (!reduced) start();
  }

  /* ---- mobile nav ---- */
  var burger = document.querySelector(".burger");
  var nav = document.querySelector("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      nav.classList.toggle("open");
    });
  }

  /* ---- catalog (products.html) ---- */
  var grid = document.getElementById("grid");
  if (grid && typeof PRODUCTS !== "undefined") {
    var cats = [];
    PRODUCTS.forEach(function (p) { if (cats.indexOf(p.cat) < 0) cats.push(p.cat); });

    var priceChip = function (p) {
      if (p.price) {
        return '<span class="price"><span class="lbl">FROM</span><span class="amt">' + p.price + "</span></span>";
      }
      return '<span class="price req"><span class="lbl">PRICE</span><span class="amt">Request quote</span></span>';
    };
    var card = function (p) {
      return '<article class="card reveal">' +
        '<span class="kind">' + p.cat + " · " + p.brand + "</span>" +
        "<h3>" + p.name + "</h3>" +
        "<p>" + p.blurb + "</p>" +
        priceChip(p) +
        '</article>';
    };

    var catsEl = document.getElementById("cats");
    if (catsEl) {
      var all = '<button class="cat-chip on" data-cat="all">All (' + PRODUCTS.length + ")</button>";
      catsEl.innerHTML = all + cats.map(function (c) {
        var n = PRODUCTS.filter(function (p) { return p.cat === c; }).length;
        return '<button class="cat-chip" data-cat="' + c + '">' + c + " (" + n + ")</button>";
      }).join("");

      catsEl.addEventListener("click", function (e) {
        var t = e.target.closest(".cat-chip");
        if (!t) return;
        catsEl.querySelectorAll(".cat-chip").forEach(function (b) { b.classList.remove("on"); });
        t.classList.add("on");
        var want = t.getAttribute("data-cat");
        grid.querySelectorAll(".card").forEach(function (c) {
          c.style.display = (want === "all" || c.getAttribute("data-cat") === want) ? "" : "none";
        });
      });
    }

    grid.innerHTML = PRODUCTS.map(card).join("");
    /* tag cards for the filter */
    grid.querySelectorAll(".card").forEach(function (c, i) {
      c.setAttribute("data-cat", PRODUCTS[i].cat);
    });
  }

  /* ---- brands (brands.html) ---- */
  var bg = document.getElementById("brand-grid");
  if (bg && typeof BRANDS !== "undefined") {
    bg.innerHTML = BRANDS.map(function (b) {
      var models = PRODUCTS.filter(function (p) { return p.brand === b.name; }).length;
      return '<div class="brand reveal"><h3>' + b.name + '</h3><div class="line">' + b.line +
        "</div><p>" + b.note + "</p><p class='mono' style='font-family:var(--mono);font-size:10px;letter-spacing:.1em;color:var(--text-dim);margin-top:12px'>" +
        models + " LINES STOCKED</p></div>";
    }).join("");
  }

  /* ---- scroll reveal ---- */
  var reveals = document.querySelectorAll(".reveal");
  if (reveals.length && "IntersectionObserver" in window) {
    reveals.forEach(function (el) { el.classList.add("arm"); });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
    /* safety: never leave content hidden */
    setTimeout(function () {
      reveals.forEach(function (el) { el.classList.add("in"); });
    }, 2600);
  }

  /* ---- contact / enquiry form (mailto, no backend) ---- */
  var form = document.getElementById("quote-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(form);
      var body = encodeURIComponent(
        "Name: " + (f.get("name") || "") + "\n" +
        "Phone: " + (f.get("phone") || "") + "\n" +
        "Interested in: " + (f.get("interest") || "") + "\n\n" +
        (f.get("msg") || "")
      );
      window.location.href = "mailto:marketing@infinitydigitalsolutions.com?subject=" +
        encodeURIComponent("Machine Enquiry — " + (f.get("interest") || "infinity")) + "&body=" + body;
    });
  }

  /* footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
