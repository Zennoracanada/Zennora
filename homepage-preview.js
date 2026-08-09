"use strict";

function setupGeneralHomepageDemo() {
  if (document.body.dataset.demoType !== "general") return;

  const demoFormEndpoint = "https://script.google.com/macros/s/AKfycbzZKqpsqVa5vloA3mEZyCtQ2etgRFTVx9bAWOUJmhPB6e6LkrWDXVDtLSPTmGL8E-s2/exec";

  function replaceWithDemoLink(element, label, extraClass = "") {
    if (!element) return null;
    const link = document.createElement("a");
    link.className = `${element.className.replace(/\bcalendly-trigger\b/g, "").replace(/\s+/g, " ").trim()} ${extraClass}`.trim();
    link.href = "#contact";
    link.textContent = label;
    element.replaceWith(link);
    return link;
  }

  replaceWithDemoLink(
    document.querySelector(".nav-actions .calendly-trigger"),
    "Request Free Demo"
  );

  replaceWithDemoLink(
    document.querySelector(".hero-content .button-row .calendly-trigger"),
    "Request Your Free 3-Day Demo"
  );

  const interactiveDemoCta = document.querySelector("[data-demo-cta]");
  if (interactiveDemoCta) {
    interactiveDemoCta.href = "#contact";
    interactiveDemoCta.firstChild.textContent = "Request a personalized demo for your business ";
  }

  const launchBenefit = document.querySelector(".launch-benefits span");
  if (launchBenefit) launchBenefit.textContent = "✓ 3-day personalized demo";

  replaceWithDemoLink(
    document.querySelector("#launch-offer .calendly-trigger"),
    "Request Your Free Demo"
  );

  const bookingSection = document.querySelector("#booking");
  if (bookingSection) {
    const eyebrow = bookingSection.querySelector(".eyebrow");
    const heading = bookingSection.querySelector("h2");
    const copy = bookingSection.querySelector("p");
    const button = bookingSection.querySelector(".calendly-trigger");
    if (eyebrow) eyebrow.textContent = "Optional 30-minute walkthrough";
    if (heading) heading.textContent = "Prefer a guided walkthrough?";
    if (copy) copy.textContent = "Book a convenient time for a practical walkthrough tailored to your business.";
    if (button) button.textContent = "Book a 30-Minute Walkthrough";
  }

  replaceWithDemoLink(
    document.querySelector(".site-footer .cally-trigger"),
    "Request Free Demo"
  );

  const contactSection = document.querySelector("#contact");
  const leadForm = document.querySelector("#lead-form");
  if (!contactSection || !leadForm) return;

  const contactEyebrow = contactSection.querySelector(".section-head .eyebrow");
  const contactHeading = contactSection.querySelector(".section-head h2");
  const contactCopy = contactSection.querySelector(".section-head p");
  const contactDetails = contactSection.querySelector(".contact-details");

  if (contactEyebrow) contactEyebrow.textContent = "Free 3-day personalized demo";
  if (contactHeading) contactHeading.textContent = "See Zennora on your website.";
  if (contactCopy) {
    contactCopy.textContent = "No meeting required. Send us your website and we’ll prepare a personalized Zennora demo using publicly available information from your site.";
  }
  if (contactDetails) {
    contactDetails.innerHTML = `
      <p><strong>Email</strong><br><a href="mailto:${SITE_CONFIG.contactEmail}" aria-label="Email Zennora at ${SITE_CONFIG.contactEmail}">${SITE_CONFIG.contactEmail}</a></p>
      <p><strong>What happens next</strong><br>We review your public website information and email you when your personalized demo is ready.</p>
    `;
  }

  leadForm.id = "general-demo-request-form";
  leadForm.action = demoFormEndpoint;
  leadForm.method = "post";
  leadForm.target = "zennora-general-demo-response";
  leadForm.noValidate = true;
  leadForm.innerHTML = `
    <div class="field"><label for="general-contact-name">Contact Name *</label><input id="general-contact-name" name="contactName" type="text" autocomplete="name" required></div>
    <div class="field"><label for="general-business-name">Business Name *</label><input id="general-business-name" name="clinicName" type="text" autocomplete="organization" required></div>
    <div class="field"><label for="general-website">Website *</label><input id="general-website" name="clinicWebsite" type="text" inputmode="url" autocomplete="url" placeholder="examplebusiness.ca" aria-describedby="general-website-error" required><p class="field-error" id="general-website-error" aria-live="polite" hidden>Please enter a valid website, for example: examplebusiness.ca</p></div>
    <div class="field"><label for="general-work-email">Work Email *</label><input id="general-work-email" name="workEmail" type="email" inputmode="email" autocomplete="email" required></div>
    <div class="field"><label for="general-phone">Phone <span>(optional)</span></label><input id="general-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel"></div>
    <div class="field"><label for="general-help-with">What would you like Zennora to help with? <span>(optional)</span></label><textarea id="general-help-with" name="helpWith"></textarea></div>
    <input type="hidden" name="source" value="Homepage">
    <div class="demo-honeypot" aria-hidden="true"><label for="general-company-website">Company Website</label><input id="general-company-website" name="companyWebsite" type="text" tabindex="-1" autocomplete="off"></div>
    <p class="form-note">Please don't include medical, payment, or other sensitive information. We'll use the details above only to prepare and contact you about your Zennora demo.</p>
    <button class="button" type="submit">Request My Free Demo</button>
  `;

  const success = document.createElement("div");
  success.className = "contact-form dental-demo-success";
  success.id = "general-demo-success";
  success.setAttribute("role", "status");
  success.setAttribute("tabindex", "-1");
  success.hidden = true;
  success.innerHTML = `
    <div class="success-mark" aria-hidden="true">✓</div>
    <h2>Your demo request has been received!</h2>
    <p>Thanks for your interest in Zennora. We'll review your website and email your personalized demo when it's ready.</p>
    <p><strong>Your free 3-day demo begins when we send you access — not when you submit this request.</strong></p>
    <p>No meeting is required.</p>
  `;

  const responseFrame = document.createElement("iframe");
  responseFrame.className = "demo-response-frame";
  responseFrame.name = "zennora-general-demo-response";
  responseFrame.title = "Demo request submission response";

  leadForm.insertAdjacentElement("afterend", success);
  success.insertAdjacentElement("afterend", responseFrame);

  const submitButton = leadForm.querySelector('button[type="submit"]');
  const websiteField = leadForm.querySelector('[name="clinicWebsite"]');
  const websiteError = leadForm.querySelector("#general-website-error");
  const submitButtonLabel = submitButton.textContent;
  let submitted = false;

  function normalizeWebsite(value) {
    const trimmedValue = value.trim();
    return /^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`;
  }

  function isValidWebsite(value) {
    if (!value || /\s/.test(value)) return false;

    try {
      const website = new URL(normalizeWebsite(value));
      const domainPattern = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})$/i;
      return /^https?:$/.test(website.protocol) && !website.username && !website.password && domainPattern.test(website.hostname);
    } catch (error) {
      return false;
    }
  }

  function showWebsiteError(show) {
    websiteError.hidden = !show;
    websiteField.setAttribute("aria-invalid", String(show));
  }

  websiteField.addEventListener("input", () => showWebsiteError(false));

  leadForm.addEventListener("submit", (event) => {
    if (submitted) {
      event.preventDefault();
      return;
    }

    if (!isValidWebsite(websiteField.value)) {
      event.preventDefault();
      showWebsiteError(true);
      websiteField.focus();
      return;
    }

    showWebsiteError(false);
    websiteField.value = normalizeWebsite(websiteField.value);

    if (!leadForm.checkValidity()) {
      event.preventDefault();
      leadForm.reportValidity();
      return;
    }

    submitted = true;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  });

  responseFrame.addEventListener("load", () => {
    if (!submitted) return;
    submitButton.textContent = submitButtonLabel;
    submitButton.disabled = false;
    leadForm.hidden = true;
    success.hidden = false;
    success.classList.add("visible");
    success.focus({ preventScroll: true });
  });
}

setupGeneralHomepageDemo();
