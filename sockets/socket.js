const {io}  = require('../index');

//Mensajes de sockets
io.on('connection', (client) => {
    //client.on('event', data => { /* … */ });
    console.log('Cliente conectado', client.id);

    client.on('disconnect', () => {
        console.log('Cliente desconectado', client.id);
    });

});