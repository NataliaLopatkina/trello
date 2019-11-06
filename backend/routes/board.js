const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');
const { createBoardSchema, updateBoardSchema }  = require('../joi/board-schema');
const joiValidation = require('../middelwares/joi-validation');

router.get('/', boardController.getBoards)
router.delete('/:id', boardController.removeBoard)
router.post('/', joiValidation(createBoardSchema, 'body'), boardController.createBoard)
router.get('/:id', boardController.getBoard)
router.patch('/:id', joiValidation(updateBoardSchema, 'body'), boardController.updateBoard)

module.exports = router;
