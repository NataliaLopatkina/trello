const Joi = require('joi')

const createTaskSchema = Joi.object().keys({
    title: Joi.string().required(),
    boardId: Joi.number().integer().required(),
    state: Joi.string().required()
})

const updateTaskSchema = Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
})

const moveTaskSchema = Joi.object().keys({
    state: Joi.string().required(),
    tasks: Joi.array().required(),
})

module.exports = {
    createTaskSchema,
    updateTaskSchema,
    moveTaskSchema
}
