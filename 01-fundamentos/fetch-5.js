// El ReadableStream solo puede leerse una vez
// pero si queremos hacer uso de el varias veces 
// exite el metodo clone
// que nos permite hacer un clone del mismo
// e interartuar con ellos 


fetch('https://reqres.in/api/users/1000')
    .then(resp => {

        console.log(resp);

        if (resp.ok) {
            return resp.json()
        } else {
            console.log('No existe el usuario 1000')
            throw new Error('No existe el usuario 1000')
        }

        // resp.clone().json()
        //     .then(usuario => {
        //         console.log(usuario)
        //     })

        // resp.json().then(usuario => {
        //     console.log(usuario.data);
        // })
    })
    .then(console.log)
    .catch(error => {
        console.log('Error en la peticion')
        console.log(error)
    })
