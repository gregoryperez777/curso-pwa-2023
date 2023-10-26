
// Ciclo de vida del SW

// Se dispara cada vez que hay un cambio
// en el SW (cualquier cosa)

// Ahora eso no quiere decir que el SW
// se activa
self.addEventListener('install', event => {
    
    // Descargar assets
    // Creamos un cache
    
    console.log('SW: Instalando SW')

    const instalacion = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Instalaciones terminadas');
            self.skipWaiting();
            resolve();
        }, 1)
    })


    // Esta instruccion se utiliza para actualizar el nuevo service
    // worked

    // No se recomienda utilizarla asi pero existe
    // lo mejor es que el cliente recargue la web
    // self.skipWaiting();

    event.waitUntil(instalacion);
});

// cuando el sw toma el control de la aplicacion

self.addEventListener('activate', event => {

    // Borrar Cache viejo

    console.log('SW: activo y listo para controlar la app');

})

// FETCH: Manejo de peticiones HTTP
self.addEventListener('fetch', event => {

    // Aplicar estrategias del cache
    // console.log('SW: ', event.request.url);

    // if (event.request.url.includes('https://reqres.in/')) {
    //     const res = new Response(`{ ok: false, mensaje: 'JAJAJA' }`);

    //     event.respondWith(res);
    // }
});

// SYNC: Recuperamos conexion a internet
self.addEventListener('sync', event => {
    console.log('Tenemos conexion');
    console.log(event);
    console.log(event.tag);
});

// PUSH: Manejar las push notifications
self.addEventListener('push', event => {
    console.log('Notificacion recibida');
});


