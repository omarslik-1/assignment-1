// Theme + greeting + interactions
(function(){
  const root = document.documentElement;

  // Theme toggle with localStorage
  const themeToggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if(stored){
    root.classList.toggle('light', stored === 'light');
  } else {
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    root.classList.toggle('light', prefersLight);
  }
  function setTheme(next){
    root.classList.toggle('light', next === 'light');
    localStorage.setItem('theme', next);
    themeToggle?.setAttribute('aria-pressed', String(next === 'light'));
  }
  themeToggle?.addEventListener('click', () => {
    const isLight = root.classList.contains('light');
    setTheme(isLight ? 'dark' : 'light');
  });
  themeToggle?.setAttribute('aria-pressed', String(root.classList.contains('light')));

  // Greeting
  const greeting = document.getElementById('greeting');
  const hour = new Date().getHours();
  let text = 'Hello!';
  if(hour >= 5 && hour < 12) text = 'Good morning!';
  else if(hour >= 12 && hour < 17) text = 'Good afternoon!';
  else if(hour >= 17 && hour < 22) text = 'Good evening!';
  if(greeting) greeting.textContent = text;

  // Footer year
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById('navToggle');
  const menu = document.getElementById('siteMenu');
  navToggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });

  // Smooth scroll internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
        history.pushState(null, '', '#' + id);
      }
    });
  });

  // Light form validation
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const emailOk = /.+@.+\..+/.test(email.value);

    document.getElementById('nameHint').textContent = name.value ? '' : 'Please enter your name.';
    document.getElementById('emailHint').textContent = emailOk ? '' : 'Please enter a valid email.';
    document.getElementById('messageHint').textContent = message.value ? '' : 'Please write a message.';

    const ok = Boolean(name.value && emailOk && message.value);
    if(ok){
      alert('Thanks! This is a demo form—no data is sent.');
      form.reset();
    }
  });
})();

  // Back-to-top button
  const backToTop = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 600;
    backToTop?.classList.toggle('show', show);
  });
  backToTop?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

  // Scroll spy for active nav link
  const sections = [...document.querySelectorAll('main section[id]')];
  const navLinks = [...document.querySelectorAll('.nav-link')];
  const spy = () => {
    const y = window.scrollY + 120;
    let current = sections[0]?.id;
    for(const sec of sections){
      if(sec.offsetTop <= y) current = sec.id;
    }
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
  };
  window.addEventListener('scroll', spy); spy();

  // Reveal on scroll
  const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries)=>{
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  }, {rootMargin: '0px 0px -10% 0px'}) : null;
  document.querySelectorAll('.reveal').forEach(el => observer?.observe(el));

  // Message character counter (max 300)
  const msg = document.getElementById('message');
  const msgHint = document.getElementById('messageHint');
  const MAX = 300;
  if(msg && msgHint){
    const update = () => {
      const left = MAX - msg.value.length;
      msgHint.textContent = left >= 0 ? `${left} characters remaining.` : `${-left} over limit.`;
    };
    msg.addEventListener('input', update);
    update();
  }

