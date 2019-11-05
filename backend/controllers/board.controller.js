const boardService = require('../services/board');
const { Task } = require('../models');
const taskService = require('../services/task');

exports.getBoards = async function (req, res, next) {

    const myId = req.user.id;

    try {
        const boards = await boardService.getBoards({ where: { owner: myId } });

        if (boards.length > 0) {
            return res.status(200).json({ message: 'Boards are found!', boards })
        }

        throw new Error('Boards are not found!')
    }

    catch (e) {
        return res.status(204).json({ message: e.message })
    }
}

exports.removeBoard = async function (req, res, next) {
    const { id } = req.params;

    try {
        await boardService.removeBoard({
            where: {
                id: id
            },
            include: [{
                model: Task,
                where: { boardId: id },
                as: 'task',
            }]
        })
        return res.status(200).json({ message: 'Board is removed!' })
    }

    catch (e) {
        return status(400).json({ message: 'Board is not removed!' })
    }
}
exports.createBoard = async function (req, res, next) {
    const { title, color } = req.body;
    const owner = req.user.id;
    const query = { title, owner, color };

    try {
        const board = await boardService.createBoard(query);
        return res.status(200).json({ message: 'Board is added!', board })
    }

    catch (e) {
        return res.status(400).json({ message: 'Board not added!' })
    }
}

exports.getBoard = async function (req, res, next) {

    const { id } = req.params;

    try {
        const board = await boardService.getBoard({ where: { id: id } });

        if (!board) {
            return res.status(404).json({ message: 'Board is not found!' })
        }

        const todoTasks = await taskService.getTasks(id, 'todo')
        const doingTasks = await taskService.getTasks(id, 'doing')
        const doneTasks = await taskService.getTasks(id, 'done')

        return res.status(200).json({ message: 'Tasks are found!', board, tasks: {todoTasks, doingTasks, doneTasks} })

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
        return res.status(200).json({ message: 'Title of board is updated!' })
    }

    catch (e) {
        return res.status(400).json({ message: 'Title of board is not updated!' })
    }
}


