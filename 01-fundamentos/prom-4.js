
function sumarLento( numero ) {
    return new Promise(function(resolve, reject) {
        setTimeout(function () {
            resolve(numero + 1);
            // reject('Sumar lento fallo');
        } , 800)
    })
}

let sumarRapido = (numero) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve(numero + 1, 300)
            reject(' Error en sumar rapido')
        });
    })
}


// Promise.race pone a competir a todos los parametros
// en el arreglo
// y la respuesta va hacer la que responda primero
// si llegase haber mas de 2 que responde al mismo 
// tiempo se toma la que primera que se encuentre al 
// lado izquierdo

// Consideraciones 
// si la promesa mas rapida da error 
// hasta alli llega el procedimiento


Promise.race([ sumarLento(5), sumarRapido(10) ])
    .then(repsuesta => {
        console.log(repsuesta);
    })
    .catch(console.log)