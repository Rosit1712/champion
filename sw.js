importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);


workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/pages/match.html', revision: '1' },
    { url: '/pages/reminder.html', revision: '1' },
    { url: '/pages/score.html', revision: '1' },
    { url: '/pages/standing.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/style.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/icon/trophy_48.png', revision: '1' },
    { url: '/icon/trophy_96.png', revision: '1' },
    { url: '/icon/trophy_192.png', revision: '1' },
    { url: '/icon/trophy_512.png', revision: '1' },
    { url: '/icon/loading.svg', revision: '1' },
],{
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
    new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages',
    })
);

workbox.routing.registerRoute(
    /\.(?:png|jpg|webp|svg|gif)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 25,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
            }),
        ],
    })
);

workbox.routing.registerRoute(
    /^https:\/\/api\.football-data\.org/,
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'api-football',
    })
);

workbox.routing.registerRoute(
    /^https:\/\/fonts\.gstatic\.com/,
    workbox.strategies.cacheFirst({
      cacheName: 'google-fonts-webfonts',
      plugins: [
        new workbox.cacheableResponse.Plugin({
          statuses: [0, 200],
        }),
        new workbox.expiration.Plugin({
          maxAgeSeconds: 30 * 24 * 60 * 60,
          maxEntries: 30,
        }),
      ],
    })
  );