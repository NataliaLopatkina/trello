const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { createTaskSchema, updateTaskSchema, moveTaskSchema } = require('../joi/task-schema');
const joiValidation = require('../middelwares/joi-validation');

router.post('/', joiValidation(createTaskSchema, 'body'), taskController.createTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/update', joiValidation(updateTaskSchema, 'body'), taskController.updateTask);
router.patch('/:id/move', joiValidation(moveTaskSchema, 'body'), taskController.moveTask);

module.exports = router;
