const { Board } = require('../models');

exports.createBoard = async function (query) {
    return await Board.create(query);
}

exports.updateBoard = async function (query) {
    return await Board.update(query)
}

exports.getBoards = async function (query) {
    return await Board.findAll(query);
}
