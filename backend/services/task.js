const { Task } = require('../models');

exports.getTasks = async function (query) {
    return await Task.findAll(query)
}

exports.createTask = async function (query) {
    return await Task.create(query);
}

exports.deleteTask = async function (query) {
    return await Task.destroy(query);
}

exports.getTask = async function (query) {
    return await Task.findOne(query)
}

exports.renameTask = async function (id, title) {
    return await Task.update({ title: title }, { where: { id: id } })
}
