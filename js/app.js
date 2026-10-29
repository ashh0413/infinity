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
    var card = function (p, idx) {
      var img = p.img ? '<div class="card-img"><img src="' + p.img + '" alt="' + p.name + '" loading="lazy" width="400" height="300"></div>' : "";
      return '<article class="card reveal" data-idx="' + idx + '" tabindex="0" role="button" aria-label="View specifications for ' + p.name + '">' +
        img +
        '<div class="card-body">' +
          '<span class="kind">' + p.cat + " · " + p.brand + "</span>" +
          "<h3>" + p.name + "</h3>" +
          "<p>" + p.blurb + "</p>" +
          '<div class="card-footer">' +
            '<span class="quick-view">Quick Specs <span class="arr">↗</span></span>' +
            priceChip(p) +
          '</div>' +
        "</div>" +
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

    grid.innerHTML = PRODUCTS.map(function(p, i) { return card(p, i); }).join("");
    /* tag cards for the filter */
    grid.querySelectorAll(".card").forEach(function (c, i) {
      c.setAttribute("data-cat", PRODUCTS[i].cat);
    });

    /* Apple-style Quick Spec Modal */
    var modal = document.createElement("div");
    modal.className = "spec-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.innerHTML = '<div class="spec-backdrop"></div>' +
      '<div class="spec-card">' +
        '<button class="spec-card-close" aria-label="Close modal">×</button>' +
        '<div class="spec-card-visual"><img id="sm-img" src="" alt=""></div>' +
        '<div class="spec-card-content">' +
          '<div class="spec-header">' +
            '<span class="kind" id="sm-kind"></span>' +
            '<h2 id="sm-name"></h2>' +
            '<p id="sm-blurb"></p>' +
            '<div class="spec-pills">' +
              '<span class="spec-pill">Industrial Precision</span>' +
              '<span class="spec-pill">Production Ready</span>' +
              '<span class="spec-pill">Full Warranty</span>' +
            '</div>' +
          '</div>' +
          '<div class="spec-footer">' +
            '<div id="sm-price"></div>' +
            '<a class="btn" id="sm-btn" href="contact.html">Request Quotation &rarr;</a>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(modal);

    function openModal(p) {
      document.getElementById("sm-img").src = p.img || "assets/img/curated/uv_flatbed.jpg";
      document.getElementById("sm-img").alt = p.name;
      document.getElementById("sm-kind").textContent = p.cat + " · " + p.brand;
      document.getElementById("sm-name").textContent = p.name;
      document.getElementById("sm-blurb").textContent = p.blurb + " Engineered for sustained industrial runs, high output fidelity, and maximum uptime on your production floor.";
      document.getElementById("sm-price").innerHTML = priceChip(p);
      document.getElementById("sm-btn").href = "contact.html?interest=" + encodeURIComponent(p.name);
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
      document.dispatchEvent(new Event("site:lock-scroll"));
    }

    function closeModal() {
      modal.classList.remove("open");
      document.body.style.overflow = "";
      document.dispatchEvent(new Event("site:unlock-scroll"));
    }

    grid.addEventListener("click", function (e) {
      var cardEl = e.target.closest(".card");
      if (!cardEl) return;
      var idx = Number(cardEl.getAttribute("data-idx"));
      if (PRODUCTS[idx]) openModal(PRODUCTS[idx]);
    });

    grid.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        var cardEl = e.target.closest(".card");
        if (cardEl) {
          e.preventDefault();
          var idx = Number(cardEl.getAttribute("data-idx"));
          if (PRODUCTS[idx]) openModal(PRODUCTS[idx]);
        }
      }
    });

    modal.querySelector(".spec-backdrop").addEventListener("click", closeModal);
    modal.querySelector(".spec-card-close").addEventListener("click", closeModal);
    window.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
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

  /* ---- contact / enquiry form: Formspree when FORM_ID set, else mailto ---- */
  var form = document.getElementById("quote-form");
  if (form) {
    var FORM_ID = "YOUR_FORMSPREE_ID"; /* paste the id from formspree.com/f/<id> */
    var note = form.querySelector(".mono");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = new FormData(form);
      if (FORM_ID === "YOUR_FORMSPREE_ID") {
        var body = "Name: " + (f.get("name") || "") + "\n" +
          "Phone: " + (f.get("phone") || "") + "\n" +
          "Interested in: " + (f.get("interest") || "") + "\n\n" +
          (f.get("msg") || "");
        window.location.href = "mailto:marketing@infinitydigitalsolutions.com?subject=" +
          encodeURIComponent("Machine Enquiry — " + (f.get("interest") || "infinity")) + "&body=" + encodeURIComponent(body);
        if (note) note.textContent = "OPENS YOUR EMAIL CLIENT — SET FORM_ID IN js/app.js FOR SERVER-SIDE SUBMIT";
        return;
      }
      if (note) note.textContent = "SENDING…";
      fetch("https://formspree.io/f/" + FORM_ID, { method: "POST", body: f, headers: { Accept: "application/json" } })
        .then(function (r) { if (note) note.textContent = r.ok ? "SENT — REPLY WITHIN ONE WORKING DAY" : "SEND FAILED — CALL THE HOTLINE"; })
        .catch(function () { if (note) note.textContent = "NETWORK ERROR — CALL THE HOTLINE"; });
    });
  }

  /* footer year */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* tactile click micro-animation */
  document.addEventListener("pointerdown", function (e) {
    var el = e.target.closest(".btn, .cat-chip, .quick-view, .card, .bento-card, .why-card, .arrow-link, button, nav a");
    if (!el) return;
    el.style.transition = "transform 0.08s cubic-bezier(0.16, 1, 0.3, 1)";
    el.style.transform = "scale(0.96) translateY(1px)";
    var reset = function () {
      el.style.transform = "";
      setTimeout(function () { el.style.transition = ""; }, 180);
      window.removeEventListener("pointerup", reset);
      window.removeEventListener("pointercancel", reset);
    };
    window.addEventListener("pointerup", reset);
    window.addEventListener("pointercancel", reset);
  }, { passive: true });
})();
