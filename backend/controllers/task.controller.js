const taskService = require('../services/task');

exports.createTask = async function (req, res, next) {

    const { title, boardId, state } = req.body;

    try {
        const tasks = await taskService.getTasks(boardId, state)

        if(!tasks) {
            const order = 0;
            await taskService.createTask({title: title, boardId: boardId, state: state, order: order});
            return res.status(200).json({ message: 'Task is added!' })
        }

        else  {
            const order = tasks.length;
            await taskService.createTask({title: title, boardId: boardId, state: state, order: order});
            return res.status(200).json({ message: 'Task is added!' })
        }
    }

    catch (e) {
        console.log(e)
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

exports.updateTask = async function (req, res, next) {
    const { id } = req.params;
    const { title, description } = req.body;

    try {
        if (title) {
            await taskService.updateTask({ title: title }, { where: { id: id } })
            return res.status(200).json({ message: 'Title of task is updated!' })
        }

        else if (description) {
            await taskService.updateTask({ description: description }, { where: { id: id } })
            return res.status(200).json({ message: 'Descirption of task is updated!' })
        }

    }

    catch(e) {
        return res.status(400).json({ message: 'Title of task is not updated!' })
    }
}

exports.moveTask = async function(req, res, next) {
    const { state, tasks } = req.body;
    
    try {
       await taskService.moveTask(state, tasks);
       return res.status(200).json({message: 'Task is moved!'})
    }

    catch(e) {
        return res.status(400).json({message: 'Task is not moved!'})
    }
}
