
// Guardar APP SHELL
// APP SHELL: es lo que la app necesita para que 
// funcione tales como codigo, estilos, imgs, texto
// basicamente lo que se requiere cargar 
// rapidamente

// Esto se hace cuando se instala el sw

const CACHE_NAME = 'cache-1';

self.addEventListener('install', e => {
    const cacheProm = caches.open(CACHE_NAME)
        .then(cache => {
            
            return cache.addAll([
                '/',
                '/index.html',
                '/css/style.css',
                '/img/main.jpg',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css',
                '/js/app.js'
            ]);
        });

    e.waitUntil(cacheProm); 
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
    // y segun el profe esto no esta del todo bien
    const respuesta = caches.match(e.request)
        .then(res => {
            if (res) return res;

            // No existe el archivo
            // tengo que ir a la web
            console.log('No existe', e.request.url);
        
            return fetch(e.request).then( newResp => {
                caches.open(CACHE_NAME)
                    .then(cache => {
                        cache.put(e.request, newResp);
                    })

                return newResp.clone();
            });
        

        });       

    e.respondWith(respuesta);

});