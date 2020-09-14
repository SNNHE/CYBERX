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