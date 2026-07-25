const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');

if(menuButton&&nav){
  menuButton.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded','false');
  }));
}

document.querySelectorAll('[data-year]').forEach(el=>{
  el.textContent=new Date().getFullYear();
});

/* Email-based inquiry form */
const form=document.querySelector('#lead-form');
if(form){
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(form);
    const subject=encodeURIComponent(
      `Zennora demo request — ${data.get('business')||'Website inquiry'}`
    );
    const body=encodeURIComponent(
`Name: ${data.get('name')||''}
Email: ${data.get('email')||''}
Business: ${data.get('business')||''}
Website: ${data.get('website')||''}

Message:
${data.get('message')||''}`
    );
    window.location.href=`mailto:zennora.ca@gmail.com?subject=${subject}&body=${body}`;
  });
}

/* Scroll-reveal animations */
document.documentElement.classList.add('reveal-ready');
const revealSelectors=[
  '.section-head','.card','.step','.privacy-panel','.notice',
  '.cta-box','.contact-form','.contact-details','.logo-strip-inner',
  '.check-list','.faq details','.booking-benefits','.calendly-card'
];
const revealItems=[...document.querySelectorAll(revealSelectors.join(','))];

revealItems.forEach((item,index)=>{
  item.classList.add('reveal',`delay-${(index%3)+1}`);
});

if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -55px 0px'});
  revealItems.forEach(item=>observer.observe(item));
}else{
  revealItems.forEach(item=>item.classList.add('visible'));
}

/* Header shadow after scrolling */
const header=document.querySelector('.site-header');
const setHeaderState=()=>{
  if(header) header.classList.toggle('scrolled',window.scrollY>24);
};
setHeaderState();
window.addEventListener('scroll',setHeaderState,{passive:true});
