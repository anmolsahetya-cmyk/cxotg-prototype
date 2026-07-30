const CACHE = 'pearl-cx-v1';

const PAGES = [
  'index.html',
  'marketing.html',
  'dashboard.html',
  'ticket-list.html',
  'ticket-detail.html',
  'ticket-detail-legacy.html',
  'create-ticket.html',
  'send-email.html',
  'notifications.html',
  'account.html',
];

const ASSETS = [
  'manifest.json',
  'shared/styles.css',
  'shared/components.js',
  'shared/data.js',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/icon-maskable-512.png',
  'assets/icons/apple-touch-icon.png',
  'assets/icons/favicon-32.png',
  'assets/fonts/FiraSans-Light.otf',
  'assets/fonts/FiraSans-Regular.otf',
  'assets/fonts/FiraSans-Medium.otf',
  'assets/fonts/FiraSans-SemiBold.otf',
  'assets/fonts/FiraSans-Bold.otf',
];

// Local dev (`npx serve`) 301-redirects "foo.html" -> "/foo". A Response
// flagged `redirected` can never be used to satisfy a navigation fetch
// (the browser throws a NetworkError), so pages are always fetched from
// their clean, non-redirecting path and stored under the ".html" key the
// app actually links to.
function cleanPath(pageFile) {
  return pageFile === 'index.html' ? './' : pageFile.replace(/\.html$/, '');
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      await cache.addAll(ASSETS);
      await Promise.all(
        PAGES.map(async (page) => {
          try {
            const response = await fetch(cleanPath(page));
            if (response.ok) await cache.put(page, response.clone());
          } catch (_) {
            // offline install — best effort, runtime fetch will retry
          }
        })
      );
      self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Stale-while-revalidate: serve from cache instantly, refresh in the background.
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const isNavigation = event.request.mode === 'navigate';
  const networkRequest = isNavigation
    ? new Request(new URL(cleanPath(new URL(event.request.url).pathname.replace(/^\//, '') || 'index.html'), event.request.url))
    : event.request;

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchPromise = fetch(networkRequest)
        .then((response) => {
          if (response && response.ok && !response.redirected) {
            const copy = response.clone();
            caches.open(CACHE).then((cache) => cache.put(event.request, copy));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fetchPromise;
    })
  );
});
