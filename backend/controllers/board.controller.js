const boardService = require('../services/board');

exports.createBoard = async function(req, res, next) {
    const { title } = req.body;
    const query = {title};

    try {
        await boardService.createBoard(query);
        return res.status(200).json({message: 'Board is added!'})
    }

    catch(e) {
        return res.status(400).json({message: 'Board not added!'})
    }
}
