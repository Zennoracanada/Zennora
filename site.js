"use strict";


// Google Analytics 4
(function initGoogleAnalytics() {
  const measurementId = "G-49EVPN51DB";
  const ownerOptOutKey = "zennora_ga4_owner_optout";
  const ownerParameter = "zennora_owner";
  const pageUrl = new URL(window.location.href);
  const ownerMode = pageUrl.searchParams.get(ownerParameter);
  let analyticsDisabled = ownerMode === "1";

  try {
    if (ownerMode === "1") {
      window.localStorage.setItem(ownerOptOutKey, "1");
    } else if (ownerMode === "0") {
      window.localStorage.removeItem(ownerOptOutKey);
    }

    analyticsDisabled = window.localStorage.getItem(ownerOptOutKey) === "1";
  } catch (error) {
    analyticsDisabled = ownerMode === "1";
  }

  if (ownerMode === "1" || ownerMode === "0") {
    pageUrl.searchParams.delete(ownerParameter);
    try {
      window.history.replaceState(null, "", `${pageUrl.pathname}${pageUrl.search}${pageUrl.hash}`);
    } catch (error) {
      // The opt-out still works even if the browser prevents URL cleanup.
    }
  }

  window[`ga-disable-${measurementId}`] = analyticsDisabled;
  if (analyticsDisabled) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  const script = document.createElement("script");
  script.async = true;
  script.src =
    "https://www.googletagmanager.com/gtag/js?id=" +
    encodeURIComponent(measurementId);

  document.head.appendChild(script);
})();


const SITE_CONFIG = Object.freeze({
  calendlyBaseUrl: "https://calendly.com/zennora/30min?hide_gdpr_banner=1",
  contactEmail: "hello@zennora.ca",
  calendlyPlans: Object.freeze({
    starter: Object.freeze({
      answer: "1",
      campaign: "starter_plan"
    }),
    growth: Object.freeze({
      answer: "2",
      campaign: "growth_plan"
    }),
    pro: Object.freeze({
      answer: "3",
      campaign: "pro_plan"
    }),
    general: Object.freeze({
      answer: "4",
      campaign: "not_sure"
    })
  })
});

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(open));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

(function applyDentalTrustUpdates() {
  if (document.body.dataset.demoType !== "dental") return;

  const setupPanel = document.querySelector(".setup-fee-panel");
  if (setupPanel) {
    const label = setupPanel.querySelector(".setup-label");
    const price = setupPanel.querySelector("strong");
    const copy = setupPanel.querySelector("p");
    if (label) label.textContent = "Setup and onboarding";
    if (price) price.textContent = "No setup fee";
    if (copy) copy.textContent = "Clinic knowledge-base setup, configuration, testing, booking-link setup, installation guidance and launch support are included.";
  }

  const launch = document.querySelector("#dental-launch");
  if (launch) {
    const eyebrow = launch.querySelector(".eyebrow.light");
    const copy = launch.querySelector("p");
    const benefits = launch.querySelectorAll(".launch-benefits span");
    if (eyebrow) eyebrow.textContent = "Personalized 3-day demo";
    if (copy) copy.textContent = "We prepare an unlisted demonstration using public clinic information and relevant patient scenarios so you can review Zennora before making any live website changes.";
    if (benefits[0]) benefits[0].textContent = "✓ 3-day personalized demo";
    if (benefits[1]) benefits[1].textContent = "✓ No setup fee";
    if (benefits[2]) benefits[2].textContent = "✓ Review before deciding";
    if (benefits[3]) benefits[3].textContent = "✓ Launch support included";
    if (benefits[4]) benefits[4].textContent = "✓ No live website changes during the demo";
  }
})();

function buildCalendlyUrl(planName = "general") {
  const selectedPlan = SITE_CONFIG.calendlyPlans[planName] || SITE_CONFIG.calendlyPlans.general;
  const separator = SITE_CONFIG.calendlyBaseUrl.includes("?") ? "&" : "?";
  const parameters = new URLSearchParams({
    a1: selectedPlan.answer,
    utm_source: "zennora_website",
    utm_medium: planName === "general" ? "general_demo" : "pricing_button",
    utm_campaign: selectedPlan.campaign
  });

  return `${SITE_CONFIG.calendlyBaseUrl}${separator}${parameters.toString()}`;
}

let calendlyLoadingPromise = null;

function loadCalendly() {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (calendlyLoadingPromise) return calendlyLoadingPromise;

  calendlyLoadingPromise = new Promise((resolve, reject) => {
    if (!document.querySelector('link[data-calendly-css]')) {
      const stylesheet = document.createElement("link");
      stylesheet.rel = "stylesheet";
      stylesheet.href = "https://assets.calendly.com/assets/external/widget.css";
      stylesheet.dataset.calendlyCss = "true";
      document.head.appendChild(stylesheet);
    }

    const existingScript = document.querySelector('script[data-calendly-script]');
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.Calendly), { once: true });
      existingScript.addEventListener("error", () => reject(new Error("Calendly failed to load")), { once: true });
      return;
    }

    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    script.dataset.calendlyScript = "true";
    script.addEventListener("load", () => resolve(window.Calendly));
    script.addEventListener("error", () => reject(new Error("Calendly failed to load")));
    document.head.appendChild(script);
  });

  return calendlyLoadingPromise;
}

async function openCalendly(event) {
  const trigger = event.currentTarget;
  const requestedPlan = trigger?.dataset?.calendlyPlan || "general";
  const calendlyUrl = buildCalendlyUrl(requestedPlan);

  if (typeof window.gtag === "function") {
    window.gtag("event", "calendly_click", {
      page_type: document.body.dataset.demoType || "homepage",
      calendly_plan: requestedPlan,
      button_text: trigger?.textContent?.trim() || "Calendly"
    });
  }

  try {
    const calendly = await loadCalendly();
    if (calendly && typeof calendly.initPopupWidget === "function") {
      calendly.initPopupWidget({ url: calendlyUrl });
      return;
    }
  } catch (error) {
    console.warn(error.message);
  }

  window.open(calendlyUrl, "_blank", "noopener,noreferrer");
}

document.querySelectorAll(".calendly-trigger").forEach((button) => {
  button.addEventListener("click", openCalendly);
});

const dentalDemoForm = document.querySelector("#dental-demo-request-form");
const dentalDemoFrame = document.querySelector('.demo-response-frame[name="zennora-dental-demo-response"]');
const dentalDemoSuccess = document.querySelector("#dental-demo-success");
const dentalDemoHeading = document.querySelector("#dental-demo-request-heading");
const dentalRequestButton = document.querySelector(".dental-request-button");

if (dentalDemoForm && dentalDemoFrame && dentalDemoSuccess && dentalDemoHeading) {
  const submitButton = dentalDemoForm.querySelector('button[type="submit"]');
  const clinicWebsite = dentalDemoForm.querySelector('[name="clinicWebsite"]');
  const clinicWebsiteError = document.querySelector("#demo-clinic-website-error");
  const submitButtonLabel = submitButton.textContent;
  let submitted = false;
  let leadTracked = false;

  function normalizeClinicWebsite(value) {
    const trimmedValue = value.trim();
    return /^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`;
  }

  function isValidClinicWebsite(value) {
    if (!value || /\s/.test(value)) return false;

    try {
      const website = new URL(normalizeClinicWebsite(value));
      const domainPattern = /^(?=.{1,253}$)(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+(?:[a-z]{2,63}|xn--[a-z0-9-]{2,59})$/i;
      return /^https?:$/.test(website.protocol) && !website.username && !website.password && domainPattern.test(website.hostname);
    } catch (error) {
      return false;
    }
  }

  function showClinicWebsiteError(show) {
    clinicWebsiteError.hidden = !show;
    clinicWebsite.setAttribute("aria-invalid", String(show));
  }

  clinicWebsite.addEventListener("input", () => showClinicWebsiteError(false));

  dentalDemoForm.addEventListener("submit", (event) => {
    if (submitted) {
      event.preventDefault();
      return;
    }

    if (!isValidClinicWebsite(clinicWebsite.value)) {
      event.preventDefault();
      showClinicWebsiteError(true);
      clinicWebsite.focus();
      return;
    }

    showClinicWebsiteError(false);
    clinicWebsite.value = normalizeClinicWebsite(clinicWebsite.value);

    if (!dentalDemoForm.checkValidity()) {
      event.preventDefault();
      dentalDemoForm.reportValidity();
      return;
    }

    submitted = true;
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  });

  dentalDemoFrame.addEventListener("load", () => {
    if (!submitted) return;
    if (!leadTracked && typeof window.gtag === "function") {
      window.gtag("event", "generate_lead", {
        lead_source: "dental",
        form_name: "dental_demo_request"
      });
      leadTracked = true;
    }
    submitButton.textContent = submitButtonLabel;
    submitButton.disabled = false;
    dentalDemoHeading.hidden = true;
    dentalDemoForm.hidden = true;
    dentalDemoSuccess.hidden = false;
    if (dentalRequestButton) {
      dentalRequestButton.textContent = "✓ Demo Requested";
      dentalRequestButton.removeAttribute("href");
      dentalRequestButton.setAttribute("aria-disabled", "true");
    }
    dentalDemoSuccess.focus({ preventScroll: true });
  });
}

const form = document.querySelector("#lead-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const business = String(data.get("business") || "Website inquiry").trim();
    const websiteEntry = String(data.get("website") || "").trim();
    const website = websiteEntry && !/^https?:\/\//i.test(websiteEntry)
      ? `https://${websiteEntry}`
      : websiteEntry;
    const subject = encodeURIComponent(`Zennora demo request — ${business}`);
    const body = encodeURIComponent(
      `Name: ${String(data.get("name") || "").trim()}\n` +
      `Email: ${String(data.get("email") || "").trim()}\n` +
      `Business: ${business}\n` +
      `Website: ${website}\n\n` +
      `What the AI receptionist should help with:\n${String(data.get("message") || "").trim()}`
    );
    window.location.href = `mailto:${SITE_CONFIG.contactEmail}?subject=${subject}&body=${body}`;
  });
}

const generalScenarios = [
  { label: "Book appointment", question: "Can I book an appointment?", answer: "Absolutely. I can guide you to the booking page or help you contact the team." },
  { label: "Services", question: "What services do you offer?", answer: "I can give you a quick overview using the business’s approved service information." },
  { label: "Opening hours", question: "Are you open on Saturday?", answer: "I can share the current business hours and the best way to reach the team." },
  { label: "Request quote", question: "Can I request a quote?", answer: "Yes. I can direct you to the quote form or explain what details the team needs." },
  { label: "Speak to team", question: "I need to speak with someone.", answer: "Of course. I can show you the preferred phone, email or staff follow-up option." },
  { label: "After-hours inquiry", question: "Can I leave my details after hours?", answer: "On a Growth plan, I can collect selected contact details and context for staff follow-up." }
];

const dentalScenarios = [
  { label: "New patient", question: "Are you accepting new patients?", answer: "I can share the clinic’s approved new-patient process and guide you to the booking page." },
  { label: "CDCP", question: "Do you accept the Canadian Dental Care Plan?", answer: "I can share the clinic’s approved CDCP information. Coverage and eligibility should be confirmed for your individual plan." },
  { label: "Insurance", question: "Do you direct bill insurance?", answer: "I can explain the clinic’s general billing process and direct plan-specific questions to the front desk." },
  { label: "Dental emergency", question: "I have severe tooth pain. What should I do?", answer: "Please call the clinic using its urgent-contact instructions. I can share approved clinic information, but I cannot diagnose or recommend treatment." },
  { label: "Invisalign", question: "Do you offer Invisalign?", answer: "I can confirm whether the clinic offers Invisalign and guide you toward a consultation." },
  { label: "Cleaning", question: "How often should I book a cleaning?", answer: "I can explain the clinic’s general appointment options, but the dental team should recommend a schedule for your individual needs." },
  { label: "First appointment", question: "What should I bring to my first visit?", answer: "I can share the clinic’s approved checklist, such as identification, insurance information and previous records when applicable." },
  { label: "Book appointment", question: "Can I book an appointment online?", answer: "Yes. I can guide you to the clinic’s booking page or approved contact option." }
];

function initializeDemo(demo) {
  const type = document.body.dataset.demoType === "dental" ? "dental" : "general";
  const scenarios = type === "dental" ? dentalScenarios : generalScenarios;
  const actions = demo.querySelector("[data-demo-actions]");
  const question = demo.querySelector("[data-demo-question]");
  const answer = demo.querySelector("[data-demo-answer]");
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

    const delay = immediate ? 0 : 350;
    switchTimer = window.setTimeout(() => {
      question.textContent = scenario.question;
      answer.textContent = scenario.answer;
      question.classList.remove("switching");
      window.setTimeout(() => {
        typing.hidden = true;
        answer.hidden = false;
        answer.classList.remove("switching");
      }, immediate ? 0 : 650);
    }, delay);
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

document.querySelectorAll("[data-demo]").forEach(initializeDemo);

document.documentElement.classList.add("reveal-ready");
const revealSelectors = [
  ".section-head", ".card", ".outcome-card", ".industry-card", ".step",
  ".privacy-panel", ".trust-copy", ".faq details", ".pricing-card",
  ".launch-box", ".booking-box", ".contact-form", ".contact-details",
  ".dental-scheduler-card", ".setup-fee-panel"
];

const revealItems = [...document.querySelectorAll(revealSelectors.join(","))];
revealItems.forEach((item, index) => {
  item.classList.add("reveal", `delay-${(index % 3) + 1}`);
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -45px 0px" });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const header = document.querySelector(".site-header");
const setHeaderState = () => {
  if (header) header.classList.toggle("scrolled", window.scrollY > 20);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

if (document.body.dataset.demoType === "general") {
  const homepageDemoScript = document.createElement("script");
  homepageDemoScript.src = "homepage-demo.js?v=2";
  homepageDemoScript.async = false;
  document.body.appendChild(homepageDemoScript);
}

if (document.body.dataset.demoType && document.body.dataset.demoType !== "general") {
  const industryModernScript = document.createElement("script");
  industryModernScript.src = "industry-modern.js?v=1.0.0";
  industryModernScript.async = true;
  document.head.appendChild(industryModernScript);
}