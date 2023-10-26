// Guardar APP SHELL
// APP SHELL: es lo que la app necesita para que 
// funcione tales como codigo, estilos, imgs, texto
// basicamente lo que se requiere cargar 
// rapidamente

// Esto se hace cuando se instala el sw
const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DINAMYC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

const CACHE_DINAMYC_LIMIT = 50;

function limpiarCache (cacheName, numeroItems) {
    caches.open(cacheName)
        .then(cache => {
            cache.keys()
                .then(keys => {
                    if (keys.length > numeroItems) {
                        cache.delete(keys[0])
                            .then(limpiarCache(cacheName, numeroItems))
                    }
                })
        });
}


self.addEventListener('install', e => {
    const cacheStaticProm = caches.open(CACHE_STATIC_NAME)
        .then(cache => {
            
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                '/js/app.js'
            ]);
        });

    const cacheInmutableProm = caches.open(CACHE_INMUTABLE_NAME)
        .then(cache => cache.add('https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css'))

    e.waitUntil( Promise.all([cacheStaticProm, cacheInmutableProm]) ); 
});

// Las estrategias del cache se hacen en el 
// evento fetch

self.addEventListener('fetch', e => {
    // 4- Cache with network update
    // es util cuando el rendimiento es critico
    // para que el usuario sienta que es una 
    // app nativa pero nos interesa las actualizaciones
    // pero nuestras actualizaciones siempre estaran 
    // un paso atras de la version web que se encuentra
    // en ese momento
    // en otras palabras cuando haya un cambio en cualquier
    // parte de la app se los trae y lo refleja 

    if (e.request.url.includes('bootstrap')) {
        return e.respondWith(caches.match(e.request));
        
    }
    
    const respuesta = caches.open(CACHE_STATIC_NAME).then(cache => {

        console.log('cache static', CACHE_STATIC_NAME);

        // se entrega lo que esta en el cache
        // y se deja corriendo el fetch
        // cuando el fetch termine actualiza el 
        // CACHE_STATIC_NAME  

        fetch(e.request)
            .then(newResp => {
                cache.put(e.request, newResp)
            });

        return cache.match(e.request);
    });

    e.respondWith(respuesta);
});