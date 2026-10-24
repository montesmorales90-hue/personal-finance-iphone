/* Personal Finance Planner service worker d2c127adc490 (generated) */
const VERSION = "d2c127adc490";
const CACHE = 'pf-shell-' + VERSION;
const ASSETS = ["./","./assets/index-BFGCaj6T.js","./assets/index-Ckfecvwc.css","./assets/sql-wasm-Bku9E_kW.wasm","./icons/apple-touch-icon.png","./icons/icon-192.png","./icons/icon-512.png","./icons/maskable-512.png","./index.html","./manifest.webmanifest"];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS.map((a) => new Request(a, { cache: 'reload' }))))); });
self.addEventListener('activate', (e) => { e.waitUntil((async () => { for (const k of await caches.keys()) if (k.startsWith('pf-shell-') && k !== CACHE) await caches.delete(k); await self.clients.claim(); })()); });
self.addEventListener('message', (e) => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); if (e.data === 'VERSION') e.source && e.source.postMessage({ version: VERSION }); });
self.addEventListener('fetch', (e) => {
  const r = e.request; if (r.method !== 'GET') return; const u = new URL(r.url); if (u.origin !== location.origin) return; // never touch cross-origin traffic
  e.respondWith((async () => {
    const c = await caches.open(CACHE); const hit = await c.match(r, { ignoreSearch: true }); if (hit) return hit;
    if (r.mode === 'navigate') { const shell = (await c.match('./index.html')) || (await c.match('./')); if (shell) return shell; }
    return fetch(r); // not part of the app shell: pass through, do NOT cache
  })());
});
