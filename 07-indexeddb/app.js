
// indexedDB: Reforzamiento

const request = window.indexedDB.open('mi-database', 2);

// Se actualiza cuando se crea o se se sube de version de la DB
request.onupgradeneeded = event => {
    console.log('Actualizacion de DB');

    const db = event.target.result;

    // Create collection
    db.createObjectStore('heroes', {
        keyPath: 'id'
    });
}

// Manejo de errores 
request.onerror = event => {
    console.log('DB error', event.target.error);
}

//insertar datos
request.onsuccess = event => {
    const db = event.target.result;

    const heroesData = [
        {
            id: '1111',
            heroe: 'Spiderman',
            mensaje: 'Aqui su amigo spiderman'
        },
        {
            id: '2222',
            heroe: 'Ironman',
            mensaje: 'Aqui en mi nuevo Mark 50'
        }
    ];

    const heroesTransaction = db.transaction('heroes', 'readwrite');

    heroesTransaction.onerror = event => {
        console.log('Error guardando', event.target.error)
    }

    // Informa sobre el éxito de la transacción
    heroesTransaction.oncomplete = event => {
        console.log('Transaccion hecha', event);
    }

    let heroesStore = heroesTransaction.objectStore('heroes');

    for (let heroe of heroesData) {
        heroesStore.add(heroe)
    }

    heroesStore.onsuccess = event => {
        console.log('Nuevo item agregado a la base de datos');
    }
}


