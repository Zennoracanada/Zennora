"use strict";

(function setupIndustryPage() {
  const type = document.body.dataset.demoType || "";

  const scenariosByType = {
    physio: [
      { label: "New patient", question: "I'm a new patient. How do I get started?", answer: "I can explain the clinic's approved new-patient process and guide you to the right booking or contact option." },
      { label: "Referral", question: "Do I need a doctor's referral for physiotherapy?", answer: "I can share the clinic's general referral information. Requirements can vary by insurer or program, so plan-specific questions should be confirmed with the clinic or provider." },
      { label: "Direct billing", question: "Do you direct bill my insurance?", answer: "I can explain the clinic's approved direct-billing process and direct coverage-specific questions to the front desk." },
      { label: "ICBC / WorkSafe", question: "Do you see ICBC or WorkSafe patients?", answer: "I can confirm the programs the clinic says it supports and guide you to the clinic's approved intake or booking process." },
      { label: "Services", question: "Which treatment should I book for my injury?", answer: "I can explain the services the clinic offers, but I won't diagnose your injury. I can help you contact the clinic so the appropriate professional can guide you." },
      { label: "Book appointment", question: "Can I book an appointment online?", answer: "Yes. I can guide you to the clinic's booking page or approved contact option." },
      { label: "What to bring", question: "What should I bring to my first appointment?", answer: "I can share the clinic's approved checklist, such as identification, referral or claim information when applicable, and any forms the clinic asks patients to complete." },
      { label: "Urgent concern", question: "My pain suddenly became severe. What should I do?", answer: "I can share the clinic's approved urgent-contact guidance, but I can't diagnose symptoms. For severe or emergency symptoms, follow appropriate emergency-care guidance." }
    ],

    automotive: [
      { label: "Book service", question: "Can I book my car in for service?", answer: "Yes. I can guide you to the shop's booking page, phone number or preferred service-request process." },
      { label: "Oil change", question: "Do you offer oil changes?", answer: "I can confirm the services listed by the shop and guide you to booking or requesting more information." },
      { label: "Tires", question: "Can I book a tire change?", answer: "I can share the shop's tire-service information and direct you to its preferred booking or quote option." },
      { label: "Brake service", question: "Do you repair brakes?", answer: "I can confirm whether brake inspection or repair is listed among the shop's services and help you take the next step." },
      { label: "Warning light", question: "My check-engine light is on. What's wrong?", answer: "I can't diagnose the vehicle from a website conversation, but I can explain the shop's diagnostic service and help you arrange an inspection." },
      { label: "Request quote", question: "Can I get a quote before I book?", answer: "I can guide you to the shop's quote process or collect selected vehicle and contact details where that workflow is configured." },
      { label: "Drop-off", question: "Can I drop off my vehicle after hours?", answer: "I can share the shop's approved drop-off instructions, hours and contact information when those details are available." },
      { label: "Price question", question: "How much will this repair cost?", answer: "I can share published pricing or estimate information if the shop provides it, but final repair costs may depend on inspection, parts and approval from the shop." }
    ],

    plumbing: [
      { label: "Emergency service", question: "Do you offer emergency plumbing service?", answer: "I can share the company's approved emergency-service availability and direct you to the fastest contact option." },
      { label: "Leaking pipe", question: "I have a leaking pipe. Can someone come today?", answer: "I can share the company's approved service-request process and available urgent-contact options without trying to diagnose the issue." },
      { label: "Blocked drain", question: "Do you clear blocked drains?", answer: "I can confirm whether drain cleaning is listed among the company's services and guide you to the right booking or call option." },
      { label: "Water heater", question: "Do you repair or replace water heaters?", answer: "I can explain the company's published water-heater services and guide you toward a service request or estimate." },
      { label: "Service area", question: "Do you service my area?", answer: "I can check the company's published service cities or regions and tell you the approved next step." },
      { label: "Request quote", question: "Can I get a plumbing quote?", answer: "I can guide you to the company's quote form or collect selected inquiry details where that workflow is configured." },
      { label: "Price question", question: "How much will the repair cost?", answer: "I can share published pricing or estimate information when available, but final pricing may depend on an on-site assessment and approved scope." },
      { label: "After hours", question: "Can I leave a service request after hours?", answer: "Yes. I can guide you to the company's approved after-hours contact or inquiry process." }
    ],

    hvac: [
      { label: "AC not cooling", question: "My air conditioner is running but not cooling. Can someone help?", answer: "I can explain the company's approved repair-service options and guide you to the fastest booking or contact method." },
      { label: "Furnace repair", question: "Do you repair furnaces?", answer: "I can confirm the heating-repair services listed by the company and guide you to book or call." },
      { label: "Heat pumps", question: "Do you install heat pumps?", answer: "I can confirm whether heat-pump installation is offered and guide you toward the company's estimate process." },
      { label: "Installation estimate", question: "Can I get an estimate for a new HVAC system?", answer: "I can guide you to the company's estimate process or collect selected project and contact details where configured." },
      { label: "Maintenance plan", question: "Do you offer maintenance plans?", answer: "I can explain published maintenance, tune-up or membership options using company-approved information." },
      { label: "Service area", question: "Do you service my city?", answer: "I can answer using the company's published service area and direct you to the correct booking or contact option." },
      { label: "Rebates", question: "Are there rebates for a heat pump?", answer: "I can share company-approved general rebate information and direct you to the appropriate official or company resource for current eligibility details." },
      { label: "Urgent service", question: "We have no heat. Can someone come today?", answer: "I can share the company's approved urgent-service information and contact pathway without trying to diagnose the equipment remotely." }
    ]
  };

  function applyIndustryTrustUpdates() {
    const isClinic = type === "physio";
    const setupPanel = document.querySelector(".setup-fee-panel");
    if (setupPanel) {
      const label = setupPanel.querySelector(".setup-label");
      const price = setupPanel.querySelector("strong");
      const copy = setupPanel.querySelector("p");
      if (label) label.textContent = "Setup and onboarding";
      if (price) price.textContent = "No setup fee";
      if (copy) copy.textContent = isClinic
        ? "Knowledge-base setup, workflow configuration, testing, booking/contact setup, installation guidance and launch support are included."
        : "Knowledge-base setup, workflow configuration, testing, booking/contact setup, installation guidance and launch support are included.";
    }

    const launch = document.querySelector(".launch-section");
    if (launch) {
      const eyebrow = launch.querySelector(".eyebrow.light");
      const copy = launch.querySelector("p");
      const benefits = launch.querySelectorAll(".launch-benefits span");
      if (eyebrow) eyebrow.textContent = "Personalized 3-day demo";
      if (copy) copy.textContent = isClinic
        ? "We prepare an unlisted demonstration using public clinic information and relevant patient scenarios so you can review Zennora before making any live website changes."
        : "We prepare an unlisted demonstration using public business information and relevant customer scenarios so you can review Zennora before making any live website changes.";
      if (benefits[0]) benefits[0].textContent = "✓ 3-day personalized demo";
      if (benefits[1]) benefits[1].textContent = "✓ No setup fee";
      if (benefits[2]) benefits[2].textContent = "✓ Review before deciding";
      if (benefits[3]) benefits[3].textContent = "✓ Launch support included";
      if (benefits[4]) benefits[4].textContent = "✓ No live website changes during the demo";
    }
  }

  applyIndustryTrustUpdates();

  function initializeIndustryDemo(demo) {
    const scenarios = scenariosByType[type];
    if (!scenarios || !scenarios.length) return;

    const actions = demo.querySelector("[data-industry-demo-actions]");
    const question = demo.querySelector("[data-industry-demo-question]");
    const answer = demo.querySelector("[data-industry-demo-answer]");
    const typing = demo.querySelector(".demo-typing");

    if (!actions || !question || !answer || !typing) return;

    let activeIndex = 0;
    let autoTimer = null;
    let switchTimer = null;
    let userInteracted = false;

    const buttons = scenarios.map((scenario, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "demo-chip";
      button.textContent = scenario.label;
      button.setAttribute("aria-pressed", index === 0 ? "true" : "false");
      button.addEventListener("click", () => {
        userInteracted = true;
        if (autoTimer) window.clearInterval(autoTimer);
        showScenario(index);
      });
      actions.appendChild(button);
      return button;
    });

    function showScenario(index, immediate = false) {
      if (switchTimer) window.clearTimeout(switchTimer);
      activeIndex = index;

      buttons.forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle("active", active);
        button.setAttribute("aria-pressed", String(active));
      });

      const scenario = scenarios[index];
      question.classList.add("switching");
      answer.classList.add("switching");
      answer.hidden = true;
      typing.hidden = false;

      switchTimer = window.setTimeout(() => {
        question.textContent = scenario.question;
        answer.textContent = scenario.answer;
        question.classList.remove("switching");

        window.setTimeout(() => {
          typing.hidden = true;
          answer.hidden = false;
          answer.classList.remove("switching");
        }, immediate ? 0 : 650);
      }, immediate ? 0 : 350);
    }

    showScenario(0, true);

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      autoTimer = window.setInterval(() => {
        if (!userInteracted && document.visibilityState === "visible") {
          showScenario((activeIndex + 1) % scenarios.length);
        }
      }, 7000);
    }

    demo.addEventListener("pointerenter", () => {
      if (autoTimer) window.clearInterval(autoTimer);
    }, { once: true });
  }

  document.querySelectorAll("[data-industry-demo]").forEach(initializeIndustryDemo);

  const form = document.querySelector("[data-industry-demo-form]");
  const frame = document.querySelector("[data-industry-demo-frame]");
  const success = document.querySelector("[data-industry-demo-success]");
  const heading = document.querySelector("[data-industry-demo-heading]");
  const requestButtons = document.querySelectorAll("[data-industry-request-button]");

  if (!form || !frame || !success || !heading) return;

  const submitButton = form.querySelector('button[type="submit"]');
  const websiteField = form.querySelector('[name="clinicWebsite"]');
  const websiteError = form.querySelector("[data-industry-website-error]");
  const submitButtonLabel = submitButton ? submitButton.textContent : "Request My Free Demo";
  let submitted = false;
  let leadTracked = false;

  function normalizeWebsite(value) {
    const trimmed = String(value || "").trim();
    return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  }

  function validWebsite(value) {
    if (!value || /\s/.test(value)) return false;

    try {
      const url = new URL(normalizeWebsite(value));
      const domainPattern = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})$/i;
      return /^https?:$/.test(url.protocol) && !url.username && !url.password && domainPattern.test(url.hostname);
    } catch (_) {
      return false;
    }
  }

  function showWebsiteError(show) {
    if (websiteError) websiteError.hidden = !show;
    if (websiteField) websiteField.setAttribute("aria-invalid", String(show));
  }

  if (websiteField) {
    websiteField.addEventListener("input", () => showWebsiteError(false));
  }

  form.addEventListener("submit", (event) => {
    if (submitted) {
      event.preventDefault();
      return;
    }

    if (!websiteField || !validWebsite(websiteField.value)) {
      event.preventDefault();
      showWebsiteError(true);
      if (websiteField) websiteField.focus();
      return;
    }

    showWebsiteError(false);
    websiteField.value = normalizeWebsite(websiteField.value);

    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }

    submitted = true;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Sending...";
    }
  });

  frame.addEventListener("load", () => {
    if (!submitted) return;

    if (!leadTracked && typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        lead_source: type || "industry",
        form_name: `${type || "industry"}_demo_request`
      });
      leadTracked = true;
    }

    if (submitButton) {
      submitButton.textContent = submitButtonLabel;
      submitButton.disabled = false;
    }

    heading.hidden = true;
    form.hidden = true;
    success.hidden = false;

    requestButtons.forEach((button) => {
      button.textContent = "✓ Demo Requested";
      button.removeAttribute("href");
      button.setAttribute("aria-disabled", "true");
    });

    success.focus({ preventScroll: true });
  });

  const modernScript = document.createElement("script");
  modernScript.src = "industry-modern.js?v=1.4.0";
  modernScript.async = true;
  document.head.appendChild(modernScript);
})();