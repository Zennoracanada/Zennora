"use strict";

(function setupHomepageDemo() {
  if (document.body.dataset.demoType !== "general") return;

  const demoEndpoint = "https://script.google.com/macros/s/AKfycbzZKqpsqVa5vloA3mEZyCtQ2etgRFTVx9bAWOUJmhPB6e6LkrWDXVDtLSPTmGL8E-s2/exec";

  function replaceButton(selector, label) {
    const button = document.querySelector(selector);
    if (!button) return;
    const link = document.createElement("a");
    link.className = button.className.replace(/\bcalendly-trigger\b/g, "").replace(/\s+/g, " ").trim();
    link.href = "#contact";
    link.textContent = label;
    button.replaceWith(link);
  }

  replaceButton(".nav-actions .calendly-trigger", "Request Free Demo");
  replaceButton(".hero-content .button-row .calendly-trigger", "Request Your Free 3-Day Demo");
  replaceButton("#launch-offer .calendly-trigger", "Request Your Free Demo");
  replaceButton(".site-footer .calendly-trigger", "Request Free Demo");

  const demoCta = document.querySelector("[data-demo-cta]");
  if (demoCta) {
    demoCta.href = "#contact";
    demoCta.textContent = "Request a personalized demo for your business →";
  }

  const firstLaunchBenefit = document.querySelector(".launch-benefits span");
  if (firstLaunchBenefit) firstLaunchBenefit.textContent = "✓ 3-day personalized demo";

  // Turn the existing industry cards into dedicated solution links without
  // changing the underlying homepage layout.
  document.querySelectorAll("#industries .industry-card").forEach((card) => {
    const heading = card.querySelector("h3");
    if (!heading || card.tagName === "A") return;

    const title = heading.textContent.trim().toLowerCase();
    let href = "";
    let label = "";

    if (title === "health and wellness") {
      href = "physio.html";
      heading.textContent = "Physiotherapy & rehab";
      label = "Explore physio solution →";
    } else if (title === "automotive services") {
      href = "automotive.html";
      label = "Explore automotive solution →";
    }

    if (!href) return;

    const link = document.createElement("a");
    link.className = `${card.className} featured`;
    link.href = href;
    link.innerHTML = card.innerHTML + `<b>${label}</b>`;
    card.replaceWith(link);
  });

  const booking = document.querySelector("#booking");
  if (booking) {
    const eyebrow = booking.querySelector(".eyebrow");
    const heading = booking.querySelector("h2");
    const copy = booking.querySelector("p");
    const button = booking.querySelector(".calendly-trigger");
    if (eyebrow) eyebrow.textContent = "Optional 30-minute walkthrough";
    if (heading) heading.textContent = "Prefer a guided walkthrough?";
    if (copy) copy.textContent = "Book a convenient time for a practical walkthrough tailored to your business.";
    if (button) button.textContent = "Book a 30-Minute Walkthrough";
  }

  const contact = document.querySelector("#contact");
  const oldForm = document.querySelector("#lead-form");
  if (!contact || !oldForm) return;

  const eyebrow = contact.querySelector(".section-head .eyebrow");
  const heading = contact.querySelector(".section-head h2");
  const copy = contact.querySelector(".section-head p");
  const details = contact.querySelector(".contact-details");
  if (eyebrow) eyebrow.textContent = "Free 3-day personalized demo";
  if (heading) heading.textContent = "See Zennora on your website.";
  if (copy) copy.textContent = "No meeting required. Send us your website and we’ll prepare a personalized Zennora demo using publicly available information from your site.";
  if (details) details.innerHTML = '<p><strong>Email</strong><br><a href="mailto:hello@zennora.ca">hello@zennora.ca</a></p><p><strong>What happens next</strong><br>We review your public website information and email you when your personalized demo is ready.</p>';

  const form = document.createElement("form");
  form.className = "contact-form reveal visible";
  form.id = "general-demo-request-form";
  form.action = demoEndpoint;
  form.method = "post";
  form.target = "zennora-general-demo-response";
  form.noValidate = true;
  form.innerHTML = `
    <div class="field"><label for="general-contact-name">Contact Name *</label><input id="general-contact-name" name="contactName" type="text" autocomplete="name" required></div>
    <div class="field"><label for="general-business-name">Business Name *</label><input id="general-business-name" name="clinicName" type="text" autocomplete="organization" required></div>
    <div class="field"><label for="general-website">Website *</label><input id="general-website" name="clinicWebsite" type="text" inputmode="url" autocomplete="url" placeholder="examplebusiness.ca" required><p class="field-error" id="general-website-error" aria-live="polite" hidden>Please enter a valid website, for example: examplebusiness.ca</p></div>
    <div class="field"><label for="general-work-email">Work Email *</label><input id="general-work-email" name="workEmail" type="email" inputmode="email" autocomplete="email" required></div>
    <div class="field"><label for="general-phone">Phone <span>(optional)</span></label><input id="general-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel"></div>
    <div class="field"><label for="general-help-with">What would you like Zennora to help with? <span>(optional)</span></label><textarea id="general-help-with" name="helpWith"></textarea></div>
    <input type="hidden" name="source" value="Homepage">
    <div class="demo-honeypot" aria-hidden="true"><label for="general-company-website">Company Website</label><input id="general-company-website" name="companyWebsite" type="text" tabindex="-1" autocomplete="off"></div>
    <p class="form-note">Please don't include medical, payment, or other sensitive information. We'll use the details above only to prepare and contact you about your Zennora demo.</p>
    <button class="button" type="submit">Request My Free Demo</button>`;
  oldForm.replaceWith(form);

  const success = document.createElement("div");
  success.className = "contact-form dental-demo-success";
  success.id = "general-demo-success";
  success.setAttribute("role", "status");
  success.setAttribute("tabindex", "-1");
  success.hidden = true;
  success.innerHTML = '<div class="success-mark" aria-hidden="true">✓</div><h2>Your demo request has been received!</h2><p>Thanks for your interest in Zennora. We’ll review your website and email your personalized demo when it’s ready.</p><p><strong>Your free 3-day demo begins when we send you access — not when you submit this request.</strong></p><p>No meeting is required.</p>';

  const frame = document.createElement("iframe");
  frame.className = "demo-response-frame";
  frame.name = "zennora-general-demo-response";
  frame.title = "Demo request submission response";
  form.insertAdjacentElement("afterend", success);
  success.insertAdjacentElement("afterend", frame);

  const websiteField = form.querySelector('[name="clinicWebsite"]');
  const websiteError = form.querySelector("#general-website-error");
  const submitButton = form.querySelector('button[type="submit"]');
  let submitted = false;
  let leadTracked = false;

  function normalizeWebsite(value) {
    const valueTrimmed = value.trim();
    return /^https?:\/\//i.test(valueTrimmed) ? valueTrimmed : `https://${valueTrimmed}`;
  }

  function validWebsite(value) {
    if (!value || /\s/.test(value)) return false;
    try {
      const url = new URL(normalizeWebsite(value));
      const domain = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})$/i;
      return /^https?:$/.test(url.protocol) && !url.username && !url.password && domain.test(url.hostname);
    } catch (_) {
      return false;
    }
  }

  websiteField.addEventListener("input", () => {
    websiteError.hidden = true;
    websiteField.setAttribute("aria-invalid", "false");
  });

  form.addEventListener("submit", (event) => {
    if (submitted) {
      event.preventDefault();
      return;
    }
    if (!validWebsite(websiteField.value)) {
      event.preventDefault();
      websiteError.hidden = false;
      websiteField.setAttribute("aria-invalid", "true");
      websiteField.focus();
      return;
    }
    websiteField.value = normalizeWebsite(websiteField.value);
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }
    submitted = true;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  });

  frame.addEventListener("load", () => {
    if (!submitted) return;
    if (!leadTracked && typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        lead_source: "homepage",
        form_name: "general_demo_request"
      });
      leadTracked = true;
    }
    form.hidden = true;
    success.hidden = false;
    success.classList.add("visible");
    success.focus({ preventScroll: true });
  });
})();