/*
    path: api/mensaje
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_token');
const { obtenerChat } = require('../controller/mensajes');

const router = Router();

router.get('/:de', validateJWT , obtenerChat);

module.exports = router;