const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/', taskController.createTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id', taskController.renameTask);
router.patch('/:id/move', taskController.moveTask);

module.exports = router;
