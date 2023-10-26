

if ( navigator.serviceWorker ) {
    navigator.serviceWorker.register('/sw.js');
}

if ( window.caches ) {

    // va al cache e intenta abrir un espacio llamado 
    // prueba-1 si no existe crealo
    // podemos crear N caches
    // pero afecta el rendimiento de la aplicacion 
    caches.open('prueba-1');
    caches.open('prueba-2');

    // podemos preguntar si un cache existe
    // caches.has('prueba-2').then( console.log );

    // Elimina un cache
    // caches.delete('prueba-1').then( console.log )

    // Aqui basicamente es como establecer conexion con lo
    // que se tiene en cache
    caches.open('cache-v1.1').then(cache => {
        
        // Añadimos un archivo al cache
        // cache.add('/index.html');

        // añadimos varios elementos al cache
        cache.addAll([
            '/index.html',
            '/css/style.css',
            '/img/main.jpg'
        ]).then(() => {
            // eliminamos algo especifico de cache-v1.1 
            // cache.delete('/css/style.css').then(console.log);

            // Actualizamos un archivo de la cache
            cache.put('index.html', new Response('HOLA MUNDO'))
        });

        // Accedemos a informacion dentro de la cache
        // cache.match('/index.html')
        //     .then(res => {
        //         res.text().then(console.log)
        //     });

    });

    // Retorna un arreglo de todos los caches 
    // es decir lo que tiene cada cache
    // aqui se han creado 3 caches
    // prueba-1, prueba-2, cache-v1.1
    caches.keys().then(keys => {
        console.log(keys)
    })

}