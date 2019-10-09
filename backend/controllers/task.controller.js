const taskService = require('../services/task');

exports.createTask = async function (req, res, next) {
    const { title } = req.body;
    const query = { title };

    try {
        await taskService.createTask(query);
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
            return res.status(200).json({ message: 'Tasks found!', data: tasks })
        }

        throw new Error('Tasks not found!')
        
    }

    catch(e) {
        return res.status(204).json({message: e.message})
    }
}
