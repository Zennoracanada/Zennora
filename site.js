"use strict";

const SITE_CONFIG = Object.freeze({
  calendlyBaseUrl: "https://calendly.com/zennora/30min?hide_gdpr_banner=1",
  contactEmail: "zennora.ca@gmail.com",
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

const form = document.querySelector("#lead-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const business = String(data.get("business") || "Website inquiry").trim();
    const subject = encodeURIComponent(`Zennora demo request — ${business}`);
    const body = encodeURIComponent(
      `Name: ${String(data.get("name") || "").trim()}\n` +
      `Email: ${String(data.get("email") || "").trim()}\n` +
      `Business: ${business}\n` +
      `Website: ${String(data.get("website") || "").trim()}\n\n` +
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
