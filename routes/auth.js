/*
    path: api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crear, login, renewToken } = require('../controller/auth');
const { validateFields } = require('../middlewares/validate_fields');
const { validateJWT } = require('../middlewares/validate_token');

const router = Router();

router.post('/new',[
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('email', 'El email es obligatorio.').not().isEmpty().isEmail(),
    check('password', 'El paswword es obligatorio.').not().isEmpty(),
    check('password', 'El paswword debe contener al menos 6 caracteres.').isLength({ min: 6 }),
    validateFields,
],
crear);

router.post('/',[
    check('email', 'El email es obligatorio.').not().isEmpty().isEmail(),
    check('password', 'El paswword es obligatorio.').not().isEmpty(),
    check('password', 'El paswword debe contener al menos 6 caracteres.').isLength({ min: 6 }),
    validateFields,
],
login);

router.get('/renew', validateJWT , renewToken);

module.exports = router;