/*
    path: api/usuario
*/
const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate_token');
const { getUsuarios } = require('../controller/usuarios');

const router = Router();


router.get('/', validateJWT , getUsuarios);

module.exports = router;