const fs = require('fs');

const urlsafeBase64 = require('urlsafe-base64');
const vapid = require('./vapid.json');

const webpush = require('web-push');

webpush.setVapidDetails(
    'mailto:gregory.facyt@gmail.com',
    vapid.publicKey,
    vapid.privateKey
);


let suscripciones = require('./subs-db.json');

module.exports.getKey = () => {
    return urlsafeBase64.decode(vapid.publicKey);
};

module.exports.addSubscription = (suscripcion) => {
    suscripciones.push(suscripcion);

    fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones))

    console.log('suscripciones', suscripciones);
}

module.exports.sendPush = (post) => {

    console.log('Mandando Pushes');

    const notificacionesEnviadas = [];

    suscripciones.forEach( (suscripcion, i) => {
        const pushProm = webpush.sendNotification(suscripcion, JSON.stringify(post))
            .then( console.log('Notificacion Enviada'))
            .catch( err => {
                console.log('Notificacion Fallo');

                // Codigo para saber que un recurso ya no existe
                // es el 410
                if (err.statusCode === 410) { // GONE ya no existe
                    suscripciones[i].borrar = true;
                }
            })
        
        notificacionesEnviadas.push(pushProm);
    });

    Promise.all(notificacionesEnviadas).then(() => {
        suscripciones = suscripciones.filter(subs => !subs.borrar);

        fs.writeFileSync(`${__dirname}/subs-db.json`, JSON.stringify(suscripciones))
    });
}