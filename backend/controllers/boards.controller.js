const boardService = require('../services/board');

exports.getBoards = async function (req, res, next) {

    const myId = req.user.id;
    const query = { where: {authorId: myId} }

    try {
        const boards = await boardService.getBoards(query);

        if (boards.length > 0) {
            return res.status(200).json({ message: 'Boards are found!', data: boards })
        }

        throw new Error('Boards are not found!')
    }

    catch (e) {
        return res.status(204).json({ message: e.message })
    }
}
