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

    // 3- Network with cache fallback
    // Esta estragia va primero a internet 
    // intenta obtener el recurso y si lo 
    // obtiene lo muestra sino intenta ver si 
    // existe en el cache

    // Problemas
    // Cuando estamos en un dispositivo movil
    // siempre va a intentar obtener las informacion
    // mas actualizada y esto lleva a 2 inconvenientes

    // 1- siempre hace un fetch lo que implica que siempre
    // hay un consumo de datos

    // 2- Es mas lenta que la estrategia de cache with Network Fallback
    // ya que entrega lo que esta en el cache y ya pero con esta tiene que 
    // hacer una descarga de recursos

    // lo que imparia al usuario dependiendo de la red con la que cuente
    // 2g/3g/4g y ademas no todos lo usuarios tienen planes ilimitados de 
    // internet
    const respuesta = fetch(e.request).then(res => {

        console.log('Fetch', res);

        if (!res) {
            return caches.match(e.request);
        }

        caches.open(CACHE_DINAMYC_NAME)
            .then(cache => {
                cache.put(e.request, res);
                limpiarCache(CACHE_DINAMYC_NAME, CACHE_DINAMYC_LIMIT);
            });

        return res.clone();
    }).catch(err => {
        return caches.match(e.request);
    })


    e.respondWith(respuesta);
});