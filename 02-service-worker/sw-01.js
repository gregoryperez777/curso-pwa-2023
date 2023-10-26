// El services worker va a contener 
// acciones o eventos que sucedan en 
// la pagina no codigo de javascript
// referentes a otras cosas

// Nota
// self = this 
// this apunta al SW

self.addEventListener('fetch', event => {

    // if (event.request.url.includes('style.css')) {
    //     event.respondWith(null);
    // } else {
    //     event.respondWith( fetch(event.request) );
    // }

    if (event.request.url.includes('.jpg')) {
        console.log(event.request.url);

        // let fotoReq = fetch('img/main.jpg');
        // let fotoReq = fetch('event.request.url');
        let fotoReq = fetch(event.request);

        event.respondWith(fotoReq);
    }


});