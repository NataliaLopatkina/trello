const { Board } = require('../models');

exports.createBoard = async function (query) {
    return await Board.create(query);
}
