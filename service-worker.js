const CACHE_NAME = 'despertar-literario-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/segunda_tela.html',
  '/terceira_tela.html',
  'https://images.unsplash.com/photo-1519125323398-675f1f4d271f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1507521628349-dee6b5761201?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
  'https://i.imgur.com/eKNOJwl.jpeg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request).catch(() => caches.match('/index.html'));
      })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
});
