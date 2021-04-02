/*
    path: api/login
*/
const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, loginUser, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();


router.post('/new', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    //check('password', 'El password es obligatorio').isStrongPassword(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],crearUsuario);

router.post('/', [
    check('email', 'Email incorrecto').isEmail(),
    check('password', 'Password incorrecto').notEmpty(),
    validarCampos
], loginUser);

router.get('/renew', validarJWT, renewToken );


module.exports = router;