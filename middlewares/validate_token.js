const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    //Leer nformacion del header para buscar token
    const token = req.header('x-token');
    //console.log(token)
    if(!token){
        res.status(401).json({
            ok: false,
            msg: 'No hay token en al solicitud.'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        next();

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no valido.'
        });
    }
}

module.exports = {
    validateJWT,
}