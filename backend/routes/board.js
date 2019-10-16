const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

router.post('/', boardController.createBoard)
router.patch('/', boardController.updateBoard)

module.exports = router;
