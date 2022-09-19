const { response } = require('express');
const Usuario = require('../models/usuario');

const getUsuarios = async (req, res = response) => {

    try {
        const usuarios = await Usuario
        .find({ _id: { $ne: req.uid } })
        .sort('-online');

        res.status(200).json({
            ok: true,
            usuarios
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor.'
        });
    }

}

module.exports = {
    getUsuarios,
}