const CACHE = "kaatan-cache";

// ALTERAR;
const offlineArqs = [
  'kaatan/app/app.css',
  'kaatan/app/portrait.css',
  'kaatan/files/logo128.png',
  'kaatan/files/logo256.png',
  'kaatan/files/logo512.png',
  'kaatan/files/pointer.cur',
  'kaatan/files/ret_branco.svg',
  'kaatan/files/splash.mp3',
  'kaatan/index.html',
  'kaatan/list.js',
  'kaatan/manifest.json'
];

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(offlineArqs)));
});

self.addEventListener('fetch', async (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Se a solicitação for bem-sucedida, coloque a resposta no cache e retorne a resposta
        const clone = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => {
        // Se a solicitação falhar, tente buscar a resposta do cache
        return caches.match(event.request);
      })
  );
});
