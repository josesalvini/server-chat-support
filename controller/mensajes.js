const { response } = require('express');
const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res = response) => {

    const idUsuario = req.uid;
    const mensajeDe = req.params.de;

    try {
        const lastMensajes = await Mensaje.find({
            $or: [{de: idUsuario, para: mensajeDe},
                  {de: mensajeDe, para: idUsuario}]
        })
        .sort({createdAt: 'desc' })
        .limit(30);

        res.status(200).json({
            ok: true,
            mensajes: lastMensajes
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error interno del servidor.'
        });
    }

}

module.exports = {
    obtenerChat,
}