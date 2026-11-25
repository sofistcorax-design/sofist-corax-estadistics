// Service worker Sofist Corax: la página (HTML) siempre se pide primero a la red,
// así una versión nueva nunca queda tapada por una copia vieja en caché.
const CACHE = "sofist-corax-v7";
const SHELL = ["manifest.json", "icon-192.png", "icon-512.png", "icon-maskable-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL).catch(() => {})));
  self.skipWaiting();
});
self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});
self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  // Firebase, Google y cualquier otro origen: nunca interceptar (evita romper la sesión).
  if (url.origin !== location.origin) return;
  const isPage = req.mode === "navigate" || url.pathname.endsWith(".html") || url.pathname.endsWith("/");
  if (isPage) {
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(CACHE).then(x => x.put(req, c)); return r; })
      .catch(() => caches.match(req).then(r => r || caches.match("index.html"))));
    return;
  }
  e.respondWith(caches.match(req).then(r => r || fetch(req).then(n => { const c = n.clone(); caches.open(CACHE).then(x => x.put(req, c)); return n; })));
});
