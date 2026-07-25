const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const openCalendly=()=>{
  if(window.Calendly){window.Calendly.initPopupWidget({url:'https://calendly.com/zennora/30min?hide_gdpr_banner=1'});}
  else{window.open('https://calendly.com/zennora/30min','_blank','noopener');}
};
document.querySelectorAll('.calendly-trigger').forEach(button=>button.addEventListener('click',openCalendly));

const form=document.querySelector('#lead-form');
if(form){form.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(form);const subject=encodeURIComponent(`Zennora demo request — ${data.get('business')||'Website inquiry'}`);const body=encodeURIComponent(`Name: ${data.get('name')||''}\nEmail: ${data.get('email')||''}\nBusiness: ${data.get('business')||''}\nWebsite: ${data.get('website')||''}\n\nMessage:\n${data.get('message')||''}`);window.location.href=`mailto:zennora.ca@gmail.com?subject=${subject}&body=${body}`;});}

document.documentElement.classList.add('reveal-ready');
const items=[...document.querySelectorAll('.section-head,.card,.step,.privacy-panel,.trust-copy,.faq details,.booking-box,.contact-form,.contact-details')];
items.forEach(item=>item.classList.add('reveal'));
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.12,rootMargin:'0px 0px -45px 0px'});items.forEach(item=>observer.observe(item));}else{items.forEach(item=>item.classList.add('visible'));}
const header=document.querySelector('.site-header');const setHeader=()=>header&&header.classList.toggle('scrolled',window.scrollY>20);setHeader();window.addEventListener('scroll',setHeader,{passive:true});


// Zennora V3.3 interactive Canadian dental demo
const demoScenarios={
  emergency:{question:'I have severe tooth pain. Can I come in today?',answer:"I’m sorry you’re in pain. The clinic prioritizes urgent concerns whenever possible. I can collect your details and help you request the earliest available appointment."},
  'new-patient':{question:'Are you accepting new patients?',answer:'Yes! We are welcoming new patients. I can help you request an appointment and share what to bring to your first visit.'},
  cdcp:{question:'Do you accept the Canadian Dental Care Plan?',answer:'The clinic can share its current CDCP participation and help you understand the next steps. Coverage depends on eligibility and the treatment provided.'},
  insurance:{question:'Do you offer direct billing to insurance?',answer:'The clinic works with many insurance plans and can explain its direct-billing process. Please have your plan information ready for confirmation.'},
  invisalign:{question:'Do you provide Invisalign treatment?',answer:'The clinic offers clear-aligner consultations. A dentist can assess your needs and explain whether Invisalign may be suitable for you.'},
  booking:{question:"I’d like to book an appointment.",answer:'Great! I can guide you to the booking page or collect your preferred date, service and contact details for the clinic team.'}
};
document.querySelectorAll('[data-ai-demo]').forEach(demo=>{
  const question=demo.querySelector('[data-demo-question]');
  const answer=demo.querySelector('[data-demo-answer]');
  const thinking=demo.querySelector('[data-demo-thinking]');
  const buttons=[...demo.querySelectorAll('[data-scenario]')];
  let timer;
  const showScenario=key=>{
    const item=demoScenarios[key]; if(!item)return;
    clearTimeout(timer); buttons.forEach(btn=>btn.classList.toggle('active',btn.dataset.scenario===key));
    question.classList.add('changing');answer.classList.add('changing');
    setTimeout(()=>{question.textContent=item.question;question.classList.remove('changing');answer.hidden=true;thinking.hidden=false;},180);
    timer=setTimeout(()=>{thinking.hidden=true;answer.textContent=item.answer;answer.hidden=false;requestAnimationFrame(()=>answer.classList.remove('changing'));},1050);
  };
  buttons.forEach(btn=>btn.addEventListener('click',()=>showScenario(btn.dataset.scenario)));
});
