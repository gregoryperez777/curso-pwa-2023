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
                '/img/noimg.jpg',
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
    // 5- Cache & Network Race
    // Esta estrategia plantea una competencia 
    // para ver cual de los 2 responde primero
    // (Cache vs Network)

    // puede darse el caso que el usuario tenga
    // un cache muy lento pero una velocidad de
    // internet muy rapida

    // entonces el usuario obtendra la respuesta mas 
    // rapida de ambas peticiones+


    const respuesta = new Promise((resolve, reject) => {
        let rechazada = false;

        const falloUnaVez = () => {
            if (rechazada) {
                if ( /\.(png|jpg)$/i.test(e.request.url) ) {
                    resolve(caches.match('/img/noimg.jpg'))
                } else {
                    reject('No se encontro respuesta');
                }
            } else {
                rechazada = true;
            }
        };

        fetch(e.request).then(res => {
            res.ok ? resolve(res) : falloUnaVez();
        }).catch(falloUnaVez);

        caches.match(e.request).then(res => {
            res ? resolve(res) : falloUnaVez()
        }).catch(falloUnaVez);

    })

    e.respondWith(respuesta);
});