
// Guardar APP SHELL
// APP SHELL: es lo que la app necesita para que 
// funcione tales como codigo, estilos, imgs, texto
// basicamente lo que se requiere cargar 
// rapidamente

// Esto se hace cuando se instala el sw

self.addEventListener('install', e => {
    const cacheProm = caches.open('cache-1')
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

// Estrategia only cache
// una vez hecho la instalacion del SW y hemos
// creado los recursos que necesita la pagina
// entonces jamas regresa a la web


// Las estrategias del cache se hacen en el 
// evento fetch

self.addEventListener('fetch', e => {

    // 1- Cache only 
    // Esta es usada cuando queremos que toda la app
    // sea servida desde la cache es decir no hay peticion
    // que acceda a la web todo sale del cache

    // caches.match()
    // esta instruccion se va a todos los caches 
    // que se encuentran en el dominio
    // y va a regresa uno que coincida con el 
    // argumento

    // problemas 
    // 1-si jamas se actualiza el SW
    // los archivos en cache tampoco se van 
    // a actualizar porque nunca llega a la 
    // web lo que implica que si se quiere
    // actualizar uno de esos archivos 
    // tendrian que actualizar el SW

    // 2-si algun usuario trata se acceder
    // a un recurso que no esta en cache
    // la app reventaria automaticamente

    e.respondWith(caches.match(e.request))

});