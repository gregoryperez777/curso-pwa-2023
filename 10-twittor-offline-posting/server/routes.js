// Routes.js - Módulo de rutas
var express = require('express');
var router = express.Router();

const mensajes = [
  {
    _id: 'XXX',
    user: 'spiderman',
    mensaje: 'Hola Mundo'
  }
];

// Get mensajes
router.get('/', function (req, res) {
  // res.json('Obteniendo mensajes');

  res.json(mensajes);
});

// Post mensajes
router.post('/', function (req, res) {
  // res.json('Obteniendo mensajes');

  console.log('req.body', req.body);

  const mensaje = {
    mensaje: req.body.mensaje,
    user: req.body.user
  }
  
  mensajes.push(mensaje);

  console.log('mensajes', mensajes);


  res.json({
    ok: true,
    mensaje
  });
});



module.exports = router;