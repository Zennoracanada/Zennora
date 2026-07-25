const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
if(menuButton&&nav){menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));}
document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const form=document.querySelector('#lead-form');
if(form){form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const subject=encodeURIComponent(`Zennora demo request — ${data.get('business')||'Website inquiry'}`);const body=encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nBusiness: ${data.get('business')}\nWebsite: ${data.get('website')}\n\nMessage:\n${data.get('message')}`);window.location.href=`mailto:hello@zennora.ca?subject=${subject}&body=${body}`;});}
