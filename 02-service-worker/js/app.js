// if ('serviceWorker' in navigator) {
//     console.log('podemos usarlo');
// }

// Confirma si podemos usar el SW
if (navigator.serviceWorker) {
    // El SW se debe colocar en la raiz del proyecto
    // o al mismo nivel de donde se encuentra el index.html
    navigator.serviceWorker.register('/sw.js');
}

// Nota Importante
// El services worker puede instalarse 
// en cualquier parte del proyecto
// sin embargo si se instala dentro de
// una carpeta el SW tendra control total
// sobre esa carpeta unicamente
// y lo que se quiere es que el service worker
// tenga control total sobre la aplicacion
// es por eso que se instala en la raiz