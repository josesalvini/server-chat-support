const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crear = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(404).json({
                ok: false,
                msg: 'Los datos ingresados no son validos.'
            });
        }
        const usuario = new Usuario(req.body);
        //Encriptar contraseña usuario
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar token
        const token = await generarJWT(usuario.id)

        res.status(200).json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error interno del servidor.'
        });
    }


}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'Los datos ingresados no son validos.'
            });
        }
        const validPassword = bcrypt.compareSync(password, usuario.password );
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Los datos ingresados no son validos.'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error interno del servidor.'
        });
    }



}

const renewToken = async (req, res = response) => {

    const uid = req.uid;

    //Generar nuevo JWT
    const token = await generarJWT(uid);
    try {
        const usuario = await Usuario.findById({_id: uid});

        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'Los datos del token no son validos.'
            });
        }
        res.status(200).json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error interno del servidor.'
        });
    }

}

module.exports = {
    crear,
    login,
    renewToken,
}