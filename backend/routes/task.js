const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/update', taskController.updateTask);
router.patch('/:id/move', taskController.moveTask);

module.exports = router;
