const usuario = require('../models/usuario');
const Usuario = require('../models/usuario');
const Mensaje = require('../models/mensaje');

const usuarioConectado = async (uid = '') => {

    const usuario = await Usuario.findById({_id: uid});
    if(usuario){
        usuario.online = true;
        usuario.save(usuario);
    }

    return usuario;
}

const usuarioDesconectado = async (uid = '') => {

    const usuario = await Usuario.findById({_id: uid});
    if(usuario){
        usuario.online = false;
        usuario.save(usuario);
    }

    return usuario;
}

const grabarMensaje = async (mensaje) => {
    try {
        const mensajeBD = new Mensaje(mensaje);
        //console.log('Se graba mensaje: ' + mensaje);
        await mensajeBD.save();

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje,
}