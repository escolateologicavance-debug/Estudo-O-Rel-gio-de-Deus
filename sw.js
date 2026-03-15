const CACHE_NAME = 'relogio-de-deus-v1';
const assets = [
  './',
  './index.html',
  './1.html',
  './2.html',
  './3.html',
  './4.html',
  './5.html',
  './6.html',
  './7.html',
  './8.html',
  './9.html',
  './relogio_de_deus_animacao.mp4',
  './logo-192.png',
  './logo-512.png',
    './mapa.png',
  './1-img.png',
  './2-img.png',
  './3-img.png',
  './4-img.png',
  './5-img.png',
  './6-img.png',
  './7-img.png',
  './8-img.png',
  './9-img.png',
  './10-img.png'
];

// Instalação e Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(assets);
    })
  );
});

// Ativação e limpeza de cache antigo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Estratégia Fetch: Tenta Cache, se não tiver, busca na Rede
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cacheRes => {
      return cacheRes || fetch(event.request);
    })
  );
});