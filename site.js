"use strict";

(function loadPreviewScripts() {
  const baseScript = document.createElement("script");
  baseScript.src = "https://zennora.ca/site.js?v=5.3.1";
  baseScript.async = false;

  baseScript.addEventListener("load", () => {
    if (document.body.dataset.demoType !== "general") return;

    const previewScript = document.createElement("script");
    previewScript.src = "homepage-preview.js?v=3";
    previewScript.async = false;
    document.head.appendChild(previewScript);
  });

  baseScript.addEventListener("error", () => {
    console.error("Could not load the base Zennora site script for preview.");
  });

  document.head.appendChild(baseScript);
})();
