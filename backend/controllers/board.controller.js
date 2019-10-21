const boardService = require('../services/board');

exports.createBoard = async function(req, res, next) {
    const { title, color } = req.body;
    const owner = req.user.id;
    const query = { title, owner, color };

    try {
        const board = await boardService.createBoard(query);
        return res.status(200).json({message: 'Board is added!', board})
    }

    catch(e) {
        return res.status(400).json({message: 'Board not added!'})
    }
}

exports.getBoards = async function (req, res, next) {

    const myId = req.user.id;
    const query = { where: { owner: myId } }

    try {
        const boards = await boardService.getBoards(query);

        if (boards.length > 0) {
            return res.status(200).json({ message: 'Boards are found!', boards })
        }

        throw new Error('Boards are not found!')
    }

    catch (e) {
        return res.status(204).json({ message: e.message })
    }
}

exports.getBoard = async function (req, res, next) {

    const { id } = req.params;

    try {
        const board = await boardService.getBoard({where: {id: id}});

        if (board) {
            return res.status(200).json({ message: 'Board is found!', board: board})
        }

        throw new Error('Board is not found!')
    }

    catch (e) {
        return res.status(204).json({ message: e.message })
    }
}

exports.updateBoard = async function (req, res, next) {
    const { title } = req.body;
    const { id } = req.params;

    try {
        await boardService.updateBoard(id, title)
        return res.status(200).json({message: 'Title of board is updated!'})
    }

    catch(e) {
        return status(400).json({message: 'Title of board is not updated!'})
    }
}
