const express = require('express');
const router = express.Router();
const boardsController = require('../controllers/boards.controller');

router.get('/', boardsController.getBoards)

module.exports = router;
