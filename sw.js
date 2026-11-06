// =====================================================================
//  Service Worker – Cache-first für alle App-Dateien.
//  👉 Nach jeder Änderung an den App-Dateien CACHE_VERSION erhöhen,
//     sonst bekommen installierte Clients die neuen Dateien nicht.
// =====================================================================
const CACHE_VERSION = 'aetherbastion-v5';
const APP_FILES = [
  './',
  './index.html',
  './css/style.css',
  './js/config.js',
  './js/state.js',
  './js/combat.js',
  './js/offline.js',
  './js/progress.js',
  './js/data/stages.js',
  './js/data/buildings.js',
  './js/data/heroLevels.js',
  './js/data/weapons.js',
  './js/data/specials.js',
  './js/ui.js',
  './js/main.js',
  './manifest.json',
  './icon.svg',
  './icon-192.png',
  './icon-512.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_FILES))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).then((res) => {
        if (res.ok && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put(req, copy));
        }
        return res;
      }).catch(() => (req.mode === 'navigate' ? caches.match('./index.html') : Response.error()));
    }),
  );
});
