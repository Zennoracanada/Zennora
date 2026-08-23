"use strict";

(function applyZennoraGlobalPolish() {
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

  const pathname = window.location.pathname || "/";
  const filename = pathname.split("/").pop() || "";
  const cleanPath = cleanRoutes[filename] || pathname;
  const canonicalUrl = `https://zennora.ca${cleanPath === "/" ? "/" : cleanPath}`;
  const socialImage = "https://zennora.ca/assets/og-zennora.svg";

  function setMeta(selector, attribute, value) {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement("meta");
      if (selector.includes("property=")) element.setAttribute("property", selector.match(/property=['\"]([^'\"]+)/)?.[1] || "");
      else element.setAttribute("name", selector.match(/name=['\"]([^'\"]+)/)?.[1] || "");
      document.head.appendChild(element);
    }
    element.setAttribute(attribute, value);
  }

  const canonical = document.head.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = canonicalUrl;
  setMeta('meta[property="og:url"]', "content", canonicalUrl);
  setMeta('meta[property="og:image"]', "content", socialImage);
  setMeta('meta[name="twitter:card"]', "content", "summary_large_image");
  setMeta('meta[name="twitter:image"]', "content", socialImage);

  document.querySelectorAll("a[href]").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("#")) return;
    const hashIndex = href.indexOf("#");
    const path = hashIndex >= 0 ? href.slice(0, hashIndex) : href;
    const hash = hashIndex >= 0 ? href.slice(hashIndex) : "";
    const clean = cleanRoutes[path];
    if (clean) link.setAttribute("href", `${clean}${hash}`);
  });

  const footer = document.querySelector(".site-footer");
  if (footer) {
    const columns = footer.querySelectorAll(".footer-grid > div");
    const exploreColumn = [...columns].find((column) => column.querySelector(".footer-heading")?.textContent.trim().toLowerCase() === "explore");
    const links = exploreColumn && exploreColumn.querySelector(".footer-links");
    if (links) {
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
  }

  const primaryDemoSelectors = [
    "[data-industry-request-button]",
    ".nav-actions > a.button",
    ".hero-content .button-row > a.button:first-child",
    ".launch-section a.button",
    ".dental-request-button"
  ];

  document.querySelectorAll(primaryDemoSelectors.join(",")).forEach((button) => {
    if (button.getAttribute("aria-disabled") === "true") return;
    if (/demo/i.test(button.textContent || "")) button.textContent = "Request Your 3-Day Demo";
  });

  document.querySelectorAll("#general-demo-request-form button[type='submit'], [data-industry-demo-form] button[type='submit']").forEach((button) => {
    if (!button.disabled) button.textContent = "Request My 3-Day Demo";
  });
})();
