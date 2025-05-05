const CACHE_NAME = 'despertar-literario-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/segunda_tela.html',
    '/terceira_tela.html',
    '/icon.png',
    'https://images.unsplash.com/photo-1519125323398-675f1f4d271f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1507521628349-dee6b5761201?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80',
    'https://cdn.pixabay.com/photo/2014/10/14/20/14/library-488690_1280.jpg'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});