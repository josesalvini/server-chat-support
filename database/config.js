const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log('Init conexión bd!!!');

        await mongoose.connect(process.env.DB_CNN);

        console.log('Base de datos OnLine!!!');

    } catch (error) {
        console.log('Error de conexion con la base de datos.')
        console.log(error);
    }
}

module.exports = {
    dbConnection
}