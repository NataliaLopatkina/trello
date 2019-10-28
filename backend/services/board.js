const { Board } = require('../models');

exports.createBoard = async function (query) {
    return await Board.create(query);
}

exports.removeBoard = async function (query) {
    return await Board.destroy(query);
}

exports.updateBoard = async function (id, title) {
    return await Board.update({title: title}, {where: {id: id}})
}

exports.getBoards = async function (query) {
    return await Board.findAll(query);
}

exports.getBoard = async function (query) {
    return await Board.findOne(query)
}
