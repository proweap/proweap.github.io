// service-worker.js

// Define the cache name and files to cache
const CACHE_NAME = 'my-site-cache-v1';
const URLS_TO_CACHE = [
  '/', // Cache the root URL
  '/index.html', // Cache the HTML file
  '/styles.css', // Cache the CSS file
  '/script.js', // Cache the JavaScript file
  '/manifest.json', // Cache the PWA manifest file
  '/images/logo.png', // Cache a logo image
];

// Install event: Caches the specified files during the service worker installation
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Install event');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
});

// Activate event: Cleans up old caches when the service worker is activated
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activate event');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event: Serves files from the cache or fetches from the network
self.addEventListener('fetch', (event) => {
  console.log(`[Service Worker] Fetch event for ${event.request.url}`);
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log(`[Service Worker] Serving cached: ${event.request.url}`);
        return cachedResponse;
      }

      console.log(`[Service Worker] Fetching from network: ${event.request.url}`);
      return fetch(event.request).then((networkResponse) => {
        if (
          !networkResponse ||
          networkResponse.status !== 200 ||
          networkResponse.type !== 'basic'
        ) {
          return networkResponse;
        }

        // Cache the new response for future use
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      });
    })
  );
});

// Listen for message events (e.g., to trigger skipWaiting)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
