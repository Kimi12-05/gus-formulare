// Offline-Speicher für GuS Formulare
// Bei jeder Änderung an der App die Nummer erhöhen, damit die iPhones die neue Version laden
const CACHE = 'gus-formulare-v1';
// Weitere Dateien (Schriften, Bilddecoder) werden beim ersten Gebrauch automatisch gespeichert
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './lib/pdf-lib.min.js',
  './lib/pdfjs.min.js',
  './lib/pdfjs.worker.min.js',
  './lib/wasm/jbig2.wasm',
  './lib/wasm/openjpeg.wasm',
  './lib/wasm/qcms_bg.wasm',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png'
];
const XLSX_URL = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js';

self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE);
    try { await cache.add(new Request(XLSX_URL, { mode: 'no-cors' })); } catch (e) {}
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const own = url.origin === self.location.origin;
  if (!own && url.hostname !== 'cdnjs.cloudflare.com') return;

  // Seite selbst: zuerst aus dem Netz (damit Updates ankommen), sonst aus dem Speicher
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const res = await fetch(req);
        const cache = await caches.open(CACHE);
        cache.put('./index.html', res.clone());
        return res;
      } catch (e) {
        return (await caches.match('./index.html')) || Response.error();
      }
    })());
    return;
  }

  // Alles andere: zuerst aus dem Speicher
  event.respondWith((async () => {
    const hit = await caches.match(req);
    if (hit) return hit;
    const res = await fetch(req);
    if (res.ok || res.type === 'opaque') {
      const cache = await caches.open(CACHE);
      cache.put(req, res.clone());
    }
    return res;
  })());
});
