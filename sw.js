const CACHE_NAME = 'despertar-literario-v1.0.4'; // Novo nome para forçar atualização
const urlsToCache = [
    '/',
    '/index.html',
    '/quiz.html',
    '/segunda_tela.html',
    '/terceira_tela.html',
    '/manifest.json',
    '/icon-192.png',
    '/icon-512.png',
    'https://i.imgur.com/eKNOJwl.jpeg',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/webfonts/fa-solid-900.woff2',
    'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(name => name !== CACHE_NAME)
                    .map(name => caches.delete(name))
            );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request).catch(() => {
                if (event.request.url.includes('quiz.html')) {
                    return caches.match('/quiz.html');
                }
            });
        })
    );
});
