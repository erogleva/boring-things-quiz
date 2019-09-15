workbox.setConfig({ debug: true });


workbox.core.setCacheNameDetails({
    prefix: 'boring-things-calculator',
    suffix: 'v2',
    precache: 'precache',
    runtime: 'runtime'
});

self.addEventListener('install', (event) => {

    const screencast = self.__precacheManifest.find((item) => item.url.includes('screencast'));

    if (screencast) {
        console.log(screencast)
        const urls = [screencast.url];
        const cacheName = 'videos';
        event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)));
    }

});

workbox.precaching.precacheAndRoute(self.__precacheManifest.filter((item) => !item.url.includes('screencast')) || []);


workbox.routing.registerRoute(
    /'https:\/\/cdn.*/,
    new workbox.strategies.NetworkFirst(),
);

workbox.routing.registerRoute(
    /.*\.mp4/,
    new workbox.strategies.CacheOnly({
        cacheName: 'videos',
        plugins: [
            new workbox.rangeRequests.Plugin(),
        ],
    }),
);
