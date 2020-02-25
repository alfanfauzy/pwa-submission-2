const CACHE_NAME = "sw-new-update-26";
var urlsToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/nav.html",
  "/team_detail.html",
  "/pages/klub.html",
  "/pages/klasemen.html",
  "/pages/favorit.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/main.js",
  "/js/api.js",
  "/js/klasemen.js",
  "/js/idb.js",
  "/js/database.js",
  "/js/indexedDB.js",
  "/js/team_fav.js",
  "/js/team_detail.js",
  "/img/english-league.png",
  "/img/custom_icon.png",
  "/img/icon_push.png",
  "/img/icon/icon-72x72.png",
  "/img/icon/icon-96x96.png",
  "/img/icon/icon-128x128.png",
  "/img/icon/icon-144x144.png",
  "/img/icon/icon-152x152.png",
  "/img/icon/icon-192x192.png",
  "/img/icon/icon-384x384.png",
  "/img/icon/icon-512x512.png",
];

self.addEventListener("install", function (event) {
  console.log("ServiceWorker: Menginstall..");

  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("ServiceWorker: Membuka cache..");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', function (event) {
  console.log('Aktivasi service worker baru');
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName !== CACHE_NAME && cacheName.startsWith("codepolitan-reader-lite")) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  var base_url = "https://api.football-data.org/v2/";
  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        })
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then(function (response) {
        return response || fetch(event.request);
      })
    )
  }
});

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/icon_push.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});

