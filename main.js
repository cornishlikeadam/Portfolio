// main.js — Kendren Cornish Portfolio

// ── SERVICE WORKER (PWA) ──
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {});
  });
}

// ── PWA INSTALL BANNER ──
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  const banner = document.getElementById('pwa-install-banner');
  if (banner && !localStorage.getItem('pwa-dismissed')) {
    setTimeout(() => banner.classList.add('show'), 2000);
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const confirmBtn = document.getElementById('pwa-install-confirm');
  const dismissBtn = document.getElementById('pwa-install-dismiss');
  const banner = document.getElementById('pwa-install-banner');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', async () => {
      if (deferredPrompt) { deferredPrompt.prompt(); const r = await deferredPrompt.userChoice; deferredPrompt = null; }
      banner?.classList.remove('show');
    });
  }
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      banner?.classList.remove('show');
      localStorage.setItem('pwa-dismissed', '1');
    });
  }
});

// ── INJECT BOTTOM NAV & PWA BANNER INTO EVERY PAGE ──
document.addEventListener('DOMContentLoaded', () => {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const pages = [
    { href: 'index.html',     icon: '🏠', label: 'Home'      },
    { href: 'about.html',     icon: '👤', label: 'About'     },
    { href: 'projects.html',  icon: '⚙️', label: 'Projects'  },
    { href: 'fintech.html',   icon: '₿',  label: 'FinTech'   },
    { href: 'research.html',  icon: '📄', label: 'Research'  },
    { href: 'military.html',  icon: '🎖️', label: 'Service'   },
    { href: 'nonprofit.html', icon: '🌱', label: 'Nonprofit' },
    { href: 'languages.html', icon: '🈶', label: 'Mandarin'  },
    { href: 'blog.html',      icon: '✍️', label: 'Blog'      },
    { href: 'socials.html',   icon: '🌐', label: 'Connect'   },
    { href: 'graduate.html',  icon: '🎓', label: 'Path'      },
    { href: 'contact.html',   icon: '✉️', label: 'Contact'   },
  ];

  // Build nav with inner wrapper (forces true scroll overflow)
  const nav = document.createElement('nav');
  nav.className = 'mobile-bottom-nav';
  nav.setAttribute('aria-label', 'Mobile navigation');
  const inner = document.createElement('div');
  inner.className = 'mnav-inner';
  inner.innerHTML = pages.map(n =>
    `<a href="${n.href}" ${n.href === page ? 'class="active"' : ''}>
      <span class="mnav-icon">${n.icon}</span>${n.label}
    </a>`
  ).join('');
  nav.appendChild(inner);
  document.body.appendChild(nav);

  // Floating left/right transparent arrow indicators
  const arrowL = document.createElement('div');
  arrowL.className = 'mnav-arrow left hidden';
  arrowL.textContent = '‹';
  document.body.appendChild(arrowL);

  const arrowR = document.createElement('div');
  arrowR.className = 'mnav-arrow right';
  arrowR.textContent = '›';
  document.body.appendChild(arrowR);

  function updateArrows() {
    const sl = nav.scrollLeft;
    const maxScroll = nav.scrollWidth - nav.clientWidth;
    arrowL.classList.toggle('hidden', sl < 8);
    arrowR.classList.toggle('hidden', sl >= maxScroll - 8);
  }

  nav.addEventListener('scroll', updateArrows, { passive: true });

  // Auto-center active tab on load
  requestAnimationFrame(() => {
    const active = nav.querySelector('a.active');
    if (active) {
      const offset = active.offsetLeft - (nav.clientWidth / 2) + (active.offsetWidth / 2);
      nav.scrollLeft = Math.max(0, offset);
    }
    updateArrows();
  });

  // PWA Install Banner
  const banner = document.createElement('div');
  banner.id = 'pwa-install-banner';
  banner.className = 'pwa-install-banner';
  banner.innerHTML = `
    <div class="banner-icon">📲</div>
    <div class="banner-text">
      <h4>Add to Home Screen</h4>
      <p>Install Kendren's portfolio as an app</p>
    </div>
    <div class="banner-actions">
      <button class="pwa-install-btn confirm" id="pwa-install-confirm">Install</button>
      <button class="pwa-install-btn dismiss" id="pwa-install-dismiss">✕</button>
    </div>`;
  document.body.appendChild(banner);
});

// ── NAV TOGGLE (mobile hamburger) ──
const navToggle = document.getElementById('nav-toggle');
const navLinksEl  = document.getElementById('nav-links');
if (navToggle && navLinksEl) {
  navToggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
    navToggle.classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => { navLinksEl.classList.remove('open'); navToggle.classList.remove('open'); });
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
