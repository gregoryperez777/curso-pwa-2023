// Interceptar peticion style.css y cambiar el css
self.addEventListener('fetch', event => {
    if (event.request.url.includes('style.css')) {
        const respuesta = new Response(`
            body {
                background-color: red !important;
                color: pink;
            }
        `, { 
            headers: {
                'Content-Type': 'text/css'
            }
        });

        event.respondWith(respuesta);
    }
});