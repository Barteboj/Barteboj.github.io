/* =========================================================
   Bartosz Bojda — portfolio
   No dependencies. Every feature degrades gracefully.
   ========================================================= */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------
     Current year in the footer
     --------------------------------------------------------- */

  var year = document.getElementById("year");
  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  /* ---------------------------------------------------------
     Mobile navigation
     --------------------------------------------------------- */

  var nav = document.getElementById("nav");
  var navToggle = document.querySelector(".nav-toggle");

  function closeNav() {
    if (!nav || !navToggle) return;
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      nav.classList.toggle("is-open", !open);
      navToggle.setAttribute("aria-expanded", String(!open));
    });

    // Close after choosing a destination
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNav();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        closeNav();
        navToggle.focus();
      }
    });

    // The menu is only a menu at narrow widths; drop it on resize past the breakpoint
    window.addEventListener("resize", function () {
      if (window.innerWidth > 720) closeNav();
    });
  }

  /* ---------------------------------------------------------
     "Show all contributions" toggles
     --------------------------------------------------------- */

  document.querySelectorAll(".toggle").forEach(function (button) {
    var panel = document.getElementById(button.getAttribute("aria-controls"));
    var label = button.querySelector(".toggle__label");
    if (!panel) return;

    button.addEventListener("click", function () {
      var expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      panel.hidden = expanded;
      if (label) {
        label.textContent = expanded ? "Show all contributions" : "Show fewer";
      }
    });
  });

  /* ---------------------------------------------------------
     Reveal on scroll
     --------------------------------------------------------- */

  var revealables = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealables.forEach(function (el) {
      el.classList.add("is-visible");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.05 }
    );

    revealables.forEach(function (el, index) {
      // Stagger siblings slightly so grids cascade instead of popping at once
      el.style.transitionDelay = (index % 3) * 70 + "ms";
      revealObserver.observe(el);
    });

    // Safety net: an animation must never be the reason content stays invisible.
    // If anything is still unrevealed after a few seconds, show it unconditionally.
    window.setTimeout(function () {
      revealables.forEach(function (el) {
        el.classList.add("is-visible");
      });
    }, 3000);
  }

  /* ---------------------------------------------------------
     Scroll-spy for the navigation
     --------------------------------------------------------- */

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav__link"));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    var visible = new Set();

    function setActive() {
      // Whichever tracked section sits highest on the page wins
      var best = null;
      sections.forEach(function (section) {
        if (!visible.has(section)) return;
        if (!best || section.offsetTop < best.offsetTop) best = section;
      });

      navLinks.forEach(function (link) {
        var isActive = best !== null && link.getAttribute("href") === "#" + best.id;
        link.classList.toggle("is-active", isActive);
      });
    }

    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            visible.add(entry.target);
          } else {
            visible.delete(entry.target);
          }
        });
        setActive();
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    sections.forEach(function (section) {
      spy.observe(section);
    });
  }
})();
