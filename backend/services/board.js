const { Board } = require('../models');

exports.createBoard = async function (query) {
    return await Board.create(query);
}

exports.getBoards = async function () {
    return await Board.findAll();
}

exports.searchBoards = async function (query) {
    return await Board.findAll(query);
}
