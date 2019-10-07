const boardService = require('../services/board');

exports.getBoards = async function (req, res, next) {

    try {
        const boards = await boardService.getBoards();

        if (boards.length > 0) {
            return res.status(200).json({ message: 'Boards are found!', data: boards })
        }

        throw new Error('Boards are not found!')
    }

    catch (e) {
        return res.status(204).json({ message: e.message })
    }
}
