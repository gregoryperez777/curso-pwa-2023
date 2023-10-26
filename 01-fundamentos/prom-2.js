function sumarUno(numero) {

    var promesa = new Promise( function(resolve, reject) {

        console.log(numero);
        if (numero >= 7) {
            reject('El numero es muy grande')
        }

        setTimeout(function() {
            resolve(numero + 1)
        },800)
    });

    return promesa;
}

// promise hell
// sumarUno(5)
//     .then(nuevoNumero => {
//         sumarUno(nuevoNumero)
//             .then(nuevoNumero2 => {
//                 console.log(nuevoNumero2);
//             })

//     })

// Encademamiento de promesas
// sumarUno(5)
//     .then(nuevoNumero => {
//         console.log(nuevoNumero);
//         return sumarUno(nuevoNumero);
//     })
//     .then(nuevoNumero => {
//         console.log(nuevoNumero);
//         return sumarUno(nuevoNumero);
//     })
//     .then(nuevoNumero => {
//         console.log(nuevoNumero);
//     })

// Tips
// Aqui estamos retornando la promesa directamente
// sumarUno(5)
//     .then(nuevoNumero => sumarUno(nuevoNumero))
//     .then(nuevoNumero => {
//         console.log(nuevoNumero);
//         return sumarUno(nuevoNumero);
//     })
//     .then(nuevoNumero => {
//         console.log(nuevoNumero);
//     })

// Si los argumentos que recibe el then son iguales
// que los argumentos de la funcion podemos 
// hacer esto 
// sumarUno(5)
//     .then( sumarUno )
//     .then(nuevoNumero => {
//         console.log(nuevoNumero);
//         return sumarUno(nuevoNumero);
//     })
//     .then(nuevoNumero => {
//         console.log(nuevoNumero);
//     })

sumarUno(5)
    .then( sumarUno )
    .then( sumarUno )
    .then( sumarUno )
    .then(nuevoNumero => {
        console.log(nuevoNumero);
    })
    .catch(error => {
        console.log('Error en la promesa');
        console.log(error);
    });


