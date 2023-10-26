// Guardar APP SHELL
// APP SHELL: es lo que la app necesita para que 
// funcione tales como codigo, estilos, imgs, texto
// basicamente lo que se requiere cargar 
// rapidamente

// Esto se hace cuando se instala el sw
const CACHE_STATIC_NAME = 'static-v2';
const CACHE_DINAMYC_NAME = 'dynamic-v1';
const CACHE_INMUTABLE_NAME = 'inmutable-v1';

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

    // 2- Cache With Network Fallback
    // Esta estrategia busca primero los archivos en
    // el cache y si no lo encuentra va a internet

    // const respuesta = caches.match(e.request)
    //     .then(res => {
    //         if (res) return res;

    //         No existe el archivo
    //         tengo que ir a la web
    //         console.log('No existe', e.request.url);
        
    //         return fetch(e.request).then( newResp => {
    //             return newResp;
    //         });
    //     });       

    // e.respondWith(respuesta);


    // 2.1- Cache With Network Fallback then cache
    // Esta estrategia busca primero los archivos en
    // el cache y si no lo encuentra va a internet
    // y cachea ese recurso para no volver a ir 

    // Problemas
    // Se mezcla el APP SHELL con recursos dinamicos
    // los cuales pueden ser obsoletos mañana
    const respuesta = caches.match(e.request)
        .then(res => {
            if (res) return res;

            // No existe el archivo
            // tengo que ir a la web
            console.log('No existe', e.request.url);
        
            return fetch(e.request).then( newResp => {
                caches.open(CACHE_DINAMYC_NAME)
                    .then(cache => {
                        cache.put(e.request, newResp);
                        limpiarCache(CACHE_DINAMYC_NAME, 50);
                    })

                return newResp.clone();
            });
        

        });       

    e.respondWith(respuesta);

});