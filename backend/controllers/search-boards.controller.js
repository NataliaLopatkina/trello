const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const boardService = require('../services/board');

exports.searchBoards = async function (req, res, next) {
    const { value} = req.query;
    const query = { where: { title: { [Op.iLike]: `%${value}%`}}};

    try {
        const boards = await boardService.searchBoards(query);

        if (boards.length > 0) {
            return res.status(200).json({ message: 'Boards are found!', data: boards })
        }

        throw new Error('Boards are not found!')
    }

    catch (e) {
        return res.status(204).json({ message: e.message })
    }
}
