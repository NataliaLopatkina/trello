const express = require('express');
const router = express.Router();
const boardsController = require('../controllers/board.controller');

router.post('/', boardsController.createBoard)

module.exports = router;
