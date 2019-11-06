const Joi = require('joi')

const createBoardSchema = Joi.object().keys({
    title: Joi.string().required(),
    color: Joi.string().required(),
})

const updateBoardSchema = Joi.object().keys({
    title: Joi.string().required(),
})

module.exports = {
    createBoardSchema,
    updateBoardSchema
}
