"use strict";

(function applyZennoraIndustryModernDesign() {
  const type = document.body.dataset.demoType || "";
  if (!type || type === "general") return;
  if (document.body.classList.contains("zennora-modern")) return;

  document.body.classList.add("zennora-modern");

  [
    "homepage-modern.css?v=1.0.1",
    "industry-modern.css?v=1.2.0",
    "industry-visuals.css?v=1.1.0"
  ].forEach((href) => {
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

  const cleanRoutes = {
    "index.html": "/",
    "dental.html": "/dental",
    "physio.html": "/physio",
    "plumbing.html": "/plumbing",
    "hvac.html": "/hvac",
    "automotive.html": "/automotive",
    "privacy.html": "/privacy",
    "security.html": "/security",
    "terms.html": "/terms"
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

    const tray = document.createElement("div");
    tray.className = "hero-float-tray";

    const one = document.createElement("div");
    one.className = "hero-float-card one";
    one.innerHTML = '<strong>24/7</strong><span>Answers common questions</span>';

    const two = document.createElement("div");
    two.className = "hero-float-card two";
    two.innerHTML = '<strong>✓</strong><span>Uses approved business information</span>';

    tray.append(one, two);
    const clarification = heroVisual.querySelector(".demo-clarification");
    if (clarification) heroVisual.insertBefore(tray, clarification);
    else heroVisual.append(tray);
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

  function streamlineDemoSection() {
    const form = document.querySelector("[data-industry-demo-form]");
    if (!form) return;

    const section = form.closest("section");
    if (!section) return;

    section.querySelectorAll(".demo-safety-panel").forEach((panel) => panel.remove());

    const heading = section.querySelector("[data-industry-demo-heading]");
    if (heading) {
      const title = heading.querySelector("h2");
      const copy = heading.querySelector("p");
      if (title) title.textContent = "Request Your 3-Day Demo";
      if (copy) copy.textContent = "Send us your website and we’ll prepare a private, personalized preview.";
    }

    const submit = form.querySelector('button[type="submit"]');
    if (submit && !submit.disabled) submit.textContent = "Request My 3-Day Demo";

    const copyColumn = section.querySelector(".dental-booking-copy");
    if (copyColumn && !copyColumn.querySelector(".demo-trust-compact")) {
      const panel = document.createElement("div");
      panel.className = "demo-trust-compact";
      panel.innerHTML = `
        <span>✓ Personalized to your business</span>
        <span>✓ Review before deciding</span>
        <span>✓ No setup fee</span>
        <span>✓ No live-site changes during the demo</span>`;
      const email = copyColumn.querySelector(".dental-email-link");
      if (email) email.insertAdjacentElement("beforebegin", panel);
      else copyColumn.appendChild(panel);
    }

    section.querySelectorAll("[data-industry-request-button]").forEach((button) => {
      if (button.getAttribute("aria-disabled") !== "true") button.textContent = "Request Your 3-Day Demo";
    });
  }

  function removeRepeatedLaunchSection() {
    const launch = document.querySelector(".launch-section");
    if (launch) launch.remove();
  }

  function normalizeFooterIndustries() {
    const footer = document.querySelector(".site-footer");
    if (!footer) return;
    const columns = footer.querySelectorAll(".footer-grid > div");
    const exploreColumn = [...columns].find((column) => column.querySelector(".footer-heading")?.textContent.trim().toLowerCase() === "explore");
    const links = exploreColumn && exploreColumn.querySelector(".footer-links");
    if (!links) return;

    links.innerHTML = `
      <a href="/">Home</a>
      <a href="/dental">Dental</a>
      <a href="/physio">Physio / Rehab</a>
      <a href="/plumbing">Plumbing</a>
      <a href="/hvac">HVAC</a>
      <a href="/automotive">Automotive</a>
      <a href="/privacy">Privacy</a>
      <a href="/security">Security & Data</a>
      <a href="/terms">Terms</a>`;
  }

  function normalizeInternalLinks() {
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      const [path, hash = ""] = href.split("#");
      const clean = cleanRoutes[path];
      if (!clean) return;
      link.setAttribute("href", `${clean}${hash ? `#${hash}` : ""}`);
    });
  }

  enhanceHero();
  addTrustRibbon();
  addTrustSection();
  streamlineDemoSection();
  removeRepeatedLaunchSection();
  normalizeFooterIndustries();
  normalizeInternalLinks();

  const polishScript = document.createElement("script");
  polishScript.src = "global-polish.js?v=1.0.0";
  polishScript.async = true;
  document.head.appendChild(polishScript);
})();