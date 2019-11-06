const Joi = require('joi')

const registrationSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(7).required(),
})

module.exports = registrationSchema;
