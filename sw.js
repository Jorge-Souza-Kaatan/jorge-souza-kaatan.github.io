const CACHE = "kaatan-cache";

// ALTERAR;
const offlineArqs = [
  'acacia\\acacia.css',
  'acacia\\acacia.js',
  'acacia\\bck.svg',
  'acacia\\Chisel Mark.ttf',
  'acacia\\erro.svg',
  'acacia\\loading.svg',
  'acacia\\pointer.cur',
  'app\\app.css',
  'app\\kaatan.js',
  'app\\renderer.js',
  'files\\book.svg',
  'files\\conjunto_branco.svg',
  'files\\default.svg',
  'files\\home\\i01.svg',
  'files\\home\\i02.svg',
  'files\\home\\i03.svg',
  'files\\home\\i04.svg',
  'files\\home\\i05.svg',
  'files\\home\\i06.svg',
  'files\\home\\i07.svg',
  'files\\home\\i08.svg',
  'files\\logo128.png',
  'files\\logo256.png',
  'files\\logo512.png',
  'files\\menumini.svg',
  'files\\notification.svg',
  'files\\pointer.cur',
  'files\\ret_branco.svg',
  'files\\search.svg',
  'files\\settings.svg',
  'files\\splash.mp3',
  'index.html',
  'manifest.json',
  'views\\home'
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
