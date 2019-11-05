const { Task } = require('../models');

const sequelize = require('sequelize');

exports.getTasks = async function (id, state) {
    return await Task.findAll({where: { boardId: id, state: state }}, ['order', 'DESC'])
}

exports.createTask = async function (query) {
    return await Task.create(query);
}

exports.deleteTask = async function (query) {
    return await Task.destroy(query);
}

exports.updateTask = async function (id, text) {
    return await Task.update(id, text)
}

exports.moveTask = async function(state, tasks) {
    await sequelize.Promise.each(tasks, (task, index)=> {
        return Task.update({
            state: state, order: index
        }, {
            where: {
                id: task.id
            }
        })
    })
}
