const {io}  = require('../index');
const { validarJWT } = require('../helpers/jwt');

const { usuarioConectado,
    usuarioDesconectado,
    grabarMensaje } = require('../controller/socket');



//Mensajes de sockets
io.on('connection', (client) => {
    //client.on('event', data => { /* … */ });
    console.log('Cliente conectado', client.id);

    //console.log(client.handshake.headers);
    const [valido, uid] = validarJWT(client.handshake.headers['x-token']);
    if(!valido) { return client.disconnect();}
    //console.log('Token valido: ' + valido);
    //console.log('Id usuario: ' + uid);
    usuarioConectado(uid);

    //Ingresar al usuario en una sala en particular
    //Sala global, client.id
    //Se crea una sala con el id de la base de datos del usuario
    client.join( uid );

    client.on('mensaje-personal', async (data) =>{
        //console.log('Mensaje recibido: ' + data.msg);
        await grabarMensaje(data);
        io.to(data.para).emit('mensaje-personal', data);

    });

    client.on('disconnect', () => {
        console.log('Cliente desconectado', client.id);
        usuarioDesconectado(uid);
    });

});