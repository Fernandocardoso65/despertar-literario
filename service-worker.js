const CACHE_NAME = 'despertar-literario-v2';
const urlsToCache = [
  '/',
  '/index.html',
  'https://images.unsplash.com/photo-1519125323398-675f1f4d271f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
  'https://images.unsplash.com/photo-1507521628349-dee6b5761201?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
  'https://i.imgur.com/eKNOJwl.jpeg'
];

// Cacheia os arquivos durante a instalação
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache).catch((err) => {
          console.log('Erro ao cachear arquivos:', err);
        });
      })
  );
  self.skipWaiting();
});

// Responde às requisições
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).catch(() => {
          return caches.match('/index.html');
        });
      })
  );
});

// Limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});
