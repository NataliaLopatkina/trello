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

exports.renameTask = async function (id, title) {
    return await Task.update({ title: title }, { where: { id: id } })
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
