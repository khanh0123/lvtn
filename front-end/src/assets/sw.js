const isLocalhost = Boolean(
    location.hostname === 'localhost' ||
    // [::1] is the IPv6 localhost address.
    location.hostname === '[::1]' ||
    // 127.0.0.1/8 is considered localhost for IPv4.
    location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
    )
);
let host = location.hostname;
const domain_host_api = '/api/v1/';
var version = "1.0.0";
var urlsToCache = [
    "/",
];
var static_file_to_cache = [
    '/index.html',
    `/manifest.json`,
    '/sw.js',
    '/firebase-messaging-sw.js',
    // `offline.html?v=${version}`,

];
var api_to_cache = [
    'movies',
    'menu',
    'graph.facebook.com',
];

var file_not_cache = [
    'facebook',
    'google',
    'fontawesome',
    'fonts.gstatic.com'
];

var CACHE_NAME = "luanvantotnghiep-fe-" + version;

// firebase.initializeApp(config);

// const messaging = firebase.messaging();

// messaging.setBackgroundMessageHandler(payload => {
//     const title = payload.notification.title ? payload.notification.title : "title";
//     const options = {
//         body: payload.notification.body ? payload.notification.body : "BODY",
//         icon: payload.notification.icon ? payload.notification.icon : "/favicon.ico",
//         data: {
//             url: '/',
//         }
//     }
//     return window.registration.showNotification(title, options);
// });

self.addEventListener("install", function (event) {
    // if (doCache) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            fetch("manifest.json")
                .then(response => {
                    response.json();
                })
                .then(assets => {
                    cache.addAll(urlsToCache);
                    cache.addAll(static_file_to_cache);
                });

        })
    );
    // }
});
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(
                keyList.map(key => {
                    if (!cacheWhitelist.includes(key)) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
})

self.addEventListener("message", e => {
    if (e.data.clearNow === true) {
        console.log('Clear cache PWA done');
        return caches.delete(CACHE_NAME);
    }
})


self.addEventListener("fetch", function (event) {
    // console.log("request:===> "+event.request.url)
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    // console.log('Found ', event.request.url, ' in cache');
                    return response;
                }

                // console.warn('##Service Worker##  Not in Cache... Making Network request for ', event.request.url);

                return fetch(event.request)
                    .then(function (response) {
                        
                        if (response.status === 404) {
                            return caches.match('/');
                        }
                        //This code prevents caching Github api responses.
                        if (event.request.url.indexOf('facebook') > -1 || event.request.url.indexOf('google') > -1 || event.request.url.indexOf('fonts.gstatic.com') > -1 || event.request.url.indexOf("user/get_login_status") > -1) {
                            // console.info('##Service Worker##  facebook and google , fontawesome requests will not be cached.');
                            return response;
                        }
                        for (let i = 0; i < api_to_cache.length; i++) {
                            if((event.request.url.indexOf(domain_host_api) > -1 && event.request.url.indexOf(api_to_cache[i]) > -1 )){
                                // console.log(event.request.url);
                                
                                caches.open(CACHE_NAME).then(function (cache) {
                                    cache.add(event.request.url);
                        
                                })
                            }
                            
                        }
                        if( event.request.url.indexOf(host) > -1 && (event.request.url.indexOf("/images/") > -1 || event.request.url.indexOf("/vendors/") > -1 || event.request.url.indexOf(".png") > -1 || event.request.url.indexOf(".jpg") > -1 || event.request.url.indexOf(".jpeg") > -1 || event.request.url.indexOf("?v=") > -1) ){
                            // console.log(event.request.url);
                            caches.open(CACHE_NAME).then(function (cache) {
                                cache.add(event.request.url);
                    
                            })
                        }
                        

                        return response
                    });
            })
            .catch(function (error) {
                console.error('##Service Worker##  Failed to fetch', event.request.url);
                return caches.match('/index.html');
            })
    );
});

self.addEventListener("notificationclick", function(event) {
    const clickedNotification = event.notification;
    clickedNotification.close();
    const promiseChain = clients
        .matchAll({
            type: "window",
            includeUncontrolled: true
         })
        .then(windowClients => {
            let matchingClient = null;
            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url === feClickAction) {
                    matchingClient = windowClient;
                    break;
                }
            }
            if (matchingClient) {
                return matchingClient.focus();
            } else {
                return clients.openWindow(feClickAction);
            }
        });
        event.waitUntil(promiseChain);
 });