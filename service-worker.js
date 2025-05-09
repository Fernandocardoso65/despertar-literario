const CACHE_NAME = 'despertar-literario-v3';
    const urlsToCache = [
      '/',
      '/index.html',
      '/icon-192.png',
      '/icon-512.png'
    ];

    self.addEventListener('install', (event) => {
      console.log('Service Worker: Instalando...');
      event.waitUntil(
        caches.open(CACHE_NAME)
          .then((cache) => {
            console.log('Service Worker: Cache aberto, adicionando arquivos...');
            return cache.addAll(urlsToCache).catch((err) => {
              console.error('Service Worker: Erro ao cachear arquivos:', err);
            });
          })
      );
      self.skipWaiting();
    });

    self.addEventListener('fetch', (event) => {
      console.log('Service Worker: Fetching', event.request.url);
      event.respondWith(
        caches.match(event.request)
          .then((response) => {
            if (response) {
              console.log('Service Worker: Retornando do cache:', event.request.url);
              return response;
            }
            console.log('Service Worker: Buscando na rede:', event.request.url);
            return fetch(event.request).catch(() => {
              console.log('Service Worker: Rede falhou, retornando fallback');
              return caches.match('/index.html');
            });
          })
      );
    });

    self.addEventListener('activate', (event) => {
      console.log('Service Worker: Ativando...');
      event.waitUntil(
        caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames.filter((cacheName) => cacheName !== CACHE_NAME)
              .map((cacheName) => {
                console.log('Service Worker: Removendo cache antigo:', cacheName);
                return caches.delete(cacheName);
              })
          );
        })
      );
      self.clients.claim();
    });
