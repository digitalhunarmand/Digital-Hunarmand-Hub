// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos]').forEach(el => {
  if (el.dataset.aosDelay) {
    el.style.transitionDelay = el.dataset.aosDelay + 'ms';
  }
  observer.observe(el);
});

// ===== STATS COUNTER =====
const statNums = document.querySelectorAll('.stat-num');
let counted = false;

function animateCounters() {
  if (counted) return;
  counted = true;
  statNums.forEach(el => {
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 16);
  });
}

const statsBar = document.querySelector('.stats-bar');
const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) animateCounters();
}, { threshold: 0.3 });
if (statsBar) statsObserver.observe(statsBar);

// ===== CHATBOT =====
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const chatIcon = document.getElementById('chatIcon');

chatToggle.addEventListener('click', () => {
  chatWindow.classList.toggle('open');
  chatIcon.textContent = chatWindow.classList.contains('open') ? '✕' : '💬';
});
chatClose.addEventListener('click', () => {
  chatWindow.classList.remove('open');
  chatIcon.textContent = '💬';
});

const faqAnswers = {
  services: `We offer 12 services including:<br>
🌐 Web Development<br>
📱 Mobile App Development<br>
🎨 Graphic Design<br>
🖥️ UI/UX Design<br>
📢 Social Media Management<br>
🎬 Video Editing<br>
💼 Branding & Identity<br>
⚙️ Digital Marketing & SEO<br>
🤖 Website With AI<br>
🐍 Python Data Analysis<br>
📦 Amazon E-Commerce<br>
🖨️ MS Office & Data Entry`,

  courses: `We currently offer 2 online courses:<br><br>
🎨 <strong>Graphic Design</strong><br>
Learn • Create • Earn<br><br>
📈 <strong>Digital Marketing</strong><br>
Learn • Grow • Earn Online<br><br>
Both courses include:<br>
✅ Live Google Meet Classes<br>
✅ Beginner to Advanced<br>
✅ Practical Projects<br>
✅ Internship Opportunity<br><br>
<a href="https://docs.google.com/forms/d/e/1FAIpQLSc_lNFmcS41MbQ1KkLuHW6YzI9menzCMv8iIj_dDWR-BKz7vg/viewform" target="_blank" style="color:#2563EB;font-weight:600">👉 Register Here</a>`,

  pricing: `For pricing details, please contact us directly — we offer custom packages based on your needs.<br><br>
📞 <strong>Call/WhatsApp:</strong> +92 348 5168409<br>
📧 <strong>Email:</strong> digitalhunarmand1@gmail.com<br><br>
We offer <strong>affordable rates</strong> with premium quality! 💎`,

  contact: `You can reach us through:<br><br>
📞 <strong>Phone/WhatsApp:</strong> +92 348 5168409<br>
📧 <strong>Email:</strong> digitalhunarmand1@gmail.com<br>
🌐 <strong>Website:</strong> www.digitalhunarmand.com<br><br>
We reply within <strong>1 hour</strong> guaranteed! ⚡`,

  whatsapp: `Click below to chat with us directly on WhatsApp!<br><br>
<a href="https://wa.me/923485168409" target="_blank" style="display:inline-block;background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;padding:10px 20px;border-radius:50px;font-weight:600;margin-top:6px">💬 Open WhatsApp Chat</a>`
};

function addBotMsg(html) {
  const msg = document.createElement('div');
  msg.className = 'chat-msg bot';
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.innerHTML = html;
  msg.appendChild(bubble);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function addUserMsg(text) {
  const msg = document.createElement('div');
  msg.className = 'chat-msg user';
  const bubble = document.createElement('div');
  bubble.className = 'msg-bubble';
  bubble.textContent = text;
  msg.appendChild(bubble);
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function quickReply(key) {
  const labels = {
    services: '🛠️ Tell me about your services',
    courses: '🎓 What courses do you offer?',
    pricing: '💰 What are your prices?',
    contact: '📞 How can I contact you?',
    whatsapp: '💬 Connect on WhatsApp'
  };
  const qr = document.getElementById('quickReplies');
  if (qr) qr.remove();
  addUserMsg(labels[key] || key);
  setTimeout(() => addBotMsg(faqAnswers[key] || "I'm not sure about that. Please contact us at +92 348 5168409 for more info!"), 600);
}

function sendMsg() {
  const text = chatInput.value.trim();
  if (!text) return;
  chatInput.value = '';
  const qr = document.getElementById('quickReplies');
  if (qr) qr.remove();
  addUserMsg(text);
  const lower = text.toLowerCase();
  let response;
  if (lower.includes('service') || lower.includes('offer') || lower.includes('work')) {
    response = faqAnswers.services;
  } else if (lower.includes('course') || lower.includes('learn') || lower.includes('class') || lower.includes('admission')) {
    response = faqAnswers.courses;
  } else if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('how much')) {
    response = faqAnswers.pricing;
  } else if (lower.includes('contact') || lower.includes('phone') || lower.includes('email') || lower.includes('reach')) {
    response = faqAnswers.contact;
  } else if (lower.includes('whatsapp') || lower.includes('chat')) {
    response = faqAnswers.whatsapp;
  } else if (lower.includes('hello') || lower.includes('hi') || lower.includes('salam') || lower.includes('hey')) {
    response = "السلام علیکم! 👋 Welcome to Digital Hunarmand Hub!<br><br>How can I help you today? Ask me about our services, courses, pricing, or how to contact us!";
  } else {
    response = "Thanks for your message! 😊<br><br>For detailed help, please contact us:<br>📞 <strong>+92 348 5168409</strong><br>📧 digitalhunarmand1@gmail.com<br><br>We reply within 1 hour! ⚡";
  }
  setTimeout(() => addBotMsg(response), 600);
}

// ===== SMOOTH ACTIVE NAV =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.getAttribute('id');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.style.color = a.getAttribute('href') === '#' + current ? '#2563EB' : '';
  });
});
