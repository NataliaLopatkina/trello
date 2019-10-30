const taskService = require('../services/task');

exports.createTask = async function (req, res, next) {
    const { title, boardId } = req.body;

    try {
        await taskService.createTask({title: title, boardId: boardId, state: 'doing'});
        return res.status(200).json({ message: 'Task is added!' })
    }

    catch (e) {
        return res.status(400).json({ message: 'Task not added!' })
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

exports.getTask = async function (req, res, next) {
    const { id } = req.body;
    try {
        const task = await taskService.getTask({where: {id: id}})

        if (task) {
            return res.status(200).json({message: 'Task is found', task})
        }

        throw new Error('Task is not found!')
    }

    catch(e) {
        return res.status(204).json({message: e.message})
    }
}
