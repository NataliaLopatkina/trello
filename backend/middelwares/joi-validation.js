const Joi = require('joi');

const joiValidation = (schema, property) => {
    return (req, res, next) => {
        const { error } = Joi.validate(req[property], schema);
        const valid = error == null;
        if (valid) {
            return next();
        }
        else {
            const { details } = error;
            const message = details.map(i => i.message).join(',')
            return res.status(422).send({ message });
        }
    }
}
module.exports = joiValidation;
