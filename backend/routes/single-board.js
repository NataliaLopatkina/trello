const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

router.get('/:id', boardController.getBoard)

module.exports = router;
