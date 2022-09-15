const { validationResult } = require('express-validator');

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    //console.log('Errors: ' + errors.isEmpty());
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errors.mapped()
        });
    }
    next();
}

module.exports = {
    validateFields
}