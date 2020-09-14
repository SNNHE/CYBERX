const CACHE_NAME = 'my-sw-v1'
const urlsCache = [
  './css/swiper-3.4.2.min.css',
  './js/jquery.min.js',
  './js/TweenMax.min.js',
  './js/swiper-3.4.2.jquery.min.js',
  './js/three.min.js',
  './js/i18next.min.1.11.2.js',
]
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('caches', cache);
      return cache.addAll(urlsCache)
    })
  )
})