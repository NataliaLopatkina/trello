const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

router.post('/', boardController.createBoard)

module.exports = router;
