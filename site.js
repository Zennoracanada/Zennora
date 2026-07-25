const calendlyUrl='https://calendly.com/zennora/30min';

document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('nav');
if(toggle&&nav){
  toggle.addEventListener('click',()=>{
    const open=nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded',String(open));
  });
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded','false');
  }));
}

document.querySelectorAll('.calendly-trigger').forEach(button=>button.addEventListener('click',()=>{
  if(window.Calendly){
    window.Calendly.initPopupWidget({url:calendlyUrl});
  }else{
    window.open(calendlyUrl,'_blank','noopener');
  }
}));

const form=document.querySelector('#lead-form');
if(form){
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(form);
    const subject=encodeURIComponent(`Zennora demo request — ${data.get('business')||'New inquiry'}`);
    const body=encodeURIComponent(`Name: ${data.get('name')}\nWork email: ${data.get('email')}\nBusiness: ${data.get('business')}\nWebsite: ${data.get('website')||'Not provided'}\n\nWhat the assistant should help with:\n${data.get('message')}`);
    window.location.href=`mailto:zennora.ca@gmail.com?subject=${subject}&body=${body}`;
  });
}

const demoSets={
  general:[
    {label:'📅 Booking',question:'Can I book an appointment?',answer:'Absolutely. I can collect the details and guide you to the best booking option.'},
    {label:'🕒 Hours',question:'Are you open today?',answer:'I can share the current business hours and help you choose the best time to contact the team.'},
    {label:'💼 Services',question:'What services do you offer?',answer:'I can explain the available services and help you find the one that best matches your needs.'},
    {label:'💬 Pricing',question:'How much does it cost?',answer:'I can share approved pricing information or collect your details for a personalized quote.'},
    {label:'📍 Service area',question:'Do you serve my area?',answer:'Tell me your location and I can check whether it is within the business service area.'},
    {label:'☎️ Contact me',question:'Can someone contact me?',answer:'Of course. I can collect your name, contact details and the reason for your inquiry.'}
  ],
  dental:[
    {label:'👋 New patient',question:'Are you accepting new patients?',answer:'Yes! I can help you with the next available appointment and what to expect at your first visit.'},
    {label:'🇨🇦 CDCP',question:'Do you accept the Canadian Dental Care Plan?',answer:'I can share the clinic’s approved CDCP information and help you contact the team for coverage-specific questions.'},
    {label:'💳 Insurance',question:'Do you offer direct billing to insurance?',answer:'I can explain the clinic’s direct-billing process and guide you to the team for plan-specific details.'},
    {label:'🦷 Emergency',question:'I have severe tooth pain. Can I come today?',answer:'I’m sorry you’re in pain. I can share the clinic’s urgent-care instructions and help you request the earliest available appointment.'},
    {label:'😁 Invisalign',question:'Do you provide Invisalign?',answer:'I can explain whether Invisalign consultations are available and help you request an appointment.'},
    {label:'📋 First visit',question:'What should I bring to my first appointment?',answer:'Please bring photo identification, insurance information if applicable, and any previous dental records requested by the clinic.'}
  ]
};

const demoCard=document.querySelector('.demo-card');
if(demoCard){
  const type=document.body.dataset.demoType||'general';
  const scenarios=demoSets[type]||demoSets.general;
  const actions=demoCard.querySelector('[data-demo-actions]');
  const question=demoCard.querySelector('[data-demo-question]');
  const answer=demoCard.querySelector('[data-demo-answer]');
  const typing=demoCard.querySelector('.demo-typing');
  let current=0;
  let timer;
  let userInteracted=false;

  const render=(index,animate=true)=>{
    current=index;
    actions.querySelectorAll('button').forEach((button,i)=>button.classList.toggle('active',i===index));
    if(!animate){
      question.textContent=scenarios[index].question;
      answer.textContent=scenarios[index].answer;
      return;
    }
    question.classList.add('switching');
    answer.classList.add('switching');
    setTimeout(()=>{
      question.textContent=scenarios[index].question;
      answer.hidden=true;
      typing.hidden=false;
      question.classList.remove('switching');
      setTimeout(()=>{
        typing.hidden=true;
        answer.hidden=false;
        answer.textContent=scenarios[index].answer;
        answer.classList.remove('switching');
      },750);
    },180);
  };

  scenarios.forEach((scenario,index)=>{
    const button=document.createElement('button');
    button.type='button';
    button.className='demo-chip';
    button.textContent=scenario.label;
    button.addEventListener('click',()=>{
      userInteracted=true;
      clearInterval(timer);
      render(index,true);
    });
    actions.appendChild(button);
  });
  render(0,false);
  timer=setInterval(()=>{
    if(!userInteracted) render((current+1)%scenarios.length,true);
  },6500);
}

const revealItems=[...document.querySelectorAll('.card,.industry-card,.step,.privacy-panel,.trust-copy,.faq details')];
if('IntersectionObserver' in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.documentElement.classList.add('reveal-ready');
  revealItems.forEach(item=>item.classList.add('reveal'));
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}
  }),{threshold:.12});
  revealItems.forEach(item=>observer.observe(item));
}
