const { Board, Task } = require('../models');

exports.createBoard = async function (query) {
    return await Board.create(query);
}

exports.removeBoard = async function (id) {
    await Board.destroy({where: {id: id}})
    return await Task.destroy({where: {boardId: id}})
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
