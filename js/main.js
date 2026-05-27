// ===== NAVBAR =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HAMBURGER =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('visible'), delay);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 4) * 80 + 'ms';
  revealObserver.observe(el);
});

// ===== ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 100) current = s.id;
  });
  navLinks.querySelectorAll('a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#2563eb' : '';
    a.style.fontWeight = a.getAttribute('href') === '#' + current ? '600' : '';
  });
});

// ===== CHATBOT =====
const chatFab = document.getElementById('chatFab');
const chatBox = document.getElementById('chatBox');
const chatCloseBtn = document.getElementById('chatCloseBtn');
const chatBody = document.getElementById('chatBody');
const chatIn = document.getElementById('chatIn');

chatFab.addEventListener('click', () => chatBox.classList.toggle('open'));
chatCloseBtn.addEventListener('click', () => chatBox.classList.remove('open'));

const answers = {
  services: `We offer 12 professional services:<br><br>
— Website Design & Development<br>
— Mobile App Development<br>
— Graphic Design (Logo, Branding)<br>
— UI/UX Design<br>
— Social Media Management<br>
— Video Editing & Motion Graphics<br>
— Branding & Identity Design<br>
— Digital Marketing & SEO<br>
— MS Office & Data Entry<br>
— Website With AI<br>
— Python Data Analysis<br>
— Amazon E-Commerce`,

  courses: `We currently offer 2 online courses:<br><br>
<strong>Course 01 — Graphic Design</strong><br>
Learn, Create and Earn. Beginner to Advanced.<br><br>
<strong>Course 02 — Digital Marketing</strong><br>
Learn, Grow and Earn. SEO, Ads and Social Media.<br><br>
Both include live Google Meet classes, practical training, and internship opportunities.<br><br>
<a href="https://docs.google.com/forms/d/e/1FAIpQLSc_lNFmcS41MbQ1KkLuHW6YzI9menzCMv8iIj_dDWR-BKz7vg/viewform" target="_blank" style="color:#2563eb;font-weight:600;text-decoration:underline">Register Here</a>`,

  pricing: `Pricing depends on your project requirements. We offer custom packages for every budget.<br><br>
Contact us directly for a free quote:<br>
<strong>WhatsApp:</strong> +92 348 5168409<br>
<strong>Email:</strong> digitalhunarmand1@gmail.com`,

  contact: `You can reach us through:<br><br>
<strong>Phone / WhatsApp:</strong> +92 348 5168409<br>
<strong>Email:</strong> digitalhunarmand1@gmail.com<br>
<strong>Website:</strong> www.digitalhunarmand.com<br><br>
We reply within <strong>1 hour</strong>, guaranteed.`,

  whatsapp: `Click below to chat with us directly:<br><br>
<a href="https://wa.me/923485168409" target="_blank" style="display:inline-block;background:#22c55e;color:#fff;padding:10px 22px;border-radius:8px;font-weight:600;margin-top:4px">Open WhatsApp</a>`
};

function addBot(html) {
  const d = document.createElement('div');
  d.className = 'cb bot';
  d.innerHTML = `<div class="cb-bubble">${html}</div>`;
  chatBody.appendChild(d);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function addUser(text) {
  const d = document.createElement('div');
  d.className = 'cb user';
  d.innerHTML = `<div class="cb-bubble">${text}</div>`;
  chatBody.appendChild(d);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function qr(key) {
  const labels = {
    services: 'Our Services',
    courses: 'Online Courses',
    pricing: 'Pricing Info',
    contact: 'Contact Details',
    whatsapp: 'Chat on WhatsApp'
  };
  const qrEl = document.getElementById('chatQR');
  if (qrEl) qrEl.remove();
  addUser(labels[key]);
  setTimeout(() => addBot(answers[key] || 'Please contact us directly for more info.'), 500);
}

function sendChat() {
  const text = chatIn.value.trim();
  if (!text) return;
  chatIn.value = '';
  const qrEl = document.getElementById('chatQR');
  if (qrEl) qrEl.remove();
  addUser(text);
  const t = text.toLowerCase();
  let res;
  if (t.match(/service|offer|work|do you/)) res = answers.services;
  else if (t.match(/course|learn|class|admission|graphic|marketing/)) res = answers.courses;
  else if (t.match(/price|cost|rate|much|charge/)) res = answers.pricing;
  else if (t.match(/contact|phone|email|reach|call/)) res = answers.contact;
  else if (t.match(/whatsapp|chat|message|wa/)) res = answers.whatsapp;
  else if (t.match(/hi|hello|hey|salam|assalam/)) res = 'Welcome to Digital Hunarmand Hub. How can we help you today?';
  else res = 'Thank you for reaching out. For detailed assistance please contact us at <strong>+92 348 5168409</strong> or email <strong>digitalhunarmand1@gmail.com</strong>. We reply within 1 hour.';
  setTimeout(() => addBot(res), 500);
}

chatIn.addEventListener('keydown', (e) => { if (e.key === 'Enter') sendChat(); });
