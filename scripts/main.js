/* ============================================================
   SPSA site interactions. Zero dependencies.
   ------------------------------------------------------------
   EDIT THESE before going live (see README):
   ============================================================ */
const CONFIG = {
  // Official shared org inbox (from PSU org record).
  contactEmail: "pennstatesikhpunjabi@gmail.com",
  instagram: "https://www.instagram.com/psu.spsa/",
  linktree: "https://linktr.ee/pennstatesikhs",
};

/* ---------- small helpers ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

/* ---------- wire config-driven links ---------- */
function wireLinks() {
  const y = $("[data-year]");
  if (y) y.textContent = String(new Date().getFullYear());

  const contact = $("[data-contact-link]");
  if (contact) contact.href = `mailto:${CONFIG.contactEmail}`;

  $$("[data-social-link]").forEach((el) => {
    const label = el.textContent.trim().toLowerCase();
    el.href = label.includes("insta") ? CONFIG.instagram : CONFIG.linktree;
    el.target = "_blank";
    el.rel = "noopener";
  });
}

/* ---------- mobile nav ---------- */
function initNav() {
  const nav = $("[data-nav]");
  const toggle = $("[data-nav-toggle]");
  if (!nav || !toggle) return;

  toggle.addEventListener("click", () => {
    const open = nav.getAttribute("data-open") === "true";
    nav.setAttribute("data-open", String(!open));
    toggle.setAttribute("aria-expanded", String(!open));
  });

  // Close after picking a link on mobile.
  $$(".nav__links a", nav).forEach((a) =>
    a.addEventListener("click", () => {
      nav.setAttribute("data-open", "false");
      toggle.setAttribute("aria-expanded", "false");
    })
  );
}

/* ---------- reveal on scroll ---------- */
function initReveal() {
  const items = $$("[data-reveal]");
  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );
  items.forEach((el) => io.observe(el));
}

/* ---------- boot ---------- */
document.addEventListener("DOMContentLoaded", () => {
  wireLinks();
  initNav();
  initReveal();
});
