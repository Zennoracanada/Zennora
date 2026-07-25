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
