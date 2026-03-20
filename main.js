// main.js — Kendren Cornish Portfolio

// ── NAV TOGGLE (mobile) ──
const navToggle = document.getElementById('nav-toggle');
const navLinks  = document.getElementById('nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => { navLinks.classList.remove('open'); navToggle.classList.remove('open'); });
  });
}

// ── NAV SCROLL STYLE ──
const nav = document.getElementById('main-nav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 40 ? 'rgba(9,9,15,0.97)' : 'rgba(9,9,15,0.85)';
  }, { passive: true });
}

// ── PARTICLE SYSTEM ──
const canvas = document.createElement('canvas');
const particlesEl = document.getElementById('particles');
if (particlesEl) {
  particlesEl.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = particlesEl.offsetWidth;
    H = canvas.height = particlesEl.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COLORS = ['#a78bfa','#38bdf8','#f472b6','#ffd700','#6befff','#7fff6b'];
  function mkParticle() {
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.6 + 0.1,
    };
  }
  for (let i = 0; i < 120; i++) particles.push(mkParticle());

  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x = (p.x + p.vx + W) % W;
      p.y = (p.y + p.vy + H) % H;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ── ACCORDION ──
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const isOpen = btn.classList.contains('open');
    document.querySelectorAll('.accordion-trigger').forEach(b => {
      b.classList.remove('open');
      b.nextElementSibling?.classList.remove('open');
    });
    if (!isOpen) { btn.classList.add('open'); content?.classList.add('open'); }
  });
});

// ── FADE-IN ON SCROLL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -48px 0px' });

document.querySelectorAll(
  '.pillar-card, .research-card, .blog-item, .school-card, .stat-item, .timeline-item, .link-card, .photo-slot, .photo-uploaded'
).forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
document.querySelectorAll('.pillar-card, .research-card, .blog-item, .school-card, .stat-item, .timeline-item, .link-card, .photo-slot, .photo-uploaded').forEach(el => {
  const delay = Array.from(el.parentElement?.children || []).indexOf(el) * 80;
  el.style.transitionDelay = delay + 'ms';
});
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.visible').forEach(el => {
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  });
});
// inject visible class
const styleTag = document.createElement('style');
styleTag.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(styleTag);

/* ── NEWSLETTER MODAL ── */
const newsletterBtn = document.getElementById('newsletter-btn');
const newsletterModal = document.getElementById('newsletter-modal');
const modalClose = document.getElementById('modal-close');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterSuccess = document.getElementById('newsletter-success');

if (newsletterBtn && newsletterModal) {
  newsletterBtn.addEventListener('click', () => {
    newsletterModal.classList.add('open');
  });
  modalClose.addEventListener('click', () => {
    newsletterModal.classList.remove('open');
  });
  newsletterModal.addEventListener('click', (e) => {
    if (e.target === newsletterModal) newsletterModal.classList.remove('open');
  });
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = newsletterForm.querySelector('button');
    btn.textContent = 'Subscribing...';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      newsletterSuccess.style.display = 'block';
      newsletterForm.reset();
      setTimeout(() => {
        newsletterModal.classList.remove('open');
        newsletterSuccess.style.display = 'none';
      }, 2000);
    }, 800);
  });
}

/* ── ROTATING HERO TEXT ── */
const rotatingPhrases = document.querySelectorAll('.rotating-phrase');
if (rotatingPhrases.length > 0) {
  let currentPhrase = 0;
  setInterval(() => {
    rotatingPhrases[currentPhrase].classList.remove('active');
    currentPhrase = (currentPhrase + 1) % rotatingPhrases.length;
    rotatingPhrases[currentPhrase].classList.add('active');
  }, 4000); // Change phrase every 4 seconds
}
