const boardService = require('../services/board');

exports.createBoard = async function(req, res, next) {
    const { title, color } = req.body;
    const authorId = req.user.id;
    const query = { title, authorId, color };

    try {
        const board = await boardService.createBoard(query);
        return res.status(200).json({message: 'Board is added!', color: board.color})
    }

    catch(e) {
        return res.status(400).json({message: 'Board not added!'})
    }
}
