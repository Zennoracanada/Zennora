"use strict";

if (document.body.dataset.demoType === "general") {
  const footerButton = document.querySelector(".site-footer .calendly-trigger");
  if (footerButton) {
    const link = document.createElement("a");
    link.className = footerButton.className.replace(/\bcalendly-trigger\b/g, "").replace(/\s+/g, " ").trim();
    link.href = "#contact";
    link.textContent = "Request Free Demo";
    footerButton.replaceWith(link);
  }
}
