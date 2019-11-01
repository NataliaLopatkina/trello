const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');

router.post('/', taskController.createTask);
router.get('/', taskController.getTasks);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id', taskController.renameTask);

module.exports = router;
