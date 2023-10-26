// Manejar Errores 404

// Nota los errores 404
// no los maneja el catch

self.addEventListener('fetch', event => {
    
    const resp = fetch( event.request )
        .then( resp => {
            // if (resp.ok) return resp;
            // else return fetch('img/main.jpg');

            return resp.ok ? resp : fetch('img/main.jpg');
        });


    event.respondWith(resp);
});