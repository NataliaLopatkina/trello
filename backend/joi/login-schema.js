const Joi = require('joi')

const loginSchema = Joi.object().keys({
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().min(5).required(),
})

module.exports = loginSchema;
