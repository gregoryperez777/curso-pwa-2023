importScripts('js/sw-utils.js');

const CACHE_STATIC  = 'static-v1';
const CACHE_DYNAMIC = 'dynamic-v1';
const CACHE_INMUTABLE = 'inmutable-v1';

const APP_SHELL_STATIC = [
    '/',
    'index.html',
    'style/base.css',
    'style/plain_sign_in_blue.png',
    'style/bg.png',
    'js/base.js',
    'js/app.js'
];

const APP_SHELL_INMUTABLE = [
    'js/pouchdb-nightly.js',
    'https://cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js'
];

self.addEventListener('install', e => {
    const cacheStatic = caches.open(CACHE_STATIC).then(cache => cache.addAll(APP_SHELL_STATIC));
    const cacheInmutable = caches.open(CACHE_INMUTABLE).then(cache => cache.addAll(APP_SHELL_INMUTABLE));

    e.waitUntil( Promise.all([cacheStatic, cacheInmutable]) ); 
});

self.addEventListener('activate', e => {
    const respuesta = caches.keys().then(keys => {
        keys.forEach( key => {
            if (key !== CACHE_STATIC && key.includes('static')) {
                return caches.delete(key);
            }

            if (key !== CACHE_DYNAMIC && key.includes('dynamic')) {
                return caches.delete(key);
            }
        });
    });

    e.waitUntil(respuesta);
});

self.addEventListener('fetch', e => {
    const response = caches.match(e.request).then(res => {
        if (res) return res;

        return fetch(e.request).then(newResp => {
            return actualizaCacheDinamico(CACHE_DYNAMIC, e.request, newResp); 
        });
    })

    e.respondWith(response);
});