"use strict";

(function applyZennoraIndustryModernDesign() {
  const type = document.body.dataset.demoType || "";
  if (!type || type === "general") return;
  if (document.body.classList.contains("zennora-modern")) return;

  document.body.classList.add("zennora-modern");

  ["homepage-modern.css?v=1.0.0", "industry-modern.css?v=1.0.0"].forEach((href) => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.appendChild(link);
  });

  const labels = {
    dental: "Dental clinic",
    physio: "Physiotherapy clinic",
    plumbing: "Plumbing business",
    hvac: "HVAC business",
    automotive: "Auto service shop"
  };

  function enhanceHero() {
    const heroVisual = document.querySelector(".hero-visual.interactive-demo");
    const card = heroVisual && heroVisual.querySelector(".chat-card");
    if (!heroVisual || !card || heroVisual.querySelector(".product-browser-shell")) return;

    const shell = document.createElement("div");
    shell.className = "product-browser-shell";
    shell.innerHTML = `
      <div class="product-browser-toolbar">
        <span class="product-browser-dots"><i></i><i></i><i></i></span>
        <span class="product-browser-address">yourbusiness.ca · Personalized Zennora preview</span>
      </div>
      <div class="product-browser-sitebar">
        <span class="product-browser-brand"><b>Z</b> ${labels[type] || "Your business"}</span>
        <span class="product-browser-nav"><span>Services</span><span>About</span><span>Contact</span></span>
      </div>`;

    card.parentNode.insertBefore(shell, card);
    shell.appendChild(card);

    const one = document.createElement("div");
    one.className = "hero-float-card one";
    one.innerHTML = '<strong>24/7</strong><span>Answers common questions</span>';

    const two = document.createElement("div");
    two.className = "hero-float-card two";
    two.innerHTML = '<strong>✓</strong><span>Uses approved business information</span>';

    heroVisual.append(one, two);
  }

  function addTrustRibbon() {
    if (document.querySelector(".trust-ribbon")) return;
    const proof = document.querySelector(".proof-bar");
    if (!proof) return;

    const ribbon = document.createElement("section");
    ribbon.className = "trust-ribbon";
    ribbon.setAttribute("aria-label", "Zennora trust highlights");
    ribbon.innerHTML = `
      <div class="container trust-ribbon-grid">
        <div class="trust-ribbon-item"><span class="trust-icon">🇨🇦</span><div><strong>Built & supported in Canada</strong><span>Direct support from Zennora</span></div></div>
        <div class="trust-ribbon-item"><span class="trust-icon">✓</span><div><strong>Approved information</strong><span>Configured around your business</span></div></div>
        <div class="trust-ribbon-item"><span class="trust-icon">↗</span><div><strong>Human handoff</strong><span>Clear paths to staff when needed</span></div></div>
        <div class="trust-ribbon-item"><span class="trust-icon">◌</span><div><strong>Review before launch</strong><span>No live changes during the demo</span></div></div>
      </div>`;
    proof.insertAdjacentElement("afterend", ribbon);
  }

  function addTrustSection() {
    if (document.querySelector("#industry-trust")) return;
    const pricing = document.querySelector("[id$='-pricing'], #pricing");
    if (!pricing) return;

    const isClinical = type === "dental" || type === "physio";
    const section = document.createElement("section");
    section.className = "section industry-trust-section";
    section.id = "industry-trust";
    section.innerHTML = `
      <div class="container industry-trust-wrap">
        <div class="industry-trust-copy">
          <div class="eyebrow">Trust before launch</div>
          <h2>Review the experience privately before it appears on your live website.</h2>
          <p>Zennora prepares a personalized preview using public information and relevant ${isClinical ? "patient" : "customer"} scenarios. You can review the tone, answers and next-step guidance before deciding whether to launch.</p>
        </div>
        <div class="industry-trust-list">
          <article><b>✓</b><strong>Business-approved information</strong><span>Responses are configured around information your business provides or approves.</span></article>
          <article><b>↗</b><strong>Clear human handoff</strong><span>Questions that need a person can be routed to the appropriate contact path.</span></article>
          <article><b>◌</b><strong>Private demo first</strong><span>No script needs to be installed on the live website during the demo.</span></article>
          <article><b>🇨🇦</b><strong>Canada-based support</strong><span>Questions can be sent directly to hello@zennora.ca.</span></article>
        </div>
      </div>`;
    pricing.insertAdjacentElement("beforebegin", section);
  }

  function addDemoSafetyPanel() {
    if (document.querySelector(".demo-safety-panel")) return;
    const form = document.querySelector("[data-industry-demo-form]");
    if (!form) return;

    const section = form.closest("section");
    const heading = section && section.querySelector("[data-industry-demo-heading], .section-head");
    if (!section || !heading) return;

    const panel = document.createElement("div");
    panel.className = "demo-safety-panel";
    panel.innerHTML = `
      <div><h3>See a personalized version before you decide.</h3><p>Your demo is prepared privately first. Requesting it does not change your live website.</p></div>
      <div class="demo-safety-list"><span>Personalized to your business</span><span>Review before deciding</span><span>No setup fee</span><span>No live-site changes during the demo</span></div>`;
    heading.insertAdjacentElement("afterend", panel);
  }

  function normalizeFooterIndustries() {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;
    const columns = footer.querySelectorAll(".footer-grid > div");
    const exploreColumn = [...columns].find((column) => column.querySelector(".footer-heading")?.textContent.trim().toLowerCase() === "explore");
    const links = exploreColumn && exploreColumn.querySelector(".footer-links");
    if (!links) return;

    links.innerHTML = `
      <a href="index.html">Home</a>
      <a href="dental.html">Dental</a>
      <a href="physio.html">Physio / Rehab</a>
      <a href="plumbing.html">Plumbing</a>
      <a href="hvac.html">HVAC</a>
      <a href="automotive.html">Automotive</a>
      <a href="privacy.html">Privacy</a>`;
  }

  enhanceHero();
  addTrustRibbon();
  addTrustSection();
  addDemoSafetyPanel();
  normalizeFooterIndustries();
})();
