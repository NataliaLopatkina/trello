const { Task } = require('../models');

exports.createTask = async function (query) {
    return await Task.create(query);
}

exports.getTasks = async function (query) {
    return await Task.findAll(query)
}
