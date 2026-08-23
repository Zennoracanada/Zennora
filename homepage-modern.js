"use strict";

(function applyZennoraHomepageModernDesign() {
  if (document.body.dataset.demoType !== "general") return;
  if (document.body.classList.contains("zennora-modern")) return;

  document.body.classList.add("zennora-modern");

  ["homepage-modern.css?v=1.0.1", "industry-visuals.css?v=1.1.0"].forEach((href) => {
    const stylesheet = document.createElement("link");
    stylesheet.rel = "stylesheet";
    stylesheet.href = href;
    document.head.appendChild(stylesheet);
  });

  const icon = {
    dental: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M16 7c-5 0-8 4-8 10 0 6 3 10 5 15 2 5 3 9 6 9 3 0 3-8 5-8s2 8 5 8c3 0 4-4 6-9 2-5 5-9 5-15 0-6-3-10-8-10-3 0-5 2-8 2s-5-2-8-2Z"/></svg>',
    physio: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="10" r="5"/><path d="M16 21c4-3 12-3 16 0M24 16v14M17 28l7 2 7-2M24 30l-7 11M24 30l7 11"/></svg>',
    plumbing: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 14h16v7H15v8c0 5 4 9 9 9s9-4 9-9v-8h6"/><path d="M33 14h8v7h-8zM12 10v4M22 10v4"/></svg>',
    hvac: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="7" y="9" width="34" height="27" rx="4"/><path d="M12 17h24M16 23h16"/><circle cx="24" cy="30" r="3"/><path d="M24 27v-5M21.5 28.5l-4-2.5M26.5 28.5l4-2.5M21.5 31.5l-4 2.5M26.5 31.5l4 2.5"/></svg>',
    automotive: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 30l3-10 5-5h14l5 5 3 10v7h-5v-4H14v4H9v-7Z"/><path d="M13 22h22M16 28h4M28 28h4"/><circle cx="17" cy="33" r="1.5" fill="currentColor" stroke="none"/><circle cx="31" cy="33" r="1.5" fill="currentColor" stroke="none"/></svg>'
  };

  function enhanceHero() {
    const heroVisual = document.querySelector(".hero-visual.interactive-demo");
    const card = heroVisual && heroVisual.querySelector(".chat-card.demo-card");
    if (!heroVisual || !card || heroVisual.querySelector(".product-browser-shell")) return;
    const shell = document.createElement("div"); shell.className = "product-browser-shell";
    shell.innerHTML = `<div class="product-browser-toolbar"><span class="product-browser-dots"><i></i><i></i><i></i></span><span class="product-browser-address">yourbusiness.ca · Zennora live assistant</span></div><div class="product-browser-sitebar"><span class="product-browser-brand"><b>Z</b> Your Business</span><span class="product-browser-nav"><span>Services</span><span>About</span><span>Contact</span></span></div>`;
    card.parentNode.insertBefore(shell, card); shell.appendChild(card);
    const tray = document.createElement("div"); tray.className = "hero-float-tray";
    const one = document.createElement("div"); one.className = "hero-float-card one"; one.innerHTML = '<strong>24/7</strong><span>Answers while your team is busy</span>';
    const two = document.createElement("div"); two.className = "hero-float-card two"; two.innerHTML = '<strong>✓</strong><span>Guides visitors to the next step</span>';
    tray.append(one, two); heroVisual.append(tray);
  }

  function addTrustRibbon() {
    if (document.querySelector(".trust-ribbon")) return; const proof = document.querySelector(".proof-bar"); if (!proof) return;
    const ribbon = document.createElement("section"); ribbon.className = "trust-ribbon"; ribbon.setAttribute("aria-label", "Zennora trust highlights");
    ribbon.innerHTML = `<div class="container trust-ribbon-grid"><div class="trust-ribbon-item"><span class="trust-icon">🇨🇦</span><div><strong>Built & supported in Canada</strong><span>Local, direct support from Zennora</span></div></div><div class="trust-ribbon-item"><span class="trust-icon">✓</span><div><strong>Business-approved answers</strong><span>Configured around your information</span></div></div><div class="trust-ribbon-item"><span class="trust-icon">↗</span><div><strong>Human handoff when needed</strong><span>Clear paths to your team</span></div></div><div class="trust-ribbon-item"><span class="trust-icon">◌</span><div><strong>Review before launch</strong><span>No live changes during your demo</span></div></div></div>`; proof.insertAdjacentElement("afterend", ribbon);
  }

  function addProductStory() {
    if (document.querySelector("#product-story")) return; const industries = document.querySelector("#industries"); if (!industries) return;
    const section = document.createElement("section"); section.className = "section product-story-section"; section.id = "product-story";
    section.innerHTML = `<div class="container product-story-grid"><div class="product-story-copy"><div class="section-head"><div class="eyebrow">See the workflow</div><h2>From a website question to a useful next step.</h2><p>Zennora is designed to do more than display a chat bubble. It helps a visitor understand what to do next while keeping your team in control of the information and handoff.</p></div><div class="product-story-points"><div class="product-story-point"><b>1</b><div><strong>A customer asks a real question</strong><span>Hours, services, availability, booking, pricing guidance or another common inquiry.</span></div></div><div class="product-story-point"><b>2</b><div><strong>Zennora responds from approved information</strong><span>The assistant follows the knowledge, tone and boundaries configured for your business.</span></div></div><div class="product-story-point"><b>3</b><div><strong>The visitor reaches the right action</strong><span>Booking, calling, requesting a quote or leaving an inquiry for staff follow-up.</span></div></div></div></div><div class="product-flow-window" aria-label="Illustration of the Zennora customer workflow"><div class="flow-line"></div><div class="flow-stage-label">Example website conversation</div><div class="flow-stack"><div class="flow-card question"><small>Website visitor</small><p>“Do you have availability this week?”</p></div><div class="flow-card answer"><small>Zennora AI Receptionist</small><p>“I can help you find the right next step. Here are the booking and contact options your business has approved.”</p><span class="flow-action">View booking options →</span></div><div class="flow-card lead"><small>Staff notification</small><p><strong>New inquiry captured</strong><br>Customer details and request are ready for follow-up.</p></div></div></div></div>`;
    industries.insertAdjacentElement("beforebegin", section);
  }

  function modernizeIndustries() {
    const grid = document.querySelector("#industries .industry-grid"); if (!grid || grid.querySelector(".modern-industry-card")) return;
    const cards = [["dental","/dental","Dental clinics","New-patient questions, services and booking guidance.",icon.dental],["physio","/physio","Physiotherapy & rehab","Appointment guidance, services and common patient FAQs.",icon.physio],["plumbing","/plumbing","Plumbing","Service questions, urgent routing and quote requests.",icon.plumbing],["hvac","/hvac","HVAC","Heating, cooling, maintenance and estimate inquiries.",icon.hvac],["automotive","/automotive","Automotive service","Service questions, hours, booking and quote guidance.",icon.automotive]];
    grid.innerHTML = cards.map(([type,href,title,copy,svg]) => `<a class="modern-industry-card ${type}" href="${href}"><span class="modern-industry-visual"><span class="modern-industry-icon">${svg}</span></span><h3>${title}</h3><p>${copy}</p><span class="modern-industry-link">Explore solution →</span></a>`).join("");
  }

  function addTrustSection() {
    if (document.querySelector("#zennora-trust")) return; const pricing = document.querySelector("#pricing"); if (!pricing) return;
    const section = document.createElement("section"); section.className = "section modern-trust-section"; section.id = "zennora-trust";
    section.innerHTML = `<div class="container modern-trust-grid"><div class="modern-trust-copy"><div class="eyebrow">Built for controlled adoption</div><h2>See how it behaves before anything changes on your live website.</h2><p>Your personalized demo is prepared privately using public business information and relevant customer scenarios. You can review the answers, tone and next-step guidance before deciding whether to launch.</p><p class="modern-trust-contact">Questions before requesting a demo? Email <a href="mailto:hello@zennora.ca">hello@zennora.ca</a>.</p></div><div class="modern-trust-cards"><div class="modern-trust-card"><b>✓</b><strong>Approved information</strong><span>Responses are configured around information your business provides or approves.</span></div><div class="modern-trust-card"><b>↗</b><strong>Clear handoff</strong><span>Visitors can be directed to a person when the question needs human attention.</span></div><div class="modern-trust-card"><b>◌</b><strong>Private review first</strong><span>Your demo can be reviewed before any script is added to the live site.</span></div><div class="modern-trust-card"><b>🇨🇦</b><strong>Canada-based support</strong><span>Zennora is built and supported for Canadian service businesses.</span></div></div></div>`; pricing.insertAdjacentElement("beforebegin", section);
  }

  function addDemoSafetyPanel() {
    if (document.querySelector(".demo-safety-panel")) return; const contact = document.querySelector("#contact"); const head = contact && contact.querySelector(".section-head"); if (!contact || !head) return;
    const panel = document.createElement("div"); panel.className = "demo-safety-panel";
    panel.innerHTML = `<div><h3>A low-risk way to see Zennora working.</h3><p>Requesting a demo does not change your website. We prepare a private preview first so you can decide whether the experience is right for your business.</p></div><div class="demo-safety-list"><span>Personalized to your business</span><span>Review before deciding</span><span>No setup fee</span><span>No live-site changes during the demo</span></div>`; head.insertAdjacentElement("afterend", panel);
  }

  function addTrustNavLink() {
    const nav = document.querySelector(".site-header nav"); if (!nav || nav.querySelector('a[href="#zennora-trust"]')) return; const pricingLink = nav.querySelector('a[href="#pricing"]'); const trustLink = document.createElement("a"); trustLink.href = "#zennora-trust"; trustLink.textContent = "Trust"; if (pricingLink) pricingLink.insertAdjacentElement("beforebegin", trustLink); else nav.appendChild(trustLink);
  }

  function normalizeFooterIndustries() {
    const footer = document.querySelector(".site-footer"); if (!footer) return; const columns = footer.querySelectorAll(".footer-grid > div"); const exploreColumn = [...columns].find((column) => column.querySelector(".footer-heading")?.textContent.trim().toLowerCase() === "explore"); const links = exploreColumn && exploreColumn.querySelector(".footer-links"); if (!links) return;
    links.innerHTML = `<a href="#solutions">What Zennora does</a><a href="#pricing">Pricing</a><a href="/dental">Dental</a><a href="/physio">Physio / Rehab</a><a href="/plumbing">Plumbing</a><a href="/hvac">HVAC</a><a href="/automotive">Automotive</a><a href="#faq">FAQ</a><a href="/privacy">Privacy</a><a href="/security">Security & Data</a><a href="/terms">Terms</a>`;
  }

  enhanceHero(); addTrustRibbon(); addProductStory(); modernizeIndustries(); addTrustSection(); addDemoSafetyPanel(); addTrustNavLink(); normalizeFooterIndustries();
  const polishScript = document.createElement("script"); polishScript.src = "global-polish.js?v=1.0.0"; polishScript.async = true; document.head.appendChild(polishScript);
})();
