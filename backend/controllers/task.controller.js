const taskService = require('../services/task');

exports.createTask = async function (req, res, next) {
    const { title, boardId, state } = req.body;

    try {
        await taskService.createTask({title: title, boardId: boardId, state: state});
        return res.status(200).json({ message: 'Task is added!' })
    }

    catch (e) {
        return res.status(400).json({ message: 'Task is not added!' })
    }
}

exports.deleteTask = async function (req, res, next) {
    const { id } = req.params;

    try {
        await taskService.deleteTask({where: {id: id}});
        return res.status(200).json({message: 'Task is removed!'})
    }

    catch (e) {
        return res.status(400).json({message: 'Task is not deleted!'})
    }
}

exports.getTasks = async function (req, res, next) {
    try {
        const tasks = await taskService.getTasks();

        if(tasks.length > 0) {
            return res.status(200).json({ message: 'Tasks are found!', data: tasks })
        }

        throw new Error('Tasks are not found!')
    }

    catch(e) {
        return res.status(204).json({message: e.message})
    }
}
