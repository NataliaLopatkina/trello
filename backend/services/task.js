const { Task } = require('../models');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.getTasks = async function (id, state) {
    return await Task.findAll({where: { boardId: id, state: state }} )
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

exports.moveTask = async function(id, state, order) {

    // await Task.update({ order: Sequelize.literal(order + 1) }, {
    //     where: {
    //         state: state, order: {
    //               [Op.gte]: order 
    //             }
    //         }
    //     });
    return await Task.update({state: state, order: order}, { where: { id: id } })
}
