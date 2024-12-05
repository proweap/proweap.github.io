// serviceWorkerRegistration.js
// Registers the service worker to enable PWA functionality.

export function registerServiceWorker() {
  // Check if service workers are supported in the current browser
  if ('serviceWorker' in navigator) {
    console.log('[Service Worker] Service Worker is supported by this browser.');

    // Register the service worker after the page loads
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then((registration) => {
          console.log('[Service Worker] Registered successfully:', registration);

          // Check if there's an update to the service worker
          if (registration.waiting) {
            console.log('[Service Worker] New service worker is waiting.');
            notifyUserAboutUpdate(registration);
          }

          if (registration.installing) {
            console.log('[Service Worker] Service worker is installing.');
            trackInstalling(registration.installing);
          }

          registration.addEventListener('updatefound', () => {
            console.log('[Service Worker] Update found.');
            trackInstalling(registration.installing);
          });
        })
        .catch((error) => {
          console.error('[Service Worker] Registration failed:', error);
        });
    });
  } else {
    console.warn('[Service Worker] Service Workers are not supported in this browser.');
  }
}

/**
 * Notify the user about a waiting service worker update.
 * @param {ServiceWorkerRegistration} registration - The service worker registration object.
 */
function notifyUserAboutUpdate(registration) {
  // Customize this function to show a UI notification about the update
  console.log('[Service Worker] Update available. Prompting user to refresh.');
  const userConfirmed = window.confirm('A new version is available. Do you want to update?');
  if (userConfirmed) {
    registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    window.location.reload();
  }
}

/**
 * Track the installing service worker's state changes.
 * @param {ServiceWorker} worker - The installing service worker.
 */
function trackInstalling(worker) {
  worker.addEventListener('statechange', () => {
    console.log(`[Service Worker] State changed to: ${worker.state}`);
    if (worker.state === 'installed') {
      if (navigator.serviceWorker.controller) {
        console.log('[Service Worker] New service worker installed and is waiting.');
        notifyUserAboutUpdate(worker);
      } else {
        console.log('[Service Worker] Content is now available offline.');
      }
    }
  });
}

/**
 * Unregister all active service workers (for debugging or resetting).
 */
export function unregisterServiceWorker() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister()
          .then(() => console.log('[Service Worker] Unregistered successfully.'));
      })
      .catch((error) => console.error('[Service Worker] Unregistration failed:', error));
  }
}
