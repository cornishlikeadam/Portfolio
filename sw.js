// Service Worker — Kendren Cornish Portfolio
const CACHE = 'kc-portfolio-v3';
const ASSETS = [
  '/', '/index.html', '/about.html', '/fintech.html', '/fintech-portfolio.html',
  '/projects.html', '/archive.html', '/research.html', '/military.html', '/nonprofit.html',
  '/languages.html', '/blog.html', '/socials.html', '/graduate.html', '/contact.html',
  '/style.css', '/main.js', '/smu_badge.png', '/military_photo.jpg',
  'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@300;400;500;600;700&display=swap'
];


self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).catch(() => {}));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      }).catch(() => cached);
    })
  );
});
