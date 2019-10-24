const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

router.get('/', boardController.getBoards)
router.post('/', boardController.createBoard)
router.get('/:id', boardController.getBoard)
router.patch('/:id', boardController.updateBoard)

module.exports = router;
