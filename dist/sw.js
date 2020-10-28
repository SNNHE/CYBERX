const CACHE_NAME = 'my-sw-v1'
const urlsCache = [
  '/CYBERX/',
  '/CYBERX/css/swiper-3.4.2.min.css',
  '/CYBERX/js/jquery.min.js',
  '/CYBERX/js/TweenMax.min.js',
  '/CYBERX/js/swiper-3.4.2.jquery.min.js',
  '/CYBERX/js/three.min.js',
  '/CYBERX/js/i18next.min.1.11.2.js',
]
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('caches', cache);
      return cache.addAll(urlsCache)
    })
  )
})

self.addEventListener('fetch', function(event) {
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();
        
        caches.open(CACHE_NAME).then(function (cache) {
          // cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('/CYBERX/');
      });
    }
  }));
});

self.addEventListener('activate', function(event) {
  const cacheWhiteList = [];
  console.log('caches.keys()', caches.keys());
  event.waitUntil(
    caches.keys().then(function(cacheName) {
      return Promise.all(
        cacheName.map(function(cacheName){
          if (cacheWhiteList.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      )
    })
  )
})