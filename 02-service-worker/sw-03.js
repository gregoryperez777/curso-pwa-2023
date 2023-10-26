// Tarea Interceptar peticion main.jpg y cambiar por main-patas-arriba.jpg
self.addEventListener('fetch', event => {

    if (event.request.url.includes('main.jpg')) {

        const newUrl = event.request.url.replace('main.jpg', 'main-patas-arriba.jpg');    
        const newImg = fetch(newUrl);

        event.respondWith(newImg);
    }

});